import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function SphereCore() {
  const sphereCore = useGLTF('./SphereCore.glb')
  const animations = useAnimations(sphereCore.animations, sphereCore.scene)

  useEffect(() => {
    const action = animations.actions['SphereCoreAnimation']
    action.play()
  }, [])

  return <primitive object={sphereCore.scene} />
}
