document.addEventListener('click', function (event) {
    var now = new Date();
    var year = now.getUTCFullYear();
    var month = padZero(now.getUTCMonth() + 1);
    var day = padZero(now.getUTCDate());
    var hours = padZero(now.getUTCHours());
    var minutes = padZero(now.getUTCMinutes());
    var seconds = padZero(now.getUTCSeconds());
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setCookie("collabizz_lasttimetrackedactivity", formattedDateTime, 1, 'Strict')
    /* getOffsetPostsWithpostCount();
      getnewPosts();*/

});


function padZero(number) {
    return number.toString().padStart(2, '0');
}


function setCookie(name, value, hours, sameSite) {

    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    cookieString += '; expires=' + date.toUTCString();
    if (sameSite) {
        cookieString += '; SameSite=' + sameSite;
    }

    document.cookie = cookieString;
}
