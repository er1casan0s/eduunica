// accessibility.js - Sistema de Gerenciamento de Acessibilidade

class AccessibilityManager {
    constructor() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reduceMotion: false,
            colorblindMode: false
        };
        
        // Espera o DOM estar pronto antes de inicializar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    // Inicializa o sistema
    init() {
        this.loadSettings();
        this.applySettings();
        this.setupEventListeners();
        this.injectControls();
    }

    // Carrega configurações do localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('eduunica_accessibility');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }

    // Salva configurações no localStorage
    saveSettings() {
        localStorage.setItem('eduunica_accessibility', JSON.stringify(this.settings));
    }

    // Aplica as configurações ao documento
    applySettings() {
        const { highContrast, largeText, reduceMotion, colorblindMode } = this.settings;
        
        // Remove todas as classes primeiro
        document.body.classList.remove('high-contrast', 'large-text', 'reduce-motion', 'colorblind-friendly');
        
        // Aplica classes baseado nas configurações
        if (highContrast) document.body.classList.add('high-contrast');
        if (largeText) document.body.classList.add('large-text');
        if (reduceMotion) document.body.classList.add('reduce-motion');
        if (colorblindMode) document.body.classList.add('colorblind-friendly');
        
        // Atualiza controles visuais se existirem
        this.updateControlElements();
    }

    // Alterna uma configuração específica
    toggleSetting(setting) {
        this.settings[setting] = !this.settings[setting];
        this.saveSettings();
        this.applySettings();
        
        // Anuncia mudança para leitores de tela
        this.announceChange(setting, this.settings[setting]);
    }

    // Reseta todas as configurações
    resetSettings() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reduceMotion: false,
            colorblindMode: false
        };
        this.saveSettings();
        this.applySettings();
        this.announceChange('reset', true);
    }

    // Anuncia mudanças para leitores de tela
    announceChange(setting, enabled) {
        const messages = {
            highContrast: enabled ? 'Modo alto contraste ativado' : 'Modo alto contraste desativado',
            largeText: enabled ? 'Texto ampliado ativado' : 'Texto ampliado desativado',
            reduceMotion: enabled ? 'Redução de movimento ativada' : 'Redução de movimento desativada',
            colorblindMode: enabled ? 'Modo daltonismo ativado' : 'Modo daltonismo desativado',
            reset: 'Configurações de acessibilidade redefinidas'
        };

        this.speakToScreenReader(messages[setting]);
    }

    // Fala para leitores de tela
    speakToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    }

    // Injeta controles de acessibilidade se não existirem
    injectControls() {
        if (!document.getElementById('accessibilityControls')) {
            const controlsHTML = `
                <div id="accessibilityControls" class="accessibility-controls">
                    <button class="accessibility-toggle" 
                            aria-label="Abrir configurações de acessibilidade"
                            onclick="accessibilityManager.togglePanel()">
                        <i class="fas fa-universal-access"></i>
                    </button>
                    
                    <div class="accessibility-panel" id="accessibilityPanel">
                        <h3 class="sr-only">Configurações de Acessibilidade</h3>
                        
                        <div class="accessibility-option">
                            <input type="checkbox" id="highContrast" 
                                   ${this.settings.highContrast ? 'checked' : ''}
                                   onchange="accessibilityManager.toggleSetting('highContrast')">
                            <label for="highContrast">Alto Contraste</label>
                        </div>
                        
                        <div class="accessibility-option">
                            <input type="checkbox" id="largeText" 
                                   ${this.settings.largeText ? 'checked' : ''}
                                   onchange="accessibilityManager.toggleSetting('largeText')">
                            <label for="largeText">Texto Maior</label>
                        </div>
                        
                        <div class="accessibility-option">
                            <input type="checkbox" id="reduceMotion" 
                                   ${this.settings.reduceMotion ? 'checked' : ''}
                                   onchange="accessibilityManager.toggleSetting('reduceMotion')">
                            <label for="reduceMotion">Reduzir Animação</label>
                        </div>
                        
                        <div class="accessibility-option">
                            <input type="checkbox" id="colorblindMode" 
                                   ${this.settings.colorblindMode ? 'checked' : ''}
                                   onchange="accessibilityManager.toggleSetting('colorblindMode')">
                            <label for="colorblindMode">Modo Daltonismo</label>
                        </div>
                        
                        <button onclick="accessibilityManager.resetSettings()" 
                                class="reset-btn">
                            <i class="fas fa-redo"></i> Redefinir Tudo
                        </button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', controlsHTML);
        }
    }

    // Atualiza elementos de controle
    updateControlElements() {
        const checkboxes = {
            highContrast: document.getElementById('highContrast'),
            largeText: document.getElementById('largeText'),
            reduceMotion: document.getElementById('reduceMotion'),
            colorblindMode: document.getElementById('colorblindMode')
        };

        Object.keys(checkboxes).forEach(key => {
            if (checkboxes[key]) {
                checkboxes[key].checked = this.settings[key];
            }
        });
    }

    // Alterna painel de controles
    togglePanel() {
        const panel = document.getElementById('accessibilityPanel');
        if (panel) {
            panel.classList.toggle('show');
        }
    }

    // Configura event listeners
    setupEventListeners() {
        // Fecha painel ao clicar fora
        document.addEventListener('click', (e) => {
            const controls = document.getElementById('accessibilityControls');
            const panel = document.getElementById('accessibilityPanel');
            
            if (controls && panel && 
                !controls.contains(e.target) && 
                panel.classList.contains('show')) {
                panel.classList.remove('show');
            }
        });

        // Tecla Escape fecha painel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const panel = document.getElementById('accessibilityPanel');
                if (panel && panel.classList.contains('show')) {
                    panel.classList.remove('show');
                }
            }
        });
    }
}

// Inicializa o gerenciador globalmente
const accessibilityManager = new AccessibilityManager();