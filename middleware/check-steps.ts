export default defineNuxtRouteMiddleware((to) => {
  const verify = useCookie('verify')
  const phoneVerify = useCookie('phoneVerify')

  // console.log('middleware:', {
  //   verify: verify.value,
  //   phoneVerify: phoneVerify.value,
  //   to: to.path
  // })

  if (to.path === '/verify-phone' && !verify.value) {
    return navigateTo('/login')
  }

  if (to.path === '/verify-otp' && (!verify.value || !phoneVerify.value)) {
    return navigateTo('/login')
  }
})
