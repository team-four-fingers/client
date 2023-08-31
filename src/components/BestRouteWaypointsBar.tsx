import Icon from './Icon'

export const BestRouteWaypointsBar = ({ waypointNames }: { waypointNames: string[] }) => {
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
          gap: '10px',
        }}
      >
        <Icon name='icon-back' size={24} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          {waypointNames.map((name, index) => {
            return (
              <>
                <div style={{ fontSize: '16px', color: 'var(--gray-400, #878E9C)' }}>{name}</div>
                {index < waypointNames.length - 1 && <Icon name='icon-arrow_right' size={16} />}
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
