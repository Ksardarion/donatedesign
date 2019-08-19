<template>
	<div class="donat-alert-item" :class="color_schema.item">
		<div class="alert-item-checkbox" >
			<label class="switch-checkbox" :for="'select-alert'+alert.id">
				<input type="checkbox" :id="'select-alert'+alert.id" @change="activeToggle(alert)" v-model="alert.active" :key="'select-alert' +alert.id">
				<span class="alert-slider-checkbox round"></span>
			</label>
		</div>

		<slot name="counter"></slot>

		<div class="alert-item-actions">
			<button
				@click="preview(alert.type, {
					image: '/img/dog.png',
					counter: alert.amount.min,
					message: alert.settings.alert_message,
					title: alert.settings.alert_title
				})"
				style="border: 0"
				class="preview-link btn-action"
			/>
			<button
				style="border: 0"
				class="copy-link btn-action"
				v-tooltip.hover.top.end="{ content: 'Копировать ссылку', class: 'tooltip-custom' }"
				v-clipboard="alert.link"
			/>
			<button @click="editAlert(alert)" v-b-toggle.alerts-actions style="border: 0" class="edit-link btn-action" />
			<button @click="destroy(alert)" style="border: 0" class="delete-link btn-action" v-b-modal.destroy-modal/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    alert: {
      required: true
    },
    color_schema: {
      required: true
    }
  },
  methods: {
    editAlert (alert) {
      this.$emit('editing', alert)
    },
    preview (type, options) {
      axios.post(`/alerts/preview/${type}`, options).then(response => {
        // this.links = response.data
      })
    },
    activeToggle (alert) {
      axios.put(`/alerts/${alert.id}`, alert).then(response => {
        // this.fetchAlerts()
      })
    },
    destroy (alert) {
      this.$emit('destroy', alert)
    }
  }
}
</script>
