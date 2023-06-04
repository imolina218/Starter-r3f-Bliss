import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'
import s from './loading-screen.module.scss'

export const LoadingScreen = () => {
  const { progress } = useProgress()
  const [visible, setVisible] = useState('loading-container')

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setVisible('hidden')
      }, 2000)
    }
  }, [progress])

  return (
    <div id="container" className={s[visible]}>
      <div className={s['loading']}>
        <p>{progress.toFixed(0)}%</p>
        <div className={s['progress-bar']} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
