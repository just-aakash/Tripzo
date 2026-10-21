const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Destination = require("./src/models/Destination");

dotenv.config();

const destinations = [
  {
    name: "Agra",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",

    description:
      "A historic city famous for the Taj Mahal, Agra Fort and Mughal heritage.",

    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Historical",
      "Culture",
      "Photography",
    ],

    budgetLevel: "medium",

    approximateBudgetPerDay: 2500,

    crowdPreference: "medium",

    latitude: 27.1767,
    longitude: 78.0081,

    popular: true,
  },

  {
    name: "Jaipur",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",

    description:
      "The Pink City known for forts, palaces, markets and Rajasthan's rich culture.",

    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Historical",
      "Culture",
      "Photography",
      "Food",
    ],

    budgetLevel: "medium",

    approximateBudgetPerDay: 3000,

    crowdPreference: "medium",

    latitude: 26.9124,
    longitude: 75.7873,

    popular: true,
  },

  {
    name: "Manali",
    country: "India",
    state: "Himachal Pradesh",
    city: "Manali",

    description:
      "A mountain destination surrounded by the Himalayas, known for nature, adventure and scenic landscapes.",

    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Nature",
      "Adventure",
      "Photography",
    ],

    budgetLevel: "medium",

    approximateBudgetPerDay: 3500,

    crowdPreference: "high",

    latitude: 32.2432,
    longitude: 77.1892,

    popular: true,
  },

  {
    name: "Goa",
    country: "India",
    state: "Goa",
    city: "Goa",

    description:
      "A coastal destination famous for beaches, food, nightlife and Portuguese-influenced culture.",

    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Beaches",
      "Food",
      "Nature",
      "Culture",
    ],

    budgetLevel: "medium",

    approximateBudgetPerDay: 4000,

    crowdPreference: "high",

    latitude: 15.2993,
    longitude: 74.1240,

    popular: true,
  },

  {
    name: "Varanasi",
    country: "India",
    state: "Uttar Pradesh",
    city: "Varanasi",

    description:
      "One of India's oldest cities, known for the Ganges ghats, spirituality and cultural heritage.",

    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Culture",
      "Historical",
      "Photography",
    ],

    budgetLevel: "low",

    approximateBudgetPerDay: 2000,

    crowdPreference: "high",

    latitude: 25.3176,
    longitude: 82.9739,

    popular: true,
  },

  {
    name: "Delhi",
    country: "India",
    state: "Delhi",
    city: "New Delhi",

    description:
      "India's capital offering historic monuments, food, museums, markets and modern attractions.",

    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",

    categories: [
      "Historical",
      "Culture",
      "Food",
      "Photography",
    ],

    budgetLevel: "medium",

    approximateBudgetPerDay: 3000,

    crowdPreference: "high",

    latitude: 28.6139,
    longitude: 77.2090,

    popular: true,
  },
];


async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    await Destination.deleteMany({});

    await Destination.insertMany(destinations);

    console.log(
      `${destinations.length} destinations inserted successfully.`
    );

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");

  } catch (error) {
    console.error(
      "Database seeding failed:",
      error.message
    );

    process.exit(1);
  }
}


seedDatabase();
