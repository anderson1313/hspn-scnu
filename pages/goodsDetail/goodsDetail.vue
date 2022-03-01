<template>
	<view class="container">
		<view class="return">
			<view class="returnicon iconfont icon-fanhui" @click="goback"></view>
		</view>
		<view class="name">-商品详情-</view>
		<scroll-view scroll-y="true" class="middle" style="height: 1083rpx;">
			<!-- 轮播图 -->
			<view class="carousel">
				<swiper class="home-swiper" indicator-dots="true":autoplay="autoplay":interval="interval":circular="circular":duration="duration">
					<block v-for="(item, key) in lunboData":key="key">
						<swiper-item class="swiper-item">
							<image :src="item.imgurl" class="slide-image"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view class="introduce-section">
				
						<view class="title">英雄钢笔墨水颜料型经典蓝黑墨水钢笔学生用</view>
						<view class="subtitle">经典品牌墨水 不堵笔 下水流畅</view>
						<view class="price-box">
							<text class="price-tip">￥</text>
							<text class="price">5.8</text>
							<text class="m-price">￥6.8</text>
						</view>
						<view class="bot-row">
							<text>月销量：1万+</text>
							<text>库存：23198</text>
						</view>
			</view>
			<view class="c-row">
						<text class="tit">促销活动</text>
						<view class="con-list">
							<text>买两瓶送钢笔一支</text>
						</view>
			</view>
			<!-- 中间部分 -服务 --> 
			<view class="c-row">
						<text class="tit">服务</text>
						<view class="bz-list con">
							<text>正品保证 · </text>
							<text>极速退款 · </text>
							<text>假一赔十 · </text>
							<text>7天无理由退货 ·</text>
						</view>
			</view>
			<!-- 图文详情 -->
				<view class="detail-desc">
					<view class="d-header">
						<text>———— 图文详情 ————</text>
					</view>
					<view class="d-photo" v-for="(item,key) in dphotos":key="key">
						<image :src="item.imgurl" class="photo"></image>
					</view>
				</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="page-bottom">
			<view class="icon-container customer" >
				<view @click="like()" class="customer-icon">
					<!-- <image:src="likeornot"></image> -->
					<!-- <view>{{collectpic}}</view> -->
					<image :src="collectpic" :animation="likean"></image>
				</view>
			        <text>{{collecttext}}</text>
			</view>
			      <view class='icon-container cart' >
			        <image src="../../static/cart.png" class="cart-icon"></image>
			        <text>购物车</text>
			      </view>
			      <view class='go-container'>
			        <view class='joinCart'><text>加入购物车</text></view>
			        <view class='immediately'><text>立即购买</text></view>
			      </view>
		</view>
	</view>
</template>

<script>
	import {
		Api
	} from '../../common/api.js'
	const apiModel = new Api()
	export default {
		data() {
			return {
				//轮播图配置
				lunboData: [],
				autoplay: true, //是否自动切换
				interval: 3000, //自动切换时长
				duration: 1200, //滑动动画时长
				circular: true, //是否自动采用衔接滑动
				//商品信息
				goodsInf: [],
				//图文详情
				dphotos:[{
					"id":1,
					"imgurl" : "https://img.alicdn.com/imgextra/i4/2863772772/O1CN01Gjt79o1WLcWGONXbU_!!2863772772.jpg"
				},
				{
					"id" : 2,
					"imgurl" : "https://img.alicdn.com/imgextra/i1/2863772772/O1CN014GM0bB1WLcWFnHdmm_!!2863772772.jpg"
				}
				],
				//收藏
				collecttext:"收藏",
				collectornot: 0,
				collectpic:"../../static/collect.png",
				islike:"../../static/collected.png",
			}
		},
		onLoad(){
			this.loadFontWeb();
			//轮播图
			this.swiperPictures();
		},
		methods: {
			swiperPictures(){
				this.lunboData = [{
					"id" : 1,
					"imgurl" : "https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i4/116569370/O1CN017HGeAU2J5VoX6rOC7_!!0-saturn_solar.jpg_360x360Q90.jpg"
				},
				 {
					"id" : 2,
					"imgurl" : "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2863772772/O1CN0146xK961WLcZTz796B_!!2863772772.jpg"
				},
				{
					"id" : 3,
					"imgurl" : "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2863772772/O1CN01kNYDLe1WLcZUn8l2Y_!!2863772772.jpg"
				}]
		},
			loadFontWeb() {
				const url = 'https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf'
				uni.loadFontFace({
					family: 'font1',
					source: `url("${url}")`
				})
			},
			goback(e){
				uni.navigateBack({
					
				})
			},
			likeAnimation(){
				var ani = uni.createAnimation({
					delay: 0,
				
				});
				ani.scale(0.5).step({
					duration: 200
				});
				ani.scale(1).step({
					duration: 200
				})
				this.likean = ani.export()
			},
			like(e){
				this.likeAnimation();
				setTimeout(() => {
					if (this.collectornot == 1) {
				
						this.collectornot = 0,
							this.collecttext = "收藏",
							this.collectpic = "../../static/collect.png"
						uni.showToast({
							title: '已移除「收藏」',
							icon: 'none'
						})
					} else {
						this.collectornot = 1,
							this.collecttext = "已收藏",
							this.collectpic = "../../static/collected.png"
						uni.showToast({
							title: '已加入「收藏」',
							icon: 'none'
						})
				
					}
				
				}, 600);
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	    background: #F1F2F6;
	    padding-bottom: 160rpx;
	}
	.container{
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height: 100%;
		margin: 0 auto;
		
	}
	.carousel {
			height: 800rpx;
			position: relative;
		}
	/*轮播控件*/
	.home-swiper {
			width: 100%;
			height: 100%;
		}
	 
	.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
		}
	 
	.slide-image {
			width: 100%;
			height: 100%;
		}

	.return{
		z-index: 99;
		background: #F1F2F6;
		height: 100rpx;
		margin-top: 70rpx;
		padding-left: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.name {
		z-index: 99;
		font-family: "font1";
		font-size: 50rpx;
		height: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F1F2F6;
		padding-bottom: 30rpx;
	}
	
	.icon-fanhui{
			margin-top: 50rpx;
			font-size: 60rpx;
		
	}
	
	/* 商品介绍 */
		.introduce-section {
			background: #ffffff;
			padding: 20rpx 30rpx;
		}
	 
		.introduce-section .title {
			font-size: 32rpx;
			color: #303133;
			height: 50rpx;
			line-height: 50rpx;
		}
		.introduce-section .subtitle {
			font-size: 24rpx;
			color: #E3170D;
			height: 20rpx;
			/* height: 30rpx; */
			/* line-height: 30rpx; */
		}
		.introduce-section .price-box {
			display: flex;
			align-items: baseline;
			height: 50rpx;
			padding: 10rpx 0;
			font-size: 26rpx;
			color: #fa436a;
		}
	 
		.introduce-section .price {
			font-size: 34rpx;
		}
	 
		.introduce-section .m-price {
			margin: 0 12rpx;
			color: #909399;
			text-decoration: line-through;
		}
	 
		.introduce-section .coupon-tip {
			align-items: center;
			padding: 4rpx 10rpx;
			background: #fa436a;
			font-size: 24rpx;
			color: #ffffff;
			border-radius: 6rpx;
			line-height: 1;
			transform: translateY(-4rpx);
		}
	 
		.introduce-section .bot-row {
			display: flex;
			align-items: center;
			height: 30rpx;
			font-size: 24rpx;
			color: #909399;
		}
	 
		.introduce-section .bot-row text {
			flex: 1;
		}
		
			
		.c-row {
				display: flex;
				align-items: center;
				padding: 20rpx 30rpx;
				position: relative;
				font-size: 26rpx;
				color: #606266;
				background-color: #FFFFFF;
				height: 80rpx;
			}
		 
			.c-row .tit {
				width: 23%;
			}
		 
			.c-row .con-list {
				flex: 1;
				display: flex;
				flex-direction: column;
				color: #303133;
				line-height: 40rpx;
			}
		 
			.c-row .bz-list {
				height: 40rpx;
				font-size: 26rpx;
				color: #303133;
			}
		 
			.c-row .con {
				flex: 1;
			}
		 
			.c-row .bz-list text {
				display: inline-block;
				margin-right: 30rpx;
			}
			/* 图文详情 */
		.detail-desc {
				background-color: #FFFFFF;
				margin: 16rpx 0px;
				/* height: 2026px; */
				/* padding-bottom: 90rpx; */
			}
		 
			.detail-desc .d-header {
				align-items: center;
				height: 80rpx;
				font-size: 30rpx;
				color: #303133;
				position: relative;
				text-align: center;
				line-height: 80rpx;
		 
			}
		 
			.detail-desc .d-header text {
				padding: 0 20rpx;
				background: #FFFFFF;
				position: relative;
			}
			
			.detail-desc .d-photo {
				width: 100%;
				height: 400px;
			}
			.detail-desc .d-photo .photo{
				height: 100%;
				width: 100%;
			}
			/* 底部 */
		.page-bottom {
				width:750rpx;
				  /* height:90rpx; */ 
				  height:100rpx;
				  position: fixed;
				  bottom: 0;
				  background:rgba(255,255,255,1);
				  box-shadow:0 10rpx 12rpx 12rpx rgba(138,80,80,0.13);
				  display: inline-flex;
				  justify-content: space-around;
				  align-items: center;
				  padding-bottom: env(safe-area-inset-bottom);
			}
		.icon-container{
		  display: inline-flex;
		  flex-direction: column;
		  justify-content: center;
		  text-align: center;
		}
		.customer-icon{
		  height: 50rpx;
		  width: 50rpx;
		}
		.customer-icon image{
			width: 100%;
			height: 100%;
		}
		.cart-icon{
		  height: 50rpx;
		  width: 50rpx;
		}
		.icon-container text{
		  font-size:18rpx;
		  color:#6A6A6A;
		  line-height:26rpx;
		}
		.go-container{
		 
		  display: inline-flex;
		 
		}
		.go-container>view{
		  width: 206rpx;
		  height:68rpx;
		}
		.joinCart{
		  background: #FFFFFF;
		  border-top-left-radius: 34rpx;
		  border-bottom-left-radius: 34rpx;
		  border-width: thin;
		  border-style: solid;
		  border-color: #002F81;
		  text-align: center;
		}
		.immediately{
		  background-color: #002F81;
		  border-top-right-radius: 34rpx;
		  border-bottom-right-radius: 34rpx;
		  border-width: thin;
		  border-style: solid;
		  border-color: #002F81;
		  text-align: center;
		}
		.joinCart text{
			font-size:28rpx;
			color: #002F81;
			line-height:68rpx;
		}
		.immediately text{
		  font-size:28rpx;
		  color:#FFFFFF;
		  line-height:68rpx;
		}

</style>
