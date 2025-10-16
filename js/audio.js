// js/audio.js - VERSÃO COMPLETA E CORRIGIDA
class RPGAudio {
    constructor() {
        this.audioContext = null;
        this.currentMusic = null;
        this.musicVolume = 0.6;
        this.sfxVolume = 0.8;
        this.isMuted = false;
        this.isUserInteracted = false;
        this.pendingMusic = null;
        this.musicTracks = new Map();
        this.soundEffects = new Map();
        
        this.init();
    }

    init() {
        console.log('🎵 RPG Audio System Initializing...');
        
        this.setupAudioContext();
        this.loadMusicTracks();
        this.loadSoundEffects();
        this.setupUserInteraction();
        
        console.log('✅ RPG Audio System Ready!');
    }

    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎛️ Audio Context created');
        } catch (error) {
            console.warn('⚠️ Web Audio API not supported:', error);
        }
    }

    setupUserInteraction() {
        const enableAudio = () => {
            if (!this.isUserInteracted) {
                console.log('👆 User interaction detected - audio enabled');
                this.isUserInteracted = true;
                
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
                
                // TOCAR MÚSICA PENDENTE SE HOUVER
                if (this.pendingMusic) {
                    console.log(`🎵 Playing pending music: ${this.pendingMusic}`);
                    this.playMusic(this.pendingMusic);
                    this.pendingMusic = null;
                }
                
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('keydown', enableAudio);
                document.removeEventListener('touchstart', enableAudio);
            }
        };

        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
        document.addEventListener('touchstart', enableAudio);
        
        const mainButtons = document.querySelectorAll('.rpg-btn, .location, .skill-item, .project-enemy');
        mainButtons.forEach(btn => {
            btn.addEventListener('click', enableAudio);
        });
    }

    loadMusicTracks() {
        // Trilhas principais
        this.musicTracks.set('title-theme', {
            name: 'Title Theme',
            url: 'assets/audio/music/title-theme.mp3',
            loop: true,
            volume: 0.5
        });

        this.musicTracks.set('world-map', {
            name: 'World Map Theme',
            url: 'assets/audio/music/world-map.mp3',
            loop: true,
            volume: 0.4
        });

        this.musicTracks.set('village', {
            name: 'Experience Village',
            url: 'assets/audio/music/village-theme.mp3',
            loop: true,
            volume: 0.4
        });

        this.musicTracks.set('forest', {
            name: 'Skills Forest',
            url: 'assets/audio/music/forest-theme.mp3',
            loop: true,
            volume: 0.4
        });

        this.musicTracks.set('dungeon', {
            name: 'Projects Dungeon',
            url: 'assets/audio/music/dungeon-theme.mp3',
            loop: true,
            volume: 0.5
        });

        this.musicTracks.set('tower', {
            name: 'Contact Tower',
            url: 'assets/audio/music/tower-theme.mp3',
            loop: true,
            volume: 0.4
        });

        console.log(`🎼 Loaded ${this.musicTracks.size} music tracks`);
    }

    loadSoundEffects() {
        // Efeitos sonoros
        this.soundEffects.set('select', {
            name: 'Menu Select',
            url: 'assets/audio/sfx/select.wav',
            volume: 0.7
        });

        this.soundEffects.set('confirm', {
            name: 'Confirm Action',
            url: 'assets/audio/sfx/confirm.wav',
            volume: 0.8
        });

        this.soundEffects.set('cursor', {
            name: 'Cursor Move',
            url: 'assets/audio/sfx/cursor.wav',
            volume: 0.5
        });

        this.soundEffects.set('attack', {
            name: 'Attack',
            url: 'assets/audio/sfx/attack.wav',
            volume: 0.9
        });

        this.soundEffects.set('victory', {
            name: 'Victory',
            url: 'assets/audio/sfx/victory.wav',
            volume: 0.8
        });

        console.log(`🔊 Loaded ${this.soundEffects.size} sound effects`);
    }

    async playMusic(trackName, fadeIn = true) {
        // SE USUÁRIO NÃO INTERAGIU, SALVAR COMO PENDENTE
        if (!this.isUserInteracted) {
            console.log(`💾 Saving music as pending: ${trackName}`);
            this.pendingMusic = trackName;
            return;
        }
        
        if (this.isMuted) return;
        
        const track = this.musicTracks.get(trackName);
        if (!track) {
            console.warn(`❌ Music track not found: ${trackName}`);
            return;
        }

        // Parar música atual se for diferente da nova
        if (this.currentMusic && this.currentMusic.src !== track.url) {
            await this.fadeOutCurrentMusic();
        }

        console.log(`🎵 Playing: ${track.name}`);

        // Se já está tocando a mesma música, não fazer nada
        if (this.currentMusic && this.currentMusic.src === track.url) {
            console.log('🎵 Same music already playing');
            return;
        }

        const audio = new Audio();
        audio.src = track.url;
        audio.volume = fadeIn ? 0 : (track.volume * this.musicVolume);
        audio.loop = track.loop;
        
        try {
            await audio.play();
            this.currentMusic = audio;
            
            if (fadeIn) {
                this.fadeInMusic(audio, track.volume * this.musicVolume);
            }
            
        } catch (error) {
            console.warn('⚠️ Music play failed:', error);
            this.showAudioHelp();
        }
    }

    async playSound(soundName) {
        if (!this.isUserInteracted) {
            console.log('⏳ Waiting for user interaction to play SFX...');
            return;
        }
        
        if (this.isMuted) return;
        
        const sound = this.soundEffects.get(soundName);
        if (!sound) {
            console.warn(`❌ Sound effect not found: ${soundName}`);
            return;
        }

        console.log(`🔊 Playing SFX: ${sound.name}`);

        const audio = new Audio();
        audio.src = sound.url;
        audio.volume = sound.volume * this.sfxVolume;
        
        try {
            await audio.play();
        } catch (error) {
            console.warn('⚠️ SFX play failed:', error);
        }
    }

    showAudioHelp() {
        if (document.getElementById('audio-help-message')) return;
        
        const helpMessage = document.createElement('div');
        helpMessage.id = 'audio-help-message';
        helpMessage.innerHTML = `
            <div class="audio-help-container">
                <h4>🔊 Audio Help</h4>
                <p>Click anywhere on the page to enable audio!</p>
                <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
            </div>
        `;
        
        helpMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 20, 50, 0.95);
            border: 3px solid #4a4ae6;
            border-radius: 12px;
            padding: 2rem;
            color: white;
            font-family: 'Press Start 2P', cursive;
            text-align: center;
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(helpMessage);
        
        setTimeout(() => {
            if (helpMessage.parentElement) {
                helpMessage.remove();
            }
        }, 5000);
    }

    fadeInMusic(audio, targetVolume, duration = 2000) {
        const startTime = Date.now();
        const startVolume = audio.volume;
        
        const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            audio.volume = startVolume + (targetVolume - startVolume) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(fade);
            }
        };
        
        fade();
    }

    async fadeOutCurrentMusic(duration = 1000) {
        if (!this.currentMusic) return;
        
        const startVolume = this.currentMusic.volume;
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            const fade = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                this.currentMusic.volume = startVolume * (1 - progress);
                
                if (progress < 1) {
                    requestAnimationFrame(fade);
                } else {
                    this.currentMusic.pause();
                    this.currentMusic = null;
                    resolve();
                }
            };
            
            fade();
        });
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic = null;
            console.log('⏹️ Music stopped');
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
        console.log(`🎚️ Music volume set to: ${this.musicVolume}`);
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        console.log(`🎚️ SFX volume set to: ${this.sfxVolume}`);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.stopMusic();
            console.log('🔇 Audio muted');
        } else {
            console.log('🔊 Audio unmuted');
        }
        
        return this.isMuted;
    }

    createAudioControls(container) {
        if (!container) return;
        
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        audioControls.innerHTML = `
            <div class="settings-section">
                <h3>🎵 Audio Settings</h3>
                
                <div class="audio-control-group">
                    <div class="control-item">
                        <label for="music-volume">Music Volume</label>
                        <div class="slider-container">
                            <input type="range" id="music-volume" class="volume-slider" 
                                   min="0" max="100" value="${this.musicVolume * 100}">
                            <span class="volume-value">${Math.round(this.musicVolume * 100)}%</span>
                        </div>
                    </div>
                    
                    <div class="control-item">
                        <label for="sfx-volume">SFX Volume</label>
                        <div class="slider-container">
                            <input type="range" id="sfx-volume" class="volume-slider" 
                                   min="0" max="100" value="${this.sfxVolume * 100}">
                            <span class="volume-value">${Math.round(this.sfxVolume * 100)}%</span>
                        </div>
                    </div>
                    
                    <div class="control-item">
                        <button id="mute-btn" class="mute-toggle-btn ${this.isMuted ? 'muted' : ''}">
                            ${this.isMuted ? '🔇 Muted' : '🔊 Unmuted'}
                        </button>
                        <button id="test-audio-btn" class="test-audio-btn">
                            Test Audio 🔊
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(audioControls);
        this.setupControlEvents();
    }

    setupControlEvents() {
        const muteBtn = document.getElementById('mute-btn');
        const testBtn = document.getElementById('test-audio-btn');
        const musicSlider = document.getElementById('music-volume');
        const sfxSlider = document.getElementById('sfx-volume');

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                const isMuted = this.toggleMute();
                muteBtn.textContent = isMuted ? '🔇 Muted' : '🔊 Unmuted';
                muteBtn.classList.toggle('muted', isMuted);
                
                this.playSound('confirm');
            });
        }

        if (testBtn) {
            testBtn.addEventListener('click', () => {
                this.playTestSound();
            });
        }

        if (musicSlider) {
            musicSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.setMusicVolume(volume);
                
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay) {
                    valueDisplay.textContent = `${e.target.value}%`;
                }
            });
        }

        if (sfxSlider) {
            sfxSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.setSFXVolume(volume);
                
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay) {
                    valueDisplay.textContent = `${e.target.value}%`;
                }
                
                this.playSound('cursor');
            });
        }
    }

    playTestSound() {
        this.playSound('confirm');
    }
}

// Inicialização global
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing RPG Audio System...');
    
    setTimeout(() => {
        window.rpgAudio = new RPGAudio();
        console.log('✅ RPG Audio System Ready!');
    }, 500);
});