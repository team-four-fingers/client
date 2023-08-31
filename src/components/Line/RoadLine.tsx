import { Polyline } from 'react-kakao-maps-sdk'

export const RoadLine = ({ path }: { path: { lat: number; lng: number }[] }) => {
  return (
    <>
      <Polyline
        path={path}
        strokeWeight={15}
        strokeColor={'#5C759D'}
        strokeOpacity={1}
        strokeStyle={'solid'}
      />
      <Polyline
        path={path}
        strokeWeight={13}
        strokeColor={'#84A7E2'}
        strokeOpacity={1}
        strokeStyle={'solid'}
      />
      <Polyline
        path={path}
        strokeWeight={2}
        strokeColor={'#FFFFFF'}
        strokeOpacity={1}
        strokeStyle={'shortdash'}
      />
    </>
  )
}
