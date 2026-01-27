const RiceRow = ({ label, value, src, x, y, size, theme }) => (
    <a href={src}>
        <text x={x} y={y} fontSize={size} className="transition-transform duration-300 hover:-translate-y-1 animate-fade-in">
            <tspan fill={theme.accent} fontWeight="bold">{label} </tspan>
            <tspan fill={theme.text}>{value}</tspan>
        </text>
    </a>
);

export default function RiceCard({ activeFont, dotfiles, hint, fields, theme, image, credit }) {
    return (
        <svg
            id="rice-svg"
            width="100%"
            height="100%"
            viewBox={`-15 -15 ${theme.width + 30} ${theme.height + 30}`}
            xmlns="http://www.w3.org/2000/svg"
            fontFamily={activeFont?.name || "monospace"}
        >
            <defs>
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
                {activeFont && (
                    <style>
                        {`@font-face {
        					  font-family: "${activeFont.name}";
        					  src: url("${activeFont.base64}") format("woff2");
        					}`}
                    </style>
                )}
            </defs>
            <rect width={theme.width} height={theme.height} rx={theme.radius} fill={theme.bg} filter={theme.haveBacklight ? "url(#blur)" : undefined} />

            {image.url ? (
                <image
                    href={image.url}
                    x={image.x}
                    y={image.y}
                    width={image.width}
                    height={image.height}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`inset(0% round ${image.radius}px)`} // Optional: rounds the corners of the image
                />
            ) : (
                <rect x={image.x} y={image.y} width={image.width} height={image.height}
                    fill={theme.accent} rx={image.radius} />
            )}

            <a href={dotfiles.src}>
                <text x={dotfiles.x} y={dotfiles.y} fontSize={dotfiles.size} className="transition-transform duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer">
                    <tspan fill={theme.text}>{dotfiles.title}</tspan>
                </text>
            </a>
            {hint.show &&
                <text x={hint.x} y={hint.y} fontSize={hint.size} className="animate-fade-in">
                    <tspan fill={theme.text}>Things that hover are all links!</tspan>
                </text>
            }
            {credit.show &&
                <text x={credit.x} y={credit.y} fontSize={credit.size} className="transition-transform duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer">
                    <tspan fill={theme.text}>Made with danew9c.com/ricecard :)</tspan>
                </text>
            }

            {/* The fields.values (Shifted to the right to make room for the image) */}
            {fields.values.map((field, index) => (
                <RiceRow
                    key={field.id}
                    label={field.label}
                    value={field.value}
                    src={field.src}
                    x={fields.x}
                    y={fields.y + (index * fields.gap)}
                    size={fields.size}
                    theme={theme}
                />
            ))}
        </svg>
    );
}
