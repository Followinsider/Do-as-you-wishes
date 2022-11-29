import request from "@/utils/request";

const state = {
    projectResult: []
};

const actions = {
    // 根据具体业务，可以将请求接口单独打包成一个api模块
    async getProjectList({commit}, data) {
        let result = await request({
            url: 'http://api.h-camel.com/api?mod=interview&ctr=issues&act=categoryList',
            method: 'get',
            params: data
        });
        commit('GETPROJECTLIST',result.data.result);
    }
};

const mutations = {
    GETPROJECTLIST(state, result) {
        state.projectResult = result
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}