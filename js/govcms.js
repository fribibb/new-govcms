function priceCalc(){return pageViews=$("#page-views").val(),siteCount=$("#number-of-sites").val(),totalAnnualCost=199,totalSetupCost=88,$("#calcForm").addClass("fade-out"),$("#calcResults #totalAnnualCost").text(totalAnnualCost),$("#calcResults #totalSetupCost").text(totalSetupCost),$("#calcResults #calcHeading").text("Your estimated total costs are"),$("#calcResults").removeClass("sr-only"),$("#calcResults").removeClass("fade-out"),$("#calcResults").addClass("fade-in"),!1}function priceReCalc(){return $("#calcForm").removeClass("fade-out"),$("#calcResults").removeClass("fade-in"),$("#calcResults").addClass("fade-out"),$("#calcResults #calcHeading").text("Calculate your costs"),$("#calcForm").addClass("fade-in"),$("#calcResults").addClass("sr-only"),!1}$(document).ready(function(){$(".drupal-version-list").toggleClass("sr-only"),$(".drupal-version-checkbox").change(function(){$(".drupal-version-list").toggleClass("sr-only")}),$(".site-info-add").click(function(){var t=$(".site-info")[0].outerHTML,e=$(".site-info").length,s=e+1;return t=t.replace(/1\"/g,s+'"'),$(".site-info").last().after(t),!1}),$(".split").each(function(){$(window).width()>993&&(height1=$(".section-one",this).height(),height2=$(".section-two",this).height(),height1>height2?(rightHeight=$(".section-one",this).height(),$(".section-two",this).height(rightHeight)):(rightHeight=$(".section-two",this).height(),$(".section-one",this).height(rightHeight)))})});