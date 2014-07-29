// wait until document loads and then call menus and toggleSelect
$(document).ready(function() {
    gallery();
    configureMenus();
    /*formMain();*/
});

function configureMenus() {
    // variablee to hold current window state - small, medium, or large
    var windowState = 'large';
    // check intital width of the screen, respond with appropriate menu
    var sw = document.body.clientWidth;
    if (sw < 481) {
        smMenu();
    } else if (sw >= 481 && sw <= 768) {
        medMenu();
    } else {
        lgMenu();
    }
    // take care of resizing the window
    $(window).resize(function() {
        var sw = document.body.clientWidth;
        if (sw < 481 && windowState != 'small') {
            smMenu();
        }
        if (sw > 480 && sw < 769 && windowState != 'medium') {
            medMenu();
        }
        if (sw > 768 && windowState != 'large') {
            lgMenu();
        }
    }); /*----handle menu for small screens----*/

    function smMenu() {
        //reset the menu in case it's being resized from a medium screen    
        // remove any expanded menus
        $('.expand').removeClass('expand');
        $('.menuToggle').remove();
        //create the menu toggle
        $('#mainNav').before('<div class="menuToggle"><a href="#">menu<span class="indicator">+</span></a></div>');
        // append the + indicator
        // wire up clicks and changing the various menu states
        //we'll use clicks instead of touch in case a smaller screen has a pointer device
        //first, let's deal with the menu toggle
        $('.menuToggle a').click(function() {
            //expand the menu
            $('.topMenu').toggleClass('expand');
            // figure out whether the indicator should be changed to + or -
            var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
            // set the new value of the indicator
            $(this).find('span.indicator').text(newValue);
        });
        //indicate current window state
        windowState = 'small';
    } /*----handle menu for medium screen sizes----*/

    function medMenu() {
        // remove the "menu" element
        $('.menuToggle').remove();
        //indicate current window state
        windowState = 'medium';
    } /*----handle menu for large screens----*/

    function lgMenu() {
        $('.menuToggle').remove();
        windowState = 'large';
    }
} 
/*-----Photo_Gallery-----*/

function gallery() {
    //json data
    $.getJSON('js/carousel_data.json', function(data) {
        var output;
        $.each(data, function(key, val) {
            output += '<div class="marquee_panel">';
            output += '<img class="marquee_panel_photo" width="100" src="' + val.image + '" alt="' + val.country + '"/>';
            output += '<div class="marquee_panel_caption">';
            output += '<h2>' + val.country + '</h2>';
            output += '<p>' + val.info + '</p>';
            output += '</div>';
            output += '</div>';
        });
        $('.marquee_panels').html(output);
        gallery_output();
    })
}
var currentPanel = 1;
var totalPanels = 0;
var autoPlay = true;
var timePassed = 0;
var timeToChange = 3;

function gallery_output() {
    function autoAdvance() {
        if (window.timePassed == window.timeToChange) {
            window.timePassed = 0;
            if (window.currentPanel == window.totalPanels) {
                currentPanel = 0;
            }
            if (autoPlay == true) {
                $('.marquee_nav a.marquee_nav_item:nth-child(' + (window.currentPanel + 1) + ')').trigger('click');
            }
        } else {
            window.timePassed += 1;
        }
        $('.timePassed').html('timePassed = ' + window.timePassed);
        $('.autoPlay').html('autoPlay = ' + window.autoPlay);
    }
    setInterval(autoAdvance, 1000);
    $('.marquee_container').hover(

    function() {
        window.autoPlay = false;
        $(this).removeClass('autoplay');
    }, function() {
        window.autoPlay = true;
        window.timePassed = 0;
        $(this).addClass('autoplay');
    });
    // Generate Navigation links
    $('.marquee_panels .marquee_panel').each(function(index) {
        totalPanels = index + 1;
        $('.marquee_nav').append('<a class="marquee_nav_item" >' + totalPanels + '</a>');
        $('.totalPanels').html('totalPanels = ' + totalPanels);
    });
    // Generate Photo Lineup
    $('img.marquee_panel_photo').each(function(index) {
        var photoWidth = $('.marquee_container').width();
        var photoPosition = index * photoWidth;
        $('.marquee_photos').append('<img class="marquee_photo" style="left: ' + photoPosition + '" src="' + $(this).attr('src') + '" alt="' + $(this).attr('alt') + '" width="250" height="180" />');
        $('.marquee_photos').css('width', photoPosition + photoWidth);
    });
    // Set up Navigation Links
    $('.marquee_nav a.marquee_nav_item').click(function() {
        // Set the navigation state
        $('.marquee_nav a.marquee_nav_item').removeClass('selected');
        $(this).addClass('selected');
        var navClicked = $(this).index();
        var marqueeWidth = $('.marquee_container').width();
        var distanceToMove = marqueeWidth * (-1);
        var newPhotoPosition = navClicked * distanceToMove + 'px';
        var newCaption = $('.marquee_panel_caption').get(navClicked);
        window.currentPanel = navClicked + 1; /* debug */
        $('.currentPanel').html('<strong>currentPanel</strong> = ' + window.currentPanel);
        // Animate the photos and caption
        $('.marquee_photos').animate({
            left: newPhotoPosition
        }, 1000);
        $('.marquee_caption').animate({
            top: '300px'
        }, 500, function() {
            var newHTML = $(newCaption).html();
            $('.marquee_caption_content').html(newHTML);
            setCaption();
        });
    });
    // Preload all images, then initialize marquee
    $('.marquee_panels img').imgpreload(function() {
        initializeMarquee();
    });
}

function initializeMarquee() {
    $('.marquee_caption_content').html(
    $('.marquee_panels .marquee_panel:first .marquee_panel_caption').html());
    $('.marquee_nav a.marquee_nav_item:first').addClass('selected');
    $('.marquee_photos').fadeIn(1500);
    setCaption();
}

function setCaption() {
    var captionHeight = $('.marquee_caption').height();
    var marqueeHeight = $('.marquee_container').height();
    var newCaptionTop = marqueeHeight - captionHeight - 40;
    $('.marquee_caption').delay(100).animate({
        top: newCaptionTop
    }, 500);
} /*---Checkbox Tree----*/
(function($) {
    $.fn.extend({
        checktree: function() {
            $(this).addClass('checktree-root').on('change', 'input[type="checkbox"]', function(e) {
                e.stopPropagation();
                e.preventDefault();
                checkParents($(this));
                checkChildren($(this));
            });
            var checkParents = function(c) {
                    var parentLi = c.parents('ul:eq(0)').parents('li:eq(0)');
                    if (parentLi.length) {
                        var siblingsChecked = parseInt($('input[type="checkbox"]:checked', c.parents('ul:eq(0)')).length),
                            rootCheckbox = parentLi.find('input[type="checkbox"]:eq(0)');
                        if (c.is(':checked')) rootCheckbox.prop('checked', true)
                        else if (siblingsChecked === 0) rootCheckbox.prop('checked', false);
                        checkParents(rootCheckbox);
                    }
                }
            var checkChildren = function(c) {
                    var childLi = $('ul li input[type="checkbox"]', c.parents('li:eq(0)'));
                    if (childLi.length) childLi.prop('checked', c.is(':checked'));
                }
        }
    });
})(jQuery);
$('#tree').checktree();;// wait until document loads and then call menus and toggleSelect
$(document).ready(function() {
    formMain();
});

/*----form control----*/

function formMain() {
    $.validator.setDefaults({
        submitHandler: function() {
            $('#frmcontact').before('<div id="sucessform">Form Submitted successfully</div>');
            alert("form submitted")
        }
    });
    // validate signup form on keyup and submit
    $("#frmcontact").validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            success: "valid",
            submitHandler: function() {
                alert("Submitted!")
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            agree: "Please accept our policyy"
        }
    });
}