// ===========================
// THREE.JS 3D BACKGROUND EFFECTS
// ===========================

(function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded, skipping 3D effects');
        return;
    }
    
    let scene, camera, renderer;
    let geometries = [];
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    
    init();
    animate();
    
    function init() {
        // Create scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);
        
        // Create camera
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 400;
        
        // Create renderer
        const canvas = document.getElementById('three-canvas');
        if (!canvas) return;
        
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ffcc, 0.5);
        directionalLight.position.set(1, 1, 0.5).normalize();
        scene.add(directionalLight);
        
        const directionalLight2 = new THREE.DirectionalLight(0xff00ff, 0.3);
        directionalLight2.position.set(-1, -1, -0.5).normalize();
        scene.add(directionalLight2);
        
        // Create geometries
        createGeometries();
        
        // Event listeners
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
    }
    
    function createGeometries() {
        const group = new THREE.Group();
        
        // Material with gradient-like effect
        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0x00ffcc,
                emissive: 0x00ffcc,
                emissiveIntensity: 0.1,
                shininess: 100,
                specular: 0x00ffcc,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            }),
            new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                emissive: 0xff00ff,
                emissiveIntensity: 0.1,
                shininess: 100,
                specular: 0xff00ff,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            }),
            new THREE.MeshPhongMaterial({
                color: 0xffff00,
                emissive: 0xffff00,
                emissiveIntensity: 0.1,
                shininess: 100,
                specular: 0xffff00,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            })
        ];
        
        // Create floating geometric shapes
        for (let i = 0; i < 15; i++) {
            const geometryType = Math.floor(Math.random() * 6);
            let geometry;
            
            switch(geometryType) {
                case 0:
                    geometry = new THREE.IcosahedronGeometry(20, 0);
                    break;
                case 1:
                    geometry = new THREE.OctahedronGeometry(25, 0);
                    break;
                case 2:
                    geometry = new THREE.TetrahedronGeometry(30, 0);
                    break;
                case 3:
                    geometry = new THREE.BoxGeometry(25, 25, 25);
                    break;
                case 4:
                    geometry = new THREE.DodecahedronGeometry(20, 0);
                    break;
                default:
                    geometry = new THREE.SphereGeometry(20, 8, 6);
            }
            
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = Math.random() * 600 - 300;
            mesh.position.y = Math.random() * 600 - 300;
            mesh.position.z = Math.random() * 600 - 300;
            
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            
            mesh.userData = {
                rotationSpeedX: Math.random() * 0.01 - 0.005,
                rotationSpeedY: Math.random() * 0.01 - 0.005,
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatRange: Math.random() * 30 + 10,
                offset: Math.random() * Math.PI * 2
            };
            
            group.add(mesh);
            geometries.push(mesh);
        }
        
        // Create a large central geometry
        const centralGeometry = new THREE.IcosahedronGeometry(50, 1);
        const centralMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffcc,
            emissive: 0x00ffcc,
            emissiveIntensity: 0.2,
            shininess: 100,
            specular: 0x00ffcc,
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        
        const centralMesh = new THREE.Mesh(centralGeometry, centralMaterial);
        centralMesh.userData = {
            rotationSpeedX: 0.003,
            rotationSpeedY: 0.005,
            isCentral: true
        };
        
        group.add(centralMesh);
        geometries.push(centralMesh);
        
        scene.add(group);
        
        // Create particle field
        createParticleField();
    }
    
    function createParticleField() {
        const particleCount = 500;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const colorPalette = [
            new THREE.Color(0x00ffcc),
            new THREE.Color(0xff00ff),
            new THREE.Color(0xffff00),
            new THREE.Color(0x00bfff)
        ];
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = Math.random() * 800 - 400;
            positions[i + 1] = Math.random() * 800 - 400;
            positions[i + 2] = Math.random() * 800 - 400;
            
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        geometries.push(particleSystem);
    }
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    }
    
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    
    function render() {
        const time = Date.now() * 0.001;
        
        // Rotate camera based on mouse position
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Animate geometries
        geometries.forEach((mesh, index) => {
            if (mesh.userData.isCentral) {
                // Special animation for central geometry
                mesh.rotation.x += mesh.userData.rotationSpeedX;
                mesh.rotation.y += mesh.userData.rotationSpeedY;
                mesh.scale.x = mesh.scale.y = mesh.scale.z = 1 + Math.sin(time * 0.5) * 0.1;
            } else if (mesh.type === 'Points') {
                // Rotate particle system
                mesh.rotation.y = time * 0.1;
            } else {
                // Float and rotate other geometries
                mesh.rotation.x += mesh.userData.rotationSpeedX;
                mesh.rotation.y += mesh.userData.rotationSpeedY;
                
                // Floating motion
                const floatY = Math.sin(time * mesh.userData.floatSpeed + mesh.userData.offset) * mesh.userData.floatRange;
                mesh.position.y += (floatY - mesh.position.y) * 0.01;
                
                // Pulsing scale
                const scale = 1 + Math.sin(time * 2 + index) * 0.1;
                mesh.scale.set(scale, scale, scale);
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // Performance optimization - reduce quality on low-end devices
    function optimizePerformance() {
        const fps = 60;
        let lastTime = performance.now();
        let frames = 0;
        
        function checkPerformance() {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const currentFps = (frames * 1000) / (currentTime - lastTime);
                
                if (currentFps < 30) {
                    // Reduce quality for better performance
                    renderer.setPixelRatio(1);
                    geometries.forEach(mesh => {
                        if (mesh.material) {
                            mesh.material.wireframe = true;
                        }
                    });
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        }
        
        checkPerformance();
    }
    
    // Start performance monitoring after 3 seconds
    setTimeout(optimizePerformance, 3000);
})();