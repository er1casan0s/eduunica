// Sistema de Progresso e Medalhas
let userProgress = {
    totalScore: 0,
    gamesPlayed: 0,
    achievements: [],
    currentStreak: 0,
    bestStreak: 0,
    lastPlayed: null
};

// Sistema de medalhas baseado em pontuação
const medalSystem = {
    bronze: { threshold: 100, icon: 'fas fa-medal bronze', name: 'Iniciante' },
    silver: { threshold: 500, icon: 'fas fa-medal silver', name: 'Intermediário' },
    gold: { threshold: 1000, icon: 'fas fa-medal gold', name: 'Avançado' },
    platinum: { threshold: 2000, icon: 'fas fa-medal', name: 'Mestre' }
};

// Conquistas específicas por jogo
const gameAchievements = {
    'memoria': [
        { id: 'memoria_nivel1', name: 'Primeiros Passos', description: 'Complete o nível 1 do jogo de memória', score: 50 },
        { id: 'memoria_nivel3', name: 'Memorizador', description: 'Complete o nível 3 do jogo de memória', score: 100 },
        { id: 'memoria_mestre', name: 'Mestre da Memória', description: 'Complete todos os níveis do jogo de memória', score: 200 }
    ],
    'comunicacao': [
        { id: 'comunica_iniciante', name: 'Comunicador Iniciante', description: 'Identifique 10 expressões faciais corretamente', score: 50 },
        { id: 'comunica_avancado', name: 'Comunicador Avançado', description: 'Identifique 15+ expressões faciais corretamente', score: 150 }
    ]
};

// Inicializar progresso do usuário
function initializeUserProgress() {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }
    updateProgressDisplay();
}

// Salvar progresso do usuário
function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    updateProgressDisplay();
}

// Atualizar pontuação do jogo
function updateGameScore(gameName, score, level = 1) {
    userProgress.totalScore += score;
    userProgress.gamesPlayed++;
    userProgress.lastPlayed = new Date().toISOString().split('T')[0];
    
    // Verificar conquistas do jogo
    checkGameAchievements(gameName, score, level);
    
    // Verificar medalhas por pontuação total
    checkMedalAchievements();
    
    saveUserProgress();
    updateCalendar(); // Atualizar calendário com novas entradas
}

// Verificar conquistas específicas do jogo
function checkGameAchievements(gameName, score, level) {
    const achievements = gameAchievements[gameName];
    if (!achievements) return;
    
    achievements.forEach(achievement => {
        const alreadyAchieved = userProgress.achievements.some(a => a.id === achievement.id);
        
        if (!alreadyAchieved) {
            // Lógica para verificar se conquistou
            let achieved = false;
            
            if (gameName === 'memoria') {
                if (achievement.id === 'memoria_nivel1' && level >= 1) achieved = true;
                if (achievement.id === 'memoria_nivel3' && level >= 3) achieved = true;
                if (achievement.id === 'memoria_mestre' && level >= 5) achieved = true;
            } else if (gameName === 'comunicacao') {
                if (achievement.id === 'comunica_iniciante' && score >= 10) achieved = true;
                if (achievement.id === 'comunica_avancado' && score >= 15) achieved = true;
            }
            
            if (achieved) {
                userProgress.achievements.push({
                    id: achievement.id,
                    name: achievement.name,
                    description: achievement.description,
                    date: new Date().toISOString().split('T')[0],
                    type: 'conquista',
                    medal: getMedalForScore(achievement.score)
                });
                
                // Adicionar automaticamente ao diário
                addAchievementToDiary(achievement.name, achievement.description, getMedalForScore(achievement.score));
            }
        }
    });
}

// Verificar medalhas por pontuação total
function checkMedalAchievements() {
    const medals = Object.keys(medalSystem);
    
    medals.forEach(medal => {
        const medalInfo = medalSystem[medal];
        const alreadyAchieved = userProgress.achievements.some(a => a.id === `medal_${medal}`);
        
        if (!alreadyAchieved && userProgress.totalScore >= medalInfo.threshold) {
            userProgress.achievements.push({
                id: `medal_${medal}`,
                name: `${medalInfo.name} - ${medal.charAt(0).toUpperCase() + medal.slice(1)}`,
                description: `Alcançou ${medalInfo.threshold} pontos totais na plataforma`,
                date: new Date().toISOString().split('T')[0],
                type: 'medalha',
                medal: medal
            });
        }
    });
}

// Obter medalha baseada na pontuação
function getMedalForScore(score) {
    if (score >= 200) return 'platinum';
    if (score >= 150) return 'gold';
    if (score >= 100) return 'silver';
    return 'bronze';
}

// Adicionar conquista automaticamente ao diário
function addAchievementToDiary(title, description, medal) {
    const today = new Date().toISOString().split('T')[0];
    
    // Verificar se já existe uma entrada para esta conquista hoje
    const existingEntry = entries.find(entry => 
        entry.date === today && entry.title === title
    );
    
    if (!existingEntry) {
        entries.push({
            date: today,
            type: 'conquista',
            title: title,
            description: description,
            medal: medal
        });
        
        // Salvar entradas atualizadas
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }
}

// Atualizar display do progresso
function updateProgressDisplay() {
    const scoreElement = document.getElementById('userScore');
    const medalElement = document.getElementById('userMedal');
    
    if (scoreElement) {
        scoreElement.textContent = userProgress.totalScore;
    }
    
    if (medalElement) {
        const currentMedal = getCurrentMedal();
        medalElement.innerHTML = `<i class="${currentMedal.icon}"></i> ${currentMedal.name}`;
    }
    
    // Atualizar seção de conquistas
    updateAchievementsDisplay();
}

// Obter medalha atual baseada na pontuação
function getCurrentMedal() {
    if (userProgress.totalScore >= medalSystem.platinum.threshold) return medalSystem.platinum;
    if (userProgress.totalScore >= medalSystem.gold.threshold) return medalSystem.gold;
    if (userProgress.totalScore >= medalSystem.silver.threshold) return medalSystem.silver;
    return medalSystem.bronze;
}

// Atualizar display das conquistas
function updateAchievementsDisplay() {
    const achievementsContainer = document.querySelector('.achievements-container');
    if (!achievementsContainer) return;
    
    // Filtrar apenas conquistas (não medalhas de pontuação)
    const gameAchievementsList = userProgress.achievements.filter(a => !a.id.startsWith('medal_'));
    
    if (gameAchievementsList.length > 0) {
        achievementsContainer.innerHTML = gameAchievementsList.map(achievement => `
            <div class="achievement">
                <div class="achievement-icon">
                    <i class="${achievement.medal ? `fas fa-medal ${achievement.medal}` : 'fas fa-trophy'}"></i>
                </div>
                <div class="achievement-content">
                    <div class="achievement-title">
                        <h4>${achievement.name}</h4>
                        <span class="achievement-date"><i class="fas fa-calendar"></i> ${formatDate(achievement.date)}</span>
                    </div>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Simular atualização de jogo (para teste - remover na implementação real)
function simulateGameUpdate() {
    // Exemplo: usuário completou nível 3 de memória
    updateGameScore('memoria', 120, 3);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeUserProgress();
});