export default {
	// 设置全局变量
	setData(key, value) {
		this[key] = value

		uni.setStorage({
			key,
			data: value
		})
	},
	// 获取全局变量
	getData(key) {
		let value = this[key]

		if (value === undefined) {
			value = uni.getStorageSync(key)
			if (value !== undefined) {
				this.setData(key, value)
			}
		}

		return value
	},
}
