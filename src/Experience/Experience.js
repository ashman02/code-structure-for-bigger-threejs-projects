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
 */

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
    }
} 
