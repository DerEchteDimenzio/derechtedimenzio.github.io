
let client;
let nick;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("TestButton").addEventListener("click", sendMessage);
    client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000), uuidv4());
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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }