document.addEventListener("DOMContentLoaded", function(event)  {
    document.getElementById("inputButton").addEventListener("click", inputName);
})

function inputName() {
    let input = prompt("Enter the name of the account you search!");
    let img = document.createElement("img");
    img.src = "https://unavatar.now.sh/twitter/" + input;
    let div = document.getElementById("imgDiv");
    div.appendChild(img);
}