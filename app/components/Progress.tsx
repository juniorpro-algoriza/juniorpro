import React from 'react'

const Progress = ({ width }: { width: number }) => {
    return (
        <div className="relative h-2.5 w-full bg-gray-200 rounded-full">
            <div className="absolute h-full [background:linear-gradient(90deg,#615FFF_0%,#AD46FF_100%)] rounded-full" style={{
                width: `${width}%`
            }}></div>
        </div>
    )
}

export default Progress