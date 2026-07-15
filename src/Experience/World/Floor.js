/**
 * Floor
 * This is a bit of overkill because we could have added this part directly inside World.js file but to practice things we are creating separatet class for floor.
 * 
 * --- Steps ---
 * 1. Create and export the Floor class. Import and instantiate inside World class when resource are ready. Make sure we instantiate our floor before environment otherwise we will not be able to see enironment affects on our floor because it is being created after environement. 
 * 2. Get the experience class's instance and retrieve needed things like scene, resources etc.
 * 3. We have already added needed resources inside sources array. (grass normal and color texture. So we can use them here).
 * 4. We are going to separate each part of the floor into separate methods (little bit overkill but for the sake of tutorial) ->
 * - setGeometry
 * - setTextures 
 * - setMaterial
 * - setMesh
 */

import * as THREE from "three"
import Experience from "../Experience.js"

export default class Floor {
    constructor(){

        // Get scene and resources from Experience
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Call all the methods to create our floor
        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()
    }
    // Separate methods to create each part of the floor
    setGeometry(){
        this.geometry = new THREE.CircleGeometry(5, 64)
    }
    setTexture(){
        // When we have to update or set things later like environment map we notify materials that they need update we create objects and add configrations in that object.
        // Same here we have to set the texture later on material so we are creating object for textures.  
        this.textures = {}

        // Color Texture
        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        // Normal Texture
        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrappin

    }
    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map : this.textures.color,
            normalMap : this.textures.normal
        })
    }
    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        // add to the scene
        this.scene.add(this.mesh)
    }
}