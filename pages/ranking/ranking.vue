<template>
	<view class="container">
		<view class="myscore">
			<view class="mark"></view>
			<view class="avatar"></view>
			<view class="place"></view>
		</view>
		
		<view class="allscores">
			<view v-for="(item,index) in allscore" :key='index' class="eachscore">
				<view class="place"></view>
				<view class="avatar"></view>
				<view class="name"></view>
				<view class="mark"></view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allscore:[
					{
						name:'a',
						place:1,
						mark:98,
						avatar:'url'
					},
					{
						name:'b',
						place:2,
						mark:97,
						avatar:'url'
					},
					{
						name:'a',
						place:3,
						mark:96,
						avatar:'url'
					}
				]
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
