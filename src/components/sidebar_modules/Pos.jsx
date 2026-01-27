export default function Pos({ element, setter, max_width, max_height }) {
    return (
        <div className='flex flex-row text-center items-center'>
            <label className="text-xs font-bold text-gray-500 uppercase block">
                X:
            </label>
            <input
                type="number"
                min="0"
                max={max_width}
                value={element.x}
                onChange={(e) => setter({ ...element, x: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
            <label className="ml-2 text-xs font-bold text-gray-500 uppercase block">
                Y:
            </label>
            <input
                type="number"
                min="0"
                max={max_height}
                value={element.y}
                onChange={(e) => setter({ ...element, y: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
        </div>
    )
}
