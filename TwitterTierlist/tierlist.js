
let currentId = "";

document.addEventListener("DOMContentLoaded", function(event)  {
    document.getElementById("inputButton").addEventListener("click", inputName);
    const rows = document.querySelectorAll(".row");

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        event.preventDefault();
        let img = document.getElementById(currentId);
        event.target.appendChild(img);
    }

    rows.forEach((row) => {
        row.ondragover = onDragOver;
        row.ondrop = onDrop;
    });
})

const onDragStart = (event) => {
    currentId = event.target.id;
    setTimeout(() => {
        event.target.style.visibility = "hidden";
    }, 50)
}

const onDragEnd = (event) => {
    let id = currentId;
    event.target.style.visibility = "visible";
}

function inputName() {
    let input = prompt("Enter the name of the account you search!");
    let img = document.createElement("img");
    img.src = "https://unavatar.now.sh/twitter/" + input;
    img.className = "rowImage";
    img.id = create_UUID();
    img.draggable = true;
    img.ondragstart = onDragStart;
    img.ondragend = onDragEnd;
    let div = document.getElementById("row1");
    div.appendChild(img);
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}