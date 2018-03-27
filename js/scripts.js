document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {
        /* ==============
           Menu
        ================= */

        let $body = document.querySelector("body");
        let navMenu = document.querySelector(".menu");

        navMenu.addEventListener("click", function (event) {
            if (event.target.tagName == "IMG" && $body.classList.contains("menu-close")) {
                event.stopPropagation();
                return;
            }

            if ($body.classList.contains("menu-open")) {
                $body.classList.add("menu-close");

                setTimeout(function () {
                    $body.classList.remove("menu-open");
                }, 0);

            } else {
                $body.classList.add("menu-open");
                $body.classList.remove("menu-close");
            }
        });
        

        // SVG Drowing Set
        $(".point-ico-svg").length && (function(){
            replaceWithPaths($(".point-ico-svg"));
            setDash($(".point-ico-svg"));
        }());
        
        /* ==============
           Forms
        ================= */

        $("input, textarea").focus(function(){
            $(this).data("placeholder", $(this).attr("placeholder")).attr("placeholder", "");
        }).blur(function () {
            $(this).attr("placeholder", $(this).data("placeholder"));
        });

        function clearClassForChildren(parentElement, childSelector, classToRemove) {
            let children = parentElement.querySelectorAll(childSelector);

            Array.prototype.forEach.call(children, function (child) {
                child.classList.remove(classToRemove);
            });
        }
    });

    // Click Out
    function ClickOut(element) {
        this.element = element;

        this.removeClass = function (class_) {
            $(document).on("click", function (event) {
                if ($(event.target).closest(element).length) return;
                $(element).removeClass(class_);
                event.stopPropagation();
            });
        };
    };

    // forEach for IE
    (function () {
        if (typeof NodeList.prototype.forEach === "function") return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    }());
    
    // Find Parent
    function findParent(el, cls){
       while ((el = el.parentElement) && !el.classList.contains(cls));
       return el;
    }

}(jQuery))


