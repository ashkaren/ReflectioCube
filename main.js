
var width = window.innerWidth;
var height = window.innerHeight;

var mouseX = 0, mouseY = 0;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );


var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
// load cube textures
/*var textureURLs = [  // URLs of the six faces of the cube map 
            "posx.jpg",   // Note:  The order in which
            "negx.jpg",   //   the images are listed is
            "posy.jpg",   //   important.
            "negy.jpg",  
            "posz.jpg",   
            "negz.jpg"
       ];
*/


var textureURLs = [  // URLs of the six faces of the cube map 
            "posx.jpg",   // Note:  The order in which
            "negx.jpg",   //   the images are listed is
            "posy.jpg",   //   important.
            "negy.jpg",  
            "posz.jpg",   
            "negz.jpg"
       ];



// create scene object
var scene = new THREE.Scene;

// create simple geometry and add to scene

cubeMap = THREE.ImageUtils.loadTextureCube( textureURLs ) ;




// create perspective camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 0;
camera.position.z = 60;
// add to scene and renderer
scene.add(camera); 
renderer.render(scene, camera);
// create the view matrix


uniforms1 = {
	tCube: {type: "t", value: cubeMap},
	camPos: {type: "v3", value: new THREE.Vector3(0, 0, 0) } 
};


var sphereGeometry = new THREE.SphereGeometry( 50, 50, 50 );

var customMaterial = new THREE.ShaderMaterial( {
							uniforms: uniforms1,
							vertexShader: document.getElementById( 'vertexShader' ).textContent,
							fragmentShader: document.getElementById( 'fragmentShader' ).textContent
						} );


var refMap = new THREE.MeshLambertMaterial( { envMap: cubeMap, reflectivity: 1} );

var sphere = new THREE.Mesh(sphereGeometry, customMaterial);
sphere.position.x = -50;

var sphereGeometry = new THREE.SphereGeometry(50, 50, 50);
var sphere1 = new THREE.Mesh(sphereGeometry, refMap);
 
camera.lookAt(sphere.position);



// add lighting and add to scene 
// 

var pointLight1 = new THREE.PointLight(0xffffff); pointLight1.position.set(-5000, -5000, 0);scene.add(pointLight1);
var pointLight2 = new THREE.PointLight(0xffffff); pointLight2.position.set(5000, 5000, -1000);scene.add(pointLight2);
var pointLight3 = new THREE.PointLight(0xffffff); pointLight1.position.set(-5000, 5000, 0);scene.add(pointLight3);
var pointLight4 = new THREE.PointLight(0xffffff); pointLight2.position.set(5000, 5000, 1000);scene.add(pointLight4);


scene.add(sphere);
	



var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.CubeGeometry( 300, 300, 300 );	
var materialArray = [];
for (var i = 0; i < 6; i++)
materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( directions[i] + imageSuffix ),
			side: THREE.BackSide
}));


var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );





 
renderer.render(scene, camera);



function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - width/2 ) / 2;
	mouseY = ( event.clientY - height/2) / 2;

}





function render() {

	
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += (  mouseY - camera.position.y ) * .05;

	camera.lookAt(new THREE.Vector3(0, 0, 0));


	uniforms1.camPos.value = camera.position;
	
	//sphere.rotation.y += 0.01;
	//sphere1.rotation.y += 0.01;

	renderer.render(scene, camera);
    requestAnimationFrame(render);
	
}
render();

