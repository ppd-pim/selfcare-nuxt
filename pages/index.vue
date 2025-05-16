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

const verify_line = async (uid) => {
  try {
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/Verify/${uid}`
    );
    return res;
  } catch (error) {
    // alert(error);
    return null;
  }
};
const allergy = async (uid) => {
  try {
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/allergybyhn/${uid}`
    );
    // const res = await $fetch(
    //   `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/allergybyhn/68002378`
    // );
    return res;
  } catch (error) {
    alert(error);
    return null;
  }
};

onMounted(async () => {
  const liff = (await import("@line/liff")).default;
  await liff.init({ liffId: "1661279233-dDV4VVlZ" });
  await liff.ready;

  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
    return;
  }

  const lineProfile = await liff.getProfile();
  const currentLineUid = lineProfile.userId;

  profile.value = lineProfile;
  SetLineUID.value = currentLineUid;

  // โหลดใหม่เฉพาะตอน lineUid เปลี่ยน หรือไม่มีข้อมูล
  if (!users.value || loadedLineUid.value !== currentLineUid) {
    loading.value = true; // ✅ เริ่ม loading ถ้าจะโหลดใหม่
    console.log('verify_line',currentLineUid)
    const verifyData = await verify_line(currentLineUid);

    if (verifyData?.status === "success") {
      users.value = verifyData.data;
      console.log('allergy',users.value.hn)
      const allergybyhnData = await allergy(users.value.hn);
      if (allergybyhnData?.status === "success") {
        allergys.value = allergybyhnData.data;
      }
      loadedLineUid.value = currentLineUid;
    } else {
      router.push("/login");
      return;
    }
    loading.value = false;
  }
});
</script>

<style scoped>
.block-data {
  padding: 2rem;
}
</style>
