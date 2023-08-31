import TapBar from '../components/TapBar'
import savedRouteContentUrl from '../assets/savedRouteContent.png'

export default function SavedRoutes() {
  return (
    <div>
      <div style={{ maxWidth: '390px', margin: '0 auto' }}>
        <img src={savedRouteContentUrl} alt='' />
      </div>
      <div style={{ content: ' ', display: 'block', clear: 'both', height: '240px' }}></div>
      <TapBar />
    </div>
  )
}
