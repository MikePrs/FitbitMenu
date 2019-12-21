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
        if (index == 3) {
            showHeartRate(element);
        } 
        // If the second item is clicked
        if (index == 4) {
            showFloorsCount(element);
        } 
        // If the third item is clicked
        if (index == 1) {
            showStepsCount(element);
        }
        if (index == 0) {   /// call the profile 
            showProfile(element);
        }
  }
});
/////////////////////////////////////////////////


function showHeartRate(element) {
    if (appbit.permissions.granted("access_heart_rate")) {
        if (HeartRateSensor) {
            // Variables defined with const behave like let variables, except they cannot be reassigned
            const hrm = new HeartRateSensor();
            // Declare an event handler that will be called every time a new HR value is received.
            hrm.addEventListener("reading", function () {
                let title = element.getElementById("tile-list-item");
                let HRMtext = element.getElementById("HRMtext");
                HRMtext.style.display = "inline";
                HRMtext.text = "Heart Rate:" + hrm.heartRate;
                console.log("Current heart rate: " + hrm.heartRate);
            });
            // Begin monitoring the sensor
            hrm.start();
        }
    }
}



// function showStepsCount
// Changes the rect fill color in section3
// and displays the steps count in the 
// pre-existed text element in this item
// Parameter: Object element
function showStepsCount(element) {
    if (appbit.permissions.granted("access_activity")) {
        let rect3 = element.getElementById("tile-list-item");
        let steps = element.getElementById("steps");
        steps.text = today.adjusted.steps + " steps";
        console.log(`${today.adjusted.steps} Steps`);
    }
}

function showFloorsCount(element) {
    
}

function showProfile(element) {
    let prof = document.getElementById("profile");
    let list = document.getElementById("my-list");
    let svgButt = document.getElementById("button");
    list.style.display = "none"; // close scroll view 
    prof.style.display = "inline"; // open rect
    svgButt.style.display = "inline";// open button 
  //  console.log("Profile");
    
    svgButt.onactivate = function(evt) { // after click 
      console.log("back CLICKED!");
      list.style.display = "inline"; // open scroll view 
      prof.style.display = "none"; // close rect
      svgButt.style.display = "none"; // close button 
    }

}
