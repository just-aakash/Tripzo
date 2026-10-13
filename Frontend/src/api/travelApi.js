const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

const WIKIPEDIA_API =
  "https://en.wikipedia.org/w/api.php";


/* ---------------------------------------
   SEARCH LOCATIONS
--------------------------------------- */

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const url =
    `${GEOCODING_API}?name=${encodeURIComponent(query)}` +
    `&count=8` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const data = await response.json();

  return data.results || [];
}


/* ---------------------------------------
   WEATHER
--------------------------------------- */

export async function getWeather(latitude, longitude) {
  const url =
    `${WEATHER_API}?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
    `&timezone=auto` +
    `&forecast_days=7`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  return response.json();
}


/* ---------------------------------------
   WIKIPEDIA SEARCH
--------------------------------------- */

export async function searchWikipedia(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: "5",
    prop: "coordinates|pageimages|extracts|info",
    exintro: "1",
    explaintext: "1",
    exsentences: "4",
    inprop: "url",
    piprop: "thumbnail",
    pithumbsize: "1200",
    format: "json",
    origin: "*",
  });

  const response = await fetch(
    `${WIKIPEDIA_API}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Wikipedia search failed");
  }

  const data = await response.json();

  if (!data.query?.pages) {
    return [];
  }

  return Object.values(data.query.pages);
}


/* ---------------------------------------
   NEARBY ATTRACTIONS
--------------------------------------- */

export async function getNearbyAttractions(
  latitude,
  longitude
) {
  const params = new URLSearchParams({
    action: "query",
    generator: "geosearch",
    ggscoord: `${latitude}|${longitude}`,
    ggsradius: "10000",
    ggslimit: "12",
    ggsnamespace: "0",

    prop: "coordinates|pageimages|extracts|info",

    exintro: "1",
    explaintext: "1",
    exsentences: "2",

    piprop: "thumbnail",
    pithumbsize: "800",

    inprop: "url",

    format: "json",
    origin: "*",
  });

  const response = await fetch(
    `${WIKIPEDIA_API}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Attraction search failed");
  }

  const data = await response.json();

  if (!data.query?.pages) {
    return [];
  }

  return Object.values(data.query.pages);
}


/* ---------------------------------------
   COMPLETE DESTINATION DATA
--------------------------------------- */

export async function getDestinationData(location) {
  const latitude = location.latitude;
  const longitude = location.longitude;

  const [weather, nearby] = await Promise.all([
    getWeather(latitude, longitude),
    getNearbyAttractions(latitude, longitude),
  ]);

  const wikipediaResults = await searchWikipedia(
    `${location.name} ${location.country || ""}`
  );

  const mainWiki =
    wikipediaResults.find(
      (item) =>
        item.thumbnail ||
        item.extract ||
        item.coordinates
    ) || wikipediaResults[0];

  return {
    location,
    weather,
    nearby,
    wikipedia: mainWiki || null,
  };
}
