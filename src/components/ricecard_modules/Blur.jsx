export default function Blur({ theme }) {
    return (
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
            <feFlood floodColor={theme.accent} result="glowColor" />
            <feComposite in="glowColor" in2="offsetBlur" operator="in" result="glow" />
            <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    )
}
