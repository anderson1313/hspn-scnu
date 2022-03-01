<template>

	<view class="container">

		<view class="swiper">

			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
				:dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="changepic" :current="swiperDotIndex" interval="3000" duration="1000"
					autoplay="true">
					<swiper-item v-for="(item, index) in info" :key="index" @click="clickItem(item)" >
						<view :class="item.colorClass" class="swiper-item" >
							<image class="image" :src="item.url" mode="aspectFill" :draggable="false"
								@click="onBanner(index)" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>


		<view class="nav animated fadeInDown fast">

			<view class="identity" @click="totest">
				<view class="icon iconfont icon-maobi1"></view>
				<view class="name">手写评价</view>
				<view class="tip">免费评估</view>
			</view>
			<view class="line">

			</view>

			<view class="store" @click="tostore">
				<view class="icon iconfont icon-shangdian"></view>
				<view class="name">商店</view>
				<view class="tip">精美文具、字帖</view>
			</view>
		</view>

		<view class="explore">
			<view class="iconfont icon-yongyan"></view>
			<view class="funcname">探索</view>
		</view>
		<view class="generate animated fadeInDown fast" @click="togenerate"></view>

		<view class="admire animated fadeInDown fast" @click="toadmire"></view>


	</view>

</template>

<style>
	.container {
		background: #F1F2F6;

		position: relative;
		padding-bottom: 100rpx;
	}

	.swiper {
		margin: 0 0;
	}


	.swiper-box {
		height: 580rpx;
	}

	.image {
		height: 580rpx;
		width: 750rpx;
		z-index:11;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: ;
		
		color: #fff;
																																							
		background-size: contain;
		box-sizing: border-box;
		z-index: 1;
	}

	.swiper-item::after{
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: inherit;
		filter: blur(10px);
		z-index: 2;

	}

	.nav {
		background: rgb(254, 254, 254);
		width: 670rpx;
		height: 400rpx;
		margin: 0 auto;
		position: absolute;
		top: 550rpx;
		border-radius: 10rpx;
		left: 50%;
		margin-left: -335rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}

	.line {
		width: 1rpx;
		height: 300rpx;
		background: #dfe4ea;
	}

	.identity,
	.store {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 300rpx;
		height: 350rpx;
		margin: 0 20rpx;
	}
	.icon {
		font-size: 100rpx;
		margin: 30rpx 0;


	}
	.icon-shangdian {
		color: #182C61;
	}
	.icon-maobi1 {
		color: #2c3e50;

	}
	.name {
		font-family: "font1";
		font-size: 50rpx;
		margin: 10rpx 0;
	}

	.tip {
		font-size: 25rpx;
		color: #8395a7;
	}
	.explore {
		display: flex;
		margin-top: 420rpx;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.icon-yongyan {
		font-size: 40rpx;
		margin-right: 10rpx;
		color: #0c2461;
	}

	.funcname {
		font-size: 30rpx;
		border-bottom: 1px solid black;
	}

	.admire {
		margin: 50rpx auto;
		width: 550rpx;
		height: 250rpx;
		background-image: url("https://wx4.sinaimg.cn/mw2000/008qN27Ogy1gz8nrxhy6nj378f37p7wi.jpg");
		background-size: cover;
		border-radius: 10rpx;
		background-repeat: repeat-x;


	}
	.generate{
		margin: 50rpx auto;
		width: 550rpx;
		height: 250rpx;
		background-image: url("https://wx1.sinaimg.cn/mw2000/008qN27Ogy1gz8ns04vijj378f37pe83.jpg");
		background-size: cover;
		border-radius: 10rpx;
		background-repeat: repeat-x;
		
	}
</style>

<script>
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
					id:'1',
						colorClass: 'uni-bg-red',
						url: 'https://wx2.sinaimg.cn/mw2000/003QmReqgy1gv4saeyvemj6c2181cx6u02.jpg',
						content: '内容 A'
					},
					{id:'2',
						colorClass: 'uni-bg-green',
						url: 'https://wx2.sinaimg.cn/mw2000/003QmReqgy1gvdtfnuwavj63r02dpqm202.jpg',
						content: '内容 B',
						htmlpath:"http://www.ipcc01.com/"
					},
					{id:'3',
						colorClass: 'uni-bg-blue',
						url: 'https://wx4.sinaimg.cn/mw2000/003QmReqgy1gvdtfmzw69j60wt0pg43c02.jpg',
						content: '内容 C',
						htmlpath:"https://aisite.wejianzhan.com/site/wjzult4x/c966cc54-0e9c-48ef-8c6b-75396b2f83bc?fid=nHf1P1RkrH6kPWnzPjfznjRLPjIxnHfvnNtk&ch=4&bfid=fbuFw0cK_tmD0FZvx_T00QR70fDCX9fa0lT1w0s000aiHWisif0000f0N00cz8hLJQZcz5shz8heoiaYttWtQiQDJtOW_pYBz8heoUH1z5zq_UAVVTWD3taYknruzsx6"
					},

					{id:'4',
						colorClass: 'uni-bg-blue',
						url: 'https://wx2.sinaimg.cn/mw2000/003QmReqgy1gvdtfnbg0qj60ka0fh40b02.jpg',
						content: '内容D',
						htmlpath:"http://www.zgwlshjlm.cn/"
					}
				],
				dotsStyles: {
					backgroundColor: '#dcdde1',
					border: '1px #2f3640 solid',
					color: '#fff',
					selectedBackgroundColor: '#2f3640',
					selectedBorder: '1px #2f3640 solid',
					bottom: 30,

				}

			}
		},
		methods: {
			toadmire(e) {
				uni.navigateTo({
					url: "../admire/admire"
				})
			},
			togenerate(e) {
				uni.navigateTo({
					url: "../generate/generate"
				})
			},
			onLoad(e) {
				this.loadFontWeb()
			},

			loadFontWeb() {
				const url = 'https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf'
				uni.loadFontFace({
					family: 'font1',
					source: `url("${url}")`
				})
			},
			changepic(e){
				 this.current = e.detail.current;
			},
			
			
			clickItem(e){
				
				uni.navigateTo({
					url: '/pages/content/content?url=' + e.htmlpath
				})
				
			},
			totest(e) {
				uni.navigateTo({
					url: "../selectChar/selectChar"

				})
			},
			tostore(e){
				uni.navigateTo({
					url:"/pages/shop/shop"
				})
			}
		}
	}
</script>
