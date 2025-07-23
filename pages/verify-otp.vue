<template>
  <div class="login">
    <section
      id="home"
      class="slider-area slider-height-2 position-relative login-area"
    >
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5">
            <div
              class="slider-text slider-text-2 slider-content-space-2 news-latter-area"
            >
              <div class="pt-3">
                <div class="stepper-wrapper">
                  <div class="stepper-item completed">
                    <div class="step-counter"><v-icon icon="mdi-check" /></div>
                    <div class="step-name">ยืนยันตัวตน</div>
                  </div>
                  <div class="stepper-item completed">
                    <div class="step-counter"><v-icon icon="mdi-check" /></div>
                    <div class="step-name">ยืนยันเบอร์มือถือ</div>
                  </div>
                  <div class="stepper-item active">
                    <div class="step-counter">2</div>
                    <div class="step-name">ยืนยัน OTP</div>
                  </div>
                </div>
              </div>

              <div class="m-3 tx-header-login" >ยืนยัน OTP</div>
              
              <p class="mb-1"> ระบุรหัสยืนยันจาก SMS(OTP)  <br>
                ที่ส่งไปยังหมายเลข  {{ phone }}</p>
              <p class="mb-1"> ref.{{ refCode }}</p>
              <div v-if="isInvalid" class="invalid-feedback d-block alert-danger text-start p-1 mb-2">
                {{ errorMessage }}
                  </div>
              <form class="cta-form cta-form-2" @submit.prevent="handleSubmit">
                
                <v-otp-input v-model="otp"></v-otp-input>
                <NuxtLink @click="registerUser" class="btn btn-primary">ยืนยัน</NuxtLink>
              </form>
            </div>
          </div>

          <div
            class="col-xl-4 offset-xl-1 col-lg-7 offset-lg-1 d-none d-lg-block"
          >
            <div class="slider-img-2 position-relative">
              <img
                class="wow fadeInUp"
                data-wow-delay=".6s"
                src="/assets/styles/img/slider/slider2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "blank",
  middleware: ["check-steps"],
});

const config = useRuntimeConfig(); // ✅ ตรงนี้สำคัญ ต้องอยู่ใน <script setup>
const isInvalid = ref(false);
const errorMessage = ref('');

const route = useRoute();
const phone = route.query.phone;
const refCode = route.query.ref_code;
const token = ref("")  // import { ref } from 'vue'
const otp = ref("")  // import { ref } from 'vue'
const otp_code = ref("");
const token_otp = useState('otp_token')  // จะได้ token จาก useState
const MobilePhone = useState('mobile')  // จะได้ token จาก useState
const LineUID = useState('LineUID')  // จะได้ token จาก useState
const bd_date = useState('bd_date')  // จะได้ token จาก useState
const otpRef = useRoute().query.ref_code  // ได้ ref_code จาก query
const router = useRouter();
const profile = useState('profile');

// console.log(profile.value.data.fullName);
// console.log(" otp.value ",otp.value);
  // console.log(" MobilePhone ",MobilePhone.value);
  
  // console.log("token_otp");
  // console.log(token_otp.value);
  // console.log(" LineUID ",LineUID.value);

  const formatBirthDate = (dateStr) => {
  if (!dateStr || dateStr.length !== 8) return "";
  const day = dateStr.slice(0, 2);
  const month = dateStr.slice(2, 4);
  const year = dateStr.slice(4);
  return `${day}/${month}/${year}`;
};

const formattedBirthDate = formatBirthDate(bd_date.value);
// console.log(" formattedBirthDate ",formattedBirthDate);

const registerUser = async (event) => {
  

    event.preventDefault();
    // console.log("token_otp");
    // console.log(token_otp.value);
    

    const config = useRuntimeConfig();

    // const res = await fetch("https://portal-otp.smsmkt.com/api/otp-validate", {
    //   body: JSON.stringify({
    //     token: token_otp,
    //     otp_code: otp.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     api_key: config.public.OTP_API_KEY,
    //     secret_key: config.public.OTP_SECRET_KEY,
    //   },
    //   method: "POST",
    // });
    const result = await $fetch("/api/validate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ เพิ่มตรงนี้ถ้ายังไม่ได้ใส่
      },
      body: {
        token: token_otp.value,
        otp_code: otp.value,
      },
    });


    // console.log(result); // result = JSON แล้ว ไม่ต้อง .json()

  if (result.code && result.code == "5000") {
    // setMsgerror("รหัส OPT นี้หมดอายุเเล้ว");
    // setwarningOTP(true);
    isInvalid.value = true;
      errorMessage.value = 'รหัส OPT นี้หมดอายุเเล้ว';
  } 
  if (result.code && result.code == "1006") {
   // console.log("Not found token.")
   router.push('/verify-phone');
  }else if (result.result) {
    if (result.result.status == true && LineUID.value != undefined) {
      
      const res2 = await $fetch("/api/LineUsers-Rgister", {
        method: "POST",
        body: {
            idCardNo: profile.value.data.idCardNo,
            birthDate: formattedBirthDate,
            mobile: MobilePhone.value,
            uid: LineUID.value ///มันต้อเป็น UID ของ LINE,
        },
      });

      // console.log(res2)
      const result2 = await res2;
      if (result2.status === "success") {
        // setBtnLoad(false);
        if (result2.message == "This Line User is already registed") {
          // setMsgerror("Line นี้เคยลงทะเบียนเเล้ว");
          // setwarning(true);
          isInvalid.value = true;
          errorMessage.value = 'Line นี้เคยลงทะเบียนเเล้ว';
        } else {
          // setModalOpensuccess(!modalSuccess);
          // setTimeout(() => setModalOpensuccess(modalSuccess), 3000);
          const liff = (await import("@line/liff")).default;
          // liff.closeWindow();
          useCookie('verify').value = null;
          useCookie('phoneVerify').value = null;     
          router.push('/');
        }
      } else {
        isInvalid.value = true;
          errorMessage.value = 'เกิดข้อผิดพลาด';
        // setMsgerror("เกิดข้อผิดพลาด");
        // setwarningOTP(true);
      }
    } else if (result.result.status == false && result.code == "000")  {
      // console.log("รหัส OPT ไม่ถูกต้อง");
      // setMsgerror("รหัส OPT ไม่ถูกต้อง");
      // setwarningOTP(true);
      isInvalid.value = true;
      errorMessage.value = 'รหัส OTP ไม่ถูกต้อง';
    } else {
      // console.log("เกิดข้อผิดพลาด");
      // setMsgerror("เกิดข้อผิดพลาด");
      // setwarningOTP(true);
      errorMessage.value = 'เกิดข้อผิดพลาด';
      isInvalid.value = true;
    }
  }
    
  };

</script>
