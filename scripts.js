//Babylon.js Version 3.3.0 のライブラリを使用してみました
//Babylon.js Loadersを使用してglTFファイル形式の3Dモデルを表示しています
//shark というglTF形式の3Dモデルを表示しています
//
//
//以下URLからの3Dモデルのデータをhttps://raw.githack.com/経由で使用しています
//https://github.com/BabylonJS/MeshesLibrary/
//https://github.com/BabylonJS/MeshesLibrary/blob/master/
//https://github.com/BabylonJS/MeshesLibrary/blob/master/shark.glb
//

var canvas = document.getElementById("renderCanvas");

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 1, 1);
 
    //Adding a light
    var light = new BABYLON.HemisphericLight();
    
    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);
    
    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.Append("modelo/", "curvasbeizer.glb", scene, function (newMeshes) {

        var mesh = scene.meshes[0];

        mesh.position.y  =  -2.5;
        //mesh.position.z  =  2.5;
        mesh.rotation  = new BABYLON.Vector3(0, Math.PI, 0); 
        //mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);  
        //camera.lookAt(mesh);
        
        scene.activeCamera = null;
        scene.createDefaultCameraOrLight(true);
        scene.activeCamera.attachControl(canvas, false);
        
    });
    
    return scene;
}

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});