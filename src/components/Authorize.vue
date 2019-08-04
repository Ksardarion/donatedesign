<template>
	<div @click="submit">
		<slot/>
	</div>
</template>

<script>
import { config } from '@/config'

export default {
	props: {
		service: {
			type: String,
			required: true
		},
		redirect: {
			type: String,
			default: ''
		},
    is_streamer: {
      type: Boolean,
      default: true
    }
	},
	computed: {
    redirectDecode: function () {
      return window.atob(this.redirect)
    },
    redirectParams: function () {
      return this.redirectDecode.split('-')
    },
    redirectRoute: function () {
      if (this.redirectParams[0].length === 0) {
        return {href: ''}
      }
      let props = this.$router.resolve({
        name: this.redirectParams[0],
        params: { id: this.redirectParams[1] },
      });

      return props;

    },
    redirectHref: function () {
      return escape(this.redirectRoute.href)
    },
    locationHref: function () {
			let is_streamer =  this.is_streamer ? 1 : 0
			let service = this.service.toLowerCase()
      if (service === 'twitch') {
        return `${config.domain}/twitch/login?is_streamer=${is_streamer}&redirect=${this.redirectHref}`
      }
      if (service === 'youtube') {
        return `${config.domain}/oauth2callback?is_streamer=${is_streamer}&redirect=${this.redirectHref}`
      }

      return `${config.domain}/oauth/${service}?is_streamer=${is_streamer}&redirect=${this.redirectHref}`
    }
	},
	methods: {
    submit () {
      // this.$store.dispatch('loader', true)
      // this.btnLoading = true
      console.log( this.locationHref)
      window.location.href = this.locationHref
    }
	}
}
</script>
