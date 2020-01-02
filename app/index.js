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
            showHR(element);
        } 
        // If the second item is clicked
        if (index == 4) {
            showFloors(element);
        } 
        // If the third item is clicked
        if (index == 1) {
            showSteps(element);
        }
        if (index == 0) {   /// call the profile 
            showProfile(element);
        }
        if (index == 2) {   /// call the profile 
            showCalories(element);
        }
  }
});
/////////////////////////////////////////////////


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

function showSteps(element) {
    let prof = document.getElementById("steps");
    let list = document.getElementById("my-list");
    let svgButt = document.getElementById("button");
    let text = document.getElementById("t1");
    list.style.display = "none"; // close scroll view 
    prof.style.display = "inline"; // open rect
    svgButt.style.display = "inline";// open button 
 
    if (appbit.permissions.granted("access_activity")) {
        let rect3 = element.getElementById("tile-list-item");
        let steps = element.getElementById("steps");
        text.text = today.adjusted.steps + " steps";
        console.log(`${today.adjusted.steps} Steps`);
    }
  
  
    svgButt.onactivate = function(evt) { // after click 
      console.log("back CLICKED!");
      list.style.display = "inline"; // open scroll view 
      prof.style.display = "none"; // close rect
      svgButt.style.display = "none"; // close button 
    }

}

function showFloors(element) {
    let prof = document.getElementById("floors");
    let list = document.getElementById("my-list");
    let svgButt = document.getElementById("button");
    let floors= document.getElementById("t3");
    list.style.display = "none"; // close scroll view 
    prof.style.display = "inline"; // open rect
    svgButt.style.display = "inline";// open button 
  /////////////////
   if(appbit.permissions.granted("access_activity")){
     floors.text = today.adjusted.elevationGain + " ";
     console.log(`${today.adjusted.elevationGain} Floors`);
   }
  //////////////////
    svgButt.onactivate = function(evt) { // after click 
      console.log("back CLICKED!");
      list.style.display = "inline"; // open scroll view 
      prof.style.display = "none"; // close rect
      svgButt.style.display = "none"; // close button 
    }

}


function showCalories(element) {
    let prof = document.getElementById("calories");
    let list = document.getElementById("my-list");
    let svgButt = document.getElementById("button");
    let cals = document.getElementById("t4");
    list.style.display = "none"; // close scroll view 
    prof.style.display = "inline"; // open rect
    svgButt.style.display = "inline";// open button 
 
  /////////////////
    if (appbit.permissions.granted("access_activity")) {
     cals.text = today.adjusted.calories + " ";
     console.log(`${today.adjusted.calories} Cals`);
   }
  //////////////////
    svgButt.onactivate = function(evt) { // after click 
      console.log("back CLICKED!");
      list.style.display = "inline"; // open scroll view 
      prof.style.display = "none"; // close rect
      svgButt.style.display = "none"; // close button 
    }

}
function showHR(element) {
    let prof = document.getElementById("hr");
    let list = document.getElementById("my-list");
    let svgButt = document.getElementById("button");
    let HRMtext = document.getElementById("t2");
    list.style.display = "none"; // close scroll view 
    prof.style.display = "inline"; // open rect
    svgButt.style.display = "inline";// open button 
        /////////////
   if (appbit.permissions.granted("access_heart_rate")) {
        if (HeartRateSensor) {
            // Variables defined with const behave like let variables, except they cannot be reassigned
            const hrm = new HeartRateSensor();
            // Declare an event handler that will be called every time a new HR value is received.
            hrm.addEventListener("reading", function () {
                HRMtext.text =   hrm.heartRate + " ";
                console.log("Current heart rate: " + hrm.heartRate);
            });
            // Begin monitoring the sensor
            hrm.start();
        }
    }
  /////////////////////////
      svgButt.onactivate = function(evt) { // after click 
      console.log("back CLICKED!");
      list.style.display = "inline"; // open scroll view 
      prof.style.display = "none"; // close rect
      svgButt.style.display = "none"; // close button 
    }

}
