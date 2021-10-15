"use strict";
const electron = require("electron");
const path = require("path");
const remote = electron.remote;
const startBtn = document.getElementById("startbtn");
const ioHook = require("iohook");
//const { remote } = require('electron')
const eyeNotification = {
  title: "Blink Alert",
  body: "Look away from your screen and Blink!",
  icon: path.join(__dirname, "../assets/images/eye.jpg"),
};

const breakNotification = {
  title: "Time for a break!",
  body: "Take a short walk/ sip some water!",
};

const inactiveNotification = {
  title: "Still There??",
  body: "Hey, you were probably idle for the last 1/2 hr. Take a break!",
};

const welcomeNotification = {
  title: "We're on it!!",
  body: "Hello! You'll be notified soon!",
};

var activeTime = { value: 0 };
var inActiveTime = { value: 0 };
var active = { state: false };

function updateActiveTime() {
  if (active.state) {
    activeTime.value += 5;
    inActiveTime.value = 0;
  } else {
    inActiveTime.value += 5;
    if (inActiveTime.value >= 10) activeTime.value = 0;
  }
  console.log("active " + activeTime.value + " inactive " + inActiveTime.value);
  //ioHook.removeAllListeners(['mousemove', 'keydown']);

  if (activeTime.value === 20 || activeTime.value === 40) {
    new window.Notification(eyeNotification.title, eyeNotification);
  } else if (activeTime.value === 60) {
    new window.Notification(breakNotification.title, breakNotification);
    activeTime.value = 0;
  } else if (inActiveTime.value === 30) {
    new window.Notification(inactiveNotification.title, inactiveNotification);
    inActiveTime.value = 0;
  }
  active.state = false;
}

ioHook.on("mousemove", (event) => {
  active.state = true;
  console.log("mosue");
});

ioHook.on("keydown", (event) => {
  active.state = true;
  console.log("keyb");
});

startBtn.addEventListener("click", function (event) {
  var currentwindow = remote.getCurrentWindow();
  if (startBtn.innerText == "Start") {
    currentwindow.minimize();

    // Register and start hook
    ioHook.start();
    new window.Notification(welcomeNotification.title, welcomeNotification);

    // start tracking..
    updateActiveTime();
    setInterval(updateActiveTime, 5000);

    startBtn.innerText = "Stop";
  } else {
    currentwindow.close();
  }
});
