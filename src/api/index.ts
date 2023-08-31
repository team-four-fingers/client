import axios from 'axios'

const API_BASE_URL = 'https://server-pu7vk6hfqq-du.a.run.app'

export const ApiPath = { mockRoutes: '/mock-routes', routes: '/routes' } as const

// TODO: 파일 분리
export const routeApi = (body: RoutesRequest) => {
  return axios.post<RoutesResponse>(`${API_BASE_URL}${ApiPath.routes}`, body)
}

interface RoutesRequest {
  origin: Coordinate
  destination: Coordinate
  waypoints: Waypoint[]
}

interface RoutesResponse {
  origin: Coordinate
  destination: Coordinate
  waypoints: Waypoint[]
  coordinates_in_order: Coordinate[]
  duration_in_minutes: number
  distance_in_km: number
  comparison: {
    saved_time_in_minutes: number
    saved_gas_cost: number
    control: {
      duration_in_minutes: number
      distance_in_km: number
      gas_cost: number
      route: {
        origin: Coordinate
        destination: Coordinate
        waypoints: null
      }
    }
    treatment: {
      duration_in_minutes: number
      distance_in_km: number
      gas_cost: number
      routes: null
    }
  }
}

interface Waypoint {
  coordinate: Coordinate
  name: string
  operation_hours: string
  has_parking_lot: boolean
  distance_from_origin: number
}

interface Coordinate {
  x: number
  y: number
}

// interface TempType {
//   Origin: Coordinate
//   Destination: Coordinate
//   Waypoints: Coordinate[]
//   CoordinatesInOrder: Coordinate[]
// }

export const MOCK_ORIGIN = {
  x: 126.946362033068,
  y: 37.5404741779088,
}
export const MOCK_DESTINATION = {
  x: 127.1101250888609,
  y: 37.39407843730005,
}

export const MOCK_STORE1 = {
  coordinate: {
    x: 126.92716700037366,
    y: 37.5266641708316,
  },
  name: '상점1',
  operation_hours: '',
  has_parking_lot: true,
  distance_from_origin: 0,
}

export const MOCK_REQUEST = {
  origin: MOCK_ORIGIN,
  destination: MOCK_DESTINATION,
  waypoints: [MOCK_STORE1],
}
