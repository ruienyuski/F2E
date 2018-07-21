var RD = RD || {}

RD.SubMeteor = class SubMeteor extends RD.Enemy {
    constructor(game, x, y, texture, target, itemBoxes) {
        super(game, x, y, texture, target, itemBoxes)
        this.health = 1
        this.scale.setTo(0.4)
        
    }

}
