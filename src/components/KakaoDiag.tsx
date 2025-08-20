import React, { useEffect, useRef, useState } from "react";

declare global { interface Window { kakao: any } }

const loadKakaoScript = (appKey: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.getElementById("kakao-sdk")) return resolve();
    const s = document.createElement("script");
    s.id = "kakao-sdk";
    s.async = true;
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("SDK load failed"));
    document.head.appendChild(s);
  });

export default function KakaoDiag() {
  const [envOk, setEnvOk] = useState<string>("checking…");
  const [sdkOk, setSdkOk] = useState<string>("pending");
  const [geocodeOk, setGeocodeOk] = useState<string>("pending");
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    setEnvOk(key ? `OK (len=${key.length})` : "MISSING");

    if (!key) return;

    loadKakaoScript(key)
      .then(() => {
        if (!window.kakao?.maps?.load) {
          setSdkOk("loaded script but kakao.maps.load missing");
          return;
        }
        window.kakao.maps.load(() => {
          setSdkOk("OK (maps.load)");
          if (!mapRef.current) return;

          // 지도 컨테이너 높이 체크
          const rect = mapRef.current.getBoundingClientRect();
          if (rect.height < 10) {
            mapRef.current.style.height = "360px";
          }

          const map = new window.kakao.maps.Map(
            mapRef.current,
            {
              center: new window.kakao.maps.LatLng(37.5665, 126.9780),
              level: 3
            }
          );

          // 주소 지오코딩 테스트 (인천시청)
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch("인천 미추홀구 매소홀로 120", (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setGeocodeOk("OK");
              const pos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new window.kakao.maps.Marker({ position: pos });
              marker.setMap(map);
              map.setCenter(pos);
            } else {
              setGeocodeOk(`fail: ${status}`);
            }
          });
        });
      })
      .catch((e) => setSdkOk(`fail: ${String(e)}`));
  }, []);

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, marginBottom: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>KakaoMap Diagnostics</div>
      <ul style={{ lineHeight: 1.7, margin: 0, paddingLeft: 16 }}>
        <li>ENV (REACT_APP_KAKAO_MAP_API_KEY): <b>{envOk}</b></li>
        <li>SDK load: <b>{sdkOk}</b></li>
        <li>Geocoder: <b>{geocodeOk}</b></li>
      </ul>
      <div ref={mapRef} style={{ width: "100%", height: 360, marginTop: 12, borderRadius: 8, background: "#f7f7f7" }} />
    </div>
  );
}
