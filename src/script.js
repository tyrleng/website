import './style.css'
import * as THREE from 'three'
import { AmbientLight, Loader, Mesh } from 'three';
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4fadf0)

// Texture Stuff
const loadingManager = new  THREE.LoadingManager()

// loadingManager.onStart = () => {
//   console.log('onStart')
// }

// loadingManager.onLoaded = () => {
//   console.log('onLoaded')
// }

// loadingManager.onProgress = () => {
//   // console.log('onProgress')
// }

// loadingManager.onError = () => {
//   console.log('onError')
// }

// const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('/matcaps/8.png')
// const gradientTexture = textureLoader.load('/gradients/3.jpg')

// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const environmentMapTexture = cubeTextureLoader.load([
//   '/environmentMaps/3/px.jpg',
//   '/environmentMaps/3/nx.jpg',
//   '/environmentMaps/3/py.jpg',
//   '/environmentMaps/3/ny.jpg',
//   '/environmentMaps/3/pz.jpg',
//   '/environmentMaps/3/nx.jpg'
// ])

// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.rotation = Math.PI * 0.25

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//   texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'


const fontLoader = new THREE.FontLoader()
fontLoader.load(
  'fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new THREE.TextBufferGeometry(
      'Hello World',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02, 
        bevelOffset: 0,
        bevelSegments: 3
      }
    )
    textGeometry.computeBoundingBox()
    console.log(textGeometry.boundingBox)
    const textMaterial = new THREE.MeshBasicMaterial()
    textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, textMaterial)
    // scene.add(text)
    // console.log(font)
  }
)

let gltfModel
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  'dinoProfile.glb',
  (gltf) => {
    gltfModel = gltf.scene
    scene.add(gltf.scene)

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
          const m = child
          m.receiveShadow = true
          m.castShadow = true
      }
    })
  }
)

// const parameters = {
//   color: 0xff0000,
//   spin: () => {
//     console.log("spin")
//     gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
//   }
// }

// const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
// material.opacity = 0.5
// material.map = colorTexture
// material.alphaMap = alphaTexture
// material.transparent = true
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshStandardMaterial()
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1.1
// material.displacementMap = heightTexture
// material.displacementScale = 0.03
// material.normalMap = normalTexture
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.transparent = true

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0
// material.envMap = environmentMapTexture

// const gui = new dat.GUI()
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,16,16),
  material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1,1, 100, 100),
  material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3,0.2,16,32),
  material
)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

// scene.add(sphere,plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = -3
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const mesh = new THREE.Mesh(
//   new THREE.BoxBufferGeometry(1,1,1,2,2,2),
//   new THREE.MeshBasicMaterial({map: colorTexture})
// )
// group.add(mesh)

// console.log(dat)

// gui.add(mesh.position, 'x', -3, 3, 0.01) // you must pass in an object as the first parameter.
// gui.add(mesh.position, 'y', -3, 3, 0.01).name("lateral")
// gui.add(mesh.position, 'z', -3, 3, 0.01)
// gui.add(mesh, 'visible')
// gui.add(mesh.material, 'wireframe')
// gui.addColor(parameters, 'color') // doing this because DAT requires an object to be passed in.
// .onChange( () => {
//   mesh.material.color.set(parameters.color)
// })
// gui.add(parameters, 'spin')

// const geometry = new THREE.BufferGeometry()
// const count = 100
// const positionsArray = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

// const positionsArray = new Float32Array(9)
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0s

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0


// const mesh3 = new THREE.Mesh(
//   geometry,
//   new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true})
// )
// group.add(mesh3)

// const geometry = new THREE.Geometry()
// const vertex1 = new THREE.Vector3(0,0,0)
// geometry.vertices.push(vertex1)

// const vertex2 = new THREE.Vector3(0,1,0)
// geometry.vertices.push(vertex2)

// const vertex3 = new THREE.Vector3(1,0,0)
// geometry.vertices.push(vertex3)

// const face = new THREE.Face3(0,1,2)
// geometry.faces.push(face)

// for (let i = 0; i < 50; i++) {
//   // this inner loop creates one vertice on each pass. So 3 vertices after loop finishes.
//   for (let j = 0; j < 3; j++) {`
//     geometry.vertices.push(new THREE.Vector3(
//       (Math.random() - 0.5) * 4,
//       (Math.random() - 0.5) * 4,
//       (Math.random() - 0.5) * 4
//     ))
//   }
//   const verticesIndex = i * 3
//   geometry.faces.push(new THREE.Face3(
//     verticesIndex,
//     verticesIndex + 1,
//     verticesIndex + 2
//   ))
// }

// const mesh2 = new THREE.Mesh(
//   geometry,
//   new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}) 
// )
// group.add(mesh2)

// mesh.position.y = -0.3
// mesh.position.x = 0
// mesh.scale.x = 2
// mesh.rotation.y = Math.PI

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update Sizes Object
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement) {
    console.log("go fullscreen")
    canvas.requestFullscreen()
  }
  else {
    console.log('leave fullscreen')
    document.exitFullscreen()
  }
})

// gsap.to(mesh.position, {duration:1 ,delay:1,x:2})
// gsap.to(mesh.position, {duration:1,delay:2,x:0})
const cursor = {
  x:0,
  y:0
}
document.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
  // cursor.x = event.clientX / sizes.width
  // cursor.y = - (event.clientY / sizes.height)
  // console.log(`cursor.x: ${cursor.x}, cursor.y: ${cursor.y}`)
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 6
camera.position.y = 2

// camera.position.y = 0.5
// camera.position.x = 0.5
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// let prevFrameTime = Date.now()

const clock = new THREE.Clock()
let prevElapsedTime = clock.getElapsedTime

// Animation Tutorial
const tick = () => {

  const elapsedTime = clock.getElapsedTime()
  // const timeDiff = elapsedTime - prevElapsedTime
  // prevElapsedTime = elapsedTime;
  // // console.log(timeDiff)
  // cube1.rotation.x += 1000 * timeDiff
  // cube1.rotation.y += 1000 * timeDiff

  // cube1.rotation.y = clock.getElapsedTime() * Math.PI * 1
  // const elapsedTime = clock.getElapsedTime();
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)

  // const currentFrameTime = Date.now()
  // const deltaTime = currentFrameTime - prevFrameTime;
  // prevFrameTime = currentFrameTime;
  // console.log(deltaTime)

  // cube1.rotation.x += 0.001 * deltaTime
  // cube1.rotation.y += 0.001 * deltaTime

  // camera.position.x = cursor.x * 3
  // camera.position.y = cursor.y * 3
  // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
  // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3 + Math.cos(cursor.y * Math.PI) * 3
  // camera.position.y = Math.sin(cursor.y * Math.PI) * 3
  // camera.position.z = Math.cos(cursor.y * Math.PI) * 3
  // camera.lookAt(mesh.position)

  sphere.rotation.y = 0.5 * elapsedTime
  // plane.rotation.y = 0.5 * elapsedTime  
  torus.rotation.y = 0.5 * elapsedTime

  if(gltfModel) {
    gltfModel.rotation.y = 0.5 * elapsedTime
  }

  // controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}

tick()