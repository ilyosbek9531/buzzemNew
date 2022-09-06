import { CircularProgress } from "@mui/material"
import styles from "./RectangleIconButton.module.scss"

const RectangleIconButton = ({
  color,
  children,
  loader,
  className,
  size="",
  onClick = () => {},
  ...props
}) => {
  return (
    <div
      className={`${styles.RectangleIconButton} ${color} ${className} ${size}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick(e)
      }}
      {...props}
    >
      {loader ? <CircularProgress size={14} /> : children}
    </div>
  )
}

export default RectangleIconButton
