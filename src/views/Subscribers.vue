<template>
  <div class="content-app1 subescribers">
    <div class="info-blocks">
      <info-block title="Мои подписчики" :counter="statistic.all"/>
      <info-block title="В этом месяце" :counter="statistic.mounth"/>
    </div>
		<div v-if="sections">
			<info-round-chart title="Процент Подписок" :sections="sections" :legends="true" :total="total" />
		</div>

    <subscribers-list />
  </div>
</template>
<script>
import axios from 'axios'
import InfoBlock from '@/components/InfoBlock.vue'
import InfoRoundChart from '@/components/InfoRoundChart.vue'
import SubscribersList from '@/components/SubscribersList.vue'

export default {
  name: 'subscribers',
  components: {
    InfoBlock,
    InfoRoundChart,
    SubscribersList
  },
  data () {
    return {
      sections: null,
			statistic: {
				all: 0,
				mounth: 0
			}
    }
	},
	computed: {
		total () {
			return this.sections.reduce((a, b) => +a + +b.value, 0);
		}
	},
	methods: {
		fetchStatistic () {
			axios.get('/subscribers/statistic').then(response => {
				this.statistic = response.data
				this.sections = response.data.chart
			})
		}
	},
	created () {
		this.fetchStatistic()
	}
}
</script>

<style scoped>
</style>
