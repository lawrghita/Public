function setCookie(cookieName, cookieValue, cookieDayAlive) {
    const location = "/";
    const sameSite = "strict"
    const today = new Date();
    var dayExpire = new Date();
    // console.log(today, dayExpire);
    millisecondsOnDay = 24 * 60 * 60 * 1000;
    millisecondsAlive = today.getTime() + cookieDayAlive * millisecondsOnDay;
    dayExpire.setTime(millisecondsAlive);
    // console.log(dayExpire);
    var timeStamp = dayExpire.toUTCString();
    var cookie = cookieName + "=" + cookieValue + "; " + "expires=" + timeStamp + "; path=" + location + "; SameSite=" + sameSite + ";";
    // console.log(cookie);
    document.cookie = cookie;
}

function valueCookie(cookieName) {
    const location = "/";
    var decodedCookie = decodeURIComponent(document.cookie);
    // console.log(decodedCookie);
    var position = decodedCookie.search(cookieName);
    decodedCookie = decodedCookie.substring(position, position + decodedCookie.length);
    var valueTMP = decodedCookie.substring(cookieName.length + 1);
    // console.log("TMP:",valueTMP);
    var value = "";
    i = 0;
    while (valueTMP[i] != "" && valueTMP[i] != ";" && i < valueTMP.length) {
        value += valueTMP[i];
        i = i + 1;
    }
    // console.log(decodedCookie," Check:",cookieName," Value:",value);
    return (value);
}


if (valueCookie("username") == "") setCookie("username", "Laur", 30);

ver = valueCookie("indexVersion");

if (ver == "") setCookie("indexVersion", ver, 30);
else {
    ver++;
    setCookie("indexVersion", ver, 30);
}
document.getElementById("ver").innerHTML = ver;


