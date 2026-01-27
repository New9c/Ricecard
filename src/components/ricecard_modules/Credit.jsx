export default function Credit({ credit, theme }) {
    return (
        credit.show &&
        <a href="https://danew9c.com/ricecard" className={theme.haveAnimation ? "intro-text" : ""}>
            <text x={credit.x} y={credit.y} fontSize={credit.size} className="hover-text" style={{ animationDelay: '0.8s' }}>
                <tspan fill={theme.text}>Made with ricecard.danew9c.com :)</tspan>
            </text>
        </a>
    )
}
