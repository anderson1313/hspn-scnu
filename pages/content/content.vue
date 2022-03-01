<template>
	<!--新闻、干货的详情页面-->
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
				      progress: {
				          color: '#FF3333'
				      }
				    
				},
				url:""
			}
		},
		methods: {
	        onLoad(e) {
	             // 获取传递过来的链接
				//let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				//let curRoute = routes[routes.length - 1].$page.fullPath //获取当前页面路由
				
				console.log(e.url)
	            this.url = decodeURIComponent(e.url)
				console.log(this.url)
	        }		
		}
	}
</script>

<style>

</style>
