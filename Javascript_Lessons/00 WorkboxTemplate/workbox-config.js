module.exports = {
    "globDirectory": "build/",
    "globPatterns": [
        "**/*.{html,js,css}",
        "manifest.json",
        "images/icons/*.png"
    ],
    "swSrc": "src/sw.js",
    "swDest": "build\\sw.js",
    "globIgnores": ["../workbox-config.js"]
};