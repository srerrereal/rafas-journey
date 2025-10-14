// 💾 SISTEMA DE PROGRESSO - VERSÃO CORRIGIDA

class ProgressSystem {
    constructor() {
        // Dados padrão
        this.saveData = this.getDefaultSaveData();
        
        // Lista de conquistas
        this.achievementsList = {
            firstSteps: { 
                name: "First Steps", 
                desc: "Start your journey", 
                icon: "👣",
                unlocked: false 
            },
            skillExplorer: {
                name: "Skill Explorer", 
                desc: "Discover all skills in the Skills Forest",
                icon: "🔍",
                unlocked: false
            },
            portfolioReader: { 
                name: "Curious Mind", 
                desc: "Spend 5 minutes exploring", 
                icon: "📚",
                unlocked: false 
            }
        };
        
        // Sistema de rastreamento de skills
        this.skillsDiscovered = new Set();
        this.allSkillIds = ['frontend', 'backend', 'ux', 'leadership', 'devops'];
        
        this.init();
    }

    getDefaultSaveData() {
        return {
            lastScreen: 'title-screen',
            visitedLocations: [],
            achievements: [],
            discoveredSkills: [],
            playTime: 0,
            firstVisit: new Date().toISOString(),
            hasSave: false
        };
    }

    init() {
        console.log('💾 Progress System Initialized');
        this.loadSaveData();
        this.setupEventListeners();
        this.startPlayTimeTracker();
        window.progressSystem = this;
    }

    // 📥 CARREGAR DADOS
    loadSaveData() {
        try {
            const saved = localStorage.getItem('rpgPortfolioSave');
            console.log('📥 Loading save data:', saved);
            
            if (saved) {
                const parsedData = JSON.parse(saved);
                this.saveData = { ...this.getDefaultSaveData(), ...parsedData };
                this.saveData.hasSave = true;
                
                // Carrega skills descobertas
                if (this.saveData.discoveredSkills) {
                    this.saveData.discoveredSkills.forEach(skillId => {
                        this.skillsDiscovered.add(skillId);
                    });
                    console.log(`📚 Loaded ${this.skillsDiscovered.size} discovered skills`);
                }
            }
            this.updateContinueButton();
        } catch (error) {
            console.error('❌ Error loading save data:', error);
            this.saveData = this.getDefaultSaveData();
        }
    }

    //save data
    saveProgress(screenId = null) {
        try {
            // 🔥 CORREÇÃO: Determina qual tela salvar
            let screenToSave = screenId;
            
            if (!screenToSave) {
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id) {
                    screenToSave = activeScreen.id;
                }
            }
            
            // 🔥 CORREÇÃO CRÍTICA: NUNCA salvar a tela inicial como progresso
            if (screenToSave === 'title-screen') {
                console.log('🚫 Not saving title-screen as progress');
                return false; // Não salva se for o menu principal
            }
            
            // 🔥 CORREÇÃO: Só atualiza se for uma tela válida de jogo
            if (screenToSave && screenToSave !== 'title-screen') {
                this.saveData.lastScreen = screenToSave;
                this.saveData.hasSave = true;
                console.log('💾 Saving progress for screen:', screenToSave);
            }
            
            // Atualiza skills descobertas no saveData
            this.saveData.discoveredSkills = Array.from(this.skillsDiscovered);
            
            this.saveData.lastSave = new Date().toISOString();
            
            localStorage.setItem('rpgPortfolioSave', JSON.stringify(this.saveData));
            console.log('💾 Progress saved. Last screen:', this.saveData.lastScreen, 'Skills:', this.skillsDiscovered.size);
            
            this.updateContinueButton();
            return true;
        } catch (error) {
            console.error('❌ Error saving progress:', error);
            return false;
        }
    }

    // 🎯 CONTINUAR JOGO
    continueGame() {
        console.log('🎯 Continue button clicked');
        
        if (this.saveData.hasSave && this.saveData.lastScreen && this.saveData.lastScreen !== 'title-screen') {
            console.log('🚀 Continuing to:', this.saveData.lastScreen);
            
            if (window.rpgGame && typeof window.rpgGame.showScreen === 'function') {
                window.rpgGame.showScreen(this.saveData.lastScreen);
            } else {
                this.showScreenManual(this.saveData.lastScreen);
            }
            
            this.unlockAchievement('firstSteps');
        } else {
            console.log('🎮 No valid save, starting new game');
            startGame();
        }
    }

    // 🔍 RASTREAR DESCOBERTA DE SKILLS
    trackSkillDiscovery(skillId) {
        console.log(`🔍 Skill discovered: ${skillId}`);
        
        if (!this.skillsDiscovered.has(skillId)) {
            this.skillsDiscovered.add(skillId);
            this.saveProgress();
            
            console.log(`📊 Skills progress: ${this.skillsDiscovered.size}/${this.allSkillIds.length}`);
            this.checkSkillExplorerAchievement();
        }
    }

    // 🏆 VERIFICAR CONQUISTA DE SKILLS
    checkSkillExplorerAchievement() {
        if (this.skillsDiscovered.size >= this.allSkillIds.length) {
            this.unlockAchievement('skillExplorer');
        }
    }

    // 🏆 DESBLOQUEAR CONQUISTA
    unlockAchievement(achievementId) {
        if (!this.achievementsList[achievementId] || this.saveData.achievements.includes(achievementId)) {
            return;
        }

        this.saveData.achievements.push(achievementId);
        this.achievementsList[achievementId].unlocked = true;
        this.showAchievementPopup(achievementId);
        this.saveProgress();
        
        console.log('🏆 Achievement unlocked:', achievementId);
    }

    // 🎪 POPUP DE CONQUISTA
    showAchievementPopup(achievementId) {
        const achievement = this.achievementsList[achievementId];
        
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        setTimeout(() => popup.classList.add('show'), 100);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 4000);
        
        if (window.rpgAudio) {
            window.rpgAudio.playSound('confirm');
        }
    }

    // 🖥️ MÉTODO MANUAL PARA TROCAR TELAS
    showScreenManual(screenId) {
        console.log('🖥️ Switching screen manually to:', screenId);
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        } else {
            startGame();
        }
    }

    // 🔄 ATUALIZAR BOTÃO CONTINUE
    updateContinueButton() {
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            if (this.saveData.hasSave && this.saveData.lastScreen !== 'title-screen') {
                continueBtn.style.display = 'block';
                continueBtn.innerHTML = `Continue • ${this.getSaveTime()}`;
            } else {
                continueBtn.style.display = 'none';
            }
        }
    }

    // ⏰ FORMATAR TEMPO DO SAVE
    getSaveTime() {
        if (!this.saveData.lastSave) return 'Recently';
        const lastSave = new Date(this.saveData.lastSave);
        const now = new Date();
        const diffMinutes = Math.floor((now - lastSave) / (1000 * 60));
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        return 'Earlier';
    }

    // 🎧 CONFIGURAR EVENTOS
    setupEventListeners() {
        document.addEventListener('click', (event) => {
            // 🔥 CORREÇÃO: Só salva se NÃO for um botão que volta ao menu
            const target = event.target;
            const isBackToMenuButton = target.closest && (
                target.closest('[onclick*="backToMenu"]') || 
                target.closest('.rpg-btn')?.textContent?.includes('Main Menu')
            );
            
            if (!isBackToMenuButton) {
                setTimeout(() => this.saveProgress(), 500);
            }
        });
        
        // 🔥 CORREÇÃO ADICIONAL: Salva quando entra em locações
        document.addEventListener('click', (event) => {
            if (event.target.closest('.location')) {
                setTimeout(() => this.saveProgress(), 500);
            }
        });
}
    // ⏰ RASTREADOR DE TEMPO
    startPlayTimeTracker() {
        setInterval(() => {
            this.saveData.playTime += 1;
            if (this.saveData.playTime >= 300) {
                this.unlockAchievement('portfolioReader');
            }
        }, 1000);
    }
    clearSave() {
        localStorage.removeItem('rpgPortfolioSave');
        this.saveData = this.getDefaultSaveData();
        this.skillsDiscovered.clear();
        this.updateContinueButton();
        console.log('🗑️ Save data cleared');
    }

}

// 🌟 INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Progress System...');
    window.progressSystem = new ProgressSystem();
});

// 🌟 FUNÇÃO GLOBAL CONTINUE
function continueGame() {
    console.log('🔘 Global continueGame() called');
    if (window.progressSystem) {
        window.progressSystem.continueGame();
    } else {
        startGame();
    }
}