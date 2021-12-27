import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {addPoint} from "./area";

const chartRadius = 140;
const size = 400
const axisSize = 175
const arrowLength = 15
const arrowWidth = 8
const spinnerRadius = chartRadius/4;


function getChartCoordinate(value) {
    return Math.round(100 * value / chartRadius) / 100
}

export function Chart() {
    const hits = useSelector(state => state.area.hits);
    const ref = useRef()
    const dispatch = useDispatch()
    const r = useSelector(state => state.area.form.r.value)
    const isLoading = useSelector(state => state.area.isLoading)

    return (
        <svg
            version="1.1"
            width={size}
            height={size}
            viewBox={`${-size/2} ${-size/2} ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
            onClick={event => {
                if (isLoading) {
                    return
                }
                let svg = ref.current

                let pt = svg.createSVGPoint();
                pt.x = event.clientX;
                pt.y = event.clientY;

                // The cursor point, translated into svg coordinates
                let transformedPt = pt.matrixTransform(svg.getScreenCTM().inverse());
                let x = getChartCoordinate(transformedPt.x)
                let y = getChartCoordinate(transformedPt.y)

                addPoint(dispatch, x, y, r)
            }}
            transform="scale(1, -1)"
        >
            <g fill="#09b0e8">
                <rect x="0" y={-chartRadius} width={chartRadius/2} height={chartRadius}/>
                <polygon points={`0,0 0,${-chartRadius} -${chartRadius},0`} />
                <path d={`M 0 ${chartRadius/2} A ${chartRadius/2} ${chartRadius/2} 0 0 1 ${-chartRadius/2} 0 L 0 0`}/>
            </g>


            <line x1="0" x2="0" y1={-axisSize} y2={axisSize} stroke="black" strokeWidth="1"/>
            <line x1={-axisSize} x2={axisSize} y1="0" y2="0" stroke="black" strokeWidth="1"/>

            {[0, 90, 180, 270].map(angle => (
                <g key={angle} transform={`rotate(${angle} 0 0)`}>
                    <line x1="-5" x2="5" y1={`${chartRadius/2}`} y2={`${chartRadius/2}`} stroke="black" strokeWidth="1"/>
                    <line x1="-5" x2="5" y1={`${chartRadius}`} y2={`${chartRadius}`} stroke="black" strokeWidth="1"/>
                </g>
            ))}
            {[0, 270].map(angle => (
                <polygon
                    key={angle}
                    points={`0,${axisSize + arrowLength} ${-arrowWidth/2},${axisSize} ${arrowWidth/2},${axisSize}`}
                    transform={`rotate(${angle} 0 0)`}
                />
            ))}

            <g transform="scale(1, -1)">
                <text x="5" y={`${chartRadius/2}`}>-R/2</text>
                <text x="5" y={`${chartRadius}`}>-R</text>
                <text x="10" y={`${-chartRadius/2}`}>R/2</text>
                <text x="10" y={`${-chartRadius}`}>R</text>

                <text x={`${-chartRadius}`} y="-10" textAnchor="middle">-R</text>
                <text x={`${-chartRadius/2}`} y="-10" textAnchor="middle">-R/2</text>
                <text x={`${chartRadius/2}`} y="-10" textAnchor="middle">R/2</text>
                <text x={`${chartRadius}`} y="-10" textAnchor="middle">R</text>
            </g>

            {hits.map(hit => {
                const ratio = chartRadius / hit.r

                return (
                    <circle
                        key={hit.id}
                        cx={hit.x * ratio}
                        cy={hit.y * ratio}
                        r="5"
                        stroke="black"
                        strokeWidth="0.5"
                        fill={hit.doesHit ? "#018F27" : "#8F0004"}
                    />
                );
            })}

            {isLoading && (
                <g>
                    <rect x={-size / 2} y={-size / 2} width={size} height={size} fill="#ffffffcc" />

                    <g strokeWidth="5" fill="none">
                        <circle cx="0" cy="0" r={spinnerRadius} stroke="#bbb" />
                        <path
                            stroke="#333"
                            d={`M 0 ${spinnerRadius} A ${spinnerRadius} ${spinnerRadius} 0 0 1 ${-spinnerRadius} 0`}
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="360 0 0"
                                to="0 0 0"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>

                </g>
            )}
        </svg>
    )
}
