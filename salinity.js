const salinityModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Salinity module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const oceanMaterial = new THREE.MeshPhongMaterial({ color: 0x0077be, side: THREE.DoubleSide });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Create salinity particles
        this.particles = new THREE.Group();
        scene.add(this.particles);
        this.createParticles(100);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);

        this.salinity = 35; // Average ocean salinity (parts per thousand)
    },

    createParticles: function(count) {
        const geometry = new THREE.SphereGeometry(0.03, 8, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
        for (let i = 0; i < count; i++) {
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                Math.random() * 10 - 5,
                Math.random() * 0.5,
                Math.random() * 10 - 5
            );
            this.particles.add(particle);
        }
    },

    animate: function() {
        this.particles.children.forEach(particle => {
            particle.position.y -= 0.01;
            if (particle.position.y < 0) {
                particle.position.y = 0.5;
            }
        });
    },

    cleanup: function() {
        console.log("Cleaning up Salinity module");
    },

    setupControls: function(controlsContainer) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '50';
        slider.value = this.salinity;
        const label = document.createElement('label');
        label.textContent = `Salinity: ${this.salinity} ppt`;
        
        slider.addEventListener('input', (event) => {
            this.salinity = event.target.value;
            label.textContent = `Salinity: ${this.salinity} ppt`;
            const particleCount = Math.floor(this.salinity * 3);
            while (this.particles.children.length > particleCount) {
                this.particles.remove(this.particles.children[0]);
            }
            while (this.particles.children.length < particleCount) {
                this.createParticles(1);
            }
            this.ocean.material.color.setHSL(0.6, 1, 0.5 - this.salinity / 100);
        });

        controlsContainer.appendChild(label);
        controlsContainer.appendChild(slider);
    }
};