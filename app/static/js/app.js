console.log("Railway PNR UI Loaded 🚆");

const searchBtn = document.getElementById("check-pnr-btn");

const pnrInput = document.getElementById("pnr-input");

const resultContainer = document.getElementById("result-container");

function getSearchHistory(){
    const history = localStorage.getItem("pnrHistory");
    return history ? JSON.parse(history) : [];
}

function saveSearchHistory(history){
    localStorage.setItem("pnrHistory", JSON.stringify(history));

}

function addToHistory(pnr){

    let history = getSearchHistory();
    
        // Remove duplicate if it exists

    history = history.filter(item => item !== pnr);

        // Add newest search at the beginning

    history.unshift(pnr);

        // Keep only last 5 searches

    history = history.slice(0, 5);

    saveSearchHistory(history);
}

searchBtn.addEventListener("click", async function (){
    const pnr = pnrInput.value.trim();

    if(pnr === ""){
        alert("Please Enter A Valid PNR Number");
        return ;
    }

    const response = await fetch("/check-pnr", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            pnr : pnr
        })

    });


    const data = await response.json();

    addToHistory(pnr);

    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `
        <h2> 🚆 Journey Information </h2>

        <p><strong> Train Number:</strong> ${data.train_number}</p>
        <p><strong> Trian Name:</strong> ${data.train_name}</p>
        <p><strong> From:</stromg> ${data.from_station}</p>
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

