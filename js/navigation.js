// 📖 CAPÍTULO 1: O Sistema de Navegação Mágica

class RPGNavigation {
    constructor() {
        // 🎯 "Variáveis de estado" - como stats do personagem
        this.currentScreen = 'title-screen';
        this.previousScreen = null;
        
        // 🎮 Inicializa o jogo quando a página carrega
        this.init();
    }

    // 🏁 MÉTODO: Inicialização do Jogo
    init() {
        console.log('🎮 RPG Navigation System Activated!');
        
        // Mostra a tela inicial
        this.showScreen('title-screen');
        
        // Configura os ouvintes de eventos (botões)
        this.setupEventListeners();
    }

    // 🖼️ MÉTODO: Trocar de Tela
    showScreen(screenId) {
        console.log(`🔄 Mudando para tela: ${screenId}`);
        
        // 1. Esconde todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 2. Mostra apenas a tela desejada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.previousScreen = this.currentScreen;
            this.currentScreen = screenId;
        } else {
            console.error(`❌ Tela não encontrada: ${screenId}`);
        }
    }

    // 🎧 MÉTODO: Configurar "Ouvintes de Eventos"
    setupEventListeners() {
        // 🎯 Ouvinte para o botão "NOVA JORNADA"
        const startButton = document.querySelector('.rpg-btn[onclick*="startGame"]');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame();
            });
        }

        // 🎯 Ouvinte para o botão "VOLTAR AO MAPA"
        const backButton = document.querySelector('.rpg-btn[onclick*="backToMap"]');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.backToMap();
            });
        }

        // 🎯 Ouvintes para LOCAções no mapa
        document.querySelectorAll('.location').forEach(location => {
            location.addEventListener('click', (event) => {
                const locationName = event.currentTarget.getAttribute('data-location');
                this.enterLocation(locationName);
            });
        });
    }

    // 🚀 MÉTODO: Iniciar o Jogo
    startGame() {
        console.log('🎯 Iniciando nova jornada!');
        this.showScreen('world-map');
    }

    // 🗺️ MÉTODO: Voltar ao Mapa
    backToMap() {
        console.log('🧭 Voltando ao mapa mundial');
        this.showScreen('world-map');
    }

    // 🏞️ MÉTODO: Entrar em uma Localização
        enterLocation(locationId) {
        console.log(`🚪 Entering location: ${locationId}`);
        
        // 🔥 MAPA de localizações válidas
        const validLocations = {
            'forest': 'Skills Forest',
            'village': 'Experience Village', 
            'dungeon': 'Projects Dungeon',
            'tower': 'Contact Tower'
        };
        
        // Verifica se a localização é válida
        if (!validLocations[locationId]) {
            console.error(`❌ Invalid location: ${locationId}`);
            return;
        }
        
        console.log(`🎯 Going to: ${validLocations[locationId]}`);
        
        // Música específica para cada localização
        if (window.rpgAudio) {
            const locationMusic = {
                'forest': 'forest',
                'village': 'worldMap',
                'dungeon': 'mainTheme', 
                'tower': 'worldMap'
            };
            window.rpgAudio.playMusic(locationMusic[locationId] || 'worldMap');
            window.rpgAudio.playSound('select');
        }
        
        // Esconde todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostra a locação específica
        const locationScreen = document.getElementById(locationId);
        if (locationScreen) {
            locationScreen.classList.add('active');
            console.log(`✅ Successfully entered: ${validLocations[locationId]}`);
            
            // 🔥 SALVA o progresso
            if (window.progressSystem) {
                window.progressSystem.saveProgress(locationId);
            }
        } else {
            console.error(`❌ Location screen not found: ${locationId}`);
            // Fallback: volta para o mapa
            backToMap();
        }
    }
}

// ⚡ INICIALIZAÇÃO: Criar a instância quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.rpgGame = new RPGNavigation();
    console.log('🎉 RPG Portfolio carregado com sucesso!');
});

// 🌟 FUNÇÕES GLOBAIS (para os botões no HTML)
function startGame() {
    if (window.rpgGame) {
        window.rpgGame.startGame();
    }
}

function backToMap() {
    if (window.rpgGame) {
        window.rpgGame.backToMap();
    }
}

// Back to menu
    function backToMenu() {
        console.log('🏠 Voltando ao menu principal...');
        
        // 🔥 CORREÇÃO: Não salva o progresso quando volta ao menu
        if (window.progressSystem) {
            console.log('🚫 Skipping save when returning to menu');
        }
        
        // Esconde TODAS as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostra apenas a tela inicial
        const titleScreen = document.getElementById('title-screen');
        if (titleScreen) {
            titleScreen.classList.add('active');
            console.log('📺 Menu principal mostrado');
        }
        
        // 🔥 CORREÇÃO: Para música se estiver tocando
        if (window.rpgAudio) {
            window.rpgAudio.playMusic('mainTheme');
        }
    }