let dark_theme = {
  global: {
    dark: true
  },
  item: {
    'dark-item': true
  },
  text: {
    'dark-text': true
  },
  link: {
    'dark-link': true
  },
  extra: {
    'dark-extra': true
  },
  title_text: {
    'white-text': true
  }
}

let light_theme = {
  global: {
    light: true
  },
  item: {
    'light-item': true
  },
  text: {
    'light-text': true
  },
  link: {
    'light-link': true
  },
  extra: {
    'light-extra': true
  },
  title_text: {
    'dark-blue': true
  }
}

var state = {
  token: localStorage.getItem('user_token'),
  user: {
    id: null,
    social_twitch: false,
    social_youtube: false,
    social_vkontakte: false,
    currency: 'RUS',
    time_zone: '(UTC+3:00) Европа/Москва',
    language: 'Русский'
  },
  mainSettings: {},
  transactions: [],
  transactions_statistic: {
    count: 0,
    sum: 0,
    current_mounth: {
      count: 0,
      sum: 0
    }
  },
  user_type: 'streamer',
  state_checkbox: false,
  color_schema: {
    dark: dark_theme,
    light: light_theme
  },
  subscribers: [],
  activities: [],
  milestones: [],
  widgets: [],
  playlist: [],
  sounds: [],
  testSound: [
    'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'
  ],
  alerts: [],
  streamer_form: {},
  streamer_data: {
    avatar: '../assets/avatar.png'
  },
	selectedBudges: [],
	selectedSounds: []
}

export default state
