
const space = String.fromCharCode(0x2001);
const nonTrim = String.fromCharCode(0x2800);
let calcDiv;

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("sendButton").addEventListener("click", sendClick);
    document.getElementById("copyBtn").addEventListener("click", copy);
    calcDiv = document.getElementById("temp");
});

function sendClick(event) {
    let lines = document.getElementById("textArea").value.split('\n');
    let returnString = space + String.fromCharCode(0x2800) + "<br>";
    lines.forEach(element => {
        calcDiv.innerHTML = element;
        let width = calcDiv.offsetWidth;
        let spaces = (123-(width/2))/15;
        calcDiv.innerHTML = "";
        returnString +=  "<div class='wrapper'>" + printSpace(spaces) + "<span class='textEl'>" + element + "</span>" + "</div><br>";
    });
    returnString += nonTrim + "</div>";
    document.getElementById("resultBox").innerHTML = returnString;
    document.getElementById("buffer").value = document.getElementById("resultBox").innerText;
}

function copy(event) {

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