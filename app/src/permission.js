import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  console.log('permission-----hasToken', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        const { roles } = await store.dispatch('user/getInfo')

        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

        router.addRoutes(accessRoutes)

        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
