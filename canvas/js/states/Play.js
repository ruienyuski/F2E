var RD = RD || {}
RD.PlayState = {
    init () {
        this.currentLevel = 1 //自訂關卡

        this.wWidth = this.game.world.width
        this.wHeight = this.game.world.height
        this.CORE_SIZE = 50
        this.RING_SIZE = 80
        this.SHIELD_SIZE = 100
        this.WHITE = 0xFFFFFF
        this.ANG_VEL = 2 //接近180清除抖動現象，讓他停止，設置容許角度
        this.ANG_TOL = this.game.math.degToRad(6)
        this.BULLET_SPD = 200
        this.FIRE_SPD = Phaser.Timer.SECOND*0.2
        this.shieldRange = 90

        this.ENEMY_GROUP = ['UFOs', 'meteors', 'carriers','subMeteors']
        //敵人從中間到角落距離來出現
        this.SCREEN_DIS = new Phaser.Point(this.wWidth / 2, this.wHeight / 2).distance(new Phaser.Point(0,0))
        
    },

    preload() {
        let core = { r: this.CORE_SIZE, outLine: 10, inLine:5, fill: this.WHITE }
        this.coreTexture = RD.Texture('core', core, this.game)
        let ring = { r: this.RING_SIZE, dashNum: 60, lineWidth:2, fill: this.WHITE }
        this.ringTexture = RD.Texture('ring', ring, this.game)
        //ring 為120分 60顯示 60隱藏  dashNum為需要幾個弧線
        let gun = { fill: this.WHITE }
        this.gunTexture = RD.Texture('gun', gun, this.game)

        let shield = { r: this.SHIELD_SIZE, lineWidth: 10, visPart: this.WHITE, invisPart: 0x000000, range: this.shieldRange }
        this.shieldTexture = RD.Texture('shield', shield, this.game)
    
        let bullet = { fill: this.WHITE}
        this.bulletTexture = RD.Texture('bullet', bullet, this.game)
    
        let UFO = {r: 50, fill:0xF6AF5F }
        this.UFOTexture = RD.Texture('UFO', UFO, this.game)

        let Meteor = { size: 100, fill: 0xE8465D }
        this.MeteorTexture = RD.Texture('Meteor', Meteor, this.game)

      
        
        //載入關卡資料
        this.load.text('lv1', 'data/level/1.json')
    },

    create () {
        this.core = this.game.add.sprite(this.wWidth*0.5, this.wHeight*0.5, this.coreTexture) 
        this.core.anchor.setTo(0.5)

        this.ring = this.game.add.sprite(this.wWidth * 0.5, this.wHeight * 0.5, this.ringTexture) 
        this.ring.anchor.setTo(0.5)

        this.gun = this.game.add.sprite(this.wWidth * 0.5 + this.RING_SIZE, this.wHeight * 0.5, this.gunTexture)
        this.gun.anchor.setTo(0.5)
        this.gun.scale.setTo(0.8)

        this.shield = this.game.add.sprite(this.wWidth * 0.5, this.wHeight * 0.5, this.shieldTexture)
        this.shield.anchor.setTo(0.5)
        this.game.physics.arcade.enable(this.shield)
        this.shield.body.setCircle(this.SHIELD_SIZE) //盾牌碰撞時會被當成圓型碰撞

      


        //生成彈藥庫
        this.initBullets()
        //子彈在固定時間發射
        this.bulletTimer = this.game.time.create(false)
        this.bulletTimer.loop(this.FIRE_SPD, this.createBullets, this)
        this.bulletTimer.start()

        //生成敵人庫
        this.initEnemies()

        //生成道具庫
        this.initItemBoxes()

        //載入關卡
        this.loadLevel()
    },

    update () {
        //滑鼠與核心的中間夾角
        let pointerAng = this.game.physics.arcade.angleToPointer(this.core)
        //槍與核心的夾角
        let gunAng = this.game.physics.arcade.angleBetween(this.core, this.gun)
        
        if (pointerAng - gunAng < -this.ANG_TOL/2 &&pointerAng-gunAng < Math.PI || pointerAng - gunAng > Math.PI) { //滑鼠角度與槍角度相減 小於0，為滑鼠在槍的左邊
            this.gun.angle -= this.ANG_VEL //減去角速度
            this.gun.position.rotate(this.core.x, this.core.y, -this.ANG_VEL, true)
            
            this.shield.angle = this.gun.angle
        } else if (pointerAng - gunAng > this.ANG_TOL / 2 && pointerAng - gunAng < Math.PI  || pointerAng - gunAng < -Math.PI) {
            this.gun.angle += this.ANG_VEL //加上角速度
            this.gun.position.rotate(this.core.x, this.core.y, this.ANG_VEL, true)
            
            this.shield.angle = this.gun.angle
        }

        // 偵測碰撞
        this.ENEMY_GROUP.forEach(type => {
            this.game.physics.arcade.overlap(this[type], this.bullets, this.damageEnemy, null, this)
            this.game.physics.arcade.overlap(this.shield, this[type], this.killEnemy, this.checkShieldRange, this)
        })
    },

    initBullets () {
        this.bullets = this.add.group()
        this.bullets.enableBody = true
    },
    
    createBullets () {
        //尋找未損毀的彈藥
        let bullet = this.bullets.getFirstExists(false)
        if(!bullet) {
            bullet = new RD.Bullet(this.game, this.gun.x, this.gun.y, this.bulletTexture)
            this.bullets.add(bullet)
        } else {
            bullet.reset(this.gun.x, this.gun.y)
        }
        //依照方向算出子彈速度
        this.game.physics.arcade.velocityFromRotation(this.gun.rotation, this.BULLET_SPD, bullet.body.velocity)
        bullet.rotation = this.gun.rotation

    },

    initEnemies() {
        this.ENEMY_GROUP.forEach(type => {
            this[type] = this.add.group()
            this[type].enableBody = true
        })       
    },

    scheduleNextEnemy (){
        let nextEnemy = this.levelData.enemies[this.currentEnemyIndex]
        if(nextEnemy) {
            let lastTime =(this.currentEnemyIndex === 0) ? 0 : this.levelData.enemies[this.currentEnemyIndex -1].time
            let nextTime = nextEnemy.time - lastTime

            this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
                switch(nextEnemy.type) {
                    case 'ufo' :
                        this.createUFO()
                        break
                    case 'meteor':
                        this.createMeteor()
                        break
                    case 'carrier':
                        this.createCarrier()
                }
                this.currentEnemyIndex++
                this.scheduleNextEnemy()
            },this)
        }
    },

    damageEnemy (enemy, bullet) {
        enemy.damage(1)
        bullet.kill()
    },

    killEnemy (shield, enemy) {
        enemy.damage(1000)
    },

    loadLevel () {
        let hasLevel = this.game.cache.checkTextKey(`lv${this.currentLevel}`)
        if(!hasLevel) {
            this.gameOver()
        } else {    
            this.levelData = JSON.parse(this.game.cache.getText(`lv${this.currentLevel}`))
            this.currentEnemyIndex = 0
            this.scheduleNextEnemy ()
        }
    },

    createUFO () {
        //算UFO出現的距離
        let angle = this.game.rnd.angle()
        let position = new Phaser.Point(this.core.x + this.SCREEN_DIS, this.core.y).rotate(this.core.x, this.core.y, angle, true)
        
        let UFO = this.UFOs.getFirstExists(false)
        if (!UFO) {
            UFO = new RD.UFO(this.game, position.x, position.y, this.UFOTexture, this.core, this.itemBoxes, this.bullets)
            this.UFOs.add(UFO)
        } else {
            UFO.reset(position.x, position.y)
        }
    },

    createMeteor() {
        //算Meteor出現的距離
        let angle = this.game.rnd.angle()
        let position = new Phaser.Point(this.core.x + this.SCREEN_DIS, this.core.y).rotate(this.core.x, this.core.y, angle, true)

        let meteor = this.meteors.getFirstExists(false)
        if (!meteor) {
            meteor = new RD.Meteor(this.game, position.x, position.y, RD.Texture('Meteor', { size: 100, fill: 0xE8465D }, this.game), this.core, this.itemBoxes, this.subMeteors)
            this.meteors.add(meteor)
        } else {
            meteor.reset(position.x, position.y)
        }
    },

    createCarrier() {
        //算carrier出現的距離
        let angle = this.game.rnd.angle()
        let position = new Phaser.Point(this.core.x + this.SCREEN_DIS, this.core.y).rotate(this.core.x, this.core.y, angle, true)

        let carrier = this.carriers.getFirstExists(false)
        if (!carrier) {
            carrier = new RD.Carrier(this.game, position.x, position.y, this.carrierTexture, this.core, this.itemBoxes, this.bullets)
            this.carriers.add(carrier)
        } else {
            carrier.reset(position.x, position.y)
        }
    },

    initItemBoxes () {
        this.itemBoxes = this.add.group()
        this.itemBoxes.enableBody = true
    },

    checkShieldRange (shield, enemyThing) {
        let enemyAngle = this.game.physics.arcade.angleBetween(this.core, enemyThing)
        let angle = (shield.angle + 180 > 180) ? shield.angle - 180 : shield.angle + 180
        let shieldAngle = this.game.math.degToRad(angle)
        let delta = enemyAngle-shieldAngle
        let rng = this.game.math.degToRad(this.shieldRange)

        if(delta < rng/2 || delta > (Math.PI*2 - rng/2) || delta < (rng/2 - Math.PI*2)) {
            return true
        }   else {
            return false
        }

    },

    gameOver () {
        this.game.state.start('gameover')
    }

}
