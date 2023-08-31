import axios from 'axios'

const API_BASE_URL = 'https://server-pu7vk6hfqq-du.a.run.app'

const ApiPath = { routes: '/routes' } as const

//TODO: api 폴더로 이동
export const routeApi = (request: typeof MOCK_REQUEST) => {
  return axios.post<TempType>(`${API_BASE_URL}${ApiPath.routes}`, request)
}

interface TempType {
  Origin: Coordinate
  Destination: Coordinate
  Waypoints: Coordinate[]
  CoordinatesInOrder: Coordinate[]
}

interface Coordinate {
  x: number
  y: number
}

export const MOCK_ORIGIN = {
  x: 126.946362033068,
  y: 37.5404741779088,
}
export const MOCK_DESTINATION = {
  x: 127.1101250888609,
  y: 37.39407843730005,
}

const MOCK_STORE1 = {
  coordinate: {
    x: 126.92716700037366,
    y: 37.5266641708316,
  },
  name: '상점1',
  operation_hours: '',
  has_parking_lot: true,
  distance_from_origin: 0,
}

const MOCK_REQUEST = {
  origin: MOCK_ORIGIN,
  destination: MOCK_DESTINATION,
  waypoints: [MOCK_STORE1],
}
