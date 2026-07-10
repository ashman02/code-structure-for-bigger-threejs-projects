/**
 * Why we created Time.js file ?
 * This class will handle the time of the experience. It will include the current time, the elapsed time and the delta time. It will trigger event on each frame as well.
 * 
 * --- Steps ---
 * 1. Import EventEmitter class (we want our Time class to be able to trigger events)
 * 2. Create Time class that extends EventEmitter class and export it
 * 3. Create constructor method and call super() to call the constructor of the parent class (EventEmitter)
 * 4. Setup the start, current, elapsed and delta properties
 * 5. Create our tick method 
 * 6. In our contructor call the tick method on the next frame using requestAnimationFrame
 * 7. In the tick method, update the current, elapsed and delta properties
 * 8. Call the tick method on each frame
 * 9. Trigger an event. We call it tick
 * 10. In the Experience class, import Time class and initialize it. Listen to the tick event.
 * 
 */

import EventEmitter from "./EventEmitter.js"

export default class Time extends EventEmitter {
    constructor() {
        super()
        
        // Setup 
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        // why 16? He does not set it to 0 because it can cause some issues in the first frame. So he set it to 16 (which is the delta time between each frame at 60fps)
        this.delta = 16

        // Call tick method. 
        // We are not calling it directly because sometimes delta time can be 0 on first frame (which is harmless but some time it can cause some issues in the first frame). So we are calling it on the next frame using requestAnimationFrame.
        window.requestAnimationFrame(() => {
            this.tick()
        })

    }

    tick() {
        // Update properties
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        //Trigger event
        this.trigger("tick")

        // call the tick function on each frame
        // We are using arrow function to keep the context of this keyword to the class. If we use traditional function or directly call the method, this keyword will be lost.
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}