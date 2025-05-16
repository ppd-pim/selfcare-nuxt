
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = await $fetch(process.env.NUXT_PUBLIC_PUBLIC_API_URL + "/PharConnect/api/LineUsers/Register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        idCardNo: body.idCardNo,
        birthDate: body.birthDate,
        mobile: body.mobile,
        uid: body.uid.toString(),
      },
    })
  
    return response
  })
  