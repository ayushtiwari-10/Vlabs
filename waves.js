const wavesModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Waves Formation module");

        // Create wave mesh
        const waveGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
        const waveMaterial = new THREE.MeshPhongMaterial({
            color: 0x0077be,
            wireframe: true,
            side: THREE.DoubleSide
        });
        this.waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
        this.waveMesh.rotation.x = -Math.PI / 2;
        scene.add(this.waveMesh);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);

        this.time = 0;
    },

    animate: function() {
        this.time += 0.05;
        const positions = this.waveMesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = 0.5 * Math.sin(x + this.time) * Math.cos(y + this.time);
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
    },

    cleanup: function() {
        console.log("Cleaning up Waves Formation module");
    },

    setupControls: function(controlsContainer) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = '50';
        slider.addEventListener('input', (event) => {
            const amplitude = event.target.value / 100;
            this.waveMesh.material.wireframe = amplitude < 0.5;
        });
        controlsContainer.appendChild(slider);
    }
};