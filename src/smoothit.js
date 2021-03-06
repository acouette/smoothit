(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function (event) {
        var items = document.querySelectorAll('a');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var isAnchor = new RegExp(window.location.origin + window.location.pathname + "#.+").test(item.href);
            if (isAnchor) {
                (function () {
                    var targetId = item.href.substr(item.href.indexOf('#') + 1);
                    var target = document.getElementById(targetId);
                    if (!target) {
                        throw Error("can not find element with id : " + targetId);
                    }
                    var targetOffset = target.offsetTop;
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                        history.pushState(null, null, '#' + targetId);
                        scrollSmoothly(targetOffset);
                    });
                }());
            }
        }
        function scrollSmoothly(targetOffset) {


            setTimeout(function () {
                var toScroll;
                if (targetOffset + window.innerHeight > document.body.offsetHeight) {
                    toScroll = document.body.offsetHeight - window.innerHeight - window.scrollY;
                } else {
                    toScroll = targetOffset - window.scrollY;
                }
                if (Math.abs(toScroll) < 1) {
                    return;
                } else {
                    window.scrollBy(0, toScroll > 0 ? Math.ceil(toScroll / 50) : Math.floor(toScroll / 50));
                    scrollSmoothly(targetOffset);
                }
            }, 5);
        }
    });
}());