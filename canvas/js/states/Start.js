var RD = RD || {}

RD.StartState = {
    init () {

    },
    preload () {
        let button = this.game.add.graphics()
        button.lineStyle(5, 0xffffff, 1)
        button.drawRoundedRect(0, 0, 200 ,40 ,5)
        this.buttonTexture = button.generateTexture()
        button.destroy()
    },
    create () {
        this.wWidth = this.game.world.width
        this.wHeight = this.game.world.height

        this.button = this.game.add.sprite(this.wWidth * 0.5, this.wHeight*0.5,this.buttonTexture) //定位到畫面中間
        this.button.anchor.setTo(0.5) //因為sprite是由左上角定位，所以要改定位錨點 xy 0.5
        this.button.inputEnabled = true //BUTTON可觸摸到
        this.button.events.onInputDown.add(this.startGame, this)

        let buttonTextStyle = {font:'100, 40px Arial', fill: '#FFF'}
        this.buttonText = this.game.add.text(this.button.x, this.button.y, 'Start', buttonTextStyle)
        this.button.anchor.setTo(0.5)
    },
    startGame () {
        this.game.state.start('play')
    }
}