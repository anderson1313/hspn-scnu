<template>
	<view class="container">
		<view class="up">
			<view class="avatar">
				<image class="profile" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="stat">
				<view class="icon iconfont icon-maobi1"></view>
				<view class="icon iconfont icon-shangdian1"></view>
				<view class="icon iconfont icon-fenxi"></view>
				<view class="like">
					<view class="num">{{likenum}}</view>
					<view class="text">收藏数</view>
				</view>
				<view class="icon iconfont icon-maobi1"></view>
				<view class="icon iconfont icon-shangdian1"></view>
				<view class="icon iconfont icon-fenxi"></view>
			</view>

		</view>

		<view class="down">
			<view :class="['middle',navFixed == true ? 'isFixed' :'']">
				<view class="nav">
					<view :class="['labelname','animated','flipInX',labelindex==index?'active':''] "
						@click="changelabel" v-for="(item,index) in label" :data-i="index" :key="index">{{item}}</view>
				</view>

				<view class="options">


				</view>

			</view>
			<view :class="['content',navFixed == true ? 'Fixed' :'']">

				<view class="charcontainer animated" v-bind:class="[currentindex==0?'':'fadeInLeft']"
					v-show="labelindex==0">
					<view v-if="userchar.length==0" class="notip">空空如也~</view>
					<view class="char animated"
						v-bind:class="[currentindex==0?'':'fadeInLeft',clicked==item.id?'bounceOut':'']"
						v-for='(item,index) in userchar' :key="index">
						<view class="chleft" @click="toeachchar" :data-id='item.id'>
							<view class="picbox">
								<image :src="item.pic_url" class="pic"></image>
							</view>
						</view>
						<view class="chright">
							<view class="name">{{item.name}}</view>
							<view class="picbox">
								<image class="icon animated bounceIn" @click="changecharlike" :data-id="item.id"
									:src="item.likeornot==1?likepic:notlikepic"></image>
							</view>
						</view>

					</view>
				</view>

				<view class="callicontainer animated"
					v-bind:class="[currentindex==0?'fadeInRight':'',currentindex==2?'fadeInLeft':'']"
					v-show="labelindex==1">

					<view v-if="usercalli.length==0" class="notip">空空如也~</view>

					<view class="calli animated"
						v-bind:class="[clicked==item.id?'bounceOut':'',currentindex==0?'fadeInRight':'',currentindex==2?'fadeInLeft':'',]"
						v-for='(item,index) in usercalli' :key="index">
						<view class="caup">
							<view class="picbox" @click="toeachcalli" :data-id='item.id'>
								<image :src="item.pic_url" class="pic"></image>
							</view>
							<view class="likebox">
								<image class="icon animated bounceIn" @click="changecallilike" :data-id="item.id"
									:src="item.likeornot==1?likepic:notlikepic"></image>
							</view>
						</view>
						<view class="cadown">
							<view class="name">{{item.name}}</view>

						</view>

					</view>


				</view>
				<view class="goodcontainer animated" v-bind:class="[currentindex==0||currentindex==1?'fadeInRight':'']"
					v-show="labelindex==2">
					<view class="goodcontainer">
						<view v-if="usergood.length==0" class="notip">空空如也~</view>
						
						<view class="good animated"
							v-bind:class="[clicked==item.id?'bounceOut':'',currentindex==0||currentindex==1?'fadeInRight':'']"
							v-for='(item,index) in usergood' :key="index">
							<view class="gleft" @click="toeachgood" :data-id='item.id'>
								<view class="picbox">
									<image :src="item.pic_url" class="pic"></image>
								</view>
								<view class="name">{{item.name}}</view>

							</view>
							<view class="gright">
								<view class="likebox">
									<image class="icon animated bounceIn" @click="changegoodlike" :data-id="item.id"
										:src="item.likeornot==1?likepic:notlikepic"></image>
								</view>
							</view>
						</view>
					</view>

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
				userInfo: [],
				userchar: [],
				usercalli: [],
				usergood: [],
				likenumlist: [],
				clicked: '',
				likepic: "/static/like.png",
				notlikepic: "/static/notlike.png",
				likenum: '',
				labelindex: 0,
				currentindex: 0,
				changeover: false,
				label: ["字帖", "书法", "商品"],
				navFixed: false,
				animationData: {}


			}
		},



		methods: {
			onShow() {
				var uid = uni.getStorageSync('useropenid')
				var data = {
					'openid': uid,
				}
				apiModel.getUserChar(data).then(res => {
					console.log(res)
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].likeornot = 1
					}
					this.userchar = res.data
					this.charnum = res.data.length
					this.likenum = res.data.length

				})
				apiModel.getUserCalli(data).then(res => {
					console.log(res)
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].likeornot = 1
					}
					this.usercalli = res.data
					
					this.callinum = res.data.length
				})
				apiModel.getUserGood(data).then(res => {
					console.log(res)
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].likeornot = 1
					}
					this.usergood = res.data
					this.goodnum = res.data.length
					uni.hideLoading()
				})

			},
			onLoad(options) {
				this.userInfo = uni.getStorageSync('userinfo')
				   
				     
				
			},
			onPageScroll(e) {
				this.handleScroll(e);
				if (e.scrollTop > 128) {
					this.navFixed = true
				} else {
					this.navFixed = false
				}
			},

			handleScroll(e) {
				console.log(e)

			},

			//跳转
			toeachchar(e) {
				const that = this
				var id = e.currentTarget.dataset.id
				/* var reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
				var finalid=id.replace(reg, "$2") */

				uni.navigateTo({
					url: "../submitChar/submitChar?index=" + id
				})
			},

			toeachcalli(e) {
				const that = this
				var id = e.currentTarget.dataset.id

				console.log(id)
				/* var reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
				var finalid=id.replace(reg, "$2") */

				uni.navigateTo({
					url: "../eachadmire/eachadmire?index=" + id
				})
			},
			toeachgood(e) {
				const that = this
				var id = e.currentTarget.dataset.id
			
				console.log(id)
				/* var reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
				var finalid=id.replace(reg, "$2") */
			
				uni.navigateTo({
					url: "../goodsDetail/goodsDetail?index=" + id
				})
			},

			changelabel(e) {

				var i = e.currentTarget.dataset.i
				this.labelindex = i
				switch (i) {
					case 0:
						this.likenum = this.charnum;
						break;
					case 1:
						this.likenum = this.callinum;
						break;
					case 2:
						this.likenum = this.goodnum;
						break;

				}

				var that = this
				setTimeout(function() {
					that.currentindex = i
				}, 1000)
				this.$forceUpdate()

			},

			removeByValue(arr, attr, value) {
				var index = 0;
				for (var i in arr) {
					if (arr[i][attr] == value) {
						index = i;
						break;
					}
				}
				arr.splice(index, 1);
				return arr
			},


			changecharlike(e) {

				this.clicked = e.currentTarget.dataset.id
				console.log(this.clicked)
				uni.vibrateShort({
					type: 'medium',
				})
				var arr = this.userchar
				var id = e.currentTarget.dataset.id
				for (var i = 0; i < this.userchar.length; i++) {
					if (id == this.userchar[i].id) {
						arr[i].likeornot = 0
					}

				}
				var uid = uni.getStorageSync('useropenid')

				var data = {
					'openid': uid,
					"id": e.currentTarget.dataset.id
				}
				apiModel.delUserChar(data).then(res => {
					console.log(res)
				})
				setTimeout(() => {
					wx.showToast({
						title: '已取消收藏',
						duration: 800,
						icon: 'error'
					})

				}, 400);
				setTimeout(() => {
					var arr = this.removeByValue(this.userchar, "id", e.currentTarget.dataset.id)
					this.userchar = arr

				}, 900);
			},

			changecallilike(e) {
				this.clicked = e.currentTarget.dataset.id
				console.log(this.clicked)
				uni.vibrateShort({
					type: 'medium',
				})
				var arr = this.usercalli
				var id = e.currentTarget.dataset.id
				for (var i = 0; i < this.usercalli.length; i++) {
					if (id == this.usercalli[i].id) {
						arr[i].likeornot = 0
					}

				}
				var uid = uni.getStorageSync('useropenid')

				var data = {
					'openid': uid,
					"id": e.currentTarget.dataset.id
				}
				apiModel.delUserCalli(data).then(res => {
					console.log(res)
				})
				setTimeout(() => {
					wx.showToast({
						title: '已取消收藏',
						duration: 800,
						icon: 'error'
					})
				}, 400);
				setTimeout(() => {
					var arr = this.removeByValue(this.usercalli, "id", e.currentTarget.dataset.id)
					this.usercalli = arr

				}, 900);
			},
		
			changegoodlike(e) {
				this.clicked = e.currentTarget.dataset.id
				console.log(this.clicked)
				uni.vibrateShort({
					type: 'medium',
				})
				var arr = this.usergood
				var id = e.currentTarget.dataset.id
				for (var i = 0; i < this.usergood.length; i++) {
					if (id == this.usergood[i].id) {
						arr[i].likeornot = 0
					}
			
				}
				var uid = uni.getStorageSync('useropenid')
			
				var data = {
					'openid': uid,
					"id": e.currentTarget.dataset.id
				}
				apiModel.delUserGood(data).then(res => {
					console.log(res)
				})
				setTimeout(() => {
					wx.showToast({
						title: '已取消收藏',
						duration: 800,
						icon: 'error'
					})
				}, 400);
				setTimeout(() => {
					var arr = this.removeByValue(this.usergood, "id", e.currentTarget.dataset.id)
					this.usergood = arr
			
				}, 900);
			},
		
		},


	}
</script>

<style>
	.notip {
		width: 100%;
		text-align: center;
		margin: 90rpx 0;
		color: rgba(127, 143, 166, .8);
	}

	.up {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #F1F2F6;
	}

	.avatar {
		overflow: hidden;
		display: block;
		width: 70rpx;
		height: 70rpx;
		margin: 20rpx;
		margin-top: 20rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	}
	
	
	.avatar .profile {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.stat {
		margin: 25rpx 0;
		padding: 20rpx 0;
		width: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.stat>view {

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.like {
		width: 15%;
		margin: 0 30rpx;

	}

	.stat .icon {
		margin: 0 15rpx;
		font-size: 45rpx;
		font-weight: 100;
		color: #e7eaf5;
	}

	.stat>view .num {
		font-weight: bold;
		color: #273c75;
	}

	.stat>view .text {
		font-size: 25rpx;
		color: #7f8fa6;
	}



	.down {
		width: 100%;
		min-height: 1200rpx;
		position: absolute;
		top: 260rpx;
		background: white;
		border-radius: 30rpx 30rpx 0 0;

	}

	.isFixed {
		position: fixed;
		top: 0rpx;
		left: 0;
		width: 100%;
		height: 80rpx;
		margin: 0;

	}

	.middle {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-radius: 30rpx 30rpx 0 0;
		z-index: 10;

	}

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.labelname {
		margin: 0 40rpx;
		color: rgba(127, 143, 166, .5);
		position: relative;
	}

	.active {
		color: #192a56;
		font-weight: bold;
		position: relative;
	}

	.active::after {
		position: absolute;
		bottom: -8rpx;
		left: 0;
		right: 0;
		width: 64rpx;
		height: 5rpx;
		content: '';
		border-radius: 30rpx;
		background-color: rgba(25, 42, 86, 1.0);

	}

	.Fixed {
		padding-top: 100rpx;
	}



	.content,
	.charcontainer,
	.callicontainer,
	.goodcontainer {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 100rpx;
		width: 680rpx;
		margin: 0 auto;
		
	}

	.char,
	.good{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 45%;
		height: 200rpx;
		margin: 20rpx 15rpx;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
		border-radius: 20rpx;
	}
	

	.calli {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 45%;
		height: 200rpx;
		margin: 20rpx 15rpx;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
		border-radius: 20rpx;

	}

	.char .chleft {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid rgba(220, 221, 225, 1.0);
	}

	.calli .caup {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.calli .caup>view {
		margin: 0 30rpx;
	}

	.calli .cadown {
		width: 65%;
		text-align: left;
		font-size: 25rpx;
		color: rgba(52, 73, 94, .6);
		overflow: hidden;

	}

	.char .chright {
		width: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.chleft .picbox,
	.caup .picbox {
		z-index: 0;
		width: 100rpx;
		height: 100rpx;
		position: relative;
	}


	.chleft .picbox image,
	.caup .picbox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.chright>view {
		width: 40rpx;
		height: 40rpx;
		margin: 10rpx 0;
	}

	.chright .picbox {
		z-index: 0;
		width: 40rpx;
		height: 40rpx;
		position: relative;
	}


	.chright .picbox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		margin-left: -24rpx;
		margin-top: -10rpx;
		transform-origin: center;
	}

	.caup .likebox {
		z-index: 0;
		width: 50rpx;
		height: 50rpx;
		position: relative;

	}

	.caup .likebox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		margin-left: -25rpx;
		margin-top: -25rpx;
		transform-origin: center;

	}
	
	/*good*/
	.good{
		margin: 20rpx auto;
		width: 90%;
		padding: 5rpx 20rpx;
	}
	.good .gleft{
		width: 85%;
		height: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-right: 1px solid rgba(220, 221, 225, 1.0);
		
		
	}
	.good .gright{
		width: 15%;
		height: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
		
	}
	.good .gleft .picbox{
		z-index: 0;
		width: 150rpx;
		height: 150rpx;
		position: relative;
		
	}
	.good .gleft .picbox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		margin-left: -75rpx;
		margin-top: -75rpx;
		transform-origin: center;
	}
	.good .gleft .name{
		width: 350rpx;
		font-size: 25rpx;
		overflow: hidden;
		margin: 0 20rpx;
		color: rgba(116, 125, 140,.8);
		
	}
	
	.gright .likebox {
		z-index: 0;
		width: 50rpx;
		height: 50rpx;
		position: relative;
	
	}
	
	.gright .likebox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		margin-left: -25rpx;
		margin-top: -25rpx;
		transform-origin: center;
	
	}

</style>
