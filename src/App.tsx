import { RecoilRoot, RecoilEnv } from 'recoil'
import RouterProvider from './router'
import './styles/global.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            useErrorBoundary: true,
          },
        },
      }),
  )

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
