import {
  HTTP
} from './http.js'
// const app = getApp();
// const userId = {
//   useId: app.globalDate.userId
// };
// console.log("api的userid","*+*+*",this.userId)
class Api extends HTTP {
	
  getRequest(url, data) {
    //get请求
    return this.request({
      url: url,
      data: data,
      method: "GET"
    })
  }
  postRequest(url,data) {
    //post请求
    return this.request({
      url: url,
      data: data,
      method: "POST"
    })
  }
  putRequest(url, data) {
    //put请求
    return this.request({
      url: url,
      data: data,
      method: "PUT"
    })
  }
  delRequset(url, data){
	return this.request({
		url: url,
		data: data,
		method: "DELETE"
	})
  }
  /**
   * 获取标准字体图片
   */
  getStand_PICS(){
	  return this.getRequest("/search/templatesNew")
  }
  /**
   * 获取新闻列表
   */
  getNews(){
	  return this.getRequest("/info/news")
  }
  /**
   * 获取干货列表
   */
  getKnowledge(){
  	  return this.getRequest("/info/knowledge")
  }
  
 /* 获取书法 */
 getCalligraphy(){
	 return this.getRequest("/info/appreciates")
 }
 /* 获取广告 */
 getAd(){
	 return this.getRequest("/info/advertisement")
	 
 }
 /* 获取商品 */
 getGoods(){
	 return this.getRequest("https://hpsnx.top/info/goods")
 }
 /* 搜索 */
 getsearch(url){
	 return this.getRequest(url)
 }
  /**
   * 获取用户信息（如：openid）
   * @param {Object} data formdata
   */
  getUserINFO(data){
	  return this.postRequest("onLogin", data)
  }
  /**
   * 上传手写图片至服务器
   * @param {Object} tempFilePaths 临时文件路径
   * @param {Object} data formdata
   */
  uploadHandwritepic(tempFilePaths, data){
	  const that = this;
	  uni.uploadFile({
		  url: 'https://hpsnx.top/image',
		  filePath: tempFilePaths,
		  name: 'file',
		  formData: data,
		  header: {
			  'content-type': 'multipart/form-data'
		  },
		  complete: res => {
			  return res
		  }
	  })
  }
  
  
  /**
   * author:Adam
   * date:2022-1-29
   */
   
   //字帖
   getUserChar(data){
	    return this.getRequest('/zitie_collect/get',data)
   }
   
   delUserChar(data){
   	    return this.postRequest('/zitie_collect/delete',data)
   }
   addUserChar(data){
   	    return this.postRequest('/zitie_collect/add',data)
   }
   ifUserlikeChar(data){
	    return this.getRequest('/zitie_collect/exist',data)
	   
   }
   getRank(data){
	   return this.getRequest('/assess/getRanking',data)
	   
   }
   generatePDF(data){
	   return this.getRequest('/zitiePDF',data)
	   
   }
   
   
   //书法
   getUserCalli(data){
   	    return this.getRequest('/shufa_collect/get',data)
   }
   
   delUserCalli(data){
   	    return this.postRequest('/shufa_collect/delete',data)
   }
   addUserCalli(data){
   	    return this.postRequest('/shufa_collect/add',data)
   }
   ifUserlikeCalli(data){
   	    return this.getRequest('/shufa_collect/exist',data)
   	   
   }
	
	//商品
	getUserGood(data){
		    return this.getRequest('/goods_collect/get',data)
	}
	
	delUserGood(data){
		    return this.postRequest('/goods_collect/delete',data)
	}
	addUserGood(data){
		    return this.postRequest('/goods_collect/add',data)
	}
	ifUserlikeGood(data){
		    return this.getRequest('/goods_collect/exist',data)
		   
	}
	
	//评价
	getUserAnalysis(data){
		 return this.getRequest('/remark/total',data)
		
	}	
	getUserMin(data){
		return this.getRequest('/remark/min/score',data)
		
	}
	getUserAvg(data){
		return this.getRequest('/remark/avg/score',data)
		
	}
	getUserMax(data){
		return this.getRequest('/remark/max/score',data)
		
	}
	
	
	//user
	getOpenid(data){
		return this.postRequest('/onLogin',data)
		
	}
	RegistUser(data){
		return this.getRequest('/user/checkInfo',data)
		
	}
}
export {Api}
// 使用方法
//   import {Api} from '../../utils/api.js'
//   const apiModel = new Api()
//   method:{
//     var that=this;
//     apiModel.getUndeList({showStar:0,showTime:0}.then(res=>{该干嘛干嘛}).catch(err=>{该干嘛干嘛})
//   }

