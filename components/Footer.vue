<!-- components/Footer.vue -->
<template>
  <nav class="mobile-bottom-nav">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      :class="[
        'mobile-bottom-nav__item',
        { 'mobile-bottom-nav__item--active': selectedComponent === item.component },
      ]"
      @click="$emit('switchComponent', item.component)"
    >
      <div class="mobile-bottom-nav__item-content">
        <img
          :src="selectedComponent === item.component ? item.iconActive : item.icon"
          alt="icon"
          class="nav-icon"
        />
        <label class="label-icon mb-0">{{ item.label }}</label>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  selectedComponent: String
});

const navItems = [
  {
    icon: "/icon/drugs128.png",
    iconActive: "/icon/drugs_active128.png",
    label: "ยากลับบ้าน",
    component: "MedicineComponent",
  },
  {
    icon: "/icon/home128.png",
    iconActive: "/icon/home_active128.png",
    label: "หน้าหลัก",
    component: "HomeComponent",
  },
  {
    icon: "/icon/calendar128.png",
    iconActive: "/icon/calendar_active128.png",
    label: "วันนัด",
    component: "AppointmentComponent",
  },
];
</script>
