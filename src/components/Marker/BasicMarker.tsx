import { MapMarker } from 'react-kakao-maps-sdk'

import markerCurrentUrl from '../../assets/pin_normal-small.svg'
import markerDepartUrl from '../../assets/pin_depart.svg'
import markerArrivalUrl from '../../assets/pin_arrival.svg'

type MarkerType = {
  position: { lat: number; lng: number }
  type: 'current' | 'depart' | 'arrival' // 내위치, 출발, 도착
}

export function BasicMarker({ position, type }: MarkerType) {
  const markerPosition = { lat: position.lat, lng: position.lng }
  const markerSrc = {
    current: markerCurrentUrl,
    depart: markerDepartUrl,
    arrival: markerArrivalUrl,
  }

  return (
    <MapMarker
      position={markerPosition}
      image={{ src: markerSrc[type], size: { width: 44, height: 59 } }}
    />
  )
}
