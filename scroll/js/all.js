var $star = $('.star_home')
var $circle = $('.circle_home')
var $box = $('.box_home')

var screenConfig = {
  opening: {
    duration: 5
  }
}

var ans = []

opening()

function opening() {
  TweenLite.to($star, screenConfig.opening.duration, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($circle, screenConfig.opening.duration, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($box, screenConfig.opening.duration, {rotation: -360, ease: Power2.easeOut})
  
  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale:1.1}})
  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale:1}, delay:screenConfig.opening.duration / 2})
  
  TweenLite.to($box, 1.6, {css: {scale:7}, delay:Power2.easeOut, delay:screenConfig.opening.duration - 1})
  TweenLite.to($circle, 1.6, {css: {scale:7}, delay:Power2.easeOut, delay:screenConfig.opening.duration - 0.7})
  TweenLite.to($star, 0.6, {css: {scale:8}, delay:Power2.easeOut, delay:screenConfig.opening.duration - 0.4 ,onComplete: function() {
    $('.opening').remove();
    screenQ1Start();
  } })
}

function screenQ1Start() {
  $('.screenQ1').css('background-color','#1469FF')
  $('.screenQ1 .title_home_block').animate({opacity:0},500 ,function(){
    
    $('.screenQ1 .L_q1').animate({opacity: 1},500)

  })



  $('.screenQ1 .q-sction_options').click(function(e){
    var value = $(e.target).attr('data-value')
    if(!value) return
    ans.push(value);

    $square.remove();
    $triangle.remove();
    $circle.remove();

    TweenLite.to($('.screenQ1 .L_q1'), 0, {css: {width: '0%', transition: 'width 1s',display:'none',transition: 'display 0.5s'}});
    TweenLite.to($('.screenQ1 .R_q1'), 0, {css: {width: '100%', transition: 'width 1s'}});
    TweenLite.to($('.screenQ1 .q1_move_bg'),0.8, {css: {display:'block', left: '100%', transition: 'left 1s'}, onComplete: function() {
      $('.screenQ1').remove()
      screenQ2Start()
    }});

  })

  var $square = $('.screenQ1 .box_q1');
  var $triangle = $('.screenQ1 .tri_box_q1');
  var $circle = $('.screenQ1 .circle_q1');

  TweenLite.to($('.screenQ1 .R_q1'), 0, {css: {width: '50%', transition: 'width 1s'}})
  TweenLite.to($square, 2, {css: {top: '15%'}, ease: Power3.easeOut, delay: 1});
  TweenLite.to($triangle, 2, {css: {top: '30%'}, ease: Power2.easeOut, delay: 1});
  TweenLite.to($circle, 2, {css: {bottom: '-25%'}, ease: Power2.easeOut, delay: 1});
  
  TweenLite.to($square, 4, {rotation: 360, ease: Power3.easeOut, delay: 2});
  TweenLite.to($triangle, 4, {rotation: -360, ease: Power2.easeOut, delay: 2});
  TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 2});

}

function screenQ2Start() {

  $('.screenQ2 .R_q2').animate({opacity: 1}, 500)
  

  $('.screenQ2 .q-sction_options').click(function(e){
    var value = $(e.target).attr('data-value')
    if (!value) return
    ans.push(value)
    // alert(value)

    $square.remove()
    $triangle.remove()
    $circle.remove()



    TweenLite.to($('.screenQ2 .L_q2'), 0.5, {css: {width: '100%', transition: 'width 1s'}});
    TweenLite.to($('.screenQ2 .R_q2_block'), 0, {css: {display:'none',transition: 'display 0.5s'}});
    TweenLite.to($('.screenQ2 .R_q2'), 0, {css: {width: '0%', transition: 'width 1s'}});
    TweenLite.to($('.screenQ2 .q2_move_bg'),0.8, {css: {display:'block', right: '100%', transition: 'right 0.5s'}, onComplete: () => {
      $('.screenQ2').remove()
      screenQ3Start()

    }});
  })


  var $square = $('.screenQ2 .box_q2');
  var $triangle = $('.screenQ2 .tri_box_q2');
  var $circle = $('.screenQ2 .circle_q2');

  TweenLite.to($('.screenQ2 .L_q2'), 0, {css: {width: '50%', transition: 'width 1s'}});
  TweenLite.to($square, 2, {css: {top: '35%'}, ease: Power3.easeOut, delay: 1});
  TweenLite.to($triangle, 2, {css: {bottom: '70%'}, ease: Power2.easeOut, delay: 1});
  TweenLite.to($circle, 2, {css: {bottom: '15%'}, ease: Power2.easeOut, delay: 1});

  TweenLite.to($square, 4, {rotation: '+=360', ease: Power3.easeOut, delay: 2});
  TweenLite.to($triangle, 4, {rotation: '-=360', ease: Power2.easeOut, delay: 2});
  TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 2});
}


function screenQ3Start() {

  $('.screenQ3 .L_q3').animate({opacity: 1}, 500)
  

  $('.screenQ3 .q-sction_options').click(function(e){
    var value = $(e.target).attr('data-value')
    if (!value) return
    ans.push(value)
    // alert(value)

    $square.remove()
    $triangle.remove()
    $circle.remove()


    TweenLite.to($('.screenQ3 .L_q3_block'), 0, {css: {display:'none',transition: 'display 0.5s'}});
    TweenLite.to($('.screenQ3 .L_q3'), 0, {css: {width: '0%', transition: 'width 1s'}});
    TweenLite.to($('.screenQ3 .R_q3'), 0, {css: {width: '100%', transition: 'width 1s'}});
    TweenLite.to($('.screenQ3 .q3_move_bg'),0.8, {css: {display:'block', left: '100%', transition: 'left 1s'}, onComplete: () => {
      $('.screenQ3').remove()
      $('.r1_move_bg').css('display', 'block')
      screenCalculating()
    }});
  })


  var $square = $('.screenQ3 .box_q3');
  var $triangle = $('.screenQ3 .tri_box_q3');
  var $circle = $('.screenQ3 .circle_q3');

  TweenLite.to($('.screenQ3 .R_q3'), 0, {css: {width: '50%', transition: 'width 0.8s'}});
  TweenLite.to($square, 2, {css: {top: '15%'}, ease: Power3.easeOut, delay: 1});
  TweenLite.to($triangle, 2, {css: {bottom: '5%'}, ease: Power2.easeOut, delay: 1});
  TweenLite.to($circle, 2, {css: {bottom: '60%'}, ease: Power2.easeOut, delay: 1});

  TweenLite.to($square, 4, {rotation: '-=15', ease: Power3.easeOut, delay: 2});
  TweenLite.to($triangle, 4, {rotation: '+=360', ease: Power2.easeOut, delay: 2});
  TweenLite.to($circle, 4, {css: {x: '-=40', y: '-=30'}, ease: Power2.easeOut, delay: 2});
}

function getRandom(lower, upper) {
    return Math.random()*(upper - lower) + lower
}

function screenCalculating () {
  $('.screenQ3').remove()
  $('.calculating').removeClass('hide')
  $('body').css('overflow', 'auto')
  TweenLite.to($('.text-block'), 0, {css: {opacity: '1', transition: 'opacity 1s'}});

  var controller = new ScrollMagic.Controller();

  var total = 50;
  var colors = ['white', 'black', '#0027C8']
  for( var i = 0; i<total; i++) {
      var size = Math.floor(Math.random()*200 + 100)
      var color = colors[i%3]
      $('.calculating').append(`<div class='small-circle small-circle${i}' style='background:${color};position:fixed;bottom:-300px;width:${size}px;height:${size}px'>`)
  }

  for(var i = 0; i<total; i++) {
      var topP = getRandom(300, 500)
      var left = getRandom(1000, 3000)
      new ScrollMagic.Scene({triggerElement: ".trigger" + ((i % 4) + 1), duration: Math.random()*3000 + 500})
        .setTween(TweenLite.to($('.small-circle' + i), 10, {css: {top: `-${topP}px`, left: `${left}px`}}))
        .addTo(controller);
  }


  $(window).scroll(function() {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height())-1) {

      $('.c1_bg').remove()
      $('.screenResult').removeClass('hide')
      TweenLite.to($('.screenResult'), 1, {css: {width: '100vw'}, ease: Power2.easeOut, onComplete: () => {
        screenResultStart()
      }});

    }
  });
}



function screenResultStart() {
  const phase1Duration = 2

  TweenLite.to($('.triangle1'), phase1Duration, {css: {top: '30%'}, ease: Power2.easeOut});
  TweenLite.to($('.triangle2'), phase1Duration, {css: {top: '70%'}, easeease: Power3.easeOut});
  TweenLite.to($('.triangle3'), phase1Duration, {css: {top: '5%'}, ease: Power1.easeOut});
  TweenLite.to($('.triangle4'), phase1Duration, {css: {top: '35%'}, ease: Power3.easeOut});
  TweenLite.to($('.triangle5'), phase1Duration, {css: {top: '0%'}, ease: Power2.easeOut});
  TweenLite.to($('.triangle6'), phase1Duration, {css: {top: '40%'}, ease: Power1.easeOut});
  TweenLite.to($('.triangle7'), phase1Duration, {css: {top: '65%'}, ease: Power3.easeOut});

  TweenLite.to($('.C_r1_title'), phase1Duration, {css: {opacity: '1'}});

  TweenLite.to($('.tri_r1_blue'), phase1Duration, {css: {bottom: '-15%'}, ease: Power2.easeOut});
  TweenLite.to($('.tri_r1_white'), phase1Duration, {css: {bottom: '-13%'}, ease: Power1.easeOut});
  TweenLite.to($('.tri_r1_black'), phase1Duration, {css: {bottom: '-25%'}, ease: Power3.easeOut});

  const phase2Delay = phase1Duration + 0.5
  const phase3Delay = phase2Delay + 2
  
  TweenLite.to($('.tri_r1_title'), 2, {css: {textAlign:'left',top: '10%', left: '59%'}, ease: Power3.easeOut, delay: phase2Delay});
  
  TweenLite.to($('.triangle2'), 2, {css: {top: '30%', left: '59.5%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle3'), 2, {css: {top: '43%', right:'37%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle4'), 2, {css: {top: '56%', right:'37%'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.triangle1'), 2, {css: {top: '-100%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle5'), 2, {css: {top: '-100%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle6'), 2, {css: {top: '-100%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle7'), 2, {css: {top: '-100%'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.tri_r1_blue'), 2, {css: {bottom: '15%', right: '50%'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.tri_r1_white'), 2, {css: {bottom: '38%', left: '15%', rotation: '-30deg'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.tri_r1_black'), 2, {css: {bottom: '42%', right: '45%', rotation: '30deg'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.screenResult_text'), 2, {css: {display: 'block', opacity: '1'}, ease: Power3.easeOut, delay: phase3Delay});
  TweenLite.to($('.result_item1'), 2, { ease: Power3.easeOut, delay: phase3Delay});
  TweenLite.to($('.result_item2'), 2, { ease: Power3.easeOut, delay: phase3Delay});
  TweenLite.to($('.result_item3'), 2, { ease: Power3.easeOut, delay: phase3Delay});
  TweenLite.to($('.result_dec'), 2, { ease: Power3.easeOut, delay: phase3Delay});


  TweenLite.to($('.tri_r1_white'), 4, {css: {rotation: '+=320deg',x: '+=30', y: '+=40'}, delay: phase2Delay + 1});
  TweenLite.to($('.tri_r1_black'), 4, {css: {rotation: '-=280deg',x: '+=30', y: '+=80'}, delay: phase2Delay + 1});
  TweenLite.to($('.tri_r1_blue'), 4, {css: {x: '+=30', y: '+=40'}, delay: phase2Delay + 1});
}
