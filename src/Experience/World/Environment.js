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
 * --- Debug Part ---
 * 6. Retreive debug, check if active and create folder.
 * 7. In setEnvironment method, add tweak for intensity and call updateMaterial function if value changes.
 * 8. Let's do the same for sunLight's intensity, position x, y and z.
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

		// Debug Part
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("Environment")
		}

		// Create Sun Light
		this.setSunLight()
		// Apply Environment map
		this.setEnvironmentMap()
	}
	// Method to create sun light
	setSunLight() {
		this.sunLight = new THREE.DirectionalLight("#ffffff", 4)
		this.sunLight.castShadow = true
		this.sunLight.shadow.camera.far = 15
		this.sunLight.shadow.mapSize.set(1024, 1024)
		this.sunLight.shadow.normalBias = 0.05
		this.sunLight.position.set(3.5, 2, -1.25)
		this.scene.add(this.sunLight)

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, "intensity")
				.name("sunLightIntensity")
				.max(10)
				.min(0)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, "x")
				.name("sunLightX")
				.max(5)
				.min(-5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, "y")
				.name("sunLightY")
				.max(5)
				.min(-5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, "z")
				.name("sunLightZ")
				.max(5)
				.min(-5)
				.step(0.001)
		}
	}
	// Method to apply Env map
	setEnvironmentMap() {
		this.environmentMap = {}
		this.environmentMap.intensity = 0.4
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture

		// Update materials method. We have added this method to the environmentMap property. Because it will handy later if we ever need to update materials again.
		this.environmentMap.updateMaterials = () => {
			// Traverse the scene
			this.scene.traverse((child) => {
				// check if child is a mesh and standard material
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity =
						this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}

		// call the method to update materials
		this.environmentMap.updateMaterials()

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, "intensity")
				.name("envMapIntensity")
				.min(0)
				.max(4)
				.step(0.001)
				.onChange(this.environmentMap.updateMaterials)
		}
	}
}
