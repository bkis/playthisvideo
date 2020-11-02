function get(selector){ return document.querySelector(selector) }
function create(tag){ return document.createElement(tag) }
function hide(selector){ document.querySelector(selector).style.display = "none" }
function show(selector){ document.querySelector(selector).style.display = "initial" }

function isValidVideoURL(url){
    return validate({ website: url }, { website: {url: true} }) == undefined
        && url.length > 5
        && (/.*\.\w{3,5}$/.test(url));
}

window.addEventListener("load", function(e) {
    // extract video url from window location
    let url = decodeURIComponent(location.hash.replace(/^\#/,""));

    if (!isValidVideoURL(url)){
        hide("#video");
        hide("#video-url");
        // set error link href
        get("#video-error-link").setAttribute("href", url);
        return;
    }

    // hide error
    hide("#video-error");
    // display video url
    get("#video-url").innerHTML = url;

    // load video url
    let videoElm = get("#video");
    let videoSrcElm = create("SOURCE");
    videoSrcElm.setAttribute("src", url);
    //videoSrcElm.setAttribute("type", "video/mp4");
    videoElm.appendChild(videoSrcElm);
    videoElm.load();

    // initialize player
    const player = new Plyr('video', {captions: {active: false}});

    // react to player errors
    player.on("error", function(e) {
        console.error("ERROR :(", e);
        show("#video-error");
        hide("#video");
    });
});


