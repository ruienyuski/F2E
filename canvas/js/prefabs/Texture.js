var RD = RD || {}

RD.Texture = function (key, obj, game) {
    let graph = game.add.graphics()
    //畫圖
    DRAWER[key](graph, obj, game)
    //轉texture
    let texture = graph.generateTexture()
    
    //detroy
    graph.destroy();
    return texture
}

var DRAWER = {}
DRAWER.core = function (graph, { r, outLine, inLine, fill}, game) {
    // graph 圖畫完
    graph.lineStyle(outLine, fill, 1)
    graph.drawCircle(r, r, r*2)

    let lineEnd = new Phaser.Point(r, 0)
    graph.lineStyle(inLine, fill, 1)
    for(let i=0; i<3; i++) {
        graph.moveTo(r,r)
        graph.lineTo()
        graph.lineTo(lineEnd.x, lineEnd.y)
        if(i<2) {
            lineEnd.rotate(r, r, 120, true)
        }
    }
}
//虛線弧線
DRAWER.ring = function (graph, { r, dashNum, lineWidth, fill }, game) {
    graph.lineStyle(lineWidth, fill, 1)
    for(let i=0; i<dashNum; i+=2){
        graph.arc(r, r, r, (Math.PI*2/dashNum)*i, (Math.PI*2/dashNum)*(i+1), false)
    }
}

//槍 phaser 0度在右邊 180在左邊
DRAWER.gun = function(graph, {fill}) {
    let path = [0, 30, 20, 30, 50, 20, 50, 10, 20, 0, 0, 0, 0, 30]
    graph.beginFill(fill)
    graph.drawPolygon(path)
    graph.endFill()
}

//盾牌
DRAWER.shield = function (graph, { r,lineWidth,visPart,invisPart,range},game) {
    graph.lineStyle(lineWidth,visPart,1)
    let start = game.math.degToRad(180 - range/2)
    let end = game.math.degToRad(180 + range/2)
    graph.arc(r, r, r, start, end, false)
    graph.lineStyle(lineWidth, invisPart, 1)
    graph.arc(r, r, r, end, start, false)
}

//子彈
DRAWER.bullet = function (graph, { fill }) {
    let path = [0, 0, 0, 6, 10, 6, 15, 3, 10, 0, 0, 0]
    graph.beginFill(fill)
    graph.drawPolygon(path)
    graph.endFill()
}

//UFO
DRAWER.UFO = function (graph, {r, fill }) {
    graph.beginFill(fill)
    graph.drawCircle(r, r, r*2)
    graph.endFill()
}

//隕石
DRAWER.Meteor = function (graph, {size,fill},game) {
    let path = []
    let rnd = game.rnd.between(0, size)
    
    path.push(0, 0)
    path.push(0, rnd)
    path.push(rnd, size)
    path.push(size, size)
    path.push(size, rnd)
    path.push(rnd, 0)
    path.push(0 ,0)

    graph.beginFill(fill)
    graph.drawPolygon(path)
    graph.endFill()
}