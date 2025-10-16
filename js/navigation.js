// js/navigation.js - VERSÃO CORRIGIDA COM MÚSICAS
function showScreen(screenId) {
    console.log(`🔄 Mudando para tela: ${screenId}`);
    
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log(`✅ Tela ${screenId} ativada`);
        
        // Inicializar controles de áudio se for a tela de settings
        if (screenId === 'settings') {
            initializeAudioControls();
        }
        
        // 🔥 SEMPRE TENTAR TOCAR MÚSICA DA TELA
        playScreenMusic(screenId);
    }
}

function initializeAudioControls() {
    if (window.rpgAudio) {
        const audioContainer = document.getElementById('audio-controls-container');
        if (audioContainer) {
            audioContainer.innerHTML = '';
            window.rpgAudio.createAudioControls(audioContainer);
        }
    }
}

function playScreenMusic(screenId) {
    if (!window.rpgAudio) return;
    
    const musicMap = {
        'title-screen': 'title-theme',
        'world-map': 'world-map',
        'village': 'village', 
        'forest': 'forest',
        'dungeon': 'dungeon',
        'tower': 'tower',
        'settings': 'title-theme'
    };
    
    const musicTrack = musicMap[screenId];
    if (musicTrack) {
        // 🔥 AGORA SEMPRE CHAMA playMusic - ele decide se toca ou salva como pendente
        window.rpgAudio.playMusic(musicTrack);
    }
}

function startGame() {
    console.log('🎮 Iniciando jogo...');
    showScreen('world-map');
}

function continueGame() {
    console.log('⏩ Continuando jogo...');
    showScreen('world-map');
}

function showConfig() {
    console.log('⚙️ Abrindo configurações...');
    showScreen('settings');
    
    if (window.rpgAudio) {
        window.rpgAudio.playSound('confirm');
    }
}

function backToMenu() {
    console.log('🏠 Voltando ao menu...');
    showScreen('title-screen');
}

function backToMap() {
    console.log('🗺️ Voltando ao mapa...');
    showScreen('world-map');
}

function testAudio() {
    if (window.rpgAudio) {
        window.rpgAudio.playTestSound();
    }
}

// Navegação do mapa mundial
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Configurando navegação do mapa...');
    
    const locations = document.querySelectorAll('.location');
    
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const targetLocation = this.getAttribute('data-location');
            console.log(`📍 Navegando para: ${targetLocation}`);
            
            showScreen(targetLocation);
            
            if (window.rpgAudio) {
                window.rpgAudio.playSound('select');
            }
        });
    });
});

console.log('✅ navigation.js carregado!');