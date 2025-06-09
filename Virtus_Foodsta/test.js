// script.js

window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercentage = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = scrollPercentage + "%";
}
