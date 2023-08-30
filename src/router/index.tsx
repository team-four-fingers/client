import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Search from '../pages/Search.tsx'
import Cart from '../pages/Cart.tsx'
import SavedRoutes from '../pages/SavedRoutes.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'savedRoutes',
    element: <SavedRoutes />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
