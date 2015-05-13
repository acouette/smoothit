(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function (event) {
        console.log("DOM fully loaded and parsed");
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
                var toScroll = targetOffset - window.scrollY;
                if (targetOffset + window.innerHeight > document.body.offsetHeight) {
                    toScroll = document.body.offsetHeight - window.innerHeight - window.scrollY;
                }
                var step = toScroll / 50;
                if (step) {
                    if (Math.abs(step) < 1) {
                        step = step > 0 ? 1 : -1;
                    }
                    window.scrollBy(0, step);
                    scrollSmoothly(targetOffset, step, toScroll - step);
                }
            }, 5);
        }
    });
}());
