import { createStore } from "vuex";

import guestsModule from './modules/guests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        guests: guestsModule,
        auth: authModule
    },
});

export default store;