// Your OpenWeatherMap API key
const apiKey = '97aa58090962a9a629ef44e3ccb806aa';

// Function to get weather data
async function getWeather() {
    // Get the city name from input
    const city = document.getElementById('city').value;

    // If city is empty, show an error message
    if (city === "") {
        document.getElementById('weather').innerHTML = "Please enter a city name!";
        return;
    }

    // API URL with the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl); // Make sure 'await' is used here
        
        // If the response is not ok (status code not 200), handle error
        if (!response.ok) {
            console.log("Error: ", response.status); // Log the status for debugging

            if (response.status === 404) {
                throw new Error("City not found");
            } else {
                throw new Error("Something went wrong. Try again later.");
            }
        }

        // Parse the JSON data
        const data = await response.json(); // Await the response to parse it as JSON
        
        // Display the weather data
        displayWeather(data);
    } catch (error) {
        // Log the error for debugging
        console.error("Error message:", error.message);

        // Display the error message in the UI
        document.getElementById('weather').innerHTML = error.message;
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
