// Mock POI (Points of Interest) Data for Tirunelveli
export const mockPOIs = [
  {
    id: "nellaiappar",
    name: "Nellaiappar Temple",
    category: "temple",
    description: "Ancient Shiva temple with stunning Dravidian architecture, musical pillars, and intricate carvings. One of the most significant temples in Tamil Nadu.",
    longDescription: "The Nellaiappar Temple is a historic Hindu temple dedicated to Lord Shiva, located in the heart of Tirunelveli. Built during the Pandyan period, this architectural marvel features towering gopurams, musical pillars that produce melodious sounds when tapped, and exquisite stone carvings depicting various mythological scenes.",
    coordinates: [77.6874, 8.7139],
    distance: "2.5 km",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
    ],
    arModel: "/models/nellaiappar-temple.glb",
    openingHours: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    entryFee: "Free",
    history: "Built in the 7th century by the Pandyan kings, expanded by Nayak rulers in the 16th century.",
    festivals: [
      { name: "Aani Thirumanjanam", date: "June-July" },
      { name: "Aavani Moolam", date: "August-September" }
    ],
    nearbyPOIs: [2, 4]
  },
  {
    id: "courtallam",
    name: "Courtallam Waterfalls",
    category: "nature",
    description: "Majestic waterfalls known as the 'Spa of South India'. Crystal clear waters cascading from Western Ghats with medicinal properties.",
    longDescription: "Courtallam, also known as Kutralam, is a stunning waterfall destination nestled in the Western Ghats. The water is believed to have medicinal properties due to the herbs it flows through. With nine different falls, each offering a unique experience, it's a paradise for nature lovers.",
    coordinates: [77.2833, 8.9167],
    distance: "45 km",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800"
    ],
    arModel: "/models/courtallam-falls.glb",
    openingHours: "6:00 AM - 6:00 PM",
    entryFee: "₹20 per person",
    history: "Mentioned in ancient Tamil literature, visited by kings and poets for centuries.",
    bestSeason: "June to September (monsoon)",
    nearbyPOIs: [3, 5]
  },
  {
    id: "papanasam",
    name: "Papanasam Dam",
    category: "nature",
    description: "Scenic dam surrounded by lush forests and hills. Perfect spot for picnics and nature photography.",
    longDescription: "Papanasam Dam is built across the Manimuthar River in the Western Ghats. The serene reservoir is surrounded by dense forests and offers breathtaking views of the mountains. It's a popular spot for weekend getaways and nature enthusiasts.",
    coordinates: [77.3167, 8.7833],
    distance: "50 km",
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800"
    ],
    arModel: "/models/papanasam-dam.glb",
    openingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free",
    activities: ["Boating", "Photography", "Picnic"],
    nearbyPOIs: [2]
  },
  {
    id: "halwa",
    name: "Tirunelveli Halwa Shops",
    category: "food",
    description: "Famous sweet shops serving authentic Tirunelveli Halwa made with pure ghee and wheat. A must-try delicacy!",
    longDescription: "Tirunelveli is renowned for its unique wheat halwa, a sweet delicacy made with pure ghee, wheat, sugar, and cashews. The secret recipe has been passed down through generations. The most famous shops are located near the Nellaiappar Temple.",
    coordinates: [77.6890, 8.7150],
    distance: "2 km",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800"
    ],
    openingHours: "8:00 AM - 10:00 PM",
    specialties: ["Wheat Halwa", "Ghee Halwa", "Cashew Halwa"],
    nearbyPOIs: [1]
  },
  // {
  //   id: 5,
  //   name: "Manimuthar Falls",
  //   category: "nature",
  //   description: "Hidden gem waterfall accessible through trekking. Pristine natural beauty and adventure combined.",
  //   longDescription: "Manimuthar Falls is a lesser-known but spectacular waterfall requiring a moderate trek through dense forests. The journey itself is an adventure, and the reward is a stunning cascade in an untouched natural setting.",
  //   coordinates: [77.3500, 8.8000],
  //   distance: "55 km",
  //   rating: 4.6,
  //   images: [
  //     "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
  //     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
  //   ],
  //   arModel: "/models/manimuthar-falls.glb",
  //   openingHours: "7:00 AM - 5:00 PM",
  //   difficulty: "Moderate trek (2 hours)",
  //   nearbyPOIs: [2, 3]
  // },
  // {
  //   id: 6,
  //   name: "Krishnapuram Venkatachalapathy Temple",
  //   category: "temple",
  //   description: "Beautiful Vishnu temple with exquisite architecture and peaceful atmosphere.",
  //   longDescription: "This ancient temple dedicated to Lord Vishnu showcases classic Dravidian architecture. The temple is known for its serene ambiance and beautiful sculptures.",
  //   coordinates: [77.7200, 8.7300],
  //   distance: "8 km",
  //   rating: 4.4,
  //   images: [
  //     "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800"
  //   ],
  //   arModel: "/models/krishnapuram-temple.glb",
  //   openingHours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
  //   entryFee: "Free",
  //   nearbyPOIs: [1]
  // },
  // {
  //   id: 7,
  //   name: "Thamirabarani River",
  //   category: "nature",
  //   description: "Sacred river flowing through Tirunelveli, perfect for riverside walks and spiritual experiences.",
  //   longDescription: "The Thamirabarani is one of the few perennial rivers in Tamil Nadu. It's considered sacred and plays a vital role in the region's agriculture and culture.",
  //   coordinates: [77.6950, 8.7200],
  //   distance: "3 km",
  //   rating: 4.3,
  //   images: [
  //     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  //   ],
  //   openingHours: "Open 24/7",
  //   activities: ["Riverside walks", "Photography", "Spiritual rituals"],
  //   nearbyPOIs: [1, 4]
  // },
  // {
  //   id: 8,
  //   name: "Tirunelveli Market",
  //   category: "food",
  //   description: "Vibrant local market offering fresh produce, spices, and traditional Tamil Nadu handicrafts.",
  //   longDescription: "Experience the authentic local culture at Tirunelveli's bustling market. From fresh vegetables and exotic spices to traditional handicrafts and textiles, this market is a sensory delight.",
  //   coordinates: [77.6920, 8.7180],
  //   distance: "2.8 km",
  //   rating: 4.2,
  //   images: [
  //     "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
  //   ],
  //   openingHours: "6:00 AM - 9:00 PM",
  //   specialties: ["Spices", "Textiles", "Handicrafts", "Fresh Produce"],
  //   nearbyPOIs: [1, 4]
  // }
];

// Category colors for UI
export const categoryColors = {
  temple: {
    bg: "rgba(124, 58, 237, 0.2)",
    border: "#7C3AED",
    text: "#A78BFA"
  },
  nature: {
    bg: "rgba(0, 187, 212, 0.2)",
    border: "#00BBD4",
    text: "#26C6DA"
  },
  food: {
    bg: "rgba(255, 193, 7, 0.2)",
    border: "#FFC107",
    text: "#FFD54F"
  },
  history: {
    bg: "rgba(156, 39, 176, 0.2)",
    border: "#9C27B0",
    text: "#BA68C8"
  }
};

// Get POI by ID
export const getPOIById = (id) => {
  return mockPOIs.find(poi => String(poi.id) === String(id));
};

// Get POIs by category
export const getPOIsByCategory = (category) => {
  if (category === 'all') return mockPOIs;
  return mockPOIs.filter(poi => poi.category === category);
};

// Get nearby POIs
export const getNearbyPOIs = (poiId) => {
  const poi = getPOIById(poiId);
  if (!poi || !poi.nearbyPOIs) return [];
  return poi.nearbyPOIs.map(id => getPOIById(id)).filter(Boolean);
};
