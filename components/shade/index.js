import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'
import s from './shade.module.scss'

export function Shade() {
  const { progress } = useProgress()
  const [visible, setVisible] = useState('visible')

  useEffect(() => {
    if (progress === 100) {
      setVisible('hidden')
    }
  }, [progress])

  return <div className={s[visible]} />
}
