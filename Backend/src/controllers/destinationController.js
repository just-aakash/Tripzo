const Destination = require("../models/Destination");

const {
  searchPlaces,
} = require("../services/geocodingService");


// ======================================================
// ESTIMATE BUDGET FOR A DESTINATION
// ======================================================

const getEstimatedBudgetPerDay = (
  country,
  state
) => {
  const normalizedCountry =
    (country || "").toLowerCase();

  // ----------------------------------------------------
  // INDIA
  // ----------------------------------------------------

  if (
    normalizedCountry.includes("india")
  ) {
    const normalizedState =
      (state || "").toLowerCase();

    // More expensive / major Indian travel regions
    if (
      normalizedState.includes("goa") ||
      normalizedState.includes("maharashtra") ||
      normalizedState.includes("delhi") ||
      normalizedState.includes("karnataka")
    ) {
      return 3000;
    }

    // General Indian destination
    return 2500;
  }


  // ----------------------------------------------------
  // JAPAN
  // ----------------------------------------------------

  if (
    normalizedCountry.includes("japan")
  ) {
    return 7000;
  }


  // ----------------------------------------------------
  // UNITED STATES
  // ----------------------------------------------------

  if (
    normalizedCountry.includes(
      "united states"
    )
  ) {
    return 12000;
  }


  // ----------------------------------------------------
  // UNITED KINGDOM
  // ----------------------------------------------------

  if (
    normalizedCountry.includes(
      "united kingdom"
    )
  ) {
    return 10000;
  }


  // ----------------------------------------------------
  // EUROPE
  // ----------------------------------------------------

  if (
    normalizedCountry.includes("france") ||
    normalizedCountry.includes("italy") ||
    normalizedCountry.includes("germany") ||
    normalizedCountry.includes("spain")
  ) {
    return 9000;
  }


  // ----------------------------------------------------
  // GENERAL INTERNATIONAL DESTINATION
  // ----------------------------------------------------

  return 6000;
};


// ======================================================
// REPAIR DESTINATION BUDGET
// ======================================================
//
// This is important for destinations that were already
// stored in MongoDB with approximateBudgetPerDay = 0.
//
// Example:
//
// Mumbai already exists
// approximateBudgetPerDay = 0
//
// This function changes it to:
//
// Mumbai
// approximateBudgetPerDay = 3000
//
// ======================================================

const repairDestinationBudget = async (
  destination
) => {
  if (
    !destination
  ) {
    return destination;
  }

  if (
    !destination.approximateBudgetPerDay ||
    destination.approximateBudgetPerDay <= 0
  ) {
    destination.approximateBudgetPerDay =
      getEstimatedBudgetPerDay(
        destination.country,
        destination.state
      );

    await destination.save();
  }

  return destination;
};


// ======================================================
// SEARCH DESTINATIONS
// GET /api/destinations/search?q=agra
// ======================================================

const searchDestinations = async (
  req,
  res
) => {
  try {
    const { q } = req.query;


    // --------------------------------------------------
    // VALIDATE SEARCH
    // --------------------------------------------------

    if (
      !q ||
      !q.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a search query.",
      });
    }


    const searchTerm =
      q.trim();


    // --------------------------------------------------
    // SEARCH MONGODB
    // --------------------------------------------------

    const destinations =
      await Destination.find({
        $or: [
          {
            name: {
              $regex: searchTerm,
              $options: "i",
            },
          },

          {
            city: {
              $regex: searchTerm,
              $options: "i",
            },
          },

          {
            state: {
              $regex: searchTerm,
              $options: "i",
            },
          },

          {
            country: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ],
      })
        .limit(20)
        .sort({
          popular: -1,
          name: 1,
        });


    // --------------------------------------------------
    // IMPORTANT:
    // REPAIR OLD DESTINATIONS WITH ₹0
    // --------------------------------------------------

    for (
      const destination of destinations
    ) {
      await repairDestinationBudget(
        destination
      );
    }


    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return res.json({
      success: true,
      count: destinations.length,
      destinations,
    });

  } catch (error) {

    console.error(
      "Destination search error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while searching destinations.",
    });
  }
};


// ======================================================
// GET ALL DESTINATIONS
// GET /api/destinations
// ======================================================

const getAllDestinations = async (
  req,
  res
) => {
  try {

    const destinations =
      await Destination.find()
        .sort({
          popular: -1,
          name: 1,
        });


    // --------------------------------------------------
    // REPAIR OLD DESTINATIONS WITH ₹0
    // --------------------------------------------------

    for (
      const destination of destinations
    ) {
      await repairDestinationBudget(
        destination
      );
    }


    return res.json({
      success: true,
      count: destinations.length,
      destinations,
    });

  } catch (error) {

    console.error(
      "Get destinations error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching destinations.",
    });
  }
};


// ======================================================
// GET SINGLE DESTINATION
// GET /api/destinations/:id
// ======================================================

const getDestinationById = async (
  req,
  res
) => {
  try {

    const { id } =
      req.params;


    const destination =
      await Destination.findById(id);


    if (!destination) {
      return res.status(404).json({
        success: false,
        message:
          "Destination not found.",
      });
    }


    // --------------------------------------------------
    // REPAIR OLD DESTINATION WITH ₹0
    // --------------------------------------------------

    await repairDestinationBudget(
      destination
    );


    return res.json({
      success: true,
      destination,
    });

  } catch (error) {

    console.error(
      "Get destination error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching destination.",
    });
  }
};


// ======================================================
// DISCOVER DESTINATION
// GET /api/destinations/discover?q=kyoto
// ======================================================

const discoverDestination = async (
  req,
  res
) => {
  try {

    const { q } =
      req.query;


    // --------------------------------------------------
    // VALIDATE QUERY
    // --------------------------------------------------

    if (
      !q ||
      !q.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Search query is required.",
      });
    }


    const query =
      q.trim();


    if (
      query.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Search query must contain at least 2 characters.",
      });
    }


    // --------------------------------------------------
    // SEARCH EXTERNAL GEOCODING SERVICE
    // --------------------------------------------------

    const results =
      await searchPlaces(
        query
      );


    const discoveredDestinations =
      [];


    // --------------------------------------------------
    // PROCESS RESULTS
    // --------------------------------------------------

    for (
      const place of results
    ) {

      const address =
        place.address || {};


      const name =
        address.city ||
        address.town ||
        address.municipality ||
        address.village ||
        place.name;


      // Skip invalid places
      if (
        !name ||
        !place.lat ||
        !place.lon
      ) {
        continue;
      }


      const osmType =
        place.osm_type;

      const osmId =
        String(
          place.osm_id
        );


      // ------------------------------------------------
      // CHECK IF ALREADY EXISTS
      // ------------------------------------------------

      let destination =
        await Destination.findOne({
          source:
            "openstreetmap",

          osmType,

          osmId,
        });


      // ------------------------------------------------
      // CREATE NEW DESTINATION
      // ------------------------------------------------

      if (!destination) {

        destination =
          await Destination.create({

            name,

            country:
              address.country ||
              "",

            state:
              address.state ||
              address.region ||
              "",

            city:
              address.city ||
              address.town ||
              address.municipality ||
              address.village ||
              "",

            description:
              `Explore ${name} with TravelMate.`,

            image:
              "",

            categories: [
              "travel",
              "destination",
            ],

            budgetLevel:
              "medium",

            approximateBudgetPerDay:
              getEstimatedBudgetPerDay(
                address.country,
                address.state
              ),

            crowdPreference:
              "medium",

            latitude:
              Number(
                place.lat
              ),

            longitude:
              Number(
                place.lon
              ),

            popular:
              false,

            source:
              "openstreetmap",

            osmType,

            osmId,
          });

      } else {

        // ----------------------------------------------
        // REPAIR EXISTING DISCOVERED DESTINATION
        // ----------------------------------------------

        await repairDestinationBudget(
          destination
        );
      }


      // ------------------------------------------------
      // ADD TO RESULTS
      // ------------------------------------------------

      discoveredDestinations.push(
        destination
      );
    }


    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      count:
        discoveredDestinations.length,
      destinations:
        discoveredDestinations,
    });

  } catch (error) {

    console.error(
      "Discover destination error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to discover destinations.",
    });
  }
};


// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  searchDestinations,
  getAllDestinations,
  getDestinationById,
  discoverDestination,
};
