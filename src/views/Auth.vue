<template>
	<div class="content-app">
		=) {{ token }}
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'token'
		])
	},
	methods: {
		...mapMutations([
			'setToken'
		])
	},
	created () {
		this.setToken(this.$route.query.token)
	}
}
</script>


<style lang="css" scoped>
	.content-app {
		color: #fff;
	}
</style>
