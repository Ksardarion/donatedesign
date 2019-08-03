<template>

	<div class="input-group color-picker" ref="colorpicker">
		<span class="input-group-addon color-picker-container">
			<span class="current-color" :style="'background-color: ' + color" @click="togglePicker()"></span>
			<chrome-picker :value="color" @input="updateFromPicker" v-if="displayPicker" />
		</span>
	</div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'color-picker',
  components: {
    'chrome-picker': Chrome
  },
  props: ['color'],
  data () {
    return {
      colors: {
        hex: '#6C55D9'
      },
      colorValue: '',
      displayPicker: false
    }
  },
  mounted () {
    this.setColor(this.color || '#6C55D9')
  },
  methods: {
    setColor (color) {
      this.updateColors(color)
      this.colorValue = color
    },
    updateColors (color) {
      if (color.slice(0, 1) === '#') {
        this.colors = {
          hex: color
        }
      } else if (color.slice(0, 4) === 'rgba') {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
        var hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)
        this.colors = {
          hex: hex,
          a: rgba[3]
        }
      }
    },
    showPicker () {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
    },
    hidePicker () {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    togglePicker () {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    updateFromInput () {
      this.updateColors(this.colorValue)
    },
    updateFromPicker (color) {
      this.colors = color
      if (color.rgba.a === 1) {
        this.colorValue = color.hex
      } else {
        this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')'
      }
    },
    documentClick (e) {
      let el = this.$refs.colorpicker
      let target = e.target
      if (el !== target && !el.contains(target)) {
        this.hidePicker()
      }
    }
  },
  watch: {
    colorValue (val) {
      if (val) {
        this.updateColors(val)
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style>
.vc-chrome {
	position: absolute;
	top: 46px;
	right: -85px;
	z-index: 9;
}
.current-color {
	display: block;
	width: 100%;
	height: 65px;
	cursor: pointer;
	border-radius: 3px;
	position: absolute;
	right: 0px;
	top: 0px;
}
</style>
