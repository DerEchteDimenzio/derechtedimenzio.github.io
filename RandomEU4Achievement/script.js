let allAchievements;
let achievements;
let difficulties = [];

$(function() {
    $.get("./eu4new.json", function(data) {
        allAchievements = data.game.availableGameStats.achievements;
    });
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
            achievements = allAchievements;
        } else {
            allAchievements.forEach(item => {
               if(difficulties.includes(item.difficulty)) {
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