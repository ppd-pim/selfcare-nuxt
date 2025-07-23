<template>
    <div class="pdf-container">
      <ClientOnly>
        <template v-if="totalPages > 0">
          <VuePdfEmbed
            v-for="page in totalPages"
            :key="page"
            :source="source"
            :scale="1" 
            :page="page"
            @loaded="onLoaded"
            class="pdf-embed"
          />
        </template>
  
        <template v-else>
          <VuePdfEmbed 
            :source="source" 
            :page="1"
            :scale="1" 
            class="pdf-embed"
            @loaded="onLoaded"
          />
        </template>
  
        <template #fallback>
          <div class="loading-placeholder">
            กำลังโหลด PDF...
          </div>
        </template>
      </ClientOnly>
    </div>
  </template>
  
  
  <script setup>
import { ref } from 'vue'

const props = defineProps({
  source: String
})

const totalPages = ref(0)

let VuePdfEmbed = null

// ใช้ dynamic import เฉพาะบน client
if (process.client) {
  VuePdfEmbed = (await import('vue-pdf-embed')).default
}

// ดึงจำนวนหน้าหลังโหลด PDF แล้ว
const onLoaded = (pdf) => {
  totalPages.value = pdf.numPages
}
</script>
  
  <style scoped>
  /* .pdf-container {
    overflow: scroll;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  } */
  
  .pdf-container {
  width: 100%;
  max-width: 100%;
  max-height: 350px;            /* สูงเท่าจอ */
  overflow-y: auto;         /* ให้ scroll แนวตั้งได้ */
  overflow-x: hidden;       /* ปิด scroll แนวนอน */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #fafafa;
}

  .pdf-embed {
    width: 100%;
    height: 500px;
  }
  
  .loading-placeholder {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  .pdf-controls {
    padding: 10px;
    text-align: center;
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
  }
  
  .pdf-controls button {
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
  }
  
  .pdf-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>