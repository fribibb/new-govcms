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

});



function priceCalc() {
  // Setup vars
  pageViews = $('#page-views').val();
  siteCount = $('#number-of-sites').val();

  // Calculate it:
  totalAnnualCost = 199; // for now.....
  totalSetupCost = 88;  // for now.....

  // Display it
  $('#calcForm').addClass('fade-out');
  $('#calcResults #totalAnnualCost').text(totalAnnualCost);
  $('#calcResults #totalSetupCost').text(totalSetupCost);
  $('#calcResults #calcHeading').text('Your estimated total costs are');
  $('#calcResults').removeClass('sr-only');
  $('#calcResults').removeClass('fade-out');
  $('#calcResults').addClass('fade-in');

  // Stop form submission
  return false;
  e.preventDefault();
}

function priceReCalc() {
  // Display it
  $('#calcForm').removeClass('fade-out');
  $('#calcResults').removeClass('fade-in');
  $('#calcResults').addClass('fade-out');
  $('#calcResults #calcHeading').text('Calculate your costs');
  $('#calcForm').addClass('fade-in');
  $('#calcResults').addClass('sr-only');

  // Stop anchor link loading
  return false;
  e.preventDefault();
}
