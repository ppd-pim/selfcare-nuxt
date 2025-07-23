<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  source: String
})

const totalPages = ref(0)
const isLineApp = ref(false)

let VuePdfEmbed = null

// ใช้ dynamic import เฉพาะบน client
if (process.client) {
  VuePdfEmbed = (await import('vue-pdf-embed')).default
}

onMounted(() => {
  const userAgent = navigator.userAgent
  isLineApp.value = userAgent.includes('Line/')
  console.log('User Agent:', userAgent)
  console.log('Is LINE App:', isLineApp.value)
})

// ดึงจำนวนหน้าหลังโหลด PDF แล้ว
const onLoaded = (pdf) => {
  totalPages.value = pdf.numPages
}

const openPdfWithLiff = async () => {
  try {
    const liff = (await import("@line/liff")).default
    
    // เปิด PDF ในเบราว์เซอร์ภายนอก
    liff.openWindow({
      url: window.location.origin + props.source,
      external: true
    })
  } catch (error) {
    console.error('LIFF error:', error)
    // fallback ถ้า LIFF ไม่ทำงาน
    window.open(props.source, '_blank')
  }
}

// ใส่รูปภาพที่แปลงจาก PDF แล้ว
const pdfImages = [
  '/Pdf/PDPA_MDKKU_page-0001.jpg',
  '/Pdf/PDPA_MDKKU_page-0002.jpg',
  '/Pdf/PDPA_MDKKU_page-0003.jpg',
  '/Pdf/PDPA_MDKKU_page-0004.jpg',
  '/Pdf/PDPA_MDKKU_page-0005.jpg',
]
</script>

<template>
  <div class="pdf-container">
    <!-- ถ้าเป็น LINE browser แสดงรูปภาพ -->
    <div v-if="isLineApp" class="pdf-images">
      <img 
        v-for="(image, index) in pdfImages" 
        :key="index" 
        :src="image" 
        :alt="`PDF หน้า ${index + 1}`"
        class="pdf-page-image" 
      />
    </div>
    
    <!-- ถ้าไม่ใช่ LINE แสดง PDF viewer ปกติ -->
    <ClientOnly v-else>
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

<style scoped>
.pdf-container {
  width: 100%;
  max-width: 100%;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #fafafa;
}

.pdf-images {
  max-height: 350px;
  overflow-y: auto;
}

.pdf-page-image {
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid #ddd;
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

/* CSS ที่ไม่ได้ใช้แล้วสามารถลบได้ */
.line-pdf-fallback {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.fallback-content {
  text-align: center;
  padding: 20px;
}

.pdf-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.fallback-content h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 18px;
}

.fallback-content p {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.pdf-open-btn {
  background: #00B900;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;
}

.pdf-open-btn:hover {
  background: #009900;
}
</style>