$(document).ready(function(){
    $('.switch-moon').click(function(event){
        $('.header').addClass('header_night');
        $('.body_bg').addClass('body_bg_night');
        $('.comico_page_title').addClass('comico_page_title_night');
        $('.switch').addClass('switch_night');
        $('.arrow').addClass('arrow_night');
        $('#ninja-slider-prev').css('background','rgba(255,255,255,.7)');
        $('#ninja-slider-next').css('background','rgba(255,255,255,.7)');
        $('.sun_night').css('display','block');
        $('.sun').css('display','none');
        $('.moon_night').css('display','block');
        $('.moon').css('display','none');

    })
    $('.switch-sun').click(function(event){
        $('.header').removeClass('header_night');
        $('.body_bg').removeClass('body_bg_night');
        $('.comico_page_title').removeClass('comico_page_title_night')
        $('.switch').removeClass('switch_night');
        $('.arrow').removeClass('arrow_night');
        $('#ninja-slider-prev').css('background','rgba(0,0,0,0.4)');
        $('#ninja-slider-next').css('background','rgba(0,0,0,0.4)');
        $('.sun_night').css('display','none');
        $('.sun').css('display','block');
        $('.moon_night').css('display','none');
        $('.moon').css('display','block');
       
    })
    $('.toPage').click(function(event){
        $('.home').css('display','none');
        $('.page').css('display','block');
    })

    $('.header').click(function(event){
        $('.home').css('display','block');
        $('.page').css('display','none');
    })
    


})


