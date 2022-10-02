module.exports = {
    "globDirectory": "build/",
    "globPatterns": [
        "**/*.{js,css}",
        "404.html",
        "offline.html",
        "manifest.json",
        "fonts/open-sans-v17-latin-regular.ttf",
        "icons/*.svg",
        "images/*.{svg,png}",
        "images/icons/*.png"
    ],
    "swSrc": "src/sw.js",
    "swDest": "build\\sw.js",
    "globIgnores": ["../workbox-config.js"]
};