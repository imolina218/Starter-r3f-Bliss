import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export const LoadingScreen = () => {
  const { progress } = useProgress()
  const [visible, setVisible] = useState('loadidng-container')

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setVisible('hidden')
      }, 2000)
    }
  }, [progress])

  return (
    <div id="container" className='visible'>
      <div className={'loading'}>
        <p>{progress.toFixed(0)}%</p>
        <div className={'progress-bar'} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
