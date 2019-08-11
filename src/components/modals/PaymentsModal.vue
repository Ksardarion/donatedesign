<template>
	<b-modal id="payments-modal"
					 ref="payments_modal"
					 hide-header
					 hide-footer
					 content-class="payments-modal-content"
					 :body-class="['payments-modal-body', color_schema.item]"
					 centered
	>
		<button type="button" class="close" @click="hideModal">
			<img class="icon-close" src="../../assets/close.svg">
		</button>
		<div class="modal-title text">НОВЫЙ СПОСОБ ВЫВОДА</div>
		<b-form class="form-modal payments">
			<div class="list-form-input-column">
				<div class="form-group">
					<label>Платёжная система</label>
					<div class="select-block">
						<b-dropdown toggle-class="drop-select-block" id="payment_type"
												v-model="selectedItem.code"
												:text="selectedItem.value"
												dropbottom
												class="btn my-btn"
						>
							<b-dropdown-item v-for="(item, index) in items"
															 :value="item.code"
															 :class="{ active: selectedItem.value === item.value }"
															 @click="selectedItem.value = item.value; selectedItem.code = item.code"
															 :key="index"
							>
								{{ item.value }}
							</b-dropdown-item>
						</b-dropdown>
					</div>
				</div>
				<div class="input-group-card">
					<div class="group-input">
						<label for="number_card" class="text" :class="color_schema.text">Номер карты или кошелька</label>
						<input
							id="number_card"
							type="text"
							class="text-input"
							required
							pattern="\d*"
							placeholder="Введите номер карты или кошелька"
							v-model="selectedItem.number"
						/>
					</div>
				</div>

			</div>
			<div class="submit-btn">
				<button class="default-button text"
								type="submit"
								@click.prevent="createMethod"
				>Создать</button>
			</div>
		</b-form>

	</b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'payments-modal',
  data () {
    return {
    	selectedItem: {
    		value: 'Банковская карта',
        code: 'credit_card',
        number: ''
    	},
      items: [
        {
          value: 'Банковская карта',
          code: 'credit_card'
        },
        {
          value: 'Web Money',
          code: 'web_money'
        },
        {
          value: 'Yandex Money',
          code: 'yandex_money'
        },
        {
          value: 'Qiwi',
          code: 'qiwi'
        }
      ]
    }
  },
  methods: {
    hideModal () {
      this.$refs.payments_modal.hide()
    },
    createMethod () {
    	axios.post('/payments/add', { code: this.selectedItem.code, number: this.selectedItem.number })
      this.$emit('created', { code: this.selectedItem.code, number: this.selectedItem.number })
      this.hideModal()
    }
  },
  computed: {
    ...mapGetters(['color_schema']),
    item_value () {
      return 'Банковская карта'
    }
  }
}
</script>

<style scoped>
	.login-modal-body {
		position: initial;
	}
	.title {
		/*color: white;*/
		font-size: 40px;
		line-height: 69px;
	}

	.description {
		color: #9197CE;
		font-size: 16px;
		color: #9197CE;
		line-height: 30px;
	}

	.login.modal {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	a.social-button, div.social-button {
		width: 45px;
		height: 45px;
		padding: 14px;
		background-color: #635CDA;
		border-radius: 30px;
		margin: 60px 10px;
		display: flex;
		justify-content: center;
	}
	.login-form-check {
		display: flex;
		justify-content: space-between;
		padding: 0 100px;
		margin-top: 62px;
	}

	.modal-title {
		font-size: 20px;
		color: white;
		line-height: 24px;
	}

	.custom-control-input:checked~.custom-control-label::before {
		color: #9D95C9 !important;
		border-color: #9D95C9 !important;
		border-width: 2px !important;
		background-color: transparent !important;
	}

	.custom-radio .custom-control-label::before {
		border-radius: 50%;
		border-color: #9D95C9;
		border-width: 2px;
		background-color: transparent;
	}
	img.icon {
		width: 30px;
		height: 30px;
		margin-left: 25px;
	}

	button.close {
		position: absolute;
		top: 30px;
		right: 30px;
	}

	img.icon-close {
		width: 15px;
		height: 15px;
	}
	.social-buttons {
		display: flex;
		justify-content: center;
	}

	.modal-content.payments-modal-content{
		max-width: 360px;
	}

	.list-form-input-column {
		padding: 0 40px;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-row-gap: 20px;
		margin: 20px 0;
	}
</style>
