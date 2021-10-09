document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btSend").addEventListener("click", sendButton);
    let key = localStorage.getItem("apiKey");
    if(key) {
        document.getElementById("apiKey").value = key;
    }
    new ClipboardJS(".copyBtn");
});

let tweet = ` ⠀
  🎨 - Art by :name:

 :url:

⠀`;

function sendButton() {
    let url = document.getElementById("imgUrl").value;
    let key = document.getElementById("apiKey").value;

    if(url != "" && key != "") {
        let doc = document.getElementById("cardCont");
        while(doc.firstChild) {
            doc.firstChild.remove();
        }
        makeRequest(key, url, 10).then((res) => {
            res.json().then(data => {
                console.log(data)
                let content = JSON.parse(data.contents);
                if(content.header.status === -1 || content.header.status === -3) {
                    let toast = Toastify({
                        text:"Invalid SauceNAO Api key or invalid picture link",
                        duration: 5000
                    });
                
                    toast.showToast();
                
                    return;
                }
                let response = content.results;
                localStorage.setItem("apiKey", key);
                response = response.filter(r => r.data.ext_urls);
                response = response.sort((a, b) => b.header.similarity - a.header.similarity);
                response = response.splice(0, 3);
                console.log(response);
                response.forEach(r => {
                    buildCard(r);
                });
            });
        });
    }
}

function makeRequest(apiKey, imgUrl, resNum) {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://saucenao.com/search.php?" + new URLSearchParams({
        api_key: apiKey,
        db: 999,
        output_type: 2,
        numres: resNum,
        url: imgUrl
    }).toString())}`, {
        mode: "cors",
        method: "GET"
    });
}

function buildCard(result) {

    let artist = result.data.member_name || result.data.creator;
    let link = result.data.ext_urls[0];

    let cardRoot = document.createElement("div");
    cardRoot.classList.add("sourceCard");
    let cardLeft = document.createElement("div");
    cardLeft.classList.add("cardLeft");
    let cardRight = document.createElement("div");
    cardRight.classList.add("cardRight");
    let img = document.createElement("img");
    img.src = result.header.thumbnail;
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(result.header.index_name));
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(`Artist: ${artist}`));
    let a = document.createElement("a");
    a.href = link;
    a.text = "Link to Source";
    let btn = document.createElement("button");
    btn.textContent = "Copy Tweet text to clipboard";
    btn.classList.add("copyBtn");

    btn.addEventListener("click", () => {
        let temp = tweet.replace(":name:", artist);
        let res = temp.replace(":url:", link);

        document.getElementById("buffer").value = res;
    });

    btn.setAttribute("data-clipboard-target", "#buffer");

    cardLeft.appendChild(img);
    cardRight.appendChild(h3);
    cardRight.appendChild(p);
    cardRight.appendChild(a);
    cardRight.appendChild(btn);

    cardRoot.appendChild(cardLeft);
    cardRoot.appendChild(cardRight);

    document.getElementById("cardCont").appendChild(cardRoot);
}