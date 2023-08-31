import { RecoilRoot, RecoilEnv } from 'recoil'
import RouterProvider from './router'
import './styles/global.scss'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

function App() {
  return (
    <RecoilRoot>
      <RouterProvider />
    </RecoilRoot>
  )
}

export default App
