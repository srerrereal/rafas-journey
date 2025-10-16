// js/screen-transitions.js
class ScreenTransitions {
    constructor() {
        this.currentScreen = null;
        this.nextScreen = null;
    }

    async fadeOut(screenElement) {
        return new Promise(resolve => {
            screenElement.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(resolve, 500);
        });
    }

    async fadeIn(screenElement) {
        return new Promise(resolve => {
            screenElement.style.animation = 'fadeIn 0.5s ease forwards';
            setTimeout(resolve, 500);
        });
    }

    async slideLeft(currentScreen, nextScreen) {
        currentScreen.style.animation = 'slideLeftOut 0.6s ease forwards';
        nextScreen.style.animation = 'slideLeftIn 0.6s ease forwards';
        await this.delay(600);
    }

    async slideRight(currentScreen, nextScreen) {
        currentScreen.style.animation = 'slideRightOut 0.6s ease forwards';
        nextScreen.style.animation = 'slideRightIn 0.6s ease forwards';
        await this.delay(600);
    }

    async magicalTransition(currentScreen, nextScreen) {
        // Efeito de partículas mágicas
        if (window.particleSystem) {
            const rect = currentScreen.getBoundingClientRect();
            window.particleSystem.createMagicEffect(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                '#8a2be2'
            );
        }
        
        currentScreen.style.animation = 'magicOut 0.8s ease forwards';
        nextScreen.style.animation = 'magicIn 0.8s ease forwards';
        await this.delay(800);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}