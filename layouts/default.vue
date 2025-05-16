<template>
  <div class="default-layout">
    <!-- <Navbar /> -->
    <div class="banner-top-logo text-center">
      <NuxtLink to="/">
        <img
          src="../assets/styles//img/logo/QSHClogo_hostpitalnew_01.png"
          class="logo mt-2 mb-2"
        />
      </NuxtLink>
    </div>
    <main class="container content">
      <slot />
    </main>
    <!-- <Menu /> -->
  </div>
</template>

<script setup>
import Menu from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>
