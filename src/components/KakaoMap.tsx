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
//    <KakaoMap
//      address="경기도 안양시 만안구 전파로 19-1 더비다요양원"
//      height={420}
//      level={3}
//    />

interface KakaoMapProps {
  title?: string;
  address: string;
  lat?: number;
  lng?: number;
  height?: number | string;
  level?: number; // 1(zoomed-in) ~ 14(zoomed-out) typical range
  showDirections?: boolean;
  onError?: () => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  title,
  address,
  lat,
  lng,
  height = 400,
  level = 3,
  showDirections = true,
  onError
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const appKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    
    if (!appKey) {
      const errorMsg = "Kakao Maps 앱키가 없습니다. REACT_APP_KAKAO_MAP_API_KEY를 설정해주세요.";
      setError(errorMsg);
      onError?.();
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

        const SCRIPT_ID = "kakao-maps-sdk";
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
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
        script.onload = () => {
          if (!w.kakao || !w.kakao.maps) {
            reject(new Error("Kakao SDK not available"));
            return;
          }
          w.kakao.maps.load(() => resolve());
        };
        script.onerror = () => reject(new Error("Kakao script failed to load"));
        document.head.appendChild(script);
      });

    const initMap = async () => {
      try {
        await loadScript();
        if (!mounted || !mapRef.current) return;

        const w = window as any;
        const container = mapRef.current;

        // Use provided coordinates or fallback to Seoul City Hall
        const defaultLat = lat || 37.5665;
        const defaultLng = lng || 126.9780;
        const fallbackCenter = new w.kakao.maps.LatLng(defaultLat, defaultLng);
        
        const map = new w.kakao.maps.Map(container, {
          center: fallbackCenter,
          level,
        });

        // If coordinates are provided, use them directly
        if (lat && lng) {
          const coords = new w.kakao.maps.LatLng(lat, lng);
          map.setCenter(coords);

          const marker = new w.kakao.maps.Marker({ position: coords });
          marker.setMap(map);

          // Create info window
          const content = document.createElement("div");
          content.style.padding = "12px 16px";
          content.style.borderRadius = "12px";
          content.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
          content.style.background = "#ffffff";
          content.style.fontSize = "14px";
          content.style.minWidth = "200px";
          
          const displayTitle = title || "위치";
          const link = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
          content.innerHTML = `
            <strong style="display:block;margin-bottom:6px;font-size:16px;">${displayTitle}</strong>
            <p style="margin:0 0 8px 0;color:#666;font-size:13px;">${address}</p>
            ${showDirections ? `
              <a href="${link}" target="_blank" rel="noreferrer" 
                 style="display:inline-block;background:#fee500;color:#333;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:bold;">
                🚗 길찾기
              </a>
            ` : ''}
          `;
          
          const info = new w.kakao.maps.InfoWindow({ content });
          info.open(map, marker);
          
          // Auto-close info window after 3 seconds
          setTimeout(() => {
            if (mounted) {
              info.close();
            }
          }, 3000);
        } else {
          // Geocode the address
          const geocoder = new w.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: any[], status: string) => {
            if (status === w.kakao.maps.services.Status.OK && result?.[0]) {
              const { x, y, road_address, address_name } = result[0];
              const coords = new w.kakao.maps.LatLng(Number(y), Number(x));
              map.setCenter(coords);

              const marker = new w.kakao.maps.Marker({ position: coords });
              marker.setMap(map);

              // Create info window
              const content = document.createElement("div");
              content.style.padding = "12px 16px";
              content.style.borderRadius = "12px";
              content.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
              content.style.background = "#ffffff";
              content.style.fontSize = "14px";
              content.style.minWidth = "200px";
              
              const displayTitle = title || (road_address?.address_name || address_name || "위치");
              const link = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
              content.innerHTML = `
                <strong style="display:block;margin-bottom:6px;font-size:16px;">${displayTitle}</strong>
                <p style="margin:0 0 8px 0;color:#666;font-size:13px;">${address}</p>
                ${showDirections ? `
                  <a href="${link}" target="_blank" rel="noreferrer" 
                     style="display:inline-block;background:#fee500;color:#333;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:bold;">
                    🚗 길찾기
                  </a>
                ` : ''}
              `;
              
              const info = new w.kakao.maps.InfoWindow({ content });
              info.open(map, marker);
              
              // Auto-close info window after 3 seconds
              setTimeout(() => {
                if (mounted) {
                  info.close();
                }
              }, 3000);
            } else {
              setError("주소를 찾지 못했습니다. 기본 위치로 표시합니다.");
              map.setCenter(fallbackCenter);
              onError?.();
            }
          });
        }

        // Make the map responsive to container resizes
        const ro = new ResizeObserver(() => {
          w.kakao.maps.event.trigger(map, "resize");
        });
        ro.observe(container);

        setIsMapLoaded(true);

        return () => {
          ro.disconnect();
        };
      } catch (e: any) {
        const errorMsg = e?.message || "지도를 불러오지 못했습니다.";
        setError(errorMsg);
        onError?.();
      }
    };

    void initMap();

    return () => {
      mounted = false;
    };
  }, [address, lat, lng, level, title, showDirections, onError]);

  return (
    <div className="kakao-map-container" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
      {error && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '10px 15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 10,
          fontSize: '12px',
          color: '#d32f2f'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          borderRadius: "20px",
          background: "#f5f5f5"
        }}
      >
        {!isMapLoaded && !error && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 1
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗺️</div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
              {title || '위치'}
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{address}</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>
              지도 로딩 중...
            </p>
          </div>
        )}
      </div>
      
      {/* 지도 위에 오버레이 정보 */}
      {isMapLoaded && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
            {title || '위치'}
          </h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{address}</p>
        </div>
      )}

      {/* 길찾기 버튼 (지도 우하단) */}
      {showDirections && isMapLoaded && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 10
        }}>
          <button
            onClick={() => {
              const encodedAddress = encodeURIComponent(address);
              window.open(`https://map.kakao.com/link/to/${encodedAddress}`, '_blank');
            }}
            style={{
              background: '#fee500',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            🚗 길찾기
          </button>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
