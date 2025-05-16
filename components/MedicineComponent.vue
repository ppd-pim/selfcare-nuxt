<template>
  <div v-if="homemedicals && homemedicals.length">
    <div class="card mt-4">
      <div className="d-flex mb-3">
        <div className="box-title"></div>
        <div className="text-title">ประวัติยากลับบ้าน</div>
      </div>
      <div
        v-for="(item, index) in homemedicals"
        :key="item.id"
        class="mb-1 p-2 border rounded"
      >
        <div><strong>ชื่อยา:</strong> {{ item.drugName }}</div>
        <div><strong>รายละเอียด:</strong> {{ item.drugIndication }}</div>
        <div>{{ item.freeText1 }} {{ item.freeText2 }}</div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card">
      <div className="d-flex mb-3">
        <div className="box-title"></div>
        <div className="text-title">ประวัติยากลับบ้าน</div>
      </div>
      <p>ไม่พบประวัติยากลับบ้าน</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const users = useState("users", () => null);
const homemedicals = useState("homemedicals", () => []);

const homemedical = async (uid) => {
  try {
    const res = await $fetch(
      `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/homemedical/${uid}`
    );
    // const res = await $fetch(
    //   `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/homemedical/64004451`
    // );
    return res;
  } catch (error) {
    // alert(error);
    return null;
  }
};

onMounted(async () => {
  if (users.value && users.value.hn) {
    console.log(users.value.hn);
    const homemedicalByHN = await homemedical(users.value.hn);
    if (homemedicalByHN?.status === "success") {
      homemedicals.value = homemedicalByHN.data;
    }
    console.log(homemedicals.value);
  } else {
    console.log("users ยังไม่มีข้อมูล");
  }
});
</script>
