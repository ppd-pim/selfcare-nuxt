
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const response = await $fetch('https://portal-otp.smsmkt.com/api/otp-validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': process.env.OTP_API_KEY!,     // ✅ OK ที่นี่
        'secret_key': process.env.OTP_SECRET_KEY!,
      },
      body: {
        token: body.token,
        otp_code: body.otp_code,
      },
    })
  
    return response
  })
  