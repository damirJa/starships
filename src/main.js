import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.filter('simplifyCost', function (value) {
  if (value == 'unknown'){
    return value
  }else{
    if (value.length > 9){
      return value.slice(0, -9) + " B";
    }
    if (value.length > 5){
      return value.slice(0, -5) + " M";
    }
    return Math.floor(value);
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
