$(document).ready(function() {

  // Conditional form logic
    // Set initial state, hide it...
    $('.drupal-version-list').toggleClass('sr-only');
    $('.drupal-version-checkbox').change(function() {
        // toggle on change
        $('.drupal-version-list').toggleClass('sr-only');
    });

  // Add extra sites btn functionality
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

  // Make left and right split same height, noting the either may be shorter
    $( ".split" ).each(function() {
      height1 = $('.section-one', this).height();
      height2 = $('.section-two', this).height();
      if (height1 > height2) {
        rightHeight = $('.section-one', this).height();
        $('.section-two', this).height(rightHeight);
      } else {
        rightHeight = $('.section-two', this).height();
        $('.section-one', this).height(rightHeight);
      }
    });

});
