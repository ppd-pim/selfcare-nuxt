<template>
    <div v-if="appointments && appointments.length">
     <div class="card mt-4">
       <div className="d-flex mb-2">
         <div className="box-title"></div>
         <div className="text-title">รายการนัดหมาย</div>
       </div>
       <div
         v-for="(item, index) in appointments"
         :key="item.id"
         class="mb-1 p-2 border rounded"
       >
         <div><strong>วันนัด:</strong> {{ item.appointmentDttm }}</div>
         <div><strong>แพทย์:</strong> {{ item.sessionName }}</div>
         <div><strong>คลินิก:</strong> {{ item.locationName }}</div>
         <div><strong>สถานะ:</strong> {{ item.bookingStatus }}</div>
       </div>
       
     </div>
   </div>
   <div v-else>
     <div class="card">
        <div className="d-flex mb-2">
         <div className="box-title"></div>
         <div className="text-title">รายการนัดหมาย</div>
       </div>
       <p>ไม่พบรายการนัดหมาย</p>
     </div>
   </div>
 </template>
 
 <script setup>
 
 import { ref, onMounted } from "vue";
 import { useRouter } from "vue-router";
 const users = useState("users", () => null);
 const appointments = useState("appointments", () => []);
 const webapi = import.meta.env.VITE_WEB_API
 
 const appointment = async (uid) => {
   try {
    // const res = await $fetch(
    //   `${webapi}/appointment/${uid}`
    // );
     const res = await $fetch(
       `https://webappqshc.kku.ac.th/PharConnect/api/LineUsers/appointment/${uid}`
     );
     return res;
   } catch (error) {
     // alert(error);
     return null;
   }
 };
 
 
 onMounted(async () => {
   if (users.value && users.value.hn) {
     // console.log(users.value.hn);
     const appointmentByHN = await appointment(users.value.hn);
       if (appointmentByHN?.status === "success") {
         appointments.value = appointmentByHN.data;
       }
     // console.log(appointments.value);
 
   } else {
     // console.log("users ยังไม่มีข้อมูล");
   }
 });
 
 
 </script>