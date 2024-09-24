const hoursDisplay = document.querySelector("#hours");
const minsDisplay = document.querySelector("#minutes");
const amPmDisplay = document.querySelector("#am-pm");

const settingsSubmit = document.querySelector("#submit-settings");
const settingsTheme = document.querySelector("#theme");
const settingsTime = document.querySelector("#hours-display");

const root = document.querySelector(":root");

let is12HourDisplay = true;

settingsSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	setTheme(settingsTheme.value.toLowerCase());
	setDisplayMode(settingsTime.checked);
})

/* Initialize Display */
DisplayTime(new Date());

setInterval(() => {
	const now = new Date();

	if (minsDisplay.textContent !== String(now.getMinutes())) {
		DisplayTime(now);
	}
}, 1000);

/* Display Functions */
function DisplayTime(time) {
	DisplayHours(time);
	DisplayMinutes(time);
	if (is12HourDisplay) DisplayAmPm(time);	
}

function DisplayHours(time) {
	const currentHour = time.getHours();
	if (is12HourDisplay) {
		if (currentHour === 0) {
			hoursDisplay.textContent = "12";
			amPmDisplay.textContent = "am";
		}
		else if (currentHour > 12) {
			const displayHour = currentHour % 12;
			hoursDisplay.textContent = displayHour;
			amPmDisplay.textContent = "pm";
		}
		else {
			hoursDisplay.textContent = currentHour;
			amPmDisplay.textContent = "am";
		}
	} 
	else {
		hoursDisplay.textContent = currentHour;
	}
}

function DisplayMinutes(time) {
	minsDisplay.textContent = String(time.getMinutes()).padStart(2, "0");
}

function DisplayAmPm(time) {
	amPmDisplay.textContent = time.getHours() < 12 ? "am" : "pm"; 
}

/* Settings Functions */
function setTheme(theme) {
	root.setAttribute("class", theme);
}

function setDisplayMode(is12Hour) {
	is12HourDisplay = is12Hour;
	if(!is12HourDisplay) {
		amPmDisplay.style.display = "none";
	} else {
		amPmDisplay.style.display = "block";
	}
	DisplayTime(new Date());
}