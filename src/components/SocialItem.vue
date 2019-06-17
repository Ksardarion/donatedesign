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
			<button @click="join" class="link-button text" :class="color_schema.item">
				Привязать
			</button>
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
import { mapGetters } from 'vuex'

import TwithIcon from '../assets/twitch.svg';
import YouTubeIcon from '../assets/youtube.svg';
import VKontakte from '../assets/vk.svg';

export default {
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
			VKontakte: VKontakte
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
		join () {
			console.log('join', this.title)
			// TODO: редирект на бэкенд для подключения сервиса
		},
		disconnect () {
			console.log('disconnect', this.title)
			// TODO: редирект на бэкенд для отключения сервиса
		}
	}
}
</script>
