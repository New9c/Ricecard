const RiceRow = ({ label, value, y, color }) => (
    <text x="40" y={y} fontFamily="monospace" fontSize="16" className="animate-fade-in">
        <tspan fill={color} fontWeight="bold">{label}: </tspan>
        <tspan fill="#a9b1d6">{value}</tspan>
    </text>
);

export default function RiceCard({ fields, themeColor }) {
    return (
        <svg id="rice-svg" width="100%" height="100%" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="15" fill="#1a1b26" />

            {/* Window Controls */}
            <circle cx="25" cy="25" r="5" fill="#f7768e" />
            <circle cx="45" cy="25" r="5" fill="#e0af68" />
            <circle cx="65" cy="25" r="5" fill="#9ece6a" />

            {fields.map((field, index) => (
                <RiceRow
                    key={field.id}
                    label={field.label}
                    value={field.value}
                    y={70 + (index * 30)} // Each line is 30 units lower than the last
                    color={themeColor}
                />
            ))}
        </svg>
    );
}
