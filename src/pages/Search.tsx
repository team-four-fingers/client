import { ChangeEvent, useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import TapBar from '../components/TapBar'

export default function Search() {
  const [map, setMap] = useState<kakao.maps.Map>()
  const [markers, setMarkers] = useState<
    { position: { lat: number; lng: number }; content: string }[]
  >([])
  const [center, setCenter] = useState({ lat: 33.5563, lng: 126.79581 })
  const [info, setInfo] = useState<{ position: { lat: number; lng: number }; content: string }>()

  useEffect(() => {
    ;(async () => {
      const location = await getMyGps()
      setCenter({ lat: location.lat, lng: location.lon })
    })()
  }, [])

  const search = (keyword: string) => {
    if (!map) {
      return
    }

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      // TODO: status에 따라 분기
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const markers = data.map(item => ({
          position: {
            lat: Number(item.y),
            lng: Number(item.x),
          },
          content: item.place_name,
        }))
        setMarkers(markers)

        data.forEach(item => {
          bounds.extend(new kakao.maps.LatLng(Number(item.y), Number(item.x)))
        })
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)
      }
    })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchBar onSearch={search} />
      <Map center={center} style={{ width: '100%', height: '100%' }} onCreate={setMap}>
        {markers.map(marker => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      <TapBar />
    </div>
  )
}

const getMyGps = (): Promise<{ lat: number; lon: number }> => {
  const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
  }

  return new Promise(resolve => {
    if (!navigator.geolocation) {
      resolve({ lat: 33.450701, lon: 126.570667 })
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude // 위도
        const lon = position.coords.longitude // 경도

        resolve({ lat: lat, lon: lon })
      },
      () => {
        resolve({ lat: 33.450701, lon: 126.570667 })
      },
      gpsOptions,
    )
  })
}

// TODO: css 분리, 컴포넌트 이동
const SearchBar = ({ onSearch }: { onSearch: (keyword: string) => void }) => {
  const [value, setValue] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => {
    setIsFocused(true)
  }
  const onBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        padding: '12px',
        width: '100%',
      }}
    >
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: 'white',
          width: '100%',
          display: 'flex',
        }}
      >
        <input
          type='text'
          id='search-bar'
          placeholder='무엇이든 한 번에 찾아보세요'
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ color: 'var(--gray-400, #878E9C)', border: 'none', flex: 1 }}
        />

        <SearchIcon
          width={24}
          height={24}
          onClick={() => {
            onSearch(value)
          }}
        />
      </div>
    </div>
  )
}

const SearchIcon = ({
  width,
  height,
  color,
  onClick,
}: {
  width: number
  height: number
  color?: string
  onClick: () => void
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    onClick={onClick}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.0292 18 13.8819 17.2445 15.2923 15.9995L20.6465 21.3537C21.037 21.7442 21.6701 21.7442 22.0607 21.3537C22.4512 20.9631 22.4512 20.33 22.0607 19.9395L16.6177 14.4965C17.4901 13.2151 18 11.6671 18 10C18 5.58172 14.4183 2 10 2Z'
      fill={color ? color : '#111111'}
    />
  </svg>
)
