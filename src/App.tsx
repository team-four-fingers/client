import { RecoilRoot } from 'recoil'
import RouterProvider from './router'
import './styles/global.scss'

function App() {
  return (
    <RecoilRoot>
      <RouterProvider />
    </RecoilRoot>
  )
}

export default App
