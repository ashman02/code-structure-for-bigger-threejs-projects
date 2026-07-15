/**
 * Why we created Experience folder ?
 * It is a good practice to put the whole experience inside a main class that will then create everything else. We are going to call it Experience (you can name it whatever we want.)
 *
 * --- Steps ---
 * 1. So we created a experience folder. All classes related to the experience will be in that folder.
 * 2. Inside that folder we created Experience.js file to create our main class (Experience).
 * 3. We created our main class and exported it.
 * 4. Now we can import it in our index.js/main.js. And instantiate it to create our experience. (It will be useful if you have mutliple experiences in your webpage.)
 *
 * --- Options ---
 * 1. Canvas
 *
 * --- Setup ---
 * Basic setup of our experience like sizes, scene, camera and renderer.
 * 1. Sizes
 * 2. Time
 * 3. Scene - we have not created separate class for scene because it is just one line of code. (we do not have to create separate classes for each property)
 * 4. Camera
 * 5. Renderer
 * 6. World
 * 7. Resources
 * 8. Debug - late but not always it will come earlier in most of the projects.
 *
 * --- Methods ---
 * 1. Resize - Will be called when window is resized
 * 2. Update - Will be called on each frame (on tick event of Time class)
 * 
 * --- Notes ---
 * 1. Singleton - We made this class Singleton. So, if we instantiate it multiple times, it will return the same instance. (We did this in camera part code. So check Camera.js file for more details.)
 */

import * as THREE from "three"
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import sources from "./sources.js"
import Debug from "./Utils/Debug.js"

let instance = null

// Create and export main class
export default class Experience {
	constructor(canvas) {

		// Singleton
		if (instance) {
			return instance
		}

		instance = this

		// We can provide the global access to our class. Means we can access it from console of the browser. (comes handy later he said. We can do this if we want to. )
		// If you have multiple experiences in your webpage, last one will override previous once.
		window.experience = this

		/**
		 * Options
		 * 1. Canvas
		 */
		this.canvas = canvas

		/**
		 * Setup
		 * 1. Instantiate Sizes class and listen to the resize event from it.
		 * 2. Instantiate Time class and listen to the tick event from it.
		 * 3. Create our scene (not saperate class)
		 * 4. Instantiate Camera class
		 * 5. Instantiate Renderer class
		 * 6. Instantiate World class
		 * 7. Instantiate Resources class right after our scene
		 * 8. Instantiate Debug Class. We are doing this little late but this does not mean this class should always be late. In our projects we will need this earlier so we are instantiating this on the top.
		 */
		this.debug = new Debug()
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.resources = new Resources(sources) // Number 7 (do not be confused)
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()

		// Listen to resize event of Sizes class. Always use arrow function in callback. If you pass direct method or use traditional function context of this keyword will be lost.
		this.sizes.on("resize", () => {
			// Call resize method of Experience class.
			this.resize()
		})

		// Listen to tick event of Time class.
		this.time.on("tick", () => {
			// Call update method of Experience class.
			this.update()
		})
	}
	// Create resize method that will be called when window is resized
	resize() {
		// Resize Camera
		this.camera.resize()
		// Resize Renderer
		this.renderer.resize()
	}

	// Create update method that will be called on each frame (on tick event of Time class)
	update() {
		// Update Camera (orbit controls)
		this.camera.update()
		// Update World (so our fox animation can work)
		this.world.update()
		// Update renderer
		this.renderer.update()
	}
}
