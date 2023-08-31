import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { useQuery } from 'react-query'
import BasicMarker from '../components/Marker/BasicMarker'
import { RoadLine } from '../components/Line/RoadLine'
import { MOCK_DESTINATION, MOCK_ORIGIN, routeApi, ApiPath } from '../api'
import { BestRouteWaypointsBar } from '../components/BestRouteWaypointsBar'
import { searchResultItemCartState } from '../recoil/search-result-items'
import { SearchResultItem } from './Search'

export default function BestRoute() {
  const [map, setMap] = useState<kakao.maps.Map>()

  const selectedSearchResultItems = useRecoilValue(searchResultItemCartState).filter(
    item => item.isSelected,
  )
  const itemsCount = selectedSearchResultItems.length

  const { data } = useQuery(
    [ApiPath.routes],
    async () =>
      await routeApi({
        origin: MOCK_ORIGIN,
        destination: MOCK_DESTINATION,
        waypoints: selectedSearchResultItems.map(item => {
          return {
            ...item.store,
            coordinate: { y: item.store.coordinate.lat, x: item.store.coordinate.lng },
          }
        }),
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

  const {
    coordinates_in_order,
    origin,
    destination,
    waypoints,
    duration_in_minutes,
    distance_in_meters,
  } = data.data

  const coordinatesInOrder = coordinates_in_order.map(item => ({
    lat: item.y,
    lng: item.x,
  }))

  const waypointNames = ['출발', ...waypoints.map(point => point.name), '도착']

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
        {/* // TODO: 경유지 마커로 변경 */}
        {waypoints.map(({ coordinate: { x, y } }) => (
          <MapMarker key={`${y},${x}`} position={{ lat: y, lng: x }}></MapMarker>
        ))}
      </Map>

      <BestRouteModal
        duration_in_minutes={duration_in_minutes}
        distance_in_meters={distance_in_meters}
        itemsCount={itemsCount}
        searchResultItems={selectedSearchResultItems}
      />
    </div>
  )
}

const BestRouteModal = ({
  duration_in_minutes,
  distance_in_meters,
  itemsCount,
  searchResultItems,
}: {
  duration_in_minutes: number
  distance_in_meters: number
  itemsCount: number
  searchResultItems: SearchResultItem[]
}) => {
  return (
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ color: 'var(--gray-050, #111)', fontSize: '18px', fontWeight: 700 }}>
          추천 경로
        </div>
        <div
          style={{
            padding: '6px',
            borderRadius: '6px',
            background: 'var(--gray-750, #F0F2F5)',
            color: 'var(--gray-400, #878E9C)',
            fontSize: '13px',
          }}
        >
          자세히 보기
        </div>
      </div>
      <div style={{ height: '8px' }} />
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--gray-150, #444B55)',
        }}
      >
        <div>{duration_in_minutes}분</div>
        <div style={{ width: '1px', height: '10px', background: 'var(--gray-400, #878E9C)' }} />
        <div>{format(new Date(Date.now() + duration_in_minutes), 'HH:mm')} 도착</div>
        <div style={{ width: '1px', height: '10px', background: 'var(--gray-400, #878E9C)' }} />
        <div>{distance_in_meters / 1000} km</div>
      </div>
      <div style={{ height: '32px' }} />
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ color: 'var(--gray-050, #111)', fontSize: '15px', fontWeight: 700 }}>
          담긴 상품
        </div>
        <div style={{ color: 'var(--blue-100, #4A88E5)', fontSize: '15px', fontWeight: 700 }}>
          {itemsCount}
        </div>
      </div>
      <div style={{ height: '8px' }} />

      <Slider
        {...{
          infinite: false,
          slidesToShow: 1.3,
          slidesToScroll: 1,
        }}
      >
        {searchResultItems.map(item => {
          return (
            <div key={item.store.name}>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--gray-700, #E5E8ED)',
                  marginRight: '12px',
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <img
                  //TODO: 이미지 경로 변경
                  src={item.product.image_url}
                  width={'60px'}
                  height={'60px'}
                  style={{ borderRadius: '10px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      lineHeight: 'normal',
                    }}
                  >
                    {item.store.name}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    {item.product.name}
                  </span>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: 'normal',
                    }}
                  >
                    {item.product.price}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
      <div style={{ height: '32px' }} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type='button'
          style={{
            padding: '20px 24px',
            flex: '1 0 0',
            borderRadius: '12px',
            background: 'var(--blue-100, #4A88E5)',
            color: 'var(--white-900, #FFF)',
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          미리 결제하고 길 안내
        </button>
        <button
          type='button'
          style={{
            padding: '20px 24px',
            borderRadius: '12px',
            background: 'var(--blue-10015, rgba(74, 136, 229, 0.15))',
            color: 'var(--blue-300, #2C6AC7)',
            fontSize: '16px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          바로 길 안내
        </button>
      </div>
    </div>
  )
}
