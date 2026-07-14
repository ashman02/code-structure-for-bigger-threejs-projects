/**
 * Renderer Class
 * We have quite a lot code in Renderer class that's why we created separate class for this one instead of adding this directly inside our main Experience class.
 *
 * --- Steps ---
 * 1. Create and Export our Renderer class. Import and Instantiate it in Experience class.
 * 2. Again we need access of scene, canvas, camera. We have already made our Experience class singleton (visit Camera.js file for more details) we can use that. So import and instantiate our Experience class
 * 3. Create a method to create our renderer and set that as instance. Make sure you call that method inside our constructor.
 * 
 * --- Resize ---
 * 4. Create resize method here and call it inside Experience class's resize method. Because 
 * Experience class is already listing to resize events
 * 
 * --- Update ---
 * 5. Again create update method here and call it inside Experience class's update method. Because Experience class is already listing to tick events 
 *
 */

import * as THREE from "three"
import Experience from "./Experience.js"

export default class Renderer {
	constructor() {
		// Access our experience and get whatever you want from it.
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		// Call set Instance method
		this.setInstance()
	}

	// Create renderer
	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		})

        // You can add any this you want.
        // Configuration we already had in our main js (previous fox scene just copy and pasted)
		this.instance.physicallyCorrectLights = true
		this.instance.outputEncoding = THREE.sRGBEncoding
		this.instance.toneMapping = THREE.CineonToneMapping
		this.instance.toneMappingExposure = 1.75
		this.instance.shadowMap.enabled = true
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap
		this.instance.setClearColor("#211d20")
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

    // Handle Resize
    resize(){
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    // Handle Update on every frame
    update(){
        // this.camera is our class but actual camera is inside camera's instance property
        this.instance.render(this.scene, this.camera.instance)
    }
}
