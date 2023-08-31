import axios from 'axios'
import { useState, useEffect } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import CurrentLocationBanner from '../components/CurrentLocationBanner'
import TapBar from '../components/TapBar'
import BasicMarker from '../components/Marker/BasicMarker'
import Icon from '../components/Icon'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { originState } from '../recoil/location'

type requestType = {
  query: string
  origin: {
    x: number
    y: number
  }
  radius: number
  when_type: string
  eat_type: string
}

type responseItemType = {
  result_id: number
  when_types: string[]
  product: {
    name: string
    price: number
    image_url: string
  }
  store: {
    coordinate: { x: number; y: number; lat: number; lng: number }
    name: string
    operation_hours: string
    has_parking_lot: boolean
    distance_from_origin: number
  }
}

export interface SearchResultItem {
  result_id: number
  when_types: string[]
  product: {
    name: string
    price: number
    image_url: string
  }
  store: {
    coordinate: LatLng
    name: string
    operation_hours: string
    has_parking_lot: boolean
    distance_from_origin: number
  }
}

export interface LatLng {
  lat: number
  lng: number
}

export interface SearchResultList {
  results: SearchResultItem[]
}

export default function Search() {
  const [center, setCenter] = useState({ lat: 37.3941037, lng: 127.1100201 })
  const [address, setAddress] = useState<string>('내 위치 찾는 중...')
  const navigate = useNavigate()

  const setOriginState = useSetRecoilState(originState)

  useEffect(() => {
    ;(async () => {
      const location = await getMyGps()
      setCenter(location)
      setOriginState({ y: location.lat, x: location.lng })
      await getAddr(location).then(addr => {
        const address = addr.data.documents[0].road_address.address_name
        setAddress(address)
      })
    })()
  }, [setOriginState])

  const getMyGps = (): Promise<LatLng> => {
    const gpsOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
    }

    return new Promise(resolve => {
      if (!navigator.geolocation) {
        resolve({ lat: 37.3941037, lng: 127.1100201 })
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도

          resolve({ lat: lat, lng: lng })
        },
        () => {
          resolve({ lat: 37.3941037, lng: 127.1100201 })
        },
        gpsOptions,
      )
    })
  }

  const getAddr = async ({ lat, lng }: LatLng) => {
    return axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_MAP_REST_API_KEY}`,
      },
    })
  }

  const API_BASE_URL = 'https://server-pu7vk6hfqq-du.a.run.app'

  const getResultByKeyword = async (request: requestType) => {
    const { data } = await axios.post(`${API_BASE_URL}/search`, request)
    return data
  }

  const handleSearchIconClick = async (keyword: string) => {
    console.log(keyword)
    const request = {
      query: keyword,
      origin: {
        x: center.lng,
        y: center.lat,
      },
      radius: 10000,
      when_type: '아침',
      eat_type: '매장식사',
    }
    const data = await getResultByKeyword(request)

    const resultList = data.results.map((result: responseItemType) => {
      result.store.coordinate.lat = result.store.coordinate.y
      result.store.coordinate.lng = result.store.coordinate.x
      return result
    })

    navigate('/searchResult', {
      state: {
        resultList,
        keyword,
        myPosition: center,
      },
    })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchBar handleSearchIconClick={handleSearchIconClick} />
      <Map center={center} style={{ width: '100%', height: '100%' }}>
        <BasicMarker type='current' position={center} />
      </Map>
      <CurrentLocationBanner address={address} />
      <TapBar />
    </div>
  )
}

// TODO: css 분리, 컴포넌트 이동
const SearchBar = ({
  handleSearchIconClick,
}: {
  handleSearchIconClick: (keyword: string) => void
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false)

  const handleFakeSearchBarClick = () => {
    setIsSearchBarOpen(true)
  }

  return (
    <>
      <div
        className='fakeSearchBar'
        style={{
          position: 'fixed',
          top: '12px',
          zIndex: 50,
          padding: '0 12px',
          width: '100%',
          maxWidth: '640px',
        }}
        onClick={handleFakeSearchBarClick}
      >
        <div
          className='inner'
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '12px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ color: '#878E9C' }}>무엇이든 한 번에 찾아보세요</p>
          <Icon name='icon-search-line' />
        </div>
      </div>

      {isSearchBarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            maxWidth: '640px',
            zIndex: 1000,
          }}
        >
          <div
            className='searchBar'
            style={{
              width: '100%',
              color: 'var(--gray-400, #878E9C)',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              padding: '16px 12px 22px 20px',
              borderBottom: '1px solid #F0F2F5',
            }}
          >
            <button
              type='button'
              style={{
                display: 'flex',
              }}
              onClick={() => setIsSearchBarOpen(false)}
            >
              <Icon name='icon-back' />
            </button>
            <input
              type='text'
              id='search-bar'
              placeholder='무엇이든 한 번에 찾아보세요'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              style={{
                color: 'var(--gray-400, #878E9C)',
                backgroundColor: 'white',
                border: 'none',
                flex: 1,
              }}
            />
            <button
              type='button'
              onClick={() => handleSearchIconClick(searchValue)}
              style={{ display: 'flex' }}
            >
              <Icon name='icon-search-line' />
            </button>
          </div>
          <div
            className='filterList'
            style={{
              width: '100%',
              height: 'calc(100vh - 56px)',
              backgroundColor: 'white',
              padding: '24px 20px',
            }}
          >
            <div>언제 필요한가요?</div>
            <ul>
              <li>직접조리</li>
              <li>픽업</li>
              <li>매장식사</li>
              <li>재료민</li>
            </ul>
            <div>어떤 방식을 선호하나요?</div>
            <ul>
              <li>직접조리</li>
              <li>픽업</li>
              <li>매장식사</li>
              <li>재료민</li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
