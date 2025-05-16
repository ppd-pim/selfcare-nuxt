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
                  <div class="stepper-item active">
                    <div class="step-counter">2</div>
                    <div class="step-name">ยืนยันเบอร์มือถือ</div>
                  </div>
                  <div class="stepper-item">
                    <div class="step-counter">3</div>
                    <div class="step-name">ยืนยัน OTP</div>
                  </div>
                </div>
              </div>

              <div class="m-3 tx-header-login">ยืนยันเบอร์มือถือ</div>

              <p class="mb-4">
                ระบุหมายเลขโทรศัพท์มือถือของท่าน <br />
                เพื่อรับรหัสยืนยันจาก SMS (OTP)
              </p>
              <div class="input-group m-3 w-90">
                <input
                  type="text"
                  class="form-control"
                  inputmode="numeric"
                    maxlength="13"
                  v-model="phone"
                  placeholder="กรอกเบอร์มือถือ"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="sendOtp"
                  >
                    ส่งรหัส
                  </button>
                </div>
              </div>
              <NuxtLink to="/verify-otp">ถัดไป</NuxtLink>
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
import { useRouter } from "vue-router";

const phone = ref("");
const router = useRouter();
const otpToken = useState('otp_token')
const otpRef = useState('otp_ref')
const SetPhone = useState('mobile')

definePageMeta({
  layout: "blank",
  middleware: ["check-steps"],
});


const sendOtp = async () => {
  try {
    const res = await $fetch("/api/send-otp", {
      method: "POST",
      body: {
        phone: phone.value,
      },
    });

    // // console.log("OTP Response:", res);
    // // console.log("OTP Response:", res.result.ref_code);
    // router.push("/verify-otp");

    useCookie('phoneVerify').value = true
    // console.log("res.result.toke")
    // console.log(res.result.token)
     otpToken.value =res.result.token;
     otpRef.value = res.result.ref_code;
     SetPhone.value = phone.value;
    router.push({
      path: "/verify-otp",
      query: {
        phone: phone.value,
        ref_code: res.result.ref_code,
        ref_code: res.result.ref_code,
      },
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
    alert("ส่งรหัสไม่สำเร็จ กรุณาตรวจสอบหมายเลขโทรศัพท์");
  }
};
</script>
