export default function WidthHeight({ element, setter, max_width = 800, max_height = 500 }) {
    return (
        <div className='flex flex-row text-center items-center mb-4'>
            <label className="text-xs font-bold text-gray-500 uppercase block">
                Width:
            </label>
            <input
                type="number"
                min="0"
                max={max_width}
                value={element.width}
                onChange={(e) => setter({ ...element, width: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
            <label className="ml-2 text-xs font-bold text-gray-500 uppercase block">
                Height:
            </label>
            <input
                type="number"
                min="0"
                max={max_height}
                value={element.height}
                onChange={(e) => setter({ ...element, height: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
        </div>
    )
}
