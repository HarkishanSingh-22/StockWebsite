// const apiKey = "a49268860548009a937dbd24737fa8b2"; Weather Api

// const apiKey = "4K7DSID6VINHBEL7"; alphaVantage Api



const inputCity = document.getElementById("input-city");

const ctx = document.getElementById("demo-chart");

let chart;

inputCity.addEventListener("keyup", (e) => {

    if (e.key === "Enter") {

        getdata();

    }

});

async function getdata() {

    try {

        // INPUT VALUE FUNCTION KE ANDAR LO
        const city = inputCity.value;

        const apiURL =
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

        const response = await fetch(apiURL);

        const data = await response.json();

        console.log(data);

        // Invalid city check
        if (data.cod !== 200) {

            alert("City not found");

            return;
        }

        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;

        const labels = [
            "Temperature",
            "Feels Like",
            "Min Temp",
            "Max Temp"
        ];

        const values = [
            temp,
            feelsLike,
            tempMin,
            tempMax
        ];

        // Old chart remove
        if (chart) {
            chart.destroy();
        }

        // New chart
        chart = new Chart(ctx, {

            type: "line",

            data: {

                labels: labels,

                datasets: [{
                    label: `${city} Weather`,

                    data: values,

                    borderWidth: 1
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

    }

    catch (error) {

        console.log(error);

    }

}