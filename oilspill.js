const oilSpillModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Oil Spill module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const oceanMaterial = new THREE.MeshPhongMaterial({ color: 0x0077be, side: THREE.DoubleSide });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Create oil spill
        const spillGeometry = new THREE.CircleGeometry(1, 32);
        const spillMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });
        this.spill = new THREE.Mesh(spillGeometry, spillMaterial);
        this.spill.rotation.x = -Math.PI / 2;
        this.spill.position.y = 0.01;
        scene.add(this.spill);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);
    },

    animate: function() {
        // Slowly expand the oil spill
        if (this.spill.scale.x < 3) {
            this.spill.scale.x += 0.001;
            this.spill.scale.y += 0.001;
        }
    },

    cleanup: function() {
        console.log("Cleaning up Oil Spill module");
    },

    setupControls: function(controlsContainer) {
        const button = document.createElement('button');
        button.textContent = 'Reset Oil Spill';
        button.addEventListener('click', () => {
            this.spill.scale.set(1, 1, 1);
            this.spill.position.set(Math.random() * 8 - 4, 0.01, Math.random() * 8 - 4);
        });
        controlsContainer.appendChild(button);
    }
};