import React from 'react';

interface StaticKakaoMapProps {
  centerX: number;
  centerY: number;
  title: string;
  address: string;
}

const StaticKakaoMap: React.FC<StaticKakaoMapProps> = ({ centerX, centerY, title, address }) => {
  const mapUrl = `https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=${centerX}&MY=${centerY}&S=0&IW=800&IH=400&LANG=0&COORDSTM=WCONGNAMUL`;

  return (
    <div className="static-map-container" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
      <img
        src={mapUrl}
        alt={`${title} 지도`}
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '20px'
        }}
      />

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
  );
};

export default StaticKakaoMap;




