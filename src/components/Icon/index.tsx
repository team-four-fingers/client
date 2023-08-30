import sprite from './sprite.svg'

export type IconNameType =
  | 'icon_arrowRight'
  | 'icon_check'
  | 'icon_minus'
  | 'icon_plus'
  | 'icon_spot'

type IconType = {
  name: IconNameType
  size?: 12 | 24
}

export default function Icon({ name, size = 24 }: IconType) {
  return (
    <svg width={size} height={size}>
      <use href={`${sprite}#${name}`} />
    </svg>
  )
}
