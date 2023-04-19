import * as THREE from 'three';

const size = 1000

export default class Storm {
    constructor(scene) {
        this.scene = scene;
        const geometry = new THREE.BufferGeometry()
        const vertices = []


        for ( let i = 0; i < 3200; i ++ ) {
          const x = Math.random() * size - size / 2
          const y = Math.random() * size - size / 2
          const z = Math.random() * size - size / 2

          vertices.push(x, y, z)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

        const material = new THREE.PointsMaterial({
          size: 4,
          color: 0xef93b6,
        })

        this.particles = new THREE.Points(geometry, material)
        this.scene.add(this.particles)
    }
    update(time){
        if (this.particles){
            for (let i = 0; i < this.particles.geometry.attributes.position.count * 3; i+=3) {
                // x
                this.particles.geometry.attributes.position.array[i] -= 0.5
                if(this.particles.geometry.attributes.position.array[i] < -size / 2){
                    this.particles.geometry.attributes.position.array[i] = size / 2
                }
                // y
                this.particles.geometry.attributes.position.array[i + 1] -= 0.5
                if(this.particles.geometry.attributes.position.array[i + 1] < -size / 2){
                    this.particles.geometry.attributes.position.array[i + 1] = size / 2
                }
            }
            this.particles.geometry.attributes.position.needsUpdate = true
        }
    }
}