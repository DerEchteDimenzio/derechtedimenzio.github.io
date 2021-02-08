
let client;
let nick;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("TestButton").addEventListener("click", sendMessage);
    client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "ChatClient1234");
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess: onConnect});
});

function onConnect() {
    console.log("Client connected");
    client.subscribe("Funstuff/Cheesechat");
}

function sendMessage(event) {
    let message = document.getElementById("textInput").value;
    let obj = {
        type: "Message",
        nickname: document.getElementById("nickInput").value,
        message: message
    };
    let payload = new Paho.MQTT.Message(JSON.stringify(obj));
    payload.destinationName = "Funstuff/Cheesechat";
    client.send(payload);
}

function onMessageArrived(message) {
    let payload = JSON.parse(message.payloadString);
    document.getElementById("messagebox").innerHTML += `<b>${payload.nickname}</b>: ${payload.message}<br>`;
}