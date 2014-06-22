{{#each models.Vendor.collection.items }}
{{{$content}}}
{{/each}}


$(document).ready(function(){


  
  if ($('#toc').length) {

    var sidebarContainer = $(".sidebar-container");
    var sidebar = $(".toc");
    var footer  = $('.footer');

    var adjustSidebar = function(e) {
      var scrollBottom = $(window).scrollTop() + $(window).height();
      var footerTop = footer.offset().top;

      if (sidebarContainer.length > 0) {
        var sidebarMaxHeight = (footerTop >= scrollBottom) ? $(window).height() : $(window).height() - (scrollBottom - footerTop);
        sidebar.css("max-height", sidebarMaxHeight);
        
        var tocOffsetTop = sidebarContainer.offset().top;
        if($(window).scrollTop() + 60 >= tocOffsetTop) {
          sidebar.addClass("fix");
          // sidebar.css("left", sidebarContainer.offset().left);
          sidebar.css("width", sidebarContainer.width());
        } else {
          sidebar.removeClass("fix");
          // sidebar.css("left", 'auto');
        }        
      };
    };

    $(window).scroll(adjustSidebar);
    $(window).resize(adjustSidebar);


    var isActive = function(elem) {
      var scrollTop = $(window).scrollTop();
      var elemTop = elem.offset().top;
      if (elemTop < scrollTop + 400) {
        console.log('isActive', elem.attr('id'), 'yes');
        return true;
      };
      console.log('isActive', elem.attr('id'), 'no');
      return false;
    }

    var scrollSpy = function(evt) {
      // collect all toc items
      var items = []
      $(".toc a").each(function(){
        items.push({  tocItem: $(this), header: $(this.hash) });
      });

      // find last active toc item
      found = null;

      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];
        if (isActive(item.header)) {
          found = item.tocItem;
          break;
        };
      };
      
      $(".toc li").removeClass('active');
      if (found) {
        found.parentsUntil('.toc', 'li').addClass('active');
      };

    };

    $(window).scroll(scrollSpy);
    $(window).resize(scrollSpy);
  }

  // Smooth scroll
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 500);
        return false;
      }
    }
  });

});

// // IEMobile fix
// if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
//   var msViewportStyle = document.createElement('style')
//   msViewportStyle.appendChild(
//     document.createTextNode(
//       '@-ms-viewport{width:auto!important}'
//     )
//   )
//   document.querySelector('head').appendChild(msViewportStyle);
// }
