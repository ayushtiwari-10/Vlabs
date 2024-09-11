const tsunamiModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Tsunami module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
        const oceanMaterial = new THREE.MeshPhongMaterial({
            color: 0x0077be,
            side: THREE.DoubleSide
        });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);

        this.waveCenter = new THREE.Vector2(0, 0);
        this.waveStrength = 0;
    },

    animate: function() {
        const positions = this.ocean.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const distance = new THREE.Vector2(x, y).distanceTo(this.waveCenter);
            const z = this.waveStrength * Math.exp(-distance * 0.5) * Math.sin(distance - performance.now() * 0.005);
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        this.waveStrength *= 0.99;  // Decay the wave over time
    },

    cleanup: function() {
        console.log("Cleaning up Tsunami module");
    },

    setupControls: function(controlsContainer) {
        const button = document.createElement('button');
        button.textContent = 'Trigger Tsunami';
        button.addEventListener('click', () => {
            this.waveCenter.set(Math.random() * 10 - 5, Math.random() * 10 - 5);
            this.waveStrength = 2;
        });
        controlsContainer.appendChild(button);
    }
};