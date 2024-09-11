const ecosystemModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Ecosystem module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const oceanMaterial = new THREE.MeshPhongMaterial({ color: 0x0077be, side: THREE.DoubleSide });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Create ecosystem elements
        this.createFish(10);
        this.createPlants(5);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);

        this.biodiversity = 15; // Initial biodiversity score
    },

    createFish: function(count) {
        const geometry = new THREE.ConeGeometry(0.1, 0.3, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff9900 });
        this.fishes = new THREE.Group();
        for (let i = 0; i < count; i++) {
            const fish = new THREE.Mesh(geometry, material);
            fish.position.set(
                Math.random() * 10 - 5,
                Math.random() * 0.5 + 0.2,
                Math.random() * 10 - 5
            );
            fish.rotation.y = Math.random() * Math.PI * 2;
            this.fishes.add(fish);
        }
        scene.add(this.fishes);
    },

    createPlants: function(count) {
        const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        this.plants = new THREE.Group();
        for (let i = 0; i < count; i++) {
            const plant = new THREE.Mesh(geometry, material);
            plant.position.set(
                Math.random() * 10 - 5,
                0.25,
                Math.random() * 10 - 5
            );
            this.plants.add(plant);
        }
        scene.add(this.plants);
    },

    animate: function() {
        this.fishes.children.forEach(fish => {
            fish.position.x += Math.sin(fish.rotation.y) * 0.02;
            fish.position.z += Math.cos(fish.rotation.y) * 0.02;
            if (fish.position.x > 5 || fish.position.x < -5 || fish.position.z > 5 || fish.position.z < -5) {
                fish.rotation.y += Math.PI;
            }
        });
    },

    cleanup: function() {
        console.log("Cleaning up Ecosystem module");
    },

    setupControls: function(controlsContainer) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '30';
        slider.value = this.biodiversity;
        const label = document.createElement('label');
        label.textContent = `Biodiversity: ${this.biodiversity}`;
        
        slider.addEventListener('input', (event) => {
            this.biodiversity = parseInt(event.target.value);
            label.textContent = `Biodiversity: ${this.biodiversity}`;
            
            const fishCount = Math.floor(this.biodiversity * 2 / 3);
            const plantCount = Math.floor(this.biodiversity / 3);
            
            while (this.fishes.children.length > fishCount) {
                this.fishes.remove(this.fishes.children[0]);
            }
            while (this.fishes.children.length < fishCount) {
                this.createFish(1);
            }
            
            while (this.plants.children.length > plantCount) {
                this.plants.remove(this.plants.children[0]);
            }
            while (this.plants.children.length < plantCount) {
                this.createPlants(1);
            }
        });

        controlsContainer.appendChild(label);
        controlsContainer.appendChild(slider);
    }
};