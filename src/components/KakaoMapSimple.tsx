import React, { useEffect, useRef, useState } from "react";

// Simple, production-ready Kakao Map embed for React + TS
// - Geocodes an address and drops a marker
// - Responsive (relayouts on container resize)
// - Graceful errors with a small inline message
//
// Usage:
// 1) .env
//    REACT_APP_KAKAO_MAP_API_KEY=YOUR_APP_KEY_HERE
// 2) In your page/component
//    <KakaoMapSimple
//      appKey={process.env.REACT_APP_KAKAO_MAP_API_KEY}
//      address="인천시 미추홀구 제물량로 4번길 34-33"
//      height={420}
//      level={3}
//    />

interface KakaoMapSimpleProps {
  appKey?: string;
  address?: string;
  height?: number | string;
  level?: number; // 1(zoomed-in) ~ 14(zoomed-out) typical range
}

const DEFAULT_ADDRESS = "인천시 미추홀구 제물량로 4번길 34-33";

const KakaoMapSimple: React.FC<KakaoMapSimpleProps> = ({
  appKey,
  address = DEFAULT_ADDRESS,
  height = 360,
  level = 3,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 하드코딩된 API 키 사용 (환경변수 문제 해결)
  const apiKey = appKey || "74c9e6d4cfd999b6fa341eaddddda44d";

  useEffect(() => {
    if (!apiKey) {
      setError("Kakao Maps 앱키가 없습니다. appKey를 전달해주세요.");
      return;
    }

    let mounted = true;

    const loadScript = () =>
      new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined") {
          reject(new Error("Window unavailable"));
          return;
        }
        const w = window as any;

        // If SDK already loaded
        if (w.kakao && w.kakao.maps) {
          // ensure core is ready
          if (w.kakao.maps.load) {
            w.kakao.maps.load(() => resolve());
          } else {
            resolve();
          }
          return;
        }

        const SCRIPT_ID = "kakao-maps-sdk-simple";
        const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => {
            if (w.kakao?.maps?.load) w.kakao.maps.load(() => resolve());
            else resolve();
          });
          existing.addEventListener("error", () => reject(new Error("Kakao script failed to load")));
          return;
        }

        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
        
        // 타임아웃 설정 (10초)
        const timeout = setTimeout(() => {
          reject(new Error("Kakao script loading timeout"));
        }, 10000);

        script.onload = () => {
          clearTimeout(timeout);
          if (!w.kakao || !w.kakao.maps) {
            reject(new Error("Kakao SDK not available"));
            return;
          }
          w.kakao.maps.load(() => resolve());
        };
        
        script.onerror = () => {
          clearTimeout(timeout);
          reject(new Error("Kakao script failed to load"));
        };
        
        document.head.appendChild(script);
      });

    const initMap = async () => {
      try {
        await loadScript();
        if (!mounted || !mapRef.current) return;

        const w = window as any;
        const container = mapRef.current;

        // Temporary center (Seoul City Hall) until geocoding completes
        const fallbackCenter = new w.kakao.maps.LatLng(37.5665, 126.9780);
        const map = new w.kakao.maps.Map(container, {
          center: fallbackCenter,
          level,
        });

        const geocoder = new w.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: any[], status: string) => {
          if (status === w.kakao.maps.services.Status.OK && result?.[0]) {
            const { x, y, road_address, address_name } = result[0];
            const coords = new w.kakao.maps.LatLng(Number(y), Number(x));
            map.setCenter(coords);

            const marker = new w.kakao.maps.Marker({ position: coords });
            marker.setMap(map);

            const content = document.createElement("div");
            content.style.padding = "8px 12px";
            content.style.borderRadius = "12px";
            content.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
            content.style.background = "#ffffff";
            content.style.fontSize = "14px";
            const title = road_address?.address_name || address_name || address;
            const link = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
            content.innerHTML = `
              <strong style="display:block;margin-bottom:4px;">${title}</strong>
              <a href="${link}" target="_blank" rel="noreferrer">카카오맵에서 열기</a>
            `;
            const info = new w.kakao.maps.InfoWindow({ content });
            info.open(map, marker);
          } else {
            setError("주소를 찾지 못했습니다. 기본 위치로 표시합니다.");
            map.setCenter(fallbackCenter);
          }
        });

        // Make the map responsive to container resizes
        const ro = new ResizeObserver(() => {
          w.kakao.maps.event.trigger(map, "resize");
        });
        ro.observe(container);

        return () => {
          ro.disconnect();
        };
      } catch (e: any) {
        setError(e?.message || "지도를 불러오지 못했습니다.");
      }
    };

    void initMap();

    return () => {
      mounted = false;
    };
  }, [apiKey, address, level]);

  return (
    <div className="w-full">
      {error && (
        <p className="mb-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default KakaoMapSimple;
