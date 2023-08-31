import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Search from '../pages/Search.tsx'
import Cart from '../pages/Cart.tsx'
import SavedRoutes from '../pages/SavedRoutes.tsx'
import SearchResult from '../pages/SearchResult.tsx'
import Preview from '../pages/Preview.tsx'
import BestRoute from '../pages/BestRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: 'searchResult',
    element: <SearchResult />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'preview',
    element: <Preview />,
  },
  {
    path: 'savedRoutes',
    element: <SavedRoutes />,
  },
  {
    path: 'bestRoute',
    element: <BestRoute />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
