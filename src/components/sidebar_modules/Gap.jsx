export default function Gap({ element, setter }) {
    return (
        <div className='flex flex-row text-center items-center'>
            <label className="w-25 text-xs font-bold text-gray-500 uppercase block">
                Gap Size:
            </label>
            <input
                type="number"
                min="0"
                max="250"
                value={element.gap}
                onChange={(e) => setter({ ...element, gap: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
        </div>
    )
}
