console.log("Railway PNR UI Loaded 🚆");

// ==============================
// DOM Elements
// ==============================

const searchBtn = document.getElementById("check-pnr-btn");
const pnrInput = document.getElementById("pnr-input");
const resultContainer = document.getElementById("result-container");

const historyToggle = document.getElementById("historyToggle");
const historyDropdown = document.getElementById("historyDropdown");

const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
console.log(searchBtn);

// ==============================
// Search History Functions
// ==============================

function getSearchHistory() {
    const history = localStorage.getItem("pnrHistory");
    return history ? JSON.parse(history) : [];
}

function saveSearchHistory(history) {
    localStorage.setItem("pnrHistory", JSON.stringify(history));
}

function addToHistory(pnr) {

    let history = getSearchHistory();

    // Remove duplicate if exists
    history = history.filter(item => item !== pnr);

    // Add newest at beginning
    history.unshift(pnr);

    // Keep only latest 5
    history = history.slice(0, 5);

    saveSearchHistory(history);
}

// ==============================
// Render Search History
// ==============================

function renderHistory() {

    const history = getSearchHistory();

    historyDropdown.innerHTML = "";

    if (history.length === 0) {

        historyDropdown.innerHTML = `
            <div class="history-item">
                No recent searches
            </div>
        `;

        return;
    }

    history.forEach((pnr) => {

        historyDropdown.innerHTML += `
            <div class="history-item">
                ${pnr}
            </div>
        `;

    });

    historyDropdown.innerHTML += `
        <div class="clear-history">
            🗑 Clear History
        </div>
    `;
}


function showError(message){

    errorMessage.innerText = message;

    errorMessage.classList.remove("hidden");

}

function hideError(){

    errorMessage.classList.add("hidden");
}
// ==============================
// Toggle History Dropdown
// ==============================

historyToggle.addEventListener("click", function () {

    historyDropdown.classList.toggle("hidden");

    renderHistory();

});

// ==============================
// Clear History
// ==============================

historyDropdown.addEventListener("click", function (event) {

    if (event.target.classList.contains("clear-history")) {

        localStorage.removeItem("pnrHistory");

        renderHistory();

    }

});

// ==============================
// Search Button
// ==============================

searchBtn.addEventListener("click", async function () {

    const pnr = pnrInput.value.trim();

    if (pnr === "") {

        resultContainer.classList.add("hidden");

        resultContainer.innerHTML = "";

        showError("Please enter a valid 10-digit PNR number.");

        return;
    }
   
    hideError();

    // ==========================
    // Show Loading Spinner
    // ==========================


    // ==========================
    // API Call
    // ==========================
    let response;
    let data;
    try{

       response = await fetch("/check-pnr", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            pnr: pnr
        })

    });

     data = await response.json();
}

catch(error){
     
     resultContainer.classList.add("hidden");

     resultContainer.innerHTML = "";

     showError("Unable to connect. Please check your internet connection.");

     console.error(error);

     return;
}
    if(!response.ok){

        resultContainer.classList.add("hidden");

        resultContainer.innerHTML = "";

        if(response.status === 404){
            showError("PNR Not Found. Please verify your PNR.");
        }
        else if(response.status === 500){
            showError("Internal Server Error. Please try again later.");
        }
        else{
            showError("Unable to process your request.");
        }

        return;
    }

    // ==========================
    // Save History
    // ==========================

    addToHistory(pnr);

    renderHistory();

    // ==========================
    // Show Result
    // ==========================

    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `

        <h2>🚆 Journey Information</h2>

        <p><strong>Train Number:</strong> ${data.train_number}</p>
        <p><strong>Train Name:</strong> ${data.train_name}</p>
        <p><strong>From:</strong> ${data.from}</p>
        <p><strong>To:</strong> ${data.to}</p>
        <p><strong>Journey Date:</strong> ${data.journey_date}</p>
        <p><strong>Chart Status:</strong> ${data.chart_status}</p>

        <hr>

        <h2>👤 Passenger Details</h2>

        <p><strong>Name:</strong> ${data.passengers[0].name}</p>
        <p><strong>Coach:</strong> ${data.passengers[0].coach}</p>
        <p><strong>Seat:</strong> ${data.passengers[0].seat}</p>
        <p><strong>Status:</strong> ${data.passengers[0].status}</p>

    `;

   
});