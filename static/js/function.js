$(document).ready(function() {
	$('.navbar-toggle').click(function() {
		$('body').toggleClass('navbar-on');
		$('#page-overlay').toggleClass('page-overlay'); 
		$('.navbar-collapse').toggleClass('in');
	});
	$('li .m-dropdown').click(function(event) {
		event.preventDefault();
		var parentLi = $(this).closest('li');
		parentLi.find('ul').slideToggle(); 
		$('li').not(parentLi).find('ul').slideUp();
	});
	$('.navbar-search-icon').click(function() {
		$(this).hide();
		$('.primary-menu').hide();
		$('.navbar-search').slideDown();
		$('.header').addClass('is-search');
	});
	$('.navbar-search-close').click(function() {
		$('.navbar-search').hide();
		$('.navbar-search-icon').show();
		$('.primary-menu').show();
		$('.header').removeClass('is-search');
	});
	$(".pay-author").click(function() {
        $(".panel-reward").toggle();
    });
    $('.sharebtntn').on('click', function() {
        $('.poster-box').addClass('show-modal');
    });
	$('.close-button').on('click', function() {
        $('.poster-box').removeClass('show-modal');
    });
	if (typeof SanSnowWaterfallflow === "function") {
		SanSnowWaterfallflow();
		$(window).resize(function () {
			SanSnowWaterfallflow();
		});
		var bLazy = new Blazy({
			success: function (element) {
				SanSnowWaterfallflow();
			}
		});
	}
});

var navItems = $(".navbar-nav > li");
navItems.each(function () {
    var _href = $(this).children('a').attr('href');

    if (_href === _Url) {
        if ($(this).parents('li').length > 0) {
            $(this).parents('li').addClass('active');
        } else {
            $(this).addClass('active');
        }
    }

    if ($(this).children('ul').length > 0) {
        $(this).addClass('dropdown');
        var submenu = $(this).children('ul').addClass('dropdown-menu');
        submenu.before('<div class="m-dropdown"><i class="fa fa-angle-down"></i></div>');
    }

    $(this).find('ul > li > a').each(function () {
        var subHref = $(this).attr('href');
        if (subHref === _Url) {
            $(this).closest('li').parents('li').first().addClass('active');
        }
    });
});



if ($(".form-box").length > 0) {
    var leftNavItems = $(".form-box li a");
    leftNavItems.each(function() {
        var leftHref = $(this).attr('href');
        if (leftHref === _Url) {
            $(this).parent('li').addClass('on'); 
        }
    });
}

$(document).on('click', '#ajaxLoadWrap a:not(.no-more-items)', function() {
    var _this = $(this);
    var next = _this.attr("href");
    _this.addClass("loading").text("加载中...");
    $.ajax({
        url: next,
        beforeSend: function() {},
        success: function(data) {
            $('.cms-module__container').append($(data).find('.tu-image-card'));
            $('.blog_list .list-container').append($(data).find('.post-item'));
			$('.list-container .content-wrap').append($(data).find('.list-item'));
			$('.list .card-container').append($(data).find('.card'));
			$('.site-main .collection-list').append($(data).find('.collection-item'));
			$('.page-tags .page-tags-ul').append($(data).find('.page-tags-ul li'));
			var nextHref = $(data).find("#ajaxLoadWrap a").attr("href");
            if (nextHref) {
                _this.removeClass("loading").text("加载更多").attr("href", nextHref);
            } else {
                _this.removeClass("loading").text("没有更多了").addClass("no-more-items disabled").attr("href", "javascript:;");
            }
			if (typeof SanSnowWaterfallflow === "function") {
				SanSnowWaterfallflow();
			}
        },
        complete: function() {
			if (typeof SanSnowWaterfallflow === "function") {
				var bLazy = new Blazy({
					success: function(element) {
						SanSnowWaterfallflow();
					}
				});
				SanSnowWaterfallflow();
			}else{
				var bLazy = new Blazy({});
			}
		},
        error: function() {
            location.href = next;
        }
    });
    return false;
});

let lastScrollTop = 0;
$(window).on("scroll", function() {
    const currentScroll = $(this).scrollTop();
	if (currentScroll > lastScrollTop) {
        $("body").addClass("hide-header");
    } else {
        $("body").removeClass("hide-header");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});


$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
	$('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
	$('.back-to-top-tow').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
});


$(document).ready(function() {
    var isNightCookie = san_getCookie('sannight');
    var body = document.body;
    var isNightButtons = document.querySelectorAll('.is-night');
    
    if (isNightCookie == 1) {
        body.classList.add('night');
        isNightButtons.forEach(function(button) {
            button.classList.add('is-on');
            var icon = button.querySelector('i');
            var span = button.querySelector('span');
            if (icon) {
                icon.classList.replace('fa-moon-o', 'fa-certificate');
            }
            if (span && span.textContent.trim() === '关灯') {
                span.textContent = '开灯';
            }
        });
    }
    
    isNightButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var icon = button.querySelector('i');
            var span = button.querySelector('span');
            if (body.classList.contains('night')) {
                body.classList.remove('night');
                isNightButtons.forEach(function(btn) {
                    btn.classList.remove('is-on');
                    if (icon) {
                        icon.classList.replace('fa-certificate', 'fa-moon-o');
                    }
                    if (span && span.textContent.trim() === '开灯') {
                        span.textContent = '关灯';
                    }
                });
                san_deleteCookie('sannight');
            } else {
                body.classList.add('night');
                isNightButtons.forEach(function(btn) {
                    btn.classList.add('is-on');
                    if (icon) {
                        icon.classList.replace('fa-moon-o', 'fa-certificate');
                    }
                    if (span && span.textContent.trim() === '关灯') {
                        span.textContent = '开灯';
                    }
                });
                san_setCookie('sannight', 1, 7);
            }
        });
    });
});


function san_setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function san_getCookie(name) {
    var nameEQ = name + "=";
    var cookiesArray = document.cookie.split(';');
    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function san_deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

$(document).ready(function() {
    var directory = $("#article-directory");
    var directoryList = $("#directory-list");
    var content = $(".article_content");
    var headers = content.find("h2, h3, h4, h5, h6").not(".shareBox h2, .shareBox h3, .shareBox h4, .shareBox h5, .shareBox h6,.article-card-citation h2");
    if (headers.length === 0) {
        directory.hide(); 
        return;
    }

    var counter = 1; 
    var lastLevel = 2; 
    var currentList = directoryList; 
    var listStack = [currentList]; 

    headers.each(function() {
        var header = $(this);
        var tagName = header.prop("tagName").toLowerCase();
        var id = "toc-" + counter++;
        
        header.attr("id", id);

        var level = parseInt(tagName.replace("h", ""), 10);

        if (level > lastLevel) {
            var subList = $("<ol>").appendTo(listStack[listStack.length - 1].children("li").last());
            listStack.push(subList);
            currentList = subList;
        } 
        else if (level < lastLevel) {
            listStack.splice(level - lastLevel); 
            currentList = listStack[listStack.length - 1];
        }

        var listItem = $("<li>").append(
            $("<a>").attr("href", "#" + id).text(header.text())
        );
        currentList.append(listItem);
        
        lastLevel = level;
        listStack[listStack.length - 1] = currentList;
    });

    directory.show(); 

    $("#directory-toggle-link").click(function(e) {
        e.preventDefault();
        var toggleText = $(this).text();
        
        if (toggleText === "展开") {
            directoryList.show();
            $(this).text("隐藏");
        } else {
            directoryList.hide();
            $(this).text("展开");
        }
    });
	$(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            directory.addClass("directory-fixed");
        } else {
            directory.removeClass("directory-fixed");
        }
    });
});

$(function () {
    if ($(".article-suspended-panel ul").length > 0) {
        var offset = $(".article-suspended-panel ul").offset();
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (offset.top < scrollTop) $(".article-suspended-panel ul").addClass("leftfollow");
            else $(".article-suspended-panel ul").removeClass("leftfollow");
        });
    }
});

$(document).ready(function() {
        $('.donate-btn').on('click', function() {
            $('.donate-modal-overlay').fadeIn();
            $('#wechatQR').addClass('show').removeClass('hide');
            $('#alipayQR').addClass('hide').removeClass('show');
        });

        $('.donate-close-btn, .donate-modal-overlay').on('click', function(event) {
            if ($(event.target).is('.donate-modal-overlay, .donate-close-btn')) {
                $('.donate-modal-overlay').fadeOut();
            }
        });

        $('.donate-switch-btn').on('click', function() {
            $('.donate-switch-btn').removeClass('active-wechat active-alipay');
            let type = $(this).data('type');

            if (type === 'wechat') {
                $(this).addClass('active-wechat');
                $('#wechatQR').addClass('show').removeClass('hide');
                $('#alipayQR').addClass('hide').removeClass('show');
            } else {
                $(this).addClass('active-alipay');
                $('#wechatQR').addClass('hide').removeClass('show');
                $('#alipayQR').addClass('show').removeClass('hide');
            }
        });
    });
	
 $(document).ready(function () {
      const content = $('.article_content');
      let fontSize = 16; 

      function updateFontSize() {
        content.css('font-size', fontSize + 'px');
      }

      $('#decreaseFont').click(function () {
        fontSize = Math.max(12, fontSize - 1); 
        updateFontSize();
      });

      $('#resetFont').click(function () {
        fontSize = 16; 
        updateFontSize();
      });

      $('#increaseFont').click(function () {
        fontSize = Math.min(24, fontSize + 1); 
        updateFontSize();
      });
		$('.clickfullscreen').on('click', function(e) {
        e.preventDefault();

        const icon = $(this).find('i'); 
        const mainContent = $('.main-content');

        if (icon.hasClass('fa-expand')) {
           icon.removeClass('fa-expand').addClass('fa-compress');
            mainContent.addClass('fullscreen');
        } else {
            icon.removeClass('fa-compress').addClass('fa-expand'); 
            mainContent.removeClass('fullscreen'); 
        }
    });
});

$(document).ready(function () {
    const chapterList = $('.chapter-list');
    const toggleButton = $('.toggle-chapters .toggle-button');

    if (chapterList.length > 0) {
        if (chapterList[0].scrollHeight <= 150) {
            toggleButton.hide(); 
        }

        toggleButton.on('click', function () {
            if (chapterList.hasClass('expanded')) {
                chapterList.removeClass('expanded').css('max-height', '150px');
                toggleButton.text('查看所有章节');
            } else {
                chapterList.addClass('expanded').css('max-height', 'none');
                toggleButton.text('收起章节列表');
            }
        });
    }
});


$(document).ready(function () {
    const orderToggle = $('.order-toggle');
    const chapterList = $('.chapter-list');

    let isAscending = true; 

    orderToggle.on('click', function () {
        const chapters = chapterList.children('.chapter').toArray(); 

        if (isAscending) {
            chapters.reverse();
            orderToggle.text('倒序');
        } else {
            chapters.reverse();
            orderToggle.text('正序');
        }

        isAscending = !isAscending; 

        chapterList.empty().append(chapters);
    });
});



function BookStarVote(vote,id){
	var s=$("div.book-star-vote").find("b").text();
	var t=$("p.reviews").find("span.turnout").text();
	$("p.reviews").find("span.turnout").text("打分中.....");
	$.post(bloghost + "zb_users/theme/San_ManHua/functions/vote.php",
		{
		"vote":vote,
		"id":id
		},
		function(data){
			if(data.indexOf("|")==-1){
				alert(data);
				$("p.reviews").find("span.turnout").text(s);
				$("p.reviews").find("span.turnout").text(t);
			}
			else{
				var i=data.split("|")[0];
				var j=data.split("|")[1];
				BookshowVote(i,j);
			}
			$("div.book-star-vote").find("b").css("visibility","visible");
		}
	);
}



//点赞成功回调
jQuery(document).ready(function ($) {
    window.zijiqugemingzi = function (postid, value) {
        var button = $(".san-praise-sdk[data-postid='" + postid + "'][data-value='" + value + "']");
        var badgeElement = button.find("[badge]");

        if (badgeElement.length) {
            var currentValue = parseInt(badgeElement.attr("badge"), 10) || 0;
            badgeElement.attr("badge", currentValue + 1);

            $.tipsBox({
                obj: badgeElement,
                str: "+1",
                callback: function () {
                    // 动画完成后的回调
                }
            });

			niceIn(badgeElement);
        }
    };

    window.niceIn = function (obj) {
        if (!obj || !obj.length) return;
        obj.addClass("niceInAnimation");
        setTimeout(function () {
            obj.removeClass("niceInAnimation");
        }, 1000);
    };

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
        .niceInAnimation {
            animation: niceInKeyframe 0.5s ease-in-out forwards;
        }
        @keyframes niceInKeyframe {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    if (typeof $.tipsBox !== "function") {
        $.extend({
            tipsBox: function (options) {
                options = $.extend({
                    obj: null,
                    str: "+1",
                    startSize: "12px",
                    endSize: "30px",
                    interval: 600,
                    color: "red",
                    callback: function () {}
                }, options);
                if (!options.obj || !options.obj.length) return;
                $("body").append("<span class='num'>" + options.str + "</span>");
                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - options.obj.height();
                box.css({
                    position: "absolute",
                    left: left + "px",
                    top: top + "px",
                    zIndex: 9999,
                    fontSize: options.startSize,
                    color: options.color
                }).animate({
                    fontSize: options.endSize,
                    opacity: "0",
                    top: top - parseInt(options.endSize) + "px"
                }, options.interval, function () {
                    box.remove();
                    options.callback();
                });
            }
        });
    }
});


$(document).ready(function () {
	  $('.ranking-list li').on('mouseover', function () {
		const $list = $(this).closest('.ranking-list');
		$list.find('li').removeClass('active'); 
		$(this).addClass('active');
		var bLazy = new Blazy({});
	  });
	});
	
// 自定义 data-ok 回调函数 zijiqugemingzi2
jQuery(document).ready(function ($) {
    
    window.zijiqugemingzi2 = function (postid, value) {
        var button = $(".san-praise-sdk[data-postid='" + postid + "'][data-value='" + value + "']");
        var countElement = button.find("count");

        if (countElement.length) {
            var currentValue = parseInt(countElement.text(), 10) || 0;
            countElement.text(currentValue + 1);

            $.tipsBox({
                obj: countElement,
                str: "+1",
                callback: function () {
                    // 动画完成后的回调
                }
            });

			niceIn(countElement);
        }
    };

    window.niceIn = function (obj) {
        if (!obj || !obj.length) return;
        obj.addClass("niceInAnimation");
        setTimeout(function () {
            obj.removeClass("niceInAnimation");
        }, 1000);
    };

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
        .niceInAnimation {
            animation: niceInKeyframe 0.5s ease-in-out forwards;
        }
        @keyframes niceInKeyframe {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    if (typeof $.tipsBox !== "function") {
        $.extend({
            tipsBox: function (options) {
                options = $.extend({
                    obj: null,
                    str: "+1",
                    startSize: "12px",
                    endSize: "30px",
                    interval: 600,
                    color: "red",
                    callback: function () {}
                }, options);
                if (!options.obj || !options.obj.length) return;
                $("body").append("<span class='num'>" + options.str + "</span>");
                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - options.obj.height();
                box.css({
                    position: "absolute",
                    left: left + "px",
                    top: top + "px",
                    zIndex: 9999,
                    fontSize: options.startSize,
                    color: options.color
                }).animate({
                    fontSize: options.endSize,
                    opacity: "0",
                    top: top - parseInt(options.endSize) + "px"
                }, options.interval, function () {
                    box.remove();
                    options.callback();
                });
            }
        });
    }
});

$(document).ready(function () {
    $(".view-more").click(function (e) {
        e.preventDefault();
        $("body").addClass("modal-open"); 
        $("#detailModal").fadeIn();
    });
	$(".close-btn").click(function () {
        $("body").removeClass("modal-open"); 
        $("#detailModal").fadeOut();
    });
	$(window).click(function (e) {
        if ($(e.target).is("#detailModal")) {
            $("body").removeClass("modal-open"); 
            $("#detailModal").fadeOut();
        }
    });
});


