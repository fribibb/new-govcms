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
      if($( window ).width() > 993) {
        height1 = $('.section-one', this).height();
        height2 = $('.section-two', this).height();
        if (height1 > height2) {
          rightHeight = $('.section-one', this).height();
          $('.section-two', this).height(rightHeight);
        } else {
          rightHeight = $('.section-two', this).height();
          $('.section-one', this).height(rightHeight);
        }
      }
    });


  // For animating things via JS
    $.fn.extend({
      animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
      }
    });


  // 'search'/filter only on the knowledge-base page (for now at least)
    if( $(location).attr('pathname').indexOf("knowledge-base") != -1 ) {
      // The submit has no purpose here, its client side and realtime
      // ....it's basically there for looks
      $('.navbar-form').submit (function() {
        return false;
      });
      // ..but if a user doesn't realise it's realtime and insist on clicking it, point out that it's working
      $('.navbar-form button').click (function() {
        $('.search-for').animateCss('pulse');
      });

      // 'index' the content
      $('.media').each(function(){
        $(this).attr('data-search-term', $(this).text().toLowerCase());
      });

      // Whenever typing in searchbox
      $('#s').on('keyup', function(){
        var searchTermOrig = $(this).val();
        var searchTerm = searchTermOrig.toLowerCase();
        // Show / hide the results
        $('.media').each(function(){
          if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
            // $('.search-for').animateCss('fadeItDown');
          } else {
            // $('.search-for').animateCss('fadeOutDown');
            $(this).hide();
          }
        });
        var resultsVisble = $('.col-md-4 .media:visible').length;

        // Let the user know it's working
        if ( $('#about .search-for').html() == "&nbsp;" ) {
          $('#about .search-for').html( 'Showing matches for &quot;<span class="search-for-string">' + searchTermOrig + '</span>&quot;' );
        } else if ( searchTermOrig.length == 0 ) {
          $('#about .search-for').html('&nbsp;');
        } else {
          $('#about .search-for-string').text(searchTermOrig);
        }

        // If no results, display message to user
        if ( resultsVisble == 0 ) {
          $('.no-results').text('No matches found.');
        } else {
          $('.no-results').text('');
        }
      });
    } // End knowledge-base only JS

}); // end $(document).ready



// not used anymore
// function priceCalc() {
//   // Setup vars
//   pageViews = $('#page-views').val();
//   siteCount = $('#number-of-sites').val();
//
//   // Calculate it:
//   totalAnnualCost = 199; // for now.....
//   totalSetupCost = 88;  // for now.....
//
//   // Display it
//   $('#calcForm').addClass('fade-out');
//   $('#calcResults #totalAnnualCost').text(totalAnnualCost);
//   $('#calcResults #totalSetupCost').text(totalSetupCost);
//   $('#calcResults #calcHeading').text('Your estimated total costs are');
//   $('#calcResults').removeClass('sr-only');
//   $('#calcResults').removeClass('fade-out');
//   $('#calcResults').addClass('fade-in');
//
//   // Stop form submission
//   return false;
//   e.preventDefault();
// }
//
// function priceReCalc() {
//   // Display it
//   $('#calcForm').removeClass('fade-out');
//   $('#calcResults').removeClass('fade-in');
//   $('#calcResults').addClass('fade-out');
//   $('#calcResults #calcHeading').text('Calculate your costs');
//   $('#calcForm').addClass('fade-in');
//   $('#calcResults').addClass('sr-only');
//
//   // Stop anchor link loading
//   return false;
//   e.preventDefault();
// }
