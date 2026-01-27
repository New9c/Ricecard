export default function RiceRow({ label, value, src, x, y, size, theme }) {
    return (
        <g className={theme.haveAnimation ? "intro-text" : ""}>
            {src && src.trim().length > 0 ?
                <a href={src}>
                    <text x={x} y={y} fontSize={size} className={"hover-text"}>
                        <tspan fill={theme.accent} fontWeight="bold">{label} </tspan>
                        <tspan fill={theme.text}>{value}</tspan>
                    </text>
                </a> :
                <text x={x} y={y} fontSize={size} className={"hover-text"}>
                    <tspan fill={theme.accent} fontWeight="bold">{label} </tspan>
                    <tspan fill={theme.text}>{value}</tspan>
                </text>
            }
        </g>
    )
};
