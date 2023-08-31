import { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import CurrentLocationBanner from '../components/CurrentLocationBanner'
import TapBar from '../components/TapBar'

import productUrl from '../assets/product_sample.png'
import BasicMarker from '../components/Marker/BasicMarker'
import { useNavigate } from 'react-router-dom'

export interface SearchResultItem {
  result_id: number
  when_types: string[]
  product: {
    name: string
    price: number
    image_url: string
  }
  store: {
    coordinate: { lat: number; lng: number }
    name: string
    operation_hours: string
    has_parking_lot: boolean
    distance_from_origin: number
  }
}

export interface SearchResultList {
  results: SearchResultItem[]
}

const resultList: SearchResultList = {
  results: [
    {
      result_id: 1,
      when_types: ['when_type1'],
      product: {
        name: '제품1',
        price: 20000,
        image_url: productUrl,
      },
      store: {
        coordinate: { lat: 37.54452, lng: 127.043452 },
        name: '상점1',
        operation_hours: '9:00~18:00',
        has_parking_lot: true,
        distance_from_origin: 32,
      },
    },
    {
      result_id: 2,
      when_types: ['when_type2'],
      product: {
        name: '제품2',
        price: 4900,
        image_url: productUrl,
      },
      store: {
        coordinate: { lat: 37.54452, lng: 127.0439 },
        name: '상점2',
        operation_hours: '10:00~20:00',
        has_parking_lot: false,
        distance_from_origin: 100,
      },
    },
    {
      result_id: 3,
      when_types: ['when_type3'],
      product: {
        name: '제품3',
        price: 10900,
        image_url: productUrl,
      },
      store: {
        coordinate: { lat: 37.54532, lng: 127.043452 },
        name: '상점3',
        operation_hours: '10:00~20:00',
        has_parking_lot: false,
        distance_from_origin: 1200,
      },
    },
  ],
}

export default function Search() {
  const [center] = useState({ lat: 37.54412, lng: 127.043412 })
  const navigate = useNavigate()

  const handleSearchIconClick = () => {
    navigate('/searchResult', {
      state: {
        // 검색결과 전달
        resultList,
      },
    })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchBar value='' handleSearchIconClick={handleSearchIconClick} />
      <Map center={center} style={{ width: '100%', height: '100%' }}>
        <BasicMarker type='current' position={center} />
      </Map>
      <CurrentLocationBanner />
      <TapBar />
    </div>
  )
}

// TODO: css 분리, 컴포넌트 이동
const SearchBar = ({
  value,
  handleSearchIconClick,
}: {
  value: string
  handleSearchIconClick: () => void
}) => {
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
          style={{ color: 'var(--gray-400, #878E9C)', border: 'none', flex: 1 }}
        />
        <SearchIcon width={24} height={24} handleClick={handleSearchIconClick} />
      </div>
    </div>
  )
}

const SearchIcon = ({
  width,
  height,
  color,
  handleClick,
}: {
  width: number
  height: number
  color?: string
  handleClick: () => void
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    onClick={handleClick}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.0292 18 13.8819 17.2445 15.2923 15.9995L20.6465 21.3537C21.037 21.7442 21.6701 21.7442 22.0607 21.3537C22.4512 20.9631 22.4512 20.33 22.0607 19.9395L16.6177 14.4965C17.4901 13.2151 18 11.6671 18 10C18 5.58172 14.4183 2 10 2Z'
      fill={color ? color : '#111111'}
    />
  </svg>
)
