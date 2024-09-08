let countdown;
let isRunning = false;
let coinCount = 0;

function initialize() {
    let storedCoinCount = localStorage.getItem('coinCount');
    if (storedCoinCount) {
        coinCount = parseInt(storedCoinCount);
    } else {
        coinCount = 0;
    }
    document.getElementById('coinCount').textContent = coinCount;
}

function startTimer() {
    if (isRunning) return; // Prevent multiple timers from running at the same time

    const minutesInput = document.getElementById('minutes');
    let minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes < 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    let totalSeconds = minutes * 60;
    let circle = document.querySelector('.circle');

    countdown = setInterval(function() {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        document.getElementById('timer').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            document.getElementById('timer').textContent = "00:00";
            showCongratulatoryMessage(); // Show congratulatory message
            isRunning = false;
        } else {
            totalSeconds--;
            coinCount++;
            document.getElementById('coinCount').textContent = coinCount;
            localStorage.setItem('coinCount', coinCount);
            
            // Calculate the progress as a percentage
            let progress = (totalSeconds / (minutes * 60)) * 100;
            circle.style.background = `conic-gradient(#007bff ${progress}%, transparent ${progress}%)`;
        }
    }, 1000);

    isRunning = true;
}

function resetTimer() {
    clearInterval(countdown);
    document.getElementById('timer').textContent = "00:00";
    coinCount = 0;
    document.getElementById('coinCount').textContent = coinCount;
    localStorage.removeItem('coinCount');

    // Reset the circle outline
    document.querySelector('.circle').style.background = '#007bff';

    isRunning = false;
}

// Show a congratulatory message
function showCongratulatoryMessage() {
    // Create a modal element
    let modal = document.createElement('div');
    modal.className = 'modal';
    
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You completed the timer!</p>
        <button onclick="closeModal()">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Close the modal
function closeModal() {
    let modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

document.addEventListener('DOMContentLoaded', initialize);
