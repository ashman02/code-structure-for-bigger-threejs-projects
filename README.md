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

*Note - If you see any __Why.js__ file indside any folder I created that file to explain why that folder has been created and what it contains.*

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