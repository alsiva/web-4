import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {addPoint} from "./area";

const size = 400
const axisSize = 175
const arrowLength = 15
const arrowWidth = 8
const scale = 30;

function getChartCoordinate(value) {
    return Math.round(100 * value / scale) / 100
}

export function Chart() {
    const hits = useSelector(state => state.area.hits);
    const ref = useRef()
    const dispatch = useDispatch()
    const r = useSelector(state => state.area.form.r.value)
    const isLoading = useSelector(state => state.area.isLoading)

    const scaledRadius = r * scale
    const spinnerRadius = scaledRadius / 4;

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
                <rect x="0" y={-scaledRadius} width={scaledRadius/2} height={scaledRadius}/>
                <polygon points={`0,0 0,${-scaledRadius} -${scaledRadius},0`} />
                <path d={`M 0 ${scaledRadius/2} A ${scaledRadius/2} ${scaledRadius/2} 0 0 1 ${-scaledRadius/2} 0 L 0 0`}/>
            </g>


            <line x1="0" x2="0" y1={-axisSize} y2={axisSize} stroke="black" strokeWidth="1"/>
            <line x1={-axisSize} x2={axisSize} y1="0" y2="0" stroke="black" strokeWidth="1"/>

            {[0, 270].map(angle => (
                <polygon
                    key={angle}
                    points={`0,${axisSize + arrowLength} ${-arrowWidth/2},${axisSize} ${arrowWidth/2},${axisSize}`}
                    transform={`rotate(${angle} 0 0)`}
                />
            ))}

            <g transform="scale(1, -1)">
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map(i => {
                    let scaledI = i * scale;

                    return (
                        <g key={i}>
                            <text x="-10" y={scaledI} alignmentBaseline="middle" textAnchor="end">{-i}</text>
                            <line x1="-5" x2="5" y1={scaledI} y2={scaledI} stroke="black" strokeWidth="1" />

                            <text x={scaledI + 4} y="-10" textAnchor="end">{i}</text>
                            <line x1={scaledI} x2={scaledI} y1="-5" y2="5" stroke="black" strokeWidth="1" />
                        </g>
                    );
                })}
            </g>

            {hits.map(hit => {
                const ratio = scaledRadius / hit.r

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
