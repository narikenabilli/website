{{#each models.Vendor.collection.items }}
{{{$content}}}
{{/each}}

$(document).ready(function(){
  var $toc = $("#toc");
  if ($toc.length) {
    
    // 
    // Affix
    // 
    var $tocParent = $toc.parent(),
        $navbar = $('.navbar');
        $footer = $('.footer');

    $(window).resize(function() {
      $toc.width($tocParent.width()); 
    }).trigger("resize");

    $toc.affix({
      offset: {
        top: 0,
        bottom: function(){ return $footer.outerHeight(true); }
      }
    });

    // 
    // ScroolSpy replacement
    // 
    var isActive = function(elem) {
      var scrollTop = $(window).scrollTop();
      var elemTop = elem.offset().top;
      if (elemTop < scrollTop + 400) {
        return true;
      };
      return false;
    }

    var scrollSpy = function(evt) {
      // collect all toc items
      var items = []
      $toc.find("a").each(function(){
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
      
      $toc.find("li").removeClass('active');
      if (found) {
        found.parentsUntil('#toc', 'li').addClass('active');
      };
    };

    $(window).scroll(scrollSpy);
    $(window).resize(scrollSpy);

    // Init affix and scrollspy
    $(window).trigger("scroll");
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

// IEMobile fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle);
}
