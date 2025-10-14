// 🏰 PROJECTS DUNGEON - Sistema de Batalha CORRIGIDO

class DungeonSystem {
    constructor() {
        this.projectsData = {
            'lms-mobiliza': {
                name: '📚 LMS Platform',
                description: 'A powerful Learning Management System used by thousands of students.',
                health: 100,
                technologies: 'React, Node.js, MongoDB, AWS',
                role: 'CX Coordinator & Technical Support',
                duration: '2021 - Present',
                fullDescription: 'Complete learning platform with course management, progress tracking, and certification systems. Integrated with multiple payment gateways and analytics.',
                achievements: 'Reduced support tickets by 40% through automation and improved UX',
                sprite: '📚'
            },
            'applique': {
                name: '🎨 Applique Tool',
                description: 'E-learning content creation tool with drag-and-drop interface.',
                health: 100,
                technologies: 'Vue.js, Laravel, MySQL, Docker',
                role: 'Technical Support Specialist',
                duration: '2022 - Present',
                fullDescription: 'Intuitive content creation platform that allows educators to build interactive courses without coding knowledge.',
                achievements: 'Implemented user feedback system that improved satisfaction by 35%',
                sprite: '🎨'
            },
            'portfolio': {
                name: '🌐 JRPG Portfolio',
                description: 'Interactive portfolio built as a Chrono Trigger-inspired JRPG.',
                health: 100,
                technologies: 'HTML5, CSS3, JavaScript, Canvas API',
                role: 'Full-stack Developer & Designer',
                duration: '2024 - Present',
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
                achievements: 'Delivered ahead of schedule with 99.9% uptime in production',
                sprite: '🧾'
            },
            'automation': {
                name: '⚡ CX Automation',
                description: 'Customer experience automation suite for support teams.',
                health: 100,
                technologies: 'Python, Zendesk API, AWS Lambda',
                role: 'Process Automation Specialist',
                duration: '2023 - Present',
                fullDescription: 'Suite of automation tools that handle repetitive support tasks and provide data insights.',
                achievements: 'Reduced manual work by 60% and improved response times by 45%',
                sprite: '⚡'
            }
        };
        
        this.currentProject = null;
        this.init();
    }

    init() {
        console.log('🏰 Dungeon System Initialized');
        this.setupProjectEvents();
        this.checkElements(); // 🔥 Verifica se elementos existem
    }

    // 🔥 MÉTODO DE VERIFICAÇÃO
    checkElements() {
        const healthElement = document.getElementById('enemy-health');
        console.log('🔍 Health element found:', healthElement ? '✅' : '❌');
        
        if (!healthElement) {
            console.error('❌ enemy-health element not found!');
        }
    }

    setupProjectEvents() {
        const projects = document.querySelectorAll('.project-enemy');
        console.log(`🔍 Found ${projects.length} project elements`);
        
        projects.forEach(project => {
            project.addEventListener('click', (event) => {
                const projectId = event.currentTarget.getAttribute('data-project');
                this.selectProject(projectId);
            });
        });
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
        
        // Update enemy display
        this.currentProject = projectId;
        this.updateEnemyDisplay();
        
        // Play selection sound
        if (window.rpgAudio) {
            window.rpgAudio.playSound('select');
        }
    }

    updateEnemyDisplay() {
        const project = this.projectsData[this.currentProject];
        if (!project) {
            console.error('❌ No project data for:', this.currentProject);
            return;
        }

        // 🔥 ATUALIZAÇÃO SEGURA DOS ELEMENTOS
        const nameElement = document.getElementById('enemy-name');
        const descElement = document.getElementById('enemy-description');
        const healthElement = document.getElementById('enemy-health');
        const spriteElement = document.querySelector('.enemy-sprite');
        
        if (nameElement) nameElement.textContent = project.name;
        if (descElement) descElement.textContent = project.description;
        if (healthElement) healthElement.style.width = '100%';
        if (spriteElement) spriteElement.textContent = project.sprite;
        
        console.log('🔄 Enemy display updated:', project.name);
    }

attackProject() {
    console.log('⚔️ Attack button clicked!');
    
    if (!this.currentProject) {
        console.log('⚠️ No project selected!');
        this.showMessage('Select a project first!', 'warning');
        return;
    }

    const project = this.projectsData[this.currentProject];
    const damage = Math.floor(Math.random() * 30) + 10; // 10-40 damage
    project.health = Math.max(0, project.health - damage);
    
    console.log(`⚔️ Attacking ${project.name} for ${damage} damage! Health: ${project.health}%`);
    
    // 🔥 MÚLTIPLAS TENTATIVAS PARA ENCONTRAR A BARRA DE VIDA
    let healthElement = document.getElementById('enemy-health');
    
    if (!healthElement) {
        console.log('🔄 Trying alternative selectors...');
        // Tentativa 2: Query selector
        healthElement = document.querySelector('.health-fill');
        // Tentativa 3: Qualquer elemento com health
        if (!healthElement) {
            healthElement = document.querySelector('[id*="health"], [class*="health"]');
        }
    }
    
    if (healthElement) {
        healthElement.style.width = `${project.health}%`;
        console.log('✅ Health bar updated to:', `${project.health}%`);
        
        // Atualizar texto de saúde também
        const healthText = document.getElementById('health-text');
        if (healthText) {
            healthText.textContent = `${project.health}%`;
        }
    } else {
        console.error('❌ Health element not found! Creating fallback...');
        // Fallback: criar elemento se não existir
        this.createHealthBarFallback(project.health);
        return;
    }
    
    // Attack animation
    const enemyDisplay = document.querySelector('.enemy-display');
    if (enemyDisplay) {
        enemyDisplay.classList.add('attack-effect');
        setTimeout(() => {
            enemyDisplay.classList.remove('attack-effect');
        }, 500);
    }
    
    // Show damage message
    this.showMessage(`⚔️ ${damage} damage to ${project.name}!`, 'attack');
    
    // Play attack sound
    if (window.rpgAudio) {
        window.rpgAudio.playSound('confirm');
    }
    
    // Check if defeated
    if (project.health <= 0) {
        this.projectDefeated();
    }
}

// 🔥 NOVO MÉTODO: Fallback para barra de vida
createHealthBarFallback(health) {
    console.log('🛠️ Creating health bar fallback...');
    
    const enemyDisplay = document.querySelector('.enemy-display');
    if (!enemyDisplay) return;
    
    // Cria container se não existir
    let healthContainer = enemyDisplay.querySelector('.enemy-health-container');
    if (!healthContainer) {
        healthContainer = document.createElement('div');
        healthContainer.className = 'enemy-health-container';
        enemyDisplay.insertBefore(healthContainer, enemyDisplay.querySelector('.enemy-info'));
    }
    
    // Cria barra de saúde
    const healthBar = document.createElement('div');
    healthBar.className = 'enemy-health-bar';
    
    const healthFill = document.createElement('div');
    healthFill.id = 'enemy-health';
    healthFill.className = 'health-fill';
    healthFill.style.width = `${health}%`;
    
    const healthText = document.createElement('div');
    healthText.id = 'health-text';
    healthText.className = 'health-text';
    healthText.textContent = `${health}%`;
    
    healthBar.appendChild(healthFill);
    healthContainer.innerHTML = '';
    healthContainer.appendChild(healthBar);
    healthContainer.appendChild(healthText);
    
    console.log('✅ Health bar fallback created!');
}

    projectDefeated() {
        console.log('🎉 Project defeated!');
        this.showMessage('🎉 Project defeated! Details unlocked!', 'victory');
        this.showProjectDetails();
        
        // Achievement
        if (window.progressSystem) {
            window.progressSystem.unlockAchievement('projectExplorer');
        }
        
        // Victory sound
        if (window.rpgAudio) {
            window.rpgAudio.playSound('confirm');
        }
    }

   inspectProject() {
    console.log('🔍 Inspect button clicked!');
    
    if (!this.currentProject) {
        console.log('⚠️ No project selected!');
        this.showMessage('Select a project first!', 'warning');
        return;
    }
    
    const project = this.projectsData[this.currentProject];
    
    // 🔍 ANÁLISE RÁPIDA - Informações essenciais
    const quickAnalysis = this.generateQuickAnalysis(project);
    this.showQuickAnalysis(quickAnalysis);
    
    this.showMessage('🔍 Quick analysis completed!', 'info');
    
    // Play inspect sound
    if (window.rpgAudio) {
        window.rpgAudio.playSound('select');
    }
}

// 🔥 NOVO MÉTODO: Gerar análise rápida
generateQuickAnalysis(project) {
    // Extrai tecnologias principais da string completa
    const techs = project.technologies.split(', ').slice(0, 3); // Pega as 3 primeiras
    
    // Determina o tipo de projeto baseado no nome/descrição
    const projectType = this.determineProjectType(project.name, project.description);
    
    // Gera tags relevantes
    const tags = this.generateProjectTags(project);
    
    // Análise de complexidade baseada no nível
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
        role: project.role.split('&')[0].trim(), // Pega a primeira role
        status: this.getProjectStatus(project.duration)
    };
}

// 🔥 MÉTODO: Determinar tipo de projeto
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

// 🔥 MÉTODO: Gerar tags do projeto
generateProjectTags(project) {
    const tags = new Set();
    
    // Tags baseadas em tecnologias
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
    
    // Tags baseadas no tipo de projeto
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
    
    return Array.from(tags).slice(0, 4); // Limita a 4 tags
}

// 🔥 MÉTODO: Status do projeto
getProjectStatus(duration) {
    if (duration.includes('Present') || duration.includes('Current')) {
        return 'Active';
    } else if (duration.includes('2024') || duration.includes('2023')) {
        return 'Recent';
    } else {
        return 'Completed';
    }
}

// 🔥 MÉTODO: Mostrar análise rápida
showQuickAnalysis(analysis) {
    // Remove análise anterior se existir
    const existingAnalysis = document.getElementById('quick-analysis');
    if (existingAnalysis) {
        existingAnalysis.remove();
    }
    
    // Cria container da análise rápida
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
    
    // Insere antes dos botões de ação
    const battleActions = document.querySelector('.battle-actions');
    if (battleActions) {
        battleActions.parentNode.insertBefore(analysisElement, battleActions);
    }
    
    // Auto-remove após 8 segundos
    setTimeout(() => {
        if (analysisElement.parentNode) {
            analysisElement.remove();
        }
    }, 8000);
}

    showProjectDetails() {
        const project = this.projectsData[this.currentProject];
        if (!project) return;

        // 🔥 ATUALIZAÇÃO SEGURA DOS DETALHES
        const elements = {
            'detail-title': project.name,
            'detail-tech': project.technologies,
            'detail-role': project.role,
            'detail-duration': project.duration,
            'detail-description': project.fullDescription,
            'detail-achievements': project.achievements
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'detail-title') {
                    element.textContent = value;
                } else if (id === 'detail-description' || id === 'detail-achievements') {
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
            } else {
                console.warn(`⚠️ Element #${id} not found`);
            }
        });
        
        const detailsContainer = document.getElementById('project-details');
        if (detailsContainer) {
            detailsContainer.style.display = 'block';
            
            // Scroll to details
            setTimeout(() => {
                detailsContainer.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    }

    nextProject() {
        console.log('➡️ Next button clicked!');
        
        const projects = Object.keys(this.projectsData);
        if (projects.length === 0) return;
        
        const currentIndex = this.currentProject ? projects.indexOf(this.currentProject) : -1;
        const nextIndex = (currentIndex + 1) % projects.length;
        
        this.selectProject(projects[nextIndex]);
        this.showMessage(`➡️ Selected: ${this.projectsData[projects[nextIndex]].name}`, 'info');
    }

    // 🔥 NOVO MÉTODO: Mostrar mensagens
    showMessage(text, type = 'info') {
        // Remove mensagem anterior se existir
        const existingMessage = document.getElementById('dungeon-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Cria nova mensagem
        const message = document.createElement('div');
        message.id = 'dungeon-message';
        message.className = `dungeon-message ${type}`;
        message.textContent = text;
        
        document.querySelector('.dungeon-container').prepend(message);
        
        // Remove após 3 segundos
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
}

// 🌟 FUNÇÕES GLOBAIS
function attackProject() {
    console.log('🔘 Global attackProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.attackProject();
    } else {
        console.error('❌ Dungeon system not available');
    }
}

function inspectProject() {
    console.log('🔘 Global inspectProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.inspectProject();
    } else {
        console.error('❌ Dungeon system not available');
    }
}

function nextProject() {
    console.log('🔘 Global nextProject() called');
    if (window.dungeonSystem) {
        window.dungeonSystem.nextProject();
    } else {
        console.error('❌ Dungeon system not available');
    }
}

// 🚀 INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Initializing Dungeon System...');
    setTimeout(() => {
        window.dungeonSystem = new DungeonSystem();
        console.log('✅ Dungeon System Ready!');
    }, 500);
});