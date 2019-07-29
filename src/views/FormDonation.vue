<template>
	<div class="form-donation">
		<div class="form-donation-background-image" :style="{background: background}"></div>
		<div class="streamer-info">
			<img :src="streamer_info.avatar" alt="avatar" class="avatar">
			<div class="text" :class="color_schema.title_text">{{streamer_info.name}}</div>
		</div>
		<div class="form-donation-block text">
			<div class="form-block">
				<div class="form-block-top" :class="color_schema.item">
					ОТПРАВИТЬ ДЕНЬГИ
				</div>
				<div class="form-block-bottom" :class="color_schema.item">
					<form class="donation-form text">
						<div class="group-form">
							<label for="username" :class="color_schema.text">Ваше имя</label>
							<div class="custom-input">
								<input :readonly="anonim" class="username-input" :class="color_schema.title_text"
											 type="text" placeholder="Введите имя" :value="donateForm.ank.login"></input>
								<img src="../assets/twitch.svg" alt="twitch" class="input-icon">
								<img src="../assets/vk.svg" alt="vk" class="input-icon">
							</div>
						</div>
						<div class="group-form-currency">
							<div class="group-form">
								<label for="amount" :class="color_schema.text">Сумма Доната</label>
								<input id="amount" class="text-input" :class="color_schema.title_text"
											 type="text" placeholder="Введите сумму доната" name="amount"
											 :min="streamer_form.donat_amount" v-model="donateForm.amount"></input>
							</div>
							<div class="select-form-group">
								<label for="currency" class="currency text" :class="color_schema.text">
									Валюта
								</label>
								<select-block id="currency" :value="user_info.currency" :options="currencyOptions" />
							</div>
						</div>
						<div class="group-form">
							<label for="message" :class="color_schema.text">Сообщение стримеру</label>
							<textarea id="message" maxlength="300" class="textarea-input" :class="color_schema.title_text"
												type="text" placeholder="Напишите что-нибудь" name="message" v-model="donateForm.ank.message"></textarea>
						</div>
						<div class="group-form payment-form">
							<label for="payment" :class="color_schema.text">Способ оплаты</label>
							<div class="group-radio-payment">
								<label class="payment-input">
									<input type="radio" name="payment" value="card" >
									Card
									<img src="../assets/Credit card.svg" alt="Card" class="input-payment-icon">
								</label>
								<label class="payment-input">
									<input type="radio" name="payment" value="card" >
									<img src="../assets/webmoney-paying-logo.svg" alt="Card" class="input-payment-icon">
								</label>
								<label class="payment-input">
									<input type="radio" name="payment" value="card" >
									<img src="../assets/yandex-pay-logo.svg" alt="Card" class="input-payment-icon">
								</label>
								<label class="payment-input">
									<input type="radio" name="payment" value="card" >
									<img src="../assets/qiwi.svg" alt="Card" class="input-payment-icon">
								</label>
							</div>

						</div>
						<div class="group-form submit-action">
							<div class="checkbox-form-donation">
								<label>
									<input type="checkbox" name="anonim" v-model="anonim" class="checkbox-anonim">
									<span class="custom-checkbox"></span>
									Анонимно
								</label>
							</div>
							<div class="button-submit">
								<button class="default-button" @click.prevent="donat">ОПЛАТИТЬ</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="form-media text" :class="color_schema.item">
				<div class="title-block"> РАЗМЕЩЕНИЕ МЕДИА</div>
				<div class="description-block" :class="color_schema.text">
					Вы можете прикрепить медиафайл к сообщению, указав ссылку.
					<br>
					Минимальная сумма для заказа медиафайла: 500 RUB.
				</div>
				<div class="form-donation-media-input">
					<img src="../assets/web-link.svg" alt="web-link" class="media-url">
					<input type="url" name="media-url" v-model="youtube"
								 class="form-donation-url-input" placeholder="Ссылка на видео" :readonly="isYoutubeEnabled"
								 :class="color_schema.title_text">
				</div>
			</div>
			<div class="form-advancement text">
				<div class="form-advancement-top" :class="color_schema.item">
					<div class="title-block">БЛИЖАЙШАЯ НАГРАДА ЗА ДОНАТ</div>
					<div class="title-block amount">500 EUR</div>
				</div>
				<div class="form-advancement-middle" :class="color_schema.item">
					<b-progress :value="200" :max="500" class="form-advancement-progress"></b-progress>
					<div class="description-block" :class="color_schema.text">
						Для получения награды отправьте этому стримеру еще
						<span :class="color_schema.title_text">300 EUR</span>
						<br>
						Ваш текущий донат:
						<span>{{milestones.mydonat}}</span>
					</div>
				</div>
				<div class="form-advancement-bottom text" :class="color_schema.item">
					<div class="title-block">ВЫ ПОЛУЧИТЕ</div>
					<div class="description-block">
						{{milestones.badges.length}} <span :class="color_schema.text"> Бейджа </span>
					</div>
					<div class="form-advancement-images">
						<img v-for="badge in milestones.badges" :src="badge.img" alt="">
					</div>
					<div class="description-block">
						{{milestones.music.length}}  <span :class="color_schema.text">Мелодии</span>
					</div>
					<div class="form-advancement-sounds" :class="[color_schema.item, color_schema.text]">
						<div class="advancement-sounds form-sound"  v-for="sound in milestones.music">
							<img class="play-icon-btn" src="../assets/play-icon.svg">
							<div class="text">message.mp3</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="form-donation-footer">
			<div class="partners">
				<img src="../assets/paykeeper.png" alt="paykeeper" class="payment-icon">
				<img src="../assets/visa.png" alt="visa" class="payment-icon">
				<img src="../assets/mastercard.png" alt="mastercard" class="payment-icon">
				<img src="../assets/mir.png" alt="mir" class="payment-icon">
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'form-donation',
  data () {
    return {
      image: require('../assets/Background@2x.png'),
      anonim: false,
      currencyOptions: [
        { value: 'EUR' },
        { value: 'RUS' },
        { value: 'USD' }
      ],
      userId: this.$route.params.id,
      donateForm: {
        ank: {
          login: this.$store.getters.user_info.name ? this.$store.getters.user_info.name : '',
          message: ''
        },
        amount: this.$store.getters.streamer_form.donat_amount,
        comission: false
      },
      milestones: {
        mydonat: null,
        badges: [],
        music: [],
        animations: []
      },
      youtube: '',
      payment: [],
      subscribe: false
    }
  },
  computed: {
    ...mapGetters(['color_schema', 'streamer_form', 'streamer_info', 'user_info', 'is_auth', 'mainSettings']),
    background () {
      if (this.streamer_form.background_image === 'image') {
        return this.image
      } else if (this.streamer_form.background_image === 'color') {
        return '#6C55D9'
      } else {
        return 'linear-gradient(to right, #6B35A4, #3D59A7) 90%'
      }
    },
    sounds () {
      var numberArr = Array.from({ length: 2 }, (v, k) => k + 1)
      var arr = []
      numberArr.forEach(function (el) {
        let filename = 'message' + el + '.mp3'
        arr.push({ 'url': '../assets/badges/' + filename, 'filename': filename })
      })
      return arr
    },
    youtubeVideoID: function () {
      const video = this.youtube.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)
      if (video) {
        return video[1]
      }
      return ''
    },
    isYoutubeEnabled: function () {
      // return this.mainSettings.DonateForm.other.donatevideolimit > this.donateForm.amount
      return true
    }
  },
  methods: {
    ...mapActions(['fetchFormData']),
    donat () {
      let requestData = this.donateForm
      requestData.user_id = this.userId
      requestData.youtubeVideoID = this.youtubeVideoID
      axios.post('/donate', requestData).then(response => {
        this.fetchPayment(response.data.order_id)
        this.paykeeper()
      }).catch(error => {
        console.log(error)
      })
    },
    paykeeper () {
      this.$router.push({ name: 'profile', params: { id: this.userId } })
    },
    fetchPayment (orderId) {
      axios.get(`/paykeeper/${orderId}`).then(response => {
        this.payment = response.data
        this.openPaykeeper()
      })
    },
    checkSubscribe () {
      axios.get(`/premium/${this.userId}/checksubscribe/`).then(response => {
        this.subscribe = response.data
      })
    },
    openPaykeeper: function () {
      window.open(this.payment.payment_link, '_blank')
    },
    fetchMydonat () {
      axios.get(`/${this.userId}/mydonat`).then(response => {
        this.milestones.mydonat = response.data
      })
    },
    fetchMilestones () {
      axios.get(`/premium/${this.userId}/milestones`).then(response => {
        this.milestones.badges = response.data.badges
        this.milestones.animations = response.data.animations
        this.milestones.music = response.data.music
      })
    },
    fetchClosestMilestoneData () {
      axios.get(`/mailstone/closest?who_id=${this.userId}`).then(response => {
        console.log(response)
      }
      )
    }
  },
  created () {
    this.fetchFormData(this.userId)
    if (this.is_auth) {
      this.fetchMydonat()
      this.checkSubscribe()
      this.fetchMilestones()
      this.fetchClosestMilestoneData()
    }
  },
  watch: {
    anonim: function (v) {
      this.donateForm.ank.login = v ? 'Аноним' : ''
    },
    'donateForm.amount': function () {
      if (!this.isYoutubeEnabled()) {
        this.youtube = ''
      }
    }
  }
}
</script>

<style>
div#form-donation {
	position: absolute;
	width: 100%;
	height: 100vh;
}
.form-donation {
	height: 100vh;
	width: 100%;
	position: relative;
}
.form-donation-background-image {
	width: 100%;
	height: 198px;
	position: absolute;
	top: 0;
}
.form-donation-footer {
	background: #303060;
	position: relative;
	bottom: 0;
	height: 70px;
	width: 100%;
	padding: 25px 138px;
}
img.payment-icon {
	margin-right: 25px;
}
.streamer-info {
	position: absolute;
	top: 39px;
	left: 138px;
	display: flex;
	align-items: center;
}
img.avatar {
	width: 40px;
	height: 40px;
	margin-right: 10px;
}
/*.form-donation-block {
	position: relative;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 600px 504px;
	grid-column-gap: 20px;
	grid-template-rows: 200px 420px;
	grid-row-gap: 20px;
	padding: 119px 138px;
	}*/
	.form-donation-block {
		position: relative;
		width: 100%;
		/* height: 100%; */
		display: grid;
		grid-template-columns: 1fr 0.98fr;;
		grid-column-gap: 20px;
		grid-template-rows: 32% 66%;
		grid-row-gap: 20px;
		padding: 8.8% 9.5% 3.5% 9.5%;
	}
	.form-block {
		grid-column: 1/2;
		grid-row: 1/3;
		display: grid;
		grid-template-rows: 79px 1fr;
		grid-row-gap: 2px;
	}
	.form-block-top {
		padding: 30px 50px;
		font-size: 12px;
	}
	.form-media {
		padding: 30px 40px;
		grid-column: 2/3;
		grid-row: 1/2;
		border-radius: 5px;
		max-height: 200px;
	}
	.form-advancement {
		grid-column: 2/3;
		grid-row: 2/3;
		display: grid;
		grid-template-rows: 1fr 2fr 4fr;
		grid-row-gap: 2px;
		max-height: 420px;
	}
	.form-advancement-top {
		grid-row: 1/2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 40px;
	}
	.form-advancement-middle {
		grid-row: 2/3;
		padding-top: 30px;
		padding-left: 40px;
	}
	.form-advancement-bottom {
		overflow: auto;
		grid-row: 3/4;
		font-size: 13px;
		padding: 20px 40px;
	}
	.title-block {
		font-size: 12px;
	}

	.description-block {
		font-size: 11px;
		margin: 23px 0;
		line-height: 20px;
	}

	.form-donation-media-input {
		border: 2px solid #595986;
		border-radius: 3px;
		max-height: 425px;
		height: 45px;
		display: flex;
		align-items: center;
	}

	input.form-donation-url-input {
		width: 100%;
		background: transparent;
		border: none;
		font-size: 12px;
	}

	img.media-url {
		width: 15px;
		height: 15px;
		margin: 10px;
	}
	.form-advancement-progress {
		background: #63638B !important;
		max-width: 425px !important;
		height: 7px !important;
	}
	.form-advancement-progress > .progress-bar {
		background: linear-gradient(to right, #9834D7, #3D79DC) 100%;
	}
	img.form-advancement-image {
		width: 60px;
		height: 60px;
		margin-right: 10px;
	}

	.form-advancement-sounds {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		/*padding-top: 25px;*/
	}
	.advancement-sounds {
		border-radius: 3px;
		border: 2px solid #595986;
		height: 85px;
		display: flex;
		align-items: center;
	}

	img.input-icon {
		width: 20px;
		height: 20px;
		margin: 10px;
		cursor: pointer;
	}

	.custom-input {
		border: 2px solid #595986;
		background: transparent;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	input.username-input {
		width: 100%;
		background: transparent;
		border: none;
	}

	.form-block-bottom {
		padding: 20px 50px;
		font-size: 12px;
	}

	.group-form-currency {
		display: grid;
		grid-template-columns: 380px 100px;
		grid-column-gap: 20px;
		margin: 25px 0;
	}
	textarea.textarea-input {
		width: 500px;
		height: 105px;
		background: transparent;
		border: 2px solid #595986;
		padding: 15px 15px 15px 20px;
	}
	label.payment-input {
		background: #46467B;
		width: 110px;
		height: 60px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.group-radio-payment {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 20px;
	}
	label.payment-input > input {
		display: none;
	}
	.payment-form {
		margin-top: 25px;
	}

	.submit-action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
	}
	.button-submit {
		height: 45px;
	}

	.checkbox-form-donation {
		position: relative;
		padding: 0 25px;
	}

	input.checkbox-anonim {
		display: none;
	}

	.custom-checkbox {
		position: absolute;
		top: 0;
		left: 0;
		height: 15px;
		width: 15px;
		background-color: transparent;
		border: 2px solid white;
		border-radius: 3px;
	}

	input.checkbox-anonim:hover ~ .custom-checkbox,
	input.checkbox-anonim:checked ~ .custom-checkbox {
		background: url(../assets/check-radio.svg) no-repeat center, white;
	}
	.play-icon-btn {
		width: 20px;
		height: 20px;
		margin: 15px;
		cursor: pointer;
	}
	.form-sound {
		height: 45px;
	}

	label.payment-input:hover {
		background: linear-gradient(to right, #6B35A4 0%, #3D59A7 51%);
	}
	textarea#message {
		display: block;
	}
</style>
