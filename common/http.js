const baseUrl = 'https://hpsnx.top'
// console.log("getApp().globalData: " + JSON.stringify(getApp().globalData));
const app = getApp();
class HTTP {
	//HTTP类下面的request方法 它会调用_request方法直接给一个实例
	request({
		url,
		data = {},
		method
	}) {
		
		var promise = new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
		
		return promise
	}
	//所以多次封装 只要在这一步分里面做文章 resolve是请求成功的操作函数 reject是失败的 method默认是GET data里面不用传useId 
	_request(url, resolve, reject, data = {}, method='POST') {
		const userId = {
			userId: app.userId
		};
		uni.request({
			url: baseUrl + url,
			header: {
				// 'content-type': 'application/x-www-form-urlencoded'
				'content-type': 'application/json'
			},
			method: method,
			// data: Object.assign(userId, data), //包含useid的data
			data:data,//不包含useid的data
			success: (res) => {
				//console.log("调用了http方法成功",res)
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
				console.log(err)
				//console.log("调用了http方法失败",res)
			},
			complete: () => {
				// console.log("hi man")
			}
		})

	}
}
export {
	HTTP
}
