/**
 * World Class
 * Everything related to the world will be instantiated in this class. It's like Experience class but for visible stuff like meshes, lights etc.
 *
 * --- Steps ---
 * 1. Create and Export World class. Import in Experience class and instantiate it.
 * 2. Import Experience class and instantiate it to access the experience.
 * 
 * --- Note ---
 * You have World class now you can create things directly in this class or you can create separate classes for things like lights etc.
 * This is a part where the structure can vary a lot according to your project's characteristics and your perferences.
 * In this project we are going to create separate class "Environment" that will contain our lights and later environment map.
 *  
 * 
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class World {
	constructor() {
		// Instantiate experience class and get what you need from it.
		this.experience = new Experience()
		this.scene = this.experience.scene

		// Test Mesh
		const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )

        this.scene.add(testMesh)
	}
}
