var RD = RD || {}

RD.Meteor = class Meteor extends RD.Enemy {
    constructor(game, x, y, texture, target, itemBoxes, group) {
        super(game, x, y, texture, target, itemBoxes)
        this.subMeteors = group
        this.health = 5
    }


    damage(amount) {
        super.damage(amount)
        if(this.health <= 0){
            this.separate()
        }
    }
    separate() {

        for(let i=0; i<2; i++){
            let subMeteor = this.subMeteors.getFirstExists(false)
            
            if (!subMeteor) {
                subMeteor = new RD.SubMeteor(this.game, this.x, this.y, RD.Texture('Meteor', { size: 100, fill: 0xE8465D }, this.game), this.target, this.itemBoxes )
                this.subMeteors.add(subMeteor)
            } else {
                subMeteor.reset(this.x, this.y)
            }
            let rndDis = this.game.rnd.between(40, 80)
            let rndAng = this.game.rnd.sign() * this.game.rnd.between(70, 110)
            
            let newPos = this.position.clone().add(rndDis, 0).rotate(this.x, this.y, this.position.angle(this.target, true) + rndAng, true)
            
            this.game.add.tween(subMeteor).to ({ x:newPos.x, y:newPos.y} , 800 ,null, true)

        }
    }
}

