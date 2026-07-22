import { Volume2Icon } from 'lucide-react'

const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
    <div className='flex items-center gap-3 flex-1'>
      <Volume2Icon className='text-gray-400 hover:text-white transition-colors cursor-pointer' size={24} />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
        className='w-full h-2 bg-[#5a3a3a]/40 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-red-500 
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-red-500/30
          [&::-moz-range-thumb]:w-4 
          [&::-moz-range-thumb]:h-4 
          [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-red-500 
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0'
        style={{
          background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume}%, #5a3a3a/40 ${volume}%, #5a3a3a/40 100%)`
        }}
      />
    </div>
  )
}

export default VolumeControl