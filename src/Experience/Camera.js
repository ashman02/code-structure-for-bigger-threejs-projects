/**
 * Camera classs
 * We will create our camera inside this class. We add our Orbit Controls in this class as well.
 *
 * --- Steps ---
 * 1. Create and export Camera class. Import and Instantiate it in Experience.js class.
 * 2. We are creating PerspectiveCamera. So we will need width and height of the canvas. Orbit controls will also need canvas. We have to add camera to the scene as well. Now we have three ways to access these properties ->
 *    (i) Global variable - using window.experience (we have already created it in Experience class).
 *    (ii) From a Parameter - Pass the experience as parameter to the constructor of Camera class.
 *    (iii) Singleton - A singleton is a class that will only instantiate just like usual when it's the first time. But, for all the following times, it will return the same first instance.
 * 3. We are going to use Singleton approach. So make our main Experience.js class singleton. (He use this approach but we can use any of the above three approaches. Me personally like second approach. But he is using this approach so are we for the sake of this tutorial.)
 * 4. Import and Instantiate Experience Class here.
 * 5. Now we are going to create Camera Instance and Orbit controls. To keep things organized we will create separate methods for them.
 * 6. Inside setInstance method create our Camera and save it as instance.
 * 7. Inside setOrbitControls method create our OrbitControls and save it as controls.
 * 8. Do not forget to call these methods inside constructor.
 * 
 * --- Resize ---
 * 9. Now to handle resizing we can listen to the resize event from Sizes class. (that's how he likes to do it.) But Instead we are going to propagate the resize from the Experience to the children to avoid potential bugs. 
 * 10. If every class is listening to the resize event of it's own some classes resize will be called earlier than other classes so this can make a mess. We are already listening to the resize event in Experience class. So we will add logic there and propagate it to the children classess.
 * 11. Here we are going to create resize method and call it from Experience class if resize happens.  
 * 
 * --- Update ---
 * 12. We need to update this class on each frame for OrbitControls and it's damping feature. 
 * 13. Again we are listing to update event of Time class in Experience class. So we will create update method here and call it from Experience class on each frame.
 */
 
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Experience from "./Experience.js"

export default class Camera {
	constructor() {
		/**
		 * Ways to access width, height, canvas and scene (Access the experience instance)
		 *
		 * 1. Global variable - Simplest and works but having properties on window object is not a good practice. and external code can mess up with it.
		 * 2. From a Parameter - Good solution but we need to do this for every class we create.
		 * 3. Singleton - Best solution. We can access the same instance of Experience class from any other class we create. (We are going to use this approach.)
		 */
		// this.experience = window.experience // Global
		// this.experience = experience // Parameter

		// Singleton
		this.experience = new Experience()

		// Save properties you need from experience.
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		// Call Camera Instance method
		this.setInstance()
		// Call Orbit Controls method
		this.setOrbitControls()
	}
	// Camera
	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100,
		)
		this.instance.position.set(6, 4, 8)
		this.scene.add(this.instance)
	}
	// Orbit Controls
	setOrbitControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
	}

    // Resize method to handle resizing
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    // Update method to handle updates on each frame
    update() {
        this.controls.update()
    }
}
