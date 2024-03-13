# What do we need to get for out weather API?

## Current Weather
Can we do a brief summary of the weather e.g. is it raining, sunny, snowy, cloudy
Visualize a basic view of the weather with an hourly forecast below -> Temp, Weather

#### What we can get:

1. Sun/Moon Cycle
2. Sunrise, Sunset
3. Visibility
4. Wind
5. Rain
6. Snow
7. <ins>Weather Description<ins>
8. Cloud
9. Humidity
10. Alerts

Can we also get a real indepth view with specified states of weather

#### For each weather type we need to get the following:
- Icon to match description 
- Theme to match description 


## How often should we call the API and where do we get the information from?

- When the case is loaded make an initial call to the API to get the current weather 
- We should call for the daily weather for the initial call but move to current calls every?
- How often should we recall the API? -> 15 mins = 96 calls a day = average 10 cases a day  
- How are we going to cache the data? And again for how long? -> 15 mins but daily remains stored
- We have to cache per case and within per day and hourly