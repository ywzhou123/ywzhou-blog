import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin({
    mounted() {
      import('element-ui').then(m => {
        Vue.use(m.default, {
          size: 'mini',
          menuType: 'text'
        })
      })
    }
  })
}
