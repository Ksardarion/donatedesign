<template>
	<div class="content-app">
		=) {{ token }}
	</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'token'
		])
	},
	methods: {
		...mapActions([
			'fetchUser'
		]),
		...mapMutations([
			'setToken'
		])
	},
	created () {
		this.setToken(this.$route.query.token)
		this.fetchUser()
		this.$router.push({ name: 'dashboard'})
	}
}
</script>


<style lang="css" scoped>
	.content-app {
		color: #fff;
	}
</style>
