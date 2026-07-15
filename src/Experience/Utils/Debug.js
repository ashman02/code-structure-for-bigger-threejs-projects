/**
 * Debug
 * We are going to create separate class to add our debug panel.
 * 
 * --- Steps ---
 * 1. Create and export Debug class. Import and Instantiate inside Experience class.
 * 2. What we want if user access our website with #debug in the last we are showing debug panel otherwise not. Check the #debug in the url and create GUI.
 * 3. That's it for the debug class. We will add configrations inside other classes like Fox, Environment etc. Visit "/src/Experience/World/Fox.js" to see how we do that.
 */

import GUI from "lil-gui"

export default class Debug {
    constructor(){

        // check if there is #debug in the url
        this.active = window.location.hash === "#debug"

        // If active only there create debug UI
        if(this.active){
            this.ui = new GUI()
        }
    }
}