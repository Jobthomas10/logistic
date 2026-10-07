import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation, 
  MapPin, 
  Truck, 
  ExternalLink, 
  Maximize2, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Compass,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { resolveLocationCoords, fetchOSRMRoute } from '../services/mapService';

export function RouteMap({ doc, t, lang, height = "h-[440px]" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({
    markers: [],
    polylines: []
  });

  const [loading, setLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState({
    distanceKm: doc?.distanceKm || 0,
    durationText: doc?.approxDrivingTime || 'Calculating...',
    provider: 'OpenStreetMap & OSRM'
  });
  const [activeTileType, setActiveTileType] = useState('osm'); // 'osm' | 'voyager'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map instance already exists
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [10.8505, 76.2711], // Kerala center
        zoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors • <a href="https://project-osrm.org/" target="_blank">OSRM</a>')
        .addTo(map);

      // OpenStreetMap Base Tiles
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      });

      osmLayer.addTo(map);
      mapInstanceRef.current = map;
      mapInstanceRef.current._tileLayer = osmLayer;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Route and Markers when active document changes
  useEffect(() => {
    if (!mapInstanceRef.current || !doc) return;

    let isMounted = true;
    setLoading(true);

    async function loadRoute() {
      try {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear existing markers and lines
        layersRef.current.markers.forEach(m => m.remove());
        layersRef.current.polylines.forEach(p => p.remove());
        layersRef.current.markers = [];
        layersRef.current.polylines = [];

        // 1. Resolve Pickup & Delivery Coordinates
        const originCoords = await resolveLocationCoords(doc.pickupLocation, doc.pickupDetailedAddress);
        const destCoords = await resolveLocationCoords(doc.deliveryLocation, doc.deliveryDetailedAddress);

        if (!isMounted) return;

        // 2. Fetch OSRM Road Highway Route
        const route = await fetchOSRMRoute(originCoords, destCoords);

        if (!isMounted) return;

        setRouteInfo({
          distanceKm: route.distanceKm || doc.distanceKm || 0,
          durationText: route.durationText || doc.approxDrivingTime || 'N/A',
          provider: route.provider
        });

        // 3. Create Custom Leaflet SVG DivIcons
        
        // Origin Pin (Green with Pulsing Halo)
        const originIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping"></div>
              <div class="relative w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-extrabold text-xs">
                A
              </div>
              <div class="absolute -bottom-6 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow whitespace-nowrap border border-slate-700">
                ${(doc.pickupLocation || 'Origin').split(',')[0]}
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        // Destination Pin (Vibrant Indigo / Red Flag)
        const destIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="relative w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-extrabold text-xs">
                B
              </div>
              <div class="absolute -bottom-6 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow whitespace-nowrap border border-slate-700">
                ${(doc.deliveryLocation || 'Destination').split(',')[0]}
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        // Add Markers to Map
        const originMarker = L.marker(originCoords, { icon: originIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4; color: #0f172a; padding: 4px;">
              <strong style="color: #059669; font-size: 13px;">📍 ORIGIN (പിക്കപ്പ്)</strong><br/>
              <b>${doc.consignor || 'Sender'}</b><br/>
              <span>${doc.pickupDetailedAddress || doc.pickupLocation}</span>
            </div>
          `);

        const destMarker = L.marker(destCoords, { icon: destIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4; color: #0f172a; padding: 4px;">
              <strong style="color: #e11d48; font-size: 13px;">🎯 DESTINATION (ഡ്രോപ്പ്)</strong><br/>
              <b>${doc.consignee || 'Receiver'}</b><br/>
              <span>${doc.deliveryDetailedAddress || doc.deliveryLocation}</span>
            </div>
          `);

        layersRef.current.markers.push(originMarker, destMarker);

        // 4. Render Highway Polyline (Casing + Core Road Line)
        if (route.coordinates && route.coordinates.length > 0) {
          // Glow / Shadow underlay
          const shadowLine = L.polyline(route.coordinates, {
            color: '#1e3a8a',
            weight: 8,
            opacity: 0.35,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(map);

          // Vibrant logistics blue route
          const mainLine = L.polyline(route.coordinates, {
            color: '#2563eb',
            weight: 5,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(map);

          layersRef.current.polylines.push(shadowLine, mainLine);

          // Add Truck Progress Marker at ~40% along the route
          const midIdx = Math.floor(route.coordinates.length * 0.42);
          const truckCoords = route.coordinates[midIdx] || originCoords;

          const truckIcon = L.divIcon({
            className: 'custom-truck-marker',
            html: `
              <div class="relative flex items-center justify-center group cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl border-2 border-slate-900 animate-bounce-gentle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5.2a2 2 0 0 0-.59-1.42l-3.2-3.17A2 2 0 0 0 16.8 7H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
                  </svg>
                </div>
                <div class="absolute -top-7 bg-slate-900 text-amber-300 font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow border border-amber-400/40 whitespace-nowrap">
                  ${doc.vehicleNumber}
                </div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });

          const truckMarker = L.marker(truckCoords, { icon: truckIcon })
            .addTo(map)
            .bindPopup(`
              <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 4px;">
                <strong style="color: #d97706;">🚛 വാഹനം യാത്രയിൽ (In Transit)</strong><br/>
                <b>${doc.vehicleNumber}</b><br/>
                <span>ചരക്ക്: ${doc.cargoDescription?.split('(')[0]}</span><br/>
                <span style="color: #64748b; font-size: 11px;">റൂട്ട്: NH 544 ഇടപ്പള്ളി - സേലം - ബെംഗളൂരു</span>
              </div>
            `);

          layersRef.current.markers.push(truckMarker);

          // 5. Fit bounds to contain both points and the route nicely
          const bounds = L.latLngBounds(route.coordinates);
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        } else {
          // If no route line, fit between origin & destination
          const bounds = L.latLngBounds([originCoords, destCoords]);
          map.fitBounds(bounds, { padding: [60, 60] });
        }

        setLoading(false);
      } catch (err) {
        console.warn('Map route update exception:', err);
        setLoading(false);
      }
    }

    loadRoute();

    return () => {
      isMounted = false;
    };
  }, [doc?.id, doc?.pickupLocation, doc?.deliveryLocation]);

  // Recenter handler
  const handleRecenter = () => {
    if (!mapInstanceRef.current || layersRef.current.polylines.length === 0) return;
    const polyline = layersRef.current.polylines[0];
    if (polyline) {
      mapInstanceRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  };

  // External Map Links
  const originStr = encodeURIComponent(doc?.pickupDetailedAddress || doc?.pickupLocation || 'Kochi');
  const destStr = encodeURIComponent(doc?.deliveryDetailedAddress || doc?.deliveryLocation || 'Bengaluru');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}`;
  const osmUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${encodeURIComponent(doc?.pickupLocation || '')}%3B${encodeURIComponent(doc?.deliveryLocation || '')}`;

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 card-shadow overflow-hidden relative flex flex-col transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl h-[calc(100vh-2rem)]' : ''
    }`}>
      
      {/* Top Header & Route Control Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/40 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 shadow-inner">
            <Compass className="w-5 h-5 text-blue-300 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                OpenStreetMap Route
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white font-ml flex items-center space-x-2">
              <span>{doc.pickupLocation?.split(',')[0]}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span>{doc.deliveryLocation?.split(',')[0]}</span>
            </h3>
          </div>
        </div>

        {/* Route Stats & Action Buttons */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {/* Distance & Time pill */}
          <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold text-white flex items-center space-x-2">
            <Navigation className="w-3.5 h-3.5 text-blue-300" />
            <span>~{routeInfo.distanceKm} km</span>
            <span className="text-white/40">•</span>
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{routeInfo.durationText}</span>
          </div>

          {/* Recenter button */}
          <button
            onClick={handleRecenter}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all text-xs"
            title="Recenter Route"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* OpenStreetMap Direct Link */}
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-all text-xs flex items-center space-x-1 border border-emerald-500/30"
            title="Open in OpenStreetMap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[11px]">OSM</span>
          </a>

          {/* Google Maps External Navigation */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all text-xs flex items-center space-x-1 shadow-sm"
            title="Open in Google Maps"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-ml text-xs">Maps</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all text-xs"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Leaflet Map Surface */}
      <div className="relative flex-1 min-h-[360px] w-full">
        <div 
          ref={mapContainerRef} 
          className={`w-full ${isFullscreen ? 'h-full' : height} z-0`}
        />

        {/* Loading Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-10">
            <div className="p-4 rounded-2xl bg-white shadow-xl flex items-center space-x-3 text-slate-800 text-xs font-bold font-ml">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>ഓപ്പൺസ്ട്രീറ്റ് മാപ്പിൽ റൂട്ട് കണക്കാക്കുന്നു...</span>
            </div>
          </div>
        )}

        {/* Floating Route Legend & Vehicle Status Overlay */}
        <div className="absolute bottom-4 left-4 z-10 max-w-sm w-auto hidden sm:block">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 shadow-xl space-y-2 text-xs">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span className="font-mono font-bold text-amber-400">{doc.vehicleNumber}</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                In Transit (യാത്രയിൽ)
              </span>
            </div>

            <div className="text-[11px] text-slate-300 font-ml leading-snug">
              <div><strong className="text-white">പിക്കപ്പ്:</strong> {doc.consignor} ({doc.pickupLocation?.split(',')[0]})</div>
              <div><strong className="text-white">ഡെലിവറി:</strong> {doc.consignee} ({doc.deliveryLocation?.split(',')[0]})</div>
            </div>

            <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>റൂട്ട്: NH 544 & NH 44 ഇടനാഴി</span>
              <span className="text-emerald-400 font-semibold">ചെക്ക്പോസ്റ്റ് ക്ലിയറൻസ് ✓</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
