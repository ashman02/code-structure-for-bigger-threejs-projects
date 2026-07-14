/**
 * Resources Class
 * We are going to centerlize asset loading in a dedicated class that will ->
 * - Instantiate all of the loaders we need
 * - Loop through an array of assets and load them
 * - Trigger an event when all assets are loaded
 *
 * --- Steps ---
 * 1. Create and export Resources call that extend EventEmitter class (we will trigger an event when all the assets are loaded
 * 2. Import Resources class in Experience class and instantiate after scene. (because we need resources in our world, earlier is better in this case.)
 *
 * --- Assets Array ---
 * 3. We are going to use an array to load our assets. Each resource in the array will be defined by an object composed of the following properties -
 * - name : which will be used to retrieve the loaded resource
 * - type : in order to know what loader to use`
 * - path : the path(s) of the file(s) to load
 * 4. It is going to be a huge array so it is a good practice to create this array in a separate file. So in Experience folder create sources.js file to create this array and export it.
 * 5. Import created array in Experience class and pass that array as a parameter to the Resources class (this class).
 * 6. Add sources parameter in the constructor of this class.
 *
 * --- Setup ---
 * 7. In this class create these properties -
 * - items : the loaded resources. It is going to be an object we will use source name as key and loaded file as value.
 * - toLoad : the number of sources to load. (array.length)
 * - loaded : the number of sources loaded. (starts at 0)
 * So items is the actual resources we have loaded. So once we load a resource we are going to add that in items object. toLoad and loaded will be helpful in showing the progress and when toLoad equals loaded it means we are done.
 *
 * --- Loaders ---
 * 8. Import needed loaders. In this project we need GLTFLoader, TextureLoader and CubeTextureLoader. (add as per your need)
 * 9. Create a separate method to create and set loaders.
 * 10. Create a method to load resource using correspoding loader.
 * 11. Make sure you call both of these methods inside contructor.
 * 
 * --- Resources Loaded ---
 * 12. On each load, we are going to call a "sourceLoaded" method that will -
 * - Save the loaded resources in the items property
 * - Update the loaded property
 * - Test if the loading is done
 * - If everything is loaded we trigger a ready event
 * 
 * --- Use ---
 * 13. In World class, retrieve the Resources instance and listen to the ready event before instantiating the Environment class. 
 * - We can do this in Experience itself by instantiating the World only when everything is ready.
 * - We can listen to this inside Environment (or any class) class. When ready then create environment map. 
 * - It is up to use what we do. (for this tutorial I am going with his approach)
 * - We can create multiple arrays to load things partially. 
 * - We have to find best way according to our project.
 *
 */

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import EventEmitter from "./EventEmitter.js"

export default class Resources extends EventEmitter {
	constructor(sources) {
		super()

		// Options
		this.sources = sources

		// Setup
		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		// Call setLoaders
		this.setLoaders()

		// Start loading
		this.startLoading()
	}
	// Method to set needed loaders
	setLoaders() {
		this.loaders = {}
		this.loaders.gltfLoader = new GLTFLoader()
		this.loaders.textureLoader = new THREE.TextureLoader()
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
	}
	// Start Loading the Resources
	startLoading() {
		// Loop through all our sources
		for (const source of this.sources) {
			// Use if else to identify the source and use appropriet loader
			if (source.type === "gltfModel") {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === "texture") {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === "cubeTexture") {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

    // Manage the source loaded
    sourceLoaded(source, file) {
        
        this.items[source.name] = file

        this.loaded++ 

        if(this.loaded === this.toLoad){
            this.trigger("ready")
        }
    }
}
