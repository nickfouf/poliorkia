const COLORS = [
    "#ff9f43", // Orange (Primary)
    "#54a0ff", // Blue (Secondary)
    "#ff6b6b", // Red (Danger)
    "#feca57", // Yellow
    "#1dd1a1", // Green
    "#5f27cd"  // Purple
];

export function startConfetti() {
    // 1. Setup Canvas
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none"; 
    canvas.style.zIndex = "100000"; 
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 2. Control Logic
    let isEmitting = true;
    let animationId: number;

    // Stop adding new confetti after 2 seconds
    setTimeout(() => {
        isEmitting = false;
    }, 2000);

    // 3. Create Particles
    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
    }

    // 4. Cleanup Helper
    const onResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        let activeParticles = 0;

        for (const p of particles) {
            // Update returns true if particle is still active/visible
            const isAlive = p.update(isEmitting);
            
            if (isAlive) {
                p.draw(ctx);
                activeParticles++;
            }
        }

        // Keep animating as long as we are emitting OR particles are still falling
        if (isEmitting || activeParticles > 0) {
            animationId = requestAnimationFrame(render);
        } else {
            // Complete cleanup
            window.removeEventListener('resize', onResize);
            canvas.remove();
        }
    };

    render();
}

class Particle {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    wobble: number;
    wobbleSpeed: number;
    boundaryH: number;

    constructor(screenWidth: number, screenHeight: number) {
        this.boundaryH = screenHeight;
        this.x = Math.random() * screenWidth;
        this.y = Math.random() * screenHeight - screenHeight; 
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 6 + 4;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        this.vx = (Math.random() - 0.5) * 2; 
        this.vy = Math.random() * 3 + 2;     
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
    }

    update(respawn: boolean): boolean {
        this.y += this.vy;
        this.x += Math.sin(this.wobble) * 2; 
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed;

        // Boundary Check
        if (this.y > this.boundaryH + 20) {
            if (respawn) {
                // Reset to top to simulate continuous flow
                this.y = -20;
                this.x = Math.random() * window.innerWidth;
                return true;
            } else {
                // Don't render anymore if we stopped emitting and it fell off
                return false;
            }
        }
        return true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

