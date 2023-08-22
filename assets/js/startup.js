window.onload = function () {

    if (getCookie("collabbizz_accessToken") == null ||
        getCookie("collabbizz_userId") == null ||
        getCookie("collabbizz_rememberMe") == null ||
        getCookie("collabizz_lasttimetrackedactivity") == null) {

        window.location.href = "login.html";
    }
    else {


        checkAccesstoken();

        getIndexPagePosts();

        getIndexPageBaps();

    }


};

function checkAccesstoken() {

    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const jsonBody = {
        userId: getCookie("collabbizz_userId")
    };

    fetch(getDevsettings('authenticateBearerTokenurl'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: JSON.stringify(jsonBody)
    })
        .then(response => {
            response.json()
                .then(data => {

                    if (data.status === "true") {
                        document.body.style.display = 'block';

                    }
                    else {

                        showSessionexpiredBox();
                    }

                })
                .catch(error => {
                    console.error('Error parsing response body:', error);
                });
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}





function checkcookiesSessionsTimer() {


    if (getCookie("collabbizz_accessToken") == null ||
        getCookie("collabbizz_userId") == null) {
        showSessionexpiredBox();
    }

    else {

        //one hour activity check
        var date1 = new Date(getCookie("collabizz_lasttimetrackedactivity"));
        var date2 = new Date(getUTCTime());
        var intervalInMilliseconds = date2.getTime() - date1.getTime();
        var inactivityTimeinMinutes = Math.floor(intervalInMilliseconds / (1000 * 60));

        //activity -> refresh token
        if (inactivityTimeinMinutes >= getDevsettings('inactivityLimitinminutes')) {

            // refresh cookies
            if (getCookie("collabbizz_rememberMe") == "1") {

            }

            else {
                //session expired of inactivity
                const sessionExpiredMainText = document.querySelector('sessionExpiredMainText');
                sessionExpiredMainText.innerText = 'Session expired of Inactivity';

                showSessionexpiredBox();
            }
        }
        else  //there is activity in last given interval
        {
            refreshBearerToken();
        }

    }

    if (checkAccesstoken() == "false") {
        showSessionexpiredBox();
    }


}

//timer time setup
setInterval(checkcookiesSessionsTimer, 1800000); //running every 30 minutes


function refreshBearerToken() {

    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const jsonBody = {
        userId: getCookie("collabbizz_userId")
    };

    fetch(getDevsettings('authenticateBearerTokenurl'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: JSON.stringify(jsonBody)
    })
        .then(response => {
            response.json()
                .then(data => {

                    if (data.status === "true") {

                        setCookie("collabbizz_rememberMe", getCookie("collabbizz_rememberMe"), 1, 'Strict');
                        setCookie("collabbizz_accessToken", getCookie("collabbizz_accessToken"), 1, 'Strict');
                        setCookie("collabbizz_userId", getCookie("collabbizz_userId"), 1, 'Strict');
                        setCookie("collabizz_lasttimetrackedactivity", getCookie("collabizz_lasttimetrackedactivity"), 1, 'Strict')

                    }
                    else {

                        showSessionexpiredBox();
                    }
                    stopanimation();
                })
                .catch(error => {
                    console.error('Error parsing response body:', error);
                });
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });





}





function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split("=");
        const name = parts[0];
        const value = decodeURIComponent(parts[1]);

        if (name === cookieName) {
            return value;
        }
    }

    return null;
}



function showSessionexpiredBox() {


    document.body.style.display = 'block';
    document.getElementById("sessionexpiredbox").style.display = "block";

    var switchableContent = document.querySelector('switchableContent');
    switchableContent.style.display = 'none';

    const url = getDevsettings('logouturl');
    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const data = {
        userId: getCookie("collabbizz_userId")
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            stopanimation();
            if (response.status == 200) {
                deleteCookie("collabbizz_accessToken");
                deleteCookie("collabbizz_userId");
                deleteCookie("collabizz_lasttimetrackedactivity");
                deleteCookie("collabbizz_rememberMe");
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}


function padZero(number) {
    return number.toString().padStart(2, '0');
}


function getUTCTime() {
    var now = new Date();
    var year = now.getUTCFullYear();
    var month = padZero(now.getUTCMonth() + 1);
    var day = padZero(now.getUTCDate());
    var hours = padZero(now.getUTCHours());
    var minutes = padZero(now.getUTCMinutes());
    var seconds = padZero(now.getUTCSeconds());
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}


function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



