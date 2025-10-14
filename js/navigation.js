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
    enterLocation(locationName) {
        console.log(`🚪 Entrando em: ${locationName}`);
        
        // Mapeia nomes das localizações para IDs de tela
        const locationMap = {
            'forest': 'forest',
            'village': 'village', 
            'dungeon': 'dungeon',
            'tower': 'tower'
        };
        
        const screenId = locationMap[locationName];
        if (screenId) {
            this.showScreen(screenId);
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