import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

const scene = new THREE.Scene();

let gltfModel
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  'dinoProfile.glb',
  (gltf) => {
    gltfModel = gltf.scene
    gltfModel.rotation.y = (75 * Math.PI) / 180
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

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = -3
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const bgTexture = new THREE.TextureLoader().load(
  'bg2.jpg',
  (texture) => {
    scene.background = texture;
  }
)

// addStar code from https://github.com/fireship-io/threejs-scroll-animation-demo
function addStar() {
  const geometry = new THREE.DodecahedronGeometry(0.1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  material.emissive = new THREE.Color(0xffffff)
  material.emissiveIntensity = 10
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(400).fill().forEach(addStar);

// ----

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 6
camera.position.y = 1.5
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

// spin model around animation.
const clock = new THREE.Clock()
const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  if(gltfModel) {
    gltfModel.rotation.y = 0.5 * elapsedTime
  }

  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}

tick()