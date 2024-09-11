const acidificationModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Ocean Acidification module");

        // Create a simple ocean surface
        const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x0077be,
            shininess: 10,
            side: THREE.DoubleSide
        });
        this.ocean = new THREE.Mesh(geometry, material);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Add some fish
        this.fish = [];
        for (let i = 0; i < 10; i++) {
            const fishGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const fishMaterial = new THREE.MeshPhongMaterial({color: 0xff9900});
            const fish = new THREE.Mesh(fishGeometry, fishMaterial);
            fish.position.set(
                Math.random() * 10 - 5,
                Math.random() * 2 - 1,
                Math.random() * 10 - 5
            );
            scene.add(fish);
            this.fish.push(fish);
        }

        // Adjust camera position
        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);

        console.log("Ocean Acidification module initialized");
    },

    animate: function() {
        this.fish.forEach(fish => {
            fish.position.x += Math.random() * 0.02 - 0.01;
            fish.position.z += Math.random() * 0.02 - 0.01;
            if (fish.position.x > 5) fish.position.x = -5;
            if (fish.position.x < -5) fish.position.x = 5;
            if (fish.position.z > 5) fish.position.z = -5;
            if (fish.position.z < -5) fish.position.z = 5;
        });
    },

    cleanup: function() {
        console.log("Cleaning up Ocean Acidification module");
    },

    setupControls: function(controlsContainer) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = '50';
        slider.id = 'aciditySlider';

        const label = document.createElement('label');
        label.htmlFor = 'aciditySlider';
        label.textContent = 'Ocean Acidity: ';

        const value = document.createElement('span');
        value.id = 'acidityValue';
        value.textContent = slider.value;

        slider.addEventListener('input', () => {
            value.textContent = slider.value;
            const acidity = slider.value / 100;
            this.ocean.material.color.setRGB(0, 0.47 * (1 - acidity), 0.75);
            this.fish.forEach((fish, index) => {
                if (index < this.fish.length * acidity) {
                    fish.visible = false;
                } else {
                    fish.visible = true;
                }
            });
        });

        controlsContainer.appendChild(label);
        controlsContainer.appendChild(slider);
        controlsContainer.appendChild(value);

        console.log("Controls set up for Ocean Acidification module");
    }
};