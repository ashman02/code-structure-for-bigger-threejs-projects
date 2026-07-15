# Code Structure for bigger Three.js Projects

If you are building something using *HTML*, *CSS*, *JavaScript* and *Three.js* you have to structure your code in a way that you can easily read and write also use that code. In this github repo you will find my way to structring the code inspired by **Bruno Simon**. 

***

### Vite
We are going to use a build tool ***vite*** to create vanilla js project. In this way we can install dependencies like three.js, gui using npm and we do not have to rely on cdn. Also it will be easy to build once we finish.  
```js
npm create vite@latest
```

### Experience Folder
It is a good practice to put the whole experience inside a main class that will then create everything else. We are going to call it Experience (you can name it whatever we want.) Create `Experience` folder inside `src` folder.   

`src/Experience`

***

#### Experience Class
Inside our `Experience` folder we will create `Experience.js` file. In this file we will create our main class and export it. This class will create our three js experience. Then we will import this class and intialize it wherever we have to create our experience.

`src/Experience/Experience.js`

***

#### Utils
There are handy classed that are not necessarily related to WebGL or to Three.js. We are going to put them in `/src/Experience/Utils` folder.

* **Sizes** - This class will handle the sizes of the experience. It will include the width, the height and the pixel ratio. It will handle resizing as well. 

* **EventEmitter** - This class will handle events. It will include the on, off and trigger methods.

* **Time** - This class will handle the time of the experience. It will include the current time, the elapsed time and the delta time. It will handle ticking as well.

***


#### Experience Folder Again
Now we will start working in our Experience folder `src/Experience` directly instead of utils folder.  

* **Scene** - Inside our `Experience.js` file we will add one line of code to create our scene. We do not have to create separate class file like Scene.js we can add scene directly inside our `Experience.js` class.

* **Camera** - `src/Experience/Camera.js` will handle our camera. We will add orbit controls in the Camera class as well.

* **Renderer** - `src/Experience/Renderer.js` will handle our Renderer. 

***

#### World Folder
It's time to add some visible stuff to our scene. We are going to separate everything that composes our World in a class and a folder named World. 

`src/Experience/World`

* **World** - Everything related to the world will be instantiated in World class. It's like Experience class but for visible stuff like meshes, lights etc.   
`src/Experience/World/World.js`

* **Environment** - This class will contain all the lights of our world, later environment map.

***

#### Resources class in Utils Folder
We are going to centerlize asset loading in a dedicated class that will -
* Instantiate all of the loaders we need
* Loop through an array of assets and load them
* Trigger an event when all assets are loaded

`/src/Experience/Utils/Resources.js`

> **sources.js** - As I have mentioned earlier we are going to create an array of assets and loop through it to load the assets. visit `src/Experience/Utils/Resources.js` to know more.  
> It is going to be a huge array so we are going to create that array inside a separate file named sources.js.  
> `src/Experience/sources.js`

***

#### Add Stuff inside World Folder
Now our Resources are being loaded so we can use them and add stuff inside our world. So go to `src/Experience/World` and start adding things.

* **EnvironmentMap** - Created method to apply environment map. Visit `Environment.js` and see *After Resources Class Part*.

* **Floor** - We are creating a separate class for floor. This is not need and bit of overkill but to practice things we are doing this. Otherwise we can add floor directly inside our world.

* **Fox** - Created a separate class for Fox model inside our World folder.

***

#### Debug
We should have added this earlier but if in your real project you have to add Debug configrations which you will have to in each project we are going to create a separate class inside `src/Experience/Utils` folder called Debug.

* **Fox** - Created debug UI for Fox animations. Visit `src/Experience/World/Fox.js`.

* **Environment Map** - For the sake of this lesson let's add some tweaks to the environment map.

***

#### Destroying
At some point, you might need to destroy some parts of your experience, or even the whole thing.

It could be because the animation is done, the player moved to another level, the WebGL isn't visible anymore or maybe the fox ran away. 

We could leave things are they are, but that is bad for performance. 

We are going to destroy the whole experience and make sure to dispose of things properly.

*Note - We created only one destroy method inside our main Experience class and did all the destroy things there for this project.*   
`src/Experience/Experience.js` 

* **Stoping time and Resize events** - Add destroy method to our Experience class. Stop listening to the time and resize events with off().

* **Dispose Everything in the Scene** - We are going to traverse the scene and look for things that we want to dispose. Same in the Experience Class inside Destroy method that we created.

* **Dispose of the Controls** - Camera does not need to be disposed, but the OrbitControls do.

* **Dispose of the Renderer** - Same thing there is a dispose method for renderer as well. 

* **Dispose of the Passes** - Be careful, if you are using post-processing, you'll need to dispose of the EffectComposer, its WebGLRenderTarget and any potential passes you are using.

* **Dispose of the Debug** - If there is debug active we have to dispose that as well using destroy method.

* **Warning** - Disposing things can be a bit tricky and you need to dive into different components asking yourself do I need to dispose this. Make sure you are disposing everything properly.

* **Dispose of the Canvas** - We did not remove the canvas and last frame is still rendered in it, but you can remove from the page if you need. It is not that important it is not doing anything it's just an image.

* **Disposing in classes** - We stopped listning to the sizes and time events, but those classes are still listening to native events. Example - Sizes class is listening to resize event from the window. If you are a little picky, you can handle disposing of them as well.

* **Destroy Method for Each Class** - We wrote everything in the same destroy() method for the sake of simplicity. If you have a more complex project with a lot to destroy, you may want to create a destroy method for each class. Then our main destroy method in Experience class will call destroy method from all the classes like update method. He do this for his projects.