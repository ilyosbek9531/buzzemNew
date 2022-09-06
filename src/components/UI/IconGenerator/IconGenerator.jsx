import { memo } from 'react'
import SVG from 'react-inlinesvg'

export const baseIconURL = process.env.NEXT_PUBLIC_ICON_PICKER_CDN_BASE_URL

const IconGenerator = ({icon, size = 20, ...props}) => {

    if (!icon) return null

    return (
        <SVG
            src={`${baseIconURL}${icon}`}
            width={size}
            height={size}
            preProcessor={(code) =>
                code.replace('path', 'path fill="currentColor"')
            }
            {...props}
            />
    )
}

export default memo(IconGenerator)