<template>
	<view class="container">
		<view class="return">
			<view class="returnicon iconfont icon-fanhui" @click="goback"></view>
		</view>
		<view class="name">-商店-</view>
		<view class="scroll-panel" id="scroll-panel">
			<view class="list-box">
				<!-- 左侧栏 -->
				<view class="left">
					<scroll-view scroll-y="true" :style="{ height: scrollHeight + 'px' }"
						:scroll-into-view="leftIntoView">
						<view class="item " v-for="(item, index) in leftArray" :key="index" :class="{active: index == leftIndex }" :id="'left-' + index" :data-index="index"
							@tap="leftTap">
							{{ item }}
						</view>
					</scroll-view>
				</view>
				<!-- 右侧栏 -->
				<view class="main">
					<scroll-view scroll-y="true" :style="{ height: scrollHeight + 'px' }" @scroll="mainScroll"
						:scroll-into-view="scrollInto" scroll-with-animation="true">
						<view class="item main-item animated slideInDown" v-for="(item,index) in Array" :key="index" :id="'item-' + index">
							<!--  :id="'item-' + index" -->
							<view class="title">
								<view>{{leftArray[index]}}</view>
							</view>
							<view class="goods" v-for="(item2, index2) in item" :key="index2">
								<image :src="item2.img_url" mode=""></image>

								<view class="good_title">{{item2.title}}</view>
								<view class="bottom_box">
									<!-- <view class="price-tip">¥</view> -->
									<view class="money">¥{{item2.price}}</view>
									<view class="buy" @click="tobuy(item2)">
										<view class="text2">{{buytext}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="fill-last" :style="{ height: fillHeight + 'px' }"></view>
					</scroll-view>
				</view>
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
				scrollHeight: 400,
				scrollTopSize: 0,
				fillHeight: 0, // 填充高度，用于最后一项低于滚动区域时使用
				leftArray: ["墨水", "钢笔", "田字本", "字帖"],
				Array: [
					[{
						"id": 1,
						"title": "英雄钢笔墨水颜料型经典蓝黑墨水",
						"shop_path": "https://wenyuebgyp.tmall.com/?ali_refid=a3_430582_1006:1123220349:N:C8MyEV9h3iAbJxyIBgfBArOxL91j9B7V:507c57c61f87644bd137fe3b2116e852&ali_trackid=1_507c57c61f87644bd137fe3b2116e852&spm=a230r.1.14.9",
						"img_url": "https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i4/116569370/O1CN017HGeAU2J5VoX6rOC7_!!0-saturn_solar.jpg_360x360Q90.jpg",
						"price": "5.8",
						"class": "墨水"
					}, ],
					[{
						"id": 1,
						"title": "英雄牌钢笔小学生专用",
						"shop_path": "https://herojx.tmall.com/shop/view_shop.htm?spm=a230r.1.14.27.6a9377c6EBJY5F&user_number_id=2127922298",
						"img_url": "https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2127922298/O1CN01BDDLIM1SqWoqjqn25_!!2127922298-0-lubanu-s.jpg_360x360Q90.jpg",
						"price": "33",
						"class": "钢笔"
					}],
					[{
						"id": 1,
						"title": "得力文具田字格作业本",
						"shop_path": "https://deli.tmall.com/shop/view_shop.htm?spm=a230r.1.14.40.2cbf2282ufQfuu&user_number_id=407910984",
						"img_url": "https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/407910984/O1CN01c3PgRZ1J8iJckW3f1_!!0-item_pic.jpg_360x360Q90.jpg",
						"price": "13.9",
						"class": "田字本"
					}],
					[{
						"id": 1,
						"title": "华夏万卷字帖 行楷一本通",
						"shop_path": "https://dangdang.tmall.com/shop/view_shop.htm?spm=a230r.1.14.313.98301de4QBZmeQ&user_number_id=1049653664",
						"img_url": "https://g-search1.alicdn.com/img/bao/uploaded/i4/i1/1049653664/O1CN013CPAfL1cw9mbMo5mw_!!0-item_pic.jpg_360x360Q90.jpg",
						"price": "25.8",
						"class": "字帖"
					}]
				],
				topArr: [],
				leftIndex: 0,
				scrollInto: '',
				buytext: "去购买",
				mainArray: [],
			}
		},
		computed: {
			/* 计算左侧滚动位置定位 */
			leftIntoView() {
				return `left-${this.leftIndex > 3 ? this.leftIndex - 3 : 0}`;
			},
			//计算属性
			activeItemList(item0) {

				return this.mainArray.filter(function(data) {
					return item0 == data.class
				})
			}
		},
		
		methods: {
			onLoad(e) {
				// uni.showLoading({
				// 	title: '加载中'
				// });
				this.loadFontWeb(),
					/* 等待DOM挂载完成 */
					this.$nextTick(() => {
						/* nextTick回调后有概率获取到错误的元素高度，则添加200ms的延迟来减少BUG的产生 */
						setTimeout(() => {
							/* 等待滚动区域初始化完成 */
							this.initScrollView().then(() => {

								this.getElementTop();
							});
						}, 200);
					});

				apiModel.getGoods().then(res => {
					var a = 0,
						b = 0,
						c = 0,
						b = 0
					if (res.error_code != 0) {
						console.log("数据获取失败")
					} else {
						this.$data.mainArray = res.data
						for (var i = 0; i < this.$data.mainArray.length; i++) {
							if (this.$data.mainArray[i].class == "墨水") {
								Array[0][a] = this.$data.mainArray[i]
								a++
							} else if (this.$data.mainArray[i].class == "钢笔") {
								Array[1][b] = this.$data.mainArray[i]
								b++
							} else if (this.$data.mainArray[i].class == "田字本") {
								Array[2][c] = this.$data.mainArray[i]
								c++
							} else if (this.$data.mainArray[i].class == "字帖") {
								Array[2][c] = this.$data.mainArray[i]
								d++
							}

						}
					}
				})
			},

			goback(e) {
				uni.navigateBack({

				})
			},
			// 购买
			tobuy(item2) {
				// console.log(item2);
				// var p = item2.shop_path;
				// console.log(p);
				uni.navigateTo({
					// url: '/pages/content/content?url=' + encodeURIComponent(p)
					url: "../goodsDetail/goodsDetail"
				})
			},
			//初始化滚动区域
			initScrollView() {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery().select('#scroll-panel');
					view.boundingClientRect(res => {
						this.scrollTopSize = res.top;
						this.scrollHeight = res.height;
						this.$nextTick(() => {
							resolve();
						});
					}).exec();
				});
			},
			/* 获取列表数据 */
			/* 获取元素顶部信息 */
			getElementTop() {
				new Promise((resolve, reject) => {
					//节点查询
					let view = uni.createSelectorQuery().selectAll('.main-item');
					//获取节点位置信息
					view.boundingClientRect(data => {
						resolve(data);
					}).exec();
				}).then(res => {
					let topArr = res.map(item => {
						console.log("节点距离顶部的距离")
						console.log(item.top)
						console.log("滚动容器距离顶部的距离")
						console.log(this.scrollTopSize)
						return item.top - this.scrollTopSize; /* 减去滚动容器距离顶部的距离 */
					});
					this.topArr = topArr;
					/* 获取最后一项的高度，设置填充高度。判断和填充时做了 +-20 的操作，是为了滚动时更好的定位 */
					let last = res[res.length - 1].height;
					console.log("最后一项的高度")
					console.log(last)
					if (last - 18 < this.scrollHeight) {
						this.fillHeight = this.scrollHeight - last + 18;
					}
				});
			},
			/* 主区域滚动监听 */
			mainScroll(e) {
				let top = e.detail.scrollTop;

				console.log("scrollTop")
				console.log(top)
				let index = 0;
				/* 查找当前滚动距离 */
				for (let i = this.topArr.length - 1; i >= 0; i--) {
					if (top + 2 >= this.topArr[i]) {
						index = i;
						break;
					}
				}
				this.leftIndex = index < 0 ? 0 : index;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.scrollInto = `item-${index}`;
			},

			loadFontWeb() {
				const url = 'https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf'
				uni.loadFontFace({
					family: 'font1',
					source: `url("${url}")`
				});
			}




		},
	}
</script>

<style lang="scss">
	page,
	.container {
		height: 100%;
		background: #F1F2f6;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&>view {
			width: 100%;
		}

		.scroll-panel {
			flex-grow: 1;
			height: 0;
			overflow: hidden;
		}

		.return {
			z-index: 99;
			background: #F1F2F6;
			height: 100rpx;
			margin-top: 70rpx;
			padding-left: 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			

			.icon-fanhui {
				margin-top: 52rpx;
				font-size: 60rpx;

			}
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

		.bottom-panel {
			padding-bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
	}

	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;

			.item {
				
				position: relative;
				text-align: center;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active {
					color: #4C4C6D;
					background-color: #fff;
				}
			}

			.fill-last {
				height: 0;
				width: 100%;
				background: none;
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 550rpx;
			flex-grow: 1;
			box-sizing: border-box;

			.title {
				margin-bottom: 10rpx;
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				background-color: #fff;
				position: sticky;
				top: 0;
				z-index: 19;
			}

			.item {
				padding-bottom: 10rpx;
				border-bottom: #eee solid 1px;
			}

			.goods {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
				margin-bottom: 1rpx;

				&>image {

					width: 120rpx;
					height: 120rpx;
					margin-right: 16rpx;
					margin-left: 2px;
				}

				// .describe {
				// 	font-size: 24rpx;
				// 	color: #999;
				// }
				.good_title {
					height: 80rpx;
					color: #333;
					width: 360rpx;
					margin-left: 10rpx;
					font-size: 15px;
					font-weight: bold;
					overflow: hidden;
				}

				.bottom_box {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					width: 100%;
					height: 90rpx;

					.money {
						margin-top: 15rpx;
						margin-right: 80rpx;
						height: 60rpx;
						width: 300rpx;
						font-size: 30rpx;
						color: #fa436a;
					}

					.buy {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						width: 120rpx;
						height: 60rpx;
						border: 2px solid #E1E5EA;
						border-radius: 20rpx;
						margin: 0 0rpx;
						background-color: #F1F2F6;

						.text2 {
							position: relative;
							font-weight: bold;
							color: #4C4C6D;
							font-size: 25rpx;
						}
					}

				}
			}
		}
	}
</style>
