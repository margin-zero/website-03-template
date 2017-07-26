$(document).ready(function() {

    var init_navigation = refresh_navigation();
    init_navigation();

    init_data_element_width();

    // let's stop carousel - we want it to change screens only when we want to
    $("#contentMain").carousel("pause");

    // let's fit carousel to current screen size
    resize_carousel();

    navbar_collapse();

    // let's fit carousel to windows size after each window resize
    $(window).resize(resize_carousel);

    // let's check if there is enough space for horizontal menu
    $(window).resize(navbar_collapse);

    // when carousel slide changes, we want to add .active class to proper link in nav
    $('#contentMain').on('slid.bs.carousel', refresh_navigation());

    $("#topPageBar>.toggle-button").click(click_toggle());

    galleryThumbClick();
    overlayClick();
});



// resize_carousel() - resizes carousel height to current window size

function resize_carousel() {
    var new_height = $(window).height() - parseInt($("#topPageBar").css("height"), 10);
    $("#contentMain>.carousel-inner>.item").css("max-height", new_height);
};

function refresh_navigation() {
    return function() {
        $("#topPageBar>nav>a").removeClass("active");
        $("#contentMain").carousel("pause");
        $("#topPageBar>nav").find("[data-slide-to='" + $("#contentMain").find('.active').index() + "']").addClass("active");
    };
}

function click_toggle() {

    return function() {
        if (parseInt($("#topPageBar>.nav-links").css("left"), 10) < 0) {
            $("#topPageBar>.nav-links").css("left", "0px");
        } else {
            $("#topPageBar>.nav-links").css("left", "-100%");
        };
    };
};

function init_data_element_width() {
    var element_width = 0;

    // if .nav-links is not .collapsed and has not attribute data-element-width then set data-element-width attribute to important elements
    if ($("#topPageBar>.nav-links.collapsed").length <= 0) {

        element_width = element_width + parseInt($("#topPageBar>.nav-links").css("margin-left"), 10);
        element_width = element_width + parseInt($("#topPageBar>.nav-links").css("margin-right"), 10);
        element_width = element_width + parseInt($("#topPageBar>.nav-links").css("padding-left"), 10);
        element_width = element_width + parseInt($("#topPageBar>.nav-links").css("padding-right"), 10);
        $("#topPageBar>.nav-links").attr('data-element-width', element_width);

        $("#topPageBar>.nav-links>a").each(function() {
            element_width = 0;
            element_width = element_width + parseInt($(this).css("margin-left"), 10);
            element_width = element_width + parseInt($(this).css("margin-right"), 10);
            element_width = element_width + parseInt($(this).css("padding-left"), 10);
            element_width = element_width + parseInt($(this).css("padding-right"), 10);
            element_width = element_width + parseInt($(this).css("border-left-width"), 10);
            element_width = element_width + parseInt($(this).css("border-right-width"), 10);
            element_width = element_width + parseInt($(this).width());
            $(this).attr('data-element-width', element_width);
        });
    };

};


function navbar_collapse() {

    var nav_width = 0;
    var content_width = 0;
    var container_width = 0;

    // calculating space needed for horizontal menu
    nav_width = nav_width + parseInt($("#topPageBar>.nav-links").attr('data-element-width'), 10);
    $("#topPageBar>.nav-links>a").each(function() {
        nav_width = nav_width + parseInt($(this).attr('data-element-width'), 10);
    });

    // total space available in #topPageBar
    container_width = $("#topPageBar").width();

    // calculating width of the brand name element 
    content_width = content_width + parseInt($("#topPageBar>.brand-name").css("margin-left"), 10);
    content_width = content_width + parseInt($("#topPageBar>.brand-name").css("margin-right"), 10);
    content_width = content_width + parseInt($("#topPageBar>.brand-name").css("width"), 10);

    // checking if there is enough space for horizontal menu (with 100px distance between brand name and menu)
    if ((container_width - content_width - nav_width) <= 100) {
        $("#topPageBar>.nav-links").addClass("collapsed");
        $("#topPageBar>.toggle-button").css("display", "block");
    } else {
        if ($("#topPageBar>.nav-links").is(".collapsed")) {
            $("#topPageBar>.nav-links").css("left", "-100%");
            $("#topPageBar>.nav-links").removeClass("collapsed");
            $("#topPageBar>.toggle-button").css("display", "none");
        }
    }

};


function galleryThumbClick() {
    $(".image-thumbs>img").each(function() {
        $(this).click(function() {
            let previewImage = $(this).attr("src");

            $("#imageBigSize").attr("src", previewImage);
            $("#imageBigSize, #fullPageOverlay").fadeIn(500);
        });
    });
};

function overlayClick() {
    $("#fullPageOverlay, #imageBigSize").click(function() {
        $("#imageBigSize").removeClass("opacity");
        $("#fullPageOverlay, #imageBigSize").fadeOut(500);
    });
}