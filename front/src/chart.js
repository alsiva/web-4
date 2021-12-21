import {useSelector} from "react-redux";

const chartRadius = 140;
const size = 400
const axisSize = 175
const arrowLength = 15
const arrowWidth = 8

export function Chart() {
    const hits = useSelector(state => state.area.hits);

    return (
        <svg
            version="1.1"
            width={size}
            height={size}
            viewBox={`${-size/2} ${-size/2} ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="#09b0e8">
                <rect x="0" y="0" width={chartRadius/2} height={chartRadius}/>
                <polygon points={`0,0 0,${chartRadius} -${chartRadius},0`} />
                <path d={`M 0 ${-chartRadius/2} A ${chartRadius/2} ${chartRadius/2} 0 0 0 ${-chartRadius/2} 0 L 0 0`}/>
            </g>


            <line x1="0" x2="0" y1={-axisSize} y2={axisSize} stroke="black" strokeWidth="1"/>
            <line x1={-axisSize} x2={axisSize} y1="0" y2="0" stroke="black" strokeWidth="1"/>

            {[0, 90, 180, 270].map(angle => (
                <g key={angle} transform={`rotate(${angle} 0 0)`}>
                    <line x1="-5" x2="5" y1={`${chartRadius/2}`} y2={`${chartRadius/2}`} stroke="black" strokeWidth="1"/>
                    <line x1="-5" x2="5" y1={`${chartRadius}`} y2={`${chartRadius}`} stroke="black" strokeWidth="1"/>
                </g>
            ))}
            {[180, 270].map(angle => (
                <polygon
                    key={angle}
                    points={`0,${axisSize + arrowLength} ${-arrowWidth/2},${axisSize} ${arrowWidth/2},${axisSize}`}
                    transform={`rotate(${angle} 0 0)`}
                />
            ))}


            <text x="5" y={`${chartRadius/2}`}>-R/2</text>
            <text x="5" y={`${chartRadius}`}>-R</text>
            <text x="10" y={`${-chartRadius/2}`}>R/2</text>
            <text x="10" y={`${-chartRadius}`}>R</text>

            <text x={`${-chartRadius}`} y="-10" textAnchor="middle">-R</text>
            <text x={`${-chartRadius/2}`} y="-10" textAnchor="middle">-R/2</text>
            <text x={`${chartRadius/2}`} y="-10" textAnchor="middle">R/2</text>
            <text x={`${chartRadius}`} y="-10" textAnchor="middle">R</text>

            {hits.map(hit => {
                const ratio = chartRadius / hit.r

                return (
                    <circle
                        cx={hit.x * ratio}
                        cy={-hit.y * ratio}
                        r="5"
                        stroke="black"
                        strokeWidth="0.5"
                        fill={hit.doesHit ? "#018F27" : "#8F0004"}
                    />
                );
            })}
        </svg>
    )
}
