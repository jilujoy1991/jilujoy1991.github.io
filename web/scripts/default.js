(function ($) {
    window.console = window.console || function (t) { };
    $(document).ready(function () {
        (function () {
            var self = this,
                that = $('#loading'),
                current = that.find('.current'),
                progress = that.find('.progress'),
                isNeedLoaddng = String(that.css('display')).toLowerCase() === 'block';
            if (!isNeedLoaddng) {
                return onDone();
            }
            preloader({
                lazy: 20,
                onLoading: function (event) {
                    var percentage = event.progressed + '%';
                    current.text(percentage);
                    progress.stop().animate({
                        width: percentage
                    });
                },
                onComplete: function () {
                    that.animate({
                        top: '-100%',
                        opacity: '0'
                    }, {
                        duration: 1800,
                        easing: 'easeInOutBack'
                    });
                    onDone();
                }
            });
        }());

        function onDone() {
            /*onDone star*/
            /*document STAR*/
            h = $(window).height();
            w = $(window).width();


            $winH = $('.winH');
            $winHw = $('.winHw');
            $winHf = $('.winHf');
            $jqimgFill = $('.jqimgFill');
            $jqimgFill_tc = $('.jqimgFill-tc');
            $pro64 = $('.pro64');
            $pro64s = $('.pro64s');
            $pro11 = $('.pro11');
            $pro1 = $('.pro1');
            $body = $('body');
            $header = $('#header');
            $navbarToggle = $('.navbar-toggle');
            $banner = $('#banner');
            $homeNews = $('#homeNews');
            $homePro = $('#homePro');
            $proBoxList = $('#proBoxList');
            $body.addClass('in');

            $searchBox = $('.search-bar');
            $searchBoxBtn = $('#searhc-box-btn');

            $itemMenu = $('.item-menu');
            $menu = $('#header .menu');

            $comparisonBox = $('.comparisonBox');
            $comparisonBoxBtn = $('.comparison');

            resizeCss();
            new WOW().init();

            /*== navigation  =========================== */
            $navbarToggle.click(function () {
                $body.toggleClass('open');
            });

            /*== top  =========================== */
            $(".top").click(function () {
                jQuery("html,body").animate({
                    scrollTop: 0
                }, 1000);
            });

            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.top').fadeIn("fast");
                } else {
                    $('.top').stop().fadeOut("fast");
                }
            });
						
						/* ==========================================================================
							* 產品內頁 往下
						==========================================================================*/
						
        }
        
    });
    )
            .init(options));
    }
})(jQuery);;
