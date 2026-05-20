const apiKey = "4K7DSID6VINHBEL7";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getStockData(symbol, nameId, openId, closeId, timeId, imgId) {

    try {

        const url =
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

        const response = await fetch(url);

        const data = await response.json();

        console.log(symbol, data);

        // API LIMIT
        if (data.Note || data.Information) {
            console.log("API LIMIT");
            return;
        }

        // INVALID RESPONSE
        if (!data["Time Series (Daily)"]) {
            console.log("NO DATA");
            return;
        }

        const timeSeries = data["Time Series (Daily)"];

        const latestDate = Object.keys(timeSeries)[0];

        const latestData = timeSeries[latestDate];

        const openPrice = latestData["1. open"];

        const closePrice = latestData["4. close"];

        document.getElementById(nameId).innerText = symbol;

        document.getElementById(openId).innerText =
            "Open: $" + openPrice;

        document.getElementById(closeId).innerText =
            "Close: $" + closePrice;

        document.getElementById(timeId).innerText =
            latestDate;

        document.getElementById(imgId).src =
            `https://financialmodelingprep.com/image-stock/${symbol}.png`;

    }

    catch (error) {

        console.log(error);

    }
}

window.onload = async () => {

    await getStockData("BTC", "name-1", "open-1", "close-1", "time-1", "img-1");

    await delay(1500);

    await getStockData("ETH", "name-2", "open-2", "close-2", "time-2", "img-2");

    await delay(1500);

    await getStockData("AAPL", "name-3", "open-3", "close-3", "time-3", "img-3");

    await delay(1500);

    await getStockData("TSLA", "name-4", "open-4", "close-4", "time-4", "img-4");
};


const stockChart = document.getElementById("stock-chart").getContext("2d");

const inputStock = document.getElementById("input-stock");

const tradeBtn = document.querySelector("form .trade-btn");

const chartVolume = document.getElementById("stock-volume");

const activeStock = document.getElementById("active-trade-name");

const SecondApiKey = "LMS3RYISNQ9ZK95J"

let chart;

// SEARCH FUNCTION
async function searchData() {

    try {

        const inputValue = inputStock.value.toUpperCase();

        // EMPTY CHECK
        if (inputValue.trim() === "") {

            alert("Box Is Empty OR Invalid Value");

            return;
        }

        // BUTTON DISABLE
        tradeBtn.disabled = true;

        // DELAY FOR API LIMIT
        await delay(2000);

        const searchURL =
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${inputValue}&apikey=${SecondApiKey}`;

        const searchResponse = await fetch(searchURL);

        const responseData = await searchResponse.json();

        console.log(responseData);

        if (responseData.Note || responseData.Information) {

            alert("API Limit Reached. Please Wait 1 Minute");

            tradeBtn.disabled = false;

            return;
        }

        // INVALID RESPONSE
        if (!responseData["Time Series (Daily)"]) {

            console.log("NO DATA");

            alert("Invalid Stock Symbol");

            tradeBtn.disabled = false;

            return;
        }

        const chart_timeSeries =
            responseData["Time Series (Daily)"];

        const chart_latestDate =
            Object.keys(chart_timeSeries)[0];

        const chart_latestData =
            chart_timeSeries[chart_latestDate];

        const chart_openPrice =
            chart_latestData["1. open"];

        const chart_closePrice =
            chart_latestData["4. close"];

        const chart_latestVolume =
            chart_latestData["5. volume"];

        chartVolume.innerText =
            "Volume: " + chart_latestVolume;


        const active_stock_data =
            responseData["Meta Data"]["2. Symbol"];

        activeStock.innerText = active_stock_data;

        const labels = [
            "Open",
            "Close"
        ];

        const values = [
            Number(chart_openPrice),
            Number(chart_closePrice),
        ];

        // OLD CHART DESTROY
        if (chart) {

            chart.destroy();

        }

        // NEW CHART
        chart = new Chart(stockChart, {

            type: "line",

            data: {

                labels: labels,

                datasets: [{

                    label: inputValue,

                    data: values,

                    borderWidth: 2

                }]

            },

            options: {

                scales: {

                    y: {

                        beginAtZero: false

                    }

                }

            }

        });

        // BUTTON ENABLE
        tradeBtn.disabled = false;

    }

    catch (error) {

        console.log(error);

        tradeBtn.disabled = false;

    }

}
// BUTTON CLICK
tradeBtn.addEventListener("click", (e) => {

    e.preventDefault();

    searchData();

});

// ENTER KEY
inputStock.addEventListener("keyup", (e) => {

    if (e.key === "Enter") {

        searchData();

    }

});