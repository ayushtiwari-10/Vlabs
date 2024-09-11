const currentsModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Ocean Currents module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const oceanMaterial = new THREE.MeshBasicMaterial({ color: 0x0077be, side: THREE.DoubleSide });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Create arrows to represent currents
        this.arrows = [];
        for (let i = 0; i < 5; i++) {
            const arrowHelper = new THREE.ArrowHelper(
                new THREE.Vector3(1, 0, 0).normalize(),
                new THREE.Vector3(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5),
                2,
                0xffffff
            );
            scene.add(arrowHelper);
            this.arrows.push(arrowHelper);
        }

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);
    },

    animate: function() {
        this.arrows.forEach(arrow => {
            arrow.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.02);
        });
    },

    cleanup: function() {
        console.log("Cleaning up Ocean Currents module");
    },

    setupControls: function(controlsContainer) {
        const button = document.createElement('button');
        button.textContent = 'Toggle Current Direction';
        button.addEventListener('click', () => {
            this.arrows.forEach(arrow => {
                arrow.setDirection(new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize());
            });
        });
        controlsContainer.appendChild(button);
    }
};