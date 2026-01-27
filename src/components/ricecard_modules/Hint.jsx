export default function Hint({ hint, theme }) {
    return (
        hint.show &&
        <g className={theme.haveAnimation ? "intro-text" : ""}>
            <text x={hint.x} y={hint.y} fontSize={hint.size} className={"animate-fade-in"} style={{ animationDelay: '0.8s' }}>
                <tspan fill={theme.text}>Things that hover are all links!</tspan>
            </text>
        </g>
    )
}
