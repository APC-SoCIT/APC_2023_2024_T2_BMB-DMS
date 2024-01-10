(function($) {
	
	"use strict";

/* ==========================================================================
   exists - Check if an element exists
   ========================================================================== */		
	
	function exists(e) {
		return $(e).length > 0;
	}

/* ==========================================================================
   isTouchDevice - return true if it is a touch device
   ========================================================================== */

	function isTouchDevice() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}

/* ==========================================================================
   setDimensionsPieCharts
   ========================================================================== */
	
	function setDimensionsPieCharts() {

		$('.pie-chart').each(function() {

			var $t = $(this),
				n = $t.parent().width(),
				r = $t.attr("data-barSize");
			
			if (n < r) {
				r = n;
			}
			
			$t.css("height", r);
			$t.css("width", r);
			$t.css("line-height", r + "px");
			
			$t.find("i").css({
				"line-height": r + "px",
				"font-size": r / 3
			});
			
		});

	}

/* ==========================================================================
   animatePieCharts
   ========================================================================== */

	function animatePieCharts() {

		if(typeof $.fn.easyPieChart !== 'undefined'){

			$('.pie-chart:in-viewport').each(function() {
	
				var $t = $(this),
					n = $t.parent().width(),
					r = $t.attr("data-barSize"),
					l = "square";
				
				if ($t.attr("data-lineCap") !== undefined) {
					l = $t.attr("data-lineCap");
				} 
				
				if (n < r) {
					r = n;
				}
				
				$t.easyPieChart({
					animate: 1300,
					lineCap: l,
					lineWidth: $t.attr("data-lineWidth"),
					size: r,
					barColor: $t.attr("data-barColor"),
					trackColor: $t.attr("data-trackColor"),
					scaleColor: "transparent",
					onStep: function(from, to, percent) {
						$(this.el).find('.pie-chart-description span').text(Math.round(percent));
					}
	
				});
				
			});
			
		}

	}

/* ==========================================================================
   animateMilestones
   ========================================================================== */

	function animateMilestones() {

		$('.milestone:in-viewport').each(function() {
			
			var $t = $(this),
				n = $t.find(".milestone-value").attr("data-stop"),
				r = parseInt($t.find(".milestone-value").attr("data-speed"), 10);
				
			if (!$t.hasClass("already-animated")) {
				$t.addClass("already-animated");
				$({
					countNum: $t.find(".milestone-value").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".milestone-value").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".milestone-value").text(this.countNum);
					}
				});
			}
			
		});

	}

/* ==========================================================================
   animateProgressBars
   ========================================================================== */

	function animateProgressBars() {

		$('.progress-bar .progress-bar-outer:in-viewport').each(function() {
			
			var $t = $(this);
			
			if (!$t.hasClass("already-animated")) {
				$t.addClass("already-animated");
				$t.animate({
					width: $t.attr("data-width") + "%"
				}, 2000);
			}
			
		});

	}

/* ==========================================================================
   enableParallax
   ========================================================================== */

	function enableParallax() {

		// vertical parallax
		if(typeof $.fn.parallax !== 'undefined'){
			
			$('.parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("parallax-enabled");
				$t.parallax("49%", 0.01, false);
	
			});
			
		}
		
		// horizontal parallax
		if(typeof $.fn.hparallax !== 'undefined'){
		
			$('.horizontal-parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("horizontal-parallax-enabled");
				$t.hparallax();
	
			});
			
		}
		
		//animated parallax
		if(typeof $.fn.animatedparallax !== 'undefined'){
		
			$('.animated-parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("animated-parallax-enabled");
				$t.animatedparallax();
	
			});
		
		}

	}

/* ==========================================================================
   handleMobileMenu 
   ========================================================================== */		

	var MOBILEBREAKPOINT = 991;

	function handleMobileMenu() {

		if ($(window).width() > MOBILEBREAKPOINT) {
			
			$("#mobile-menu").hide();
			$("#mobile-menu-trigger").removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
		
		} else {
			
			if (!exists("#mobile-menu")) {
				
				$("#menu").clone().attr({
					id: "mobile-menu",
					"class": "fixed"
				}).insertAfter("#header");
				
				$("#mobile-menu > li > a, #mobile-menu > li > ul > li > a").each(function() {
					var $t = $(this);
					if ($t.next().hasClass('sub-menu') || $t.next().is('ul') || $t.next().is('.sf-mega')) {
						$t.append('<span class="fa fa-angle-down mobile-menu-submenu-arrow mobile-menu-submenu-closed"></span>');
					}
				});
			
				$(".mobile-menu-submenu-arrow").click(function(event) {
					var $t = $(this);
					if ($t.hasClass("mobile-menu-submenu-closed")) {
						$t.parent().siblings("ul").slideDown(300);
						$t.parent().siblings(".sf-mega").slideDown(300);
						$t.removeClass("mobile-menu-submenu-closed fa-angle-down").addClass("mobile-menu-submenu-opened fa-angle-up");
					} else {
						$t.parent().siblings("ul").slideUp(300);
						$t.parent().siblings(".sf-mega").slideUp(300);
						$t.removeClass("mobile-menu-submenu-opened fa-angle-up").addClass("mobile-menu-submenu-closed fa-angle-down");
					}
					event.preventDefault();
				});
				
				$("#mobile-menu li, #mobile-menu li a, #mobile-menu ul").attr("style", "");
				
			}
			
		}

	}

/* ==========================================================================
   showHideMobileMenu
   ========================================================================== */

	function showHideMobileMenu() {
		
		$("#mobile-menu-trigger").click(function(event) {
			
			var $t = $(this),
				$n = $("#mobile-menu");
			
			if ($t.hasClass("mobile-menu-opened")) {
				$t.removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
				$n.slideUp(300);
			} else {
				$t.removeClass("mobile-menu-closed").addClass("mobile-menu-opened");
				$n.slideDown(300);
			}
			event.preventDefault();
			
		});
		
	}
	
/* ==========================================================================
   handleAccordionsAndToogles
   ========================================================================== */
   
   function handleAccordionsAndToogles() {
	   
		// accordion
		
		$(".accordion .accordion-item").click(function(e) {
			e.preventDefault();
			if($(this).next("div").is(":visible")){
				$(this).removeClass('active').next("div").slideUp("slow");
			} else {
				$('.accordion .accordion-item').removeClass('active');
				$(".accordion .accordion-item-content").slideUp("slow");
				$(this).addClass('active').next("div").slideToggle("slow");
			}
		});
		
		$(".accordion .accordion-item:eq(0)").trigger('click').addClass('active');
		
		// toggle
		
		$(".toggle .toggle-item").click(function(e) {
			e.preventDefault();
			$(this).toggleClass('active').next("div").slideToggle("slow");
		});
		
		$(".toggle .toggle-item:eq(0)").trigger('click').addClass('active');
   
   }   
   
/* ==========================================================================
   handleBackToTop
   ========================================================================== */
   
   function handleBackToTop() {
	   
		$('#back-to-top').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
			return false;
		});
   
   }
   	
/* ==========================================================================
   showHidebackToTop
   ========================================================================== */	
	
	function showHidebackToTop() {
	
		if ($(window).scrollTop() > $(window).height() / 2 ) {
			$("#back-to-top").removeClass('gone');
			$("#back-to-top").addClass('visible');
		} else {
			$("#back-to-top").removeClass('visible');
			$("#back-to-top").addClass('gone');
		}
	
	}

/* ==========================================================================
   handleVideoBackground
   ========================================================================== */
   
	var min_w = 0, 					
		video_width_original = 1920,
		video_height_original = 1080,
		vid_ratio = 1920/1080;
   
	function handleVideoBackground() {
	   
		$('.fullwidth-section .fullwidth-section-video').each(function(i){

			var $sectionWidth = $(this).closest('.fullwidth-section').outerWidth(),
				$sectionHeight = $(this).closest('.fullwidth-section').outerHeight();
			
			$(this).width($sectionWidth);
			$(this).height($sectionHeight);

			// calculate scale ratio
			var scale_h = $sectionWidth / video_width_original,
				scale_v = $sectionHeight / video_height_original, 
				scale = scale_h > scale_v ? scale_h : scale_v;

			// limit minimum width
			min_w = vid_ratio * ($sectionHeight+20);
			
			if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}
					
			$(this).find('video').width(Math.ceil(scale * video_width_original +2));
			$(this).find('video').height(Math.ceil(scale * video_height_original +2));
			
		});

	}
   	
/* ==========================================================================
   handleSearch
   ========================================================================== */
   
	function handleSearch() {	
		
		$("#custom-search-button").click(function(e) { 
	
			e.preventDefault();
			
			if(!$("#custom-search-button").hasClass('open')) {
			
				$("#custom-search-form-container").fadeIn(400);
				
			} else {
				
				$("#custom-search-form-container").fadeOut(400);	
			
			}
			
		});
		
		$('#custom-search-form').append('<a class="custom-search-form-close" href="#" title="Close Search Box">x</a>');
		
		$('#custom-search-form-container a.custom-search-form-close').click(function(event){
			
			event.preventDefault();
			$('#custom-search-form-container').fadeOut(300);
			
		});
		
	 }
	 
// -------------------------------------------------------------------------------------------------------
//  handleFullScreen
// -------------------------------------------------------------------------------------------------------
	 
	function handleFullScreen() {
		
		var x = $(window).height();
		
		$('.fullscreen').css("height", x + "px");
		
	}

// -------------------------------------------------------------------------------------------------------
//  handleMenuSlideFromRight
// -------------------------------------------------------------------------------------------------------
	
	function handleMenuSlideFromRight() {

		$(document).on('click', '.sfr-menu-collaps', function(event){
			
			var navigation = $('.nav-sfr-menu'),
				$this = $(this);
				
			event.preventDefault();
			navigation.toggleClass('nav-open');
			
			$this.hide();
			$('.sfr-menu').append('<a class="close-menu" href="#"><i class="fa fa-times"></i></a>');
			
		});

		$(document).on('click', '.close-menu', function(event){
			
			var $this = $(this),
				$collaps = $('.sfr-menu-collaps');

			event.preventDefault();
			$this.closest('.nav-sfr-menu').toggleClass('nav-open');
			
			$collaps.show();
			
			$('a.close-menu').remove();

		});
		
		$(".sfr-menu > li.dropdown").prepend('<a class="close" href="#"></a>');
		
		if (isTouchDevice()) {
			$('.sfr-menu > li.dropdown a.close').css("opacity", 1);
		}
		
		$(document).on('click', '.sfr-menu > li.dropdown > a.close', function(event){
			
			event.preventDefault();
			$(this).toggleClass("open").siblings("ul").slideToggle(300);
			
		});
		
	}
	
// -------------------------------------------------------------------------------------------------------
//  handleMenuSlideFromTop
// -------------------------------------------------------------------------------------------------------

	function handleMenuSlideFromTop() {
		
		var x = $(".nav-sft-menu").height();
		
		$(document).on('click', '.sft-menu-collaps', function(event){
			
			var navigation = $('.nav-sft-menu'),
				$this = $(this);
				
			event.preventDefault();
			$("body").toggleClass("push").css("top", x + "px");
			navigation.slideDown(300).toggleClass('open');
			
			$('.sft-menu').append('<a class="close-sft-menu" href="#"><i class="fa fa-times"></i></a>');
			
		});

		$(document).on('click', '.close-sft-menu', function(event){
			
			var $this = $(this),
				$collaps = $('.sft-menu-collaps');

			event.preventDefault();
			$("body").toggleClass("push").css("top",0);
			$this.closest('.nav-sft-menu').slideUp(300).toggleClass('open');
			
			$('a.close-sft-menu').remove();

		});	
		
	}
	
// -------------------------------------------------------------------------------------------------------
//  handleShowHideFilter
// -------------------------------------------------------------------------------------------------------

	function handleShowHideFilter() {
		
		$(".portfolio-filter ul").hide();
		
		$(document).on('click', '.show-filter', function(event){
			
			event.preventDefault();
			$(".portfolio-filter ul").slideDown(300);
			$(".show-filter").html("<i class='ifc-audio_wave2'></i> close filter").addClass("hide-filter");
			
		});
		
		$(document).on('click', '.hide-filter', function(event){
				
			event.preventDefault();
			$(".portfolio-filter ul").slideUp(300);
			$(".show-filter").html("<i class='ifc-audio_wave2'></i> display filter").removeClass("hide-filter");
			
		});
		
	}
	
// -------------------------------------------------------------------------------------------------------
//  handleMoreDetails
// -------------------------------------------------------------------------------------------------------
	
	function handleMoreDetails() {

		$('.team-member').attr("title","View team member profile");
		
		$('.team-member, .timeline-item').click(function (event) {
			event.preventDefault();
			var projectContainer = $(this).closest('.ajax-wrapper').children('.ajax-container').attr('data-container');

			if ($('.ajax-container[data-container="' + projectContainer + '"]').hasClass('open-container')) {
				$('.ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
				$('.ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
			}

			var fileID = $(this).attr('data-file');

			if (fileID !== null) {
				$('html,body').animate({
					scrollTop: $('.ajax-container[data-container="' + projectContainer + '"]').offset().top - 55
				}, 500);
			}

			$('.ajax-container[data-container="' + projectContainer + '"]').load(fileID + " .ajax-content", function () {
				
				$('.ajax-container[data-container="' + projectContainer + '"]').addClass('open-container');
				$('.team-member-details, .timeline-details').append('<p class="close" href="#">x</p>');
				
				$('.team-member-details .close').click(function () {
					$('.ajax-container').addClass('closed-container');
					$('.ajax-container').removeClass('open-container');
					$('html,body').animate({
						scrollTop: $('.ajax-wrapper .team-member').offset().top - 55
					}, 500);
					setTimeout(function () {
						$('.ajax-container').html('');
					}, 500);
				});
				
				$('.timeline-details .close').click(function () {
					$('.ajax-container').addClass('closed-container');
					$('.ajax-container').removeClass('open-container');
					$('html,body').animate({
						scrollTop: $('.ajax-wrapper .timeline-item').offset().top - 55
					}, 500);
					setTimeout(function () {
						$('.ajax-container').html('');
					}, 500);
				});
				
				$('.ajax-container[data-container="' + projectContainer + '"]').removeClass('closed-container');
				
				$('.close').click(function () {
					$('.ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
					$('.ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
					$('html,body').animate({
						scrollTop: $('.ajax-wrapper[data-container="' + projectContainer + '"]').offset().top - 55
					}, 500);
					setTimeout(function () {
						$('.ajax-container[data-container="' + projectContainer + '"]').html('');
					}, 500);
				});
			});

		});
		
	}	

// -------------------------------------------------------------------------------------------------------
//  handleequalCols
// -------------------------------------------------------------------------------------------------------
	
	function handleequalCols() {
		
		$.fn.equalCols = function() {
			
			//Array Sorter
			var sortNumber = function(a, b) {
				return b - a;
			};
			
			var heights = [];
			//Push each height into an array
			
			$(this).each(function() {
				heights.push($(this).innerHeight());
			});
			
			heights.sort(sortNumber);
			
			var maxHeight = heights[0];
			
			return this.each(function() {
				$(this).css({
					'min-height': maxHeight
				});
			});
		};
		
		// make equal height footer boxes
		
		if ($(window).width() > 767) {
	
			$('.blog-post-2').equalCols();
			
		}else{
		
			$('.vertical-timeline li, .separator').css({
				'min-height': 0
			});
		}
		
		if ($(window).width() > 767) {
	
			$('.blog-post-2').css({
				'min-height': 0
			});
			
			$('.blog-post-2').equalCols();
			
		}else{
		
			$('.blog-post-2').css({
				'min-height': 0
			});
			
		} 
	}	
	 
/* ==========================================================================
   When document is ready, do
   ========================================================================== */
   
	$(document).ready(function() {			   
		
		setDimensionsPieCharts();
		
		animatePieCharts();
		animateMilestones();
		animateProgressBars();

		if (!isTouchDevice()) {
			enableParallax();
		}

		
		
		handleMobileMenu();
		showHideMobileMenu();
		
		handleAccordionsAndToogles();
		
		handleBackToTop();
		showHidebackToTop();
		
		handleVideoBackground();
		
		handleSearch();
		
		handleFullScreen();
		
		handleMenuSlideFromRight();
		
		handleMenuSlideFromTop();
		
		handleShowHideFilter();
		
		handleMoreDetails();
		
		handleequalCols();
		
				// loader
		
		if(typeof $.fn.queryLoader2 != 'undefined'){
			
			$("body").queryLoader2({
				barColor: "#191919",
				barHeight: 10,
				backgroundColor: "#fff"
			});
			
		}
		
		// Youtube video background
		// https://github.com/pupunzi/jquery.mb.YTPlayer
		
		if(typeof $.fn.mb_YTPlayer !== 'undefined'){
		
			$('.player').mb_YTPlayer();
		
		}
	
		// Superfish - enhance pure CSS drop-down menus
		// http://users.tpg.com.au/j_birch/plugins/superfish/options/
		
		if(typeof $.fn.superfish !== 'undefined'){
			
			$('#menu').superfish({
				delay: 500,
				animation: {opacity:'show',height:'show'},
				speed: 100,
				cssArrows: true
			});
			
		}
		
		// bxSlider - responsive slider
		// http://bxslider.com/options
		
		if(typeof $.fn.bxSlider !== 'undefined'){
			
			var testimonial_slider = $('.testimonial-slider .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 800,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: false,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: false,						// If true, "Next" / "Prev" controls will be added
				 auto: false,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.testimonial-slider-control a').each(function() {
				
				$(this).click(function() {
					
					var x = $(this).attr("data-slide");
					
					$('.testimonial-slider-control li a').removeClass('active');
					$(this).addClass('active');
					
					testimonial_slider.goToSlide(x-1);
					return false;

				});
                
            });
			
			$('.portfolio-strip-slider .slides').bxSlider({
				 mode: 'horizontal',					// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 800,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: false,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: true,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false, 						// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
				 slideWidth: "440",
				 minSlides: 1,
				 maxSlides: 4,
				 moveSlides: 1,
				 slideMargin: 0
			});
			
			$('.features-slider .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 800,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: true,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: true,						// If true, "Next" / "Prev" controls will be added
				 auto: false,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.images-slider .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 800,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: false,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: true,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
		}
				
		// Magnific PopUp - responsive lightbox
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html
		
		if(typeof $.fn.magnificPopup !== 'undefined'){
		
			$('.magnificPopup').magnificPopup({
				disableOn: 400,
				closeOnContentClick: true,
				type: 'image'
			});
			
			$('.magnificPopup-gallery').magnificPopup({
				disableOn: 400,
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		
		}

		// EasyTabs - tabs plugin
		// https://github.com/JangoSteve/jQuery-EasyTabs/blob/master/README.markdown
		
		if(typeof $.fn.easytabs !== 'undefined'){
			
			$('.tabs-container').easytabs({
				animationSpeed: 300,
				updateHash: false
			});
			
			$('.vertical-tabs-container').easytabs({
				animationSpeed: 300,
				updateHash: false
			});
		
		}
		
		// gMap -  embed Google Maps into your website; uses Google Maps v3
		// http://labs.mario.ec/jquery-gmap/
		
		if(typeof $.fn.gMap !== 'undefined'){
		
			//handleGoogleMapHeight();
			
			$('.google-map').each(function() {
				
				var $t = $(this),
					mapZoom = 15,
					mapAddress = $t.attr("data-address"),
					mapCaption = $t.attr("data-caption"),
					mapType = "ROADMAP",
					mapHeight = $t.attr("data-mapheight"),
					popUp = false;
				
				if ($t.attr("data-zoom") !== undefined) {
					mapZoom = parseInt($t.attr("data-zoom"),10);
				}	
				
				if ($t.attr("data-mapHeight") !== undefined) {
					$t.css( "height", mapHeight+'px');
				}
				
				if ($t.attr("data-maptype") !== undefined) {
					mapType = $t.attr("data-maptype");
				} 
				
				if ($t.attr("data-popup") !== undefined) {
					popUp = $t.attr("data-popup");
				} 
				
				$t.gMap({
					maptype: mapType,
					scrollwheel: false,
					zoom: mapZoom,
					markers: [{
						address: mapAddress,
						html: mapCaption,
						popup: popUp
					}],
					controls: {
						panControl: true,
						zoomControl: true,
						mapTypeControl: true,
						scaleControl: false,
						streetViewControl: false,
						overviewMapControl: false
					}
				});
		
			});
			
		}
		
		// Isotope - portfolio filtering
		// http://isotope.metafizzy.co/beta/
		
		if ((typeof $.fn.isotope !== 'undefined') && (typeof $.fn.imagesLoaded !== 'undefined') && ($('.portfolio-isotope').length > 0)) {
			
			// initialize isotope after images are loaded
			
			$('.portfolio-isotope').imagesLoaded( function() {
			
				var container = $('.portfolio-isotope');
					
				container.isotope({
					itemSelector: '.item',
					layoutMode: 'masonry',
					transitionDuration: '0.5s'
				});
		
				$('.portfolio-filter li a').click(function () {
					$('.portfolio-filter li a').removeClass('active');
					$(this).addClass('active');
		
					var selector = $(this).attr('data-filter');
					container.isotope({
						filter: selector
					});
		
					return false;
				});
		
				$(window).resize(function () {
		
					container.isotope({ });
				
				});
				
			});
			
			// Load More
			
			var portfolio_track_click = 0,
				portfolio_offset = 0,
				portfolio_items_loaded = 4;
		
			$('.load-more').click(function(event) {
				
				event.preventDefault();
				
				$.ajax({					
					type: "POST",
					url: $(this).attr("data-file"),
					dataType: "html",
					cache: false,
					msg : '',
					success: function(data){
						var items  = $(data).filter('.item'),
							length = items.length,
							html   = '';
						if( length > 0 ){

							if( portfolio_offset !== length ){

								for( var i = 0; portfolio_offset < length && i < portfolio_items_loaded; portfolio_offset++, i++ ){
									html += items.eq( portfolio_offset ).prop('outerHTML');
								}

								$('.portfolio-isotope').append(html);

								$('.portfolio-isotope').imagesLoaded( function() {

									$(window).trigger( 'resize' );
									$('.portfolio-isotope').isotope('reloadItems').isotope();

								});
								if( length <= portfolio_items_loaded || portfolio_offset == length ){
									$('.load-more').text('No more Posts to show').css({"cursor":"default"});
								}

								$('.magnificPopup-gallery').magnificPopup({
									disableOn: 400,
									type: 'image',
									gallery: {
										enabled: true
									}
								});	
								
							} else {
								$('.load-more').text('No more Posts to show').css({"cursor":"default"});
							}

						} else {
							$('.load-more').text('No more Posts to show').css({"cursor":"default"});
						}

					}					
				});
				
			});
			
			//
			
			
		}
		
		// slickSlider - responsive slider
		// http://kenwheeler.github.io/slick
		
		if (typeof $.fn.slick !== 'undefined') {

			$('.main-slider').each(function() {
				
				var $t = $(this);
				
				var $slider = $t.find('.main-slider__slides');

				var $slider_config = {
						fade: true,
						speed: 500,
						autoplay: true,
						infinite: true,
						pager: true,
						controls: true	
					};

				$slider.slick({
					
					adaptiveHeight: true,
					
					fade: $slider_config.fade,
					cssEase: 'linear',
					
					speed: $slider_config.speed,
					
					autoplay: $slider_config.autoplay,
					
					infinite: $slider_config.infinite,

					arrows: $slider_config.controls,
					appendArrows: $t.find('.main-slider__arrows'),
					prevArrow: '<a class="slick-prev" href="#"><i class="ifc-left"></i></a>',
					nextArrow: '<a class="slick-next" href="#"><i class="ifc-right"></i></a>',
					
					dots: $slider_config.pager,
					appendDots: $t.find('.main-slider__pager')
					
				});
		
			});

		}
		
		//
		
	});

/* ==========================================================================
   When the window is scrolled, do
   ========================================================================== */
   
	$(window).scroll(function() {				   
		
		animateMilestones();
		animatePieCharts();
		animateProgressBars();
		
		showHidebackToTop();
		
	});

/* ==========================================================================
   When the window is resized, do
   ========================================================================== */
   
	$(window).resize(function() {
		
		handleMobileMenu();
		handleVideoBackground();
		
		handleFullScreen();
		
		handleequalCols();
		
	});
	

})(window.jQuery);

// non jQuery scripts below