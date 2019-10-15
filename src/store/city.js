const state = {
  nm: window.localStorage.getItem('nm') || '北京',
  id: window.localStorage.getItem('id') || 1,
  from: ''
}

const mutations = {
  changeCityInfo(state, payload) {
    window.localStorage.setItem('nm', payload.nm)
    window.localStorage.setItem('id', payload.id)
    state.nm = payload.nm
    state.id = payload.id
  },
  changFrom(state, payload) {
    state.from = payload.from
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
