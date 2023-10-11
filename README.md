# Weather App

Displays weather info for a location by fetching data from an API. You can add and delete multiple locations that are stored in local storage. Can also get current location from browser.

## Future improvements

1. ~~Save locations to local storage.~~
2. ~~Save multiple locations in array, render multiple `<Weather />` components. Initial lookup renders a temporary Weather component with 'save' button to store location to local storage. Map out array of locations in storage to render list of Weather components. These 'permanent' Weather components have 'delete' button instead of 'save' button to remove from storage.~~
3. ~~Enable disambiguated location search with dropdown menu listing all options from search lookup instead of defaulting to first result.~~
4. Store theme colors in CSS variables & improve theme.
   1. Implement dark/light theme options
5. ~~Restyle buttons & checkmarks~~
6. ~~**Display daily weather on hover over Day**~~
   1. ~~Filter out times before current hour if isToday new Date() should get current time in UTC. Need to translate location times to UTC then check that location hour >= current time hour to display~~
   2. ~~Fix hourly weather fetch. Currently only getting today's data.~~
7. ~~Make styling reactive~~
   ~~1. Change Day cards to vertical when screen shrinks. Phone rotation will show both views.~~
8. ~~Close dropdown on type query input~~
9. ~~Improve mobile UI~~
10. ~~input field too wide~~
11. ~~bring back input bottom margin~~
12. ~~day card a bit too wide~~
13. ~~SAVE/SAVED text on pin too big? need more left margin~~
14. ~~Fix wrong day bug. It thinks we're a day behind. It's because the formatDay helper function thinks the local date string is UTC. That's because we tell the meteo API our timezone, so it gives us local times, but then we feed this to formatDay that thinks it's UTC, so it gets the day of the week wrong. Apparently kludgy solution is to append T00:00 to date string going into formatDay.~~
15. ~~Write generic objectSlice() helper function to slice arbitrary sections from API response object. Should be objectSlice(original_object, starting_index, num_elements). It should return new object with same shape & keys, but with sliced sub-arrays for all the properties. Need to use Object.keys() to iterate over array of all the keys and make the slices.~~
16. ~~Change hourly icons when at night. Sun -> star or moon.~~
17. ~~Refactor code with context & reducer~~
18. ~~BUG: can't unpin saved location~~
19. Possibly fix 'blink' effect when chosenLocation is pinned and is removed and added to savedLocations. One way to do this is instead of rendering chosenLocation and savedLocations.toReversed().map() separately, create a new array of metaLocations = savedLocations + chosenLocation and map() this array for rendering. Then pinning chosenLocation will not remove it and add it to metaLocations. Hopefully. Or maybe this won't help since it will still execute async fetch when rendering again... Maybe I can memoize the weather component?

## Future ideas

1. Road-trip weather app that displays predicted weather along a set route. The idea is you are going on a long road trip lasting several hours. The weather you encounter may change dramatically as you traverse the route. The app will display predicted weather in 30 minute? time blocks according to your predicted position along the route at those times. Can set starting time. Will need integration with map & route plotting API.
2. More beautiful weather app with animation showing current & predicted weather over the course of the day. Perhaps a spinning circle-type graphic that shows the sun and moon and stars and clouds rotate through the sky, reliving the past 24 hours of weather events before arriving at the current time. Maybe an hour hand/clock on the outside of the circle. Can also move forwards to show future expected weather.
   1. Maybe reduce this kind of animated-live weather thing into a smaller widget/component that can be embedded into other websites. Have some customization options to reflect your location. Like building styles, or local animals or culture. Urban vs rural. Seasonal variations. Handle everything programmatically with dynamic SVG graphics. Other art styles also possible: pixel art, cartoon, etc.
