$(document).ready(initializePortfolio)

function initializePortfolio() {
    navScrollSpyOffset() //ScrollSpy Offset
    //letItSnow() //particle effect on hero background
    carouselRotation() //run the carousel ratation
    formValidation() //contact form validation
    copyrightYear() //update copyright date
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      }) //enable tooltips
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
           var url = "../../vendor/email_handler.php";
            // POST values in the background the the script URL
           $.ajax({
               type: "POST",
               url: url,
               data: $(this).serialize(),
               success: function (data)
               {
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