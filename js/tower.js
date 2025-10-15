// 🏰 CONTACT TOWER SYSTEM
class ContactTower {
    constructor() {
        this.init();
    }

    init() {
        console.log('🏰 Contact Tower Initialized');
        this.setupContactEvents();
        this.setupFloorNavigation();
    }

    setupContactEvents() {
        // Eventos para os cartões de contato
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('contact-btn')) {
                    card.classList.toggle('expanded');
                }
            });
        });
    }

    setupFloorNavigation() {
        // Scroll suave entre andares
        const floors = document.querySelectorAll('.tower-floor');
        floors.forEach(floor => {
            floor.addEventListener('click', (e) => {
                if (e.target.classList.contains('floor-header')) {
                    floor.classList.toggle('expanded');
                }
            });
        });
    }
}

// 🌟 FUNÇÕES GLOBAIS PARA CONTATOS
window.openLink = function(url) {
    window.open(url, '_blank');
    window.showTempMessage('🌐 Opening link...', 'info');
    
    if (window.rpgAudio) {
        window.rpgAudio.playSound('confirm');
    }
};

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        window.showTempMessage('✅ Copied to clipboard!', 'success');
    }).catch(err => {
        window.showTempMessage('❌ Failed to copy', 'error');
    });
    
    if (window.rpgAudio) {
        window.rpgAudio.playSound('select');
    }
};

window.openWhatsApp = function() {
    const phone = '+5553981199764'; // Substitua pelo seu número
    const message = 'Olá! Vim pelo seu portfolio e gostaria de conversar.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    window.showTempMessage('💬 Opening WhatsApp...', 'info');
};

window.downloadResume = function() {
    // Substitua pelo link real do seu CV
    const resumeUrl = '/assets/documents/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Rafael-Real-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.showTempMessage('📄 Downloading resume...', 'info');
};

window.scheduleMeeting = function() {
    // Google Calendar
    const calendlyUrl = 'https://calendar.app.google/xFu51PEt3xCLrYsF6';
    window.open(calendlyUrl, '_blank');
    
    window.showTempMessage('🗓️ Opening scheduler...', 'info');
};

// Init
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.contactTower = new ContactTower();
        console.log('✅ Contact Tower Ready!');
    }, 1000);
});