import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Avatar({ ...props }) {
  const avatar = useGLTF('./Avatar.glb')
  const glossyMaterial = avatar.materials[0]
  const animations = useAnimations(avatar.animations, avatar.scene)
  // console.log(animations.names) check the animations
  const animationName = ['Running', 'Jumping', 'Landing']

  //console.log(animations)

  useEffect(() => {
    const action = animations.actions[animationName[props.animationNameIndex]]
    action.reset().fadeIn(0.5).play()

    //console.log(action)

    return () => {
      action.fadeOut(0.5)
    }
  }, [props.animationNameIndex])

  return <primitive object={avatar.scene} scale={0.4} />
}
