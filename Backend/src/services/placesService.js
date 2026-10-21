const axios = require("axios");

// ==========================================
// OVERPASS SERVERS
// ==========================================

const OVERPASS_SERVERS = [
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass-api.de/api/interpreter",
];

// ==========================================
// GET NEARBY PLACES
// ==========================================

const getNearbyPlaces = async (
  latitude,
  longitude,
  radius = 2000
) => {
  const query = `
    [out:json][timeout:30];

    (
      nwr
        ["amenity"~"hospital|pharmacy|atm|restaurant|parking|police"]
        ["name"]
        (around:${radius},${latitude},${longitude});

      nwr
        ["tourism"~"attraction|museum|viewpoint"]
        ["name"]
        (around:${radius},${latitude},${longitude});
    );

    out center tags 200;
  `;

  // ========================================
  // TRY EACH SERVER
  // ========================================

  for (
    let i = 0;
    i < OVERPASS_SERVERS.length;
    i++
  ) {
    const server =
      OVERPASS_SERVERS[i];

    try {
      console.log(
        `Trying Overpass server ${i + 1}/${OVERPASS_SERVERS.length}:`,
        server
      );

      const response =
        await axios.post(
          server,
          `data=${encodeURIComponent(query)}`,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",

              "User-Agent":
                "TravelMate/1.0 (college tourism project)",
            },

            timeout: 40000,
          }
        );

      const elements =
        response.data?.elements || [];

      console.log(
        `Overpass server succeeded. Places received: ${elements.length}`
      );

      // ====================================
      // CONVERT OSM DATA
      // ====================================

      const places =
        elements
          .map((element) => {
            const tags =
              element.tags || {};

            const placeLatitude =
              element.lat ??
              element.center?.lat;

            const placeLongitude =
              element.lon ??
              element.center?.lon;

            if (
              placeLatitude == null ||
              placeLongitude == null
            ) {
              return null;
            }

            const type =
              getPlaceType(tags);

            return {
              // --------------------------------
              // Basic identity
              // --------------------------------

              id:
                `${element.type}-${element.id}`,

              name:
                tags.name ||
                "Unnamed place",

              type,

              // --------------------------------
              // Coordinates
              // --------------------------------

              latitude:
                placeLatitude,

              longitude:
                placeLongitude,

              // --------------------------------
              // Address
              // --------------------------------

              address:
                tags["addr:street"] ||
                "",

              city:
                tags["addr:city"] ||
                "",

              // --------------------------------
              // Contact information
              // --------------------------------

              phone:
                tags.phone ||
                tags["contact:phone"] ||
                "",

              website:
                tags.website ||
                tags["contact:website"] ||
                "",

              // --------------------------------
              // Opening hours
              // --------------------------------

              openingHours:
                tags.opening_hours ||
                "",

              // --------------------------------
              // PRICING INFORMATION
              // --------------------------------

              fee:
                parseFee(tags.fee),

              feeDetails:
                tags.fee ||
                "",

              price:
                parsePrice(tags),

              currency:
                tags.currency ||
                "",

              // --------------------------------
              // Category
              // --------------------------------

              category:
                getPlaceCategory(
                  type,
                  tags
                ),

              // --------------------------------
              // Useful OSM information
              // --------------------------------

              osmTags: {
                amenity:
                  tags.amenity ||
                  "",

                tourism:
                  tags.tourism ||
                  "",

                attraction:
                  tags.attraction ||
                  "",

                cuisine:
                  tags.cuisine ||
                  "",

                wheelchair:
                  tags.wheelchair ||
                  "",

                access:
                  tags.access ||
                  "",

                website:
                  tags.website ||
                  tags["contact:website"] ||
                  "",
              },

              // --------------------------------
              // Distance
              // --------------------------------

              distance:
                calculateDistance(
                  latitude,
                  longitude,
                  placeLatitude,
                  placeLongitude
                ),
            };
          })
          .filter(Boolean);

      // ====================================
      // SORT BY DISTANCE
      // ====================================

      places.sort(
        (a, b) =>
          a.distance - b.distance
      );

      return places;
    } catch (error) {
      console.error(
        `Overpass server ${i + 1} failed:`
      );

      console.error(
        error.response?.data ||
        error.message
      );

      console.log(
        "Trying next Overpass server..."
      );
    }
  }

  // ========================================
  // ALL SERVERS FAILED
  // ========================================

  throw new Error(
    "All Overpass servers failed"
  );
};

// ==========================================
// GET PLACE TYPE
// ==========================================

const getPlaceType = (tags) => {
  if (tags.amenity) {
    switch (tags.amenity) {
      case "hospital":
        return "hospital";

      case "pharmacy":
        return "pharmacy";

      case "atm":
        return "atm";

      case "restaurant":
        return "restaurant";

      case "parking":
        return "parking";

      case "police":
        return "police";

      default:
        return tags.amenity;
    }
  }

  if (tags.tourism) {
    switch (tags.tourism) {
      case "attraction":
        return "attraction";

      case "museum":
        return "museum";

      case "viewpoint":
        return "viewpoint";

      default:
        return tags.tourism;
    }
  }

  return "other";
};

// ==========================================
// GET PLACE CATEGORY
// ==========================================

const getPlaceCategory = (
  type,
  tags
) => {
  // Food
  if (type === "restaurant") {
    return "food";
  }

  // Tourist attractions
  if (
    type === "attraction" ||
    type === "museum" ||
    type === "viewpoint"
  ) {
    return "attraction";
  }

  // Transport
  if (type === "parking") {
    return "transport";
  }

  // Tourist essentials
  if (
    type === "hospital" ||
    type === "pharmacy" ||
    type === "police" ||
    type === "atm"
  ) {
    return "essential";
  }

  return "other";
};

// ==========================================
// PARSE OSM FEE
// ==========================================

const parseFee = (fee) => {
  if (!fee) {
    return null;
  }

  const normalized =
    String(fee)
      .trim()
      .toLowerCase();

  if (
    normalized === "yes" ||
    normalized === "true"
  ) {
    return true;
  }

  if (
    normalized === "no" ||
    normalized === "false" ||
    normalized === "free"
  ) {
    return false;
  }

  /*
    Some OSM entries may contain something like:

    "₹100"
    "100 INR"
    "10 EUR"
    "yes"

    We don't convert the text here.
    We preserve it separately in feeDetails.
  */

  return null;
};

// ==========================================
// PARSE PRICE
// ==========================================

const parsePrice = (tags) => {
  /*
    OSM contributors may store pricing information
    in different fields.

    We check several common possibilities.
  */

  const possiblePrices = [
    tags.price,
    tags["charge"],
    tags["fee"],
  ];

  for (
    const value of possiblePrices
  ) {
    if (!value) {
      continue;
    }

    const text =
      String(value).trim();

    /*
      Extract the first numeric value.

      Examples:

      "₹100"       → 100
      "100 INR"    → 100
      "50-100 INR" → 50
    */

    const match =
      text.match(
        /(\d+(?:\.\d+)?)/
      );

    if (match) {
      const number =
        Number(match[1]);

      if (
        Number.isFinite(number)
      ) {
        return number;
      }
    }
  }

  return null;
};

// ==========================================
// CALCULATE DISTANCE
// ==========================================

const calculateDistance = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  const earthRadius = 6371;

  const latDifference =
    toRadians(
      lat2 - lat1
    );

  const lonDifference =
    toRadians(
      lon2 - lon1
    );

  const a =
    Math.sin(
      latDifference / 2
    ) ** 2 +

    Math.cos(
      toRadians(lat1)
    ) *

    Math.cos(
      toRadians(lat2)
    ) *

    Math.sin(
      lonDifference / 2
    ) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Number(
    (
      earthRadius * c
    ).toFixed(2)
  );
};

// ==========================================
// DEGREES → RADIANS
// ==========================================

const toRadians = (
  degrees
) => {
  return (
    degrees * Math.PI
  ) / 180;
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getNearbyPlaces,
};
