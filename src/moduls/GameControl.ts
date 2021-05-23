import Sanke from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 游戏控制器
class GameControl {
  // 蛇
  sanke: Sanke
  // 食物
  food: Food
  // 计分牌
  scorePanel: ScorePanel
  // 存储移动方向
  direction:string = ''
  // 原本的移动方向
  modoDirection:string = ''
  // 游戏是否结束
  isLive = true
  // 游戏结束
  gameOver: HTMLElement
  // 手机操作盘
  contorButton: HTMLCollection
  // 重置游戏
  resetButton: HTMLCollection

  constructor () {
    this.sanke = new Sanke()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.gameOver = document.getElementById("game-over")!
    this.contorButton = document.getElementsByClassName('contor-button')
    this.resetButton = document.getElementsByClassName('game-reset')

    this.init()
  }

  // 游戏初始化
  init () {
    // 绑定键盘事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.clickHandler()
    this.run()
  }

  // 键盘按下响应函数
  // ArrowUp
  // ArrowDown
  // ArrowLeft
  // ArrowRight
  keydownHandler (event:KeyboardEvent) {
    event.preventDefault()
    this.direction = event.key
  }

  // 用这种方式去改变this指向也可以
  // keydownHandler = (event:KeyboardEvent):void => {
  //   this.direction = event.key
  // }

  // 监听点击事件
  clickHandler () {
    Array.prototype.forEach.call(this.contorButton, (ele, index) => {
      ele.addEventListener('click', () => {
        if (index === 0) {
          this.direction = "ArrowUp"
        } else if (index === 1) {
          this.direction = "ArrowRight"
        } else if (index === 2) {
          this.direction = "ArrowDown"
        } else if (index === 3) {
          this.direction = "ArrowLeft"
        }
      })
    })

    Array.prototype.forEach.call(this.resetButton, ele => {
      ele.addEventListener('click', () => {
        location.reload()
      })
    })
  }

  // 蛇移动
  run () {
    let X = this.sanke.X
    let Y = this.sanke.Y

    if (this.direction === "ArrowUp") {
      if (this.modoDirection === "ArrowDown") {
        Y += 10
        this.direction = this.modoDirection
      } else {
        Y -= 10
        this.modoDirection = "ArrowUp"
      }
    } else if (this.direction === "ArrowDown") {
      if (this.modoDirection === "ArrowUp") {
        Y -= 10
        this.direction = this.modoDirection
      } else {
        Y += 10
        this.modoDirection = "ArrowDown"
      }
    } else if (this.direction === "ArrowLeft") {   
      if (this.modoDirection == "ArrowRight") {
        X += 10
        this.direction = this.modoDirection
      } else {
        X -= 10
        this.modoDirection = "ArrowLeft"
      }
    } else if (this.direction === "ArrowRight") {
      if (this.modoDirection === "ArrowLeft") {
        X -= 10
        this.direction = this.modoDirection
      } else {
        X += 10
        this.modoDirection = "ArrowRight"
      }
    }

    // 是否吃到食物
    this.checkEat(X, Y)
    
    // 修改蛇的XY值
    try {
      this.sanke.X = X
      this.sanke.Y = Y
    } catch (e) {
      this.isLive = false
      this.gameOver.innerHTML = "GAME OVER"
    }

    this.isLive && setTimeout(this.run.bind(this), 200 - ((this.scorePanel.level - 1) * 20))
  }

  // 检查蛇是否吃到了食物
  checkEat (x:number, y:number):void {
    if (x === this.food.X && y === this.food.Y) {
      // 重制食物位置
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇变长
      this.sanke.addBody()
    }
  }
}

export default GameControl