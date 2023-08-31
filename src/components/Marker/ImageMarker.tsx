import { MapMarker } from 'react-kakao-maps-sdk'
import markerBlueUrl from '../../assets/image-marker-blue.svg'
import markerOrangeUrl from '../../assets/image-marker-orange.svg'
import markerGrayUrl from '../../assets/image-marker-gray.svg'

const backgroundMarker = {
  blue: { src: markerBlueUrl, size: { width: 52, height: 72 } },
  orange: { src: markerOrangeUrl, size: { width: 52, height: 72 } },
  gray: { src: markerGrayUrl, size: { width: 50, height: 72 } },
}

type ImageMarkerProps = {
  position: { lat: number; lng: number }
  color: 'blue' | 'gray' | 'orange'
  imageUrl: string
  handleClick?: () => void
}

export default function ImageMarker({ position, color, imageUrl, handleClick }: ImageMarkerProps) {
  const imagePosition = { lat: position.lat, lng: position.lng }
  const imageSize = color === 'gray' ? { width: 38, height: 72 } : { width: 38, height: 72 }
  const imageInfo = { src: imageUrl, size: imageSize }

  return (
    <>
      <MapMarker position={position} image={backgroundMarker[color]} />
      <MapMarker position={imagePosition} image={imageInfo} onClick={handleClick} />
    </>
  )
}
