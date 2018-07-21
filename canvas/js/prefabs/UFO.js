var RD = RD || {}

RD.UFO = class UFO extends RD.Enemy {
    constructor(game, x, y, texture, target, itemBoxes, bullets) {
        super(game, x, y, texture, target, itemBoxes, bullets)
        this.health = 3
    }

    dropItemBox() {
        console.log('掉了掉了 !')
    }
}
