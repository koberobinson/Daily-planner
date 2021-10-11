var times = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4", "#5"];
var timeSlots = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];
var shiftedTimeSlots = ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00"];


var plannerContent = [];
var getLocalStorageData = JSON.parse(localStorage.getItem("planner-items"));

if (getLocalStorageData !== null) {
    plannerContent = getLocalStorageData;
}

for (var i = 0; i < times.length; i++) {
    var descriptionEl = $(times[i]);
    var buttonEl = descriptionEl.parent().parent().find("button");

    if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') + ", " + timeSlots[i])) {
        descriptionEl.attr("class", "future");
        plannerContent.forEach(function (item) {
            if (times[i] === ("#" + (item["input-id"]))) {
                descriptionEl.val(item["input-value"]);
            }
        });
    }

    else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') + ", " + timeSlots[i])) &&
        ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') + ", " + shiftedTimeSlots[i]))) {
        descriptionEl.attr("class", "present");
        $(".present").attr("disabled", "disabled");
        buttonEl.attr("disabled", true);
        plannerContent.forEach(function (item) {
            if (times[i] === ("#" + item["input-id"])) {
                descriptionEl.val(item["input-value"]);
            }
        });
    }
    else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') + ", " + timeSlots[i])) {
        descriptionEl.attr("class", "past");
        $(".past").attr("disabled", "disabled");
        buttonEl.attr("disabled", true);
    }
}

$("button").on("click", function () {
    event.preventDefault();
    var container = $(this).parent().parent();
    var inputValue = container.find("input").val();
    var inputId = container.find("input").attr("id");
    var textObj = {
        "input-id": inputId,
        "input-value": inputValue
    };

    if (textObj["input-value"] !== "") {
        plannerContent.push(textObj);
        localStorage.setItem("planner-items", JSON.stringify(plannerContent));
    }
});

