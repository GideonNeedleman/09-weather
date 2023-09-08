# Weather App

Displays weather info for a location by fetching data from an API. You can add and delete multiple locations that are stored in local storage. Can also get current location from browser.

## Future improvements

1. Save locations to local storage.
2. Save multiple locations in array, render multiple `<Weather />` components. Initial lookup renders a temporary Weather component with 'save' button to store location to local storage. Map out array of locations in storage to render list of Weather components. These 'permanent' Weather components have 'delete' button instead of 'save' button to remove from storage.
3. Enable disambiguated location search with dropdown menu listing all options from search lookup instead of defaulting to first result.
4. Store theme colors in CSS variables & improve theme.
   1. Implement dark/light theme options

## Future ideas

1. Road-trip weather app that displays predicted weather along a set route. The idea is you are going on a long road trip lasting several hours. The weather you encounter may change dramatically as you traverse the route. The app will display predicted weather in 30 minute? time blocks according to your predicted position along the route at those times. Can set starting time. Will need integration with map & route plotting API.
2. More beautiful weather app with animation showing current & predicted weather over the course of the day. Perhaps a spinning circle-type graphic that shows the sun and moon and stars and clouds rotate through the sky, reliving the past 24 hours of weather events before arriving at the current time. Maybe an hour hand/clock on the outside of the circle. Can also move forwards to show future expected weather.
   1. Maybe reduce this kind of animated-live weather thing into a smaller widget/component that can be embedded into other websites. Have some customization options to reflect your location. Like building styles, or local animals or culture. Urban vs rural. Seasonal variations. Handle everything programmatically with dynamic SVG graphics. Other art styles also possible: pixel art, cartoon, etc.
