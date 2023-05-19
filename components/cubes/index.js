import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Cubes({ ...props }) {
  const cubes = useGLTF('./Cubes.glb')
  const animations = useAnimations(cubes.animations, cubes.scene)

  //console.log(animations.actions)
  //console.log(props.animationIndex)
  useEffect(() => {
    if (props.animationIndex === 1) {
      for (const animation in animations.actions) {
        const action = animations.actions[animation]
        action.reset().play().halt(40) //.halt(6.5)
      }
    }
    /* const action = animations.actions['Cube.015Action']
    console.log(action)

    action.play() */
  }, [props.animationIndex])

  return <primitive object={cubes.scene} />
}
