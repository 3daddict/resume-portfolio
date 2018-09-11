$(document).ready(initializePortfolio)

function initializePortfolio(){
    carouselRotation()//run the carousel ratation
    
}

function clickHandler(){
    
}

function carouselRotation(){
    $('.carousel').cycle({
        interval: 2000
      })
}