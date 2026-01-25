export default function BorderRadius({ element, setter }) {
    return (
        <div className='mt-4 flex flex-row text-center items-center'>
            <label className="w-45 text-xs font-bold text-gray-500 uppercase block">
                Border Radius:
            </label>
            <input
                type="number"
                min="0"
                max="250"
                value={element.radius}
                onChange={(e) => setter({ ...element, radius: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
        </div>
    )
}
