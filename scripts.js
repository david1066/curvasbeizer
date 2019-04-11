//■glTFファイルの設定
//glTFファイルを置いた GitHub のURL
//https://github.com/siouxcitizen/3DModel/blob/master/yuusha.gltf
//
//rawgit.com 用に↑上記URLを編集（どこかのサイトでみた手順の実行）
//https://github.com/siouxcitizen/3DModel/master/yuusha.gltf
//
//編集した↑上記URLより rawgit.com で生成したURLs  
// Production 用URL
//https://cdn.rawgit.com/siouxcitizen/3DModel/a1c2e475/yuusha.gltf
// Development 用URL
//https://rawgit.com/siouxcitizen/3DModel/master/yuusha.gltf
//
//
//■glTFファイル読込関連の参考サイト
window.addEventListener("load", loadGltf, false);
window.addEventListener("resize", onWindowResize, false);
const progressBar = document.querySelector("progress");

//store our imported glTF scene when loaded successfully
const gltfStore = {};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00804d);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 20);
camera.lookAt(0, 0, 5);

//re-establish camera view on window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//lighting
const lightFill = new THREE.PointLight(0xffffff, 5, 1000);
lightFill.position.set(0,-15, 22);
scene.add(lightFill);

const lightKey = new THREE.PointLight(0xffffff, 5, 1000);
lightKey.position.set(0, 15, 22);
scene.add(lightKey);

const loader = new THREE.GLTFLoader();

function loadGltf() {
  loader.load(
    'curvasbeizer/tree/master/modelo/eva-textured.glb',
    //onLoad
    function(gltf) {
      scene.add(gltf.scene);
      //set material emissive to 0
      gltf.scene.children[0].material.emissive = 0;
    
      gltfStore.scene = gltf.scene;
      progressBar.style.display = "none";
    },
    //onProgress
    function(xhr) {
      //update progress bar with load progress
      progressBar.value = xhr.loaded;
    },
    //onError
    function(error) {
      console.log("Unable to load glTF");
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    //slowly rotate the first child (the castle object)
    if (gltfStore.scene) {
      gltfStore.scene.children[0].rotation.y += 0.005;
      gltfStore.scene.children[0].position.z =18;
    }
    renderer.render(scene, camera);
  }

  animate();
}
