import { useGLTF } from '@react-three/drei'

export default function Logo() {
  const logo = useGLTF('./BlissLogo.glb')

  return <primitive object={logo.scene} />
}
