var getters = {
  transactions: state => {
    return state.transactions
  },
  transactions_statistic: state => {
    return state.transactions_statistic
  },
  token: state => {
    return state.token
  },
  mainSettings: state => {
    return state.mainSettings
  },
  state_checkbox: state => {
    return state.state_checkbox
  },
  color_schema: state => {
    return state.state_checkbox ? state.color_schema.light : state.color_schema.dark
  },
  user: state => {
    return state.user_type === 'user'
  },
  user_info: state => {
    return state.user
  },
  is_auth: state => {
    return !!state.user.id
  },
  streamer_form: state => {
    return state.streamer_form
  },
  streamer_info: state => {
    return state.streamer_data
  }
}

export default getters
