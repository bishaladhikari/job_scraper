import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase/app";
import './sass/style.sass';

require("firebase/auth");
import "./plugins/firebaseInit";

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let app;

firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: "#app",
            router,
            store,
            vuetify,
            render: h => h(App)
        });
    }
});
