import { useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import ImageMarker from '../components/Marker/ImageMarker'
import BasicMarker from '../components/Marker/BasicMarker'
import ProductDetailModal from '../components/ProductDetailModal'
import { useLocation } from 'react-router-dom'
import { SearchResultItem } from './Search'
import SearchResultHeader from '../components/SearchResultHeader'
import productUrl from '../assets/product_sample.png'

type Marker = {
  id: number
  position: { lat: number; lng: number }
  imageUrl: string
  handleClick: () => void
  focus: boolean
}

export default function SearchResult() {
  const { state } = useLocation()
  const { resultList, keyword, myPosition } = state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<SearchResultItem | null>(null)
  const [map, setMap] = useState<kakao.maps.Map>()

  const [markers, setMarkers] = useState<Marker[]>(
    resultList.map((result: SearchResultItem) => {
      return {
        id: result.result_id,
        position: result.store.coordinate,
        imageUrl: result.product.image_url,
        focus: true,
        handleClick: () => handleMarkerClick(result.result_id),
      }
    }),
  )

  const handleMarkerClick = (id: number) => {
    setMarkers(prevMarkers =>
      prevMarkers.map(marker => ({
        ...marker,
        focus: marker.id === id,
      })),
    )
    setModalData(resultList.find((result: SearchResultItem) => result.result_id === id) || null)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const extendBounds = () => {
      if (markers.length < 0 || map === undefined) {
        return
      }

      const bounds = new kakao.maps.LatLngBounds()
      markers.forEach(marker => {
        bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng))
      })
      bounds.extend(new kakao.maps.LatLng(myPosition.lat, myPosition.lng))

      map.setBounds(bounds)
    }

    extendBounds()
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchResultHeader keyword={keyword} count={resultList.length} />
      <Map
        center={myPosition}
        onCreate={setMap}
        level={3}
        style={{ width: '100%', height: '100%' }}
      >
        <BasicMarker position={myPosition} type='current' />
        {markers.map(({ id, position, focus, handleClick }) => (
          <ImageMarker
            key={id}
            position={position}
            color={focus ? 'blue' : 'gray'}
            thumbnailUrl={productUrl}
            handleClick={handleClick}
          />
        ))}
      </Map>
      {isModalOpen && modalData && <ProductDetailModal data={modalData} />}
    </div>
  )
}
