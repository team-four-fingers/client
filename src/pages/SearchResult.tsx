import { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import ImageMarker from '../components/Marker/ImageMarker'
import BasicMarker from '../components/Marker/BasicMarker'
import ProductDetailModal from '../components/ProductDetailModal'
import { useLocation } from 'react-router-dom'
import { SearchResultList, SearchResultItem } from './Search'
import SearchResultHeader from '../components/SearchResultHeader'

type Marker = {
  id: number
  position: { lat: number; lng: number }
  imageUrl: string
  handleClick: () => void
  focus: boolean
}

export default function SearchResult() {
  const { state } = useLocation()
  const { resultList } = state as { resultList: SearchResultList }
  const currentPosition = { lat: 37.54412, lng: 127.043412 }
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<SearchResultItem | null>(null)

  const [markers, setMarkers] = useState<Marker[]>(
    resultList.results.map(result => {
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
    setModalData(resultList.results.find(result => result.result_id === id) || null)
    setIsModalOpen(true)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SearchResultHeader keyword='샤브샤브' count={resultList.results.length} />
      <Map center={currentPosition} style={{ width: '100%', height: '100%' }}>
        <BasicMarker position={currentPosition} type='current' />
        {markers.map(({ id, position, focus, imageUrl, handleClick }) => (
          <ImageMarker
            key={id}
            position={position}
            color={focus ? 'blue' : 'gray'}
            imageUrl={imageUrl}
            handleClick={handleClick}
          />
        ))}
      </Map>
      {isModalOpen && modalData && <ProductDetailModal data={modalData} />}
    </div>
  )
}
