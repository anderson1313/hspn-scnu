<template>
	<view>
		<view class="imageBox">
			<image class="image" src="../../static/aboutUs.png" mode="aspectFill"></image>
		</view>
		<view class="introductionBox">
			<view class="titleBox">
				<image class="titleIcon" src="../../static/about.png" mode=""></image>
				<text class="title">关于我们</text>
			</view>
			<view class="textBox">
				<text class="introduction">我们是一个致力于开发手写汉字评价小程序的团队，希望“横撇竖捺”小程序可以帮助中小学生或书法爱好者提高自己的书法水平！</text>
			</view>
			<text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.imageBox{
		width:100%;
		height:450rpx;
		
	}
	.image{
		width:100%;
		height:450rpx;
		
	}
	.introductionBox{
		width:84%;
		margin-left:7%;
		margin-top: 35rpx;
	}
	.titleBox{
		width:100%;
		height:35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 5rpx;
	}
	.titleIcon{
		width:50rpx;
		height:40rpx;
		margin-right: 15rpx;
	}
	.title{
		font-size: medium;
		/*#002f81*/
		color:#291686
	}
	.textBox{
		width:100%;
		height:100rpx;
		margin-top: 15rpx;
	}
	.introduction{
		font-size: small;
		font-weight: 400;
	}
</style>
