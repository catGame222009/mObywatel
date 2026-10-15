let webManifest = {
    "name": "",
    "short_name": "",
    "theme_color": "#101317",
    "background_color": "#101317",
    "display": "standalone"
};

let manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.prepend(manifestElem);