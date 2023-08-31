import { useRecoilState } from 'recoil'
import { cartItemsState } from '../recoil/cart-items'
import { useEffect } from 'react'

export default function BestRoute() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState)

  useEffect(() => {
    ;(async () => {
      const response = await mockRouteApi({
        origin: MOCK_ORIGIN,
        destination: MOCK_DESTINATION,
        waypoints: cartItems.items.map(item => item.store),
      })
      console.log(response)
    })()
  }, [cartItems])

  return <div>BestRoute</div>
}

const MOCK_ORIGIN = {
  x: 126.946362033068,
  y: 37.5404741779088,
}
const MOCK_DESTINATION = {
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

const MOCK_RESPONSE = {
  origin: MOCK_ORIGIN,
  destination: MOCK_DESTINATION,
  waypoints: [MOCK_STORE1],
  coordinates_in_order: [
    {
      x: 126.94645738299782,
      y: 37.540648597491284,
    },
    {
      x: 126.94653569519582,
      y: 37.54071236917905,
    },
    {
      x: 126.94653569519582,
      y: 37.54071236917905,
    },
    {
      x: 126.94689011122018,
      y: 37.54045422807421,
    },
    {
      x: 126.94689011122018,
      y: 37.54045422807421,
    },
    {
      x: 126.9462178533875,
      y: 37.53997968834302,
    },
    {
      x: 126.94533317532066,
      y: 37.539323039149224,
    },
    {
      x: 126.9450757454925,
      y: 37.539122510164596,
    },
    {
      x: 126.94489624519147,
      y: 37.539012781266834,
    },
    {
      x: 126.94471725331348,
      y: 37.53886701491795,
    },
    {
      x: 126.9444824545317,
      y: 37.538666686888234,
    },
    {
      x: 126.94422502924127,
      y: 37.53846615609569,
    },
    {
      x: 126.9434846691338,
      y: 37.53800901281748,
    },
    {
      x: 126.94248575621307,
      y: 37.53743241413595,
    },
    {
      x: 126.94065691518657,
      y: 37.53633477018781,
    },
    {
      x: 126.93056313229121,
      y: 37.53005362446494,
    },
    {
      x: 126.92930810284975,
      y: 37.52920428221219,
    },
    {
      x: 126.92618073935613,
      y: 37.52716656044489,
    },
    {
      x: 126.92618073935613,
      y: 37.52716656044489,
    },
    {
      x: 126.92616663902785,
      y: 37.526571743557135,
    },
    {
      x: 126.9263506012221,
      y: 37.52636617613021,
    },
    {
      x: 126.92638505367019,
      y: 37.5263304475975,
    },
    {
      x: 126.92669538237965,
      y: 37.52599087179203,
    },
    {
      x: 126.92681017959238,
      y: 37.52587477936874,
    },
    {
      x: 126.92740781589528,
      y: 37.5252224468054,
    },
    {
      x: 126.92803886124038,
      y: 37.52460645608779,
    },
    {
      x: 126.92814156911192,
      y: 37.524544315221185,
    },
    {
      x: 126.92814156911192,
      y: 37.524544315221185,
    },
    {
      x: 126.92835481641949,
      y: 37.52466338614908,
    },
    {
      x: 126.92830789400247,
      y: 37.52478009607315,
    },
    {
      x: 126.92704424577205,
      y: 37.5261201879427,
    },
    {
      x: 126.92668815371744,
      y: 37.52649539050219,
    },
    {
      x: 126.92660767870801,
      y: 37.52658476344289,
    },
    {
      x: 126.92660767870801,
      y: 37.52658476344289,
    },
    {
      x: 126.92658415097829,
      y: 37.52664762264244,
    },
    {
      x: 126.9265832472903,
      y: 37.52671068747428,
    },
    {
      x: 126.92658234359953,
      y: 37.52677375230543,
    },
    {
      x: 126.9266039349301,
      y: 37.52684603203225,
    },
    {
      x: 126.92775888985206,
      y: 37.527568348258484,
    },
    {
      x: 126.92781480595625,
      y: 37.527613908101785,
    },
    {
      x: 126.92781480595625,
      y: 37.527613908101785,
    },
    {
      x: 126.92784861355264,
      y: 37.52762322546749,
    },
    {
      x: 126.92790504552839,
      y: 37.52763274821296,
    },
    {
      x: 126.9279276698993,
      y: 37.52763295359797,
    },
    {
      x: 126.92799592981201,
      y: 37.52760654193381,
    },
    {
      x: 126.92855782979024,
      y: 37.52708002546751,
    },
    {
      x: 126.92855782979024,
      y: 37.52708002546751,
    },
    {
      x: 126.92744786436701,
      y: 37.52637614646941,
    },
  ],
  duration_in_minutes: 32,
  distance_in_km: 10,
  eta: '',
  comparison: {
    saved_time_in_minutes: 0,
    saved_gas_cost: 0,
    control: {
      duration_in_minutes: 0,
      distance_in_km: 0,
      gas_cost: 0,
      route: {
        origin: {
          x: 0,
          y: 0,
        },
        destination: {
          x: 0,
          y: 0,
        },
        waypoints: [
          {
            coordinate: {
              x: 0,
              y: 0,
            },
            name: '',
            image_url: '',
            operation_hours: '',
            has_parking_lot: true,
            distance_from_origin: 0,
          },
        ],
      },
    },
    treatment: {
      duration_in_minutes: 0,
      distance_in_km: 0,
      gas_cost: 0,
      routes: [
        {
          origin: {
            x: 0,
            y: 0,
          },
          destination: {
            x: 0,
            y: 0,
          },
          waypoints: [
            {
              coordinate: {
                x: 0,
                y: 0,
              },
              name: '',
              image_url: '',
              operation_hours: '',
              has_parking_lot: true,
              distance_from_origin: 0,
            },
          ],
        },
      ],
    },
  },
}

const mockRouteApi = (request: typeof MOCK_REQUEST) => {
  console.log(request)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_RESPONSE)
    }, 1000)
  })
}
