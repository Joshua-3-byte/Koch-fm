import { useState, useRef, useEffect } from 'react'

export const RadioPlayer = (streamUrl) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const audioElement = (
    <audio
      ref={audioRef}
      src={streamUrl}
      preload="metadata"
    />
  )

  return {
    audioElement,
    isPlaying,
    volume,
    togglePlay,
    handleVolumeChange
  }
}