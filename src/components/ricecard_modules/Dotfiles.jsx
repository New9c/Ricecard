export default function Dotfiles({ dotfiles, theme }) {
    return (
        <g className={theme.haveAnimation ? "intro-text" : ""}>
            <a href={dotfiles.src}>
                <text x={dotfiles.x} y={dotfiles.y} fontSize={dotfiles.size} className={"hover-text"} style={{ animationDelay: '0.4s' }}>
                    <tspan fill={theme.text}>{dotfiles.title}</tspan>
                </text>
            </a>
        </g>
    )
}
