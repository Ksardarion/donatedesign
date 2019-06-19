<template>
  <div class="content-app settings account">
    <div class="accounts-setting">
      <div class="title text" :class="color_schema.title_text">
        Привязанные аккаунты
      </div>
      <div class="accounts">

				<social-item
					:is_connected="user_info.social_twitch"
					title="Twitch"/>

				<social-item
					:is_connected="user_info.social_youtube"
					title="YouTube"/>

				<social-item
					:is_connected="user_info.social_vkontakte"
					title="VKontakte"/>

      </div>
    </div>
    <div class="global-settings" >
      <div class="title text" :class="color_schema.title_text">
        Региональные настройки
      </div>
      <div class="settings-block" :class="[color_schema.item, color_schema.text]">
        <div class="select-form-group">
          <label for="currency" class="currency text" :class="color_schema.text">
            Основная Валюта
          </label>
          <select-block id="currency" @update="user_info.currency = $event" :value="user_info.currency" :options="currencyOptions" />
        </div>
        <div class="select-form-group">
          <label for="time-zone" class="time-zone text" :class="color_schema.text">
            Часовой пояс
          </label>
          <select-block id="time-zone" @update="user_info.time_zone = $event" :value="user_info.time_zone" :options="[{value: user_info.time_zone}]" />
        </div>
        <div class="select-form-group">
          <label for="language" class="language text" :class="color_schema.text">
            Язык
          </label>
          <select-block id="language" @update="user_info.language = $event" :value="user_info.language" :options="languageOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import SelectBlock from '../components/SelectBlock.vue'
import SocialItem from '../components/SocialItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  components: {
    SelectBlock, SocialItem
	},
	watch: {
		'user_info.currency': function (currency) {
			axios.put('/user', {currency})
		},
		'user_info.time_zone': function (time_zone) {
			axios.put('/user', {time_zone})
		},
		'user_info.language': function (language) {
			axios.put('/user', {language})
		}
	},
  data () {
    return {
      currencyOptions: [
        { value: 'EUR' },
        { value: 'RUS' },
        { value: 'USD' }
      ],
      languageOptions: [
        {
          value: 'Русский'
        },
        {
          value: 'English'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['color_schema', 'user_info'])
  }
}
</script>
<style>
.social-icon > img {
  max-width: 19px;
  max-height: 18px;
}

.account.settings {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
.accounts-setting {
  display: grid;
  grid-template-rows: 1fr 3fr;
}
.title {
  font-size: 13px;
}
.accounts {
  display: grid;
  grid-auto-rows: 70px;
  grid-row-gap: 10px;
}
.social-account {
  max-width: 680px;
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.social-info, .account-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.verify {
  background: #1EBA96;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.social-icon {
  width: 20px;
}
.link-button, .social-name {
  margin-left: 15px;
}
.social-name {
  font-size: 13px;
}
button.link-button {
  width: 90px;
  height: 35px;
  font-size: 10px;
  border-radius: 5px;
}

button.active.link-button {
  background-color: #4B4B7D;
  border: none !important;
}

button.dark-item.link-button {
  border: 1px solid #7E7EA5;
}

button.dark-item.link-button:hover {
  background-color: #4B4B7D;
}

.settings-block {
  font-size: 12px;
  padding: 25px 20px;
  display: grid;
  grid-template-columns: 130px 270px 1fr;
  grid-column-gap: 25px;
  border-radius: 10px;
  max-width: 680px;

}

</style>
