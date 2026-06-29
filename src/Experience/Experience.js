/**
 * Why we created Experience folder ?
 * It is a good practice to put the whole experience inside a main class that will then create everything else. We are going to call it Experience (you can name it whatever we want.)
 *
 * --- Steps ---
 * 1. So we created a experience folder. All classes related to the experience will be in that folder.
 * 2. Inside that folder we created Experience.js file to create our main class (Experience).
 * 3. We created our main class and exported it.
 * 4. Now we can import it in our index.js/main.js. And intialize it to create our experience. (It will be useful if you have mutliple experiences in your webpage.)
 *
 * --- Options ---
 * 1. Canvas
 *
 * --- Setup ---
 * Basic setup of our experience like sizes, scene, camera and renderer.
 * 1. Sizes
 * 
 * --- Methods ---
 * 1. Resize - Will be called when window is resized
 */

import Sizes from "./Utils/Sizes.js"

// Create and export main class
export default class Experience {
	constructor(canvas) {
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
         * 1. Initialize Sizes class and listen to the resize event from it. 
		 */
		this.sizes = new Sizes()

        // Always use arrow function in callback. If you pass direct method or use traditional function context of this keyword will be lost.
		this.sizes.on("resize", () => {
			// Call resize method
			this.resize()
		})
	}
    // Create resize method that will be called when window is resized
	resize() {
        console.log("Resized occured")
    }
}
