const plasticPollutionModule = {
    init: function(scene, camera, renderer) {
        console.log("Initializing Plastic Pollution module");

        // Create ocean surface
        const oceanGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
        const oceanMaterial = new THREE.MeshPhongMaterial({ color: 0x0077be, side: THREE.DoubleSide });
        this.ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        this.ocean.rotation.x = -Math.PI / 2;
        scene.add(this.ocean);

        // Create plastic particles
        this.particles = new THREE.Group();
        scene.add(this.particles);
        this.createParticles(50);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        scene.add(light);

        camera.position.set(0, 5, 10);
        camera.lookAt(scene.position);
    },

    createParticles: function(count) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
        for (let i = 0; i < count; i++) {
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                Math.random() * 10 - 5,
                0.1,
                Math.random() * 10 - 5
            );
            this.particles.add(particle);
        }
    },

    animate: function() {
        this.particles.children.forEach(particle => {
            particle.position.x += (Math.random() - 0.5) * 0.01;
            particle.position.z += (Math.random() - 0.5) * 0.01;
            if (particle.position.x > 5) particle.position.x = -5;
            if (particle.position.x < -5) particle.position.x = 5;
            if (particle.position.z > 5) particle.position.z = -5;
            if (particle.position.z < -5) particle.position.z = 5;
        });
    },

    cleanup: function() {
        console.log("Cleaning up Plastic Pollution module");
    },

    setupControls: function(controlsContainer) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = '50';
        slider.addEventListener('input', (event) => {
            const particleCount = Math.floor(event.target.value);
            while (this.particles.children.length > particleCount) {
                this.particles.remove(this.particles.children[0]);
            }
            while (this.particles.children.length < particleCount) {
                this.createParticles(1);
            }
        });
        controlsContainer.appendChild(slider);
    }
};