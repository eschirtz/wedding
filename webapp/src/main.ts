import { createApp } from 'vue'
import './plugins/firebase';
import './style.css'
import router from './plugins/router';
import App from './App.vue'



const app = createApp(App)
app.use(router);
app.mount('#app')
