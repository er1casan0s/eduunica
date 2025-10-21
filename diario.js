// Variáveis globais
let currentDate = new Date();
let entries = [
    { date: '2025-09-06', type: 'conquista', title: 'Memória Sensorial', description: 'Completei todos os níveis do jogo de memória sensorial. Consegui melhorar meu tempo de resposta em 30%!', medal: 'gold' },
    { date: '2025-09-08', type: 'atividade', title: 'Exercícios de Comunicação Visual', description: 'Praticar os exercícios de comunicação visual por pelo menos 20 minutos.' },
    { date: '2025-09-10', type: 'conquista', title: 'Comunicação Visual', description: 'Consegui identificar 15 de 20 expressões faciais corretamente no jogo de comunicação visual.', medal: 'silver' },
    { date: '2025-09-12', type: 'atividade', title: 'Jogo de Memória', description: 'Completar o nível 3 do jogo de memória sensorial.' }
];

// Adicionar entradas para o mês atual
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
const currentDay = String(today.getDate()).padStart(2, '0');

// Adiciona entrada para hoje
entries.push({
    date: `${currentYear}-${currentMonth}-${currentDay}`,
    type: 'conquista', 
    title: 'Dia Atual',
    description: 'Esta é uma entrada do dia de hoje!',
    medal: 'bronze'
});

// Carregar entradas do localStorage
const savedEntries = localStorage.getItem('diaryEntries');
if (savedEntries) {
    try {
        const parsedEntries = JSON.parse(savedEntries);
        entries = [...entries, ...parsedEntries];
    } catch (e) {
        console.error('Erro ao carregar entradas do localStorage:', e);
    }
}

// FUNÇÃO RENDER CALENDÁRIO - CORRIGIDA
function renderCalendar() {
    console.log('=== RENDERIZANDO CALENDÁRIO ===');
    
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('currentMonth');
    
    if (!calendar) {
        console.error('Elemento calendar não encontrado!');
        return;
    }
    
    if (!monthYear) {
        console.error('Elemento currentMonth não encontrado!');
        return;
    }
    
    console.log('Calendar element:', calendar);
    console.log('MonthYear element:', monthYear);
    
    // Limpa apenas os dias (mantém os 7 primeiros - dias da semana)
    while (calendar.children.length > 7) {
        calendar.removeChild(calendar.lastChild);
    }
    
    // Atualiza o cabeçalho
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Obtém primeiro e último dia do mês
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const startingDay = firstDay.getDay(); // 0 = Domingo
    
    console.log('First day:', firstDay);
    console.log('Last day:', lastDay);
    console.log('Starting day (0=Domingo):', startingDay);
    console.log('Total days in month:', lastDay.getDate());
    
    // Dias vazios do mês anterior
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        emptyDay.textContent = '';
        calendar.appendChild(emptyDay);
    }
    
    // Dias do mês atual
    const todayObj = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        // Formata data para comparação
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        // Verifica se há entradas
        const dayEntries = entries.filter(entry => entry.date === dateStr);
        
        if (dayEntries.length > 0) {
            day.classList.add('has-entries');
            day.title = `${dayEntries.length} entrada(s)`;
            
            day.addEventListener('click', function() {
                showDayEntries(dateStr, dayEntries);
            });
        }
        
        // Marca dia atual
        if (currentDate.getMonth() === todayObj.getMonth() && 
            currentDate.getFullYear() === todayObj.getFullYear() && 
            i === todayObj.getDate()) {
            day.classList.add('today');
        }
        
        calendar.appendChild(day);
    }
    
    console.log('Calendário renderizado com sucesso!');
    console.log('Total de elementos no calendário:', calendar.children.length);
}

// Funções de navegação
function previousMonth() {
    console.log('Mês anterior...');
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    console.log('Próximo mês...');
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Configuração do modal
function setupModal() {
    const modal = document.getElementById('entryModal');
    const btnAddEntry = document.getElementById('btnAddEntry');
    
    if (!modal || !btnAddEntry) {
        console.error('Modal ou botão não encontrado!');
        return;
    }
    
    btnAddEntry.addEventListener('click', function() {
        modal.style.display = 'block';
        const today = new Date();
        document.getElementById('entryDate').value = today.toISOString().split('T')[0];
    });
    
    // Fechar modal
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    document.querySelector('.btn-cancel').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Mostrar/ocultar medalhas
    document.getElementById('entryType').addEventListener('change', function() {
        const medalSelection = document.getElementById('medalSelection');
        medalSelection.style.display = this.value === 'conquista' ? 'block' : 'none';
    });
}

// Configuração do formulário
function setupEntryForm() {
    const form = document.getElementById('entryForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('entryDate').value;
        const type = document.getElementById('entryType').value;
        const title = document.getElementById('entryTitle').value;
        const description = document.getElementById('entryDescription').value;
        let medal = null;
        
        if (type === 'conquista') {
            const selectedMedal = document.querySelector('input[name="medal"]:checked');
            medal = selectedMedal ? selectedMedal.value : null;
        }
        
        // Adiciona nova entrada
        entries.push({ date, type, title, description, medal });
        
        // Salva no localStorage
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        
        // Fecha modal e atualiza
        document.getElementById('entryModal').style.display = 'none';
        renderCalendar();
        form.reset();
        
        // Recarrega para mostrar nova entrada
        location.reload();
    });
}

// Função para mostrar entradas do dia
function showDayEntries(dateStr, dayEntries) {
    const dateParts = dateStr.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    const modal = document.createElement('div');
    modal.className = 'modal day-entries-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h4>Entradas do dia ${formattedDate}</h4>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                ${dayEntries.map(entry => `
                    <div class="day-entry ${entry.type}">
                        <div class="entry-header">
                            <h5>${entry.title}</h5>
                            ${entry.type === 'conquista' ? `<i class="fas fa-medal ${entry.medal}"></i>` : ''}
                        </div>
                        <p>${entry.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO DIÁRIO DE BORDO ===');
    
    // Renderiza calendário
    renderCalendar();
    
    // Configura botões de navegação
    document.getElementById('prevMonth').addEventListener('click', previousMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
    
    // Configura modal e formulário
    setupModal();
    setupEntryForm();
    
    console.log('Diário inicializado com sucesso!');
});

// MEU PROGRESSO 
// Interações do Progresso
function initProgressInteractions() {
    console.log('Inicializando interações de progresso...');
    
    // Animação das barras de progresso
    animateProgressBars();
    
    // Interação com medalhas
    initMedalInteractions();
    
    // Efeitos hover nos cards
    initCardInteractions();
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

function initMedalInteractions() {
    const medalItems = document.querySelectorAll('.medal-item.earned');
    medalItems.forEach(medal => {
        medal.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        medal.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        medal.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initCardInteractions() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
}

// Simulação de dados dinâmicos
function updateProgressData() {
    // Simular atualização de dados
    setInterval(() => {
        const scoreElement = document.getElementById('userScore');
        const currentScore = parseInt(scoreElement.textContent.replace(',', ''));
        scoreElement.textContent = (currentScore + 10).toLocaleString();
    }, 5000);
}

// Adicione esta linha na função DOMContentLoaded do diario.js:
// initProgressInteractions();
// updateProgressData();
// Interações simples para o progresso
function initProgressFeatures() {
    // Animar barras de progresso ao carregar
    const progressFills = document.querySelectorAll('.progress-fill, .day-fill');
    progressFills.forEach(fill => {
        const originalHeight = fill.style.height;
        const originalWidth = fill.style.width;
        fill.style.height = '0%';
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.height = originalHeight;
            fill.style.width = originalWidth;
        }, 300);
    });
    
    // Efeito hover nas medalhas
    const medalItems = document.querySelectorAll('.medal-item.earned');
    medalItems.forEach(medal => {
        medal.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });
        
        medal.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Efeito hover nos cards de estatísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initProgressFeatures, 500);
});