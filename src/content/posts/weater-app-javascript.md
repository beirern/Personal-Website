---
title: Building a Weather App with JavaScript
date: 2025-03-20
tags: [javascript, api, frontend]
draft: true
---

# Building a Weather App with JavaScript

In this post, I'll walk through how I built a simple weather application using vanilla JavaScript and the OpenWeatherMap API.

## Project Overview

I wanted to create a clean, user-friendly weather application that would:

1. Allow users to search for weather by city name
2. Display current weather conditions including temperature, humidity, and wind speed
3. Show a 5-day forecast
4. Change the UI based on the current weather conditions

## Setting Up the API

First, I needed to sign up for an API key from [OpenWeatherMap](https://openweathermap.org/). Their free tier allows for up to 60 calls per minute, which is more than sufficient for a personal project.

```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
```

## Building the UI

For the UI, I kept things simple with HTML, CSS, and JavaScript. I created a search input, a main weather display section, and a forecast container:

```html
<div class="weather-container">
  <div class="search-box">
    <input type="text" placeholder="Enter city name..." id="city-input">
    <button id="search-btn">Search</button>
  </div>
  
  <div class="current-weather">
    <!-- Weather data will be inserted here -->
  </div>
  
  <div class="forecast">
    <!-- Forecast data will be inserted here -->
  </div>
</div>
```

## Handling Weather Conditions

One interesting challenge was dynamically changing the UI based on weather conditions. I created a function that would set different background gradients and icons:

```javascript
function setWeatherTheme(weatherCode) {
  const body = document.body;
  const weatherIcon = document.querySelector('.weather-icon');
  
  // Clear sky
  if (weatherCode >= 800 && weatherCode < 803) {
    body.className = 'clear-sky';
    weatherIcon.src = '/images/clear.svg';
  } 
  // Cloudy
  else if (weatherCode >= 803) {
    body.className = 'cloudy';
    weatherIcon.src = '/images/cloudy.svg';
  }
  // Rain
  else if (weatherCode >= 500 && weatherCode < 600) {
    body.className = 'rainy';
    weatherIcon.src = '/images/rain.svg';
  }
  // Snow
  else if (weatherCode >= 600 && weatherCode < 700) {
    body.className = 'snowy';
    weatherIcon.src = '/images/snow.svg';
  }
  // Other conditions
  else {
    body.className = 'default';
    weatherIcon.src = '/images/default.svg';
  }
}
```

## Lessons Learned

Building this project taught me several important lessons:

1. **API Error Handling** - I improved my approach to handling API failures gracefully
2. **Asynchronous JavaScript** - I got more comfortable with async/await patterns
3. **Responsive Design** - I made sure the app worked well on mobile devices
4. **User Experience** - I added loading states and error messages to improve UX

## Next Steps

I'm planning to enhance this project by:

- Adding location detection using the Geolocation API
- Implementing a dark/light mode toggle
- Adding weather alerts
- Creating a PWA version so it can be installed on devices

Have you built a weather app or worked with public APIs? I'd love to hear about your experiences!
