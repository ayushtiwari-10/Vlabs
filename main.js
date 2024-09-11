let currentModule = null;
let scene, camera, renderer;

function initScene() {
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('simulation-container').appendChild(renderer.domElement);

        console.log("Scene initialized successfully");
    } catch (error) {
        console.error("Error initializing scene:", error);
        document.getElementById('error-log').innerHTML += `<p>Error initializing scene: ${error.message}</p>`;
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (currentModule && currentModule.animate) {
        currentModule.animate();
    }
    if (scene && camera && renderer) {
        renderer.render(scene, camera);
    }
}

function loadModule(moduleName) {
    console.log("Loading module:", moduleName);
    if (currentModule && currentModule.cleanup) {
        currentModule.cleanup();
    }

    // Clear the scene
    while(scene.children.length > 0) { 
        scene.remove(scene.children[0]); 
    }

    // Load the new module
    switch(moduleName) {
        case 'acidification':
            currentModule = acidificationModule;
            break;
        case 'currents':
            currentModule = currentsModule;
            break;
        case 'waves':
            currentModule = wavesModule;
            break;
        case 'tsunami':
            currentModule = tsunamiModule;
            break;
        case 'pollution':
            currentModule = plasticPollutionModule;
            break;
        case 'oilspill':
            currentModule = oilSpillModule;
            break;
        case 'salinity':
            currentModule = salinityModule;
            break;
        case 'ecosystem':
            currentModule = ecosystemModule;
            break;
        default:
            console.error("Unknown module:", moduleName);
            return;
    }

    if (currentModule && currentModule.init) {
        try {
            currentModule.init(scene, camera, renderer);
            console.log("Module initialized successfully:", moduleName);
        } catch (error) {
            console.error("Error initializing module:", moduleName, error);
            document.getElementById('error-log').innerHTML += `<p>Error initializing module ${moduleName}: ${error.message}</p>`;
        }
    } else {
        console.error("Module not found or init function missing:", moduleName);
    }

    // Update controls
    updateControls(moduleName);
}

function updateControls(moduleName) {
    const controlsContainer = document.getElementById('controls-container');
    controlsContainer.innerHTML = ''; // Clear existing controls

    if (currentModule && currentModule.setupControls) {
        currentModule.setupControls(controlsContainer);
    }
}

// Event listeners
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const module = e.target.getAttribute('data-module');
        loadModule(module);
    });
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene and start the animation loop
initScene();
animate();

// Load the default module (Ocean Acidification)
loadModule('acidification');

console.log("Main.js loaded and executed");