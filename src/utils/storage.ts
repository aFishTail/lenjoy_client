/**
 * storage封装
 * @author wangheng
 */
const namespace = `lenjoy`
class Storage {
  /**
   * 设置缓存
   * @param {*} key
   * @param {*} value
   * @param {*} expire 过期时间，单位为秒
   */
  setItem(key: string, value: unknown, expire: number) {
    const storage = this.getStroage()
    storage[key] = {
      value: value,
      expire: expire == null ? null : Date.now() + expire * 1000
    }
    window.localStorage.setItem(namespace, JSON.stringify(storage))
  }
  getItem(key: string) {
    const val = this.getStroage()[key]
    if (val == null) return null
    const { value, expire } = val
    if (expire == null || expire >= Date.now()) {
      return value
    }
    this.clearItem(key)
    return null
  }
  getStroage() {
    return JSON.parse(window.localStorage.getItem(namespace) || '{}')
  }
  clearItem(key: string) {
    const storage = this.getStroage()
    delete storage[key]
    window.localStorage.setItem(namespace, JSON.stringify(storage))
  }
  clearAll() {
    window.localStorage.clear()
  }
}
export default new Storage()
