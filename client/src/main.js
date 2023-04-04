import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { VueMaskDirective } from 'v-mask';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

const app = createApp(App).directive('mask', vMaskV3)
app.use(Toast, {});
app.use(router)

app.mount('#app')
