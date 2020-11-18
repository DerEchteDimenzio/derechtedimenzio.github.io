let allAchievements;
let achievements;
let difficulties = [];
let overlayOn = false;
let table;

$(function() {
    $.get("./eu4new.json", function(data) {
        allAchievements = data.game.availableGameStats.achievements;
        allAchievements.forEach(item => {
            item.isIn = true;
        });
        let count = 0;
        table = `<button id=closeOverlay>Close</button><table id="tableA"> <tr>`;
            allAchievements.forEach((item, index) => {
                count++;
                table += `<td class="achievementRow"><img class="aIcon" src="${item.icon}" data-index="${index}" data-isChecked=0> <label>${item.displayName}</label></td>`;
                if(count == 5) {
                    count = 0;
                    table += '</tr><tr>';
                }
        });
        table += "</table>";
        document.getElementById("overlay").innerHTML += table;
        let icons = document.getElementsByClassName("aIcon");
        for(let i = 0; i < icons.length; i++) {
            icons[i].addEventListener("click", toggleIcon);
        }

        $("#closeOverlay").click(function() {
            document.getElementById("overlay").style.display = "none";
        });
    });
    
    
    $("#achievementPicker").click(function() {
        document.getElementById("overlay").style.display = "block";
    })
    $("#randomButton").click(function() {
        let checkCounter = 0;
        achievements = [];
        difficulties = [];
        if(document.getElementById("VeryEasy").checked) {
            checkCounter++;
            difficulties = difficulties.concat("VE");
        }
        if(document.getElementById("Easy").checked) {
            checkCounter++;
            difficulties = difficulties.concat("E");
        }
        if(document.getElementById("Medium").checked) {
            checkCounter++;
            difficulties = difficulties.concat("M");
        }
        if(document.getElementById("Hard").checked) {
            checkCounter++;
            difficulties = difficulties.concat("H");
        }
        if(document.getElementById("VeryHard").checked) {
            checkCounter++;
            difficulties = difficulties.concat("VH");
        }
        if(document.getElementById("Insane").checked) {
            checkCounter++;
            difficulties = difficulties.concat("I");
        }

        if(checkCounter === 0) {
            allAchievements.forEach(item => {
                if(item.isIn) {
                    achievements = achievements.concat(item);
                }
            });
        } else {
            allAchievements.forEach(item => {
               if(difficulties.includes(item.difficulty) && item.isIn) {
                   achievements = achievements.concat(item);
               }
            });
        }
        let item = achievements[Math.floor(Math.random() * achievements.length)];
        $("#cont").html(`<table id="achievement">
                            <tr>
                                <td>Icon</td>
                                <td>Name</td>
                                <td>Description</td>
                            </tr>
                            <tr>
                                <td><img src="${item.icon}"></td>
                                <td>${item.displayName}</td>
                                <td>${item.description}</td>
                            </tr>
                        </table>`);
    });
});

function toggleIcon(event) {
    if(event.target.getAttribute("data-isChecked") === "0") {
        event.target.src = allAchievements[parseInt(event.target.getAttribute("data-index"))].icongray;
        event.target.setAttribute("data-isChecked", "1");
        allAchievements[parseInt(event.target.getAttribute("data-index"))].isIn = false;
    } else {
        event.target.src = allAchievements[parseInt(event.target.getAttribute("data-index"))].icon;
        event.target.setAttribute("data-isChecked", "0");
        allAchievements[parseInt(event.target.getAttribute("data-index"))].isIn = true;
    }
}