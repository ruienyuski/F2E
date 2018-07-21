var RD = RD || {}

RD.Game = new Phaser.Game(800,600,Phaser.AUTO)

RD.Game.state.add('start',RD.StartState)
RD.Game.state.add('play', RD.PlayState)
RD.Game.state.add('gameover', RD.GameoverState)

RD.Game.state.start('start')