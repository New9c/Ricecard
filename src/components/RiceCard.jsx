const RiceRow = ({ label, value, src, x, y, size, theme }) => (
    <a href={src}>
        <text x={x} y={y} fontSize={size} className="transition-transform duration-300 hover:-translate-y-1 animate-fade-in">
            <tspan fill={theme.accent} fontWeight="bold">{label}: </tspan>
            <tspan fill={theme.text}>{value}</tspan>
        </text>
    </a>
);

export default function RiceCard({ dotfiles, hint, fields, theme, image, credit }) {
    const fontUrlName = theme.font.replace(/\s+/g, '+');
    return (
        <svg
            id="rice-svg"
            width="100%"
            height="100%"
            viewBox={`0 0 500 250`}
            xmlns="http://www.w3.org/2000/svg"
            fontFamily={theme.font}
        >
            <defs>
                <style type="text/css">
                    {`@import url('https://fonts.googleapis.com/css2?family=${fontUrlName}&display=swap');`}
                </style>
            </defs>
            <rect width="500" height="250" rx="15" fill={theme.bg} />

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
