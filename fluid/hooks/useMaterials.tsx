import { ShaderMaterial, Texture, Vector2, Vector3 } from 'three';
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OPTS } from '../constant';

const baseVertex = `
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main() {
  vUv = uv;

  vL = vUv - vec2(texelSize.x, 0.0);

  vR = vUv + vec2(texelSize.x, 0.0);

  vT = vUv + vec2(0.0, texelSize.y);

  vB = vUv - vec2(0.0, texelSize.y);

  gl_Position = vec4(position, 1.0);
}

`;
const clearFrag = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uClearValue;

void main() { gl_FragColor = uClearValue * texture2D(uTexture, vUv); }
`;
const curlFrag = `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uVelocity, vL).y;

    float R = texture2D(uVelocity, vR).y;

    float T = texture2D(uVelocity, vT).x;

    float B = texture2D(uVelocity, vB).x;

    float vorticity = R - L - T + B;

    gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
}
`;
const divergenceFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uVelocity, vL).x;

    float R = texture2D(uVelocity, vR).x;

    float T = texture2D(uVelocity, vT).y;

    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;

    if(vL.x < 0.0) {
        L = -C.x;
    }

    if(vR.x > 1.0) {
        R = -C.x;
    }

    if(vT.y > 1.0) {
        T = -C.y;
    }

    if(vB.y < 0.0) {
        B = -C.y;
    }

    float div = 0.5 * (R - L + T - B);

    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;
const gradientSubstractFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uPressure, vL).x;

    float R = texture2D(uPressure, vR).x;

    float T = texture2D(uPressure, vT).x;

    float B = texture2D(uPressure, vB).x;

    vec2 velocity = texture2D(uVelocity, vUv).xy;

    velocity.xy -= vec2(R - L, T - B);

    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;
const pressureFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main() {
    float L = texture2D(uPressure, vL).x;

    float R = texture2D(uPressure, vR).x;

    float T = texture2D(uPressure, vT).x;

    float B = texture2D(uPressure, vB).x;

    float C = texture2D(uPressure, vUv).x;

    float divergence = texture2D(uDivergence, vUv).x;

    float pressure = (L + R + B + T - divergence) * 0.25;

    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}

`;
const splatFrag = `
varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 uColor;
uniform vec2 uPointer;
uniform float uRadius;

void main() {
    vec2 p = vUv - uPointer.xy;

    p.x *= aspectRatio;

    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;

    vec3 base = texture2D(uTarget, vUv).xyz;

    gl_FragColor = vec4(base + splat, 1.0);
}

`;
const advectionFrag = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float uDissipation;

void main() {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;

    gl_FragColor = uDissipation * texture2D(uSource, coord);

    gl_FragColor.a = 1.0;
}
`;
const vorticityFrag = `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlValue;
uniform float dt;

void main() {
    float L = texture2D(uCurl, vL).x;

    float R = texture2D(uCurl, vR).x;

    float T = texture2D(uCurl, vT).x;

    float B = texture2D(uCurl, vB).x;

    float C = texture2D(uCurl, vUv).x;

    vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L)) * 0.5;

    force /= length(force) + 1.;

    force *= uCurlValue * C;

    force.y *= -1.;

    vec2 vel = texture2D(uVelocity, vUv).xy;

    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}
`;

export const useMaterials = (): { [key: string]: ShaderMaterial } => {
    const size = useThree((s) => s.size);

    const shaderMaterials = useMemo(() => {
        const advection = new ShaderMaterial({
            uniforms: {
                uVelocity: {
                    value: new Texture(),
                },
                uSource: {
                    value: new Texture(),
                },
                dt: {
                    value: 0.016,
                },
                uDissipation: {
                    value: 1.0,
                },
                texelSize: { value: new Vector2() },
            },
            fragmentShader: advectionFrag,
        });

        const clear = new ShaderMaterial({
            uniforms: {
                uTexture: {
                    value: new Texture(),
                },
                uClearValue: {
                    value: OPTS.pressure,
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: clearFrag,
        });

        const curl = new ShaderMaterial({
            uniforms: {
                uVelocity: {
                    value: new Texture(),
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: curlFrag,
        });

        const divergence = new ShaderMaterial({
            uniforms: {
                uVelocity: {
                    value: new Texture(),
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: divergenceFrag,
        });

        const gradientSubstract = new ShaderMaterial({
            uniforms: {
                uPressure: {
                    value: new Texture(),
                },
                uVelocity: {
                    value: new Texture(),
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: gradientSubstractFrag,
        });

        const pressure = new ShaderMaterial({
            uniforms: {
                uPressure: {
                    value: new Texture(),
                },
                uDivergence: {
                    value: new Texture(),
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: pressureFrag,
        });

        const splat = new ShaderMaterial({
            uniforms: {
                uTarget: {
                    value: new Texture(),
                },
                aspectRatio: {
                    value: size.width / size.height,
                },
                uColor: {
                    value: new Vector3(),
                },
                uPointer: {
                    value: new Vector2(),
                },
                uRadius: {
                    value: OPTS.radius / 100.0,
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: splatFrag,
        });

        const vorticity = new ShaderMaterial({
            uniforms: {
                uVelocity: {
                    value: new Texture(),
                },
                uCurl: {
                    value: new Texture(),
                },
                uCurlValue: {
                    value: OPTS.curl,
                },
                dt: {
                    value: 0.016,
                },
                texelSize: {
                    value: new Vector2(),
                },
            },
            fragmentShader: vorticityFrag,
        });

        return {
            splat,
            curl,
            clear,
            divergence,
            pressure,
            gradientSubstract,
            advection,
            vorticity,
        };
    }, [size]);

    useEffect(() => {
        for (const material of Object.values(shaderMaterials)) {
            const aspectRatio = size.width / (size.height + 400);

            material.uniforms.texelSize.value.set(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes);
            material.vertexShader = baseVertex;
            material.depthTest = false;
            material.depthWrite = false;
        }

        return () => {
            for (const material of Object.values(shaderMaterials)) {
                material.dispose();
            }
        };
    }, [shaderMaterials, size]);

    return shaderMaterials;
};
