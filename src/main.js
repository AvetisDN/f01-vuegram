import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Panel from 'primevue/panel';
import Card from "primevue/card";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import Fieldset from 'primevue/fieldset';
import Avatar from 'primevue/avatar';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/main.scss'

import {auth} from './firebase'

let app

auth.onAuthStateChanged((user) => {
    if(!app) {
        app = createApp(App)
        app.use(PrimeVue, {ripple: true})
        app.component('Menubar', Menubar)
        app.component('Panel', Panel)
        app.component('Card', Card)
        app.component('Button', Button)
        app.component('Textarea', Textarea)
        app.component('InputText', InputText)
        app.component('Fieldset', Fieldset)
        app.component('Avatar', Avatar)
        app.use(store).use(router).mount('#app')
    }

    if (user) {
        store.dispatch('fetchUserProfile', user)
    }
})
