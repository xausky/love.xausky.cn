import * as THREE from 'three';
import vertexShader from "./storm.vert";
import fragmentShader from "./storm.frag";

const size = 2000

export default class Storm {
    constructor(scene) {
        this.scene = scene;
        const geometry = new THREE.BufferGeometry()
        const vertices = []


        for ( let i = 0; i < 1600; i ++ ) {
          const x = Math.random() * size - size / 2
          const y = Math.random() * size - size / 2
          const z = Math.random() * size - size / 2

          vertices.push(x, y, z)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

        const material = new THREE.ShaderMaterial({
          uniforms:{
            time: {
              type:'f',value: 3.0
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

        this.particles = new THREE.Points(geometry, material)
        this.scene.add(this.particles)
    }
    update(time, viewportHeight){
        if (this.particles){
          if(!this.start){
            this.start = time
          }
          // this.particles.material.uniforms.time.value = time - this.start
          this.particles.material.uniforms.viewportHeight.value = size
        }
    }
}