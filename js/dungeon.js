// 🏰 PROJECTS DUNGEON - Sistema de Batalha COMPLETO

class DungeonSystem {
    constructor() {
        this.projectsData = {
            'lms-mobiliza': {
                name: '📚 Mobiliza',
                description: 'A powerful Learning Management System used by thousands of students.',
                health: 100,
                technologies: 'React, Node.js, MongoDB, AWS',
                role: 'CX Coordinator',
                duration: '2024 - Present',
                fullDescription: 'Complete learning platform with course management, progress tracking, and certification systems. Integrated with multiple payment gateways and analytics.',
                achievements: 'Reduced support tickets by 40% through automation and mapping recurrency problems',
                sprite: '📚'
            },
            'applique': {
                name: '🎨 Graphic Designer (freelancer)',
                description: 'Focused on creating social media posts, web landing page elements, and video editing.',
                health: 100,
                technologies: 'Adobe tools, Final Cut Pro',
                role: 'Graphic Designer',
                duration: '2015 - 2018',
                fullDescription: 'Freelance part-time job, first time working with tech.',
                achievements: '+10 projects done with 5 companies',
                sprite: '🎨'
            },
            'portfolio': {
                name: '🌐 JRPG Portfolio',
                description: 'Interactive portfolio built as a Chrono Trigger-inspired JRPG.',
                health: 100,
                technologies: 'HTML5, CSS3, JavaScript, Canvas API',
                role: 'Full-stack Developer & Designer',
                duration: '2025',
                fullDescription: 'Fully responsive portfolio website with game mechanics, achievements, and immersive storytelling.',
                achievements: 'Unique approach to portfolio presentation that stands out from traditional formats',
                sprite: '🌐'
            },
            'nfe-system': {
                name: '🧾 NFE System',
                description: 'Invoice control and storage system for financial management.',
                health: 100,
                technologies: 'Node.js, Laravel, PostgreSQL',
                role: 'Front-end Developer',
                duration: '2020 - 2021',
                fullDescription: 'Complete invoice management system with automated reporting and compliance features.',
                achievements: 'Created a whole responsive template system, with callbacks from the backend. ',
                sprite: '🧾'
            },
            'automation': {
                name: '⚡ CX Automation',
                description: 'Customer experience automation suite for support teams.',
                health: 100,
                technologies: 'Python, Hubspot Breeze AI, Gemini',
                role: 'Process Automation Specialist',
                duration: '2025',
                fullDescription: 'Suite of automation tools that handle repetitive support tasks and provide data insights.',
                achievements: 'Reduced manual work by 60% and improved response times by 45%',
                sprite: '⚡'
            }
        };
        
        this.defeatedProjects = new Set();
        this.currentProject = null;
        this.init();
    }

    init() {
        console.log('🏰 Dungeon System Initialized');
        this.setupProjectEvents();
        // Seleciona automaticamente o primeiro projeto ao inicializar
        this.selectFirstProject();
    }

    setupProjectEvents() {
        console.log('🔧 Setting up project events...');
        
        setTimeout(() => {
            const projects = document.querySelectorAll('.project-enemy');
            console.log(`🔍 Found ${projects.length} project elements`);
            
            projects.forEach((project, index) => {
                project.addEventListener('click', (event) => {
                    console.log(`🎯 Project ${index + 1} clicked`);
                    const projectId = event.currentTarget.getAttribute('data-project');
                    this.selectProject(projectId);
                });
            });
            
            console.log('✅ Project events setup complete');
        }, 100);
    }

    selectFirstProject() {
        const projects = Object.keys(this.projectsData);
        if (projects.length > 0) {
            this.selectProject(projects[0]);
        }
    }

    selectProject(projectId) {
        console.log('🎯 Selecting project:', projectId);
        
        if (!this.projectsData[projectId]) {
            console.error('❌ Project not found:', projectId);
            return;
        }
        
        // Remove active class from all projects
        document.querySelectorAll('.project-enemy').forEach(project => {
            project.classList.remove('active');
        });
        
        // Add active class to selected project
        const selectedProject = document.querySelector(`.project-enemy[data-project="${projectId}"]`);
        if (selectedProject) {
            selectedProject.classList.add('active');
        }
        
        // Update enemy display with project details
        this.currentProject = projectId;
        this.updateEnemyDisplay();
        this.updateProjectDetails(); // Atualiza os detalhes (mas controla a visibilidade)
        
        // Reset inteligente
        this.resetProjectHealth(projectId);
        
        // Se estiver derrotado, aplica visuais
        if (this.defeatedProjects.has(projectId)) {
            this.applyVictoryVisuals(projectId);
        }
        
        // Controla a visibilidade dos detalhes baseado no estado
        this.controlDetailsVisibility();
        
        // Play selection sound
        if (window.rpgAudio) {
            window.rpgAudio.playSound('select');
        }
    }

    updateEnemyDisplay() {
        const project = this.projectsData[this.currentProject];
        if (!project) return;

        const nameElement = document.getElementById('enemy-name');
        const descElement = document.getElementById('enemy-description');
        const healthElement = document.getElementById('enemy-health');
        const healthText = document.getElementById('health-text');
        const spriteElement = document.querySelector('.enemy-sprite');
        
        if (nameElement) nameElement.textContent = project.name;
        if (descElement) descElement.textContent = project.description;
        
        // Configura saúde baseada no estado derrotado
        if (this.defeatedProjects.has(this.currentProject)) {
            // Projeto derrotado
            if (healthElement) {
                healthElement.style.width = '0%';
                healthElement.classList.add('health-victory');
            }
            if (healthText) {
                healthText.textContent = 'DEFEATED!';
                healthText.classList.add('health-text-victory');
            }
        } else {
            // Projeto normal
            if (healthElement) {
                healthElement.style.width = '100%';
                healthElement.classList.remove('health-victory');
            }
            if (healthText) {
                healthText.textContent = '100%';
                healthText.classList.remove('health-text-victory');
            }
        }
        
        if (spriteElement) spriteElement.textContent = project.sprite;
    }

    // NOVA FUNÇÃO: Controla a visibilidade dos detalhes
    controlDetailsVisibility() {
        const detailsContainer = document.getElementById('project-details');
        if (!detailsContainer) return;

        const isDefeated = this.defeatedProjects.has(this.currentProject);
        
        if (isDefeated) {
            // Projeto derrotado - mostra detalhes
            detailsContainer.style.display = 'block';
            detailsContainer.classList.add('unlocked');
        } else {
            // Projeto não derrotado - esconde detalhes
            detailsContainer.style.display = 'none';
            detailsContainer.classList.remove('unlocked');
        }
    }

    // FUNÇÃO ATUALIZADA: Atualiza os detalhes do projeto na interface
    updateProjectDetails() {
        const project = this.projectsData[this.currentProject];
        if (!project) return;

        // Atualiza os elementos de detalhes do projeto
        const detailElements = {
            'detail-title': project.name,
            'detail-tech': project.technologies,
            'detail-role': project.role,
            'detail-duration': project.duration,
            'detail-description': project.fullDescription,
            'detail-achievements': project.achievements
        };

        // Atualiza cada elemento individualmente
        Object.entries(detailElements).forEach(([elementId, content]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = content;
                
                // Adiciona uma animação sutil para indicar mudança
                element.style.opacity = '0.7';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 200);
            }
        });

        console.log('✅ Project details updated for:', project.name);
    }

    resetProjectHealth(projectId) {
        const project = this.projectsData[projectId];
        if (!project) return;

        // Só reseta se não estiver derrotado
        if (!this.defeatedProjects.has(projectId)) {
            project.health = 100;
            
            const healthElement = document.getElementById('enemy-health');
            const healthText = document.getElementById('health-text');
            
            if (healthElement) {
                healthElement.style.width = '100%';
                healthElement.classList.remove('health-victory');
            }
            if (healthText) {
                healthText.textContent = '100%';
                healthText.classList.remove('health-text-victory');
            }
        }
    }

    attackProject() {
        if (!this.currentProject) {
            this.showMessage('Select a project first!', 'warning');
            return;
        }

        const project = this.projectsData[this.currentProject];
        const damage = Math.floor(Math.random() * 30) + 10;
        project.health = Math.max(0, project.health - damage);
        
        // Atualiza barra de vida
        const healthElement = document.getElementById('enemy-health');
        const healthText = document.getElementById('health-text');
        
        if (healthElement) {
            healthElement.style.width = `${project.health}%`;
        }
        if (healthText) {
            healthText.textContent = `${project.health}%`;
        }
        
        // Animação de ataque
        const enemyDisplay = document.querySelector('.enemy-display');
        if (enemyDisplay) {
            enemyDisplay.classList.add('attack-effect');
            setTimeout(() => enemyDisplay.classList.remove('attack-effect'), 500);
        }
        
        this.showMessage(`⚔️ ${damage} damage!`, 'attack');
        
        if (window.rpgAudio) {
            window.rpgAudio.playSound('confirm');
        }
        
        // Verifica se derrotou
        if (project.health <= 0) {
            this.projectDefeated();
        }
    }

    projectDefeated() {
        const project = this.projectsData[this.currentProject];
        this.defeatedProjects.add(this.currentProject);
        
        this.showMessage('🎉 Project defeated!', 'victory');
        this.markProjectAsDefeated();
        this.applyVictoryHealthBar();
        this.controlDetailsVisibility(); // ATUALIZA: Agora controla visibilidade aqui também
        
        if (window.progressSystem) {
            window.progressSystem.unlockAchievement('projectExplorer');
        }
        
        if (window.rpgAudio) {
            window.rpgAudio.playSound('confirm');
        }
    }

    markProjectAsDefeated() {
        const projectElement = document.querySelector(`.project-enemy[data-project="${this.currentProject}"]`);
        if (projectElement) {
            projectElement.classList.add('defeated');
        }
    }

    applyVictoryHealthBar() {
        const healthElement = document.getElementById('enemy-health');
        const healthText = document.getElementById('health-text');
        
        if (healthElement) {
            healthElement.classList.add('health-victory');
            healthElement.style.width = '0%';
        }
        if (healthText) {
            healthText.textContent = 'DEFEATED!';
            healthText.classList.add('health-text-victory');
        }
    }

    applyVictoryVisuals(projectId) {
        const projectElement = document.querySelector(`.project-enemy[data-project="${projectId}"]`);
        if (projectElement) {
            projectElement.classList.add('defeated');
        }
        
        if (this.currentProject === projectId) {
            const healthElement = document.getElementById('enemy-health');
            const healthText = document.getElementById('health-text');
            
            if (healthElement) {
                healthElement.classList.add('health-victory');
                healthElement.style.width = '0%';
            }
            if (healthText) {
                healthText.textContent = 'DEFEATED!';
                healthText.classList.add('health-text-victory');
            }
            
            // ATUALIZA: Controla visibilidade quando aplica visuais de vitória
            this.controlDetailsVisibility();
        }
    }

    inspectProject() {
        if (!this.currentProject) {
            this.showMessage('Select a project first!', 'warning');
            return;
        }
        
        const project = this.projectsData[this.currentProject];
        const quickAnalysis = this.generateQuickAnalysis(project);
        this.showQuickAnalysis(quickAnalysis);
        
        this.showMessage('🔍 Quick analysis completed!', 'info');
        
        if (window.rpgAudio) {
            window.rpgAudio.playSound('select');
        }
    }

    generateQuickAnalysis(project) {
        const techs = project.technologies.split(', ').slice(0, 3);
        const projectType = this.determineProjectType(project.name, project.description);
        const tags = this.generateProjectTags(project);
        const level = parseInt(project.name.match(/Lv\. (\d+)/)?.[1]) || 75;
        const complexity = level >= 85 ? 'High' : level >= 75 ? 'Medium' : 'Low';
        
        return {
            name: project.name,
            mainTech: techs[0] || 'Unknown',
            techStack: techs.join(' • '),
            duration: project.duration,
            type: projectType,
            complexity: complexity,
            tags: tags,
            role: project.role.split('&')[0].trim(),
            status: this.getProjectStatus(project.duration)
        };
    }

    determineProjectType(name, description) {
        const lowerName = name.toLowerCase();
        const lowerDesc = description.toLowerCase();
        
        if (lowerName.includes('lms') || lowerDesc.includes('learning') || lowerDesc.includes('course')) {
            return 'Education Platform';
        } else if (lowerName.includes('portfolio') || lowerDesc.includes('portfolio')) {
            return 'Personal Project';
        } else if (lowerName.includes('tool') || lowerDesc.includes('creation') || lowerDesc.includes('content')) {
            return 'Content Tool';
        } else if (lowerName.includes('system') || lowerDesc.includes('management') || lowerDesc.includes('invoice')) {
            return 'Business System';
        } else if (lowerName.includes('automation') || lowerDesc.includes('automation')) {
            return 'Automation Suite';
        } else {
            return 'Software Project';
        }
    }

    generateProjectTags(project) {
        const tags = new Set();
        
        if (project.technologies.includes('React') || project.technologies.includes('Vue') || project.technologies.includes('JavaScript')) {
            tags.add('Frontend');
        }
        if (project.technologies.includes('Node.js') || project.technologies.includes('Laravel') || project.technologies.includes('Python')) {
            tags.add('Backend');
        }
        if (project.technologies.includes('MongoDB') || project.technologies.includes('MySQL') || project.technologies.includes('PostgreSQL')) {
            tags.add('Database');
        }
        if (project.technologies.includes('AWS') || project.technologies.includes('Docker')) {
            tags.add('DevOps');
        }
        
        if (project.role.includes('Coordinator') || project.role.includes('Leadership')) {
            tags.add('Leadership');
        }
        if (project.role.includes('Support') || project.role.includes('Customer')) {
            tags.add('Customer Experience');
        }
        if (project.role.includes('Full-stack') || project.role.includes('Developer')) {
            tags.add('Development');
        }
        if (project.name.includes('Automation') || project.description.includes('automation')) {
            tags.add('Automation');
        }
        
        return Array.from(tags).slice(0, 4);
    }

    getProjectStatus(duration) {
        if (duration.includes('Present') || duration.includes('Current')) {
            return 'Active';
        } else if (duration.includes('2024') || duration.includes('2023')) {
            return 'Recent';
        } else {
            return 'Completed';
        }
    }

    showQuickAnalysis(analysis) {
        const existingAnalysis = document.getElementById('quick-analysis');
        if (existingAnalysis) existingAnalysis.remove();
        
        const analysisElement = document.createElement('div');
        analysisElement.id = 'quick-analysis';
        analysisElement.className = 'quick-analysis';
        
        analysisElement.innerHTML = `
            <div class="analysis-header">
                <h4>🔍 Quick Analysis</h4>
                <span class="analysis-close" onclick="this.parentElement.parentElement.remove()">×</span>
            </div>
            <div class="analysis-content">
                <div class="analysis-item">
                    <span class="analysis-label">Project:</span>
                    <span class="analysis-value">${analysis.name}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Main Tech:</span>
                    <span class="analysis-value tech">${analysis.mainTech}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Stack:</span>
                    <span class="analysis-value">${analysis.techStack}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Duration:</span>
                    <span class="analysis-value">${analysis.duration}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Type:</span>
                    <span class="analysis-value">${analysis.type}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Complexity:</span>
                    <span class="analysis-value complexity-${analysis.complexity.toLowerCase()}">${analysis.complexity}</span>
                </div>
                <div class="analysis-item">
                    <span class="analysis-label">Status:</span>
                    <span class="analysis-value status-${analysis.status.toLowerCase()}">${analysis.status}</span>
                </div>
                <div class="analysis-tags">
                    ${analysis.tags.map(tag => `<span class="analysis-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        const battleActions = document.querySelector('.battle-actions');
        if (battleActions) {
            battleActions.parentNode.insertBefore(analysisElement, battleActions);
        }
        
        setTimeout(() => {
            if (analysisElement.parentNode) analysisElement.remove();
        }, 8000);
    }

    // FUNÇÃO ATUALIZADA: Só mostra detalhes se o projeto estiver derrotado
    showProjectDetails() {
        const quickAnalysis = document.getElementById('quick-analysis');
        if (quickAnalysis) quickAnalysis.remove();
        
        // Só mostra detalhes se o projeto estiver derrotado
        if (this.defeatedProjects.has(this.currentProject)) {
            // Garante que os detalhes estejam atualizados
            this.updateProjectDetails();
            
            const detailsContainer = document.getElementById('project-details');
            if (detailsContainer) {
                detailsContainer.style.display = 'block';
                detailsContainer.classList.add('unlocked');
            }
        } else {
            this.showMessage('Defeat this project first to see details!', 'warning');
        }
    }

    hideProjectDetails() {
        const detailsContainer = document.getElementById('project-details');
        if (detailsContainer) {
            detailsContainer.style.display = 'none';
            detailsContainer.classList.remove('unlocked');
        }
        
        const quickAnalysis = document.getElementById('quick-analysis');
        if (quickAnalysis) quickAnalysis.remove();
    }

    nextProject() {
        const projects = Object.keys(this.projectsData);
        if (projects.length === 0) return;
        
        const currentIndex = this.currentProject ? projects.indexOf(this.currentProject) : -1;
        const nextIndex = (currentIndex + 1) % projects.length;
        
        this.selectProject(projects[nextIndex]);
        this.showMessage(`➡️ Selected: ${this.projectsData[projects[nextIndex]].name}`, 'info');
    }

    showMessage(text, type = 'info') {
        const existingMessage = document.getElementById('dungeon-message');
        if (existingMessage) existingMessage.remove();
        
        const message = document.createElement('div');
        message.id = 'dungeon-message';
        message.className = `dungeon-message ${type}`;
        message.textContent = text;
        
        document.querySelector('.dungeon-container').prepend(message);
        
        setTimeout(() => {
            if (message.parentNode) message.remove();
        }, 3000);
    }
}

// 🌟 FUNÇÕES GLOBAIS - DEFINIDAS CORRETAMENTE
window.attackProject = function() {
    console.log('🔘 Global attackProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.attackProject();
    } else {
        console.error('❌ Dungeon system not available');
        showTempMessage('⚔️ Attack! (System loading...)', 'warning');
    }
};

window.inspectProject = function() {
    console.log('🔘 Global inspectProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.inspectProject();
    } else {
        console.error('❌ Dungeon system not available');
        showTempMessage('🔍 Analyzing... (System loading...)', 'warning');
    }
};

window.nextProject = function() {
    console.log('🔘 Global nextProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.nextProject();
    } else {
        console.error('❌ Dungeon system not available');
        showTempMessage('➡️ Next project... (System loading...)', 'warning');
    }
};

// 🔥 FUNÇÃO DE FALLBACK PARA MENSAGENS TEMPORÁRIAS
window.showTempMessage = function(text, type = 'info') {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(20, 20, 50, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        border: 2px solid #4a4ae6;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        z-index: 10000;
        text-align: center;
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 2000);
};

// 🚀 INICIALIZAÇÃO ROBUSTA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Initializing Dungeon System...');
    
    // 🔥 VERIFICAÇÃO DE SEGURANÇA - Garante que as funções existem
    console.log('✅ Global functions status:', {
        attackProject: typeof window.attackProject,
        inspectProject: typeof window.inspectProject,
        nextProject: typeof window.nextProject
    });
    
    // Inicializa o sistema
    setTimeout(() => {
        window.dungeonSystem = new DungeonSystem();
        console.log('✅ Dungeon System Ready!');
        
        // Mostra mensagem de boas-vindas
        if (window.dungeonSystem.currentProject) {
            const project = window.dungeonSystem.projectsData[window.dungeonSystem.currentProject];
            window.dungeonSystem.showMessage(`🎯 Selected: ${project.name}`, 'info');
        }
    }, 1000);
});

// 🔥 FALLBACK EXTREMO: Se tudo falhar, define funções básicas
if (typeof window.attackProject === 'undefined') {
    console.log('🚨 Loading emergency fallback functions...');
    
    window.attackProject = function() { 
        console.log('⚠️ Fallback attackProject called');
        alert('⚔️ Attack! - System loading...');
    };
    
    window.inspectProject = function() { 
        console.log('⚠️ Fallback inspectProject called');
        alert('🔍 Analyze! - System loading...');
    };
    
    window.nextProject = function() { 
        console.log('⚠️ Fallback nextProject called');
        alert('➡️ Next Project! - System loading...');
    };
    
    console.log('✅ Emergency functions loaded');
}