const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", function () {
        window.location.href = "stock.html";
    });
});

const inputStock = document.getElementById("input-stock");
const activeStock = document.getElementById("active-trade-name");
const card_stockName = document.getElementById("card-stock-name");
const card_stockPrice = document.getElementById("card-stock-opening-price");
const card_stock_ClosePrice = document.getElementById("card-stock-close-price");
const card_stockTime = document.getElementById("card-stock-time");
const card_stockImg = document.getElementById("card-stock-img");

const apiKey = "4K7DSID6VINHBEL7";

inputStock.addEventListener("keydown", async (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        const userInput = inputStock.value.toUpperCase();

        if (userInput.trim() === "") {
            alert("Please Enter Stock Name");
            return;
        }

        try {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${userInput}&apikey=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            // API safety check
            if (!data["Meta Data"] || !data["Time Series (Daily)"]) {
                alert("API limit or invalid response");
                return;
            }

            // Symbol
            const symbol = data["Meta Data"]["2. Symbol"];
            activeStock.innerText = symbol;
            card_stockName.innerText = symbol;

            // Time series data
            const timeSeries = data["Time Series (Daily)"];

            // Latest date
            const latestDate = Object.keys(timeSeries)[0];
            card_stockTime.innerText = latestDate;

            // Latest data
            const latestData = timeSeries[latestDate];

            const openingPrice = latestData["1. open"];
            const closePrice = latestData["4. close"];

            card_stockPrice.innerText = "Open: " + openingPrice;
            card_stock_ClosePrice.innerText = "Close: " + closePrice;

            // Image
            card_stockImg.src = `https://financialmodelingprep.com/image-stock/${userInput}.png`;

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong");
        }
    }
});