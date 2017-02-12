/*
 * @Author: Administrator
 * @Date:   2017-02-01 10:58:23
 * @Last Modified by:   Lee
 * @Last Modified time: 2017-02-12 12:26:49
 */

'use strict';
// 顶端下拉
// 可以尝试用一下事件代理
(function(){
    var topUls = $('.topUl');
    for (let i = 0; i < $('.topItem').length - 2; i++) {
        $('.topItem')[i].onmouseenter = function() {
            $('.topGoodContainer').css('height', '230px');
            $(this).addClass('now');
            $(topUls[i]).show()
                        .siblings('ul.topUl').hide();
        };
        $('.topItem')[i].onmouseleave = function() {
            $(this).removeClass('now');
        };
    }
$('.menu')[0].onmouseleave = function() {
    $('.topGoodContainer').css('height', '0px');
    $('.now>a').css('color', '#333');
};
})();



// 搜索框
$($('input.search')).focus(function(){
    $($('div.searchTips')).fadeOut(500);
});
$($('input.search')).blur(function(){
    $($('div.searchTips')).fadeIn(500);
});


// 轮播图

var dots = $('.dot');
var Carousels = $('.itemContainer');

// 轮播切换函数封装
function changeItem(i) {
    $(Carousels[i]).fadeIn(500);
    $(Carousels[i]).addClass('current');
    $(Carousels[i]).siblings('div').fadeOut(500);
    $(Carousels[i]).siblings('div').removeClass('current');
}

function addDot(i) {
    $(dots[i]).addClass('whiteDot');
    $(dots[i]).siblings('li').removeClass('whiteDot');
}
// 自动轮播
var j = 0;

function inter() {
    j = $('.current')[0].dataset.num;
    if (j <= Carousels.length - 1) {
        j = j;
    } else {
        j = 0;
    }
    addDot(j);
    changeItem(j);
    j++;
}
var init = window.setInterval(inter, 4000);

// 小圆点手动轮播
for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = function() {
        window.clearInterval(init);
        addDot(i);
        changeItem(i);
        j = i;
        j++;
        init = window.setInterval(inter, 4000);
    };
}
// 前后箭头轮播
$('.spanLeft')[0].onclick = function() {
    window.clearInterval(init);
    if (Carousels.is(":animated")) {
        console.log('处于动画中');
        return false;
    }
    var num1 = $('.current')[0].dataset.num;
    if (num1 > 1 && num1 <= Carousels.length) {
        var num2 = num1 - 2;
    } else {
        var num2 = Carousels.length - 1;
    }
    changeItem(num2);
    addDot(num2);
    init = window.setInterval(inter, 4000);
};

$('.spanRight')[0].onclick = function() {
    window.clearInterval(init);
    if (Carousels.is(":animated")) {
        console.log('处于动画中');
        return false;
    }
    console.log($('.current')[0].dataset.num);
    var num3 = $('.current')[0].dataset.num;
    if (num3 >= 1 && num3 <= Carousels.length-1) {
      var num4 = num3;
    } else {
       var num4 = 0;
    }
    changeItem(num4);
    addDot(num4);
    init = window.setInterval(inter, 4000);
};

// 明星单品切换
function subChange() {
    var mar = ($('.listContainer>ul').css('marginLeft') === '0px') ? '-1226px' : '0px';
    $('.listContainer>ul').animate({ marginLeft: mar }, 500);
}
$('.leftArrow').click(subChange);
$('.rightArrow').click(subChange);
// 为您推荐切换
$('.leftArrow2').click(subChange);
$('.rightArrow2').click(subChange);

// 轮播图左侧商品切换
var items = $('.goodItem');
var itemCards = $('.detailPage');
for (let k = 0; k < items.length; k++) {
    items[k].onmouseenter = function() {
        $(itemCards[k]).siblings('div.detailPage').hide();
        $(itemCards[k]).show()
                       .addClass('appear');
    };
    items[k].onmouseleave = function() {
        $('.detailPage.appear').hide();
    };
}
