'use strict';
const electron = require('electron')
const path = require('path')
const remote = electron.remote
const startBtn = document.getElementById('startbtn')
const ioHook = require('iohook');
//const { remote } = require('electron')

const eyeNotification = {
    title: 'Blink Alert',
    body: 'Look away from your screen and Blink!'
  }
 
  const breakNotification = {
    title: 'Time for a break!',
    body: 'Take a short walk/ sip some water!'
  }

var activeTime = {value:0};
var active = {state: false};


function updateActiveTime(){
    console.log("updating "+ activeTime.value)
    if(active.state){
        activeTime.value += 5;
    }
    else{
        activeTime.value = 0;
    }
    console.log("updated "+ activeTime.value)
    //ioHook.removeAllListeners(['mousemove', 'keydown']); 
    
    if(activeTime.value === 20 || activeTime.value === 40)
    {
        const myNotification = new window.Notification(eyeNotification.title, eyeNotification)
    }

    else if(activeTime.value === 60){
        //alert("big break");
        const newNotification = new window.Notification(breakNotification.title, breakNotification)
        activeTime.value = 0;
    }
}

ioHook.on('mousemove', event => {
    active.state = true;
    console.log("mosue");
});

ioHook.on('keydown', event => {
    active.state = true;
    console.log("keyb");
 });  

function calculateActiveTime() {
    console.log("inside calc func"+ active.state);
    active.state = false;


      //alert("active is "+ active.state)
    console.log("inside calc updated"+ active.state);
    setTimeout(updateActiveTime,4990);
}

startBtn.addEventListener('click', function (event) {
    // var homewindow = remote.getCurrentWindow();
    // homewindow.minimize();

    // Register and start hook  
    ioHook.start();
    
    calculateActiveTime();
    setInterval ( calculateActiveTime, 5000 );
})