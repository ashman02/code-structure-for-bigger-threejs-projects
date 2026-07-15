/**
 * We are going to save the width, the height and the pixel ratio to use later. Those values will be updated when resize occurs, and it will warn the experience that resize occured. 
 * 
 * --- Steps ---
 * 1. Create our sizes class and export that. 
 * 2. Setup base values for width, height and pixel ratio.
 * 3. Handle Resize
 * 4. Intialize our Sizes class inside our main class (Experience class).
 * 
 * --- Event Emitter ---
 * We want our sizes class to warn others when resize occurs (renderer, camera etc). So they can update their values. Our sizes class is going to trigger events. Later, we are going to listen to those events.
 * 1. Create EventEmitter class. (Info in EventEmitter.js)
 * 2. Import that class.
 * 3. Our original Sizes class will inherit that class.
 * 4. Call super() to call the constructor of the parent class (EventEmitter).
 * 5. We are going to trigger the events when resize occurs using trigger method of EventEmitter class from our Sizes class. (Then later listen to those events from outside the sizes class.)
 * 
 */

import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter {
    constructor() {

        // call super to call the constructor of the parent class (EventEmitter)
        super()

        // Setup
        // Here we assume our experience will fill the viewport of the user. If it not the case then we have do things differently here.  
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Handle Resize
        window.addEventListener("resize", () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            // Trigger the event
            this.trigger("resize")
        })
    }
}