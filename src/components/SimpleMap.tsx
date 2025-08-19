import React from 'react';

interface SimpleMapProps {
  title: string;
  address: string;
  lat?: number;
  lng?: number;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ title, address, lat, lng }) => {
  // 기본 좌표 (서울시청)
  const defaultLat = 37.5665;
  const defaultLng = 126.9780;
  
  const mapLat = lat || defaultLat;
  const mapLng = lng || defaultLng;

  return (
    <div className="simple-map-container" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
      {/* 정적 지도 이미지 (카카오맵 정적 API) */}
      <div style={{
        width: '100%',
        height: '400px',
        background: `url(https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=${mapLng}&MY=${mapLat}&S=0&IW=800&IH=400&LANG=0&COORDSTM=WCONGNAMUL)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
        position: 'relative'
      }}>
        {/* 위치 핀 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          zIndex: 10,
          fontSize: '32px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }}>
          📍
        </div>
      </div>

      {/* 지도 위에 오버레이 정보 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 10
      }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{address}</p>
      </div>

      {/* 길찾기 버튼들 */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10,
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
      }}>
        {/* 카카오맵 길찾기 */}
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
            gap: '5px',
            whiteSpace: 'nowrap'
          }}
        >
          🚗 카카오맵 길찾기
        </button>

        {/* 네이버맵 길찾기 */}
        <button
          onClick={() => {
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://map.naver.com/p/search/${encodedAddress}`, '_blank');
          }}
          style={{
            background: '#03c75a',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap'
          }}
        >
          🚗 네이버맵 길찾기
        </button>

        {/* 구글맵 길찾기 */}
        <button
          onClick={() => {
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
          }}
          style={{
            background: '#4285f4',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap'
          }}
        >
          🚗 구글맵 길찾기
        </button>
      </div>
    </div>
  );
};

export default SimpleMap;
