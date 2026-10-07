// LorryMitra AI - Open Source Map & Routing Service
// Powered by OpenStreetMap (OSM) & OSRM (Open Source Routing Machine)

/**
 * Known logistics hubs & city coordinate dictionary
 * Fast instant local resolution for Kerala & major Indian transport corridors
 */
const KNOWN_COORDINATES = {
  // Kochi / Ernakulam Corridor
  'kochi': [9.9312, 76.2673],
  'cochin': [9.9312, 76.2673],
  'edayar': [10.0766, 76.3195],
  'ernakulam': [9.9816, 76.2999],
  'kalamassery': [10.0537, 76.3194],
  'aluva': [10.1076, 76.3516],
  'willingdon': [9.9576, 76.2736],
  'vallarpadam': [9.9880, 76.2480],
  'kakkanad': [10.0159, 76.3419],

  // Bengaluru Corridor
  'bengaluru': [12.9716, 77.5946],
  'bangalore': [12.9716, 77.5946],
  'peenya': [13.0285, 77.5197],
  'electronic city': [12.8399, 77.6770],
  'whitefield': [12.9698, 77.7500],
  'bommasandra': [12.8174, 77.6908],
  'hosur': [12.7409, 77.8253],

  // Kozhikode / Malabar Corridor
  'kozhikode': [11.2588, 75.7804],
  'calicut': [11.2588, 75.7804],
  'mavoor': [11.2674, 75.9525],
  'cherootty': [11.2520, 75.7760],
  'feroke': [11.1718, 75.8390],
  'kannur': [11.8745, 75.3704],
  'thalassery': [11.7491, 75.4890],
  'kasaragod': [12.5102, 74.9852],
  'wayanad': [11.6050, 76.0827],
  'kalpetta': [11.6103, 76.0828],
  'malappuram': [11.0732, 76.0740],
  'manjeri': [11.1215, 76.1212],

  // Central Kerala Corridor
  'thrissur': [10.5276, 76.2144],
  'trichur': [10.5276, 76.2144],
  'palakkad': [10.7867, 76.6548],
  'walayar': [10.8243, 76.8530],
  'kottayam': [9.5916, 76.5222],
  'kanjikuzhy': [9.5970, 76.5410],
  'alappuzha': [9.4981, 76.3388],
  'alleppey': [9.4981, 76.3388],
  'cherthala': [9.6845, 76.3340],
  'pathanamthitta': [9.2648, 76.7870],
  'thiruvalla': [9.3835, 76.5741],

  // South Kerala Corridor
  'kollam': [8.8932, 76.6141],
  'quilon': [8.8932, 76.6141],
  'thiruvananthapuram': [8.5241, 76.9366],
  'trivandrum': [8.5241, 76.9366],
  'kazhakkoottam': [8.5686, 76.8731],

  // Tamil Nadu & Karnataka Transport Links
  'coimbatore': [11.0168, 76.9558],
  'salem': [11.6643, 78.1460],
  'erode': [11.3410, 77.7172],
  'madurai': [9.9252, 78.1198],
  'chennai': [13.0827, 80.2707],
  'mangaluru': [12.9141, 74.8560],
  'mangalore': [12.9141, 74.8560],
  'mysuru': [12.2958, 76.6394],
  'mysore': [12.2958, 76.6394],

  // Western India
  'pune': [18.5204, 73.8567],
  'mumbai': [19.0760, 72.8777]
};

// Coordinate cache to avoid duplicate network requests
const geocodeCache = new Map();

/**
 * Resolves latitude and longitude for any location string
 */
export async function resolveLocationCoords(locationStr, detailedAddress = '') {
  const combined = `${locationStr || ''} ${detailedAddress || ''}`.toLowerCase();
  
  if (geocodeCache.has(combined)) {
    return geocodeCache.get(combined);
  }

  // 1. Instant check against local transport nodes dictionary
  for (const [key, coords] of Object.entries(KNOWN_COORDINATES)) {
    if (combined.includes(key)) {
      geocodeCache.set(combined, coords);
      return coords;
    }
  }

  // 2. Nominatim OpenStreetMap Geocoding Fallback
  try {
    const cleanQuery = (locationStr || detailedAddress || 'Kerala')
      .replace(/[^\w\s,]/gi, ' ')
      .trim();

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(cleanQuery + ', India')}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        geocodeCache.set(combined, coords);
        return coords;
      }
    }
  } catch (err) {
    console.warn('Nominatim geocode note:', err.message);
  }

  // Default fallback: Central Kerala coordinates
  const fallback = [10.0261, 76.3125];
  geocodeCache.set(combined, fallback);
  return fallback;
}

/**
 * Fetches turn-by-turn road route from Open Source Routing Machine (OSRM)
 */
export async function fetchOSRMRoute(originCoords, destCoords) {
  const [lat1, lon1] = originCoords;
  const [lat2, lon2] = destCoords;

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      if (data.code === 'Ok' && data.routes?.[0]) {
        const route = data.routes[0];
        // OSRM returns [lon, lat], Leaflet expects [lat, lon]
        const latLngs = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        
        const distanceKm = Math.round(route.distance / 1000);
        const hours = (route.duration / 3600);
        const hrs = Math.floor(hours);
        const mins = Math.round((hours - hrs) * 60);
        const durationText = hrs > 0 ? `${hrs} hrs ${mins} mins` : `${mins} mins`;

        return {
          success: true,
          coordinates: latLngs,
          distanceKm,
          durationText,
          provider: 'OSRM (Open Source Routing Machine)'
        };
      }
    }
  } catch (e) {
    console.warn('OSRM network note, generating interpolated road path:', e.message);
  }

  // Fallback: Generate smooth interpolated road route with mid-point highway nodes
  return generateInterpolatedRoute(originCoords, destCoords);
}

/**
 * Fallback curved route generator if OSRM is offline or blocked
 */
function generateInterpolatedRoute(origin, dest) {
  const [lat1, lon1] = origin;
  const [lat2, lon2] = dest;

  const points = [];
  const steps = 40;

  // Midpoint with natural road curvature
  const midLat = (lat1 + lat2) / 2;
  const midLon = (lon1 + lon2) / 2;
  const curvature = 0.08 * (lon2 - lon1 > 0 ? 1 : -1);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bezier curve simulation
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * (midLat + curvature) + t * t * lat2;
    const lon = (1 - t) * (1 - t) * lon1 + 2 * (1 - t) * t * (midLon - curvature * 0.5) + t * t * lon2;
    points.push([lat, lon]);
  }

  // Calculate approximate distance
  const R = 6371; // Earth radius km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;
  const distanceKm = Math.round(straightKm * 1.25); // Road winding factor ~1.25
  const hours = (distanceKm / 55); // ~55 km/h truck average
  const hrs = Math.floor(hours);
  const mins = Math.round((hours - hrs) * 60);

  return {
    success: true,
    coordinates: points,
    distanceKm,
    durationText: `${hrs} hrs ${mins} mins`,
    provider: 'LorryMitra Open Highway Path'
  };
}
