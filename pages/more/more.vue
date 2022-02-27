<template>
	<view class="container">

		<view class="infobtn" v-if="getuserinfo==false">
			<view class="login" @click="getUserProfile">登 陆</view>
		</view>






		<view class="info" v-if="getuserinfo==true">
			<view class="avatar">
				<image class="profile" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="unamecon">
				<view class="uname">{{userInfo.nickName}}</view>
			</view>
		</view>

		<view class="records animated ">

			<view class="scroll">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
					<view class="scroll-view-item_H animated  " v-for="(item,index) in records" :key="index"
						:data-id="item.id" @click="toeachrecord">
						<view class="up">
							<view class="name">{{item.text}}</view>
							<view class="icon iconfont" v-bind:class="item.icon"></view>
						</view>

						<view class="down">{{item.info}}</view>

					</view>
				</scroll-view>
			</view>
		</view>


		<view class="tips">
			<view class="tip introtip "><i class='iconfont icon-zhinanzhen'></i>入门指南</view>


			<view class="tip pritip "><i class='iconfont icon-yinsitiaokuan'></i>隐私政策</view>
			<button class="tip pritip " open-type='feedback'><i class='iconfont icon-yijianfankui'></i>意见反馈</button>
			<view class="tip pritip "><i class='iconfont icon-shouye'></i>联系我们</view>
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
				getuserinfo: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				records: [{
						id: 1,
						text: "收藏",
						info: "点击查看你的收藏字帖、书法、商品",
						icon: "icon-shoucang"

					},

					{
						id: 2,
						text: "评价",
						info: "点击查看你的评价记录",
						icon: "icon-pingjia"

					},

					{
						id: 3,
						text: "订单",
						info: "可以查看你的购物订单",
						icon: "icon-goumai"

					},
				]

			}
		},
		methods: {

			getUserProfile: function() {
				uni.vibrateShort({
					type: 'type',
				})
				var that = this

				uni.login({
					success: function(res) {
						console.log(res.code)
						//发送请求
						var data = {
							code: res.code
						}
						apiModel.getOpenid(data).then(result => {
							console.log(result.openid)
							uni.setStorageSync('useropenid', result.openid)
						})
					}
				})

				uni.getUserProfile({
					desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (file) => {
						console.log(file.userInfo)
						console.log(file.userInfo)
						var openid = uni.getStorageSync("useropenid")
						var nickname = file.userInfo.nickName
						var avatarurl = file.userInfo.avatarUrl
						var data = {
							openid: openid,
							avatarurl: avatarurl,
							nickname: nickname
						}
						apiModel.RegistUser(data).then(result => {
							console.log(result)
						})
						this.getuserinfo = true
						this.userInfo = file.userInfo


						uni.setStorageSync('ifgetuserinfo', true),
							uni.setStorageSync('userinfo', file.userInfo)
						var timestamp = Date.parse(new Date());
						var expiration = timestamp + 43200000; //过12小时重新获取数据
						uni.setStorageSync('data_expiration', expiration)
					}
				})
			},
			onLoad() {
				var timestamp = Date.parse(new Date())
				var expiration = uni.getStorageSync('data_expiration')
				var hasUserInfo = uni.getStorageSync('ifgetuserinfo')
				if (hasUserInfo && expiration > timestamp) {
					this.getuserinfo = true
					this.userInfo = uni.getStorageSync('userinfo')


				} else {
					console.log("登录已失效")
				}

			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			aboutUs(e) {
				uni.navigateTo({
					url: "../aboutUs/aboutUs"
				})
			},
			toeachrecord(e) {
				var hasUserInfo = uni.getStorageSync('ifgetuserinfo')
				if (!hasUserInfo){
					uni.showToast({
						title:'请先登录',
						mask:false,
						icon:'none'
						
					})
					return
					
				}
				
				
				console.log(e.currentTarget.dataset.id)
				var uid = uni.getStorageSync('useropenid')
				if (e.currentTarget.dataset.id == 1) {
					
					
								uni.navigateTo({
									url: "../mylike/mylike"
								})	
							
						
		
				}

				

				if (e.currentTarget.dataset.id == 2) {
					uni.navigateTo({
						url: "../myanalysis/myanalysis"
					})

				}
				if (e.currentTarget.dataset.id == '3') {
					uni.navigateTo({
						url: "../myorder/myorder"
					})

				}
			}
		}


	}
</script>

<style>
	Page {
		/* 		background-image: url("https://wx4.sinaimg.cn/mw2000/003QmReqgy1gv3lvooiprj65kscn3njw02.jpg");
 */
		background-size: cover;
		/* background-color: #F1F2F6; */
	}

	.login {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;

		background: #dcdde1;
		color: black;
		text-align: center;
		border-radius: 20rpx;
		font-size: 40rpx;
		z-index: 2;

		top: 700rpx;
		left: 275rpx;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.info,
	.infobtn {
		background-image: url("https://wx4.sinaimg.cn/mw2000/008qN27Ogy1gyqu8t0szoj3c217t84qp.jpg");
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		min-height: 352rpx;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
		line-height: 200rpx;
		margin: 20rpx 0;
		overflow: hidden;
		border-radius: 50%;
		border: 9rpx rgba(0, 98, 102, 1.0) solid;

	}

	.avatar .profile {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.unamecon {
		margin: 30rpx 0;
	}

	.uname {
		font-size: 40rpx;
		color: #064420;
		font-weight: bold;
	}

	/*records*/


	.scroll-view_H {
		box-sizing: border-box;
		white-space: nowrap;
		height: 450rpx;
		width: 98%;
		margin: 0 auto;
		padding: 20rpx 0;


	}

	.scroll-view-item_H {
		margin-top: 40rpx;
		display: inline-block;
		width: 250rpx;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		height: 300rpx;
		background: rgba(255, 255, 255, 1.0);
		border-radius: 10rpx;
		text-align: center;
		font-size: 30rpx;
		margin: 0 30rpx;
		overflow: hidden;
		margin-top: 30rpx;

	}

	.scroll-view-item_H .up {
		display: flex;
		flex-direction: row;

		align-items: center;
		height: 50%;
		width: 100%;
	}

	.scroll-view-item_H .up .name {
		width: 20%;
		margin: 0 50rpx;
		font-size: 38rpx;
		font-weight: bold;


	}

	.scroll-view-item_H .up .icon {
		width: 30%;
		font-size: 40rpx;
		color: #007AFF;


	}

	.scroll-view-item_H .down {
		margin: 0 auto;
		font-size: 27rpx;
		text-align: left;
		color: rgba(164, 176, 190, 1.0);

		overflow: hidden;
		width: 70%;
		white-space: pre-wrap;
		height: 50%;
	}

	button {
		padding: 0;
		margin: 0;
		border-radius: 0;
		line-height: 48rpx;
		text-align: left;

	}

	button::after {
		border: none;
	}

	.tips {
		width: 80% !important;
		margin: 20rpx auto;
		padding-bottom: 30rpx;
	}

	.tips .tip {
		height: 48rpx;
		margin-bottom: 40rpx !important;
		font-size: 35rpx;
		background: none !important;
		border: none !important;
		color: rgba(164, 176, 190, 1.0);
	}

	i {
		display: inline-block;
		margin-right: 25rpx;
		font-size: 35rpx;

	}

	.icon-shouye,
	.icon-yijianfankui {
		font-weight: bold;
	}
</style>
