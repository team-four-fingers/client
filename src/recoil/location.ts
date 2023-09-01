import { atom } from 'recoil'
import { Coordinate } from '../api'

export const MOCK_ORIGIN = {
  x: 126.946362033068,
  y: 37.5404741779088,
}
export const MOCK_DESTINATION = {
  x: 127.1101250888609,
  y: 37.39407843730005,
}

export const originState = atom<Coordinate>({
  key: 'originState',
  default: { y: 37.3941037, x: 127.1100201 },
})

export const destinationState = atom<Coordinate>({
  key: 'destinationState',
  default: { x: 127.091838, y: 37.511789 },
})
