function getSettings(requestValue) {

    var returningValue = "";

    switch (requestValue) {

        case 'origin':
            origin = 'http://localhost';
            break;

        case 'getposturl':
            returningValue = 'http://localhost:3000/postAPI/getPosts.php';
            break;

        case 'loginurl':
            returningValue = 'https://api-dev-collabbizz.ktmdynamics.com/postAPI/login.php';
            break;
        default:
            returningValue = '';
    }

    return returningValue;

}