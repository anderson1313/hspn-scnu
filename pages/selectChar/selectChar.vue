<template>
	<view class="page">


		<view class="return">
			<view class="returnicon iconfont icon-fanhui" @click="goback"></view>

		</view>

		<view class="up">

			<view class="search">
				<input class="search-input" type="text" v-model="searchWord" placeholder-class="placeholderStyle"
					placeholder="输入字帖名称" @input="search"></input>

			</view>
		</view>




		<!--字符列表-->
		<view class="charList">
			<view class="char animated flipInX" v-for="(item, index) in picArray" :key="index">			
				<view class="ImgBox" @click="submit" :data-n="item.name" :data-i="item.id">
					<image class="ZiTie" :src="item.pic_url" mode="scaleToFill"></image>
				</view>
				
			</view>
		</view>

		<view class="tip" v-show="picArray.length==0">{{tip}}</view>


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
				tip: '',
				picArray: [],
				selected_index: null
			}
		},
		methods: {
			search(e) {
				var input = e.detail.value
				if (input != "") {
					var url = '/search/name/' + input
					apiModel.getsearch(url).then(res => {
						if (res.data.length == 0) {
							this.$data.tip = '抱歉，没有你搜索的字帖'
							this.$data.picArray = []
						} else {
							this.$data.tip = ''
							this.$data.picArray = res.data
							console.log(this.$data.picArray)
						}


					})

				} else {
					this.$data.picArray = this.$data.searchpicArray
				}

			},
			submit(e) {
				const that = this
				uni.navigateTo({
					url: "../submitChar/submitChar?index=" + e.currentTarget.dataset.i
				})
			},
			goback(e) {
				uni.navigateBack({

				})
			},
			onLoad(e) {
				//获取图片列表
				uni.showLoading({
					title:"正在获取数据",
					icon:"none"
				})
				apiModel.getStand_PICS().then(res => {
					this.$data.picArray = res.data
					this.$data.searchpicArray = res.data
					this.$data.picArray.forEach(v => {
						v['selected'] = false
					})
					console.log(this.$data.picArray)
					uni.hideLoading()
				})
			},
			select(e) {
				console.log(e)
				this.$data.picArray.forEach(v => {
					v['selected'] = false
				})
				this.$data.picArray[e].selected = true
				this.$data.selected_index = this.$data.picArray[e].index
				this.$forceUpdate()
			}

		}
	}
</script>

<style>
	page {
		background-color: #F1F2F6;
	}

	.return {
		background: #F1F2F6;
		height: 100rpx;
		margin-top: 80rpx;
		padding-left: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.icon-fanhui {
		font-size: 60rpx;

	}

	.up {
		height: 400rpx;
		width: 750rpx;
		background-color: #F1F2F6;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url("https://wx2.sinaimg.cn/mw2000/003QmReqgy1gv8y2gto89j6ccv6l9qv602.jpg");
		background-size: cover;
	}

	.search {

		height: 80rpx;
		width: 650rpx;
		background: #FFFFFF;
		margin: 0 auto;
		margin-top: 120rpx;
		border-radius: 10rpx;

	}

	input {
		width: 600rpx;
		height: 80rpx;
		margin: 0 auto;
		caret-color: green;
		line-height: 80rpx;
	}


	.charList {
		width: 650rpx; //根据微信定义设置  如非必要不建议改为100%；
		margin: 0 auto;
		background-color: #F1F2F6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 100rpx;

	}
	.charList:after{
	    content: '';
	    width: 30%;
	    border:1px solid transparent;
	  }

	.char {

		//未设置高度
		width: 150rpx;
		height: 150rpx;
		padding: 10rpx;
		background: #ffffff;
		margin-top: 30rpx;
		border-radius: 50%;
		

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url("https://wx2.sinaimg.cn/mw2000/003QmReqgy1gv8yo8y6b0j62v02uzwpa02.jpg");
		background-size: cover
	}

	.ImgBox {
		z-index: 0;
		width: 80rpx;
		height: 80rpx;
		position: relative;
	}

	.ImgBox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-60%, -50%);
	}

	.tip {
		text-align: center;

	}
</style>