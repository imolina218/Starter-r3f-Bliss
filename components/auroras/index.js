import { useProgress } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import { ShaderMaterial, Vector3, Vector4 } from 'three'

// Calculate screen size in inches
function getScreenSizeInInches() {
  const widthInches = window.innerWidth / window.devicePixelRatio / 96
  const heightInches = window.innerHeight / window.devicePixelRatio / 96
  return Math.sqrt(widthInches * widthInches + heightInches * heightInches)
}

class AuroraShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iResolution: { value: new Vector3(1920, 1080, 1) },
        iTime: { value: 0 },
        iMouse: { value: new Vector4() },
        screenSize: { value: getScreenSizeInInches() }, // Add screen size uniform
        opacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
      uniform vec3 iResolution;
      uniform float iTime;
      uniform vec4 iMouse;
      uniform float screenSize; // Add screen size uniform
      uniform float opacity;
      varying vec2 vUv;
    
      #define time iTime
    
      mat2 mm2(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, s, -s, c);
      }
    
      mat2 m2 = mat2(1.95534, 1.29552, -0.29552, 0.95534);
    
      float tri(float x) {
        return abs(fract(x) - 0.5);
      }
    
      vec2 tri2(vec2 p) {
        p = fract(p * vec2(5.0, 3.0));
        return vec2(abs(p.x - p.y), abs(p.x + p.y - 0.3));
      }
    
      float triNoise2d(vec2 p, float spd) {
        float z = 1.6;
        float z2 = 12.5;
        float rz = 0.0;
        p *= mm2(p.x * 0.26 + sin(time * 0.1) * 0.02);
        vec2 bp = p;
    
        for (int i = 0; i < 3; i++) {
          vec2 dg = tri2(bp * 1.85) * 0.75;
          dg *= mm2(time * spd + cos(time * 0.1) * 0.005);
          p -= dg / z2;
    
          bp *= 10.3;
          z2 *= 0.45;
          z *= 0.42;
          p *= 1.21 + (rz - 1.0) * 2.02;
    
          rz += tri(p.x + tri(p.y)) * z;
          p *= -m2;
        }
        return clamp(1.0 / pow(rz * 29.0, 1.3), 0.0, 0.55);
      }
    
      vec3 nmzHash33(vec3 q) {
        uvec3 p = uvec3(ivec3(q));
        p = p * uvec3(374761393U, 1103515245U, 668265263U) + p.zxy + p.yzx;
        p = p.yzx * (p.zxy ^ (p >> 3U));
        return vec3(p ^ (p >> 16U)) * (1.0 / vec3(0xffffffffU));
      }
    
      vec3 stars(in vec3 p) {
        vec3 c = vec3(0.);
        float res = iResolution.x;
    
        for (float i = 0.; i < 4.; i++) {
          vec3 q = fract(p * (.15 * res)) - 0.5;
          vec3 id = floor(p * (.15 * res));
          vec2 rn = nmzHash33(id).xy;
          float c2 = 1. - smoothstep(0., .6, length(q));
          c2 *= step(rn.x, .0005 + i * i * 0.001);
          c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.), rn.y) * 0.1 + 0.9);
          p *= 1.3;
        }
        return c * c * .8;
      }
    
      vec3 bg(vec3 rd) {
        float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd) * 1.1 + 0.5;
        sd = pow(sd, 5.2);
        vec3 col = mix(vec3(0.05, 0.05, 0.05), vec3(-1.9, -1.9, -1.2), sd); // Modify horizon into drastic grayscale gradient
        return col * 0.001;
      }
    
      vec4 aurora(vec3 ro, vec3 rd) {
        vec4 col = vec4(0.0);
        vec4 avgCol = vec4(0.0);
    
        for (int i = 0; i < 8; i++) {
          float of = 0.006 * smoothstep(0.0, 885.0, float(i));
          float pt = ((0.8 + pow(float(i), 1.4) * 0.002) - ro.y) / (rd.y * 2.0 + 0.4);
          pt -= of;
          vec3 bpos = ro + pt * rd;
          vec2 p = bpos.zx;
          float rzt = triNoise2d(p, .0018);
          vec4 col2 = vec4(0.0, 0.0, 0.0, rzt);
          col2.rgb = (sin(3.0 - vec3(6.85, -0.5, 1.2) + float(i) * 12.243) * 0.5 + 0.5) * rzt;
          avgCol = mix(avgCol, col2, 0.8);
          col += avgCol * exp2(-float(i) * 0.065 - 2.5) * smoothstep(0.0, 5.0, float(i));
        }
    
        col *= clamp(rd.y * 15.0 + 0.4, 0.0, 1.0);
    
        return col * 4.8;
      }
    
      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 q = fragCoord.xy / iResolution.xy;
        
        // Adjust for screen size
        if (screenSize > 14.0) { 
          q *= 1.75; // Adjust if the device is more than 14-inch
        } else {
          q *= 1.0;  // Adjust if the device is a 14-inch laptop
        }
    
        vec2 p = q - 0.6;
        // if (screenSize > 14.0) { 
        //   p -= 0.6; // Adjust if the device is more than 14-inch
        // } else {
        //   p -= 0.6; // Adjust if the device is a 14-inch laptop
        // }
        p.x *= 1920.0 / 1080.0; // Adjust aspect ratio
        
        vec3 ro = vec3(0.0, 0.0, -6.7); //PREV -2.7
        vec3 rd = normalize(vec3(p, 1.3));
        vec2 mo = iMouse.xy / iResolution.xy - 0.5;
        mo = (mo == vec2(-0.5)) ? vec2(-0.1, 0.1) : mo;
        mo.x *= iResolution.x / iResolution.y;
        rd.yz *= mm2(mo.y);
        rd.xz *= mm2(mo.x);
    
        vec3 col = vec3(0.0);
        vec3 brd = rd;
        float fade = smoothstep(0.0, 10.01, abs(brd.y)) * 0.1 + 0.9;
    
        col = bg(rd) * fade;
    
        // Linear gradient for opacity from top (opaque) to bottom
        float opacityGradientSkyBottom = mix(-1.4, 1.05, q.y);
        float opacityGradientSkyTop = mix(3.2, 0.92, q.y);
        float opacityGradientBottom = mix(0.55, -0.7, q.y);
      
        if (rd.y > 0.0) {
            vec4 aur = smoothstep(0.0, 1.5, aurora(ro, rd)) * fade;
            col += stars(rd) * opacityGradientSkyBottom;
            col = col * (-0.5 + aur.a) + aur.rgb * 0.05  * opacityGradientSkyTop * opacityGradientSkyBottom ;
        } else {
            rd.y = abs(rd.y);
            col = bg(rd) * fade * 0.1; // Gradiend fade proportions
            vec4 aur = smoothstep(0.0, 2.5, aurora(ro, rd) * 2.2);
            col += stars(rd) * 0.1;
            col = col * (1.0 - aur.a) + aur.rgb * 1.75  * opacityGradientBottom; //Manage aurora intensity
            
            // Calculate gradient based on rd.y
            float gradient = smoothstep(0.0, 1.0, rd.y);
            
            // Apply grayscale gradient from horizon (darker) to bottom (lighter)
            vec3 gradientColor = mix(vec3(0.2), vec3(0.8), gradient);
            
            vec3 pos = ro + ((0.28 - ro.y) / rd.y) * rd;
            float nz2 = triNoise2d(pos.xz * vec2(0.5, 0.7), 1.5);
            col += mix(vec3(0.01) * 0.01, gradientColor * 0.5, nz2 * 1.0);
        }
        
        float gray = dot(col, vec3(0.299, 0.587, 0.114)); // Convert to grayscale
        
        fragColor = vec4(vec3(gray), opacity);
      }
    
      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
      `,
    })
  }
}

export default function AuroraShader() {
  const materialRef = useRef()
  const { loaded } = useProgress()

  useEffect(() => {
    const mainCanvas = document.querySelector('.main-canvas')

    gsap.set(mainCanvas, { opacity: 0 })

    gsap.to(mainCanvas, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [loaded])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.iResolution.value.set(1920, 1080, 1)
      materialRef.current.uniforms.screenSize.value = getScreenSizeInInches() // Update screen size
    }
  })

  const shaderMaterial = useMemo(() => new AuroraShaderMaterial(), [])

  return (
    <mesh position={[10.0, 0.0, -10.0]}>
      <planeGeometry args={[60, 30]} />
      <primitive ref={materialRef} attach="material" object={shaderMaterial} />
    </mesh>
  )
}
