import React, { useMemo, useState } from "react";
import L from "leaflet";
import styles from "./App.module.less";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import { useDebounceFn } from "ahooks";

const MyComponent = () => {
  const { run } = useDebounceFn(
    (map) => {
      const bounds = L.latLngBounds([
        [18.35453, 73.21289],
        [53.54031, 135.26367],
      ]);
      // 限制拖动边界
      map.setMaxBounds(bounds);
      map.panInsideBounds(bounds, { animate: false });
    },
    {
      wait: 300,
    },
  );
  const map = useMapEvents({
    drag: () => run(map),
  });

  return null;
};

const MapDemo = () => {
  const polyline = [
    [34.821536, 113.620839],
    [27.730773, 109.182362],
    [32.071937, 118.76244],
    [32.183584, 109.182362],
    [28.351354, 116.828846],
    [34.767404, 113.708729],
  ];

  const limeOptions = { color: "#1677ff" };

  return (
    <MapContainer
      id="map_container"
      className={styles.map}
      center={[30.452654, 114.40116]}
      minZoom={6}
      maxZoom={6}
      zoom={6}
    >
      <TileLayer url="./assets/map/{z}/{x}/{y}.png" />
      <MyComponent />
      <Polyline pathOptions={limeOptions} positions={polyline} />
    </MapContainer>
  );
};

export default MapDemo;
