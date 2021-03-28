
const space = "⠀";

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("sendButton").addEventListener("click", sendClick);
    document.getElementById("copyBtn").addEventListener("click", copy);
});

function sendClick(event) {
    let hashtags = document.getElementById("hashtagField").value.split(",");
    let lines = document.getElementById("textArea").value.split('\n');
    let returnString = space + "\n";
    lines.forEach(element => {
        returnString += printSpace(5 + (15-Math.ceil(element.length/2))) + element + "\n\n";
    });
    returnString += printSpace(5 + (15-Math.ceil(getHashtagLength(hashtags)/1.5)));
    hashtags.forEach(hashtag => {
        returnString += printHashtag(hashtag) + " ";
    });
    returnString += "\n" + space;
    document.getElementById("resultBox").value = returnString;
}

function copy(event) {
    let textArea = document.getElementById("resultBox");
    textArea.select();
    window.getSelection().removeAllRanges();
    alert("copied");
} 

function printSpace(amount) {
    let string = "";
    for(let i = 0; i < amount; i++) {
        string += space;
    }
    return string;
}

function printHashtag(input) {
    input = input.trim();
    if(!input.startsWith("#")) {
        input = "#" + input;
    }
    return input;
}

function getHashtagLength(hashtags) {
    let strings = "";
    hashtags.forEach(item => {
        strings += printHashtag(item) + " ";
    });
    strings = strings.trim();
    return strings.length;
}