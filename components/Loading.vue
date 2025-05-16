<template>
  <div class="fullscreen-loading">
    <div class="loading">
      <div class="box-loading">
        <div class="wrapper">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <span>Loading</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #c3e0e5;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
