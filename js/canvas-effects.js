// js/canvas-effects.js - VERSÃO ATUALIZADA
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.log('❌ Canvas não encontrado, criando...');
            this.createCanvas();
        }
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.init();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'game-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        document.body.appendChild(canvas);
        this.canvas = canvas;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        console.log('🎨 Sistema de Partículas Iniciado!');
        this.createBackgroundParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Conectar eventos de interação
        this.setupInteractionEvents();
    }

    setupInteractionEvents() {
        // Efeito ao clicar em botões
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('rpg-btn') || 
                e.target.classList.contains('battle-btn') ||
                e.target.classList.contains('contact-btn')) {
                this.createMagicEffect(e.clientX, e.clientY, '#4a4ae6');
            }
        });

        // Efeito ao hover em projetos
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.project-enemy')) {
                const element = e.target.closest('.project-enemy');
                const rect = element.getBoundingClientRect();
                this.createSparkleEffect(rect.left + rect.width/2, rect.top + rect.height/2);
            }
        });
    }

    createBackgroundParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(74, 74, 230, ${Math.random() * 0.2 + 0.1})`,
                type: 'background'
            });
        }
    }

    createMagicEffect(x, y, color = '#4a4ae6') {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 8,
                speedY: (Math.random() - 0.5) * 8,
                color: color,
                life: 1.0,
                decay: Math.random() * 0.03 + 0.02,
                type: 'effect'
            });
        }
    }

    createSparkleEffect(x, y) {
        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y + (Math.random() - 0.5) * 50,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: '#ffd700',
                life: 0.8,
                decay: 0.05,
                type: 'sparkle'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Fundo gradiente sutil
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(10, 10, 30, 0.05)');
        gradient.addColorStop(1, 'rgba(20, 20, 40, 0.1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Atualizar e desenhar partículas
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Remover partículas mortas
            if (p.life !== undefined && p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Atualizar posição
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Atualizar vida
            if (p.life !== undefined) {
                p.life -= p.decay;
            }
            
            // Desenhar partícula
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            
            if (p.life !== undefined) {
                // Partícula de efeito com fade out
                this.ctx.fillStyle = p.color.replace(')', `, ${p.life})`).replace('rgb', 'rgba');
            } else {
                // Partícula de fundo permanente
                this.ctx.fillStyle = p.color;
            }
            
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.particleSystem = new ParticleSystem();
        console.log('✅ Sistema de Partículas Ativado!');
    }, 1000);
});