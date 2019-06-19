<template>
	<div class="social-account" :class="color_schema.item">

		<div class="social-info">
			<div class="social-icon">
				<img :src="icon">
			</div>
			<div class="social-name text">
				{{ title }}
			</div>
		</div>
		<div class="account-actions" v-if="!is_connected">
			<authorize :service="title" :redirect="redirect">
				<button class="link-button text" :class="color_schema.item">
					Привязать
				</button>
			</authorize>
		</div>
		<div class="account-actions" v-else>
			<div class="verify">
				<img src="../assets/verification-sign.svg">
			</div>
			<button @click="disconnect" class="link-button active text" :class="color_schema.item">
				Отвязать
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'

import Authorize from '../components/Authorize.vue';

import TwithIcon from '../assets/twitch.svg';
import YouTubeIcon from '../assets/youtube.svg';
import VKontakte from '../assets/vk.svg';

export default {
	components: {
		Authorize
	},
	props: {
		is_connected: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			twithIcon: TwithIcon,
			youTubeIcon: YouTubeIcon,
			VKontakte: VKontakte,
			redirect: window.btoa(`account`)
		}
	},
	computed: {
		...mapGetters([
			'user_info', 'color_schema'
		]),
		icon () {
			switch(this.title) {
				case 'Twitch': return this.twithIcon
				case 'YouTube': return this.youTubeIcon
				case 'VKontakte': return this.VKontakte
			}
			return this.TwithIcon
		}
	},
	methods: {
		...mapMutations([
			'setUser'
		]),
		join () {
			console.log('join', this.title)
			// TODO: редирект на бэкенд для подключения сервиса
		},
		disconnect () {
			axios.delete(`/user/service/${this.title}`).then(response => {
				this.setUser(response.data.user)
			})
		}
	}
}
</script>
