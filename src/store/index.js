import Vue from "vue";
import Vuex from "vuex";
import form from './modules/form';
import project from './modules/project';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        form,
        project
    },
});
