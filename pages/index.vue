<template>
  <Loading v-if="loading" />
  <div v-else>
    <!-- ✅ แสดง component ที่เลือก -->
    <component :is="currentComponentResolved" />

    <!-- ✅ Footer ที่ส่งค่า component กลับมา -->
    <Footer
      :selectedComponent="currentComponent"
      @switchComponent="(comp) => currentComponent = comp"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "~/components/Loading.vue";

const users = useState("users", () => null);
const loadedLineUid = useState("loadedLineUid", () => null);
const SetLineUID = useState("LineUID");
const allergys = useState("allergy", () => []);
const profile = ref({});
const router = useRouter();


import MedicineComponent from "~/components/MedicineComponent.vue";
import HomeComponent from "~/components/HomeComponent.vue";
import AppointmentComponent from "~/components/AppointmentComponent.vue";
import Footer from "~/components/Footer.vue";

// 👉 ถ้ามีข้อมูล users แล้ว ให้ loading เป็น false ทันที
const loading = ref(!users.value); // ถ้ามี users แล้ว ไม่ต้องโหลด
const currentComponent = ref("HomeComponent");
// Map ชื่อ string → component จริง
const componentMap = {
  MedicineComponent,
  HomeComponent,
  AppointmentComponent,
};

const currentComponentResolved = computed(() => componentMap[currentComponent.value]);
const webapi = import.meta.env.VITE_WEB_API
let isInitializing = false;



const verify_line = async (uid) => {
   console.log("verify_line")
  try {
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/Verify/${uid}`
    );
    return res;
  } catch (error) {
    return null;
  }
};
const allergy = async (uid) => {
  try {
    // const res = await $fetch(
    //   `${webapi}/Allergy/${uid}`
    // );
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/allergybyhn/${uid}`
    );
    return res;
  } catch (error) {
    // alert(error);
    return null;
  }
};

onMounted(async () => {
  // 🛡️ ป้องกันการรันซ้ำ
  if (isInitializing) return;
  isInitializing = true;

  try {
    // ✅ ถ้ามีข้อมูล users แล้ว แสดง UI ทันที
    if (users.value && loadedLineUid.value) {
      initialLoading.value = false;
    }

    const liff = (await import("@line/liff")).default;
    const liffId = import.meta.env.VITE_LIFFID;
    
    // ⚡ เริ่ม LIFF init ก่อน
    const initPromise = liff.init({ liffId });
    
    // ถ้ามีข้อมูล users แล้ว ให้แสดงหน้าเลย ไม่ต้องรอ
    if (users.value && loadedLineUid.value) {
      loading.value = false;
      return; // 🚪 ออกเลยถ้ามีข้อมูลแล้ว
    }
    
    await initPromise;
    await liff.ready;
    
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.href });
      return;
    }
    
    const lineProfile = await liff.getProfile();
    const currentLineUid = lineProfile.userId;
    
    profile.value = lineProfile;
    SetLineUID.value = currentLineUid;
    
    // 🔄 เช็คอีกครั้งก่อนเรียก API
    if (loadedLineUid.value === currentLineUid && users.value) {
      loading.value = false;
      return;
    }
    
    loading.value = true;
    
    // ⚡ โหลด verify และ allergy แบบ parallel
    const verifyData = await verify_line(currentLineUid);
    console.log(verifyData)
    
    if (verifyData?.status === "success") {
      users.value = verifyData.data;
      loadedLineUid.value = currentLineUid;
      
      // โหลด allergy แบบ background ไม่ block UI
      allergy(users.value.hn).then(allergyData => {
        if (allergyData?.status === "success") {
          allergys.value = allergyData.data;
        }
      });
      
      loading.value = false;
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.error('Error during initialization:', error);
    router.push("/login");
  } finally {
    isInitializing = false; // 🔄 reset flag
  }
});
</script>

<style scoped>
.block-data {
  padding: 2rem;
}
</style>
