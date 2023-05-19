//import { Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  //Bloom,
  BrightnessContrast,
  EffectComposer,
  /* Noise, */
  ToneMapping,
} from '@react-three/postprocessing'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider, editable as e } from '@theatre/r3f'
import Avatar from 'components/avatar'
import Logo from 'components/bliss-logo'
import Cubes from 'components/cubes'
import Router from 'components/modem'
import SphereCore from 'components/sphere-core'
import Tiles from 'components/tiles'
import { useEffect, useRef } from 'react'
import demoProjectState from '../../public/state.json'
import s from './experience.module.scss'

export default function Experience({ ...props }) {
  /* const demoSheet = getProject('Demo Project', {
    state: demoProjectState,
  }).sheet('Demo Sheet') */

  /* const cameraSheet = project.sheet('Camera Sheet')
  const lightSheetRot = project.sheet('Light Sheet')
  const avatarSheet = project.sheet('Avatar Sheet') */

  /* mainSheet.sequence.position =
  props.scrollProgress * val(mainSheet.sequence.length) */

  const project = getProject('Bliss Project', { state: demoProjectState })
  const mainSheet = project.sheet('Main Sheet')
  const cubeRef = useRef(0)
  const avatarRef = useRef(0)
  let animBreakpoint =
    props.sequenceRef.current !== null ? props.sequenceRef.current[0] : 1

  useEffect(() => {
    if (animBreakpoint === 4) {
      cubeRef.current = 1
      avatarRef.current = 1
    } else {
      avatarRef.current = 0
    }

    project.ready.then(() =>
      mainSheet.sequence.play({
        direction: 'alternateReverse',
        range: props.sequenceRef.current[1],
      })
    )
  }, [animBreakpoint])

  //console.log(cubeRef.current)

  return (
    <div className={s['canvas']}>
      <Canvas
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
        dpr={1}
      >
        <SheetProvider sheet={mainSheet}>
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            position={[5, 5, -5]}
            fov={45}
          />

          <e.ambientLight theatreKey="Main light" />
          <e.pointLight theatreKey="Light01" position={[1, 1, 1]} />
          <e.pointLight theatreKey="Light02" position={[1, 1, 1]} />

          {/* <Sparkles
            theatreKey="Sparkles"
            size={6}
            scale={[14, 2, 10]}
            position-y={1}
            position-x={-1}
            speed={2}
            count={120}
            noise={2}
          /> */}

          <e.mesh theatreKey="Avatar">
            <Avatar animationNameIndex={avatarRef.current} />
          </e.mesh>

          <e.group theatreKey="Cubes">
            <Cubes animationIndex={cubeRef.current} />
          </e.group>

          <e.mesh theatreKey="Logo">
            <Logo />
          </e.mesh>

          <e.mesh theatreKey="Router">
            <Router />
          </e.mesh>

          <e.mesh theatreKey="SphereCore">
            <SphereCore />
          </e.mesh>

          <e.group theatreKey="Tiles">
            <Tiles />
          </e.group>
        </SheetProvider>

        <EffectComposer>
          <ToneMapping
            blendFunction={1} // optional, default is 0 (NoBlending)
            exposure={0.5} // optional, default is 1
            gamma={2.2} // optional, default is 2.2
            whitePoint={16.0} // optional, default is 11.2
          />
          {/* <Bloom
            luminanceThreshold={1}
            intensity={1.25}
            levels={9}
            mipmapBlur
          /> */}
          {/* <Noise opacity={0.05} /> */}
          <BrightnessContrast brightness={0} contrast={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
