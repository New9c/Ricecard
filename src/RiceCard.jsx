const RiceRow = ({ label, value, y, color }) => (
    <text x="40" y={y} fontFamily="monospace" fontSize="16" className="animate-fade-in">
        <tspan fill={color} fontWeight="bold">{label}: </tspan>
        <tspan fill="#a9b1d6">{value}</tspan>
    </text>
);

export default function RiceCard({ dotfiles, dotfilesClick, fields, themeColor, image, haveCredit }) {
    // Let's make the height dynamic based on the number of fields
    const dynamicHeight = Math.max(220, 60 + fields.length * 35);

    return (
        <svg
            id="rice-svg"
            width="100%"
            height="100%"
            viewBox={`0 0 500 ${dynamicHeight}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="500" height={dynamicHeight} rx="15" fill="#1a1b26" />

            {/* The Uploaded Image (Left Side) */}
            {image ? (
                <image
                    href={image}
                    x="20"
                    y="20"
                    width="160"
                    height="90"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="inset(0% round 10px)" // Optional: rounds the corners of the image
                />
            ) : (
                <rect x="20" y="20" width="160" height="90" fill="#24283b" rx="10" />
            )}

            <text x="40" y="150" fontFamily="monospace" fontSize="16" className="animate-fade-in">
                <tspan fill="#a9b1d6">{dotfiles}</tspan>
            </text>
            {dotfilesClick &&
                <text x="20" y="200" fontFamily="monospace" fontSize="8" className="animate-fade-in">
                    <tspan fill="#a9b1d6">Check each choice by clicking!</tspan>
                </text>
            }
            {haveCredit &&
                <text x="320" y="200" fontFamily="monospace" fontSize="8" className="animate-fade-in">
                    <tspan fill="#a9b1d6">Made with danew9c.com/ricecard :)</tspan>
                </text>
            }

            {/* The Fields (Shifted to the right to make room for the image) */}
            <g transform="translate(200, 0)">
                {fields.map((field, index) => (
                    <RiceRow
                        key={field.id}
                        label={field.label}
                        value={field.value}
                        y={70 + (index * 35)}
                        color={themeColor}
                    />
                ))}
            </g>
        </svg>
    );
}
