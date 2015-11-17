// Closes the sidebar menu
// $("#menu-close").click(function(e) {
//     e.preventDefault();
//     $("#sidebar-wrapper").toggleClass("active");
// });

// Opens the sidebar menu
// $("#menu-toggle").click(function(e) {
//     e.preventDefault();
//     $("#sidebar-wrapper").toggleClass("active");
// });

// Scrolls to the selected menu item on the page
// $(function() {
//     $('a[href*=#]:not([href=#])').click(function() {
//         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
//
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//             if (target.length) {
//                 $('html,body').animate({
//                     scrollTop: target.offset().top
//                 }, 1000);
//                 return false;
//             }
//         }
//     });
//
//
//     // make left and right split same height, noting the left is shorter
//     rightHeight = $('.split .text-right').height();
//     $('.split .text-left').height(rightHeight);
//
// });



$(document).ready(function() {
    // Set initial state, hide it...
    $('.drupal-version-list').toggleClass('sr-only');

    $('.drupal-version-checkbox').change(function() {
        // toggle on change
        $('.drupal-version-list').toggleClass('sr-only');
    });

    $('.site-info-add').click(function() {
        // duplicate .site-info form element
        var htmlToInsert = $('.site-info')[0].outerHTML;
        // increment the id number
        var numItems = $('.site-info').length;
        var numItemsNext = numItems + 1;
        htmlToInsert = htmlToInsert.replace(/1\"/g, numItemsNext+'"');
        // append
        $('.site-info').last().after( htmlToInsert );
        return false;
    });


});
