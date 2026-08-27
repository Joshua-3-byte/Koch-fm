import { create } from 'zustand'

const useRadioStore = create((set, get) => ({
  isPlaying: false,
  volume: 75,
  audioRef: null,
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (vol) => set({ volume: vol }),
  setAudioRef: (ref) => set({ audioRef: ref }),
  
  togglePlay: () => {
    const { audioRef, isPlaying } = get()
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause()
      } else {
        audioRef.play().catch(error => {
          console.error('Error playing audio:', error)
        })
      }
      set({ isPlaying: !isPlaying })
    }
  },
  
  handleVolumeChange: (newVolume) => {
    const { audioRef } = get()
    set({ volume: newVolume })
    if (audioRef) {
      audioRef.volume = newVolume / 100
    }
  }
}))

export default useRadioStore