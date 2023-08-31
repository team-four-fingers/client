import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { cartItemsState } from '../recoil/cart-items'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { useQuery } from 'react-query'

export default function BestRoute() {
  const [map, setMap] = useState<kakao.maps.Map>()
  const cartItems = useRecoilValue(cartItemsState)

  const { data } = useQuery(
    // TODO: api key 수정
    ['bestRoute'],
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
        // TODO: 컴포넌트 분리
        <Polyline
          path={[coordinatesInOrder]}
          strokeWeight={15}
          strokeColor={'#5C759D'}
          strokeOpacity={1}
          strokeStyle={'solid'}
        />
        <Polyline
          path={[coordinatesInOrder]}
          strokeWeight={13}
          strokeColor={'#84A7E2'}
          strokeOpacity={1}
          strokeStyle={'solid'}
        />
        <Polyline
          path={[coordinatesInOrder]}
          strokeWeight={2}
          strokeColor={'#FFFFFF'}
          strokeOpacity={1}
          strokeStyle={'shortdash'}
        />
        // TODO: 출발 마커로 변경
        <MapMarker
          key={`${Origin.y},${Origin.x}`}
          position={{ lat: Origin.y, lng: Origin.x }}
        ></MapMarker>
        // TODO: 도착 마커로 변경
        <MapMarker
          key={`${Destination.y},${Destination.x}`}
          position={{ lat: Destination.y, lng: Destination.x }}
        ></MapMarker>
        // TODO: 경유지 마커로 변경
        {Waypoints.map(({ x, y }) => (
          <MapMarker key={`${y},${x}`} position={{ lat: y, lng: x }}></MapMarker>
        ))}
      </Map>
    </div>
  )
}

const MOCK_ORIGIN = {
  x: 126.946362033068,
  y: 37.5404741779088,
}
const MOCK_DESTINATION = {
  x: 127.1101250888609,
  y: 37.39407843730005,
}

const MOCK_STORE1 = {
  coordinate: {
    x: 126.92716700037366,
    y: 37.5266641708316,
  },
  name: '상점1',
  operation_hours: '',
  has_parking_lot: true,
  distance_from_origin: 0,
}

const MOCK_REQUEST = {
  origin: MOCK_ORIGIN,
  destination: MOCK_DESTINATION,
  waypoints: [MOCK_STORE1],
}

//TODO: api 폴더로 이동
const routeApi = (request: typeof MOCK_REQUEST) => {
  return axios.post<TempType>(`${API_BASE_URL}/routes`, request)
}

const API_BASE_URL = 'https://server-pu7vk6hfqq-du.a.run.app'

interface TempType {
  Origin: Coordinate
  Destination: Coordinate
  Waypoints: Coordinate[]
  CoordinatesInOrder: Coordinate[]
}

interface Coordinate {
  x: number
  y: number
}
