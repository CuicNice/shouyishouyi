/**
 * Storage标准封装
 */
const myStorage = {
	// 存储
	set(key, value) {
		try {
			wx.setStorageSync(key, JSON.stringify(value))
		} catch (err) {
			return null
		}
	},
	// 取出数据
	get(key) {
		try {
			const value = JSON.parse(wx.getStorageSync(key));
			if (value === null || value === undefined || value === "") {
				return null;
			}
			return JSON.parse(wx.getStorageSync(key))
		} catch (err) {
			return null
		}
	},
	// 删除数据
	remove(key) {
		wx.removeStorageSync(key)
	}
}
export {
	myStorage
};

