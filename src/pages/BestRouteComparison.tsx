import { useLocation, useNavigate } from 'react-router-dom'
import { Route, RoutesComparison } from '../api'
import Icon from '../components/Icon'
import { ReactNode } from 'react'

export default function BestRouteComparison() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const comparison = state.comparison as RoutesComparison

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          margin: '0px 20px',
          padding: '10px',
          height: '44px',
        }}
      >
        <div
          style={{ position: 'absolute', left: 0 }}
          onClick={() => {
            navigate(-1)
          }}
        >
          <Icon name='icon-back' size={24} />
        </div>
      </div>

      <div style={{ height: '16px' }} />
      <div
        style={{
          margin: '0 20px',
          color: 'var(--gray-050, #111)',
          fontSize: '22px',
          fontWeight: 700,
          lineHeight: '33px',
        }}
      >
        추천 경로로 김카모님의
        <br />
        시간{' '}
        <span style={{ color: 'var(--blue-100, #4A88E5)' }}>
          {comparison.saved_time_in_minutes}분
        </span>
        과 기름값{' '}
        <span style={{ color: 'var(--blue-100, #4A88E5)' }}>{comparison.saved_gas_cost}원</span>을
        <br />
        아낄 수 있어요
      </div>
      <div style={{ height: '12px' }} />
      <p
        style={{
          padding: '0px 20px',
          color: 'var(--gray-500, #9FA4B0)',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        * 기름값은 휘발유 1,735원, 평균 연비 10km/L로 계산
      </p>
      <div style={{ height: '24px' }} />
      <RouteInfo {...comparison.control} />
      <div style={{ height: '24px' }} />
      <RouteDetail route={comparison.control.route} />

      <div style={{ height: '60px' }} />

      <p
        style={{
          padding: '0px 20px',
          color: 'var(--gray-050, #111)',
          fontSize: '20px',
          fontWeight: 700,
        }}
      >
        만일 따로따로 간다면?
      </p>
      <div style={{ height: '24px' }} />
      <RouteInfo {...comparison.treatment} />
    </>
  )
}

const RouteDetail = ({ route }: { route: Route }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        margin: '0 12px',
        padding: '24px',
        borderRadius: '20px',
        background: 'var(--gray-800, #F4F5F7)',
      }}
    >
      <RouteDetailItem
        leftIcon={<DotIcon color='#E5A637' size={8} />}
        title={'출발'}
        content={''}
      />
      {route.waypoints?.map((waypoint, index) => {
        return (
          <RouteDetailItem
            leftIcon={
              <span
                style={{
                  color: 'var(--orange-300, #D64)',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </span>
            }
            title='경유'
            content={waypoint.name}
          />
        )
      })}
      <RouteDetailItem
        leftIcon={<DotIcon color='#4A88E5' size={8} />}
        title={'도착'}
        content={''}
      />
    </div>
  )
}

const DotIcon = ({ color, size }: { color?: string; size: number }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 8 8'
      fill='none'
    >
      <circle cx='4' cy='4' r='4' fill={color ?? '#FFFFFF'} />
    </svg>
  )
}

const RouteDetailItem = ({
  leftIcon,
  title,
  content,
}: {
  leftIcon: ReactNode
  title: string
  content: string
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {leftIcon}
      <span
        style={{
          marginLeft: '16px',
          color: 'var(--gray-050, #111)',
          fontSize: '15px',
          fontWeight: 700,
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginLeft: '8px',
          color: 'var(--gray-200, #555C68)',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        {content}
      </span>
    </div>
  )
}

const RouteInfo = ({
  distance_in_meters,
  duration_in_minutes,
  gas_cost,
}: {
  distance_in_meters: number
  duration_in_minutes: number
  gas_cost: number
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '0 20px' }}>
      <InfoItem title={'총 거리'} content={distance_in_meters / 1000 + 'km'} />
      <InfoItem title={'기름값'} content={gas_cost + '원'} />
      <InfoItem title={'소요 시간'} content={duration_in_minutes + '분'} />
    </div>
  )
}

const InfoItem = ({ title, content }: { title: string; content: string }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{ color: 'var(--gray-400, #878E9C)', fontSize: '16px', fontWeight: 500 }}>
        ・ {title}
      </span>
      <span style={{ color: 'var(--gray-050, #111)', fontSize: '18px', fontWeight: 700 }}>
        {content}
      </span>
    </div>
  )
}
