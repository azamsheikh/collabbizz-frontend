window.addEventListener('DOMContentLoaded', (event) => {

    if (getCookie("collabbizz_user") == null || getCookie("collabbizz_password") == null || getCookie("collabbizz_accessToken") == null ||
        getCookie("collabbizz_userId") == null) {

        document.body.style.display = 'block';

    }
    else {

        checkAccesstoken(getCookie("collabbizz_userId"), getCookie("collabbizz_accessToken"));
    }




    var images = document.querySelectorAll('.slideshow img');
    var currentImage = 0;
    setInterval(function () {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }, 4000);
});



function loginHandlerfunction() {

    //loading animation starts
    var loadingCircle = document.getElementById('loading-circle');
    document.getElementById('loading-circle').style.display = "block";
    startAnimation(loadingCircle);


    //username password textbox empty
    if (document.getElementById("username").value.length <= 0 || document.getElementById("password").value.length <= 0) {

        document.getElementById("loginErrorString").innerHTML = "Username/Password cannot be empty";
        document.getElementById('loading-circle').style.display = "none";
    }

    else {

        document.getElementById("loginErrorString").innerHTML = "";

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        var rememberLogin = 0;

        if (document.getElementById('rememberMe').checked === true) {
            rememberLogin = 1;
        }
        else {
            rememberLogin = 0;
        }

        const url = getDevsettings("loginurl") + '?rememberMe=' + rememberLogin;


        GETrequest(url, username, password, function (httpObject) {

            var json = httpObject.httpText;
            if (httpObject.httpCode === 200) {
                if (document.getElementById('rememberMe').checked === true) {

                    //Set Cookies
                    setCookie("collabbizz_rememberMe", '1', 3000, 'Strict');
                    const Jsondata = JSON.parse(httpObject.httpText);
                    setCookie("collabbizz_accessToken", Jsondata.token, 3000);
                    setCookie("collabbizz_userId", Jsondata.userId, 3000, 'Strict');
                    setCookie("collabizz_lasttimetrackedactivity", getUTCTime(), 3000, 'Strict')

                    document.getElementById('loading-circle').style.display = "none";
                    window.location.href = 'index.html';
                }

                else {
                    //Set Cookies
                    setCookie("collabbizz_rememberMe", '0', 1, 'Strict');
                    const Jsondata = JSON.parse(json);
                    setCookie("collabbizz_accessToken", Jsondata.token, 1, 'Strict');
                    setCookie("collabbizz_userId", Jsondata.userId, 1, 'Strict');
                    setCookie("collabizz_lasttimetrackedactivity", getUTCTime(), 1, 'Strict')
                    document.getElementById('loading-circle').style.display = "none";
                    window.location.href = 'index.html';
                }


            }
            else {
                document.getElementById("loginErrorString").innerHTML = "Username/Password Invalid";
                document.getElementById('loading-circle').style.display = "none";
                throw new Error('Authentication failed');
            }

        });

    }
}

function GETrequest(url, username, password, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
    xhr.setRequestHeader('Origin', 'http://127.0.0.1:5500');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var httpResponseObject = {
                    httpCode: xhr.status,
                    httpText: xhr.responseText
                };
                callback(httpResponseObject);


            } else {
                // Authentication failed, handle the error
                document.getElementById("loginErrorString").innerHTML = "Username/Password Invalid";
                document.getElementById('loading-circle').style.display = "none";
                throw new Error('Authentication failed');
            }

        }
    };

    // Send the request
    xhr.send();
}





// Set a cookie with SameSite attribute
function setCookie(name, value, hours, sameSite) {

    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    cookieString += '; expires=' + date.toUTCString();

    if (sameSite) {
        //cookieString += '; SameSite=' + sameSite;
    }

    document.cookie = cookieString;
}


function startAnimation(element) {
    element.style.animationPlayState = 'running';
}




function checkAccesstoken($userId, $token) {
    fetch('assets/php/authenticateBearerToken.php?userId=' + $userId + '&token=' + $token)

        .then(response => {
            if (response.ok) {
                return response.text();
            }
        })
        .then(data => {

            if (data == "true") {
                window.location.href = 'index.html';
            }
            else {
                document.body.style.display = 'block';
            }
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