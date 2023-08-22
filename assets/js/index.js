
window.addEventListener('scroll', function () {
    var distanceToBottom = document.documentElement.offsetHeight - (window.innerHeight + window.pageYOffset);


    if (distanceToBottom < 1) {
        // alert(storedpostIdsArray);
        // getOffsetPostsWithpostCount();
    }
});




function startanimation() {
    var div = document.getElementById('centered-loading-div');
    div.style.display = 'inline';
    // document.querySelector('html').style.pointerEvents = 'none';
}


function stopanimation() {
    var div = document.getElementById('centered-loading-div');
    div.style.display = 'none';
    // document.querySelector('html').style.pointerEvents = 'auto';
}

function logoutInit() {
    startanimation();
    logoutFunction();
}

function logoutFunction() {


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
                window.location.href = "login.html";
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}



function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}






function startAnimation(element) {
    element.style.animationPlayState = 'running';
}



function sessionExpiredLoginButton() {
    startanimation();

    window.location.href = 'login.html';

    stopanimation();

}





function getIndexPageBaps() {

    const url = getDevsettings('getBapsURL');
    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const jsonBody = {
        userId: getCookie("collabbizz_userId")
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: JSON.stringify(jsonBody)
    })
        .then(response => {
            stopanimation();
            if (response.ok) {
                return response.text(); // Receive response data in text form
            } else {
                stopanimation();
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            stopanimation();
            document.getElementById("BAPPage").innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });

}


function openMessagesSection() {
    document.getElementById("messageSidebarId").style.width = "30%";
    document.getElementById("userHeadermessagesSection").style.display = "none";
}

function messageSliderClose() {
    document.getElementById("messageSidebarId").style.width = "0%";
}












