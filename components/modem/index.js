import { useGLTF } from '@react-three/drei'

export default function Router() {
  const router = useGLTF('./Router.glb')

  return <primitive object={router.scene} />
}
