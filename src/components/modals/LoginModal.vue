<template>
  <b-modal id="login-modal" ref="login_modal" hide-header hide-footer content-class="login-modal-content" body-class="login-modal-body" centered>
    <button type="button" class="close" @click="hideModal">
      <img class="icon-close" src="../../assets/close.svg">
    </button>
    <div class="modal-title text">
      ВОЙТИ КАК:
    </div>
      <b-form class="form-login" >
        <div class="login-form-check">
          <div class="custom-control custom-radio">
            <input class="radio-btn custom-control-input" name="login-user" id="streamer" type="radio"  :checked="!user" value="streamer"  @change="updateUserType('streamer')">
            <label class="custom-control-label text description" for="streamer"> Стример
            </label>
          </div>
          <div class="custom-control custom-radio">
            <input class="radio-btn custom-control-input" name="login-user"  id="user" type="radio" :checked="user"  value="user"  @change="updateUserType('user')">
            <label class="custom-control-label text description" for="user"> Пользователь
            </label>
          </div>
        </div>
        <div class="social-buttons">
          <div @click="submit('twitch')" class="social-button"><img src="../../assets/twitch.svg" class="icon-modal"></div>
          <div @click="submit('vk')" class="social-button"><img src="../../assets/vk.svg" class="icon-modal"></div>
          <div @click="submit('google')" class="social-button"><img src="../../assets/youtube-logo.svg" class="icon-modal"></div>
        </div>
      </b-form>
</b-modal>
</template>

<script>
import { config } from '@/config'

import { mapGetters } from 'vuex'

export default {
  name: 'login-modal',
  compenents: {
  },
  data () {
    return {
      service: 'twitch',
      redirect: ''
    }
  },
  methods: {
    submit (service) {
      this.service = service
      console.log(this.service)
      window.location.href = this.locationHref
    },
    hideModal () {
      this.$refs.login_modal.hide()
    },
    updateUserType (value) {
      this.$store.commit('set_user_type', value)
    }
  },
  computed: {
    ...mapGetters(['color_schema', 'user']),
    item_value () {
      return this.items[0].value
    },
    redirectDecode: function () {
      return window.atob(this.redirect)
    },
    redirectParams: function () {
      return this.redirectDecode.split('-')
    },
    locationHref: function () {
      let isStreamer = this.user ? 0 : 1
      if (this.service === 'twitch') {
        return `${config.domain}/twitch/login?is_streamer=${isStreamer}&redirect=${this.redirectHref}`
      }
      if (this.service === 'google') {
        return `${config.domain}/oauth2callback?is_streamer=${isStreamer}&redirect=${this.redirectHref}`
      }

      return `${config.domain}/oauth/${this.service}?is_streamer=${isStreamer}&redirect=${this.redirectHref}`
    },
    redirectRoute: function () {
      if (this.redirectParams[0].length === 0) {
        return { href: '' }
      }
      return this.$router.resolve({
        name: this.redirectParams[0],
        params: { id: this.redirectParams[1] }
      })
    },
    redirectHref: function () {
      return escape(this.redirectRoute.href)
    }
  }
}
</script>

<style>
.login-modal-content {
  width: 500px !important;
  height: 360px !important;
  background-color: #252A5E !important;
  border-radius: 15px !important;
  text-align: center !important;
}
.social-button img {
	max-width: 45px;
	max-height: 45px;
}
.login-modal-body {

}
</style>
