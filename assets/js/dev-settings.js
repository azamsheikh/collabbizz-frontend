function getDevsettings(requestValue) {

    var returningValue = "";
    var baseURL = "http://localhost:3000/";        //https://api-dev-collabbizz.ktmdynamics.com/   //http://localhost:3000/

    var dtf = new Intl.DateTimeFormat();

    var timeZone = dtf.resolvedOptions().timeZone;


    switch (requestValue) {

        case 'origin':
            origin = 'http://localhost:5500';      //https://dev.collabbizz.com   //http://localhost:5500
            break;
        case 'getposturl':
            returningValue = baseURL + 'postAPI/getPosts.php';
            break;
        case 'loginurl':
            returningValue = baseURL + 'authentication/login.php';
            break;
        case 'authenticateBearerTokenurl':
            returningValue = baseURL + 'authentication/authenticateBearerToken.php';
            break;
        case 'refreshBearerTokenurl':
            returningValue = baseURL + 'authentication/refreshBearerToken.php';
            break;
        case 'logouturl':
            returningValue = baseURL + 'authentication/logout.php';
            break;
        case 'inactivityLimitinminutes':
            returningValue = 60;
            break;
        case 'getPostsurl':
            returningValue = baseURL + 'postAPI/getPosts.php';
            break;
        case 'getnewpostsurl':
            returningValue = baseURL + 'postAPI/getNewpost.php';
            break;
        case 'getLocaltimeZone':
            returningValue = timeZone;
            break;
        case 'getsinglePostwithpostIdURL':
            returningValue = baseURL + 'postAPI/getsinglePostwithpostId.php';
            break;
        case 'getOffsetpostsURL':
            returningValue = baseURL + 'postAPI/getOffsetposts.php';
            break;
        case 'getBapsURL':
            returningValue = baseURL + 'BAP/getBaplist.php';
            break;
        default:
            returningValue = '';
    }

    return returningValue;

}

