import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M20.047 10a9.548 9.548 0 1 1-2.183-6.075.61.61 0 1 1-.94.775 8.328 8.328 0 1 0 1.882 5.91H10.5a.61.61 0 0 1 0-1.22h8.938a.61.61 0 0 1 .609.61Z"
    />
  </svg>
)
export default SvgComponent
