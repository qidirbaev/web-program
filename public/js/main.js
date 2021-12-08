jQuery(document).ready(function($) {

	'use strict';

        $(function() {
  
          // lets
          let modBtn  = $('#modBtn'),
              modal   = $('#modal'),
              close   = modal.find('.close'),
              modContent = modal.find('.modal-content');
          
          modBtn.on('click', function() {
            modal.css('display', 'block');
            modContent.removeClass('modal-animated-out').addClass('modal-animated-in');
          });
          
          $(document).on('click', function(e) {
            let target = $(e.target);
            if(target.is(modal) || target.is(close)) {
              modContent.removeClass('modal-animated-in').addClass('modal-animated-out').delay(300).queue(function(next) {
                modal.css('display', 'none');
                next();
              });
            }
          });
          
        });

      (function($) {
        $(".accordion > li:eq(0) a")
          .addClass("active")
          .next()
          .slideDown();

        $(".accordion a").click(function(j) {
          let dropDown = $(this)
            .closest("li")
            .find("p");

          $(this)
            .closest(".accordion")
            .find("p")
            .not(dropDown)
            .slideUp();

          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
          } else {
            $(this)
              .closest(".accordion")
              .find("a.active")
              .removeClass("active");
            $(this).addClass("active");
          }

          dropDown.stop(false, true).slideToggle();

          j.preventDefault();
        });
      })(jQuery);


      $('.owl-carousel').owlCarousel({
          loop:true,
          margin:30,
          responsiveClass:true,
          responsive:{
              0:{
                  items:1,
                  nav:true
              },
              500:{
                  items:2,
                  nav:false
              },
              800:{
                  items:3,
                  nav:false
              },
              1000:{
                  items:4,
                  nav:true,
                  loop:false
              },
              1200:{
                  items:5,
                  nav:true,
                  loop:false
              },
              1500:{
                  items:6,
                  nav:true,
                  loop:false
              }
          }
      })

      
      $('#form-submit .date').datepicker({
      });

    jQuery(function($) {
      $.fn.responsivenav = function(args) {
        // Default settings
        let defaults = {
          responsive: true,
          width: 993,                           // Responsive width
          button: $(this).attr('id')+'-button', // Menu button id
          animation: {                          // Menu animation
          effect: 'slide',                    // Accepts 'slide' or 'fade'
          show: 150,
          hide: 100
          },
          selected: 'selected',                 // Selected class
          arrow: 'downarrow'                    // Dropdown arrow class
        };
        let settings = $.extend(defaults, args);
      
        init($(this).attr('id'), settings.button);
        
        function init(menuid, buttonid) {
          setupMenu(menuid, buttonid);
          $(window).bind('resize orientationchange', function(){ resizeMenu(menuid, buttonid); });
          resizeMenu(menuid, buttonid);
        }
        
        function setupMenu(menuid, buttonid) {
          let $mainmenu = $('#'+menuid+'>ul');
          
          let $headers = $mainmenu.find("ul").parent();
          $headers.each(function(i) {
            let $curobj = $(this);
            $curobj.children('a:eq(0)').append('<span class="'+settings.arrow+'"></span>');
          });
          
          if ( settings.responsive ) {
            $('#'+buttonid).click(function(e) {
              e.preventDefault();
              
              if ( isSelected($('#'+buttonid)) ) {
                // Close menu
                collapseChildren('#'+menuid);
                animateHide($('#'+menuid), $('#'+buttonid));
              } else {
                // Open menu
                animateShow($('#'+menuid), $('#'+buttonid));
              }
            });
          }
        }
        
        function resizeMenu(menuid, buttonid) {
          let $ww = document.body.clientWidth;
          if ( $ww > settings.width || !settings.responsive) {
            $('#'+menuid).removeClass('mobile');
            $('#'+buttonid).removeClass('mobile');
          } else {
            $('#'+menuid).addClass('mobile');
            $('#'+buttonid).addClass('mobile');
          }
          
          let $headers = $('#'+menuid+'>ul').find('ul').parent();
          
          $headers.each(function(i) {
            let $curobj = $(this);
            let $link = $curobj.children('a:eq(0)');
            let $subul = $curobj.find('ul:eq(0)');
            
            // Unbind events
            $curobj.unbind('mouseenter mouseleave');
            $link.unbind('click');
            animateHide($curobj.children('ul:eq(0)'));
            
            if ( $ww > settings.width  || !settings.responsive ) {
              // Full menu
              $curobj.hover(function(e) {
                let $targetul = $(this).children('ul:eq(0)');
                
                let $dims = { w: this.offsetWidth,
                              h: this.offsetHeight,
                              subulw: $subul.outerWidth(),
                              subulh: $subul.outerHeight()
                            };
                let $istopheader = $curobj.parents('ul').length == 1 ? true : false;
                $subul.css($istopheader ? {} : { top: 0 });
                let $offsets = { left: $(this).offset().left, 
                                 top: $(this).offset().top
                               };
                let $menuleft = $istopheader ? 0 : $dims.w;
                $menuleft = ( $offsets.left + $menuleft + $dims.subulw > $(window).width() ) ? ( $istopheader ? -$dims.subulw + $dims.w : -$dims.w ) : $menuleft;
                $targetul.css({ left:$menuleft+'px', 
                               width:$dims.subulw+'px' 
                              });
                
                animateShow($targetul);
              },
              function(e) {
                let $targetul = $(this).children('ul:eq(0)');
                animateHide($targetul);
              });
            } else {
              // Compact menu
              $link.click(function(e) {
                e.preventDefault();

                let $targetul = $curobj.children('ul:eq(0)');
                if ( isSelected($curobj) ) {
                  collapseChildren($targetul);
                  animateHide($targetul);
                } else {
                  animateShow($targetul);
                }
              });
            }
          });
          
          collapseChildren('#'+menuid);
          
          if ( settings.responsive && isSelected($('#'+buttonid)) ) {
            $('#'+menuid).hide();
            $('#'+menuid).removeAttr('style');
            $('#'+buttonid).removeClass(settings.selected);
          }
        }
        
        function collapseChildren(elementid) {
          // Closes all submenus of the specified element
          let $headers = $(elementid).find('ul');
          $headers.each(function(i) {
            if ( isSelected($(this).parent()) ) {
              animateHide($(this));
            }
          });
        }
        
        function collapseSiblings(element) {
          let $siblings = element.siblings('li');
          $siblings.each(function(i) {
            collapseChildren($(this));
          });
        }
        
        function isSelected(element) {
          return element.hasClass(settings.selected);
        }
        
        function animateShow(menu, button) {
          if ( !button ) { let button = menu.parent(); }
          
          button.addClass(settings.selected);
          
          if ( settings.animation.effect == 'fade' ) {
            menu.fadeIn(settings.animation.show);
          } else if ( settings.animation.effect == 'slide' ) {
            menu.slideDown(settings.animation.show);
          } else {
            menu.show();
            menu.removeClass('hide');
          }
        }
        
        function animateHide(menu, button) {
          if ( !button ) { let button = menu.parent(); }
          
          if ( settings.animation.effect == 'fade' ) {
            menu.fadeOut(settings.animation.hide, function() { 
              menu.removeAttr('style');
              button.removeClass(settings.selected);
            });
          } else if ( settings.animation.effect == 'slide' ) {
            menu.slideUp(settings.animation.hide, function() { 
              menu.removeAttr('style');
              button.removeClass(settings.selected);
            });
          } else {
            menu.hide();
            menu.addClass('hide');
            menu.removeAttr('style');
            button.removeClass(settings.selected);
          }
        }
      };
    });

    jQuery(function ($) {
      $('#primary-nav').responsivenav();
      $('#top-nav').responsivenav({responsive:false});
    });
	
        $('a.scrollTo').on('click', function(){
          let scrollTo = $(this).attr('data-scrollTo');
          $( "a.scrollTo" ).each(function() {
            if(scrollTo == $(this).attr('data-scrollTo')){
              $(this).addClass('active');
            } else {
              $(this).removeClass('active');
            }
          });
          $('body, html').animate({
            "scrollTop": $('#'+scrollTo).offset().top
          }, 1000 );
          return false;
        });
});