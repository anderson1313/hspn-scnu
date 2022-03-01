<template>
	<view class="container">
		<view class="nocon" v-if="useranalysis.length==0">你还没有评价记录</view>
		<view class="recordcon" v-if="useranalysis.length!=0">
			<view class="eachrecord animated flipInX" v-for='(item,index) in useranalysis' :key="index" @click="toeachana" :data-uuid='item.uuid'>
				<view class="picbox">
					<image :src='item.linmo_path'></image>
				</view>
				<view class="comment">{{item.comment}}</view>
				<view class="mark">{{item.score}}</view>
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
				useranalysis:[]
				
				
			}
		},
		methods: {
			onLoad(){
				var uid = uni.getStorageSync('useropenid')
				var data={
					openid:uid
				}
				apiModel.getUserAnalysis(data).then(res => {	
					if (res.data!=null){
						this.$data.useranalysis=res.data
						console.log(this.$data.useranalysis)
										
						for(var i =0;i<this.$data.useranalysis.length;i++){
							this.$data.useranalysis[i].linmo_path = "http://106.52.28.79/linmo?uuid=" + this.$data.useranalysis[i].uuid
							this.$data.useranalysis[i].zitie_path = "http://106.52.28.79/template_2?index=" + this.$data.useranalysis[i].index
							this.$data.useranalysis[i].diff_path = "http://106.52.28.79/wan_mark?uuid=" + this.$data.useranalysis[i].uuid
							this.$data.useranalysis[i].resdict = "http://106.52.28.79/remark?uuid=" + this.$data.useranalysis[i].uuid
						}
										
						console.log(this.$data.useranalysis)
						
					}
					
					
				
				
				})
				apiModel.getUserAvg(data).then(res => {
					this.avg=res.avg_score
					console.log(this.avg)
					
				
				})
			},
			toeachana(e){
				var uuid=e.currentTarget.dataset.uuid
				console.log(e.currentTarget.dataset.uuid)
				uni.navigateTo({
					url: "../analysis/analysis?uuid=" + String(uuid)
				})
			}
			
			
		}
	}
</script>

<style>
	.container{
		padding: 60rpx 0;
		background: #F1F2F6;
		min-height: 2000rpx;
		
	}
	.eachrecord{
		margin: 40rpx auto;
		height: 250rpx;
		width: 650rpx;
		height: ;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: white;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		
	}
	.eachrecord .picbox{
		width: 120rpx;
		height: 120rpx;
		position: relative;
		
	}
	.eachrecord .picbox image{
		
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
	}
	
	.eachrecord .comment{
		height: 130rpx;
		font-size: 25rpx;
		width: 300rpx;
		margin: 0 30rpx;
	
	
	  text-overflow:ellipsis;
	  display: -webkit-box;
	
	  word-break: break-all;
	
	  -webkit-box-orient: vertical;
	
	  -webkit-line-clamp: 4;
	
	  overflow: hidden;
	
	}
	.eachrecord .mark{
		font-size: 35rpx;
		font-weight: bold;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	color: #d35400;
	border:3px solid #002F81;
	border-radius: 50rpx;
	}
.nocon{
	text-align: center;
	color: #001F56;
	margin: 50rpx 0;
}
</style>
