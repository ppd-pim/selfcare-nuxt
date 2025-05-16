// server/api/login.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    const response = await $fetch('https://webappqshc.kku.ac.th/MobileAppAPI/api/Authenticate/login', {
      method: 'POST',
      body,
    })
  
    return response
  })
  