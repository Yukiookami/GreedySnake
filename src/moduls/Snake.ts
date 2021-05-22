class Snake {
  // 获取头元素
  head: HTMLElement
  // 身体(包括头) HTMLCollection表示向里面添加新元素的时候会自动更新集合
  body: HTMLCollection
  // 获得蛇容器
  element: HTMLElement

  constructor () {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.body = this.element.getElementsByTagName('div')!
  }

  // 获取蛇的坐标（蛇头坐标）
  get X () {
    return this.head.offsetLeft
  }

  get Y () {
    return this.head.offsetTop
  }

  // 设置蛇的坐标
  set X (value:number) {
    if (this.X === value) {
      return
    }

    // X值的合法范围 0-290
    if (value < 0 || value > 290) {
      // 抛出撞墙异常
      throw new Error('撞墙了')
    }

    // 移动身体
    this.moveBody() 
    this.head.style.left = `${value}px`
    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  set Y (value:number) {
    if (this.Y === value) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('撞墙了')
    }

    // 移动身体
    this.moveBody()
    this.head.style.top = `${value}px`
    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  // 增加身体
  addBody () {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 蛇 身体移动
  moveBody () {
    // 从后往前改
    // 遍历所有身体
    for (let i = this.body.length - 1; i > 0; i--) {
      // 获取前面身体位置
      let x = (this.body[i - 1] as HTMLElement).offsetLeft;
      let y = (this.body[i - 1] as HTMLElement).offsetTop;

      // 将值设置到身体上
      (this.body[i] as HTMLElement).style.left = `${x}px`;
      (this.body[i] as HTMLElement).style.top = `${y}px`;
    }
  }

  // 检查是否相撞
  checkHeadBody () {
    for (let i = 1; i < this.body.length; i++) {
      let bd = this.body[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error ('把自己吃了')
      }
    }
  }
}

export default Snake