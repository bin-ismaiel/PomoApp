let stateBtns = document.querySelectorAll("main button");
let colorBtns = document.querySelectorAll("li:last-child button");
let pageRoot = document.querySelector(":root");
let fontBtns = document.querySelectorAll("li:nth-child(2) button");
let timer = document.querySelector(".timer-container");
let state = document.querySelector(".state");
let value = document.querySelector(".time");
let activeBtn = document.querySelector(".active");
let newActiveBtn;
let playTimer = false;
let defaultMin;
let defaultSec = 0;
let defaultTime;
let context = document.querySelector(".context-menu");
let contextToggler = document.querySelector(".gear");
let closeContext = document.querySelector(".close-context");
let submit = document.querySelector(".submit");
let main = document.querySelector("main");
let pomoInput = document.getElementById("pomo");
let shortInput = document.getElementById("short");
let longInput = document.getElementById("long");
let min;
let sec = defaultSec;
let dec;
let time;
let notfication = document.querySelector(".notfi");
let tickTick = document.querySelector(".ticker");
let defaultPomo = 25;
let defaultShort = 5;
let defaultLong = 30;
let pomo;
let short;
let long;
pomoInput.value = defaultPomo;
shortInput.value = defaultShort;
longInput.value = defaultLong;
pomo = defaultPomo;
short = defaultShort;
long = defaultLong;

// Set Start Values

setTimerValue(activeBtn);
defaultTime = `${zero(defaultMin)}:${zero(defaultSec)}`;
window.addEventListener("load", () => (value.innerHTML = defaultTime));

// submit
submit.addEventListener("click", function () {
  context.classList.remove("active");
  main.classList.remove("blur");
  reset();
  pomo = pomoInput.value;

  short = shortInput.value;

  long = longInput.value;

  // reset timer value due to state

  stateBtns.forEach(function (btn) {
    if (btn.dataset.state === "short" && btn.classList.contains("active")) {
      defaultTime = `${zero(short)}:${zero(defaultSec)}`;
      value.innerHTML = defaultTime;
      min = short;
    } else if (
      btn.dataset.state === "long" &&
      btn.classList.contains("active")
    ) {
      defaultTime = `${zero(long)}:${zero(defaultSec)}`;
      value.innerHTML = defaultTime;
      min = long;
    } else if (
      btn.dataset.state === "pomo" &&
      btn.classList.contains("active")
    ) {
      defaultTime = `${zero(pomo)}:${zero(defaultSec)}`;
      value.innerHTML = defaultTime;
      min = pomo;
    }
  });
});

// add active to selected state button

stateBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    tickTick.pause();
    stateBtns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    newActiveBtn = document.querySelector(".active");
    setTimerValue(newActiveBtn);
    defaultTime = `${zero(defaultMin)}:${zero(defaultSec)}`;
    value.innerHTML = defaultTime;
    min = defaultMin;
  });
});
colorBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    colorBtns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    newActiveBtn = document.querySelector(".active");
    if (btn.dataset.color === "baby-blue") {
      pageRoot.style.setProperty("--page-theme", "#70f3f8");
    } else if (btn.dataset.color === "purple") {
      pageRoot.style.setProperty("--page-theme", "#d881f8");
    } else {
      pageRoot.style.setProperty("--page-theme", "#f67475");
    }
  });
});
fontBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    fontBtns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    newActiveBtn = document.querySelector(".active");
    if (btn.dataset.font === "roman") {
      document.body.style.fontFamily = "Times New Roman";
    } else if (btn.dataset.font === "cursive") {
      document.body.style.fontFamily = "cursive";
    } else {
      document.body.style.fontFamily = "arial";
    }
  });
});

timer.addEventListener("click", function () {
  // start & pause
  if (state.innerHTML === "start") {
    state.innerHTML = "pause";
    playTimer = true;
    tickTick.play();
    tickTick.addEventListener("ended", function () {
      this.currentTime = 0;
      this.play();
    });
  } else {
    state.innerHTML = "start";
    playTimer = false;
    tickTick.pause();
  }
  // checker

  // timer decrease

  if (playTimer === true) {
    dec = setInterval(function () {
      // decrease timer
      if (sec === 0) {
        sec = 60;
        min--;
      }
      sec--;
      if (sec === 0 && min === 0) {
        reset();
        notfication.play();
        tickTick.pause();
      }
      time = `${zero(min)}:${zero(sec)}`;

      // Pomo Ended
      if (time === `00:00`) {
        reset();
        notfication.play();
        tickTick.pause();
      }
      value.innerHTML = time;
    }, 1000);
  } else if (playTimer === false) {
    clearInterval(dec);
  }
});

// Toggle Context
closeContext.addEventListener("click", function () {
  context.classList.remove("active");
  main.classList.remove("blur");
  contextToggler.classList.remove("active");
});
contextToggler.addEventListener("click", function () {
  context.classList.add("active");
  main.classList.add("blur");
  contextToggler.classList.add("active");
  context.addEventListener(
    "click",
    function () {
      context.classList.add("active");
      main.classList.add("blur");
    },
    true
  );

  document.body.addEventListener(
    "click",
    function () {
      if (context.classList.contains("active")) {
        context.classList.remove("active");
        main.classList.remove("blur");
        contextToggler.classList.remove("active");
      }
    },
    true
  );
});

function setTimerValue(btn) {
  if (btn.dataset.state === "short") {
    defaultMin = short;
    sec = defaultSec;
    reset();
  } else if (btn.dataset.state === "long") {
    defaultMin = long;
    sec = defaultSec;
    reset();
  } else {
    defaultMin = pomo;
    sec = defaultSec;
    reset();
  }
}
function zero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
function reset() {
  clearInterval(dec);
  state.innerHTML = "start";
  playTimer = false;
  min = defaultMin;
  sec = defaultSec;
  time = `${zero(min)}:${zero(sec)}`;
}
