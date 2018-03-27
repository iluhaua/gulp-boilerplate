// TODO: create object and pass parameters 

// VIDEO
let video = document.querySelector(".mission-video video");
let timer = null;

let touch = document.querySelector("html").classList.contains("touchevents");
let videoWrap  = document.querySelector(".video-calibrate");
let videoPlay  = document.querySelector(".mission-video-play");
let videoCloseBtn = document.querySelector(".mission-video-close");
let siteHeader = document.getElementById("header");

// var supportsVideo = !!document.createElement('video').canPlayType;
// if (supportsVideo) {
    
// }
if (video) {
    video.controls = false;
    video.addEventListener('canplay', function() {
        console.log("Video state: " + video.readyState);
        
        if(video.readyState >= 3) {
            videoPlay.querySelector(".preview-image").style.opacity = "0";
        }
    }, false);

    videoWrap.addEventListener("click", function() {
        if (!videoWrap.classList.contains("open")){
            timer = setTimeout(videoOpen, 600);
        }
    });

    videoWrap.addEventListener("mouseleave", function(){
        clearTimeout(timer);
        //setTimeout(videoClose, 200);
    });

    videoCloseBtn.addEventListener("click", function(){
        setTimeout(videoClose, 200);
    });

    window.addEventListener('blur', function() {
        videoClose();
    });
}


function playVideoFromStart(videoElem, soundMuted) {
    videoElem.currentTime = 0;
    videoElem.muted = soundMuted;
    videoElem.play();
}

function hideSiteHeader() {
    siteHeader.style.opacity = "0";
}

function showSiteHeader() {
    siteHeader.style.opacity = "1";
}

function showSiteControls(callback) {
    if (videoCloseBtn.style.opacity != "1") {
        videoCloseBtn.style.opacity = "1";
    }
    
    // hide menu
    if (callback) {
        callback();
    }
}

function hideSiteControls() {
    videoCloseBtn.style.opacity = "0";

}

function handleVideoTouch(event){
    showSiteControls(function(){
        setTimeout(hideSiteControls, 1500);
    });
}

function videoOpen(){
    console.log("video Open");
    hideSiteHeader();
    //setCirclePos("2000px");
    //video.play();
    playVideoFromStart(video, false);
    
    videoWrap.classList.add("open");
    
    videoWrap.addEventListener("mousemove", handleVideoTouch, false);
    videoWrap.addEventListener("touchstart", handleVideoTouch, false);
}

function videoClose(){
    console.log("video Close");
    video.muted = true;
    showSiteHeader();
    //setCirclePos(radius);
    videoWrap.classList.remove("open");
    setTimeout(function(){ video.pause() }, 500);
    
    videoWrap.removeEventListener("mousemove", handleVideoTouch, false);
    videoWrap.removeEventListener("touchstart", handleVideoTouch, false);
}