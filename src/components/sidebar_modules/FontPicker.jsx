import fonts from '../../data/fonts'
export default function FontPicker({ element, setter }) {
    return (
        <div className='flex flex-row text-center items-center'>
            <label className="w-25 text-xs font-bold text-gray-500 uppercase block">
                Font:
            </label>
            <select value={element}
                onChange={(e) => setter(e.target.value)}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            >
                {fonts.map(name => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
        </div>
    )
}
