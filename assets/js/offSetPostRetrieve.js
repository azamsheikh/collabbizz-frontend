
//getPostcount
//storedpostIdsArray

function getOffsetPostsWithpostCount() {

    document.getElementById("offSetPosts-loading-div").style.display = "inline";
    getPostcount = getPostcount + 5;

    const url = getDevsettings('getOffsetpostsURL');
    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const jsonBody = {
        userId: getCookie("collabbizz_userId"),
        localTimezone: getDevsettings('getLocaltimeZone'),
        postGetNumber: getPostcount,
        storedPostidArray: storedpostIdsArray
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
            document.getElementById("offSetPosts-loading-div").style.display = "none";
            if (data.length > 0) {
                document.getElementById("IndexPagePosts").innerHTML = data;
            }

        })
        .catch(error => {
            console.error(error);
        });


}