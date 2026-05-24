

'use client'
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// آیکون پیش‌فرض Leaflet برای Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map() {
  const mapRef = useRef(null); // ارجاع به div

  useEffect(() => {
    if (!mapRef.current) return;

    // بررسی اینکه map قبلاً ساخته نشده
    if (mapRef.current._leaflet_map) return;

    const points = [
      { coords: [35.70293, 51.40557], label: "نقطه 1" },
    ];

    const map = L.map(mapRef.current);
    mapRef.current._leaflet_map = map; // ذخیره map در ref برای جلوگیری از دوباره‌سازی

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const latlngs = [];

    points.forEach(point => {
      L.marker(point.coords).addTo(map)
        .bindPopup(point.label);
      latlngs.push(point.coords);
    });

    map.fitBounds(latlngs);

  }, []);

  return (
    <div ref={mapRef} className="shadow-md rounded-lg w-full h-[320px]"></div>
  );
}
