import * as THREE from 'three';
import vertexShader from "./number-effect.vert";
import fragmentShader from "./number-effect.frag";


export default class EffectNumber {
    constructor(scene) {
        this.scene = scene;
    }

    async load(x, y){
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms:{
                time: {
                    type:'f',value: 0.0
                },
                process: {
                    type:'f',value: 0.0
                },
                current: {
                    type:'i',value: 0
                },
                next: {
                    type:'i',value: 0
                },
                viewportHeight: {
                    type:'f',value: 100.0
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        const response = await fetch('/static/numbers.bin')
        const buffer = await response.arrayBuffer()
        const array = new Float32Array(buffer)
        const bufferGeometry = new THREE.BufferGeometry();
        for (let i = 0; i < 12; i++) {
            const attribute = new THREE.BufferAttribute(array.subarray(i * 1000 * 3, (i + 1) * 1000 * 3), 3);
            if (i === 11){
                bufferGeometry.setAttribute('position', attribute);
            }
            bufferGeometry.setAttribute('p' + i, attribute);
        }
        this.object = new THREE.Points(bufferGeometry, shaderMaterial);
        this.object.translateY(y)
        this.object.translateX(x)
        this.scene.add(this.object);
    }

    update(time, process, current, next, viewportHeight){
        if (this.object){
            this.object.material.uniforms.time.value = time
            this.object.material.uniforms.process.value = process
            this.object.material.uniforms.current.value = current
            this.object.material.uniforms.next.value = next
            this.object.material.uniforms.viewportHeight.value = viewportHeight
        }
    }
}