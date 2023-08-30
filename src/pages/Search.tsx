import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'

type MarkerInfoType = {
  position: { lat: number; lng: number }
  src: string
  size: { width: number; height: number }
}

interface MarkersProps {
  markerList: MarkerInfoType[]
}

function Markers({ markerList }: MarkersProps) {
  return (
    <>
      {markerList.map(({ position, src, size }) => (
        <MapMarker
          key={`${position.lat}-${position.lng}`}
          position={position}
          image={{
            src,
            size,
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
      src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      size: { width: 24, height: 35 },
    },
    {
      position: { lat: 33.557, lng: 126.795609 },
      src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      size: { width: 24, height: 35 },
    },
    {
      position: { lat: 33.55755, lng: 126.795511 },
      src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      size: { width: 24, height: 35 },
    },
  ]

  return (
    <>
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '100%' }}>
        <Markers markerList={markerList} />
        <Polyline
          path={[
            { lat: 33.55635, lng: 126.795841 },
            { lat: 33.557, lng: 126.795609 },
            { lat: 33.55755, lng: 126.795511 },
            { lat: 33.55995, lng: 126.795599 },
          ]}
        />
      </Map>
      <div>tap bar</div>
    </>
  )
}
