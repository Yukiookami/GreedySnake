// 计分牌
class ScorePanel {
  score = 0
  level = 1
  maxLevel: number
  upScore:number

  scoreEle: HTMLElement
  levelEle: HTMLElement

  constructor (maxLevel = 10, upScore = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 加分
  addScore () {
    this.scoreEle.innerHTML = ++this.score + ''

    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 等级提升
  levelUp () {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel