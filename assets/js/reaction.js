function InterestedFunction(postId) {

    const image = document.getElementById(postId + 'InterestedBtnImg');
    var alt = image.alt;
    if (alt == "interest") {
        image.src = "assets/img/icons/interested.png";
        image.alt = "interested";
        document.getElementById("4567reactTextLike").style.color = "#4926f6";
        document.getElementById("4567reactTextLike").style.fontWeight = "500";
    }
    else {
        image.src = "assets/img/icons/Interest.png"
        image.alt = "interest";
        document.getElementById("4567reactTextLike").style.color = "black";
    }


}

function SharedFunction(postId) {

    alert("lol");


}