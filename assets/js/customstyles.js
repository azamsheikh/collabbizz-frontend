
function leftSliderOpen() {
    document.getElementById("leftSidebarId").style.width = "70%";
    document.getElementById("leftsidebarclosebuttonareaID").style.visibility = "visible";
    document.getElementById("leftsliderRightbutton").style.visibility = "hidden";
    document.getElementById("servicesleftpanelbottomId").style.visibility = "visible";



}
function leftSliderClose() {
    document.getElementById("leftSidebarId").style.width = "0%";
    document.getElementById("leftsidebarclosebuttonareaID").style.visibility = "hidden";
    document.getElementById("leftsliderRightbutton").style.visibility = "visible";
    document.getElementById("servicesleftpanelbottomId").style.visibility = "hidden";

}


function rightSliderOpen() {
    console.log(document.getElementById("rightSidebarId"));
    document.getElementById("rightSidebarId").style.width = "70%";
    document.getElementById("rightsliderLeftbutton").style.visibility = "hidden";

}

function rightSliderClose() {
    document.getElementById("rightSidebarId").style.width = "0%";
    document.getElementById("rightsliderLeftbutton").style.visibility = "visible";


}


function userLogoutBubbleOpenClose() {

    document.getElementById("userHeadermessagesSection").style.display = "none"
    document.getElementById("headerMessageButton").style.border = "0px solid white";
    document.getElementById("userHeadernotificationSection").style.display = "none";

    if (document.getElementById("userHeaderlogoutSectionId").style.display == "block") {
        document.getElementById("userHeaderlogoutSectionId").style.display = "none";
        document.getElementById("userpostimage").style.border = "0px solid white";
    }
    else {
        document.getElementById("userHeaderlogoutSectionId").style.display = "block";
        document.getElementById("userpostimage").style.border = "5px solid white";
    }

}


function notificationBubbleOpenClose() {

    document.getElementById("userHeadermessagesSection").style.display = "none"
    document.getElementById("headerMessageButton").style.border = "0px solid white";
    document.getElementById("userHeaderlogoutSectionId").style.display = "none";
    document.getElementById("userpostimage").style.border = "0px solid white";

    if (document.getElementById("userHeadernotificationSection").style.display == "block") {
        document.getElementById("userHeadernotificationSection").style.display = "none";

    }
    else {
        document.getElementById("userHeadernotificationSection").style.display = "block";


    }


}


function messageBubbleOpenClose() {

    document.getElementById("userHeadernotificationSection").style.display = "none"
    document.getElementById("userHeaderlogoutSectionId").style.display = "none";
    document.getElementById("userpostimage").style.border = "0px solid white";

    if (document.getElementById("userHeadermessagesSection").style.display == "block") {
        document.getElementById("userHeadermessagesSection").style.display = "none";
        document.getElementById("headerMessageButton").style.border = "0px solid white";

    }
    else {
        document.getElementById("userHeadermessagesSection").style.display = "block";
        document.getElementById("headerMessageButton").style.borderRadius = "25px";;
        document.getElementById("headerMessageButton").style.border = "7px solid white";


    }
}










