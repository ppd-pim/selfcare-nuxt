<template>
  <div v-if="users">
    <div class="card">
      <div className="d-flex mb-2">
        <div className="box-title"></div>
        <div className="text-title">ข้อมูลผู้ป่วย</div>
      </div>
      <div class="row">
        <div class="d-flex col-12 col-xl-6">
          <div>HN : &nbsp; </div>
          <div>{{ users.hn }}</div>
        </div>
        <div class="d-flex col-12 col-xl-6">
          <div>ชื่อ สกุล : &nbsp; </div>
          <div>{{ users.fullname }}</div>
        </div>
        <div class="d-flex col-12 col-xl-6">
          <div>หมายเลขประจำตัวประชาชน : &nbsp; </div>
          <div>{{ users.idCardNo }}</div>
        </div>
        <div class="d-flex col-12 col-xl-6">
          <div>อายุ : &nbsp; </div>
          <div>{{ users.age }}  ปี </div>
        </div>
        <div class="d-flex col-12 col-xl-6">
          <div>เพศ : &nbsp; </div>
          <div>{{ users.gender }}</div>
        </div>
        <div class="d-flex col-12 col-xl-6">
          <div>เบอร์โทรศัพท์ : &nbsp; </div>
          <div>{{ users.mobile }}</div>
        </div>
        <div class="mr-auto ml-auto mt-1" >
          <Barcode :value="users.hn" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card">
      <p>ไม่พบข้อมูลผู้ใช้</p>
    </div>
  </div>

  <div v-if="allergys && allergys.length">
    <div class="card mt-4">
      <div className="d-flex mb-2">
        <div className="box-title"></div>
        <div className="text-title">ประวัติแพ้ยา</div>
      </div>
      <div
        v-for="(item, index) in allergys"
        :key="item.id"
        class="mb-1 p-2 border rounded"
      >
        <div><strong>ประเภท:</strong> {{ item.allergyType }}</div>
        <div><strong>แพ้ยา:</strong> {{ item.allergicTo }}</div>
        <div><strong>อาการ:</strong> {{ item.allergyDescription }}</div>
        <!-- <p><strong>รายละเอียด:</strong></p>
        <ul>
          <li v-for="(line, i) in item.displaydetail.split('\f')" :key="i">
            {{ line }}
          </li> 
        </ul>-->
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card mt-4">
      <p class="mb-0">ไม่พบประวัติแพ้ยา</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "~/components/Loading.vue";
import Barcode from '~/components/Barcode.vue'

const users = useState("users", () => null);
const loadedLineUid = useState("loadedLineUid", () => null);
const SetLineUID = useState("LineUID");
const allergys = useState("allergy", () => []);
const profile = ref({});
const router = useRouter();

</script>

<style scoped>
.block-data {
  padding: 2rem;
}
</style>

