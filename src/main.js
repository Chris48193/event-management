import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index'
import BaseError from './components/ui/BaseError.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseDialog from './components/ui/BaseDialog.vue'

import '@popperjs/core'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App);

app.use(router)
app.use(store)

app.component('base-spinner', BaseSpinner);
app.component('base-error', BaseError)
app.component('base-dialog', BaseDialog)

app.mount('#app')