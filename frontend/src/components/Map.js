/* global kakao */
import { useEffect, useRef } from "react";

function Map() {
  const options = {
    center: new window.kakao.maps.LatLng(37.59882483554213, 127.00433988578936),
    level: 3,
  };
  const $container = useRef(null);

  useEffect(() => {
    const map = new window.kakao.maps.Map($container.current, options);
    const markerPosition = new window.kakao.maps.LatLng(
      37.59882483554213,
      127.00433988578936
    );
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
    return () => {};
  }, []);

  return (
    <div
      className="map"
      style={{ width: "600px", height: "300px" }}
      ref={$container}
    ></div>
  );
}

export default Map;
