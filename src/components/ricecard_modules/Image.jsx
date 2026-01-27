export default function Image({ image, theme }) {
    return (
        image.url ? (
            <image
                href={image.url}
                x={image.x}
                y={image.y}
                width={image.width}
                height={image.height}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`inset(0% round ${image.radius}px)`}
            />
        ) : (
            <rect x={image.x} y={image.y} width={image.width} height={image.height}
                fill={theme.accent} rx={image.radius} />
        )
    )
}
