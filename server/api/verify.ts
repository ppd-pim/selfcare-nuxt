// server/api/verify.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    // รับ token จาก header ของ frontend
    const token = getHeader(event, 'authorization')
  
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Missing token' })
    }
  
    // Proxy ไปยัง API จริง
    const result = await $fetch('https://webappqshc.kku.ac.th/MobileAppAPI/api/Patients/Verify', {
      method: 'POST',
      headers: {
        Authorization: token, // ส่ง token ตรงไป
        'Content-Type': 'application/json',
      },
      body,
    })
  
    return result
  })
  