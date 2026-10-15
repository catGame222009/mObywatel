let webManifest = {
    "name": "",
    "short_name": "",
    "theme_color": "#f5f6fb",
    "background_color": "#f5f6fb",
    "display": "standalone"
};

let manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.prepend(manifestElem);