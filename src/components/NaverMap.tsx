import React from 'react';

interface NaverMapProps {
  title: string;
  address: string;
  query: string; // 네이버 지도 검색어
}

const NaverMap: React.FC<NaverMapProps> = ({ title, address, query }) => {
  // 네이버 지도 URL 생성 (검색어 기반)
  const encodedQuery = encodeURIComponent(query);
  const mapUrl = `https://map.naver.com/p/search/${encodedQuery}`;

  return (
    <div className="naver-map-container" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
      <iframe
        src={mapUrl}
        title={`${title} 네이버 지도`}
        style={{
          width: '100%',
          height: '400px',
          border: 'none',
          borderRadius: '20px'
        }}
        allowFullScreen
      />
      
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
    </div>
  );
};

export default NaverMap;
