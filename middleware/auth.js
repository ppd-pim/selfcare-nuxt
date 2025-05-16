// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')  // ใช้ state ทั่วไปเพื่อเก็บ user

  if (!user.value) {
    return navigateTo('/login') // redirect ไปหน้า login
  }
})
