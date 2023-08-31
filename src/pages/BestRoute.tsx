import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { cartItemsState } from '../recoil/cart-items'
import { useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import BasicMarker from '../components/Marker/BasicMarker'
import { RoadLine } from '../components/Line/RoadLine'
import { MOCK_DESTINATION, MOCK_ORIGIN, routeApi, ApiPath } from '../api'

export default function BestRoute() {
  const [map, setMap] = useState<kakao.maps.Map>()
  const cartItems = useRecoilValue(cartItemsState)

  const { data } = useQuery(
    [ApiPath.routes],
    async () =>
      await routeApi({
        origin: MOCK_ORIGIN,
        destination: MOCK_DESTINATION,
        waypoints: cartItems.items.map(item => item.store),
      }),
  )

  useEffect(() => {
    const extendBounds = () => {
      if (data === undefined || map === undefined) {
        return
      }

      const bounds = new kakao.maps.LatLngBounds()

      const { CoordinatesInOrder, Origin, Destination } = data.data

      CoordinatesInOrder.forEach(item => {
        bounds.extend(new kakao.maps.LatLng(Number(item.y), Number(item.x)))
      })

      bounds.extend(new kakao.maps.LatLng(Origin.y, Origin.x))
      bounds.extend(new kakao.maps.LatLng(Destination.y, Destination.x))

      map.setBounds(bounds)
    }

    extendBounds()
  }, [data, map])

  if (!data) {
    return (
      //TODO: 로딩중 화면 교체
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        loading...
      </div>
    )
  }

  const { CoordinatesInOrder, Origin, Destination, Waypoints } = data.data

  const coordinatesInOrder = CoordinatesInOrder.map(item => ({
    lat: item.y,
    lng: item.x,
  }))

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        center={{ lat: Origin.y, lng: Origin.x }}
        onCreate={setMap}
        level={3}
        style={{ width: '100%', height: '100%' }}
      >
        <RoadLine path={coordinatesInOrder} />
        <BasicMarker
          key={`${Origin.y},${Origin.x}`}
          position={{ lat: Origin.y, lng: Origin.x }}
          type='depart'
        />
        <BasicMarker
          key={`${Destination.y},${Destination.x}`}
          position={{ lat: Destination.y, lng: Destination.x }}
          type='arrival'
        />
        // TODO: 경유지 마커로 변경
        {Waypoints.map(({ x, y }) => (
          <MapMarker key={`${y},${x}`} position={{ lat: y, lng: x }}></MapMarker>
        ))}
      </Map>
    </div>
  )
}
