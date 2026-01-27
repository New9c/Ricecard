import RiceRow from './RiceRow'

export default function Fields({ fields, theme }) {
    return (
        fields.values.map((field, index) => (
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
        ))
    )
}
