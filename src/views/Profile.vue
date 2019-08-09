<template>
	<div class="content-app1 profile">
		<div class="profile-block">
			<div class="user-info" :class="color_schema.item">
				<img class="avatar" :src="streamer.avatar" alt="profile-avatar">
				<div class="text">
					{{ streamer.name }}
				</div>
			</div>
			<div class="user-statistic text" :class="color_schema.item">
				<div class="subscribe-staistic">
					<div>{{ getFollowersCount }}</div>
					<div class="small-text" :class="color_schema.text"> Подписчиков</div>
				</div>
				<div class="payment-statistic">
					<div>{{ videosCount }}</div>
					<div  class="small-text" :class="color_schema.text"> Стримов</div>
				</div>
				<div class="advancement-statistic">
					<div>{{ getViewsCount }}</div>
					<div  class="small-text" :class="color_schema.text"> Просмотров</div>
				</div>
			</div>
		</div>
		<div class="last-streams text">
			<div class="stream-block-top" :class="color_schema.item">
				<div class="title">
					Последние стримы
				</div>
				<div class="stream-link">
					<div class="text">
						Смотреть все
					</div>
					<img src="../assets/right-arrow.svg" alt="arrow" class="arrow-icon">
				</div>
			</div>
			<div class="stream-block-bottom" :class="color_schema.item">
				<div v-for="video in videos" class="stream" @click="openVideo(video.url)">
					<img :src="video.preview.medium" alt="img" class="video-img">
					<div class="text">
						{{ video.title}}
					</div>
				</div>
			</div>
		</div>
		<div class="profile-actions">
			<button class="default-button">
				<img src="../assets/+.svg" alt="+" class="icon-plus">
				ПОДПИСАТЬСЯ
			</button>
			<button @click="$router.push({name: 'form-donation', params: { id: streamer.id }})" class="default-button">
				ОТПРАВИТЬ ДЕНЬГИ
			</button>
		</div>
		<div class="donat-reward">
			<div class="reward-title" :class="color_schema.title_text">
				Награды за донат
			</div>
			<div class="reward-info">
				<div class="reward-block" v-for="item in milestones">
					<div class="reward-block-top text" :class="color_schema.item">
						<div class="amount">
							{{ item.amount }} EUR
						</div>
						<div class="text" :class="color_schema.text">
							Суммарный донат
						</div>
					</div>
					<div class="reward-block-bottom text" :class="color_schema.item">
						<div class="milestone-badge">
							<div class="count">
								{{item.badges_count}}
							</div>
							<div class="inscription" :class="color_schema.text">
								Бейдж
							</div>
						</div>
						<div class="animation">
							<div class="count">
								{{item.animations_count}}
							</div>
							<div class="inscription  " :class="color_schema.text">
								Анимация
							</div>
						</div>
						<div class="sound">
							<div class="count">
								{{item.music_count}}
							</div>
							<div class="inscription" :class="color_schema.text">
								Мелодия
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'profile',
  data () {
    return {
      userId: this.$route.params.id ? this.$route.params.id : this.$store.getters.user_info.id,
      streamer: {},
			videos: {},
			videosCount: 0
    }
  },
  methods: {
    fetchStreamerData () {
      return axios.get(`/user/donationformdata/?streamer=${this.userId}`)
        .then((response) => {
          this.streamer = response.data.streamer_info
        })
    },
		fetchStreams () {
    	return axios.get(`/user/streams/${this.userId}`)
				.then((response) => {
					this.videos = response.data.videos
					this.videosCount = response.data._total
				})
		},
		openVideo (url) {
			window.open(url, '_blank')
		}
  },
  computed: {
    ...mapGetters(['color_schema']),
		...mapState(['milestones']),
		getFollowersCount () {
    	return this.videos.length ? this.videos[0].channel.followers : 0
    },
		getViewsCount () {
			return this.videos.length ? this.videos[0].channel.views : 0
		}
  },
  created () {
    this.fetchStreamerData()
		this.$store.dispatch('fetchMilestones')
		this.fetchStreams()
	}
}
</script>

<style scoped>
.arrow-icon {
	width: 21px;
	height: 15px;
}

.stream-link {
	font-size: 12px;
}

.stream-block-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	padding: 0 25px;
}
.stream-link > img {
	margin-left: 8px;
}
.stream-link {
	display: flex;
	align-items: center;
}
.stream-block-bottom {
	font-size: 10px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 20px;
	grid-column-gap: 11px;
	padding: 25px;
}

.stream {
	cursor: pointer;
}

.video-img {
	width: 240px;
	height: 125px;
}

.last-streams {
	display: grid;
	grid-row-gap: 2px;
}
.profile-actions {
	display: grid;
	grid-auto-rows: 45px;
	grid-row-gap: 20px;
	font-size: 12px;
}

.profile-actions > button {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.reward-title {
	margin-bottom: 25px;
}
.reward-info {
	display: grid;
	grid-template-columns: repeat(4, 25%);
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	margin-bottom: 30px;
}

.reward-block {
	display: grid;
	grid-row-gap: 3px;
	grid-template-columns: 255px;
	grid-template-rows: repeat(2, 100px);
}

.reward-block-top {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.reward-block-bottom {
	display: flex;
	align-items: center;
	justify-content: center;
}
.profile {
    grid-template-rows: 305px 1fr;
}
.donat-reward {
    grid-column: 2/2;
    grid-row: 2/3;
}
	.avatar {
		width: 100%;
		height: 100%;
		max-width: 200px;
		max-height: 200px;
	}
</style>
