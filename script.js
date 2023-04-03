// currency converter
//  preventing the default behavior of the event (prevents redirect to a new page).
function convertCurrency(event) {
    event.preventDefault();

    // Retrieve the input values from the HTML elements and store them in variables
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    // Check if amount is a valid number
    if (isNaN(amount)) {
        document.getElementById("result").innerHTML = "Amount must be a valid number.";
        return;
    }

    // The fourth line creates a URL string using the input value stored in "from".
    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const result = amount * rate;

            document.getElementById("result").innerHTML = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("result").innerHTML = "An error occurred. Please try again later.";
        });
}




// time
function updateTime() {
    var now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
    var hours = new Date(now).getHours();
    var minutes = new Date(now).getMinutes();
    var seconds = new Date(now).getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    document.querySelector('.clock').innerHTML = timeString;
}
setInterval(updateTime, 1000);



// weather
let weather = {
    apiKey: "d18b56a49b26671b9dbc02f85fe96b47",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp.toFixed(1) + "°C"; // use the toFixed method to round the temperature to one decimal
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
}

weather.fetchWeather("Bangkok");