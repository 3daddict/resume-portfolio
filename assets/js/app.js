$(document).ready(initializePortfolio)

function initializePortfolio() {
    navScrollSpyOffset() //ScrollSpy Offset
    //letItSnow() //particle effect on hero background
    carouselRotation() //run the carousel ratation
    formValidation() //contact form validation
    copyrightYear() //update copyright date
}

/**
 * function reserved to handle click calls
 */
function clickHandler() {

}

/**
 * function for recommendation carousel rotation
 */
function carouselRotation() {
    $('.carousel').carousel({
        interval: 10000
    })
}

/**
 * function for scrollspy offset on bootstrap 4 navbar
 */
function navScrollSpyOffset(){
    var offset = 50;
    $('.nav-link').click(function(event) {
        console.log('Scroll Offset')
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });
}

/**
 * function for copyright year auto update
 */
function copyrightYear() {
    $('#copyDate').text(new Date().getFullYear());
}

//DECONSRUCT AND RECODE THE WINDOW FUNCTIONS BELOW
$(window).on('scroll', function () {
    // console.log($(window).height());
    scroll_pos = $(window).scrollTop() + $(window).height();
    element_pos = $('.portfolio-card-right-1').offset().top + $('.portfolio-card-right-1').height();
    if (scroll_pos > element_pos) {
        $('.portfolio-card-right-1').addClass('animate-right');
    };
});

$(window).on('scroll', function () {
    // console.log($(window).height());
    scroll_pos = $(window).scrollTop() + $(window).height();
    element_pos = $('.portfolio-card-left').offset().top + $('.portfolio-card-left').height();
    if (scroll_pos > element_pos) {
        $('.portfolio-card-left').addClass('animate-left');
    };
});

$(window).on('scroll', function () {
    // console.log($(window).height());
    scroll_pos = $(window).scrollTop() + $(window).height();
    element_pos = $('.portfolio-card-right-2').offset().top + $('.portfolio-card-right-2').height();
    if (scroll_pos > element_pos) {
        $('.portfolio-card-right-2').addClass('animate-right');
    };
});

/**
 * function for form validation in contact section
 */
function formValidation() {
    $('#contact-form').validator();
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "../../contact.php";
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    // data = JSON object that contact.php returns
                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
};


// function letItSnow() {
//     var W, H,
//         canvas, ctx, //ctx stands for context and is the "curso" of our canvas element.
//         particleCount = 700,
//         particles = []; //this is an array which will hold our particles Object/Class

//     W = window.innerWidth;
//     H = window.innerHeight;

//     canvas = $("#canvas").get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection
//     canvas.width = W;
//     canvas.height = H;

//     ctx = canvas.getContext("2d"); // settng the context to 2d rather than the 3d WEBGL
//     ctx.globalCompositeOperation = "lighter";
//     // console.log(ctx);
//     var mouse = {
//         x: 0,
//         y: 0,
//         rx: 0,
//         ry: 0,
//         speed: 45,
//         delta: 0
//     };

//     document.addEventListener('mousemove', function (e) {

//         mouse.x = e.clientX || e.pageX;
//         mouse.y = e.clientY || e.pageY;
//         mouse.x -= W / 2;
//         mouse.y -= H / 2;

//     }, false);

//     function randomNorm(mean, stdev) {

//         return Math.abs(Math.round((Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)) * stdev) + mean;
//     }

//     //Setup particle class
//     function Particle() {
//         //using hsl is easier when we need particles with similar colors
//         this.h = parseInt(0);
//         this.s = parseInt(0 * Math.random() + 10);
//         this.l = parseInt(93 * Math.random() + 30);
//         this.a = 0.65 * Math.random();

//         this.color = "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + (this.a) + ")";
//         this.shadowcolor = "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + parseFloat(this.a - 0.55) + ")";

//         this.x = Math.random() * W;
//         this.y = Math.random() * H;
//         this.direction = {
//             "x": -1 + Math.random() * 2,
//             "y": -1 + Math.random() * 2
//         };
//         //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
//         this.radius = randomNorm(0, 4);
//         this.scale = 0.8 * Math.random() + 0.5;
//         this.rotation = Math.PI / 4 * Math.random();

//         this.grad = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
//         this.grad.addColorStop(0, this.color);
//         this.grad.addColorStop(1, this.shadowcolor);

//         this.vx = (2 * Math.random() + 4) * .01 * this.radius;
//         this.vy = (2 * Math.random() + 4) * .01 * this.radius;

//         this.valpha = 0.01 * Math.random() - 0.02;

//         this.move = function () {
//             this.x += this.vx * this.direction.x;
//             this.y += this.vy * this.direction.y;
//             this.rotation += this.valpha;
//             //this.radius*= Math.abs((this.valpha*0.01+1));

//         };
//         this.changeDirection = function (axis) {
//             this.direction[axis] *= -1;
//             this.valpha *= -1;
//         };
//         this.draw = function () {
//             ctx.save();
//             ctx.translate(this.x + mouse.rx / -20 * this.radius, this.y + mouse.ry / -20 * this.radius);
//             ctx.rotate(this.rotation);
//             ctx.scale(1, this.scale);

//             this.grad = ctx.createRadialGradient(0, 0, this.radius, 0, 0, 0);
//             this.grad.addColorStop(1, this.color);
//             this.grad.addColorStop(0, this.shadowcolor);
//             ctx.beginPath();
//             ctx.fillStyle = this.grad;
//             ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
//             ctx.fill();
//             ctx.restore();

//         };
//         this.boundaryCheck = function () {
//             if (this.x >= W * 1.2) {
//                 this.x = W * 1.2;
//                 this.changeDirection("x");
//             } else if (this.x <= -W * 0.2) {
//                 this.x = -W * 0.2;
//                 this.changeDirection("x");
//             }
//             if (this.y >= H * 1.2) {
//                 this.y = H * 1.2;
//                 this.changeDirection("y");
//             } else if (this.y <= -H * 0.2) {
//                 this.y = -H * 0.2;
//                 this.changeDirection("y");
//             }
//         };
//     } //end particle class

//     function clearCanvas() {
//         ctx.clearRect(0, 0, W, H);
//     } //end clear canvas

//     function createParticles() {
//         for (var i = particleCount - 1; i >= 0; i--) {
//             p = new Particle();
//             particles.push(p);
//         }
//     } // end createParticles

//     function drawParticles() {
//         for (var i = particleCount - 1; i >= 0; i--) {
//             p = particles[i];
//             p.draw();
//         }


//     } //end drawParticles

//     function updateParticles() {
//         for (var i = particles.length - 1; i >= 0; i--) {
//             p = particles[i];
//             p.move();
//             p.boundaryCheck();

//         }
//     } //end updateParticles

//     function initParticleSystem() {
//         createParticles();
//         drawParticles();
//     }

//     function animateParticles() {
//         clearCanvas();
//         setDelta();
//         update()
//         drawParticles();
//         updateParticles();
//         requestAnimationFrame(animateParticles);
//     }

//     initParticleSystem();
//     requestAnimationFrame(animateParticles);

//     function setDelta() {
//         this.now = (new Date()).getTime();
//         mouse.delta = (this.now - this.then) / 1000;
//         this.then = this.now;
//     }

//     function update() {

//         if (isNaN(mouse.delta) || mouse.delta <= 0) {
//             return;
//         }

//         var distX = mouse.x - (mouse.rx),
//             distY = mouse.y - (mouse.ry);

//         if (distX !== 0 && distY !== 0) {

//             mouse.rx -= ((mouse.rx - mouse.x) / mouse.speed);
//             mouse.ry -= ((mouse.ry - mouse.y) / mouse.speed);

//         }

//     };

// };

