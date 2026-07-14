/**
 * Environment Class
 * This class will contain lights of our world and later environment map.
 *
 * --- Steps ---
 * 1. Create and export environment class. Import in World.js and instantiate
 * 2. Import Experience class and Instantiate it to access environment properties
 * 3. Create a method to create sunLight and call it in constructor.
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class Environment {
	constructor() {
		// Experience access
		this.experience = new Experience()
		this.scene = this.experience.scene

		// Create Sun Light
		this.setSunLight()
	}
	// Method to create sun light
	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
		this.sunLight.castShadow = true
		this.sunLight.shadow.camera.far = 15
		this.sunLight.shadow.mapSize.set(1024, 1024)
		this.sunLight.shadow.normalBias = 0.05
		this.sunLight.position.set(3.5, 2, - 1.25)
		this.scene.add(this.sunLight)
	}
}
