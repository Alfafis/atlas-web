import { FC } from 'react'

export const IconCoding: FC<App.IconProps> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 33 26"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M31.9793 12.0121L24.5076 4.0962C24.0484 3.60915 23.2819 3.58694 22.7948 4.04653C22.3086 4.50575 22.286 5.27267 22.7456 5.75934L29.4325 12.8433L22.7456 19.9281C22.286 20.4147 22.3086 21.1813 22.7948 21.6409C23.0291 21.8618 23.3283 21.9712 23.6264 21.9712C23.9483 21.9712 24.2698 21.8436 24.5077 21.592L31.9794 13.6757C32.4199 13.2084 32.4199 12.479 31.9793 12.0121Z"
        fill={color}
      />
      <path
        d="M9.5646 19.9277L2.87808 12.8433L9.5646 5.75894C10.0238 5.27228 10.0016 4.50529 9.51493 4.04614C9.02864 3.58692 8.26128 3.60913 7.80213 4.0958L0.330451 12.0117C-0.11015 12.4786 -0.11015 13.2084 0.330451 13.6753L7.8025 21.5916C8.04079 21.8441 8.36187 21.9713 8.68377 21.9713C8.98182 21.9713 9.28113 21.8614 9.51493 21.6405C10.002 21.1813 10.0238 20.4143 9.5646 19.9277Z"
        fill={color}
      />
      <path
        d="M18.1152 0.013844C17.454 -0.0863042 16.8353 0.367613 16.7343 1.02877L13.1802 24.2919C13.0792 24.9535 13.5336 25.5718 14.1951 25.6728C14.2574 25.6821 14.3187 25.6866 14.3797 25.6866C14.9682 25.6866 15.4843 25.2572 15.576 24.6579L19.1301 1.39472C19.2311 0.733119 18.7767 0.114813 18.1152 0.013844Z"
        fill={color}
      />
    </svg>
  )
}