<template>
	<view class="page">


		<view class="swiper">

			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
				:dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="changepic" :current="swiperDotIndex" interval="3000" duration="1000"
					autoplay="true">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<image class="image" :src="item.url" mode="aspectFill" :draggable="false"
								@click="onBanner(index)" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>




		<!--tab标签页-->
		<view class="end-title">
			<view @tap="change(0)" class="cat">
				<view class="icon iconfont icon-xinwen_o"></view>
				<view :class="['text','animated','bounceIn','slow',{btna:btnnum == 0}]">新闻</view>
			</view>
			　<view @tap="change(1)" class="cat">
				<view class="icon iconfont icon-danganziliao-qitaziliao"></view>
				<view :class="['text','animated','bounceIn','slow',{btna:btnnum == 1}]">干货</view>
			</view>
		</view>
		<!--新闻列表-->
		<view class="end-cont " :class="{dis:btnnum == 0}">
			　　<view class="newsList">
				<!--新闻-->
				　　<view :class="[selectedIdx1===index?'newsBoxSelected':'newsBox','animated flipInX']" v-for="(item, index) in news"
					:key="index" @click="select1(index)">
					<view class="imageBox">
						<image :src="item.img" class="newsImg " mode="scaleToFill"></image>
					</view>
					<view class="textBox">
						<view class="titleBox">
							<text class="title">{{item.title}}</text>
						</view>
						<view class="dateBox">
							<text class="date">{{item.date}}</text>
						</view>
					</view>
				</view>

				<view class="tip">没有更多啦~</view>
			</view>
		</view>

		<!--干货列表-->
		<view class="end-cont" :class="{dis:btnnum == 1}">
			　　<view class="newsList">
				<!--干货-->
				　　<view :class="[selectedIdx2===index?'newsBoxSelected':'newsBox','animated flipInX']" v-for="(item, index) in knowledge"
					:key="index" @click="select2(index)">
					<view class="imageBox">
						<image :src="item.img"  class="newsImg"  mode="scaleToFill"></image>
					</view>
					<view class="textBox">
						<view class="titleBox">
							<text class="title">{{item.title}}</text>
						</view>
						<view class="dateBox">
							<text class="date">{{item.date}}</text>
						</view>
					</view>
				</view>
				<view class="tip">没有更多啦~</view>
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
				btnnum: 0,
				news: [],
				knowledge: [],
				selectedIdx1: -1,
				selectedIdx2: -1,
				current: 0,
				mode: 'default',
				swiperDotIndex: 0,
				info: [{
						colorClass: 'uni-bg-red',
						url: 'http://www.zgybsf.net/upload/image/20210608/20210608113534_87527.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'http://www.zgybsf.net/upload/image/20210608/20210608113626_10107.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'http://www.zgybsf.net/upload/image/20210608/20210608114024_20450.jpg',
						content: '内容 C'
					}
				],
				dotsStyles: {
					backgroundColor: '#dcdde1',
					border: '1px #2f3640 solid',
					color: '#fff',
					selectedBackgroundColor: '#2f3640',
					selectedBorder: '1px #2f3640 solid',
					bottom: 10,

				}



			};
		},
		methods: {
			changepic(e) {
				this.current = e.detail.current
			},

			change(e) {
				this.btnnum = e
				console.log(this.btnnum)
			},
			onLoad(e) {
				//获取图片列表
				apiModel.getNews().then(res => {
					if (res.error_code != 0) {
						console.log("数据获取失败")
					} else {
						this.$data.news = res.data
						this.$data.news.forEach(v => {
							v['selected'] = false
						})
						console.log(this.$data.news)
					}
				})
				//获取干货列表
				apiModel.getKnowledge().then(res => {
					if (res.error_code != 0) {
						console.log("数据获取失败")
					} else {
						this.$data.knowledge = res.data
						this.$data.knowledge.forEach(v => {
							v['selected'] = false
						})
						console.log(this.$data.knowledge)
					}
				})
			},
			select1(e) {
				console.log(e)
				this.selectedIdx1 = e
				this.$data.news.forEach(v => {
					v['selected'] = false
				})
				this.$data.news[e].selected = true;
				uni.navigateTo({
					url: '/pages/content/content?url=' + encodeURIComponent(this.$data.news[e].html_path)
				})
				this.selectedIdx1 = -1

			},
			select2(e) {
				console.log(e)
				this.$data.selectedIdx2 = e
				this.$data.knowledge.forEach(v => {
					v['selected'] = false
				})
				this.$data.knowledge[e].selected = true;
				uni.navigateTo({
					url: '/pages/content/content?url=' + encodeURIComponent(this.$data.knowledge[e].html_path)
				})
				this.$data.selectedIdx2 = -1
			}
		}
	}
</script>

<style>
	@import '@/common/uni-nvue.scss';

	page {
		background: white;
	}


	.swiper {
		margin: 30rpx 0;
	}


	.swiper-box {
		height: 350rpx;
	}

	.image {
		height: 350rpx;
		width: 650rpx;
		border-radius: 20rpx;

	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: $uni-text-color-grey;
		color: #fff;
		border-radius: 20rpx;
	}



	.end-title {

		margin: 30rpx 0;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.cat {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 0 50rpx;
		color: #353b48;

	}

	.icon {
		font-size: 50rpx;
		color: #001F56;
	}

	.icon-danganziliao-qitaziliao {
		font-size: 40rpx;
	}

	.text {
		color: #718093
	}

	.newsList {
		width: 90%; //根据微信定义设置  如非必要不建议改为100%；
		padding: 0rpx 30rpx;
		background-color: ;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background: white;

	}

	.newsBox {
		
		width: 100%;
		height: 240rpx;
		background: #ffffff;
		margin-top: 15rpx;
		border-bottom: 1px solid #d1d8e0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	

	.imageBox {
		z-index: 0;
		width: 230rpx;
		height: 230rpx;
		border-radius: 12rpx;
		padding-left: 15rpx;
		position: relative;
	}

	

	.newsImg {
		position: absolute;
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);

	}

	.textBox {
		width: 350rpx;
		height: 230rpx;
		margin: 0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}

	.titleBox {
		width: 350rpx;
		height: auto;	
	}

	.title {
		font-size: small;
		width: 350rpx !important;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		color: #227093;
		font-weight: bold;
	}

	.dateBox {
		width: 350rpx;
		text-align: left;
		margin-top: 20rpx;
		
		
		

	}

	.date {
		font-size: x-small;
		color: #aaa69d;
		
		word-break: keep-all;
	}




	.end-cont {
		display: none;
		background: #C8C7CC;
	}

	.btna {
		color: #227093;
		font-weight: 700;
		border-bottom: 2px solid #227093;
	}

	.dis {
		display: block;
	}

	.tip {
		width: 100%;
		height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;
		margin-bottom: 50rpx;
	}
</style>
