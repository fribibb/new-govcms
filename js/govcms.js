function priceCalc(){return pageViews=$("#page-views").val(),siteCount=$("#number-of-sites").val(),totalAnnualCost=199,totalSetupCost=88,$("#calcForm").addClass("fade-out"),$("#calcResults #totalAnnualCost").text(totalAnnualCost),$("#calcResults #totalSetupCost").text(totalSetupCost),$("#calcResults #calcHeading").text("Your estimated total costs are"),$("#calcResults").removeClass("sr-only"),$("#calcResults").removeClass("fade-out"),$("#calcResults").addClass("fade-in"),!1}function priceReCalc(){return $("#calcForm").removeClass("fade-out"),$("#calcResults").removeClass("fade-in"),$("#calcResults").addClass("fade-out"),$("#calcResults #calcHeading").text("Calculate your costs"),$("#calcForm").addClass("fade-in"),$("#calcResults").addClass("sr-only"),!1}$(document).ready(function(){$(".drupal-version-list").toggleClass("sr-only"),$(".drupal-version-checkbox").change(function(){$(".drupal-version-list").toggleClass("sr-only")}),$(".site-info-add").click(function(){var t=$(".site-info")[0].outerHTML,e=$(".site-info").length,s=e+1;return t=t.replace(/1\"/g,s+'"'),$(".site-info").last().after(t),!1}),$(".split").each(function(){$(window).width()>993&&(height1=$(".section-one",this).height(),height2=$(".section-two",this).height(),height1>height2?(rightHeight=$(".section-one",this).height(),$(".section-two",this).height(rightHeight)):(rightHeight=$(".section-two",this).height(),$(".section-one",this).height(rightHeight)))}),$(location).attr("pathname").indexOf("knowledge-base")!=-1&&($(".navbar-form").submit(function(){return!1}),$("#about h2").after('<p class="lead search-for">&nbsp;</p>'),$(".col-md-12 .col-md-4:nth-of-type(3)").after('<div class="col-md-12 text-center"><p class="lead no-results"></p>'),$(".media").each(function(){$(this).attr("data-search-term",$(this).text().toLowerCase())}),$("#s").on("keyup",function(){var t=$(this).val(),e=t.toLowerCase();$(".media").each(function(){$(this).filter("[data-search-term *= "+e+"]").length>0||e.length<1?$(this).show():$(this).hide()});var s=$(".col-md-4 .media:visible").length;"&nbsp;"==$("#about .search-for").html()?$("#about .search-for").html('Showing matches for &quot;<span class="search-for-string">'+t+"</span>&quot;"):0==t.length?$("#about .search-for").html("&nbsp;"):$("#about .search-for-string").text(t),0==s?$("p.no-results").text("No matches found."):$("p.no-results").text("")}))});