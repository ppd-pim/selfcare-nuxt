<template>
  <div class="login">
    <section id="home" class="slider-area slider-height-2 position-relative login-area">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5">
            <div class="slider-text slider-text-2 slider-content-space-2 news-latter-area">
              <div class="pt-3">
                <div class="stepper-wrapper">
                  <div class="stepper-item active">
                    <div class="step-counter">1</div>
                    <div class="step-name">ยืนยันตัวตน</div>
                  </div>
                  <div class="stepper-item">
                    <div class="step-counter">2</div>
                    <div class="step-name">ยืนยันเบอร์มือถือ</div>
                  </div>
                  <div class="stepper-item">
                    <div class="step-counter">3</div>
                    <div class="step-name">ยืนยัน OTP</div>
                  </div>
                </div>
              </div>

              <div class="m-3 tx-header-login">ยืนยันตัวตน</div>
              <form class="cta-form cta-form-2" @submit.prevent="openAgreementDialog">
                <div class="ml-4 mr-4 text-start form-login">
                  <div v-if="isInvalid" class="invalid-feedback d-block alert-danger text-start p-1 mb-2">
                    กรุณาตรวจสอบข้อมูลผู้ป่วยอีกครั้ง
                  </div>
                  <label>หมายเลขประจำตัวประชาชนผู้ป่วย</label>
                  <input
                    type="text"
                    inputmode="numeric"
                    maxlength="13"
                    :class="['form-control', 'mb-1', isInvalid ? 'is-invalid' : '']"
                    placeholder="หมายเลขประจำตัวประชาชน13หลัก ไม่ต้องใส่ขีด"
                    :value="citizenId"
                    @input="handleInput"
                  />

                  <label class="mt-3">วันเดือนปีเกิดผู้ป่วย</label>
                  <v-text-field
                    v-model="formattedDate"
                    label="วันเดือนปีเกิด"
                    readonly
                    class="mb-4"
                    prepend-inner-icon="mdi-calendar"
                    @click="dialog = true"
                  ></v-text-field>

                  <v-dialog v-model="dialog" width="290" persistent>
                    <v-card>
                      <v-date-picker
                        v-model="birthdate"
                        locale="th-TH"
                        @update:modelValue="formatDate2"
                      ></v-date-picker>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn text @click="dialog = false">ปิด</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

                <button type="submit" class="btn btn-primary">ถัดไป</button>
              </form>

              <!-- MODAL: Agreement -->
              <v-dialog v-model="agreementDialog" max-width="500">
                <v-card>
                  <v-card-title class="text-h6">ยืนยันข้อตกลง</v-card-title>
                  <v-card-text>
                    <p>โปรดอ่านและยอมรับข้อตกลงในการใช้งานก่อนดำเนินการต่อ</p>
                    <v-checkbox
                      v-model="agreementAccepted"
                      label="ฉันยอมรับข้อตกลงและเงื่อนไข"
                    ></v-checkbox>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="agreementDialog = false">ยกเลิก</v-btn>
                    <v-btn color="primary" :disabled="!agreementAccepted" @click="submitWithAgreement">
                      ดำเนินการต่อ
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </div>
          </div>

          <div class="col-xl-4 offset-xl-1 col-lg-7 offset-lg-1 d-none d-lg-block">
            <div class="slider-img-2 position-relative">
              <img class="wow fadeInUp" data-wow-delay=".6s" src="/assets/styles/img/slider/slider2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import Loading from '~/components/Loading.vue';
definePageMeta({
  layout: "blank",
  middleware: ["check-steps"],
});


const loading = ref(true)
const citizenId = ref("");
const isInvalid = ref(false);
const dialog = ref(false);
const birthdate = ref(null);
const formattedDate = ref("");
const agreementDialog = ref(false);
const agreementAccepted = ref(false);
const users = ref(false);
const router = useRouter();
const profile = useState('profile', () => ({}));
const SetBDDATE = useState('bd_date');
const SetLineUID = useState('LineUID')

const verify_line = async (uid) => {
  console.log("verify_line");
  try {
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/Verify/${uid}`
    );
    return res;
  } catch (error) {
    alert(error);
    return null;
  }
};


function handleInput(e) {
  citizenId.value = e.target.value.replace(/\D/g, "");
  isInvalid.value = false;
}

function formatDate2(val) {
  if (!val) return;
  const date = new Date(val);
  formattedDate.value = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dialog.value = false;
}

// เปิด Modal ข้อตกลง
function openAgreementDialog() {
  isInvalid.value = false;
  if (!citizenId.value || !birthdate.value) {
    isInvalid.value = true;
    return;
  }
  agreementDialog.value = true;
}

// กดยืนยันข้อตกลง
function submitWithAgreement() {
  agreementDialog.value = false;
  handleSubmit();
}

// ฟังก์ชันแปลง birthdate
function formatDate(val) {
  if (!val) return '';
  const date = new Date(val);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = (date.getFullYear() + 543).toString();
  return day + month + year;
}

// ฟังก์ชันส่ง form
const handleSubmit = async () => {
  isInvalid.value = false;
  try {
    const loginResponse = await axios.post('/api/login', {
      username: "LineApp",
      password: "LineApp@qshc2023",
    });

    const token = loginResponse.data.token;
    const formattedBirthdate = formatDate(birthdate.value); 

    const verifyResponse = await axios.post('/api/verify', {
      idCardNo: citizenId.value,
      birthDate: formattedBirthdate,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (verifyResponse.data.status == "fail") {
      isInvalid.value = true;
      useCookie('verify').value = false;
    } else if (verifyResponse.data.status == "success") {
      SetBDDATE.value = formattedBirthdate;
      useCookie('verify').value = true;
      profile.value = verifyResponse.data;
      router.push('/verify-phone');
    }

  } catch (err) {
    console.error('❌ Error verifying:', err);
    isInvalid.value = true;
  }
};


onMounted(async () => {
  const liff = (await import("@line/liff")).default;
  // ✅ สำคัญ! ต้อง init ก่อน
  await liff.init({ liffId: "1661279233-dDV4VVlZ" });
  await liff.ready;
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href }); // 👉 เด้งไปหน้า login LINE ถ้ายังไม่ได้ login
    return;
  }

  const lineProfile = await liff.getProfile();
  profile.value = lineProfile;
  const verifyData = await verify_line(lineProfile.userId);
  SetLineUID.value = lineProfile.userId
  if (verifyData?.status === "success") {
    loading.value = false
    users.value = verifyData.data;
    router.push("/");
  }
});

</script>

