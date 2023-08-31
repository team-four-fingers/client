import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { cartItemsState } from '../recoil/cart-items'
import { useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import BasicMarker from '../components/Marker/BasicMarker'
import { RoadLine } from '../components/Line/RoadLine'
import { MOCK_DESTINATION, MOCK_ORIGIN, routeApi, ApiPath } from '../api'
import { BestRouteWaypointsBar } from '../components/BestRouteWaypointsBar'

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

      const { coordinates_in_order, origin, destination } = data.data

      coordinates_in_order.forEach(item => {
        bounds.extend(new kakao.maps.LatLng(Number(item.y), Number(item.x)))
      })

      bounds.extend(new kakao.maps.LatLng(origin.y, origin.x))
      bounds.extend(new kakao.maps.LatLng(destination.y, destination.x))

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

  const { coordinates_in_order, origin, destination, waypoints } = data.data

  const coordinatesInOrder = coordinates_in_order.map(item => ({
    lat: item.y,
    lng: item.x,
  }))

  // TODO: 데이터 사용
  const waypointNames = ['출발', '1경유', '도착']

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <BestRouteWaypointsBar waypointNames={waypointNames} />
      <Map
        center={{ lat: origin.y, lng: origin.x }}
        onCreate={setMap}
        level={3}
        style={{ width: '100%', height: '100%' }}
      >
        <RoadLine path={coordinatesInOrder} />
        <BasicMarker
          key={`${origin.y},${origin.x}`}
          position={{ lat: origin.y, lng: origin.x }}
          type='depart'
        />
        <BasicMarker
          key={`${destination.y},${destination.x}`}
          position={{ lat: destination.y, lng: destination.x }}
          type='arrival'
        />
        // TODO: 경유지 마커로 변경
        {waypoints.map(({ coordinate: { x, y } }) => (
          <MapMarker key={`${y},${x}`} position={{ lat: y, lng: x }}></MapMarker>
        ))}
      </Map>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '16px 16px 0 0',
          zIndex: 10,
          padding: '20px',
        }}
      >
        모달모달
      </div>
    </div>
  )
}
