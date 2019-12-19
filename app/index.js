import { me as appbit } from "appbit";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import document from "document";
/////////////////////////////////////////////////
import document from "document";

let list = document.getElementById("my-list");
let items = list.getElementsByClassName("tile-list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch-me");
  touch.onclick = (evt) => {
    console.log(`touched: ${index}`);
    if (index == 0) {
            showHeartRate(element);
        } 
        // If the second item is clicked
        else if (index == 1) {
            showImage(element);
        } 
        // If the third item is clicked
        else {
            showStepsCount(element);
        }
  }
});
/////////////////////////////////////////////////
let scrollview = document.getElementById("scrollview");
let items = scrollview.getElementsByClassName("item");

// For every item in the scrollview
// add an eventListener to its rect
items.forEach((element, index) => {
    let touch = element.getElementById("section" + (index + 1));
    touch.addEventListener('click', () => {
        // If the first item is clicked
        if (index == 0) {
            showHeartRate(element);
        } 
        // If the second item is clicked
        else if (index == 1) {
            showImage(element);
        } 
        // If the third item is clicked
        else {
            showStepsCount(element);
        }
    });
});

// function showHeartRate
// Hides the current text in section 1
// and displays another text with the heart rate
// Parameter: Object element
function showHeartRate(element) {
    if (appbit.permissions.granted("access_heart_rate")) {
        if (HeartRateSensor) {
            // Variables defined with const behave like let variables, except they cannot be reassigned
            const hrm = new HeartRateSensor();
            // Declare an event handler that will be called every time a new HR value is received.
            hrm.addEventListener("reading", function () {
                let title = element.getElementById("title");
                let HRMtext = element.getElementById("HRMtext");
                HRMtext.style.display = "inline";
                title.style.display = "none";
                HRMtext.text = "Heart Rate:" + hrm.heartRate;
                console.log("Current heart rate: " + hrm.heartRate);
            });
            // Begin monitoring the sensor
            hrm.start();
        }
    }
}

// function showImage
// Hides the current rect in section 2
// and displays an image behind the text
// Parameter: Object element
function showImage(element) {
    let img = element.getElementById("img");
    let rect2 = element.getElementById("section2");
    img.style.display = "inline";
    rect2.style.display = "none";
    console.log("Image Placed!");
}

// function showStepsCount
// Changes the rect fill color in section3
// and displays the steps count in the 
// pre-existed text element in this item
// Parameter: Object element
function showStepsCount(element) {
    if (appbit.permissions.granted("access_activity")) {
        let rect3 = element.getElementById("section3");
        let steps = element.getElementById("steps");
        rect3.style.fill = "blue";
        steps.text = today.adjusted.steps + " steps";
        console.log(`${today.adjusted.steps} Steps`);
    }
}