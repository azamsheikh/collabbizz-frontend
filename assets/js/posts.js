
var getPostcount = 3;

function getIndexPagePosts() {

    var div = document.getElementById('centered-loading-div');
    div.style.display = 'inline';
    getindexpostsprocess(getPostcount);

}



function getindexpostsprocess(postGetNumber) {

    const url = getDevsettings('getPostsurl');
    const token = getCookie("collabbizz_accessToken");
    const origin = getDevsettings('origin');

    const jsonBody = {
        userId: getCookie("collabbizz_userId"),
        localTimezone: getDevsettings('getLocaltimeZone'),
        postGetNumber: postGetNumber
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
            document.getElementById("IndexPagePosts").innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });


}


