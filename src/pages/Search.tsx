import { Map } from 'react-kakao-maps-sdk'

import TapBar from '../components/TapBar'

export default function Search() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchBar value='' />
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '100%' }}
      ></Map>
      <TapBar />
    </div>
  )
}

// TODO: css 분리, 컴포넌트 이동
const SearchBar = ({ value }: { value: string }) => {
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
        <SearchIcon width={24} height={24} />
      </div>
    </div>
  )
}

const SearchIcon = ({
  width,
  height,
  color,
}: {
  width: number
  height: number
  color?: string
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.0292 18 13.8819 17.2445 15.2923 15.9995L20.6465 21.3537C21.037 21.7442 21.6701 21.7442 22.0607 21.3537C22.4512 20.9631 22.4512 20.33 22.0607 19.9395L16.6177 14.4965C17.4901 13.2151 18 11.6671 18 10C18 5.58172 14.4183 2 10 2Z'
      fill={color ? color : '#111111'}
    />
  </svg>
)
