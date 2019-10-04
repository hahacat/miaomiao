const state = {
  nm: window.localStorage.getItem('nm') || '北京',
  id: window.localStorage.getItem('id') || 1
}

const mutations = {
  changeCityInfo (state, payload) {
    state.nm = payload.nm
    state.id = payload.id
  }
}

const actions = {

}

export default {
  namespaced: true,
  name: 'city',
  state,
  mutations,
  actions
}