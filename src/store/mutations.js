import axios from 'axios'

var mutations = {
  setUser (state, user) {
    state.user = user
  },
  logout (state) {
    state.token = null
    state.user = {
      id: null
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer null'
  },
  setTransactions (state, transactions) {
    state.transactions = transactions
	},
	setTransactionsStatistic (state, statistic) {
		state.transactions_statistic = statistic
	},
  setToken (state, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
		localStorage.setItem('user_token', token)
		state.token = token
	},
	setSettings (state, settings) {
		state.mainSettings = settings
	},
  set_state_checkbox: (state, payload) => {
    state.state_checkbox = payload
  },
  set_user_type: (state, payload) => {
    state.user_type = payload
  },
  setSubscribers (state, subscribers) {
    state.subscribers = subscribers
  },
  addSubscribers (state, subscribers) {
    state.subscribers.push(...subscribers)
  },
  setActivities (state, activities) {
    state.activities = activities
  },
  addActivities (state, activities) {
    state.activities.push(...activities)
  },
  createMilestone (state, milestone) {
    state.milestones.push(milestone)
  },
  setMilestones (state, milestones) {
    state.milestones = milestones
  },
  removeMilestones (state, milestone_id) {
    var removeIndex = state.milestones.map(function(item) { return item.id; }).indexOf(milestone_id);
    state.milestones.splice(removeIndex, 1)
  },
  setWidgets (state, widgets) {
    state.widgets = widgets
  },
  removeWidgets (state, payload) {
    var i_i = state.widgets.map(function(item) { return item.title; }).indexOf(payload['type']);
    var items = state.widgets[i_i]['collapse_item']
		var r_i = items.map(function(item) { return item.slug; }).indexOf(payload['id']);
    state.widgets[i_i]['collapse_item'].splice(r_i, 1)

  },
  createWidgets (state, widget) {
    state.widgets[0]['collapse_item'].push(widget)
  },
  setPlaylist (state, playlist) {
    state.playlist = playlist
  },
  addPlaylist (state, playlist) {
    state.playlist.push(...playlist)
  },
  setSounds (state, sounds) {
    state.sounds = sounds
  },
  setSupports (state, supports) {
    state.supports = supports
  },

  setAlerts (state, alerts) {
    state.alerts = alerts
  },
}

export default mutations
