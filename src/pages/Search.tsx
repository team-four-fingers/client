import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'

// function MapSample({ marker, line }) {
//   return ()
// }

type MarkerInfoType = {
  position: { lat: number; lng: number }
  imageUrl: string
}

interface MarkersProps {
  markerList: MarkerInfoType[]
}

function Markers({ markerList }: MarkersProps) {
  return (
    <>
      {markerList.map(({ position, imageUrl }) => (
        <MapMarker
          key={`${position.lat}-${position.lng}`}
          position={position}
          image={{
            src: imageUrl,
            size: { width: 24, height: 35 },
          }}
        />
      ))}
    </>
  )
}

export default function Search() {
  const markerList = [
    {
      position: { lat: 33.55635, lng: 126.795841 },
      imageUrl: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
    },
    {
      position: { lat: 33.557, lng: 126.795609 },
      imageUrl: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
    },
    {
      position: { lat: 33.55755, lng: 126.795511 },
      imageUrl: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
    },
  ]

  return (
    <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '100%' }}>
      <Markers markerList={markerList} />
      <Polyline
        path={[
          { lat: 33.55635, lng: 126.795841 },
          { lat: 33.557, lng: 126.795609 },
          { lat: 33.55755, lng: 126.795511 },
          { lat: 33.55995, lng: 126.795599 },
        ]}
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={'#FFAE00'} // 선의 색깔입니다
        strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={'solid'} // 선의 스타일입니다
      />
    </Map>
  )
}
