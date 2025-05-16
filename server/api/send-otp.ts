// ✅ อยู่ใน server/api/send-otp.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  console.log("process.env.NUXT_PUBLIC_OTP_API_KEY",process.env.NUXT_PUBLIC_OTP_API_KEY);
    const response = await $fetch('https://portal-otp.smsmkt.com/api/otp-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': process.env.NUXT_PUBLIC_OTP_API_KEY!,     // ✅ OK ที่นี่
        'secret_key': process.env.NUXT_PUBLIC_OTP_SECRET_KEY!,
      },
      body: {
        project_key: process.env.NUXT_PUBLIC_OTP_PROJECT_KEY,
        phone: body.phone,
      },
    })
  
    return response
  })
  