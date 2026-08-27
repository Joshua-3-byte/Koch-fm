import React, { useRef, useEffect } from 'react'
import useRadioStore from '../stores/useRadioStore'
import { RADIO_STREAM_URL } from '../lib/constants'

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null)
  const { setAudioRef, volume } = useRadioStore()

  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current)
      audioRef.current.volume = volume / 100
    }
  }, [setAudioRef, volume])

  return (
    <audio
      ref={audioRef}
      src={RADIO_STREAM_URL}
      preload="metadata"
      style={{ display: 'none' }}
    />
  )
}

export default GlobalAudioPlayer