/* ==============
    Product Zoom
================= */

(function(){

    const prodWrap  = document.querySelector(".product-viewer-wrap"); 
    const prodZoom  = document.querySelector(".product-zoom");
    const zoomImg   = document.querySelectorAll(".zoom-img");
    
    if (document.body.contains(prodWrap) && 
        html.classList.contains("no-touchevents") &&
        (prodWrap.classList.contains("product-viewer-front") ||
            prodWrap.classList.contains("product-viewer-back"))){

        let zoomSpeed = "100ms",
            zoomFunction = "ease",
            zoomMoveSpeed = "100ms",
            zoomMoveFunction = "linear",
            scale = 1.05, mouseX, mouseY, offsetX, offsetY, zoomPosX, zoomPosY, showedImg;

        var initZoomableEventHandlers = function (){

            prodWrap.addEventListener("mouseenter", function(e){
                
                for (let i = 0; i < zoomImg.length; i++){
                    zoomImg[i].classList.remove("show");
                }

                if (prodWrap.classList.contains("product-viewer-front")){
                    showedImg = prodZoom.querySelector(".zoom-img-front");
                    showedImg.classList.add("show");
                    prodZoom.classList.add("show");
                } else if (prodWrap.classList.contains("product-viewer-back")){
                    showedImg = prodZoom.querySelector(".zoom-img-back");
                    showedImg.classList.add("show");
                    prodZoom.classList.add("show");
                }
                
                mouseX = e.pageX - this.getBoundingClientRect().left;
                mouseY = e.pageY - this.getBoundingClientRect().top;

                offsetX = -1 * 1.95 * mouseX;
                offsetY = -1 * 1.7 * mouseY;

                zoomPosX = e.pageX - 270;
                zoomPosY = e.pageY - 260;

                prodZoom.setAttribute("style", "left:" + zoomPosX + "px; top: " + zoomPosY + "px;");

                styles = "transform: matrix(" + scale + ",0,0," + scale + "," + offsetX + "," + offsetY + "); transition: transform " + zoomSpeed + " " + zoomFunction;
                showedImg.setAttribute("style", styles);
                
                showedImg.addEventListener("transitionend", function(){
                    showedImg.classList.remove("z-entering");
                });
                
            });

            prodWrap.addEventListener("mousemove", function(e){

                if (!showedImg.classList.contains("z-entering") && !showedImg.classList.contains("z-exiting")) {
                    mouseX = e.pageX - this.getBoundingClientRect().left;
                    mouseY = e.pageY - this.getBoundingClientRect().top;

                    offsetX = -1 * 1.95 * mouseX;
                    offsetY = -1 * 1.7 * mouseY;

                    zoomPosX = e.pageX - 270;
                    zoomPosY = e.pageY - 260;

                    prodZoom.setAttribute("style", "left:" + zoomPosX + "px; top: " + zoomPosY + "px;");

                    styles = "transform: matrix(" + scale + ",0,0," + scale + "," + offsetX + "," + offsetY + "); transition: transform " + zoomSpeed + " " + zoomFunction;
                    showedImg.setAttribute("style", styles);
                }
            });

            prodWrap.addEventListener("mouseleave", function(e){
                
                setTimeout(function(){
                    prodZoom.classList.remove("show");
                }, 400);
                
                styles = "transform: matrix(1,0,0,1,0,0); transition: transform " + zoomSpeed + " " + zoomFunction;

                if (scale !== 1) showedImg.classList.add("z-exiting");
                
                showedImg.classList.add("z-exiting");
                setTimeout(function(){
                    showedImg.setAttribute("style", styles);
                }, 1000);
                

                showedImg.addEventListener("transitionend", function(){
                    showedImg.classList.remove("z-exiting");
                });
            });
        };

        initZoomableEventHandlers();
    }
    
}());