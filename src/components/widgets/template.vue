<template>
  <div>
		<!-- {{ settings.widget_type.message }} -->
    <text-marquee
      :style="style"
      v-if="settings.widget_animation.class_name === 'crawl-line'"
      :content="message.fullMessage"
      :speed="settings.widget_animation_delay"
    ></text-marquee>
    <div v-else-if="settings.widget_animation.class_name === 'widget-slider'">
      <div :style="`${style}; font-size: ${settings.widget_font_size}px;`">{{message.name}}</div>
      <vue-swimlane
        :scale="settings.widget_font_size / 10"
        :style="style"
        :transitionDuration="duration"
        :words="message.items"
      ></vue-swimlane>
    </div>
    <div v-else-if="settings.widget_animation.class_name === 'widget-list'">
      <div :style="style">{{message.name}}</div>
      <div :style="style" v-for="(item, i) in message.items" :key="`template_item_${i}`">
        {{item}}
      </div>
    </div>
    <span
      v-else
      v-text="message.fullMessage"
      :style="style"
    ></span>
  </div>
</template>

<script>
import { VTextMarquee } from 'vue-text-marquee'

export default {
  components: {
    TextMarquee: VTextMarquee
  },
  props: {
    settings: {
      required: true
    }
  },
  computed: {
		message : function () {
			return {
				fullMessage: this.settings.widget_type.message,
				name: this.settings.widget_type.message,
				items: ['DS1', 'DS2', 'DS3']
			}
		},
    duration: function () {
      return Number(this.settings.widget_animation_delay)
    },
    style: function () {
      let style = ''
      if (this.settings.widget_color) {
        style = style + `color:${this.settings.widget_color};`
      }
      if (this.settings.widget_font_size) {
        style = style + `font-size:${this.settings.widget_font_size}pt;`
      }
      return style
    }
  },
  created() {
    console.log(this.settings.widget_animation_delay)
  },
}
</script>
