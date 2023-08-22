setInterval(getnewPosts, 900000); //running every 15 minutes

var storedpostIdsArray = "";

function getnewPosts() {

    const url = getDevsettings('getnewpostsurl');
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
            if (response.ok) {
                return response.text();

            } else {

            }

        })
        .then(data => {

            if (storedpostIdsArray == "") {
                storedpostIdsArray = data;
            }
            else {
                const jsonReceivedPostsIdArray = JSON.parse(data);
                const jsonstoredPostsIdArray = JSON.parse(storedpostIdsArray);
                getNewPostHTML(jsonReceivedPostsIdArray, jsonstoredPostsIdArray);

                /*
                if (jsonReceivedPostsIdArray.length > jsonstoredPostsIdArray.length) {  //new post
                    getNewPostHTML(jsonReceivedPostsIdArray, jsonstoredPostsIdArray);
                    storedpostIdsArray = data;
                }
                else if (jsonReceivedPostsIdArray.length < jsonstoredPostsIdArray.length) {  //post deleted
                    storedpostIdsArray = data;
                }
                else {

                }
*/
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}








function getNewPostHTML($jsonReceivedPostsIdArray, $jsonstoredPostsIdArray) {

    $jsonReceivedPostsIdArray.forEach(item => {

        const exists = $jsonstoredPostsIdArray.some(obj => obj.postId === item.postId);



        if (!exists) {

            const url = getDevsettings('getsinglePostwithpostIdURL') + "?postId=" + item.postId;

            const token = getCookie("collabbizz_accessToken");
            const origin = getDevsettings('origin');

            const jsonBody = {
                userId: getCookie("collabbizz_userId"),
                localTimezone: getDevsettings('getLocaltimeZone')
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
                    if (response.ok) {
                        return response.text();

                    } else {

                    }

                })
                .then(data => {
                    document.getElementById("IndexPagePosts").innerHTML = data + document.getElementById("IndexPagePosts").innerHTML;
                    $jsonstoredPostsIdArray = data;
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
        else {
        }


    });


}





