// 🌲 SISTEMA DE SKILLS - VERSÃO AUTÔNOMA E GARANTIDA

class SkillsSystem {
    constructor() {
        this.skillsData = {
            frontend: {
                title: "⚡ Frontend Mastery",
                type: "Combat Skill",
                mp: 12,
                description: "Master of the visible realm. Crafts immersive user interfaces with HTML5, CSS3, and JavaScript. Specializes in React ecosystem and responsive design. Can debug CSS faster than you can say 'cascading style sheets'.",
                level: "Lv. 85",
                exp: "4250/5000"
            },
            backend: {
                title: "🔮 Backend Wizardry", 
                type: "Magic Skill",
                mp: 20,
                description: "Commands the server-side forces with Node.js and Express. Creates RESTful APIs that would make a dragon jealous. Database sorcery with MongoDB and PostgreSQL. Security incantations included.",
                level: "Lv. 70",
                exp: "2800/4000"
            },
            ux: {
                title: "🎨 UX Alchemy",
                type: "Support Skill",
                mp: 8,
                description: "Transforms user frustration into delightful experiences. Conducts usability rituals and creates wireframe prophecies. Turns complex workflows into intuitive journeys. The philosopher's stone of design thinking.",
                level: "Lv. 90", 
                exp: "5400/6000"
            },
            leadership: {
                title: "👑 Team Leadership",
                type: "Leadership Skill",
                mp: 25,
                description: "Inspires parties to achieve legendary quests. Masters the art of agile ceremonies and sprint planning. Wields the +3 Sword of Constructive Feedback. Buffs team morale and productivity stats.",
                level: "Lv. 88",
                exp: "5280/5500"
            },
            devops: {
                title: "⚙️ DevOps Engineering",
                type: "Technical Skill", 
                mp: 15,
                description: "Bridges the realms of development and operations. Automates deployment rituals with CI/CD scrolls. Containerizes applications with Docker magic. Cloud architecture with AWS and Azure.",
                level: "Lv. 65",
                exp: "2600/4000"
            }
        };
        
        this.allSkillIds = ['frontend', 'backend', 'ux', 'leadership', 'devops'];
        this.discoveredSkills = new Set();
        this.init();
    }

    init() {
        console.log('🌲 Skills System Initialized - Standalone Version');
        this.loadDiscoveredSkills();
        this.setupSkillEvents();
        this.setupProgressDisplay();
        this.updateProgressDisplay();
    }

    setupSkillEvents() {
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('click', (event) => {
                const skillId = event.currentTarget.getAttribute('data-skill');
                console.log(`🎯 Skill clicked: ${skillId}`);
                
                this.showSkillDetails(skillId);
                this.trackSkillDiscovery(skillId);
            });
        });
    }

    // 🔥 MÉTODO PRINCIPAL: Rastreamento DIRETO
    trackSkillDiscovery(skillId) {
        console.log(`🔍 Tracking skill: ${skillId}`);
        
        // 1. Adiciona ao Set local
        if (!this.discoveredSkills.has(skillId)) {
            this.discoveredSkills.add(skillId);
            console.log(`✅ Skill added to local Set: ${skillId}`);
        }
        
        // 2. Tenta comunicar com Progress System (se existir)
        if (window.progressSystem && typeof window.progressSystem.trackSkillDiscovery === 'function') {
            console.log('🔄 Communicating with Progress System...');
            window.progressSystem.trackSkillDiscovery(skillId);
        } else {
            console.log('⚠️ Progress System not available, using local tracking only');
        }
        
        // 3. Salva localmente
        this.saveDiscoveredSkills();
        
        // 4. Atualiza visual
        this.markSkillAsDiscovered(skillId);
        this.updateProgressDisplay();
        
        // 5. Verifica conquista
        this.checkSkillExplorerAchievement();
    }

    // 💾 SALVAR LOCALMENTE
    saveDiscoveredSkills() {
        const skillsArray = Array.from(this.discoveredSkills);
        localStorage.setItem('skillsDiscovered', JSON.stringify(skillsArray));
        console.log(`💾 Saved ${skillsArray.length} skills to localStorage`);
    }

    // 📥 CARREGAR SKILLS DESCOBERTAS
    loadDiscoveredSkills() {
        try {
            const saved = localStorage.getItem('skillsDiscovered');
            if (saved) {
                const skillsArray = JSON.parse(saved);
                skillsArray.forEach(skillId => {
                    this.discoveredSkills.add(skillId);
                });
                console.log(`📥 Loaded ${this.discoveredSkills.size} skills from localStorage`);
            }
            
            // Também tenta carregar do Progress System
            if (window.progressSystem && window.progressSystem.skillsDiscovered) {
                window.progressSystem.skillsDiscovered.forEach(skillId => {
                    this.discoveredSkills.add(skillId);
                });
                console.log(`📥 Loaded ${this.discoveredSkills.size} skills from Progress System`);
            }
        } catch (error) {
            console.error('❌ Error loading discovered skills:', error);
        }
    }

    // 🏆 VERIFICAR CONQUISTA
    checkSkillExplorerAchievement() {
        const discoveredCount = this.discoveredSkills.size;
        const totalSkills = this.allSkillIds.length;
        
        console.log(`📊 Progress: ${discoveredCount}/${totalSkills} skills`);
        
        if (discoveredCount >= totalSkills) {
            console.log('🎉 ALL SKILLS DISCOVERED! Unlocking achievement...');
            this.unlockSkillExplorerAchievement();
        }
    }

    // 🏆 DESBLOQUEAR CONQUISTA
    unlockSkillExplorerAchievement() {
        console.log('🏆 ACHIEVEMENT UNLOCKED: Skill Explorer!');
        
        // 1. Tenta usar o Progress System
        if (window.progressSystem && typeof window.progressSystem.unlockAchievement === 'function') {
            window.progressSystem.unlockAchievement('skillExplorer');
        } 
        // 2. Fallback: mostra popup diretamente
        else {
            this.showAchievementPopupDirect();
        }
    }

    // 🎪 POPUP DIRETO
    showAchievementPopupDirect() {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🔍</div>
                <div class="achievement-text">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">Skill Explorer</div>
                    <div class="achievement-desc">Discover all skills in the Skills Forest</div>
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

    // 👁️ MARCAR SKILL COMO DESCOBERTA
    markSkillAsDiscovered(skillId) {
        const skillElement = document.querySelector(`.skill-item[data-skill="${skillId}"]`);
        if (skillElement) {
            skillElement.classList.add('discovered');
            console.log(`👁️ Marked skill as discovered: ${skillId}`);
        }
    }

    // 📊 CONFIGURAR DISPLAY DE PROGRESSO
    setupProgressDisplay() {
        const skillsList = document.querySelector('.skills-list');
        if (skillsList && !document.getElementById('skills-progress')) {
            const progressElement = document.createElement('div');
            progressElement.id = 'skills-progress';
            progressElement.className = 'skills-progress';
            
            const subtitle = skillsList.querySelector('.subtitle');
            if (subtitle) {
                subtitle.insertAdjacentElement('afterend', progressElement);
            }
        }
    }

    // 🔄 ATUALIZAR DISPLAY DE PROGRESSO
    updateProgressDisplay() {
        const progressElement = document.getElementById('skills-progress');
        if (progressElement) {
            const discoveredCount = this.discoveredSkills.size;
            const totalSkills = this.allSkillIds.length;
            
            progressElement.textContent = `Discovered: ${discoveredCount}/${totalSkills} skills`;
            progressElement.style.display = 'block';
            
            console.log(`📈 Progress display updated: ${discoveredCount}/${totalSkills}`);
        }
    }

    showSkillDetails(skillId) {
        const skill = this.skillsData[skillId];
        if (!skill) return;

        // Remove classe active de todos os itens
        document.querySelectorAll('.skill-item').forEach(item => {
            item.classList.remove('active');
        });

        // Adiciona classe active ao item clicado
        const clickedItem = document.querySelector(`.skill-item[data-skill="${skillId}"]`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }

        // Atualiza os detalhes
        document.getElementById('skill-title').textContent = skill.title;
        document.getElementById('skill-type').textContent = skill.type;
        document.getElementById('skill-mp').textContent = `MP: ${skill.mp}`;
        document.getElementById('skill-description').textContent = skill.description;
        document.getElementById('skill-level').textContent = skill.level;
        document.getElementById('skill-exp').textContent = skill.exp;

        // Mostra a seção de detalhes
        document.querySelector('.details-placeholder').style.display = 'none';
        document.getElementById('skill-info').style.display = 'block';

        // Toca som
        if (window.rpgAudio) {
            window.rpgAudio.playSound('select');
        }
    }
}

// 🚀 INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Initializing Standalone Skills System...');
    window.skillsSystem = new SkillsSystem();
});