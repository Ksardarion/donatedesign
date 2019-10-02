<template>
	<div class="content-app settings donat">
		<div class="donat-header">
			<div class="text" :class="color_schema.title_text">
				СПОСОБЫ ВЫВОДА ДОНАТОВ
			</div>
			<b-button v-b-modal.payments-modal class="btn-add"></b-button>
		</div>
		<div class="donat-content">
			<div class="payment-list">
				<div class="payment-item" v-for="item in paymentItems" :class="color_schema.item">
					<div class="payment-info">
						<div class="payment-item-checkbox" >
							<label class="switch-checkbox">
								<input type="radio"
											 :id="'select-payment-' + item.id"
											 @change="togglePaymentStatus(item)"
											 v-model="item.active"
											 :checked="item.active"
											 :key="'select-payment-' + item.id"
								>
								<span class="payment-slider-checkbox round"></span>
							</label>
						</div>

						<div class="payment-name" v-if="getMethodName(item.code) === 'Credit card'">
							{{getMethodName(item.code)}}
						</div>
						<img :src="require('../assets/' + item.code + '.svg')" :alt="item.name">
					</div>
					<div class="payment-number">
						{{ item.number }}
					</div>
					<div class="payment-actions">
						<button style="border: 0" class="edit-link btn-action" />
						<button @click="removeMethod(item)" style="border: 0" class="delete-link btn-action" />
					</div>
				</div>
			</div>
			<div class="settings-donation-form text" v-if="!user">
				<div :class="color_schema.title_text">
					НАСТРОЙКИ ФОРМЫ ДОНАТА
				</div>
				<div class="description" :class="color_schema.text">
					Редактор страницы перевода вам пожертвований от подписчиков.
				</div>
				<div class="action-block">
					<div class="donation-form" :class="color_schema.item">
						<form id="donation-form">
							<label>Верхняя панель страницы</label>
							<div class="group-radio-form">

								<div class="group-input">
									<label >

										<div class="checkbox-form-donation">
											<input type="radio" name="background-default" value="default" v-model="settings.main.bg"
														 class="form-donation-radio">
											<span class="custom-checkbox"></span>
											Стандартно
										</div>
										<div class="background-image-block default">

										</div>
									</label>
								</div>
								<div class="group-input">
									<label>

										<div class="checkbox-form-donation">
											<input type="radio" name="background-color" value="color" v-model="settings.main.bg"
														 class="form-donation-radio">
											<span class="custom-checkbox"></span>
											Цвет
										</div>
										<div class="background-image-block color">
											<color-picker :color="settings.main.bgColor" v-model="settings.main.bgColor" />
										</div>
									</label>
								</div>
								<div class="group-input">
									<label  >

										<div class="checkbox-form-donation">
											<input type="radio" name="background-image" value="image" v-model="settings.main.bg"
														 class="form-donation-radio">
											<span class="custom-checkbox"></span>
											Изображение
										</div>
										<div class="background-image-block image">
											<vue-dropzone
												id="dropzone"
												ref="myVueDropzone"
												@vdropzone-file-added="showImageDropzone = !showImageDropzone"
												@vdropzone-removed-file="showImageDropzone = !showImageDropzone"
												@vdropzone-success="saveFileToConfig"
												:include-styling="false"
												:options="dropzoneImageOptions"
												:useCustomSlot="true"
												v-on:vdropzone-thumbnail="thumbnail"
											>
												<div class="dropzone-custom-content" ref="dropzoneContent" v-show="showImageDropzone">
													<div class="dropzone-custom-title">
														<img src="../assets/upload-cloud.svg" alt="Upload Cloud" class="upload-img">
														<div class="text" :class="color_schema.extra">ВЫБРАТЬ ФАЙЛ</div>
													</div>

													<div class="subtitle" :class="color_schema.text">JPG, PNG</div>
												</div>
											</vue-dropzone>
										</div>
									</label>
								</div>
							</div>

						</form>
					</div>
					<div class="donation-form-preview" :class="color_schema.item">
						<div class="top-block">
							<div :class="color_schema.text"> Превью </div>
							<router-link :to="{name: 'form-donation', params: { id: this.$store.getters.user_info.id }}"
													 class="form-donation-page-link" :class="color_schema.title_text">
								Посмотреть полный размер
								<img src="../assets/right-arrow.svg" alt="arrow" class="arrow-icon">
							</router-link>
						</div>

						<div class="preview-form-donation-page">
							<form-donation :myId="$store.getters.user_info.id"/>
						</div>
					</div>

					<div class="slider-donation-form" :class="color_schema.item">
						<div>Минимальная сумма доната</div>
						<div class="amount-slider">
							<b-form-slider ref="range" :min="0" :max="1200" v-model="settings.main.minDonate" />
							<div class="slider-value text">{{ settings.main.minDonate }}</div> {{ getUserCurrency }}
						</div>
					</div>
					<div class="form-buttons">
						<div class="buttons">
							<button class="button-cancel">СБРОС</button>
							<button @click="updateDonateForm(settings)" class="default-button">СОХРАНИТЬ</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<payments-modal @created="pushMethod"/>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ColorPicker from '@/components/donat-component/ColorPicker.vue'
import PaymentsModal from '@/components/modals/PaymentsModal.vue'
import axios from 'axios'

export default {
  name: 'donat',
  components: {
    ColorPicker,
    vueDropzone: vue2Dropzone,
    PaymentsModal
  },
  computed: {
    ...mapGetters(['color_schema', 'user', 'getUserCurrency'])
  },
  data () {
    return {
      dropzoneImageOptions: {
        url: 'https://api.donatesupp.com/api/image/upload/',
        thumbnailWidth: 150,
        maxFilesize: 3,
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.token },
        maxFiles: 1,
        previewTemplate: this.template()
      },
      showImageDropzone: true,
      paymentItems: [],
      settings: {
        main: {
          bg: 'default',
          bgColor: '#6C55D9',
          bgImage: require('../assets/Background@2x.png'),
          minDonate: 500
        }
      },
      id: 'payments'
    }
  },
  methods: {
    togglePaymentStatus: function (item) {
      axios.post(`/payments/${item.id}`, { toggle: true })
    },
    template: function () {
      return `<div class="dz-preview dz-file-preview">
				<div class="dz-image">
				<div data-dz-thumbnail-bg></div>
				</div>
				<div class="dz-details">
					<div class="dz-filename"><span data-dz-name></span></div>
					<div data-dz-remove class="remove-icon"> </div>
				</div>
				<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
				<div class="dz-error-message"><span data-dz-errormessage></span></div>

				</div>
				`
    },
    thumbnail: function (file, dataUrl) {
      var j, len, ref, thumbnailElement
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview')
        ref = file.previewElement.querySelectorAll('[data-dz-thumbnail-bg]')
        for (j = 0, len = ref.length; j < len; j++) {
          thumbnailElement = ref[j]
          thumbnailElement.alt = file.name
          thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")'
        }
        return setTimeout(((function (_this) {
          return function () {
            return file.previewElement.classList.add('dz-image-preview')
          }
        })(this)), 1)
      }
    },
    fetchFormData: function () {
      axios.get('/user/donationformdata')
        .then((response) => { if (response.data.form_settings) this.settings = response.data.form_settings })
    },
    updateDonateForm: function () {
      return axios.post(`/donate/settings/${this.$store.getters.user_info.id}`, { settings: this.settings })
    },
    saveFileToConfig: function (file, xhr) {
      this.settings.main.bgImage = xhr.src
      return axios.post(`/donate/settings/${this.$store.getters.user_info.id}`, { settings: this.settings })
    },
    fetchPaymentMethods: function () {
      axios.get('/payments/list')
        .then((response) => { this.paymentItems = response.data })
    },
    removeMethod: function (item) {
      axios.delete(`/payments/${item.id}`)
      this.paymentItems.splice(this.paymentItems.indexOf(item), 1)
    },
    pushMethod: function (method) {
      this.paymentItems.push(method)
    },
    getMethodName: function (code) {
      let name = 'Credit card'
      switch (code) {
        case 'web_money':
          name = 'Web Money'
          break
        case 'yandex_money':
          name = 'Yande Money'
          break
        case 'qiwi':
          name = 'QIWI'
          break
      }
      return name
    }
  },
  created () {
    this.fetchFormData()
    this.fetchPaymentMethods()
  }
}
</script>

<style scoped>
	.payment-item-checkbox {
		padding-right: 20px;
	}

	.switch-checkbox {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 20px;
	}

	.switch-checkbox input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	label.switch-checkbox {
		margin: 0;
	}

	.payment-slider-checkbox {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #7E7EA5;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.payment-slider-checkbox:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 0px;
		bottom: 0px;
		top: 1px;
		background:white;
		-webkit-transition: .4s;
		transition: .4s;
	}

	input:checked + .payment-slider-checkbox {
		background-color: #6C55D9;
	}

	/*input:checked + .collapse-slider-checkbox:before {
    background: white;
    background-size: 50% auto, cover;
    }*/

	input:focus + .payment-slider-checkbox {
		box-shadow: 0 0 1px #2C2C43;
	}

	input:checked + .payment-slider-checkbox:before {
		-webkit-transform: translateX(18px);
		-ms-transform: translateX(18px);
		transform: translateX(18px);
	}
	.payment-slider-checkbox.round {
		border-radius: 23px;
	}

	.payment-slider-checkbox.round:before {
		border-radius: 50%;
	}
</style>

<style scoped>
	.settings.donat {
		display: grid;
		grid-template-rows: 25px 1fr;
		grid-row-gap: 25px;
		grid-template-columns: 53.4%;
	}
	.donat-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.donat-header > .text {
		font-size: 13px;
		margin-right: 20px;
	}
	.payment-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 60px;
		grid-row-gap: 10px;
	}
	.payment-item {
		border-radius: 10px;
		padding: 0 25px;
		display: grid;
		grid-template-columns: 2fr 2fr 1fr;
		font-size: 13px;
		align-items: center;

	}
	.payment-name {
		font-size: 10px;
		margin-right: 5px;
	}

	.payment-info {
		display: flex;
	}

	.background-image-block {
		width: 160px;
		height: 65px;
		border-radius: 3px;
		margin-top: 15px;
		position: relative;
	}

	.background-image-block.default {
		background:	linear-gradient(#6B35A4, #3D59A7);
	}

	.background-image-block.color {
		background: #6C55D9;
	}

	form#donation-form > label {
		margin-bottom: 15px;
	}
	.settings-donation-form > .description {
		font-size: 11px;
	}
	.settings-donation-form {
		margin-top: 40px;
	}

	.group-radio-form {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.donation-form {
		padding: 30px 25px;
		grid-column: 1/2;
		grid-row: 1/2;
		border-radius: 10px 10px 0 0;
	}

	.action-block {
		display: grid;
		grid-template-columns: 560px 1fr;
		grid-template-rows: 1.5fr 1fr 1fr;
		grid-row-gap: 3px;
		grid-column-gap: 20px;
	}

	.donation-form-preview {
		grid-column: 2/2;
		grid-row: 1/3;
		width: 470px;
		border-radius: 10px;
		position: relative;
		padding: 20px;
	}
	.slider-donation-form {
		padding: 25px;
		grid-column: 1/2;
		grid-row: 2/3;
		border-radius: 0 0 10px 10px;
	}

	.form-buttons {
		grid-column: 1/2;
		grid-row: 3/4;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.form-buttons > .buttons {
		height: 45px;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	button.button-cancel {
		background: #434377;
		border: none;
		width: 100px;
		height: 100%;
		border-radius: 33px;
		color: white;
		box-shadow: #060333 0 3px 20px;
	}

	.preview-form-donation-page {
		position: absolute;
		width: 300%;
		transform: scale(0.3);
		transform-origin: top left;
		top: 17%;
		pointer-events: none;
	}
	.donation-form-preview > .top-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

</style>

<style scoped>

	/*custom checkbox*/

	.checkbox-form-donation {
		position: relative;
		padding: 0 25px;
	}

	input.form-donation-radio {
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

	input.form-donation-radio:hover ~ .custom-checkbox,
	input.form-donation-radio:checked ~ .custom-checkbox {
		background: url(../assets/check-radio.svg) no-repeat center, white;
	}

	.custom-checkbox::before {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid black;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.background-image-block > div#dropzone > .dz-message > .dropzone-custom-content {
		height: 65px;
	}

	#dropzone .dz-preview {
		width: 160px;
		display: inline-block
	}
	#dropzone .dz-preview .dz-image {
		width: 160px;
		height: 65px;
	}
	#dropzone .dz-preview .dz-image > div {
		width: inherit;
		height: inherit;
		background-size: contain;
		background: no-repeat;
	}
	#dropzone .dz-preview .dz-image > img {
		width: 100%;
	}

	#dropzone .dz-details {
		position: absolute;
		bottom: -30px;
		left: 0;
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}
	#dropzone .dz-success-mark, .dz-error-mark, .dz-remove {
		display: none;
	}
	div.remove-icon {
		background: url(../assets/remove-btn.svg);
		width: 20px;
		height: 20px;
	}
</style>
