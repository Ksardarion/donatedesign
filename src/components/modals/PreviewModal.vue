<template>
	<b-modal id="preview-modal"
					 ref="preview_modal"
					 hide-header hide-footer
					 content-class="preview-modal-content"
					 :body-class="['preview-modal-body', color_schema.item]"
					 centered
	>
		<div class="custom-position-block" v-if="settings.length">
			<drr
				v-for="element in elements"
				:key="element.id"
				:x="element.x * bound.w"
				:y="element.y * bound.h"
				:w="element.w"
				:h="element.h"
				:angle="element.angle"
				:hasActiveContent="true"
				:outerBound="bound"
				@change="update(element.id, $event);"
			>
				<div class="element" :style="getElementStyles(element)" v-if="element.id !== 'image'">
					{{ element.text }}
				</div>
				<img v-else :src="image" :style="{ width: '100%', height: '100%' }">
			</drr>
		</div>
		<div class="preview-modal-footer text" :class="color_schema.item">
			<div class="preview-action-button text">
				<button class="default-button preview-save" @click="hideModal">СОХРАНИТЬ</button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import imgDog from '../../assets/dog.png'

export default {
  name: 'preview-modal',
  props: ['settings', 'image'],
  data () {
    return {
      offsetX: 0,
      offsetY: 0,
      bound: { w: 1000, h: 645, x: 500, y: 322.5 }
    }
  },
  methods: {
    hideModal () {
      this.$refs.preview_modal.hide()
    },
    update (id, payload) {
      this.elements = this.elements.map(item => {
        if (item.id === id) {
          let position = { ...item, ...payload }
          this.$emit('change-' + item.id, position)

          return position
        }
        return item
      })
    },
    getElementStyles (element) {
      const styles = element.styles ? element.styles : {}
      return {
        w: `${element.width}px`,
        h: `${element.height}px`,
        ...styles
      }
    }
  },
  computed: {
    ...mapGetters(['color_schema', 'user']),
    elements: {
      get () {
        return this.settings
      },
      set () {
        //
      }
    }
  }
}
</script>

<style>
.preview-modal-content {
  width: 1000px !important;
  height: 645px !important;
  background-color: #2B2B59 !important;
  border-radius: 15px !important;
  text-align: center !important;
}

.custom-position-block {
  width: 100%;
  height: 550px;
  background: #2B2B59;
  position: absolute;
  top: 0;
  left: 0;
}

.preview-modal-footer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 30px;
}

button.preview-close {
  border-radius: 33px;
  width: 130px;
  height: 45px;
  margin-right: 20px;
}

button.preview-save {
  height: 45px;
}

@media (min-width: 576px){
  #preview-modal > .modal-dialog {
    max-width: 1000px !important;
  }
}

</style>

<style scoped>

</style>
