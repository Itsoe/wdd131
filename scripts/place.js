// Footer: current year and last modified date
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Static weather values — Victoria Falls, Zimbabwe (winter, July)
const temperature = 9;    // °C
const windSpeed   = 12;   // km/h

// Wind chill formula (metric): returns °C as a string with one decimal place
function calculateWindChill(temp, speed) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

// Display wind chill only when conditions make it a viable calculation
const windChillEl = document.querySelector('#wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillEl.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillEl.textContent = 'N/A';
}
