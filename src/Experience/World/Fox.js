/**
 * Fox Class
 * Created separate class to add fox model.
 *
 * --- Steps ---
 * -> Same steps as before create class, get experiece, instantiate it in world class. Add separate methods to add differernt parts of the model.
 *
 * --- Debug ---
 * 1. Get the debug class from experience class.
 * 2. If debug is active then create folder for our fox configurations.
 * 3. He adds tweak in same related method. So if he wants to add tweaks related to the fox's scale he will add in this.setModel method.
 * 3. We are going to create three buttons so user can switch between animations of the fox. So we will add these in setAnimation method.
 * 4. We have to prepare all the actions before we only have one action prepared but we need all three now.
 * 5. Save default action in current state and play it.
 *
 * --- Smooth Transition ---
 * 6. There are many methods inside AnimationAction class. But we are going to use crossFadeFrom method. This method needs to be called on the incoming action. It takes these parameters ->
 * - previous action (first)
 * - duration of the transition (second)
 * 7. We also need to reset and play the new animation.
 * 8. We are going to add a method inside animation property called play. It takes the name of the animation we want to play as parameter and do above things I mentioned.
 * 9. Now it's time to add things to debug UI. Check if debug is active (always do this.)
 * 10. Create debug object and put three functions with each one calling this.animation.play with correspoding parameter.
 *
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class Fox {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		// Get the Debug class
		this.debug = this.experience.debug

		// If active then create folder for Fox
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("Fox")
		}

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

		// Only one action prepared
		// this.animation.action = this.animation.mixer.clipAction(
		// 	this.resource.animations[0]
		// )
		// this.animation.action.play()

		// ---This comes from Debug Part ---
		// We need all three actions prepared
		this.animation.actions = {}
		this.animation.actions.idle = this.animation.mixer.clipAction(
			this.resource.animations[0],
		)
		this.animation.actions.walking = this.animation.mixer.clipAction(
			this.resource.animations[1],
		)
		this.animation.actions.running = this.animation.mixer.clipAction(
			this.resource.animations[2],
		)

		// Save the default action in current and play it.
		this.animation.actions.current = this.animation.actions.idle
		this.animation.actions.current.play()

		// Play method
		this.animation.play = (name) => {
			const newAction = this.animation.actions[name]
			const oldAction = this.animation.actions.current

			// Reset. Play. Cross Fade
			newAction.reset()
			newAction.play()
			newAction.crossFadeFrom(oldAction, 1)

			// Save the new action in current
			this.animation.actions.current = newAction
		}

		// Debug
		if (this.debug.active) {
			const debugObject = {
				playIdle: () => {
					this.animation.play("idle")
				},
				playWalking: () => {
					this.animation.play("walking")
				},
				playRunning: () => {
					this.animation.play("running")
				},
			}

			this.debugFolder.add(debugObject, "playIdle")
			this.debugFolder.add(debugObject, "playWalking")
			this.debugFolder.add(debugObject, "playRunning")
		}
	}
	// Update the mixer on each frame so our animations can work.
	update() {
		this.animation.mixer.update(this.time.delta * 0.001)
	}
}
