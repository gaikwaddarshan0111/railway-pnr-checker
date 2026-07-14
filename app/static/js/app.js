console.log("Railway PNR UI Loaded 🚆");

// ==============================
// DOM Elements
// ==============================

const searchBtn = document.getElementById("check-pnr-btn");
const pnrInput = document.getElementById("pnr-input");
const resultContainer = document.getElementById("result-container");

const historyToggle = document.getElementById("historyToggle");
const historyDropdown = document.getElementById("historyDropdown");

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

// ==============================
// Toggle History Dropdown
// ==============================

historyToggle.addEventListener("click", function () {

    historyDropdown.classList.toggle("hidden");

    renderHistory();

historyDropdown.addEventListener("click", function(event){

    if(event.target.classList.contains("clear-history")){

        localStorage.removeItem("pnrHistory");

        renderHistory();
    }
});
});

// ==============================
// Search Button
// ==============================

searchBtn.addEventListener("click", async function () {

    const pnr = pnrInput.value.trim();

    if (pnr === "") {
        alert("Please Enter A Valid PNR Number");
        return;
    }

    const response = await fetch("/check-pnr", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            pnr: pnr
        })

    });

    const data = await response.json();

    // Save History
    addToHistory(pnr);

    // Refresh Dropdown
    renderHistory();

    // Show Result
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