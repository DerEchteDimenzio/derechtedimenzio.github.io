let achievements;

$(function() {
    $.get("./eu4.json", function(data) {
        achievements = data.game.availableGameStats.achievements;
    });
    $("#randomButton").click(function() {
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