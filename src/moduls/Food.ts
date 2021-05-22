// Food类
class Food {
  // 定义属性表示食物所对应的元素
  element: HTMLElement

  constructor () {
    this.element = document.getElementById('food')!
  }

  // 获取食物坐标方法
  get X () {
    return this.element.offsetLeft
  }

  get Y () {
    return this.element.offsetTop
  }

  // 生成随机位置
  // 最大290 最小0
  // 一定是整10数
  getRandom (max = 29) {
    return Math.round(Math.random() * max) * 10
  }


  // 修改食物位置
  change () {
    let x = this.getRandom()
    let y = this.getRandom()

    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
  }
}

export default Food