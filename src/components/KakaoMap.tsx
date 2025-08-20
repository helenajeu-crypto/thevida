// src/components/KakaoMap.tsx
import React, { useEffect, useRef } from "react";

declare global { interface Window { kakao: any } }

type Props = {
  title?: string;
  name?: string;  // 추가: name prop
  address?: string;
  lat?: number;
  lng?: number;
  level?: number;
  height?: number | string;   // 외부에서 높이 받기
};

const loadSDK = (key: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.getElementById("kakao-sdk")) return resolve();
    const s = document.createElement("script");
    s.id = "kakao-sdk";
    s.async = true;
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Kakao SDK load failed"));
    document.head.appendChild(s);
  });

export default function KakaoMap({
  title,
  address,
  lat,
  lng,
  level = 3,
  height = 360,            // ★ 기본 높이
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const key = process.env.REACT_APP_KAKAO_MAP_API_KEY as string | undefined;

  useEffect(() => {
    if (!key || !boxRef.current) return;

    let obs: ResizeObserver | undefined;

    const init = async () => {
      await loadSDK(key);
      window.kakao.maps.load(() => {
        if (!boxRef.current) return;

        const center = (lat && lng)
          ? new window.kakao.maps.LatLng(lat, lng)
          : new window.kakao.maps.LatLng(37.5665, 126.9780); // 기본: 서울

        const map = new window.kakao.maps.Map(boxRef.current, { center, level });
        mapRef.current = map;

        if (address) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const pos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              new window.kakao.maps.Marker({ position: pos }).setMap(map);
              map.setCenter(pos);
            }
          });
        }

        // 컨테이너 크기 변화에 자동 대응
        obs = new ResizeObserver(() => map.relayout());
        obs.observe(boxRef.current);

        // 최초 표시 직후 보정(탭/라우팅 전환 대응)
        setTimeout(() => map.relayout(), 0);
      });
    };

    init().catch(console.error);
    return () => { obs?.disconnect(); mapRef.current = null; };
  }, [key, address, lat, lng, level]);

  // ★ 핵심: div 자체에 height 적용
  return (
    <div
      ref={boxRef}
      style={{ width: "100%", height }}
      aria-label={title || "Kakao Map"}
    />
  );
}
