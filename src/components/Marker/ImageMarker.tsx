import { MapMarker } from 'react-kakao-maps-sdk'
import markerBlueUrl from '../../assets/image-marker-blue.svg'
import markerOrangeUrl from '../../assets/image-marker-orange.svg'
import markerGrayUrl from '../../assets/image-marker-gray.svg'

type ImageMarkerType = {
  position: { lat: number; lng: number }
  color: 'blue' | 'gray' | 'orange'
  thumbnailUrl: string
  handleClick?: () => void
}

const backgroundMarker = {
  blue: { src: markerBlueUrl, size: { width: 52, height: 72 } },
  orange: { src: markerOrangeUrl, size: { width: 52, height: 72 } },
  gray: { src: markerGrayUrl, size: { width: 52, height: 72 } },
}

export default function ImageMarker({
  position,
  color,
  thumbnailUrl,
  handleClick,
}: ImageMarkerType) {
  const imagePosition = { lat: position.lat, lng: position.lng }
  const imageSize = { width: 38, height: 72 }
  const imageInfo = { src: thumbnailUrl, size: imageSize }

  return (
    <>
      <MapMarker position={position} image={backgroundMarker[color]} />
      <MapMarker position={imagePosition} image={imageInfo} onClick={handleClick} />
    </>
  )
}
