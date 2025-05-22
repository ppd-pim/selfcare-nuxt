<template>
    <svg ref="barcode"></svg>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue'
  import JsBarcode from 'jsbarcode'
  
  const props = defineProps({
    value: {
      type: String,
      required: true
    }
  })
  
  const barcode = ref(null)
  
  const generateBarcode = () => {
    if (barcode.value && props.value) {
      JsBarcode(barcode.value, props.value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 60,
        fontSize: 14,
        displayValue: true,
        background: "transparent",
      })
    }
  }
  
  onMounted(generateBarcode)
  watch(() => props.value, generateBarcode)
  </script>
  