document.addEventListener("DOMContentLoaded", function () {
    let minutes = 25;
    let seconds = 0;
    let isWorkTimer = true;
    let isTimerRunning = false;
    let interval;

    const minuteElement = document.querySelector('.minute');
    const secondElement = document.querySelector('.second');
    const startButton = document.querySelector('.btn_start');
    const workTimeInput = document.querySelector('.worck_time_input input');
    const restTimeInput = document.querySelector('.rest_time_input input');

    updateDisplay();

    startButton.addEventListener('click', function () {
        if (isTimerRunning) {
            stopTimer();
        } else {
            if (minutes === 0 && seconds === 0) {
                switchTimer();
            }
            startTimer();
        }
    });

    function startTimer() {
        isTimerRunning = true;
        startButton.textContent = 'STOP';

        interval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                stopTimer();
                switchTimer();
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }

                updateDisplay();
            }
        }, 1000);
    }

    function stopTimer() {
        isTimerRunning = false;
        startButton.textContent = 'START';
        clearInterval(interval);
    }

    function updateDisplay() {
        minuteElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    function switchTimer() {
        if (isWorkTimer) {
            minutes = parseInt(restTimeInput.value);
        } else {
            minutes = parseInt(workTimeInput.value);
        }

        isWorkTimer = !isWorkTimer;
        updateDisplay();
    }

    workTimeInput.addEventListener('change', function () {
        if (!isTimerRunning) {
            minutes = parseInt(workTimeInput.value);
            updateDisplay();
        }
    });

    restTimeInput.addEventListener('change', function () {
        if (!isTimerRunning) {
            minutes = parseInt(restTimeInput.value);
            updateDisplay();
        }
    });
});
