var RD = RD || {}

RD.Enemy = class Enemy extends Phaser.Sprite {
    constructor(game, x, y, texture, target, itemBoxes) {
        super(game, x, y, texture)
        this.anchor.setTo(0.5)
        this.speed = 50 //敵人速度
        this.target = target
        this.itemBoxes = itemBoxes
        this.DROP_CHANCE = 0.2

    }

    update () {
        this.game.physics.arcade.moveToObject(this, this.target, this.speed) //敵人不停的往中間靠
        
    }
    dropItemBox() {
        console.log('掉x寶了!快撿阿!!')
    }
}
