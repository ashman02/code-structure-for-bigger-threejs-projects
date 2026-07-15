/**
 * Environment Class
 * This class will contain lights of our world and later environment map.
 *
 * --- Steps ---
 * 1. Create and export environment class. Import in World.js and instantiate
 * 2. Import Experience class and Instantiate it to access environment properties
 * 3. Create a method to create sunLight and call it in constructor.
 * --- After Resources Class Part ---
 * 4. Retrieve the Resources and Create setEnvironmentMap method to apply map and set it.
 * 5. As you know environment map is being added after our mesh. Now we need to tell our mesh's material that it needs to update. So we are going to traverse the scene and update every mesh standard material. 
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class Environment {
	constructor() {
		// Experience access
		this.experience = new Experience()
		this.scene = this.experience.scene
		// After Resources Part
		this.resources = this.experience.resources

		// Create Sun Light
		this.setSunLight()
		// Apply Environment map
		this.setEnvironmentMap()
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
	// Method to apply Env map
	setEnvironmentMap(){
		this.environmentMap = {}
		this.environmentMap.intensity = 0.4
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture

		// Update materials method. We have added this method to the environmentMap property. Because it will handy later if we ever need to update materials again. 
		this.environmentMap.updateMaterial = () => {
			// Traverse the scene
			this.scene.traverse((child) => {
				// check if child is a mesh and standard material 
				if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity = this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}

		// call the method to update materials
		this.environmentMap.updateMaterial()
	}
}
