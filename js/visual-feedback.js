// js/visual-feedback.js - VERSÃO COMPLETA (com transições incluídas)
class VisualFeedback {
    static init() {
        console.log('🎭 Iniciando Sistema de Efeitos Visuais...');
        this.setupButtonEffects();
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupScreenTransitions();
        
        // Aplicar efeitos iniciais
        this.applyInitialEffects();
    }

    static setupScreenTransitions() {
        // Sobrescrever a função showScreen para incluir transições
        const originalShowScreen = window.showScreen;
        
        window.showScreen = async function(screenId) {
            const currentScreen = document.querySelector('.screen.active');
            const nextScreen = document.getElementById(screenId);
            
            if (currentScreen && nextScreen) {
                // Efeito de transição
                await VisualFeedback.transitionScreens(currentScreen, nextScreen);
            }
            
            // Chamar função original se existir
            if (originalShowScreen) {
                originalShowScreen(screenId);
            } else {
                // Fallback
                const screens = document.querySelectorAll('.screen');
                screens.forEach(screen => screen.classList.remove('active'));
                nextScreen.classList.add('active');
            }
        };
    }

    static async transitionScreens(currentScreen, nextScreen) {
        // Efeito de saída
        currentScreen.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Criar partículas de transição
        if (window.particleSystem) {
            const rect = currentScreen.getBoundingClientRect();
            window.particleSystem.createMagicEffect(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                '#8a2be2'
            );
        }
        
        // Aguardar animação
        await this.delay(300);
        
        // Trocar telas
        currentScreen.classList.remove('active');
        nextScreen.classList.add('active');
        
        // Efeito de entrada
        nextScreen.style.animation = 'fadeIn 0.5s ease forwards';
        
        await this.delay(500);
        
        // Resetar animações
        currentScreen.style.animation = '';
        nextScreen.style.animation = '';
    }

    static setupButtonEffects() {
        console.log('🔘 Configurando efeitos de botão...');
        
        // Efeito ripple em todos os botões
        const buttons = document.querySelectorAll('.rpg-btn, .battle-btn, .contact-btn, .skill-item, .project-enemy');
        
        buttons.forEach(button => {
            // Remover event listeners antigos para evitar duplicação
            button.replaceWith(button.cloneNode(true));
        });

        // Re-selecionar após clone
        const freshButtons = document.querySelectorAll('.rpg-btn, .battle-btn, .contact-btn, .skill-item, .project-enemy');
        
        freshButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e);
                this.shakeElement(button);
                
                // Efeito de partículas no clique
                if (window.particleSystem) {
                    window.particleSystem.createMagicEffect(e.clientX, e.clientY, '#4a4ae6');
                }
            });

            button.addEventListener('mouseenter', () => {
                button.classList.add('pulse-glow');
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.classList.remove('pulse-glow');
                button.style.transform = 'translateY(0)';
            });
        });
    }

    static setupHoverEffects() {
        console.log('🎯 Configurando efeitos hover...');
        
        // Efeitos especiais para projetos
        const projects = document.querySelectorAll('.project-enemy');
        projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.transform = 'translateY(-8px) scale(1.05)';
                project.style.boxShadow = '0 15px 30px rgba(74, 74, 230, 0.4)';
                project.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                // Efeito de partículas no hover
                if (window.particleSystem) {
                    const rect = project.getBoundingClientRect();
                    window.particleSystem.createSparkleEffect(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                    );
                }
            });

            project.addEventListener('mouseleave', () => {
                project.style.transform = 'translateY(0) scale(1)';
                project.style.boxShadow = '';
            });
        });

        // Efeitos para skills
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'translateX(15px)';
                skill.style.background = 'linear-gradient(90deg, rgba(74, 74, 230, 0.3), transparent)';
                skill.style.borderLeft = '3px solid #4a4ae6';
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'translateX(0)';
                skill.style.background = '';
                skill.style.borderLeft = '';
            });
        });

        // Efeitos para localizações do mapa
        const locations = document.querySelectorAll('.location');
        locations.forEach(location => {
            location.addEventListener('mouseenter', () => {
                location.style.transform = 'scale(1.1)';
                location.style.filter = 'brightness(1.2)';
            });

            location.addEventListener('mouseleave', () => {
                location.style.transform = 'scale(1)';
                location.style.filter = 'brightness(1)';
            });
        });
    }

    static setupClickEffects() {
        console.log('👆 Configurando efeitos de clique...');
        
        // Efeito global de clique em localizações
        document.addEventListener('click', (e) => {
            if (e.target.closest('.location')) {
                const location = e.target.closest('.location');
                this.highlightElement(location, 2000);
                this.createFloatingText('✨', e.clientX, e.clientY, '#ffd700');
            }
        });
    }

    static applyInitialEffects() {
        console.log('🎨 Aplicando efeitos iniciais...');
        
        // Aplicar efeito de digitação no título
        const title = document.querySelector('.title-glitch');
        if (title) {
            title.classList.add('typing-effect');
        }
        
        // Aplicar efeito flutuante em elementos importantes
        const floatingElements = document.querySelectorAll('.rpg-btn, .location');
        floatingElements.forEach(el => {
            el.classList.add('floating');
        });
        
        // Efeito CRT scanline
        this.createCRTEffect();
    }

    static createCRTEffect() {
        const crt = document.createElement('div');
        crt.className = 'crt-effect';
        crt.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.03) 50%);
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 9998;
            animation: scanline 8s linear infinite;
        `;
        document.body.appendChild(crt);
    }

    static createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.cssText = `
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${event.clientX - button.getBoundingClientRect().left - radius}px;
            top: ${event.clientY - button.getBoundingClientRect().top - radius}px;
            background-color: rgba(255, 255, 255, 0.7);
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(circle);

        setTimeout(() => {
            if (circle.parentNode === button) {
                button.removeChild(circle);
            }
        }, 600);
    }

    static shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    static highlightElement(element, duration = 2000) {
        element.classList.add('pulse-glow');
        setTimeout(() => {
            element.classList.remove('pulse-glow');
        }, duration);
    }

    static createFloatingText(text, x, y, color = '#ffffff') {
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: ${color};
            font-family: 'Press Start 2P', cursive;
            font-size: 12px;
            pointer-events: none;
            z-index: 10000;
            animation: floatUp 1s ease-out forwards;
        `;
        
        document.body.appendChild(floatingText);
        
        setTimeout(() => {
            if (floatingText.parentNode) {
                floatingText.remove();
            }
        }, 1000);
    }

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicialização automática quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Carregado - Iniciando efeitos visuais...');
    
    setTimeout(() => {
        VisualFeedback.init();
        console.log('✅ Sistema de Efeitos Visuais Ativado!');
        
        // Forçar alguns efeitos para teste
        const testButton = document.querySelector('.rpg-btn');
        if (testButton) {
            testButton.classList.add('enhanced-btn');
        }
    }, 1000);
});

// Debug no console
console.log('📜 visual-feedback.js carregado com sucesso!');

window.VisualFeedback = VisualFeedback;