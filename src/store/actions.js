import client from 'api-client'
import axios from 'axios'

var actions = {
  logout ({ commit }) {
    localStorage.removeItem('user_token')
    commit('logout')
  },
  fetchUser ({ commit }) {
    return axios.get('/user')
      .then(response => commit('setUser', response.data))
  },
  fetchTransactions ({ commit }) {
    return axios.get('/transactions?sortBy=id&descending=true&rowsPerPage=10&page=1&totalItems=0&all')
      .then(response => commit('setTransactions', response.data))
  },
  fetchTransactionsStatistic ({ commit }) {
    return axios.get('/transactions/statistic')
      .then(response => commit('setTransactionsStatistic', response.data))
  },
  fetchSettings ({ commit }) {
    return client
      .fetchSettings()
      .then(settings => commit('setSettings', settings))
  },
  fetchAlerts ({ commit }) {
    return axios.get('/alerts')
      .then(response => commit('setAlerts', response.data))

    return client
      .fetchAlerts()
      .then(alerts => commit('setAlerts', alerts))
  },
  removeAlert ({ commit, dispatch }, alert_id) {
    return axios.delete('/alerts/' + alert_id)
      .then(() => dispatch('fetchAlerts'))

    // return client
    // .removeAlert(alert_id)
    // .then(commit('removeAlert', alert_id))
  },
  fetchSupports ({ commit }) {
    return client
      .fetchSupports()
      .then(supports => commit('setSupports', supports))
  },
  fetchSounds ({ commit }) {
    return client
      .fetchSounds()
      .then(sounds => commit('setSounds', sounds))
  },
  fetchPlaylist ({ commit }) {
    return client
      .fetchPlaylist()
      .then(playlist => commit('setPlaylist', playlist))
  },
  updatePlaylist ({ commit }) {
    return client
      .fetchPlaylist()
      .then(playlist => commit('addPlaylist', playlist))
  },
  fetchSubscribers ({ commit }) {
    return axios.get('/subscribers')
      .then(response => commit('setSubscribers', response.data))

    // return client
    // .fetchSibscribers()
    // .then(subscribers => commit('setSubscribers', subscribers))
  },
  createMilestone ({ dispatch }, milestone) {
    return axios.post('/mailstone/add', {
      animations: [],
      badges: [],
      donate: milestone.amount,
      music: []
    })
      .then(() => dispatch('fetchMilestones'))
  },
  fetchMilestones ({ commit }) {
    return axios.get('/mailstone/list')
      .then(response => commit('setMilestones', response.data))

    // return client
    // .fetchMilestones()
    // .then(milestones => commit('setMilestones', milestones))
  },
  removeMilestones ({ commit }, milestone_id) {
    return axios.delete('/mailstone/' + milestone_id)
      .then(response => commit('removeMilestones', milestone_id))

    // return client
    // .removeMilestones(milestone_id)
    // .then(commit('removeMilestones', milestone_id))
  },
  fetchWidgets ({ commit }) {
    return axios.get('/widget/list-v2')
      .then(response => commit('setWidgets', response.data))
  },
  removeWidgets ({ commit }, payload) {
    return axios.delete('/widget/' + payload.id)
      .then(() => commit('removeWidgets', payload))
  },
  createWidgets ({ dispatch }, settings) {
    return axios.post('/widget', { settings })
      .then(() => dispatch('fetchWidgets'))
  },
  editWidgets ({ dispatch }, payload) {
    return axios.put(`/widget/${payload.item_slug}/v2`, { settings: payload.settings })
      .then(() => dispatch('fetchWidgets'))
  },
  updateSubscribers ({ commit }) {
    return client
      .fetchSibscribers()
      .then(subscribers => commit('addSubscribers', subscribers))
  },
  fetchActivities ({ commit }, type) {
    return client
      .fetchActivities(type)
      .then(activities => commit('setActivities', activities))
  },
  updateActivities ({ commit }, type) {
    return client
      .fetchActivities(type)
      .then(activities => commit('addActivities', activities))
  },
  updateDonateForm ({ commit }, payload) {
    return axios.post('/donate/settings/', payload)
      .then(() => commit('updateDonateForm', payload.settings))
  },
  fetchStreamerData ({ commit }, userId = false) {
    if (userId) {
      return axios.get(`/user/donationformdata/?streamer=${userId}`)
        .then((response) => {
          commit('updateStreamerData', response.data.streamer_info)
        })
    }
    return axios.get('/user/donationformdata/')
      .then((response) => commit('updateDonateForm', response.data.streamer_info))
  },
  fetchFormData ({ commit }, userId = false) {
    if (userId) {
      return axios.get(`/user/donationformdata/?streamer=${userId}`)
        .then((response) => {
          commit('updateDonateForm', response.data.form_settings)
          commit('updateStreamerData', response.data.streamer_info)
        })
    }
    return axios.get('/user/donationformdata/')
      .then((response) => commit('updateDonateForm', response.data.form_settings))
  }
}

export default actions
