import TapBar from '../components/TapBar'

export default function Search() {
  return (
    <div>
      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '640px', zIndex: 500 }}>
        <TapBar />
      </div>
    </div>
  )
}
