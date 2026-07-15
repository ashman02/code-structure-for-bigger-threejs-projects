/**
 * Fox Class
 * Created separate class to add fox model.
 *
 * --- Steps ---
 * -> Same steps as before create class, get experiece, instantiate it in world class. Add separate methods to add differernt parts of the model.
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class Fox {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		// Retrieve the actual resource (fox model)
		this.resource = this.resources.items.foxModel

		// call setModel
		this.setModel()

		// call setAnimation
		this.setAnimation()
	}
	// Method to set the model
	setModel() {
		this.model = this.resource.scene
		this.model.scale.set(0.02, 0.02, 0.02)
		this.scene.add(this.model)

		// Traverse the model and enable shadow
		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true
			}
		})
	}
	// Method to create AnimationMixer and set animations
	setAnimation() {
		this.animation = {}
		this.animation.mixer = new THREE.AnimationMixer(this.model)
		this.animation.action = this.animation.mixer.clipAction(
			this.resource.animations[0],
		)
		this.animation.action.play()
	}
    // Update the mixer on each frame so our animations can work.
	update() {
		this.animation.mixer.update(this.time.delta * 0.001)
	}
}
