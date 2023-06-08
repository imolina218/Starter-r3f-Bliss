import { /*useAnimations, */ useGLTF } from '@react-three/drei'
//import { useEffect } from 'react'

export default function Tiles() {
  const tiles = useGLTF('./Tiles.glb')
  //const animations = useAnimations(tiles.animations, tiles.scene)

  /* useEffect(() => {
    for (const animation in animations.actions) {
      const action = animations.actions[animation]
      action.play()
    }
  }, []) */

  return <primitive object={tiles.scene} />
}
