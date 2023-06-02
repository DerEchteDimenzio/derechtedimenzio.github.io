const hexagon1 = [
    [2.5, 4.5],
    [-2.5, 4.5],
    [-5, 0],
    [-2.5, -4.5],
    [2.5, -4.5],
    [5, 0]
]

const difficulties = [20, 15, 10, 8, 5, 3, 2];
const TIMER = 300;

let lastCords = {
    lat: undefined,
    lng: undefined
};

let searchedCoord = {
    lat: undefined,
    lng: undefined
};

let playing = false;

let map;
let polygonGroup;

function generateCode() {
    let lng = ((parseFloat(lastCords.lng) + 180).toFixed(2) * 100).toString(16).split('.')[0].padStart(4, '0');
    let lat = ((parseFloat(lastCords.lat) + 90).toFixed(2) * 100).toString(16).split('.')[0].padStart(4, '0');

    const rot1 = Math.floor(Math.random() * 9) + 1;
    const rot2 = Math.floor(Math.random() * 9) + 1;

    lat = rotate(lat, rot1);
    lng = rotate(lng, rot2);

    document.getElementById("inpCode").value = `${rot1}${rot2}${lat}${lng}`;
    navigator.clipboard.writeText(`${window.location.href.split("?")[0]}?code=${rot1}${rot2}${lat}${lng}`);
}

/**
 * 
 * @param {string} num 
 * @param {number} times 
 */
function rotate(num, times) {
    let i = 0;
    while (i < times) {
        const first = num.at(0);
        for (let i2 = 0; i2 < num.length - 1; i2++) {
            num = setCharAt(num, i2, num.charAt(i2 + 1));
        }
        num = setCharAt(num, num.length - 1, first);
        i++;
    }

    return num;
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

/**
 * 
 * @param {string} code 
 */
function decode(code) {
    const rot1 = Number(code.at(0));
    const rot2 = Number(code.at(1));

    let lat = parseInt(rotate(code.substring(2, 6), 4 - (rot1 % 4)), 16);
    let lng = parseInt(rotate(code.substring(6), 4 - (rot2 % 4)), 16);

    lat = (lat / 100).toFixed(2) - 90;
    lng = (lng / 100).toFixed(2) - 180.0;

    searchedCoord = {
        lat: lat,
        lng: lng
    };

    startGame();
}

function drawPolygon(difficulty) {
    let lat = searchedCoord.lat;
    let lng = searchedCoord.lng;

    lat += (Math.random() * difficulty);
    lng += (Math.random() * difficulty);

    let hex = hexagon1.map((latlng) => {
        let latScale = 2.5 * Math.pow(-0.98, Math.abs(lat.toFixed(0)));
        return [lat + ((((latlng[0]/2) * latScale)) * difficulty), lng + (latlng[1] * difficulty)];
    })

    polygonGroup.clearLayers();
    L.polygon(hex, {color: "red"}).addTo(polygonGroup);
}

function startGame() {
    let countdown = TIMER;
    let difficulty = 0;
    playing = true;
    setInterval(() => {
        countdown--;
        if (countdown === 0 && difficulty < difficulties.length) {
            countdown = TIMER;
            drawPolygon(difficulties[difficulty]);
            difficulty++;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    document.getElementById("btnCode").addEventListener("click", () => {
        if (lastCords.lat) {
            generateCode();
        }
    });
    document.getElementById("btnPlay").addEventListener("click", () => {
        const code = document.getElementById("inpCode").value;

        if (code.length === 10) {
            document.getElementById("btnPlay").disabled = true;
            document.getElementById("btnCode").disabled = true;

            decode(code);
        }
    });

    const urlsParams = new URLSearchParams(window.location.search);
    document.getElementById("inpCode").value = urlsParams.get("code");
})

function initMap() {
    // Initialize the map
    map = L.map('map').setView([0, 0], 1); // Adjust the coordinates and zoom level as needed
    let markersGroup = L.layerGroup();
    polygonGroup = L.layerGroup();
    map.addLayer(markersGroup);
    map.addLayer(polygonGroup);

    // Define the bounds of the image
    var bounds = [[0, 0], [8192, 8192]]; // Replace 'height' and 'width' with the dimensions of your map image

    var layer = L.tileLayer('./data/tiles/{z}/tile_{x}_{y}.png', {
        minZoom: 3,
        maxZoom: 5,
        maxBounds: bounds
    }).addTo(map);

    // Set the map view to fit the image bounds
    map.fitBounds(bounds);
    map.on("click", (event) => {
        if (!playing) {
            lastCords = {
                lat: event.latlng.lat.toFixed(2),
                lng: event.latlng.lng.toFixed(2)
            };
    
            markersGroup.clearLayers();
            L.marker(lastCords).addTo(markersGroup);
        }
    })
    map.setMaxBounds([[-512, -128], [512, 128]]);
}