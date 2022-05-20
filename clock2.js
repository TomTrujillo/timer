			let startTime;
			let stopTime;
			let stopTheClock = false;

			
			function stopClock() {
				stopTheClock = true;
			}

			
			function startClock() {
				
				stopTheClock = false;

				
				let numberOfMinutesToCountDown =
					document.formTime.textFieldNumberOfMinutesToCountDown.value;

				
				displayCountDownTimer(numberOfMinutesToCountDown);
			}

			
			function isClockStopped() {
				return stopTheClock;
			}

			
			function displayCountDownTimer(numberOfMinutes) {
				
				startTime = new Date().getTime();

				
				stopTime = new Date(startTime + numberOfMinutes * 60 * 1000);

				
				let hhmmss = convertTimeSinceEpochToHourMinSec(startTime);
				document.formTime.textFieldTimeStart.value = hhmmss;

				hhmmss = convertTimeSinceEpochToHourMinSec(stopTime);
				document.formTime.textFieldTimeStop.value = hhmmss;

				displayRemainingTime(stopTime);
			}

			
			function displayRemainingTime() {
				
				let deltaMilliSeconds = stopTime.getTime() - new Date().getTime();

				
				if (deltaMilliSeconds < 0)
					document.formTime.textFieldTime.style.color = "red";
				else document.formTime.textFieldTime.style.color = "green";

			
				deltaMilliSeconds = Math.abs(deltaMilliSeconds);

				
				let deltaSeconds = deltaMilliSeconds / 1000;

				
				let timeString = convertNumberOfSecondsToHourMinSec(deltaSeconds);

				
				document.formTime.textFieldTime.value = timeString;

				
				if (isClockStopped() == true) {
					return;
				}

				
				setTimeout("displayRemainingTime()", 1000);
			}

		
			function convertTimeSinceEpochToHourMinSec(numberOfSecondsSinceEpoch) {
				let date = new Date(numberOfSecondsSinceEpoch);

				let hours = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();

				if (hours == 0) hours = 12;
				if (hours > 12) hours = hours - 12;

				let hourString = toString(hours);
				let minuteString = toString(minutes);
				let secondString = toString(seconds);

				let s = hourString + ":" + minuteString + ":" + secondString;
				return s;
			}

			
			function convertNumberOfSecondsToHourMinSec(numberOfSeconds) {
				let remainder = numberOfSeconds;
				let hours = Math.floor(remainder / 3600);
				remainder = remainder % 3600;
				let minutes = Math.floor(remainder / 60);
				remainder = remainder % 60;
				let seconds = Math.floor(remainder);

				let hourString = toString(hours);
				let minuteString = toString(minutes);
				let secondString = toString(seconds);

				let s = hourString + ":" + minuteString + ":" + secondString;
				return s;
			}

			
			function toString(number) {
				let s = String(number);
				if (s.length == 1) s = "0" + s;
				return s;
			}


