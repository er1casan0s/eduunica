// Sistema de Jogos EduÚnica
let currentGame = null;
let gameScore = 0;
let gameTime = 0;
let gameTimer = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initGames();
});

function initGames() {
    // Filtros de categoria
    const categoryButtons = document.querySelectorAll('.category-btn');
    const gameWidgets = document.querySelectorAll('.game-widget');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Atualiza botão ativo
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtra jogos
            gameWidgets.forEach(widget => {
                if (category === 'all' || widget.getAttribute('data-category') === category) {
                    widget.style.display = 'flex';
                } else {
                    widget.style.display = 'none';
                }
            });
        });
    });
}

// Funções Principais
function loadGame(gameType) {
    currentGame = gameType;
    gameScore = 0;
    gameTime = 0;
    
    const activeGameContainer = document.getElementById('activeGameContainer');
    const gamesGrid = document.getElementById('gamesGrid');
    const gameArea = document.getElementById('gameArea');
    const gameStats = document.getElementById('gameStats');
    
    gamesGrid.style.display = 'none';
    activeGameContainer.style.display = 'block';
    gameArea.innerHTML = '';
    gameStats.innerHTML = '';
    
    // Inicia timer
    startGameTimer();
    
    // Carrega jogo específico
    switch(gameType) {
        case 'memory': loadMemoryGame(); break;
        case 'puzzle': loadPuzzleGame(); break;
        case 'sorting': loadSortingGame(); break;
        case 'matching': loadMatchingGame(); break;
        case 'addition': loadAdditionGame(); break;
        case 'shapes': loadShapesGame(); break;
        case 'sounds': loadSoundsGame(); break;
        case 'wordbuilder': loadWordBuilderGame(); break;
        case 'compare': loadCompareGame(); break;
        case 'rhythm': loadRhythmGame(); break;
        case 'patterns': loadPatternsGame(); break;
        case 'position': loadPositionGame(); break;
        case 'ordering': loadOrderingGame(); break;
        case 'letters': loadLettersGame(); break;
        case 'textures': loadTexturesGame(); break;
        case 'slidingpuzzle': loadSlidingPuzzleGame(); break;
        case 'measurement': loadMeasurementGame(); break;
        case 'sequence': loadSequenceGame(); break;
        case 'stories': loadStoriesGame(); break;
        case 'colors': loadColorsGame(); break;
        case 'sudoku':loadSudokuGame(); break;
        case 'tictactoe': loadTicTacToeGame(); break;
        case 'crossword': loadCrosswordGame(); break;
        case 'detective':loadDetectiveGame(); break;
    }
    
    updateStats();
}

function backToGames() {
    const activeGameContainer = document.getElementById('activeGameContainer');
    const gamesGrid = document.getElementById('gamesGrid');
    
    activeGameContainer.style.display = 'none';
    gamesGrid.style.display = 'grid';
    
    // Para o timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function startGameTimer() {
    gameTime = 0;
    gameTimer = setInterval(() => {
        gameTime++;
        updateStats();
    }, 1000);
}

function updateStats() {
    const gameStats = document.getElementById('gameStats');
    gameStats.innerHTML = `
        <div class="stat">
            <div class="stat-value">${gameScore}</div>
            <div class="stat-label">Pontos</div>
        </div>
        <div class="stat">
            <div class="stat-value">${gameTime}s</div>
            <div class="stat-label">Tempo</div>
        </div>
        <div class="stat">
            <div class="stat-value">${currentGame}</div>
            <div class="stat-label">Jogo</div>
        </div>
    `;
}

function addScore(points) {
    gameScore += points;
    updateStats();
}

//COMEÇO DOS JOGOS
// Jogo 1: Memória Visual
function loadMemoryGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Memória Visual';
    gameInstructions.textContent = 'Encontre todos os pares de cartas correspondentes. Clique em duas cartas para virá-las.';
    
    const memoryGame = document.createElement('div');
    memoryGame.className = 'memory-game';
    
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🥝', '🍉'];
    let cards = [...symbols, ...symbols];
    cards = cards.sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-symbol', symbol);
        card.textContent = '?';
        
        card.addEventListener('click', function() {
            if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) return;
            
            this.textContent = symbol;
            this.classList.add('flipped');
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                const [card1, card2] = flippedCards;
                
                if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    addScore(10);
                    
                    if (matchedPairs === symbols.length) {
                        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
                    }
                } else {
                    setTimeout(() => {
                        card1.textContent = '?';
                        card2.textContent = '?';
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }, 1000);
                }
                flippedCards = [];
            }
        });
        
        memoryGame.appendChild(card);
    });
    
    gameArea.appendChild(memoryGame);
}

// Jogo 2: Quebra-Cabeça Numérico (Versão Funcional)
function loadPuzzleGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Quebra-Cabeça Numérico';
    gameInstructions.textContent = 'Organize os números em ordem crescente de 1 a 8. Clique nos números adjacentes ao espaço vazio para movê-los.';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Cria o container do puzzle
    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'puzzle-game-container';
    
    // Array com os números de 1 a 8 + espaço vazio
    let puzzlePieces = [1, 2, 3, 4, 5, 6, 7, 8, null];
    
    // Embaralha o puzzle (garante que seja solucionável)
    shufflePuzzle(puzzlePieces);
    
    // Cria o grid do puzzle
    const puzzleGrid = document.createElement('div');
    puzzleGrid.className = 'puzzle-grid';
    puzzleGrid.id = 'puzzleGrid';
    
    // Cria as peças do puzzle
    puzzlePieces.forEach((piece, index) => {
        const puzzlePiece = document.createElement('div');
        
        if (piece === null) {
            // Espaço vazio
            puzzlePiece.className = 'puzzle-piece empty';
            puzzlePiece.setAttribute('data-index', index);
            puzzlePiece.setAttribute('data-value', 'empty');
        } else {
            // Peça com número
            puzzlePiece.className = 'puzzle-piece';
            puzzlePiece.textContent = piece;
            puzzlePiece.setAttribute('data-index', index);
            puzzlePiece.setAttribute('data-value', piece);
            puzzlePiece.onclick = () => movePuzzlePiece(index);
        }
        
        puzzleGrid.appendChild(puzzlePiece);
    });
    
    // Contador de movimentos
    const movesCounter = document.createElement('div');
    movesCounter.className = 'puzzle-moves';
    movesCounter.innerHTML = 'Movimentos: <span id="moveCount">0</span>';
    
    // Botão de reiniciar
    const restartButton = document.createElement('button');
    restartButton.className = 'game-button';
    restartButton.textContent = 'Embaralhar Novamente';
    restartButton.onclick = loadPuzzleGame;
    
    // Botão de resolver (dica)
    const solveButton = document.createElement('button');
    solveButton.className = 'game-button secondary';
    solveButton.textContent = 'Ver Solução';
    solveButton.onclick = showSolution;
    
    // Área de controles
    const controlsArea = document.createElement('div');
    controlsArea.className = 'puzzle-controls';
    controlsArea.appendChild(movesCounter);
    controlsArea.appendChild(restartButton);
    controlsArea.appendChild(solveButton);
    
    // Monta o jogo completo
    puzzleContainer.appendChild(puzzleGrid);
    puzzleContainer.appendChild(controlsArea);
    gameArea.appendChild(puzzleContainer);
    
    // Variáveis de controle do jogo
    let moveCount = 0;
    const emptyIndex = puzzlePieces.indexOf(null);
    
    // Função para embaralhar o puzzle (garante que seja solucionável)
    function shufflePuzzle(pieces) {
        do {
            // Embaralha usando o algoritmo de Fisher-Yates
            for (let i = pieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
            }
        } while (!isSolvable(pieces) || isSolved(pieces));
    }
    
    // Função para verificar se o puzzle é solucionável
    function isSolvable(pieces) {
        // Para um puzzle 3x3, é solucionável se o número de inversões for par
        const numbers = pieces.filter(piece => piece !== null);
        let inversions = 0;
        
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] > numbers[j]) {
                    inversions++;
                }
            }
        }
        
        return inversions % 2 === 0;
    }
    
    // Função para verificar se o puzzle está resolvido
    function isSolved(pieces) {
        for (let i = 0; i < pieces.length - 1; i++) {
            if (pieces[i] !== i + 1) {
                return false;
            }
        }
        return pieces[8] === null;
    }
    
    // Função para mover uma peça
    function movePuzzlePiece(clickedIndex) {
        const emptyIndex = getEmptyIndex();
        
        // Verifica se a peça clicada é adjacente ao espaço vazio
        if (isAdjacent(clickedIndex, emptyIndex)) {
            // Troca as posições
            swapPieces(clickedIndex, emptyIndex);
            
            // Atualiza contador
            moveCount++;
            document.getElementById('moveCount').textContent = moveCount;
            addScore(1);
            
            // Verifica se o puzzle foi resolvido
            if (checkPuzzleSolved()) {
                setTimeout(() => {
                    const bonus = Math.max(50 - moveCount, 10);
                    addScore(bonus);
                    alert(`Parabéns! Você resolveu o puzzle em ${moveCount} movimentos! +${bonus} pontos bônus!`);
                }, 500);
            }
        } else {
            // Feedback visual para movimento inválido
            const piece = document.querySelector(`.puzzle-piece[data-index="${clickedIndex}"]:not(.empty)`);
            if (piece) {
                piece.classList.add('invalid-move');
                setTimeout(() => piece.classList.remove('invalid-move'), 500);
            }
        }
    }
    
    // Função para obter o índice do espaço vazio
    function getEmptyIndex() {
        const emptyPiece = document.querySelector('.puzzle-piece.empty');
        return parseInt(emptyPiece.getAttribute('data-index'));
    }
    
    // Função para verificar se duas posições são adjacentes
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;
        
        // Verifica se estão na mesma linha e colunas adjacentes
        // OU na mesma coluna e linhas adjacentes
        return (row1 === row2 && Math.abs(col1 - col2) === 1) ||
               (col1 === col2 && Math.abs(row1 - row2) === 1);
    }
    
    // Função para trocar duas peças de posição
    function swapPieces(index1, index2) {
        const piece1 = document.querySelector(`.puzzle-piece[data-index="${index1}"]`);
        const piece2 = document.querySelector(`.puzzle-piece[data-index="${index2}"]`);
        
        // Troca os atributos data-index
        const tempIndex = piece1.getAttribute('data-index');
        piece1.setAttribute('data-index', piece2.getAttribute('data-index'));
        piece2.setAttribute('data-index', tempIndex);
        
        // Troca as posições no DOM
        const parent = piece1.parentNode;
        const temp = document.createTextNode('');
        parent.insertBefore(temp, piece1);
        parent.insertBefore(piece1, piece2);
        parent.insertBefore(piece2, temp);
        parent.removeChild(temp);
    }
    
    // Função para verificar se o puzzle está resolvido
    function checkPuzzleSolved() {
        const pieces = Array.from(document.querySelectorAll('.puzzle-piece:not(.empty)'));
        
        for (let i = 0; i < pieces.length; i++) {
            const value = parseInt(pieces[i].getAttribute('data-value'));
            if (value !== i + 1) {
                return false;
            }
        }
        return true;
    }
    
    // Função para mostrar a solução (apenas para demonstração)
    function showSolution() {
        alert('Solução: Organize os números na ordem 1-8 da esquerda para a direita, de cima para baixo, com o espaço vazio no canto inferior direito.\n\nDica: Comece resolvendo a primeira linha (1-2-3), depois a segunda (4-5-6) e finalmente a terceira (7-8).');
        addScore(-5); // Penalidade por usar dica
    }
}

// Jogo 3: Classificação por Cores (Versão Corrigida)
function loadSortingGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Classificação por Cores';
    gameInstructions.textContent = 'Arraste os objetos para as caixas da cor correspondente. Solte o objeto na caixa correta para ganhar pontos!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Cria o container principal do jogo
    const sortingGame = document.createElement('div');
    sortingGame.className = 'sorting-game-container';
    
    // Array de frutas com suas cores correspondentes
    const fruits = [
        { name: '🍎', color: 'red', colorName: 'Vermelho' },
        { name: '🍌', color: 'yellow', colorName: 'Amarelo' },
        { name: '🍇', color: 'purple', colorName: 'Roxo' },
        { name: '🍊', color: 'orange', colorName: 'Laranja' },
        { name: '🍓', color: 'red', colorName: 'Vermelho' },
        { name: '🍋', color: 'yellow', colorName: 'Amarelo' },
        { name: '🫐', color: 'purple', colorName: 'Roxo' },
        { name: '🥕', color: 'orange', colorName: 'Laranja' }
    ];
    
    // Embaralha as frutas
    const shuffledFruits = [...fruits].sort(() => Math.random() - 0.5);
    
    // Cria a área das frutas (área de origem)
    const fruitsArea = document.createElement('div');
    fruitsArea.className = 'fruits-area';
    fruitsArea.innerHTML = '<h4>Arraste as frutas:</h4>';
    
    // Cria cada fruta como elemento arrastável
    shuffledFruits.forEach((fruit, index) => {
        const fruitElement = document.createElement('div');
        fruitElement.className = 'draggable-fruit';
        fruitElement.textContent = fruit.name;
        fruitElement.setAttribute('draggable', 'true');
        fruitElement.setAttribute('data-color', fruit.color);
        fruitElement.setAttribute('data-index', index);
        fruitElement.setAttribute('id', `fruit-${index}`);
        
        // Adiciona eventos de drag CORRETAMENTE
        fruitElement.addEventListener('dragstart', handleDragStart);
        fruitElement.addEventListener('dragend', handleDragEnd);
        
        fruitsArea.appendChild(fruitElement);
    });
    
    // Cria a área das caixas de cores (área de destino)
    const boxesArea = document.createElement('div');
    boxesArea.className = 'boxes-area';
    boxesArea.innerHTML = '<h4>Solte nas caixas corretas:</h4>';
    
    // Cores disponíveis
    const colors = [
        { name: 'red', displayName: 'Vermelho', code: '#ff5252' },
        { name: 'yellow', displayName: 'Amarelo', code: '#ffeb3b' },
        { name: 'purple', displayName: 'Roxo', code: '#9c27b0' },
        { name: 'orange', displayName: 'Laranja', code: '#ff9800' }
    ];
    
    // Cria as caixas de cores
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.setAttribute('data-color', color.name);
        colorBox.style.backgroundColor = color.code;
        
        // Adiciona label com o nome da cor
        const colorLabel = document.createElement('div');
        colorLabel.className = 'color-label';
        colorLabel.textContent = color.displayName;
        colorLabel.style.color = color.name === 'yellow' ? '#333' : 'white';
        
        // Adiciona área de drop
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.setAttribute('data-color', color.name);
        dropZone.setAttribute('id', `drop-${color.name}`);
        
        // Adiciona eventos de drop CORRETAMENTE
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        
        colorBox.appendChild(colorLabel);
        colorBox.appendChild(dropZone);
        boxesArea.appendChild(colorBox);
    });
    
    // Adiciona contador de acertos
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'sorting-score';
    scoreDisplay.innerHTML = `<p>Acertos: <span id="sortingScore">0</span> / ${fruits.length}</p>`;
    
    // Botão de reiniciar
    const restartButton = document.createElement('button');
    restartButton.className = 'game-button';
    restartButton.textContent = 'Reiniciar Jogo';
    restartButton.onclick = loadSortingGame;
    
    // Monta o jogo completo
    sortingGame.appendChild(fruitsArea);
    sortingGame.appendChild(boxesArea);
    sortingGame.appendChild(scoreDisplay);
    sortingGame.appendChild(restartButton);
    
    gameArea.appendChild(sortingGame);
    
    // Variáveis para controle do estado do jogo
    let draggedFruit = null;
    let correctMatches = 0;
    
    // CORREÇÃO: Função chamada quando o drag inicia
    function handleDragStart(e) {
        draggedFruit = this;
        e.dataTransfer.setData('text/plain', this.id);
        this.classList.add('dragging');
        
        // Define o efeito de drag (copy para mover uma cópia)
        e.dataTransfer.effectAllowed = 'copy';
        
        // Adiciona um delay para melhor visualização
        setTimeout(() => {
            this.style.opacity = '0.4';
        }, 0);
    }
    
    // NOVA FUNÇÃO: Chamada quando o drag termina
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        this.style.opacity = '1';
        
        // Remove todas as classes drag-over das zonas de drop
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
    }
    
    // CORREÇÃO: Função chamada quando um elemento é arrastado sobre uma zona de drop
    function handleDragOver(e) {
        e.preventDefault(); // Permite o drop
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }
    
    // CORREÇÃO: Função chamada quando um elemento entra na zona de drop
    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }
    
    // CORREÇÃO: Função chamada quando um elemento sai da zona de drop
    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }
    
    // CORREÇÃO: Função chamada quando um elemento é solto na zona de drop
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.remove('drag-over');
        
        if (!draggedFruit) return;
        
        const fruitColor = draggedFruit.getAttribute('data-color');
        const boxColor = this.getAttribute('data-color');
        
        // Verifica se a cor corresponde
        if (fruitColor === boxColor) {
            // CORREÇÃO: Cria uma nova fruta na caixa em vez de mover a original
            const newFruit = document.createElement('div');
            newFruit.className = 'dropped-fruit';
            newFruit.textContent = draggedFruit.textContent;
            newFruit.style.fontSize = '2.5rem';
            newFruit.style.margin = '5px';
            
            this.appendChild(newFruit);
            
            // Marca a fruta original como classificada
            draggedFruit.classList.add('matched');
            draggedFruit.setAttribute('draggable', 'false');
            draggedFruit.style.opacity = '0.5';
            draggedFruit.style.cursor = 'default';
            
            // Atualiza pontuação
            correctMatches++;
            document.getElementById('sortingScore').textContent = correctMatches;
            addScore(5);
            
            // Feedback visual de acerto
            this.classList.add('correct-drop');
            setTimeout(() => {
                this.classList.remove('correct-drop');
            }, 1000);
            
            // Verifica se o jogo terminou
            if (correctMatches === fruits.length) {
                setTimeout(() => {
                    alert('Parabéns! Você classificou todas as frutas corretamente! +20 pontos bônus!');
                    addScore(20);
                }, 500);
            }
        } else {
            // Erro - destaca visualmente o erro
            this.classList.add('incorrect-drop');
            setTimeout(() => {
                this.classList.remove('incorrect-drop');
            }, 1000);
            
            // Feedback de erro
            draggedFruit.classList.add('incorrect-move');
            setTimeout(() => {
                draggedFruit.classList.remove('incorrect-move');
            }, 1000);
        }
        
        draggedFruit = null;
    }
    
    // Adiciona evento para prevenir comportamento padrão do drag
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
    });
}
// Jogo 4: Correspondência de Palavras (Versão Corrigida com Emojis)
function loadMatchingGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Correspondência de Palavras';
    gameInstructions.textContent = 'Combine cada palavra com a imagem correspondente. Clique nas opções para fazer a correspondência. Encontre todos os pares!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Array de pares palavra-emoji (AUMENTADO com mais opções)
    const pairs = [
        { word: 'CASA', emoji: '🏠', category: 'objetos' },
        { word: 'CARRO', emoji: '🚗', category: 'transporte' },
        { word: 'ÁRVORE', emoji: '🌳', category: 'natureza' },
        { word: 'SOL', emoji: '☀️', category: 'natureza' },
        { word: 'GATO', emoji: '🐱', category: 'animais' },
        { word: 'BOLA', emoji: '⚽', category: 'esportes' },
        { word: 'CHUVA', emoji: '🌧️', category: 'clima' },
        { word: 'LIVRO', emoji: '📚', category: 'objetos' },
        { word: 'CORACAO', emoji: '❤️', category: 'símbolos' },
        { word: 'COMPUTADOR', emoji: '💻', category: 'tecnologia' }
    ];
    
    // Embaralha os pares
    const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);
    
    // Cria o container do jogo
    const matchingGame = document.createElement('div');
    matchingGame.className = 'matching-game-container';
    
    // Cria instruções visuais
    const visualInstructions = document.createElement('div');
    visualInstructions.className = 'matching-instructions';
    visualInstructions.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 15px;">
                <strong>Como jogar:</strong> Clique em uma palavra e depois no emoji correspondente
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">🏠</div>
                    <div style="font-size: 0.9rem; color: #666;">= CASA</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">🚗</div>
                    <div style="font-size: 0.9rem; color: #666;">= CARRO</div>
                </div>
            </div>
        </div>
    `;
    matchingGame.appendChild(visualInstructions);
    
    // Cria área das palavras
    const wordsArea = document.createElement('div');
    wordsArea.className = 'matching-words-area';
    wordsArea.innerHTML = '<h4>Palavras:</h4>';
    
    // Cria área dos emojis
    const emojisArea = document.createElement('div');
    emojisArea.className = 'matching-emojis-area';
    emojisArea.innerHTML = '<h4>Imagens:</h4>';
    
    // Cria os elementos de palavras e emojis
    const wordElements = [];
    const emojiElements = [];
    
    shuffledPairs.forEach((pair, index) => {
        // Cria elemento de palavra
        const wordElement = document.createElement('div');
        wordElement.className = 'matching-word';
        wordElement.textContent = pair.word;
        wordElement.setAttribute('data-word', pair.word);
        wordElement.setAttribute('data-emoji', pair.emoji);
        wordElement.setAttribute('data-index', index);
        wordElements.push(wordElement);
        
        // Cria elemento de emoji
        const emojiElement = document.createElement('div');
        emojiElement.className = 'matching-emoji';
        emojiElement.innerHTML = `<span class="emoji-display">${pair.emoji}</span>`;
        emojiElement.setAttribute('data-word', pair.word);
        emojiElement.setAttribute('data-emoji', pair.emoji);
        emojiElement.setAttribute('data-index', index);
        emojiElements.push(emojiElement);
    });
    
    // Embaralha os emojis separadamente
    emojiElements.sort(() => Math.random() - 0.5);
    
    // Adiciona elementos às áreas
    wordElements.forEach(element => wordsArea.appendChild(element));
    emojiElements.forEach(element => emojisArea.appendChild(element));
    
    // Adiciona áreas ao container
    matchingGame.appendChild(wordsArea);
    matchingGame.appendChild(emojisArea);
    
    // Cria contador de acertos
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'matching-score';
    scoreDisplay.innerHTML = `<p>Pares encontrados: <span id="matchingScore">0</span> / ${pairs.length}</p>`;
    
    // Botão de reiniciar
    const restartButton = document.createElement('button');
    restartButton.className = 'game-button';
    restartButton.textContent = 'Novo Jogo';
    restartButton.onclick = loadMatchingGame;
    
    // Área de controles
    const controlsArea = document.createElement('div');
    controlsArea.className = 'matching-controls';
    controlsArea.appendChild(scoreDisplay);
    controlsArea.appendChild(restartButton);
    
    matchingGame.appendChild(controlsArea);
    gameArea.appendChild(matchingGame);
    
    // Variáveis de controle do jogo
    let selectedWord = null;
    let selectedEmoji = null;
    let matchedPairs = 0;
    let attempts = 0;
    
    // Adiciona eventos aos elementos de palavra
    wordElements.forEach(wordElement => {
        wordElement.addEventListener('click', handleWordClick);
    });
    
    // Adiciona eventos aos elementos de emoji
    emojiElements.forEach(emojiElement => {
        emojiElement.addEventListener('click', handleEmojiClick);
    });
    
    // Função para clique em palavra
    function handleWordClick() {
        // Se já está selecionada ou combinada, ignora
        if (this.classList.contains('selected') || this.classList.contains('matched')) {
            return;
        }
        
        // Remove seleção anterior
        document.querySelectorAll('.matching-word.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Seleciona esta palavra
        this.classList.add('selected');
        selectedWord = this;
        
        // Verifica se já tem um emoji selecionado
        if (selectedEmoji) {
            checkMatch();
        }
    }
    
    // Função para clique em emoji
    function handleEmojiClick() {
        // Se já está selecionado ou combinado, ignora
        if (this.classList.contains('selected') || this.classList.contains('matched')) {
            return;
        }
        
        // Remove seleção anterior
        document.querySelectorAll('.matching-emoji.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Seleciona este emoji
        this.classList.add('selected');
        selectedEmoji = this;
        
        // Verifica se já tem uma palavra selecionada
        if (selectedWord) {
            checkMatch();
        }
    }
    
    // Função para verificar se há correspondência
    function checkMatch() {
        if (!selectedWord || !selectedEmoji) return;
        
        attempts++;
        
        const wordData = selectedWord.getAttribute('data-word');
        const emojiData = selectedEmoji.getAttribute('data-word');
        
        if (wordData === emojiData) {
            // CORRESPONDÊNCIA CORRETA
            selectedWord.classList.add('matched');
            selectedEmoji.classList.add('matched');
            selectedWord.classList.remove('selected');
            selectedEmoji.classList.remove('selected');
            
            // Adiciona feedback visual
            selectedWord.style.order = matchedPairs + 1;
            selectedEmoji.style.order = matchedPairs + 1;
            
            // Atualiza pontuação
            matchedPairs++;
            document.getElementById('matchingScore').textContent = matchedPairs;
            
            // Calcula pontos baseados na eficiência
            const points = Math.max(15 - attempts, 5);
            addScore(points);
            
            // Feedback de acerto
            showFeedback('Correto! +' + points + ' pontos', 'correct');
            
            // Verifica se o jogo terminou
            if (matchedPairs === pairs.length) {
                setTimeout(() => {
                    const bonus = Math.max(50 - attempts, 20);
                    addScore(bonus);
                    showFeedback(`Parabéns! Você completou o jogo em ${attempts} tentativas! +${bonus} pontos bônus!`, 'victory');
                }, 1000);
            }
            
            selectedWord = null;
            selectedEmoji = null;
        } else {
            // CORRESPONDÊNCIA INCORRETA
            showFeedback('Tente novamente!', 'incorrect');
            
            // Remove seleção após um tempo
            setTimeout(() => {
                selectedWord.classList.remove('selected');
                selectedEmoji.classList.remove('selected');
                selectedWord = null;
                selectedEmoji = null;
            }, 1000);
        }
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.matching-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `matching-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes dos controles
        controlsArea.insertBefore(feedback, scoreDisplay);
        
        // Remove após 2 segundos
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
}


// Jogo 5: Soma Rápida (Versão Corrigida com Progressão de Dificuldade)
function loadAdditionGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Soma Rápida';
    gameInstructions.textContent = 'Resolva as operações de adição selecionando a resposta correta. A dificuldade aumenta a cada 10 acertos!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Variáveis de estado do jogo
    let correctAnswers = 0;
    let currentLevel = 1;
    let maxNumber = 10; // Começa com números até 10
    
    // Cria o container do jogo
    const mathGame = document.createElement('div');
    mathGame.className = 'math-game-container';
    
    // Cria display de progresso
    const progressDisplay = document.createElement('div');
    progressDisplay.className = 'math-progress';
    progressDisplay.innerHTML = `
        <div class="progress-info">
            <span>Nível: <strong id="currentLevel">${currentLevel}</strong></span>
            <span>Acertos: <strong id="correctCount">${correctAnswers}</strong>/10</span>
            <span>Próximo nível em: <strong id="nextLevel">${10 - correctAnswers}</strong></span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: ${(correctAnswers / 10) * 100}%"></div>
        </div>
    `;
    
    // Cria área do problema matemático
    const problemArea = document.createElement('div');
    problemArea.className = 'math-problem-area';
    
    // Cria área das opções
    const optionsArea = document.createElement('div');
    optionsArea.className = 'math-options-area';
    optionsArea.id = 'mathOptionsArea';
    
    // Monta o jogo
    mathGame.appendChild(progressDisplay);
    mathGame.appendChild(problemArea);
    mathGame.appendChild(optionsArea);
    gameArea.appendChild(mathGame);
    
    // Gera o primeiro problema
    generateNewProblem();
    
    // Função para gerar um novo problema matemático
    function generateNewProblem() {
        // Limpa o problema anterior
        problemArea.innerHTML = '';
        optionsArea.innerHTML = '';
        
        // Gera números aleatórios baseado no nível atual
        const num1 = generateRandomNumber(maxNumber);
        const num2 = generateRandomNumber(maxNumber);
        const correctAnswer = num1 + num2;
        
        // Cria o display do problema
        const problemDisplay = document.createElement('div');
        problemDisplay.className = 'math-problem-display';
        problemDisplay.innerHTML = `
            <div class="problem-numbers">
                <span class="number">${num1}</span>
                <span class="operator">+</span>
                <span class="number">${num2}</span>
                <span class="equals">=</span>
                <span class="question">?</span>
            </div>
        `;
        
        // Gera opções de resposta
        const options = generateOptions(correctAnswer, maxNumber);
        
        // Cria as opções
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'math-option';
            optionElement.textContent = option;
            optionElement.setAttribute('data-value', option);
            
            optionElement.addEventListener('click', function() {
                handleAnswer(parseInt(option), correctAnswer, num1, num2);
            });
            
            optionsArea.appendChild(optionElement);
        });
        
        problemArea.appendChild(problemDisplay);
    }
    
    // Função para gerar números aleatórios
    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }
    
    // Função para gerar opções de resposta
    function generateOptions(correctAnswer, maxNumber) {
        const options = [correctAnswer];
        
        // Gera opções incorretas baseadas na dificuldade
        while (options.length < 4) {
            // Variação baseada no nível - opções mais próximas em níveis mais altos
            const variation = Math.floor(maxNumber / 3) + 1;
            const wrongAnswer = correctAnswer + (Math.floor(Math.random() * variation * 2) - variation);
            
            // Garante que a resposta errada seja positiva e diferente das outras
            if (wrongAnswer > 0 && 
                wrongAnswer !== correctAnswer && 
                !options.includes(wrongAnswer) &&
                wrongAnswer <= maxNumber * 2) {
                options.push(wrongAnswer);
            }
        }
        
        // Embaralha as opções
        return options.sort(() => Math.random() - 0.5);
    }
    
    // Função para processar a resposta
    function handleAnswer(selectedAnswer, correctAnswer, num1, num2) {
        const options = document.querySelectorAll('.math-option');
        
        // Desabilita todos os botões durante o feedback
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        if (selectedAnswer === correctAnswer) {
            // RESPOSTA CORRETA
            correctAnswers++;
            
            // Encontra e destaca a opção correta
            options.forEach(option => {
                if (parseInt(option.getAttribute('data-value')) === correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            // Pontuação baseada no nível (níveis mais altos = mais pontos)
            const points = 5 + (currentLevel * 2);
            addScore(points);
            
            // Feedback visual
            showFeedback(`Correto! ${num1} + ${num2} = ${correctAnswer} (+${points} pontos)`, 'correct');
            
            // Verifica se deve subir de nível
            if (correctAnswers >= 10) {
                currentLevel++;
                correctAnswers = 0;
                maxNumber += 5; // Aumenta a dificuldade
                
                // Atualiza o display de progresso
                updateProgressDisplay();
                
                // Feedback de novo nível
                setTimeout(() => {
                    showFeedback(`🎉 Parabéns! Nível ${currentLevel} alcançado! Números até ${maxNumber}`, 'level-up');
                    setTimeout(generateNewProblem, 2000);
                }, 1500);
            } else {
                // Atualiza o display e gera novo problema
                updateProgressDisplay();
                setTimeout(generateNewProblem, 1500);
            }
            
        } else {
            // RESPOSTA INCORRETA
            // Destaca a opção errada e a correta
            options.forEach(option => {
                const value = parseInt(option.getAttribute('data-value'));
                if (value === selectedAnswer) {
                    option.classList.add('incorrect');
                }
                if (value === correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            showFeedback(`Ops! ${num1} + ${num2} = ${correctAnswer}. Tente a próxima!`, 'incorrect');
            
            // Gera novo problema após um tempo
            setTimeout(generateNewProblem, 2000);
        }
    }
    
    // Função para atualizar o display de progresso
    function updateProgressDisplay() {
        document.getElementById('currentLevel').textContent = currentLevel;
        document.getElementById('correctCount').textContent = correctAnswers;
        document.getElementById('nextLevel').textContent = 10 - correctAnswers;
        
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${(correctAnswers / 10) * 100}%`;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.math-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `math-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes das opções
        optionsArea.parentNode.insertBefore(feedback, optionsArea);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }
}

// Jogo 6: Identificação de Formas (Versão Corrigida com Sistema de Tempo)
function loadShapesGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Identificação de Formas';
    gameInstructions.textContent = 'Encontre a forma geométrica solicitada. A cada 3 acertos, o tempo diminui!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Variáveis de estado do jogo
    let correctAnswers = 0;
    let currentRound = 1;
    let timePerRound = 10000; // 10 segundos inicialmente
    let timer = null;
    let timeLeft = timePerRound;
    
    // Array de formas geométricas expandido
    const shapes = [
        { emoji: '🔺', name: 'Triângulo', category: 'básico' },
        { emoji: '🔵', name: 'Círculo', category: 'básico' },
        { emoji: '◼️', name: 'Quadrado', category: 'básico' },
        { emoji: '❤️', name: 'Coração', category: 'símbolos' },
        { emoji: '⭐', name: 'Estrela', category: 'símbolos' },
        { emoji: '🔶', name: 'Losango', category: 'básico' },
        { emoji: '⬜', name: 'Quadrado Branco', category: 'básico' },
        { emoji: '🔴', name: 'Círculo Vermelho', category: 'básico' },
        { emoji: '🟦', name: 'Quadrado Azul', category: 'básico' },
        { emoji: '🟩', name: 'Quadrado Verde', category: 'básico' },
        { emoji: '🟥', name: 'Quadrado Vermelho', category: 'básico' },
        { emoji: '🟨', name: 'Quadrado Amarelo', category: 'básico' },
        { emoji: '⬛', name: 'Quadrado Preto', category: 'básico' },
        { emoji: '🔷', name: 'Losango Azul', category: 'básico' },
        { emoji: '🟣', name: 'Círculo Roxo', category: 'básico' }
    ];
    
    // Cria o container do jogo
    const shapesGame = document.createElement('div');
    shapesGame.className = 'shapes-game-container';
    
    // Cria display de informações
    const infoDisplay = document.createElement('div');
    infoDisplay.className = 'shapes-info';
    infoDisplay.innerHTML = `
        <div class="shapes-stats">
            <div class="stat">
                <span class="label">Rodada:</span>
                <span class="value" id="currentRound">${currentRound}</span>
            </div>
            <div class="stat">
                <span class="label">Acertos:</span>
                <span class="value" id="correctCount">${correctAnswers}</span>
            </div>
            <div class="stat">
                <span class="label">Próximo nível em:</span>
                <span class="value" id="nextLevel">${3 - (correctAnswers % 3)}</span>
            </div>
        </div>
        <div class="time-display">
            <div class="time-bar">
                <div class="time-fill" id="timeFill" style="width: 100%"></div>
            </div>
            <div class="time-text" id="timeText">${(timeLeft / 1000).toFixed(1)}s</div>
        </div>
    `;
    
    // Cria área da pergunta
    const questionArea = document.createElement('div');
    questionArea.className = 'shapes-question';
    questionArea.id = 'shapesQuestion';
    
    // Crea área das opções
    const optionsArea = document.createElement('div');
    optionsArea.className = 'shapes-options';
    optionsArea.id = 'shapesOptions';
    
    // Monta o jogo
    shapesGame.appendChild(infoDisplay);
    shapesGame.appendChild(questionArea);
    shapesGame.appendChild(optionsArea);
    gameArea.appendChild(shapesGame);
    
    // Inicia o primeiro round
    startNewRound();
    
    // Função para iniciar um novo round
    function startNewRound() {
        // Limpa as áreas
        questionArea.innerHTML = '';
        optionsArea.innerHTML = '';
        
        // Para o timer anterior se existir
        if (timer) {
            clearInterval(timer);
        }
        
        // Reseta o tempo
        timeLeft = timePerRound;
        updateTimeDisplay();
        
        // Seleciona uma forma alvo aleatória
        const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Cria a pergunta
        const questionElement = document.createElement('div');
        questionElement.className = 'question-display';
        questionElement.innerHTML = `
            <div class="question-text">Encontre a forma:</div>
            <div class="target-shape">${targetShape.emoji}</div>
            <div class="shape-name">${targetShape.name}</div>
        `;
        questionArea.appendChild(questionElement);
        
        // Gera opções (incluindo a correta)
        const options = generateOptions(targetShape, 6); // 6 opções por round
        
        // Cria os botões de opção
        options.forEach((shape, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'shape-option';
            optionElement.innerHTML = `<span class="shape-emoji">${shape.emoji}</span>`;
            optionElement.setAttribute('data-shape', shape.name);
            optionElement.setAttribute('data-emoji', shape.emoji);
            
            optionElement.addEventListener('click', function() {
                handleShapeSelection(shape, targetShape);
            });
            
            optionsArea.appendChild(optionElement);
        });
        
        // Inicia o timer
        startTimer();
    }
    
    // Função para gerar opções
    function generateOptions(targetShape, count) {
        const options = [targetShape];
        
        // Adiciona formas aleatórias diferentes da alvo
        while (options.length < count) {
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Garante que não repita formas e seja diferente da alvo
            if (!options.some(shape => shape.emoji === randomShape.emoji) && 
                randomShape.emoji !== targetShape.emoji) {
                options.push(randomShape);
            }
        }
        
        // Embaralha as opções
        return options.sort(() => Math.random() - 0.5);
    }
    
    // Função para iniciar o timer
    function startTimer() {
        const startTime = Date.now();
        const endTime = startTime + timePerRound;
        
        timer = setInterval(() => {
            const now = Date.now();
            timeLeft = Math.max(0, endTime - now);
            
            updateTimeDisplay();
            
            // Tempo esgotado
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 100);
    }
    
    // Função para atualizar o display do tempo
    function updateTimeDisplay() {
        const timeFill = document.getElementById('timeFill');
        const timeText = document.getElementById('timeText');
        
        const percentage = (timeLeft / timePerRound) * 100;
        timeFill.style.width = `${percentage}%`;
        timeText.textContent = `${(timeLeft / 1000).toFixed(1)}s`;
        
        // Muda a cor conforme o tempo diminui
        if (percentage < 30) {
            timeFill.style.background = '#ff6b6b';
        } else if (percentage < 60) {
            timeFill.style.background = '#ffa726';
        } else {
            timeFill.style.background = '#4CAF50';
        }
    }
    
    // Função para processar seleção de forma
    function handleShapeSelection(selectedShape, targetShape) {
        // Para o timer
        clearInterval(timer);
        
        // Desabilita todas as opções
        const allOptions = document.querySelectorAll('.shape-option');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Encontra a opção selecionada
        const selectedOption = Array.from(allOptions).find(option => 
            option.getAttribute('data-emoji') === selectedShape.emoji
        );
        
        if (selectedShape.emoji === targetShape.emoji) {
            // ACERTOU
            correctAnswers++;
            currentRound++;
            
            // Feedback visual de acerto
            selectedOption.classList.add('correct');
            
            // Calcula pontos baseados no tempo restante
            const timeBonus = Math.floor((timeLeft / timePerRound) * 20);
            const basePoints = 10;
            const totalPoints = basePoints + timeBonus;
            
            addScore(totalPoints);
            
            // Feedback
            showFeedback(`🎉 Correto! +${totalPoints} pontos (${timeBonus} bônus de tempo)`, 'correct');
            
            // Verifica se deve diminuir o tempo (a cada 3 acertos)
            if (correctAnswers % 3 === 0) {
                const oldTime = timePerRound;
                timePerRound = Math.max(3000, timePerRound - 1000); // Diminui 1 segundo, mínimo 3 segundos
                
                showFeedback(`⚡ Tempo diminuído! ${oldTime/1000}s → ${timePerRound/1000}s`, 'level-up');
            }
            
            // Atualiza displays
            updateInfoDisplay();
            
            // Próximo round após delay
            setTimeout(startNewRound, 2000);
            
        } else {
            // ERROU
            selectedOption.classList.add('incorrect');
            
            // Mostra qual era a correta
            const correctOption = Array.from(allOptions).find(option => 
                option.getAttribute('data-emoji') === targetShape.emoji
            );
            correctOption.classList.add('correct');
            
            showFeedback(`Ops! A forma correta era ${targetShape.emoji} (${targetShape.name})`, 'incorrect');
            
            // Próximo round após delay
            setTimeout(startNewRound, 2500);
        }
    }
    
    // Função para tempo esgotado
    function handleTimeOut() {
        const allOptions = document.querySelectorAll('.shape-option');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Mostra a resposta correta
        const targetEmoji = document.querySelector('.target-shape').textContent;
        const correctOption = Array.from(allOptions).find(option => 
            option.getAttribute('data-emoji') === targetEmoji
        );
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        
        showFeedback('⏰ Tempo esgotado! Tente ser mais rápido na próxima.', 'timeout');
        
        // Próximo round após delay
        setTimeout(startNewRound, 2500);
    }
    
    // Função para atualizar displays de informação
    function updateInfoDisplay() {
        document.getElementById('currentRound').textContent = currentRound;
        document.getElementById('correctCount').textContent = correctAnswers;
        document.getElementById('nextLevel').textContent = 3 - (correctAnswers % 3);
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.shapes-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `shapes-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes das opções
        optionsArea.parentNode.insertBefore(feedback, optionsArea);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }
}

// Jogo 7: Sequência de Sons (Versão Interativa e Atrativa)
function loadSoundsGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Sequência de Sons';
    gameInstructions.textContent = 'Memorize e repita a sequência de sons! A sequência fica maior a cada acerto. Use os botões coloridos para reproduzir os sons.';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Variáveis de estado do jogo
    let sequence = [];
    let playerSequence = [];
    let round = 1;
    let isPlayingSequence = false;
    let canPlayerPlay = false;
    let score = 0;
    
    // Sons disponíveis (usando Web Audio API para sons mais precisos)
    const sounds = [
        { id: 1, name: 'Som 1', color: '#ff6b6b', frequency: 261.63, emoji: '🔴' }, // C4
        { id: 2, name: 'Som 2', color: '#4ecdc4', frequency: 329.63, emoji: '🟢' }, // E4
        { id: 3, name: 'Som 3', color: '#45b7d1', frequency: 392.00, emoji: '🔵' }, // G4
        { id: 4, name: 'Som 4', color: '#ffd166', frequency: 523.25, emoji: '🟡' }, // C5
        { id: 5, name: 'Som 5', color: '#9c27b0', frequency: 659.25, emoji: '🟣' }, // E5
        { id: 6, name: 'Som 6', color: '#ff9800', frequency: 783.99, emoji: '🟠' }  // G5
    ];
    
    // Cria o container do jogo
    const soundsGame = document.createElement('div');
    soundsGame.className = 'sounds-game-container';
    
    // Cria display de informações
    const infoDisplay = document.createElement('div');
    infoDisplay.className = 'sounds-info';
    infoDisplay.innerHTML = `
        <div class="game-stats">
            <div class="stat">
                <span class="label">Rodada</span>
                <span class="value" id="currentRound">${round}</span>
            </div>
            <div class="stat">
                <span class="label">Sequência</span>
                <span class="value" id="sequenceLength">${sequence.length}</span>
            </div>
            <div class="stat">
                <span class="label">Pontuação</span>
                <span class="value" id="currentScore">${score}</span>
            </div>
        </div>
        <div class="game-status" id="gameStatus">Pressione Iniciar para começar</div>
    `;
    
    // Cria área dos botões de som
    const buttonsArea = document.createElement('div');
    buttonsArea.className = 'sounds-buttons';
    buttonsArea.id = 'soundsButtons';
    
    // Cria os botões de som
    sounds.forEach(sound => {
        const button = document.createElement('button');
        button.className = 'sound-button';
        button.setAttribute('data-sound', sound.id);
        button.style.backgroundColor = sound.color;
        button.innerHTML = `
            <span class="sound-emoji">${sound.emoji}</span>
            <span class="sound-name">${sound.name}</span>
        `;
        
        button.addEventListener('click', () => handlePlayerInput(sound.id));
        
        buttonsArea.appendChild(button);
    });
    
    // Crea área de controles
    const controlsArea = document.createElement('div');
    controlsArea.className = 'sounds-controls';
    
    // Botão iniciar
    const startButton = document.createElement('button');
    startButton.className = 'game-button start-button';
    startButton.textContent = '🎵 Iniciar Jogo';
    startButton.onclick = startGame;
    
    // Botão repetir sequência
    const repeatButton = document.createElement('button');
    repeatButton.className = 'game-button repeat-button';
    repeatButton.textContent = '🔁 Repetir Sequência';
    repeatButton.onclick = playSequence;
    repeatButton.disabled = true;
    
    controlsArea.appendChild(startButton);
    controlsArea.appendChild(repeatButton);
    
    // Monta o jogo
    soundsGame.appendChild(infoDisplay);
    soundsGame.appendChild(buttonsArea);
    soundsGame.appendChild(controlsArea);
    gameArea.appendChild(soundsGame);
    
    // Inicializa o contexto de áudio
    let audioContext;
    let oscillator;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
        console.log('Web Audio API não suportada:', error);
    }
    
    // Função para iniciar o jogo
    function startGame() {
        sequence = [];
        playerSequence = [];
        round = 1;
        score = 0;
        
        updateDisplay();
        startButton.disabled = true;
        repeatButton.disabled = false;
        
        showFeedback('🎵 Preste atenção na sequência!', 'info');
        
        // Primeira rodada após um delay
        setTimeout(() => {
            nextRound();
        }, 1500);
    }
    
    // Função para próxima rodada
    function nextRound() {
        // Adiciona um novo som à sequência
        const newSound = Math.floor(Math.random() * sounds.length);
        sequence.push(newSound);
        
        updateDisplay();
        playerSequence = [];
        canPlayerPlay = false;
        
        showFeedback(`Rodada ${round} - Memorize a sequência!`, 'info');
        
        // Toca a sequência após um breve delay
        setTimeout(() => {
            playSequence();
        }, 1000);
    }
    
    // Função para tocar a sequência
    function playSequence() {
        if (isPlayingSequence) return;
        
        isPlayingSequence = true;
        canPlayerPlay = false;
        repeatButton.disabled = true;
        
        showFeedback('🔊 Reproduzindo sequência...', 'playing');
        
        let i = 0;
        
        function playNextSound() {
            if (i < sequence.length) {
                const soundIndex = sequence[i];
                highlightButton(soundIndex);
                playSound(sounds[soundIndex]);
                
                i++;
                setTimeout(playNextSound, 800); // Intervalo entre sons
            } else {
                // Sequência completa
                setTimeout(() => {
                    isPlayingSequence = false;
                    canPlayerPlay = true;
                    repeatButton.disabled = false;
                    showFeedback('🎯 Sua vez! Repita a sequência!', 'player-turn');
                }, 500);
            }
        }
        
        playNextSound();
    }
    
    // Função para processar input do jogador
    function handlePlayerInput(soundId) {
        if (!canPlayerPlay || isPlayingSequence) return;
        
        const soundIndex = sounds.findIndex(s => s.id === soundId);
        
        // Adiciona à sequência do jogador
        playerSequence.push(soundIndex);
        
        // Toca o som e destaca o botão
        playSound(sounds[soundIndex]);
        highlightButton(soundIndex);
        
        // Verifica se acertou até agora
        const currentIndex = playerSequence.length - 1;
        
        if (playerSequence[currentIndex] !== sequence[currentIndex]) {
            // ERROU - Fim do jogo
            gameOver();
            return;
        }
        
        // Verifica se completou a sequência corretamente
        if (playerSequence.length === sequence.length) {
            // SEQUÊNCIA COMPLETA - Próxima rodada
            round++;
            
            // Calcula pontos (base + bônus por sequência longa)
            const basePoints = 10;
            const lengthBonus = sequence.length * 2;
            const roundPoints = basePoints + lengthBonus;
            score += roundPoints;
            
            addScore(roundPoints);
            
            showFeedback(`🎉 Sequência correta! +${roundPoints} pontos!`, 'correct');
            
            updateDisplay();
            
            // Próxima rodada após delay
            setTimeout(() => {
                nextRound();
            }, 2000);
        } else {
            // Ainda está reproduzindo - mostra progresso
            const progress = playerSequence.length;
            const total = sequence.length;
            showFeedback(`Progresso: ${progress}/${total}`, 'progress');
        }
    }
    
    // Função para tocar som
    function playSound(sound) {
        if (!audioContext) {
            // Fallback para navegadores sem Web Audio API
            const fallbackAudio = new Audio();
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
            
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Envelope do som
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            return;
        }
        
        // Usa Web Audio API quando disponível
        try {
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
            
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Envelope do som (attack, decay)
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Erro ao tocar som:', error);
        }
    }
    
    // Função para destacar botão
    function highlightButton(soundIndex) {
        const buttons = document.querySelectorAll('.sound-button');
        const button = buttons[soundIndex];
        
        button.classList.add('active');
        
        setTimeout(() => {
            button.classList.remove('active');
        }, 300);
    }
    
    // Função para fim de jogo
    function gameOver() {
        canPlayerPlay = false;
        isPlayingSequence = false;
        
        // Toca som de erro
        if (audioContext) {
            try {
                const oscillator = audioContext.createOscillator();
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
                
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (error) {
                console.log('Erro ao tocar som de erro:', error);
            }
        }
        
        showFeedback(`💥 Fim de jogo! Sequência: ${sequence.length} sons. Pontuação final: ${score}`, 'game-over');
        
        // Bônus por sequência longa
        if (sequence.length >= 5) {
            const bonus = sequence.length * 5;
            addScore(bonus);
            setTimeout(() => {
                showFeedback(`🎊 Bônus por sequência longa! +${bonus} pontos!`, 'bonus');
            }, 2000);
        }
        
        startButton.disabled = false;
        repeatButton.disabled = true;
    }
    
    // Função para atualizar display
    function updateDisplay() {
        document.getElementById('currentRound').textContent = round;
        document.getElementById('sequenceLength').textContent = sequence.length;
        document.getElementById('currentScore').textContent = score;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        const statusElement = document.getElementById('gameStatus');
        statusElement.textContent = message;
        statusElement.className = `game-status ${type}`;
        
        // Remove classes após um tempo (exceto para estados permanentes)
        if (!['player-turn', 'playing'].includes(type)) {
            setTimeout(() => {
                statusElement.className = 'game-status';
            }, 3000);
        }
    }
}

// Jogo 8: Formação de Palavras (Versão Interativa e Atrativa)
function loadWordBuilderGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Formação de Palavras';
    gameInstructions.textContent = 'Monte palavras arrastando as sílabas para os espaços corretos. Pratique ortografia de forma divertida!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Banco de palavras organizado por dificuldade
    const wordBank = [
        // Fácil (2-3 sílabas)
        {
            word: 'CASA',
            syllables: ['CA', 'SA'],
            category: 'Objetos',
            difficulty: 'fácil',
            hint: 'Lugar onde moramos'
        },
        {
            word: 'BOLA',
            syllables: ['BO', 'LA'],
            category: 'Esportes',
            difficulty: 'fácil',
            hint: 'Usada para jogar futebol'
        },
        {
            word: 'GATO',
            syllables: ['GA', 'TO'],
            category: 'Animais',
            difficulty: 'fácil',
            hint: 'Animal doméstico que mia'
        },
        {
            word: 'SAPO',
            syllables: ['SA', 'PO'],
            category: 'Animais',
            difficulty: 'fácil',
            hint: 'Animal que pula e faz "coax"'
        },
        // Médio (3-4 sílabas)
        {
            word: 'BANANA',
            syllables: ['BA', 'NA', 'NA'],
            category: 'Frutas',
            difficulty: 'médio',
            hint: 'Fruta amarela e alongada'
        },
        {
            word: 'JANELA',
            syllables: ['JA', 'NE', 'LA'],
            category: 'Casa',
            difficulty: 'médio',
            hint: 'Abre para ver o lado de fora'
        },
        {
            word: 'CADERNO',
            syllables: ['CA', 'DER', 'NO'],
            category: 'Escola',
            difficulty: 'médio',
            hint: 'Usamos para escrever na escola'
        },
        {
            word: 'BICICLETA',
            syllables: ['BI', 'CI', 'CLE', 'TA'],
            category: 'Transporte',
            difficulty: 'médio',
            hint: 'Veículo com duas rodas'
        },
        // Difícil (4+ sílabas)
        {
            word: 'ELEFANTE',
            syllables: ['E', 'LE', 'FAN', 'TE'],
            category: 'Animais',
            difficulty: 'difícil',
            hint: 'Animal grande com tromba'
        },
        {
            word: 'TELEVISÃO',
            syllables: ['TE', 'LE', 'VI', 'SÃO'],
            category: 'Eletrônicos',
            difficulty: 'difícil',
            hint: 'Aparelho para assistir programas'
        },
        {
            word: 'COMPUTADOR',
            syllables: ['COM', 'PU', 'TA', 'DOR'],
            category: 'Tecnologia',
            difficulty: 'difícil',
            hint: 'Máquina para trabalhar e navegar na internet'
        },
        {
            word: 'BIBLIOTECA',
            syllables: ['BI', 'BLIO', 'TE', 'CA'],
            category: 'Educação',
            difficulty: 'difícil',
            hint: 'Lugar com muitos livros'
        }
    ];
    
    // Variáveis de estado do jogo
    let currentWordIndex = 0;
    let score = 0;
    let correctWords = 0;
    let currentDifficulty = 'fácil';
    
    // Cria o container do jogo
    const wordGame = document.createElement('div');
    wordGame.className = 'word-game-container';
    
    // Cria display de informações
    const infoDisplay = document.createElement('div');
    infoDisplay.className = 'word-game-info';
    infoDisplay.innerHTML = `
        <div class="word-stats">
            <div class="stat">
                <span class="label">Palavras Corretas</span>
                <span class="value" id="correctWords">${correctWords}</span>
            </div>
            <div class="stat">
                <span class="label">Pontuação</span>
                <span class="value" id="currentScore">${score}</span>
            </div>
            <div class="stat">
                <span class="label">Dificuldade</span>
                <span class="value" id="currentDifficulty">${currentDifficulty}</span>
            </div>
        </div>
        <div class="game-progress">
            <div class="progress-text">Progresso: <span id="progressText">${currentWordIndex + 1}/${wordBank.length}</span></div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: ${((currentWordIndex + 1) / wordBank.length) * 100}%"></div>
            </div>
        </div>
    `;
    
    // Cria área principal do jogo
    const gameAreaContent = document.createElement('div');
    gameAreaContent.className = 'word-game-area';
    gameAreaContent.id = 'wordGameArea';
    
    // Monta o jogo
    wordGame.appendChild(infoDisplay);
    wordGame.appendChild(gameAreaContent);
    gameArea.appendChild(wordGame);
    
    // Inicia o primeiro nível
    loadWord();
    
    // Função para carregar uma nova palavra
    function loadWord() {
        const currentWord = wordBank[currentWordIndex];
        
        // Limpa a área do jogo
        gameAreaContent.innerHTML = '';
        
        // Cria área da dica e palavra
        const wordHeader = document.createElement('div');
        wordHeader.className = 'word-header';
        wordHeader.innerHTML = `
            <div class="word-category">Categoria: ${currentWord.category} • Dificuldade: ${currentWord.difficulty}</div>
            <div class="word-hint">💡 Dica: ${currentWord.hint}</div>
            <div class="target-word">
                <span class="target-label">Monte a palavra:</span>
                <div class="word-slots" id="wordSlots"></div>
            </div>
        `;
        
        // Cria os slots para a palavra
        const wordSlots = document.createElement('div');
        wordSlots.className = 'word-slots';
        wordSlots.id = 'wordSlots';
        
        // Cria os slots vazios
        currentWord.syllables.forEach((_, index) => {
            const slot = document.createElement('div');
            slot.className = 'word-slot';
            slot.setAttribute('data-slot-index', index);
            slot.innerHTML = '<span class="slot-number">' + (index + 1) + '</span>';
            
            // Configura como zona de drop
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('drop', handleDrop);
            slot.addEventListener('dragenter', handleDragEnter);
            slot.addEventListener('dragleave', handleDragLeave);
            
            wordSlots.appendChild(slot);
        });
        
        // Cria área das sílabas
        const syllablesArea = document.createElement('div');
        syllablesArea.className = 'syllables-area';
        syllablesArea.innerHTML = '<div class="syllables-label">Arraste as sílabas:</div>';
        
        // Embaralha as sílabas
        const shuffledSyllables = [...currentWord.syllables].sort(() => Math.random() - 0.5);
        
        // Cria as sílabas arrastáveis
        shuffledSyllables.forEach((syllable, index) => {
            const syllableElement = document.createElement('div');
            syllableElement.className = 'syllable';
            syllableElement.textContent = syllable;
            syllableElement.setAttribute('draggable', 'true');
            syllableElement.setAttribute('data-syllable', syllable);
            syllableElement.setAttribute('data-original-index', index);
            
            // Adiciona eventos de drag
            syllableElement.addEventListener('dragstart', handleDragStart);
            syllableElement.addEventListener('dragend', handleDragEnd);
            
            syllablesArea.appendChild(syllableElement);
        });
        
        // Cria área de controles
        const controlsArea = document.createElement('div');
        controlsArea.className = 'word-controls';
        
        // Botão de verificar
        const checkButton = document.createElement('button');
        checkButton.className = 'game-button check-button';
        checkButton.textContent = '✅ Verificar Palavra';
        checkButton.onclick = checkWord;
        
        // Botão de pular
        const skipButton = document.createElement('button');
        skipButton.className = 'game-button skip-button';
        skipButton.textContent = '⏭️ Pular Palavra';
        skipButton.onclick = skipWord;
        
        // Botão de dica
        const hintButton = document.createElement('button');
        hintButton.className = 'game-button hint-button';
        hintButton.textContent = '💡 Mostrar Palavra';
        hintButton.onclick = showHint;
        
        controlsArea.appendChild(checkButton);
        controlsArea.appendChild(skipButton);
        controlsArea.appendChild(hintButton);
        
        // Monta o jogo completo
        wordHeader.appendChild(wordSlots);
        gameAreaContent.appendChild(wordHeader);
        gameAreaContent.appendChild(syllablesArea);
        gameAreaContent.appendChild(controlsArea);
        
        // Atualiza displays
        updateDisplays();
    }
    
    // Função para verificar a palavra montada
    function checkWord() {
        const currentWord = wordBank[currentWordIndex];
        const slots = document.querySelectorAll('.word-slot');
        const userWord = Array.from(slots)
            .map(slot => slot.querySelector('.syllable')?.textContent || '')
            .join('');
        
        if (userWord === currentWord.word) {
            // PALAVRA CORRETA
            correctWords++;
            
            // Calcula pontos baseados na dificuldade
            const points = calculatePoints(currentWord.difficulty);
            score += points;
            addScore(points);
            
            // Feedback visual de acerto
            slots.forEach(slot => {
                const syllable = slot.querySelector('.syllable');
                if (syllable) {
                    syllable.classList.add('correct');
                }
            });
            
            showFeedback(`🎉 Correto! "${currentWord.word}" +${points} pontos!`, 'correct');
            
            // Próxima palavra após delay
            setTimeout(nextWord, 2000);
            
        } else {
            // PALAVRA INCORRETA
            showFeedback('📝 A palavra não está correta. Tente novamente!', 'incorrect');
            
            // Destaque visual para erro
            slots.forEach(slot => {
                const syllable = slot.querySelector('.syllable');
                if (syllable && !syllable.classList.contains('correct')) {
                    syllable.classList.add('incorrect-temp');
                    setTimeout(() => syllable.classList.remove('incorrect-temp'), 1000);
                }
            });
        }
    }
    
    // Função para calcular pontos baseado na dificuldade
    function calculatePoints(difficulty) {
        const pointsMap = {
            'fácil': 10,
            'médio': 20,
            'difícil': 30
        };
        return pointsMap[difficulty] || 10;
    }
    
    // Função para pular palavra
    function skipWord() {
        showFeedback(`⏭️ Pulando "${wordBank[currentWordIndex].word}"`, 'info');
        addScore(-5); // Penalidade por pular
        nextWord();
    }
    
    // Função para mostrar dica
    function showHint() {
        const currentWord = wordBank[currentWordIndex];
        showFeedback(`💡 A palavra é: ${currentWord.word}`, 'hint');
        addScore(-3); // Penalidade por dica
    }
    
    // Função para próxima palavra
    function nextWord() {
        currentWordIndex++;
        
        if (currentWordIndex >= wordBank.length) {
            // FIM DO JOGO
            showFeedback(`🏆 Parabéns! Você completou todas as ${wordBank.length} palavras! Pontuação final: ${score}`, 'victory');
            
            // Bônus por completar todas as palavras
            const completionBonus = 50;
            score += completionBonus;
            addScore(completionBonus);
            
            setTimeout(() => {
                // Reinicia o jogo
                currentWordIndex = 0;
                correctWords = 0;
                score = 0;
                loadWord();
            }, 4000);
        } else {
            // Atualiza dificuldade atual
            currentDifficulty = wordBank[currentWordIndex].difficulty;
            loadWord();
        }
    }
    
    // Função para atualizar displays
    function updateDisplays() {
        document.getElementById('correctWords').textContent = correctWords;
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentDifficulty').textContent = currentDifficulty;
        document.getElementById('progressText').textContent = `${currentWordIndex + 1}/${wordBank.length}`;
        document.getElementById('progressFill').style.width = `${((currentWordIndex + 1) / wordBank.length) * 100}%`;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.word-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `word-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes da área do jogo
        gameAreaContent.insertBefore(feedback, gameAreaContent.firstChild);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }
    
    // ===== FUNÇÕES DE DRAG AND DROP =====
    let draggedSyllable = null;
    
    function handleDragStart(e) {
        draggedSyllable = this;
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.textContent);
        
        setTimeout(() => {
            this.style.opacity = '0.4';
        }, 0);
    }
    
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        this.style.opacity = '1';
        draggedSyllable = null;
        
        // Remove classes drag-over de todos os slots
        document.querySelectorAll('.word-slot').forEach(slot => {
            slot.classList.remove('drag-over');
        });
    }
    
    function handleDragOver(e) {
        e.preventDefault();
    }
    
    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (!draggedSyllable) return;
        
        // Remove a sílaba de qualquer slot anterior
        const previousSlot = draggedSyllable.closest('.word-slot');
        if (previousSlot) {
            previousSlot.classList.remove('filled');
            previousSlot.innerHTML = '<span class="slot-number">' + (parseInt(previousSlot.getAttribute('data-slot-index')) + 1) + '</span>';
        }
        
        // Adiciona a sílaba ao novo slot
        this.classList.add('filled');
        this.innerHTML = '';
        this.appendChild(draggedSyllable);
        
        // Remove a classe dragging
        draggedSyllable.classList.remove('dragging');
        draggedSyllable.style.opacity = '1';
    }
    
    // Previne comportamento padrão do drag
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
    });
}
// Jogo 9: Igual ou Diferente (Versão Interativa e Atrativa)
// Jogo 9: Igual ou Diferente (Versão Interativa e Atrativa)
function loadCompareGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Igual ou Diferente?';
    gameInstructions.textContent = 'Identifique rapidamente se os conjuntos de objetos são iguais ou diferentes. Quanto mais rápido, mais pontos!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Tipos de conjuntos disponíveis
    const setTypes = {
        EMOJI: 'emoji',
        FORMAS: 'formas',
        CORES: 'cores',
        NUMEROS: 'numeros',
        PADROES: 'padroes'
    };
    
    // Banco de conjuntos para comparação
    const comparisonSets = [
        // Conjuntos IGUAIS
        {
            set1: ['🍎', '🍌', '🍇'],
            set2: ['🍎', '🍌', '🍇'],
            answer: true, // true = igual
            type: setTypes.EMOJI,
            difficulty: 'fácil'
        },
        {
            set1: ['🔺', '🔵', '◼️'],
            set2: ['🔺', '🔵', '◼️'],
            answer: true,
            type: setTypes.FORMAS,
            difficulty: 'fácil'
        },
        {
            set1: ['🔴', '🔴', '🔴'],
            set2: ['🔴', '🔴', '🔴'],
            answer: true,
            type: setTypes.CORES,
            difficulty: 'fácil'
        },
        {
            set1: ['1', '2', '3'],
            set2: ['1', '2', '3'],
            answer: true,
            type: setTypes.NUMEROS,
            difficulty: 'fácil'
        },
        // Conjuntos DIFERENTES (fáceis)
        {
            set1: ['🍎', '🍌', '🍇'],
            set2: ['🍎', '🍊', '🍇'],
            answer: false, // false = diferente
            type: setTypes.EMOJI,
            difficulty: 'fácil'
        },
        {
            set1: ['🔺', '🔵', '◼️'],
            set2: ['🔺', '🔵', '❤️'],
            answer: false,
            type: setTypes.FORMAS,
            difficulty: 'fácil'
        },
        // Conjuntos de dificuldade média
        {
            set1: ['🍎', '🍌', '🍇', '🍊'],
            set2: ['🍎', '🍌', '🍇', '🍊'],
            answer: true,
            type: setTypes.EMOJI,
            difficulty: 'médio'
        },
        {
            set1: ['🍎', '🍌', '🍇', '🍊'],
            set2: ['🍎', '🍓', '🍇', '🍊'],
            answer: false,
            type: setTypes.EMOJI,
            difficulty: 'médio'
        },
        {
            set1: ['🔺', '🔵', '◼️', '⭐'],
            set2: ['🔺', '🔵', '◼️', '🔶'],
            answer: false,
            type: setTypes.FORMAS,
            difficulty: 'médio'
        },
        // Conjuntos difíceis (mais elementos, diferenças sutis)
        {
            set1: ['🍎', '🍌', '🍇', '🍊', '🍓'],
            set2: ['🍎', '🍌', '🍇', '🍊', '🍓'],
            answer: true,
            type: setTypes.EMOJI,
            difficulty: 'difícil'
        },
        {
            set1: ['🍎', '🍌', '🍇', '🍊', '🍓'],
            set2: ['🍎', '🍌', '🍇', '🍋', '🍓'],
            answer: false,
            type: setTypes.EMOJI,
            difficulty: 'difícil'
        },
        {
            set1: ['🔴', '🟢', '🔵', '🟡', '🟣'],
            set2: ['🔴', '🟢', '🔵', '🟠', '🟣'],
            answer: false,
            type: setTypes.CORES,
            difficulty: 'difícil'
        },
        // Conjuntos com padrões
        {
            set1: ['⭐', '🌟', '⭐', '🌟'],
            set2: ['⭐', '🌟', '⭐', '🌟'],
            answer: true,
            type: setTypes.PADROES,
            difficulty: 'médio'
        },
        {
            set1: ['⭐', '🌟', '⭐', '🌟'],
            set2: ['⭐', '🌟', '🌟', '⭐'],
            answer: false,
            type: setTypes.PADROES,
            difficulty: 'difícil'
        }
    ];
    
    // Variáveis de estado do jogo
    let currentRound = 0;
    let score = 0;
    let streak = 0;
    let bestStreak = 0;
    let startTime;
    let timer;
    let timeLimit = 5000; // 5 segundos por rodada
    
    // Cria o container do jogo
    const compareGame = document.createElement('div');
    compareGame.className = 'compare-game-container';
    
    // Cria display de informações
    const infoDisplay = document.createElement('div');
    infoDisplay.className = 'compare-info';
    infoDisplay.innerHTML = `
        <div class="compare-stats">
            <div class="stat">
                <span class="label">Rodada</span>
                <span class="value" id="currentRound">${currentRound}</span>
            </div>
            <div class="stat">
                <span class="label">Pontuação</span>
                <span class="value" id="currentScore">${score}</span>
            </div>
            <div class="stat">
                <span class="label">Sequência</span>
                <span class="value" id="currentStreak">${streak}</span>
            </div>
            <div class="stat">
                <span class="label">Melhor Seq.</span>
                <span class="value" id="bestStreak">${bestStreak}</span>
            </div>
        </div>
        <div class="time-display">
            <div class="time-bar">
                <div class="time-fill" id="timeFill" style="width: 100%"></div>
            </div>
            <div class="time-text" id="timeText">5.0s</div>
        </div>
    `;
    
    // Cria área de comparação
    const comparisonArea = document.createElement('div');
    comparisonArea.className = 'comparison-area';
    comparisonArea.id = 'comparisonArea';
    
    // Cria área de controles
    const controlsArea = document.createElement('div');
    controlsArea.className = 'compare-controls';
    
    // Botão Igual
    const equalButton = document.createElement('button');
    equalButton.className = 'compare-button equal-button';
    equalButton.innerHTML = `
        <span class="button-icon">👯</span>
        <span class="button-text">IGUAL</span>
    `;
    equalButton.onclick = () => handleAnswer(true);
    
    // Botão Diferente
    const differentButton = document.createElement('button');
    differentButton.className = 'compare-button different-button';
    differentButton.innerHTML = `
        <span class="button-icon">🚫</span>
        <span class="button-text">DIFERENTE</span>
    `;
    differentButton.onclick = () => handleAnswer(false);
    
    controlsArea.appendChild(equalButton);
    controlsArea.appendChild(differentButton);
    
    // Monta o jogo
    compareGame.appendChild(infoDisplay);
    compareGame.appendChild(comparisonArea);
    compareGame.appendChild(controlsArea);
    gameArea.appendChild(compareGame);
    
    // Inicia o primeiro round
    startNewRound();
    
    // Função para iniciar um novo round
    function startNewRound() {
        currentRound++;
        
        // Seleciona um conjunto aleatório
        const randomSet = comparisonSets[Math.floor(Math.random() * comparisonSets.length)];
        
        // Limpa a área de comparação
        comparisonArea.innerHTML = '';
        
        // Cria os conjuntos para comparação
        const set1Element = createSetElement(randomSet.set1, 'Conjunto A');
        const set2Element = createSetElement(randomSet.set2, 'Conjunto B');
        
        // Adiciona os conjuntos à área de comparação
        comparisonArea.appendChild(set1Element);
        
        // Adiciona divisor visual
        const divider = document.createElement('div');
        divider.className = 'set-divider';
        divider.innerHTML = '🆚';
        comparisonArea.appendChild(divider);
        
        comparisonArea.appendChild(set2Element);
        
        // Armazena a resposta correta
        comparisonArea.setAttribute('data-correct-answer', randomSet.answer);
        comparisonArea.setAttribute('data-difficulty', randomSet.difficulty);
        
        // Inicia o timer
        startTimer();
        
        // Atualiza displays
        updateDisplays();
    }
    
    // Função para criar elemento de conjunto
    function createSetElement(set, label) {
        const setElement = document.createElement('div');
        setElement.className = 'set-container';
        
        const labelElement = document.createElement('div');
        labelElement.className = 'set-label';
        labelElement.textContent = label;
        
        const itemsElement = document.createElement('div');
        itemsElement.className = 'set-items';
        
        // Adiciona cada item do conjunto
        set.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'set-item';
            itemElement.textContent = item;
            itemElement.style.fontSize = getFontSizeForItem(item);
            itemsElement.appendChild(itemElement);
        });
        
        setElement.appendChild(labelElement);
        setElement.appendChild(itemsElement);
        
        return setElement;
    }
    
    // Função para determinar tamanho da fonte baseado no conteúdo
    function getFontSizeForItem(item) {
        if (item.length === 1 && !isNaN(item)) {
            return '2.5rem'; // Números menores
        }
        return '3rem'; // Emojis normais
    }
    
    // Função para iniciar o timer
    function startTimer() {
        startTime = Date.now();
        const endTime = startTime + timeLimit;
        
        // Limpa timer anterior
        if (timer) clearInterval(timer);
        
        timer = setInterval(() => {
            const now = Date.now();
            const timeLeft = Math.max(0, endTime - now);
            const percentage = (timeLeft / timeLimit) * 100;
            
            updateTimerDisplay(timeLeft, percentage);
            
            // Tempo esgotado
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 50); // Atualiza a cada 50ms para smooth animation
    }
    
    // Função para atualizar display do timer
    function updateTimerDisplay(timeLeft, percentage) {
        const timeFill = document.getElementById('timeFill');
        const timeText = document.getElementById('timeText');
        
        timeFill.style.width = `${percentage}%`;
        timeText.textContent = `${(timeLeft / 1000).toFixed(1)}s`;
        
        // Muda a cor conforme o tempo diminui
        if (percentage < 25) {
            timeFill.style.background = '#ff6b6b';
        } else if (percentage < 50) {
            timeFill.style.background = '#ffa726';
        } else {
            timeFill.style.background = '#4CAF50';
        }
    }
    
    // Função para processar resposta do jogador
    function handleAnswer(playerAnswer) {
        // Para o timer
        clearInterval(timer);
        
        const correctAnswer = comparisonArea.getAttribute('data-correct-answer') === 'true';
        const difficulty = comparisonArea.getAttribute('data-difficulty');
        const timeUsed = Date.now() - startTime;
        const timeLeft = timeLimit - timeUsed;
        
        // Calcula pontos baseados na dificuldade e velocidade
        const basePoints = calculateBasePoints(difficulty);
        const speedBonus = calculateSpeedBonus(timeLeft);
        const streakBonus = calculateStreakBonus();
        
        const totalPoints = basePoints + speedBonus + streakBonus;
        
        if (playerAnswer === correctAnswer) {
            // RESPOSTA CORRETA
            streak++;
            if (streak > bestStreak) {
                bestStreak = streak;
            }
            
            score += totalPoints;
            addScore(totalPoints);
            
            // Feedback visual de acerto
            comparisonArea.classList.add('correct-answer');
            
            // Mostra feedback detalhado
            showFeedback(
                `🎉 Correto! +${totalPoints} pontos ` +
                `(Base: ${basePoints} + Velocidade: ${speedBonus} + Sequência: ${streakBonus})`,
                'correct'
            );
            
            // Próximo round após delay
            setTimeout(() => {
                comparisonArea.classList.remove('correct-answer');
                startNewRound();
            }, 2000);
            
        } else {
            // RESPOSTA INCORRETA
            streak = 0;
            
            // Feedback visual de erro
            comparisonArea.classList.add('incorrect-answer');
            
            // Destaca as diferenças se for o caso
            if (!correctAnswer) {
                highlightDifferences();
            }
            
            showFeedback(
                `💡 ${correctAnswer ? 'Os conjuntos eram IGUAIS' : 'Os conjuntos eram DIFERENTES'}`,
                'incorrect'
            );
            
            // Próximo round após delay maior
            setTimeout(() => {
                comparisonArea.classList.remove('incorrect-answer');
                clearHighlights();
                startNewRound();
            }, 3000);
        }
        
        updateDisplays();
    }
    
    // Função para calcular pontos base
    function calculateBasePoints(difficulty) {
        const pointsMap = {
            'fácil': 10,
            'médio': 15,
            'difícil': 20
        };
        return pointsMap[difficulty] || 10;
    }
    
    // Função para calcular bônus de velocidade
    function calculateSpeedBonus(timeLeft) {
        // Até 10 pontos extras por resposta rápida
        return Math.floor((timeLeft / timeLimit) * 10);
    }
    
    // Função para calcular bônus de sequência
    function calculateStreakBonus() {
        // Bônus progressivo para sequências longas
        if (streak >= 10) return 10;
        if (streak >= 5) return 5;
        if (streak >= 3) return 2;
        return 0;
    }
    
    // Função para tempo esgotado
    function handleTimeOut() {
        streak = 0;
        
        comparisonArea.classList.add('timeout');
        
        showFeedback('⏰ Tempo esgotado! Tente ser mais rápido!', 'timeout');
        
        // Mostra a resposta correta
        const correctAnswer = comparisonArea.getAttribute('data-correct-answer') === 'true';
        if (!correctAnswer) {
            highlightDifferences();
        }
        
        setTimeout(() => {
            comparisonArea.classList.remove('timeout');
            clearHighlights();
            startNewRound();
        }, 3000);
        
        updateDisplays();
    }
    
    // Função para destacar diferenças entre conjuntos
    function highlightDifferences() {
        const set1Items = comparisonArea.querySelector('.set-container:first-child .set-items');
        const set2Items = comparisonArea.querySelector('.set-container:last-child .set-items');
        
        const items1 = set1Items.querySelectorAll('.set-item');
        const items2 = set2Items.querySelectorAll('.set-item');
        
        items1.forEach((item1, index) => {
            const item2 = items2[index];
            if (item1.textContent !== item2.textContent) {
                item1.classList.add('different');
                item2.classList.add('different');
            }
        });
    }
    
    // Função para limpar destaques
    function clearHighlights() {
        comparisonArea.querySelectorAll('.set-item.different').forEach(item => {
            item.classList.remove('different');
        });
    }
    
    // Função para atualizar displays
    function updateDisplays() {
        document.getElementById('currentRound').textContent = currentRound;
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentStreak').textContent = streak;
        document.getElementById('bestStreak').textContent = bestStreak;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.compare-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `compare-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes dos controles
        controlsArea.parentNode.insertBefore(feedback, controlsArea);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }
}
// Jogo 10: Ritmo Musical (Versão Impressionante e Interativa)
function loadRhythmGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Ritmo Musical';
    gameInstructions.textContent = 'Siga os padrões rítmicos! Desenvolva sua coordenação e senso musical. Use as teclas ou clique nos botões para reproduzir os sons.';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Configurações do jogo
    const BPM = 120; // Batidas por minuto
    const beatInterval = (60 / BPM) * 1000; // Intervalo entre batidas em ms
    
    // Sons disponíveis (usando Web Audio API)
    const sounds = {
        KICK: { name: 'Bumbo', color: '#ff6b6b', frequency: 80, type: 'sine', emoji: '🥁' },
        SNARE: { name: 'Caixa', color: '#4ecdc4', frequency: 200, type: 'square', emoji: '🎵' },
        HIHAT: { name: 'Prato', color: '#45b7d1', frequency: 800, type: 'triangle', emoji: '🎶' },
        CLAP: { name: 'Palmas', color: '#ffd166', frequency: 500, type: 'sawtooth', emoji: '👏' },
        COWBELL: { name: 'Agogô', color: '#9c27b0', frequency: 600, type: 'sine', emoji: '🔔' }
    };
    
    // Padrões rítmicos pré-definidos
    const rhythmPatterns = [
        // Padrão 1 - Básico (4/4)
        {
            name: 'Batida Básica',
            difficulty: 'iniciante',
            pattern: [
                ['KICK', null, 'SNARE', null],
                ['KICK', null, 'SNARE', null]
            ],
            bpm: 100,
            description: 'Padrão básico de rock'
        },
        // Padrão 2 - Com pratos
        {
            name: 'Rock com Pratos',
            difficulty: 'fácil',
            pattern: [
                ['KICK', 'HIHAT', 'SNARE', 'HIHAT'],
                ['KICK', 'HIHAT', 'SNARE', 'HIHAT']
            ],
            bpm: 110,
            description: 'Batida de rock com hi-hat'
        },
        // Padrão 3 - Sincopado
        {
            name: 'Sincopado',
            difficulty: 'médio',
            pattern: [
                ['KICK', null, 'SNARE', 'CLAP'],
                [null, 'KICK', 'SNARE', 'CLAP']
            ],
            bpm: 120,
            description: 'Ritmo sincopado com palmas'
        },
        // Padrão 4 - Funk
        {
            name: 'Batida Funk',
            difficulty: 'difícil',
            pattern: [
                ['KICK', 'HIHAT', 'SNARE', 'HIHAT', 'KICK', 'HIHAT', 'SNARE', 'CLAP'],
                ['KICK', 'HIHAT', 'SNARE', 'HIHAT', null, 'HIHAT', 'SNARE', 'COWBELL']
            ],
            bpm: 130,
            description: 'Batida funk com agogô'
        },
        // Padrão 5 - Complexo
        {
            name: 'Ritmo Complexo',
            difficulty: 'expert',
            pattern: [
                ['KICK', 'HIHAT', 'SNARE', 'HIHAT', 'KICK', 'CLAP', 'SNARE', 'HIHAT'],
                ['KICK', 'HIHAT', 'SNARE', 'COWBELL', 'KICK', 'HIHAT', 'SNARE', 'CLAP']
            ],
            bpm: 140,
            description: 'Padrão complexo para experts'
        }
    ];
    
    // Variáveis de estado do jogo
    let currentPatternIndex = 0;
    let score = 0;
    let streak = 0;
    let isPlaying = false;
    let isRecording = false;
    let currentStep = 0;
    let userPattern = [];
    let audioContext;
    let timer;
    
    // Cria o container do jogo
    const rhythmGame = document.createElement('div');
    rhythmGame.className = 'rhythm-game-container';
    
    // Cria display de informações
    const infoDisplay = document.createElement('div');
    infoDisplay.className = 'rhythm-info';
    infoDisplay.innerHTML = `
        <div class="rhythm-stats">
            <div class="stat">
                <span class="label">Padrão</span>
                <span class="value" id="currentPattern">1/${rhythmPatterns.length}</span>
            </div>
            <div class="stat">
                <span class="label">Pontuação</span>
                <span class="value" id="currentScore">${score}</span>
            </div>
            <div class="stat">
                <span class="label">Sequência</span>
                <span class="value" id="currentStreak">${streak}</span>
            </div>
            <div class="stat">
                <span class="label">Dificuldade</span>
                <span class="value" id="currentDifficulty">${rhythmPatterns[0].difficulty}</span>
            </div>
        </div>
        <div class="pattern-info">
            <h3 id="patternName">${rhythmPatterns[0].name}</h3>
            <p id="patternDescription">${rhythmPatterns[0].description}</p>
            <div class="bpm-display">BPM: <span id="currentBPM">${rhythmPatterns[0].bpm}</span></div>
        </div>
    `;
    
    // Cria visualizador de padrão
    const patternVisualizer = document.createElement('div');
    patternVisualizer.className = 'pattern-visualizer';
    patternVisualizer.id = 'patternVisualizer';
    
    // Cria área dos instrumentos
    const instrumentsArea = document.createElement('div');
    instrumentsArea.className = 'instruments-area';
    instrumentsArea.id = 'instrumentsArea';
    
    // Cria os botões dos instrumentos
    Object.entries(sounds).forEach(([key, sound]) => {
        const instrument = document.createElement('div');
        instrument.className = 'instrument';
        instrument.setAttribute('data-sound', key);
        instrument.innerHTML = `
            <div class="instrument-icon" style="background: ${sound.color}">
                ${sound.emoji}
            </div>
            <div class="instrument-name">${sound.name}</div>
            <div class="instrument-key">${getKeyLabel(key)}</div>
        `;
        
        instrument.addEventListener('click', () => playSound(sound));
        instrumentsArea.appendChild(instrument);
    });
    
    // Cria área de controles
    const controlsArea = document.createElement('div');
    controlsArea.className = 'rhythm-controls';
    
    // Botão play/pause
    const playButton = document.createElement('button');
    playButton.className = 'control-button play-button';
    playButton.innerHTML = '🎵 Reproduzir Padrão';
    playButton.onclick = togglePlayback;
    
    // Botão gravar
    const recordButton = document.createElement('button');
    recordButton.className = 'control-button record-button';
    recordButton.innerHTML = '🔴 Gravar Minha Versão';
    recordButton.onclick = toggleRecording;
    
    // Botão próximo padrão
    const nextButton = document.createElement('button');
    nextButton.className = 'control-button next-button';
    nextButton.innerHTML = '⏭️ Próximo Padrão';
    nextButton.onclick = nextPattern;
    
    controlsArea.appendChild(playButton);
    controlsArea.appendChild(recordButton);
    controlsArea.appendChild(nextButton);
    
    // Cria área de feedback
    const feedbackArea = document.createElement('div');
    feedbackArea.className = 'rhythm-feedback';
    feedbackArea.id = 'rhythmFeedback';
    
    // Monta o jogo
    rhythmGame.appendChild(infoDisplay);
    rhythmGame.appendChild(patternVisualizer);
    rhythmGame.appendChild(instrumentsArea);
    rhythmGame.appendChild(controlsArea);
    rhythmGame.appendChild(feedbackArea);
    gameArea.appendChild(rhythmGame);
    
    // Inicializa o contexto de áudio
    initializeAudio();
    
    // Configura listeners de teclado
    setupKeyboardListeners();
    
    // Carrega o primeiro padrão
    loadPattern(currentPatternIndex);
    
    // Função para inicializar áudio
    function initializeAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            showFeedback('⚠️ Seu navegador não suporta Web Audio API. Use os botões para tocar.', 'warning');
        }
    }
    
    // Função para configurar listeners de teclado
    function setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (!isRecording) return;
            
            const key = e.key.toLowerCase();
            const soundMap = {
                'a': 'KICK',
                's': 'SNARE', 
                'd': 'HIHAT',
                'f': 'CLAP',
                'g': 'COWBELL'
            };
            
            if (soundMap[key]) {
                playSound(sounds[soundMap[key]]);
                recordUserInput(soundMap[key]);
            }
        });
    }
    
    // Função para obter label da tecla
    function getKeyLabel(soundKey) {
        const keyMap = {
            'KICK': 'A',
            'SNARE': 'S',
            'HIHAT': 'D', 
            'CLAP': 'F',
            'COWBELL': 'G'
        };
        return keyMap[soundKey] || '';
    }
    
    // Função para carregar um padrão
    function loadPattern(index) {
        currentPatternIndex = index;
        const pattern = rhythmPatterns[index];
        
        // Atualiza displays
        document.getElementById('currentPattern').textContent = `${index + 1}/${rhythmPatterns.length}`;
        document.getElementById('patternName').textContent = pattern.name;
        document.getElementById('patternDescription').textContent = pattern.description;
        document.getElementById('currentBPM').textContent = pattern.bpm;
        document.getElementById('currentDifficulty').textContent = pattern.difficulty;
        
        // Cria visualização do padrão
        createPatternVisualization(pattern);
        
        // Reseta estado do usuário
        userPattern = [];
        streak = 0;
        updateDisplays();
        
        showFeedback(`🎵 Padrão "${pattern.name}" carregado! Clique em Reproduzir para ouvir.`, 'info');
    }
    
    // Função para criar visualização do padrão
    function createPatternVisualization(pattern) {
        patternVisualizer.innerHTML = '';
        
        pattern.pattern.forEach((track, trackIndex) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'rhythm-track';
            
            track.forEach((step, stepIndex) => {
                const stepElement = document.createElement('div');
                stepElement.className = 'rhythm-step';
                stepElement.setAttribute('data-track', trackIndex);
                stepElement.setAttribute('data-step', stepIndex);
                
                if (step) {
                    stepElement.classList.add('active');
                    stepElement.style.background = sounds[step].color;
                    stepElement.title = sounds[step].name;
                }
                
                // Adiciona número do passo
                const stepNumber = document.createElement('div');
                stepNumber.className = 'step-number';
                stepNumber.textContent = stepIndex + 1;
                stepElement.appendChild(stepNumber);
                
                trackElement.appendChild(stepElement);
            });
            
            patternVisualizer.appendChild(trackElement);
        });
    }
    
    // Função para tocar/reproduzir
    function togglePlayback() {
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    }
    
    // Função para iniciar reprodução
    function startPlayback() {
        if (isPlaying) return;
        
        isPlaying = true;
        playButton.innerHTML = '⏸️ Parar Reprodução';
        playButton.classList.add('active');
        
        const pattern = rhythmPatterns[currentPatternIndex];
        const stepsPerBeat = pattern.pattern[0].length;
        const stepDuration = (60 / pattern.bpm) * 1000;
        
        currentStep = 0;
        
        // Highlight dos steps durante reprodução
        timer = setInterval(() => {
            // Remove highlight anterior
            patternVisualizer.querySelectorAll('.rhythm-step.playing').forEach(step => {
                step.classList.remove('playing');
            });
            
            // Toca os sons deste step
            pattern.pattern.forEach((track, trackIndex) => {
                const soundKey = track[currentStep];
                if (soundKey && sounds[soundKey]) {
                    playSound(sounds[soundKey]);
                    
                    // Destaca o step
                    const stepElement = patternVisualizer.querySelector(
                        `.rhythm-step[data-track="${trackIndex}"][data-step="${currentStep}"]`
                    );
                    if (stepElement) {
                        stepElement.classList.add('playing');
                    }
                }
            });
            
            currentStep++;
            
            // Verifica fim do padrão
            if (currentStep >= stepsPerBeat) {
                currentStep = 0;
            }
        }, stepDuration);
    }
    
    // Função para parar reprodução
    function stopPlayback() {
        isPlaying = false;
        clearInterval(timer);
        playButton.innerHTML = '🎵 Reproduzir Padrão';
        playButton.classList.remove('active');
        
        // Remove todos os highlights
        patternVisualizer.querySelectorAll('.rhythm-step.playing').forEach(step => {
            step.classList.remove('playing');
        });
    }
    
    // Função para gravar/parar gravação
    function toggleRecording() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }
    
    // Função para iniciar gravação
    function startRecording() {
        if (isPlaying) stopPlayback();
        
        isRecording = true;
        userPattern = [];
        recordButton.innerHTML = '⏹️ Parar Gravação';
        recordButton.classList.add('recording');
        
        showFeedback('🎤 Gravando! Use as teclas A,S,D,F,G ou clique nos instrumentos.', 'recording');
    }
    
    // Função para parar gravação
    function stopRecording() {
        isRecording = false;
        recordButton.innerHTML = '🔴 Gravar Minha Versão';
        recordButton.classList.remove('recording');
        
        // Verifica o padrão gravado
        checkUserPattern();
    }
    
    // Função para gravar input do usuário
    function recordUserInput(soundKey) {
        if (!isRecording) return;
        
        userPattern.push({
            sound: soundKey,
            timestamp: Date.now()
        });
        
        // Feedback visual
        showFeedback(`🎵 Gravado: ${sounds[soundKey].name}`, 'success', 1000);
    }
    
    // Função para verificar padrão do usuário
    function checkUserPattern() {
        const pattern = rhythmPatterns[currentPatternIndex];
        const expectedPattern = [];
        
        // Constrói padrão esperado
        pattern.pattern.forEach(track => {
            track.forEach(sound => {
                if (sound) {
                    expectedPattern.push(sound);
                }
            });
        });
        
        const userSounds = userPattern.map(entry => entry.sound);
        
        // Verifica acerto (simplificado - verifica se tem os mesmos sons)
        let correctSounds = 0;
        userSounds.forEach(sound => {
            if (expectedPattern.includes(sound)) {
                correctSounds++;
            }
        });
        
        const accuracy = userSounds.length > 0 ? (correctSounds / expectedPattern.length) * 100 : 0;
        
        if (accuracy >= 80) {
            // ACERTOU
            streak++;
            const points = Math.floor(accuracy) + (streak * 5);
            score += points;
            addScore(points);
            
            showFeedback(
                `🎉 Ótimo! Precisão: ${Math.floor(accuracy)}% +${points} pontos! Sequência: ${streak}`,
                'correct'
            );
            
            // Próximo padrão após 3 acertos consecutivos
            if (streak >= 3 && currentPatternIndex < rhythmPatterns.length - 1) {
                setTimeout(() => {
                    nextPattern();
                }, 2000);
            }
        } else {
            // ERROU
            streak = 0;
            showFeedback(
                `💡 Continue tentando! Precisão: ${Math.floor(accuracy)}%. Ouça o padrão novamente.`,
                'incorrect'
            );
        }
        
        updateDisplays();
    }
    
    // Função para próximo padrão
    function nextPattern() {
        if (currentPatternIndex < rhythmPatterns.length - 1) {
            loadPattern(currentPatternIndex + 1);
        } else {
            showFeedback('🏆 Parabéns! Você completou todos os padrões!', 'victory');
            // Reinicia do primeiro padrão
            setTimeout(() => {
                loadPattern(0);
            }, 3000);
        }
    }
    
    // Função para tocar som
    function playSound(sound) {
        if (!audioContext) return;
        
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = sound.type;
            oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
            
            // Envelope do som
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            
            // Feedback visual no instrumento
            const instrument = instrumentsArea.querySelector(`[data-sound="${Object.keys(sounds).find(key => sounds[key] === sound)}"]`);
            if (instrument) {
                instrument.classList.add('playing');
                setTimeout(() => instrument.classList.remove('playing'), 200);
            }
        } catch (error) {
            console.log('Erro ao tocar som:', error);
        }
    }
    
    // Função para atualizar displays
    function updateDisplays() {
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentStreak').textContent = streak;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type, duration = 3000) {
        const feedback = document.getElementById('rhythmFeedback');
        feedback.textContent = message;
        feedback.className = `rhythm-feedback ${type}`;
        
        setTimeout(() => {
            feedback.className = 'rhythm-feedback';
        }, duration);
    }
}

//JOGO 11 Padrões e Sequências
// Jogo 11: Padrões e Sequências (Versão com Níveis e Sistema Avançado)
function loadPatternsGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Padrões e Sequências';
    gameInstructions.textContent = 'Complete as sequências lógicas identificando os padrões visuais. Escolha um nível de dificuldade e desafie sua mente!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Sistema de níveis
    const levels = {
        FACIL: {
            name: 'Fácil',
            color: '#4CAF50',
            description: 'Padrões simples com 3-4 elementos',
            points: 10,
            timeLimit: 15000
        },
        MEDIO: {
            name: 'Médio',
            color: '#FF9800',
            description: 'Padrões moderados com 5-6 elementos',
            points: 20,
            timeLimit: 12000
        },
        DIFICIL: {
            name: 'Difícil',
            color: '#F44336',
            description: 'Padrões complexos com 7+ elementos',
            points: 30,
            timeLimit: 10000
        }
    };
    
    // Banco de padrões organizado por dificuldade
    const patternsBank = {
        FACIL: [
            {
                type: 'CORES',
                sequence: ['🔴', '🟢', '🔴', '🟢', '🔴', '?'],
                options: ['🟢', '🔵', '🟡'],
                answer: '🟢',
                pattern: 'Alternância de cores',
                explanation: 'Padrão: Vermelho, Verde, Vermelho, Verde...'
            },
            {
                type: 'FORMAS',
                sequence: ['🔺', '🔺', '🔵', '🔺', '🔺', '?'],
                options: ['🔵', '🔺', '⭐'],
                answer: '🔵',
                pattern: 'Repetição com variação',
                explanation: 'Padrão: 2 triângulos, 1 círculo, 2 triângulos...'
            },
            {
                type: 'NUMEROS',
                sequence: ['1', '2', '3', '1', '2', '?'],
                options: ['3', '4', '1'],
                answer: '3',
                pattern: 'Sequência repetitiva',
                explanation: 'Padrão: 1, 2, 3 se repete'
            },
            {
                type: 'SETAS',
                sequence: ['⬆️', '➡️', '⬇️', '⬅️', '⬆️', '?'],
                options: ['➡️', '⬇️', '⬆️'],
                answer: '➡️',
                pattern: 'Sequência circular',
                explanation: 'Padrão: Setas em círculo (cima, direita, baixo, esquerda)'
            }
        ],
        MEDIO: [
            {
                type: 'CORES_AVANCADO',
                sequence: ['🔴', '🟢', '🔵', '🔴', '🟢', '🔵', '?'],
                options: ['🔴', '🟡', '🟣'],
                answer: '🔴',
                pattern: 'Sequência de 3 cores',
                explanation: 'Padrão: Vermelho, Verde, Azul se repete'
            },
            {
                type: 'CRESCENTE',
                sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐', '?'],
                options: ['⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
                answer: '⭐⭐',
                pattern: 'Simetria',
                explanation: 'Padrão: Cresce e depois decresce'
            },
            {
                type: 'PULSO',
                sequence: ['⚫', '⚪', '⚫', '⚪', '⚫', '⚪', '?'],
                options: ['⚫', '🔴', '⚪'],
                answer: '⚫',
                pattern: 'Alternância binária',
                explanation: 'Padrão: Preto, Branco alternando'
            },
            {
                type: 'DIAGONAL',
                sequence: ['↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '?'],
                options: ['↖️', '⬆️', '↗️'],
                answer: '↖️',
                pattern: 'Movimento circular completo',
                explanation: 'Padrão: Setas em movimento circular completo'
            }
        ],
        DIFICIL: [
            {
                type: 'FIBONACCI',
                sequence: ['▪️', '▪️', '▪️▪️', '▪️▪️▪️', '▪️▪️▪️▪️▪️', '▪️▪️▪️▪️▪️▪️▪️▪️', '?'],
                options: ['▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️', '▪️▪️▪️▪️▪️▪️▪️', '▪️▪️▪️▪️▪️▪️▪️▪️▪️'],
                answer: '▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️',
                pattern: 'Sequência Fibonacci',
                explanation: 'Padrão: Cada elemento é soma dos dois anteriores (1,1,2,3,5,8,13...)'
            },
            {
                type: 'MULTIPLOS',
                sequence: ['1', '4', '9', '16', '25', '36', '?'],
                options: ['49', '64', '81'],
                answer: '49',
                pattern: 'Quadrados perfeitos',
                explanation: 'Padrão: 1², 2², 3², 4², 5², 6², 7²...'
            },
            {
                type: 'CORES_COMPLEXO',
                sequence: ['🔴', '🟡', '🔵', '🟢', '🟣', '🟠', '?'],
                options: ['🔴', '⚫', '⚪'],
                answer: '🔴',
                pattern: 'Cores do arco-íris cíclico',
                explanation: 'Padrão: Cores do arco-íris que se repetem'
            },
            {
                type: 'PADRAO_MISTO',
                sequence: ['🔺', '🔴', '🔵', '🔺', '🟢', '🔵', '🔺', '?'],
                options: ['🟡', '🔴', '⚫'],
                answer: '🟡',
                pattern: 'Múltiplos padrões',
                explanation: 'Padrão: Forma, Cor, Cor se repetem com cores diferentes'
            }
        ]
    };
    
    // Variáveis de estado do jogo
    let currentLevel = null;
    let currentPatternIndex = 0;
    let score = 0;
    let streak = 0;
    let timer;
    let timeLeft;
    
    // Cria o container do jogo
    const patternsGame = document.createElement('div');
    patternsGame.className = 'patterns-game-container';
    
    // Tela de seleção de nível
    showLevelSelection();
    
    // Função para mostrar seleção de nível
    function showLevelSelection() {
        patternsGame.innerHTML = '';
        
        const levelSelection = document.createElement('div');
        levelSelection.className = 'level-selection';
        levelSelection.innerHTML = `
            <h2>🎯 Escolha o Nível de Dificuldade</h2>
            <p class="selection-description">Selecione um nível para começar a desafiar sua mente!</p>
        `;
        
        const levelsContainer = document.createElement('div');
        levelsContainer.className = 'levels-container';
        
        Object.entries(levels).forEach(([key, level]) => {
            const levelCard = document.createElement('div');
            levelCard.className = 'level-card';
            levelCard.style.borderColor = level.color;
            levelCard.innerHTML = `
                <div class="level-header" style="background: ${level.color}">
                    <h3>${level.name}</h3>
                    <div class="level-points">${level.points} pts/acerto</div>
                </div>
                <div class="level-body">
                    <div class="level-description">${level.description}</div>
                    <div class="level-time">⏱️ ${level.timeLimit/1000}s por questão</div>
                    <div class="level-preview">
                        ${getLevelPreview(key)}
                    </div>
                </div>
                <button class="level-select-button" style="background: ${level.color}">
                    🚀 Selecionar Nível
                </button>
            `;
            
            levelCard.querySelector('.level-select-button').onclick = () => startLevel(key);
            
            levelsContainer.appendChild(levelCard);
        });
        
        levelSelection.appendChild(levelsContainer);
        patternsGame.appendChild(levelSelection);
        gameArea.appendChild(patternsGame);
    }
    
    // Função para obter preview do nível
    function getLevelPreview(levelKey) {
        const previews = {
            FACIL: '🔴 🟢 🔴 🟢 ...',
            MEDIO: '🔴 🟢 🔵 🔴 🟢 ...',
            DIFICIL: '▪️ ▪️ ▪️▪️ ▪️▪️▪️ ...'
        };
        return `<div class="preview-sequence">${previews[levelKey]}</div>`;
    }
    
    // Função para iniciar nível
    function startLevel(levelKey) {
        currentLevel = levelKey;
        currentPatternIndex = 0;
        score = 0;
        streak = 0;
        
        showGameInterface();
        loadNextPattern();
    }
    
    // Função para mostrar interface do jogo
    function showGameInterface() {
        patternsGame.innerHTML = '';
        
        const level = levels[currentLevel];
        
        // Cria display de informações
        const infoDisplay = document.createElement('div');
        infoDisplay.className = 'patterns-info';
        infoDisplay.style.borderColor = level.color;
        infoDisplay.innerHTML = `
            <div class="patterns-header">
                <div class="level-badge" style="background: ${level.color}">
                    ${level.name}
                </div>
                <div class="patterns-stats">
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="currentScore">${score}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="currentStreak">${streak}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Padrão</span>
                        <span class="value" id="currentPattern">${currentPatternIndex + 1}/${patternsBank[currentLevel].length}</span>
                    </div>
                </div>
            </div>
            <div class="time-display">
                <div class="time-bar">
                    <div class="time-fill" id="timeFill" style="width: 100%; background: ${level.color}"></div>
                </div>
                <div class="time-text" id="timeText">${level.timeLimit/1000}s</div>
            </div>
        `;
        
        // Cria área do padrão
        const patternArea = document.createElement('div');
        patternArea.className = 'pattern-area';
        patternArea.id = 'patternArea';
        
        // Cria área de opções
        const optionsArea = document.createElement('div');
        optionsArea.className = 'options-area';
        optionsArea.id = 'optionsArea';
        
        // Cria área de controles
        const controlsArea = document.createElement('div');
        controlsArea.className = 'patterns-controls';
        
        const backButton = document.createElement('button');
        backButton.className = 'control-button back-button';
        backButton.innerHTML = '↩️ Trocar Nível';
        backButton.onclick = showLevelSelection;
        
        const hintButton = document.createElement('button');
        hintButton.className = 'control-button hint-button';
        hintButton.innerHTML = '💡 Dica';
        hintButton.onclick = showHint;
        
        controlsArea.appendChild(backButton);
        controlsArea.appendChild(hintButton);
        
        // Monta o jogo
        patternsGame.appendChild(infoDisplay);
        patternsGame.appendChild(patternArea);
        patternsGame.appendChild(optionsArea);
        patternsGame.appendChild(controlsArea);
    }
    
    // Função para carregar próximo padrão
    function loadNextPattern() {
        if (currentPatternIndex >= patternsBank[currentLevel].length) {
            showVictoryScreen();
            return;
        }
        
        const pattern = patternsBank[currentLevel][currentPatternIndex];
        const level = levels[currentLevel];
        
        // Limpa áreas
        document.getElementById('patternArea').innerHTML = '';
        document.getElementById('optionsArea').innerHTML = '';
        
        // Para timer anterior
        if (timer) clearInterval(timer);
        
        // Cria visualização do padrão
        const sequenceElement = document.createElement('div');
        sequenceElement.className = 'pattern-sequence';
        
        pattern.sequence.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = `sequence-item ${item === '?' ? 'missing' : ''}`;
            itemElement.textContent = item;
            
            if (item === '?') {
                itemElement.innerHTML = `
                    <div class="missing-slot">?</div>
                    <div class="slot-indicator">${index + 1}</div>
                `;
            }
            
            sequenceElement.appendChild(itemElement);
        });
        
        // Cria descrição do padrão (inicialmente oculta)
        const patternInfo = document.createElement('div');
        patternInfo.className = 'pattern-info hidden';
        patternInfo.innerHTML = `
            <div class="pattern-type">Tipo: ${pattern.type}</div>
            <div class="pattern-description">${pattern.pattern}</div>
        `;
        
        // Cria opções de resposta
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        pattern.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'pattern-option';
            optionElement.innerHTML = `
                <div class="option-content">${option}</div>
                <div class="option-number">${index + 1}</div>
            `;
            optionElement.onclick = () => checkAnswer(option, pattern.answer);
            optionsContainer.appendChild(optionElement);
        });
        
        // Monta a interface
        document.getElementById('patternArea').appendChild(sequenceElement);
        document.getElementById('patternArea').appendChild(patternInfo);
        document.getElementById('optionsArea').appendChild(optionsContainer);
        
        // Inicia timer
        startTimer(level.timeLimit);
        
        // Atualiza displays
        updateDisplays();
        
        // Mostra feedback inicial
        showFeedback('🔍 Analise o padrão e escolha a opção correta!', 'info');
    }
    
    // Função para iniciar timer
    function startTimer(duration) {
        timeLeft = duration;
        const startTime = Date.now();
        const endTime = startTime + duration;
        
        updateTimerDisplay();
        
        timer = setInterval(() => {
            const now = Date.now();
            timeLeft = Math.max(0, endTime - now);
            
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 100);
    }
    
    // Função para atualizar display do timer
    function updateTimerDisplay() {
        const timeFill = document.getElementById('timeFill');
        const timeText = document.getElementById('timeText');
        const level = levels[currentLevel];
        
        const percentage = (timeLeft / level.timeLimit) * 100;
        timeFill.style.width = `${percentage}%`;
        timeText.textContent = `${(timeLeft / 1000).toFixed(1)}s`;
        
        // Efeito visual de urgência
        if (percentage < 25) {
            timeFill.style.background = '#ff6b6b';
            timeText.style.color = '#ff6b6b';
        } else if (percentage < 50) {
            timeFill.style.background = '#ffa726';
            timeText.style.color = '#ffa726';
        }
    }
    
    // Função para verificar resposta
    function checkAnswer(selectedAnswer, correctAnswer) {
        clearInterval(timer);
        
        const options = document.querySelectorAll('.pattern-option');
        options.forEach(opt => opt.style.pointerEvents = 'none');
        
        const level = levels[currentLevel];
        
        if (selectedAnswer === correctAnswer) {
            // RESPOSTA CORRETA
            streak++;
            
            // Calcula pontos com bônus de tempo
            const timeBonus = Math.floor((timeLeft / level.timeLimit) * level.points);
            const totalPoints = level.points + timeBonus;
            score += totalPoints;
            addScore(totalPoints);
            
            // Feedback visual
            document.querySelectorAll('.pattern-option').forEach(opt => {
                if (opt.querySelector('.option-content').textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            // Preenche o slot missing
            const missingSlot = document.querySelector('.missing-slot');
            if (missingSlot) {
                missingSlot.textContent = correctAnswer;
                missingSlot.classList.add('revealed');
            }
            
            showFeedback(
                `🎉 Correto! +${totalPoints} pontos (${level.points} base + ${timeBonus} tempo)`,
                'correct'
            );
            
            // Mostra explicação
            const patternInfo = document.querySelector('.pattern-info');
            patternInfo.classList.remove('hidden');
            patternInfo.innerHTML += `<div class="pattern-explanation">${patternsBank[currentLevel][currentPatternIndex].explanation}</div>`;
            
            // Próximo padrão
            currentPatternIndex++;
            setTimeout(loadNextPattern, 3000);
            
        } else {
            // RESPOSTA INCORRETA
            streak = 0;
            
            // Feedback visual
            document.querySelectorAll('.pattern-option').forEach(opt => {
                const content = opt.querySelector('.option-content').textContent;
                if (content === selectedAnswer) {
                    opt.classList.add('incorrect');
                }
                if (content === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            showFeedback('💡 Tente novamente! Observe o padrão com atenção.', 'incorrect');
            
            // Reinicia o timer para nova tentativa
            setTimeout(() => {
                loadNextPattern();
            }, 3000);
        }
        
        updateDisplays();
    }
    
    // Função para tempo esgotado
    function handleTimeOut() {
        streak = 0;
        
        const pattern = patternsBank[currentLevel][currentPatternIndex];
        
        // Mostra resposta correta
        document.querySelectorAll('.pattern-option').forEach(opt => {
            if (opt.querySelector('.option-content').textContent === pattern.answer) {
                opt.classList.add('correct');
            }
        });
        
        const missingSlot = document.querySelector('.missing-slot');
        if (missingSlot) {
            missingSlot.textContent = pattern.answer;
            missingSlot.classList.add('revealed');
        }
        
        showFeedback('⏰ Tempo esgotado! Tente ser mais rápido na próxima.', 'timeout');
        
        // Mostra explicação
        const patternInfo = document.querySelector('.pattern-info');
        patternInfo.classList.remove('hidden');
        patternInfo.innerHTML += `<div class="pattern-explanation">${pattern.explanation}</div>`;
        
        // Próximo padrão
        currentPatternIndex++;
        setTimeout(loadNextPattern, 3000);
        
        updateDisplays();
    }
    
    // Função para mostrar dica
    function showHint() {
        const pattern = patternsBank[currentLevel][currentPatternIndex];
        showFeedback(`💡 Dica: ${pattern.pattern}`, 'hint');
        addScore(-5); // Penalidade por usar dica
        updateDisplays();
    }
    
    // Função para mostrar tela de vitória
    function showVictoryScreen() {
        const level = levels[currentLevel];
        
        patternsGame.innerHTML = '';
        
        const victoryScreen = document.createElement('div');
        victoryScreen.className = 'victory-screen';
        victoryScreen.style.borderColor = level.color;
        victoryScreen.innerHTML = `
            <div class="victory-content">
                <div class="victory-icon">🏆</div>
                <h2>Nível ${level.name} Concluído!</h2>
                <div class="victory-stats">
                    <div class="victory-stat">
                        <span class="label">Pontuação Final</span>
                        <span class="value">${score}</span>
                    </div>
                    <div class="victory-stat">
                        <span class="label">Padrões Resolvidos</span>
                        <span class="value">${patternsBank[currentLevel].length}/${patternsBank[currentLevel].length}</span>
                    </div>
                    <div class="victory-stat">
                        <span class="label">Melhor Sequência</span>
                        <span class="value">${streak}</span>
                    </div>
                </div>
                <div class="victory-actions">
                    <button class="victory-button replay-button" style="background: ${level.color}">
                        🔄 Jogar Novamente
                    </button>
                    <button class="victory-button levels-button">
                        📊 Trocar Nível
                    </button>
                </div>
            </div>
        `;
        
        victoryScreen.querySelector('.replay-button').onclick = () => startLevel(currentLevel);
        victoryScreen.querySelector('.levels-button').onclick = showLevelSelection;
        
        patternsGame.appendChild(victoryScreen);
    }
    
    // Função para atualizar displays
    function updateDisplays() {
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentStreak').textContent = streak;
        document.getElementById('currentPattern').textContent = `${currentPatternIndex + 1}/${patternsBank[currentLevel].length}`;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.patterns-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `patterns-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes da área de opções
        const optionsArea = document.getElementById('optionsArea');
        optionsArea.parentNode.insertBefore(feedback, optionsArea);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }
}

// JOGO 12 Memórias de Posições
// Jogo 12: Memória de Posições (Versão Funcional e Atrativa)
function loadPositionGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Memória de Posições';
    gameInstructions.textContent = 'Memorize a localização dos objetos na grade. Depois, clique nas posições corretas! Quanto maior a grade, maior a pontuação.';
    
    // Limpa a área do jogo
    gameArea.innerHTML = '';
    
    // Sistema de níveis de dificuldade
    const difficultyLevels = {
        FACIL: {
            name: 'Fácil',
            gridSize: 3,
            items: 3,
            displayTime: 3000,
            color: '#4CAF50',
            points: 10
        },
        MEDIO: {
            name: 'Médio', 
            gridSize: 4,
            items: 5,
            displayTime: 4000,
            color: '#FF9800',
            points: 20
        },
        DIFICIL: {
            name: 'Difícil',
            gridSize: 5,
            items: 8,
            displayTime: 5000,
            color: '#F44336',
            points: 30
        },
        EXPERT: {
            name: 'Expert',
            gridSize: 6,
            items: 12,
            displayTime: 6000,
            color: '#9C27B0',
            points: 50
        }
    };
    
    // Banco de símbolos para os itens
    const symbols = ['⭐', '🔴', '🔵', '🟢', '🟡', '🟣', '🔶', '🔷', '❤️', '💙', '💚', '💛', '💜', '🧡', '💖'];
    
    // Variáveis de estado do jogo
    let currentDifficulty = null;
    let currentRound = 1;
    let score = 0;
    let streak = 0;
    let bestStreak = 0;
    let targetPositions = [];
    let userSelections = [];
    let gamePhase = 'selection'; // 'selection', 'memorization', 'recall'
    let memorizationTimer;
    
    // Cria o container do jogo
    const positionGame = document.createElement('div');
    positionGame.className = 'position-game-container';
    
    // Mostra seleção de dificuldade inicialmente
    showDifficultySelection();
    
    // Função para mostrar seleção de dificuldade
    function showDifficultySelection() {
        positionGame.innerHTML = '';
        
        const selectionScreen = document.createElement('div');
        selectionScreen.className = 'difficulty-selection';
        selectionScreen.innerHTML = `
            <h2>🎯 Escolha a Dificuldade</h2>
            <p class="selection-description">Selecione o nível de desafio para testar sua memória visual!</p>
        `;
        
        const levelsContainer = document.createElement('div');
        levelsContainer.className = 'difficulty-levels';
        
        Object.entries(difficultyLevels).forEach(([key, level]) => {
            const levelCard = document.createElement('div');
            levelCard.className = 'difficulty-card';
            levelCard.style.borderColor = level.color;
            levelCard.innerHTML = `
                <div class="difficulty-header" style="background: ${level.color}">
                    <h3>${level.name}</h3>
                    <div class="difficulty-points">${level.points} pts</div>
                </div>
                <div class="difficulty-body">
                    <div class="difficulty-stats">
                        <div class="stat">
                            <span class="label">Grade</span>
                            <span class="value">${level.gridSize}×${level.gridSize}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Itens</span>
                            <span class="value">${level.items}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Tempo</span>
                            <span class="value">${level.displayTime/1000}s</span>
                        </div>
                    </div>
                    <div class="difficulty-preview">
                        ${generateGridPreview(level.gridSize, level.items)}
                    </div>
                </div>
                <button class="difficulty-select-button" style="background: ${level.color}">
                    🧠 Iniciar Desafio
                </button>
            `;
            
            levelCard.querySelector('.difficulty-select-button').onclick = () => startGame(key);
            levelsContainer.appendChild(levelCard);
        });
        
        selectionScreen.appendChild(levelsContainer);
        positionGame.appendChild(selectionScreen);
        gameArea.appendChild(positionGame);
    }
    
    // Função para gerar preview da grade
    function generateGridPreview(size, items) {
        let preview = '<div class="grid-preview">';
        const totalCells = size * size;
        const itemPositions = [];
        
        // Seleciona posições aleatórias para os itens
        while (itemPositions.length < items) {
            const pos = Math.floor(Math.random() * totalCells);
            if (!itemPositions.includes(pos)) {
                itemPositions.push(pos);
            }
        }
        
        // Cria a grade preview
        for (let i = 0; i < totalCells; i++) {
            const hasItem = itemPositions.includes(i);
            preview += `<div class="preview-cell ${hasItem ? 'has-item' : ''}">${hasItem ? '●' : ''}</div>`;
        }
        
        preview += '</div>';
        return preview;
    }
    
    // Função para iniciar o jogo
    function startGame(difficultyKey) {
        currentDifficulty = difficultyKey;
        currentRound = 1;
        score = 0;
        streak = 0;
        
        showGameInterface();
        startNewRound();
    }
    
    // Função para mostrar interface do jogo
    function showGameInterface() {
        const level = difficultyLevels[currentDifficulty];
        
        positionGame.innerHTML = '';
        
        // Cria display de informações
        const infoDisplay = document.createElement('div');
        infoDisplay.className = 'position-info';
        infoDisplay.style.borderColor = level.color;
        infoDisplay.innerHTML = `
            <div class="position-header">
                <div class="difficulty-badge" style="background: ${level.color}">
                    ${level.name}
                </div>
                <div class="position-stats">
                    <div class="stat">
                        <span class="label">Rodada</span>
                        <span class="value" id="currentRound">${currentRound}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="currentScore">${score}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="currentStreak">${streak}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Melhor</span>
                        <span class="value" id="bestStreak">${bestStreak}</span>
                    </div>
                </div>
            </div>
            <div class="phase-indicator" id="phaseIndicator">
                <div class="phase-text">Memorize as posições!</div>
                <div class="phase-timer" id="phaseTimer">${level.displayTime/1000}s</div>
            </div>
        `;
        
        // Cria área da grade
        const gridArea = document.createElement('div');
        gridArea.className = 'grid-area';
        gridArea.id = 'gridArea';
        
        // Cria área de controles
        const controlsArea = document.createElement('div');
        controlsArea.className = 'position-controls';
        
        const restartButton = document.createElement('button');
        restartButton.className = 'control-button restart-button';
        restartButton.innerHTML = '🔄 Nova Rodada';
        restartButton.onclick = startNewRound;
        
        const levelButton = document.createElement('button');
        levelButton.className = 'control-button level-button';
        levelButton.innerHTML = '📊 Trocar Dificuldade';
        levelButton.onclick = showDifficultySelection;
        
        controlsArea.appendChild(restartButton);
        controlsArea.appendChild(levelButton);
        
        // Monta o jogo
        positionGame.appendChild(infoDisplay);
        positionGame.appendChild(gridArea);
        positionGame.appendChild(controlsArea);
    }
    
    // Função para iniciar nova rodada
    function startNewRound() {
        const level = difficultyLevels[currentDifficulty];
        
        // Reseta estado da rodada
        targetPositions = [];
        userSelections = [];
        gamePhase = 'memorization';
        
        // Gera posições aleatórias para os itens
        const totalCells = level.gridSize * level.gridSize;
        const availableSymbols = [...symbols].sort(() => Math.random() - 0.5);
        
        while (targetPositions.length < level.items) {
            const randomPos = Math.floor(Math.random() * totalCells);
            if (!targetPositions.includes(randomPos)) {
                targetPositions.push({
                    position: randomPos,
                    symbol: availableSymbols[targetPositions.length]
                });
            }
        }
        
        // Cria a grade de memorização
        createMemorizationGrid();
        
        // Inicia fase de memorização
        startMemorizationPhase();
    }
    
    // Função para criar grade de memorização (VERSÃO CORRIGIDA)
function createMemorizationGrid() {
    const level = difficultyLevels[currentDifficulty];
    const gridArea = document.getElementById('gridArea');
    
    gridArea.innerHTML = '';
    gridArea.className = 'grid-area memorization-phase';
    
    const grid = document.createElement('div');
    grid.className = 'memory-grid';
    
    // CORREÇÃO: Definir o grid-template-columns corretamente
    grid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    grid.style.width = '100%';
    grid.style.maxWidth = '500px';
    grid.style.margin = '0 auto';
    
    // Cria as células da grade
    for (let i = 0; i < level.gridSize * level.gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.setAttribute('data-position', i);
        
        // CORREÇÃO: Garantir tamanho consistente
        cell.style.minWidth = '60px';
        cell.style.minHeight = '60px';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.position = 'relative';
        
        // Verifica se esta célula tem um item
        const targetItem = targetPositions.find(item => item.position === i);
        if (targetItem) {
            cell.classList.add('has-item');
            
            const symbol = document.createElement('div');
            symbol.className = 'item-symbol';
            symbol.textContent = targetItem.symbol;
            symbol.style.fontSize = '1.8rem';
            symbol.style.color = 'white';
            symbol.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            symbol.style.zIndex = '2';
            symbol.style.position = 'relative';
            
            const glow = document.createElement('div');
            glow.className = 'item-glow';
            glow.style.position = 'absolute';
            glow.style.top = '50%';
            glow.style.left = '50%';
            glow.style.width = '0';
            glow.style.height = '0';
            glow.style.background = 'rgba(255, 255, 255, 0.4)';
            glow.style.borderRadius = '50%';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.animation = 'glow-expand 2s infinite';
            
            cell.appendChild(symbol);
            cell.appendChild(glow);
        }
        
        grid.appendChild(cell);
    }
    
    gridArea.appendChild(grid);
    
    // CORREÇÃO: Forçar redimensionamento
    setTimeout(() => {
        grid.style.display = 'grid';
    }, 10);
}
    // Função para iniciar fase de memorização
    function startMemorizationPhase() {
        const level = difficultyLevels[currentDifficulty];
        let timeLeft = level.displayTime;
        
        // Atualiza o timer
        const timerElement = document.getElementById('phaseTimer');
        const updateTimer = () => {
            timeLeft -= 100;
            timerElement.textContent = `${(timeLeft / 1000).toFixed(1)}s`;
            
            // Efeito visual de urgência
            if (timeLeft < 2000) {
                timerElement.style.color = '#ff6b6b';
                timerElement.style.fontWeight = 'bold';
            }
            
            if (timeLeft <= 0) {
                clearInterval(memorizationTimer);
                startRecallPhase();
            }
        };
        
        memorizationTimer = setInterval(updateTimer, 100);
        
        // Mostra instruções
        showFeedback(`🧠 Memorize as ${level.items} posições marcadas!`, 'memorization');
    }
    
    // Função para iniciar fase de recordação
    function startRecallPhase() {
        gamePhase = 'recall';
        
        // Cria grade interativa para recordação
        createRecallGrid();
        
        // Atualiza indicador de fase
        updatePhaseIndicator('recall');
        
        // Mostra instruções
        showFeedback('🎯 Agora clique nas posições que tinham itens!', 'recall');
    }
    
    // Função para criar grade de recordação (VERSÃO CORRIGIDA)
function createRecallGrid() {
    const level = difficultyLevels[currentDifficulty];
    const gridArea = document.getElementById('gridArea');
    
    gridArea.innerHTML = '';
    gridArea.className = 'grid-area recall-phase';
    
    const grid = document.createElement('div');
    grid.className = 'memory-grid interactive';
    
    // CORREÇÃO: Definir o grid-template-columns corretamente
    grid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    grid.style.width = '100%';
    grid.style.maxWidth = '500px'; // Limitar largura máxima
    grid.style.margin = '0 auto';
    
    // Cria células interativas
    for (let i = 0; i < level.gridSize * level.gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell interactive';
        cell.setAttribute('data-position', i);
        
        // CORREÇÃO: Garantir que as células tenham tamanho consistente
        cell.style.minWidth = '60px';
        cell.style.minHeight = '60px';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.position = 'relative';
        
        // Adiciona número de referência
        const cellNumber = document.createElement('div');
        cellNumber.className = 'cell-number';
        cellNumber.textContent = i + 1;
        cellNumber.style.position = 'absolute';
        cellNumber.style.top = '4px';
        cellNumber.style.left = '4px';
        cellNumber.style.background = 'rgba(0, 0, 0, 0.1)';
        cellNumber.style.color = 'rgba(0, 0, 0, 0.6)';
        cellNumber.style.width = '20px';
        cellNumber.style.height = '20px';
        cellNumber.style.borderRadius = '50%';
        cellNumber.style.fontSize = '0.7rem';
        cellNumber.style.display = 'flex';
        cellNumber.style.alignItems = 'center';
        cellNumber.style.justifyContent = 'center';
        cellNumber.style.fontWeight = 'bold';
        
        cell.appendChild(cellNumber);
        
        // Evento de clique
        cell.addEventListener('click', () => handleCellClick(i));
        
        grid.appendChild(cell);
    }
    
    gridArea.appendChild(grid);
    
    // CORREÇÃO: Forçar redimensionamento
    setTimeout(() => {
        grid.style.display = 'grid';
    }, 10);
}
    // Função para lidar com clique na célula
    function handleCellClick(position) {
        if (gamePhase !== 'recall') return;
        
        const cell = document.querySelector(`.grid-cell[data-position="${position}"]`);
        const level = difficultyLevels[currentDifficulty];
        
        // Verifica se já foi selecionada
        if (userSelections.includes(position)) {
            showFeedback('⚠️ Esta posição já foi selecionada!', 'warning', 1500);
            return;
        }
        
        // Adiciona à seleção do usuário
        userSelections.push(position);
        
        // Verifica se é uma posição correta
        const isCorrect = targetPositions.some(item => item.position === position);
        
        if (isCorrect) {
            // ACERTOU
            cell.classList.add('correct');
            cell.innerHTML += '<div class="selection-feedback">✅</div>';
            
            showFeedback('🎉 Posição correta!', 'success', 1000);
            
            // Verifica se completou todas as posições
            if (userSelections.length === targetPositions.length) {
                checkRoundCompletion();
            }
            
        } else {
            // ERROU
            cell.classList.add('incorrect');
            cell.innerHTML += '<div class="selection-feedback">❌</div>';
            
            showFeedback('💡 Esta posição não tinha item!', 'error', 1500);
            
            // Mostra a posição correta que deveria ter sido selecionada
            highlightMissedPositions();
        }
    }
    
    // Função para verificar conclusão da rodada
    function checkRoundCompletion() {
        const level = difficultyLevels[currentDifficulty];
        
        // Calcula acertos
        const correctSelections = userSelections.filter(pos => 
            targetPositions.some(item => item.position === pos)
        ).length;
        
        const accuracy = (correctSelections / level.items) * 100;
        
        if (accuracy === 100) {
            // RODADA PERFEITA
            streak++;
            if (streak > bestStreak) {
                bestStreak = streak;
            }
            
            const roundPoints = level.points + Math.floor(streak * 5);
            score += roundPoints;
            addScore(roundPoints);
            
            showFeedback(
                `🏆 Perfeito! +${roundPoints} pontos (${level.points} base + ${streak * 5} sequência)`,
                'perfect'
            );
            
        } else {
            // RODADA COM ERROS
            streak = 0;
            const roundPoints = Math.floor(level.points * (accuracy / 100));
            score += roundPoints;
            addScore(roundPoints);
            
            showFeedback(
                `📊 Você acertou ${correctSelections} de ${level.items} posições (${Math.floor(accuracy)}%) +${roundPoints} pontos`,
                'partial'
            );
        }
        
        // Mostra resultado final
        setTimeout(() => {
            showRoundResult(correctSelections, level.items);
        }, 2000);
        
        updateDisplays();
    }
    
    // Função para mostrar resultado da rodada
    function showRoundResult(correct, total) {
        const level = difficultyLevels[currentDifficulty];
        const gridArea = document.getElementById('gridArea');
        
        // Cria grade com resultado
        gridArea.innerHTML = '';
        gridArea.className = 'grid-area result-phase';
        
        const grid = document.createElement('div');
        grid.className = 'memory-grid result';
        grid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
        
        for (let i = 0; i < level.gridSize * level.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell result';
            
            const wasTarget = targetPositions.some(item => item.position === i);
            const wasSelected = userSelections.includes(i);
            
            if (wasTarget && wasSelected) {
                // Acertou
                cell.classList.add('correct-hit');
                const targetItem = targetPositions.find(item => item.position === i);
                cell.innerHTML = `<div class="item-symbol">${targetItem.symbol}</div><div class="result-indicator">✅</div>`;
            } else if (wasTarget && !wasSelected) {
                // Esqueceu
                cell.classList.add('missed');
                const targetItem = targetPositions.find(item => item.position === i);
                cell.innerHTML = `<div class="item-symbol">${targetItem.symbol}</div><div class="result-indicator">💡</div>`;
            } else if (!wasTarget && wasSelected) {
                // Errou
                cell.classList.add('wrong-guess');
                cell.innerHTML = `<div class="result-indicator">❌</div>`;
            } else {
                // Vazio
                cell.classList.add('empty');
            }
            
            // Número da célula
            const cellNumber = document.createElement('div');
            cellNumber.className = 'cell-number';
            cellNumber.textContent = i + 1;
            cell.appendChild(cellNumber);
            
            grid.appendChild(cell);
        }
        
        gridArea.appendChild(grid);
        
        // Prepara próxima rodada
        currentRound++;
        setTimeout(startNewRound, 5000);
    }
    
    // Função para destacar posições esquecidas
    function highlightMissedPositions() {
        const missedPositions = targetPositions.filter(item => 
            !userSelections.includes(item.position)
        );
        
        missedPositions.forEach(item => {
            const cell = document.querySelector(`.grid-cell[data-position="${item.position}"]`);
            if (cell && !cell.classList.contains('correct')) {
                cell.classList.add('should-have');
                setTimeout(() => cell.classList.remove('should-have'), 1000);
            }
        });
    }
    
    // Função para atualizar indicador de fase
    function updatePhaseIndicator(phase, time = null) {
        const indicator = document.getElementById('phaseIndicator');
        const timer = document.getElementById('phaseTimer');
        
        indicator.className = `phase-indicator ${phase}`;
        
        switch (phase) {
            case 'memorization':
                indicator.querySelector('.phase-text').textContent = '🧠 Memorize as posições!';
                timer.textContent = time ? `${time/1000}s` : '';
                timer.style.color = '';
                break;
            case 'recall':
                indicator.querySelector('.phase-text').textContent = '🎯 Clique nas posições memorizadas!';
                timer.textContent = 'Sem tempo limite';
                timer.style.color = '#666';
                break;
        }
    }
    
    // Função para atualizar displays
    function updateDisplays() {
        document.getElementById('currentRound').textContent = currentRound;
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentStreak').textContent = streak;
        document.getElementById('bestStreak').textContent = bestStreak;
    }
    
    // Função para mostrar feedback
    function showFeedback(message, type, duration = 3000) {
        // Remove feedback anterior
        const existingFeedback = document.querySelector('.position-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = `position-feedback ${type}`;
        feedback.textContent = message;
        
        // Insere antes da área da grade
        const gridArea = document.getElementById('gridArea');
        gridArea.parentNode.insertBefore(feedback, gridArea);
        
        // Remove após um tempo
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, duration);
    }
}


//JOGO 13 Ordenação Numérica
// Jogo 13 - Ordenação Numérica
function loadOrderingGame() {
    const gameArea = document.getElementById('gameArea');
    const gameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameStats = document.getElementById('gameStats');

    // Configuração do jogo
    gameTitle.textContent = 'Ordenação Numérica';
    gameInstructions.innerHTML = `
        <div class="ordering-instructions">
            <h4>Vamos Ordenar!</h4>
        </div>
    `;

    // HTML do jogo
    gameArea.innerHTML = `
        <div class="ordering-game-container">
            <div class="ordering-info">
                <div class="ordering-stats">
                    <div class="stat">
                        <span class="label">Tentativas</span>
                        <span class="value" id="orderingAttempts">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Tempo</span>
                        <span class="value" id="orderingTimer">00:00</span>
                    </div>
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="orderingScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Nível</span>
                        <span class="value" id="orderingLevel">1</span>
                    </div>
                </div>
            </div>

            <div class="ordering-area">
                <div class="order-type-display" id="orderTypeDisplay">
                    Ordene em ordem crescente
                </div>
                
                <div class="numbers-container" id="numbersContainer">
                    <!-- Os números serão gerados aqui -->
                </div>

                <div class="ordering-controls">
                    <button class="ordering-button check-button" id="checkOrder">
                        <i class="fas fa-check"></i> Verificar
                    </button>
                    <button class="ordering-button hint-button" id="hintOrder">
                        <i class="fas fa-lightbulb"></i> Dica
                    </button>
                    <button class="ordering-button restart-button" id="restartOrder">
                        <i class="fas fa-redo"></i> Reiniciar
                    </button>
                    <button class="ordering-button new-game-button" id="newGameOrder">
                        <i class="fas fa-plus"></i> Novo Jogo
                    </button>
                </div>

                <div class="ordering-feedback info" id="orderingFeedback">
                    Arraste os números para ordená-los corretamente!
                </div>

                <div class="progress-section">
                    <div class="progress-text">
                        Progresso: <span id="progressText">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Variáveis do jogo
    let numbers = [];
    let attempts = 0;
    let score = 0;
    let timer = 0;
    let timerInterval;
    let isAscending = true;
    let gameStarted = false;
    let level = 1;
    let draggedElement = null;

    // Elementos do DOM
    const numbersContainer = document.getElementById('numbersContainer');
    const orderTypeDisplay = document.getElementById('orderTypeDisplay');
    const orderingAttempts = document.getElementById('orderingAttempts');
    const orderingTimer = document.getElementById('orderingTimer');
    const orderingScore = document.getElementById('orderingScore');
    const orderingLevel = document.getElementById('orderingLevel');
    const orderingFeedback = document.getElementById('orderingFeedback');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Inicializar o jogo
    function initGame() {
        // Gerar números baseado no nível
        const numbersCount = 8 + (level - 1) * 2; // 8, 10, 12, etc.
        numbers = generateRandomNumbers(numbersCount, level);
        
        // Decidir ordem (crescente ou decrescente)
        isAscending = Math.random() > 0.5;
        orderTypeDisplay.textContent = isAscending ? 
            "Ordene em ordem crescente" : "Ordene em ordem decrescente";
        
        // Embaralhar números
        shuffleArray(numbers);
        
        // Renderizar números
        renderNumbers();
        
        // Resetar estado do jogo
        attempts = 0;
        timer = 0;
        score = 0;
        gameStarted = true;
        
        // Atualizar display
        updateDisplay();
        showFeedback("Arraste os números para ordená-los!", "info");
        
        // Iniciar timer
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
        
        // Resetar progresso
        updateProgress(0);
    }

    // Gerar números aleatórios
    function generateRandomNumbers(count, level) {
        const numbers = [];
        const maxNumber = 20 + (level - 1) * 10; // Aumenta com o nível
        
        while (numbers.length < count) {
            const randomNum = Math.floor(Math.random() * maxNumber) + 1;
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    }

    // Embaralhar array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Renderizar números na tela
    function renderNumbers() {
        numbersContainer.innerHTML = '';
        numbers.forEach((num, index) => {
            const numberElement = document.createElement('div');
            numberElement.className = 'number-item';
            numberElement.textContent = num;
            numberElement.draggable = true;
            numberElement.dataset.index = index;
            
            // Eventos de drag and drop
            numberElement.addEventListener('dragstart', handleDragStart);
            numberElement.addEventListener('dragover', handleDragOver);
            numberElement.addEventListener('drop', handleDrop);
            numberElement.addEventListener('dragend', handleDragEnd);
            numberElement.addEventListener('dragenter', handleDragEnter);
            numberElement.addEventListener('dragleave', handleDragLeave);
            
            numbersContainer.appendChild(numberElement);
        });
    }

    // Atualizar display
    function updateDisplay() {
        orderingAttempts.textContent = attempts;
        orderingScore.textContent = score;
        orderingLevel.textContent = level;
        
        // Formatar timer
        const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        const seconds = (timer % 60).toString().padStart(2, '0');
        orderingTimer.textContent = `${minutes}:${seconds}`;
    }

    // Atualizar timer
    function updateTimer() {
        if (gameStarted) {
            timer++;
            updateDisplay();
        }
    }

    // Atualizar progresso
    function updateProgress(percentage) {
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}%`;
    }

    // Mostrar feedback
    function showFeedback(message, type) {
        orderingFeedback.textContent = message;
        orderingFeedback.className = `ordering-feedback ${type}`;
        
        // Auto-esconder após alguns segundos
        if (type !== 'success') {
            setTimeout(() => {
                orderingFeedback.classList.remove('show');
            }, 3000);
        }
    }

    // Verificar ordenação
    function checkOrder() {
        if (!gameStarted) return;
        
        attempts++;
        
        // Obter números atuais
        const currentNumbers = Array.from(numbersContainer.children).map(
            element => parseInt(element.textContent)
        );
        
        // Verificar se está correto
        let isCorrect = true;
        for (let i = 0; i < currentNumbers.length - 1; i++) {
            if (isAscending) {
                if (currentNumbers[i] > currentNumbers[i + 1]) {
                    isCorrect = false;
                    break;
                }
            } else {
                if (currentNumbers[i] < currentNumbers[i + 1]) {
                    isCorrect = false;
                    break;
                }
            }
        }
        
        if (isCorrect) {
            // Calcular pontuação
            const timeBonus = Math.max(500 - timer * 2, 100);
            const attemptBonus = Math.max(300 - attempts * 5, 50);
            score = timeBonus + attemptBonus + (level * 50);
            
            showFeedback(`Parabéns! Ordenação correta! +${score} pontos`, "success");
            gameStarted = false;
            clearInterval(timerInterval);
            
            // Marcar números como corretos
            Array.from(numbersContainer.children).forEach(element => {
                element.classList.add('correct');
            });
            
            // Atualizar progresso para 100%
            updateProgress(100);
            
            // Avançar nível após 2 segundos
            setTimeout(() => {
                level++;
                initGame();
            }, 2000);
            
        } else {
            showFeedback("A ordenação não está correta. Continue tentando!", "incorrect");
            
            // Destacar pares incorretos
            for (let i = 0; i < currentNumbers.length - 1; i++) {
                const elements = numbersContainer.children;
                if (isAscending && currentNumbers[i] > currentNumbers[i + 1]) {
                    elements[i].classList.add('incorrect');
                    elements[i + 1].classList.add('incorrect');
                    setTimeout(() => {
                        elements[i].classList.remove('incorrect');
                        elements[i + 1].classList.remove('incorrect');
                    }, 1000);
                } else if (!isAscending && currentNumbers[i] < currentNumbers[i + 1]) {
                    elements[i].classList.add('incorrect');
                    elements[i + 1].classList.add('incorrect');
                    setTimeout(() => {
                        elements[i].classList.remove('incorrect');
                        elements[i + 1].classList.remove('incorrect');
                    }, 1000);
                }
            }
            
            // Atualizar progresso baseado na precisão
            const accuracy = calculateAccuracy(currentNumbers);
            updateProgress(accuracy);
        }
        
        updateDisplay();
    }

    // Calcular precisão atual
    function calculateAccuracy(currentNumbers) {
        let correctPairs = 0;
        for (let i = 0; i < currentNumbers.length - 1; i++) {
            if (isAscending) {
                if (currentNumbers[i] <= currentNumbers[i + 1]) {
                    correctPairs++;
                }
            } else {
                if (currentNumbers[i] >= currentNumbers[i + 1]) {
                    correctPairs++;
                }
            }
        }
        return (correctPairs / (currentNumbers.length - 1)) * 100;
    }

    // Mostrar dica
    function showHint() {
        if (!gameStarted) return;
        
        const currentNumbers = Array.from(numbersContainer.children).map(
            element => parseInt(element.textContent)
        );
        
        // Encontrar primeiro par incorreto
        let hintIndex = -1;
        for (let i = 0; i < currentNumbers.length - 1; i++) {
            if (isAscending && currentNumbers[i] > currentNumbers[i + 1]) {
                hintIndex = i;
                break;
            } else if (!isAscending && currentNumbers[i] < currentNumbers[i + 1]) {
                hintIndex = i;
                break;
            }
        }
        
        if (hintIndex !== -1) {
            const elements = numbersContainer.children;
            elements[hintIndex].classList.add('incorrect');
            elements[hintIndex + 1].classList.add('incorrect');
            
            setTimeout(() => {
                elements[hintIndex].classList.remove('incorrect');
                elements[hintIndex + 1].classList.remove('incorrect');
            }, 1500);
            
            showFeedback(`Dica: Os números ${currentNumbers[hintIndex]} e ${currentNumbers[hintIndex + 1]} estão na posição errada!`, "hint");
        } else {
            showFeedback("Você está no caminho certo! Continue ajustando.", "info");
        }
    }

    // Funções de Drag and Drop
    function handleDragStart(e) {
        if (!gameStarted) return;
        
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.index);
        
        // Efeito visual
        setTimeout(() => {
            this.style.opacity = '0.4';
        }, 0);
    }

    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }

    function handleDragLeave() {
        this.classList.remove('drag-over');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (!gameStarted) return;
        
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const toIndex = parseInt(this.dataset.index);
        
        if (fromIndex !== toIndex) {
            // Trocar números no array
            [numbers[fromIndex], numbers[toIndex]] = [numbers[toIndex], numbers[fromIndex]];
            
            // Re-renderizar números
            renderNumbers();
            
            // Atualizar progresso
            const currentNumbers = Array.from(numbersContainer.children).map(
                element => parseInt(element.textContent)
            );
            const accuracy = calculateAccuracy(currentNumbers);
            updateProgress(accuracy);
        }
    }

    function handleDragEnd() {
        if (!gameStarted) return;
        
        this.classList.remove('dragging');
        this.style.opacity = '1';
        
        // Remover classes drag-over de todos os elementos
        Array.from(numbersContainer.children).forEach(element => {
            element.classList.remove('drag-over');
        });
    }

    // Event Listeners
    document.getElementById('checkOrder').addEventListener('click', checkOrder);
    document.getElementById('hintOrder').addEventListener('click', showHint);
    document.getElementById('restartOrder').addEventListener('click', initGame);
    document.getElementById('newGameOrder').addEventListener('click', function() {
        level = 1;
        initGame();
    });

    // Iniciar o jogo
    initGame();
}

// Jogo 14
function loadLettersGame() {
    const gameArea = document.getElementById('gameArea');
    const gameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameStats = document.getElementById('gameStats');

    gameTitle.textContent = 'Letras Iniciais';
    
    // HTML do jogo
    gameArea.innerHTML = `
        <div class="letters-game-container">
            <div class="letters-info">
                <div class="letters-stats">
                    <div class="stat">
                        <span class="label">Acertos</span>
                        <span class="value" id="lettersCorrect">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="lettersStreak">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="lettersScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Nível</span>
                        <span class="value" id="lettersLevel">1</span>
                    </div>
                </div>
            </div>

            <div class="letters-instructions">
                <h4>Identifique a Letra Inicial</h4>
                <p>Observe a palavra ou imagem e selecione a letra inicial correta.</p>
                <p>Use as dicas se precisar de ajuda!</p>
            </div>

            <div class="letters-area">
                <div class="word-display" id="wordDisplay">
                    <div class="word-image" id="wordImage">🐘</div>
                    <div class="word-text" id="wordText">Elefante</div>
                    <div class="word-hint" id="wordHint">Um animal grande com tromba</div>
                </div>

                <div class="letters-options" id="lettersOptions">
                    <!-- As opções de letras serão geradas aqui -->
                </div>

                <div class="letters-controls">
                    <button class="letters-button hint-button" id="hintLetter">
                        <i class="fas fa-lightbulb"></i> Dica da Letra
                    </button>
                    <button class="letters-button skip-button" id="skipWord">
                        <i class="fas fa-forward"></i> Pular
                    </button>
                    <button class="letters-button new-game-button" id="newGameLetters">
                        <i class="fas fa-plus"></i> Novo Jogo
                    </button>
                </div>

                <div class="letters-feedback info" id="lettersFeedback">
                    Clique na letra inicial da palavra!
                </div>

                <div class="progress-section">
                    <div class="progress-text">
                        Progresso: <span id="progressText">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Variáveis do jogo
    let currentWord = null;
    let correctAnswers = 0;
    let currentStreak = 0;
    let score = 0;
    let level = 1;
    let totalQuestions = 0;
    let usedWords = new Set();
    let hintUsed = false;

    // Banco de palavras e imagens
    const wordBank = [
        { word: "Abacaxi", emoji: "🍍", hint: "Fruta tropical com coroa", letter: "A" },
        { word: "Bola", emoji: "⚽", hint: "Objeto redondo para jogar", letter: "B" },
        { word: "Cachorro", emoji: "🐕", hint: "Animal doméstico que late", letter: "C" },
        { word: "Dinossauro", emoji: "🦖", hint: "Animal pré-histórico gigante", letter: "D" },
        { word: "Elefante", emoji: "🐘", hint: "Animal grande com tromba", letter: "E" },
        { word: "Fogo", emoji: "🔥", hint: "Produz calor e luz", letter: "F" },
        { word: "Gato", emoji: "🐱", hint: "Animal doméstico que mia", letter: "G" },
        { word: "Hipopótamo", emoji: "🦛", hint: "Animal grande que vive na água", letter: "H" },
        { word: "Igreja", emoji: "⛪", hint: "Lugar de culto religioso", letter: "I" },
        { word: "Jacaré", emoji: "🐊", hint: "Réptil que vive na água", letter: "J" },
        { word: "Koala", emoji: "🐨", hint: "Animal que come eucalipto", letter: "K" },
        { word: "Leão", emoji: "🦁", hint: "Rei da selva", letter: "L" },
        { word: "Macaco", emoji: "🐵", hint: "Animal que sobe em árvores", letter: "M" },
        { word: "Navio", emoji: "🚢", hint: "Transporte que navega no mar", letter: "N" },
        { word: "Ovo", emoji: "🥚", hint: "Alimento que vem da galinha", letter: "O" },
        { word: "Pato", emoji: "🦆", hint: "Ave que nada e grasna", letter: "P" },
        { word: "Queijo", emoji: "🧀", hint: "Alimento feito de leite", letter: "Q" },
        { word: "Rato", emoji: "🐭", hint: "Pequeno roedor", letter: "R" },
        { word: "Sol", emoji: "☀️", hint: "Estrela que ilumina a Terra", letter: "S" },
        { word: "Tigre", emoji: "🐯", hint: "Animal com listras laranja e preto", letter: "T" },
        { word: "Uva", emoji: "🍇", hint: "Fruta pequena em cachos", letter: "U" },
        { word: "Vaca", emoji: "🐄", hint: "Animal que dá leite", letter: "V" },
        { word: "Waffle", emoji: "🧇", hint: "Comida quadrada com quadradinhos", letter: "W" },
        { word: "Xadrez", emoji: "♟️", hint: "Jogo de tabuleiro com rei e rainha", letter: "X" },
        { word: "Yoga", emoji: "🧘", hint: "Prática de exercícios e meditação", letter: "Y" },
        { word: "Zebra", emoji: "🦓", hint: "Animal com listras pretas e brancas", letter: "Z" }
    ];

    // Elementos do DOM
    const wordImage = document.getElementById('wordImage');
    const wordText = document.getElementById('wordText');
    const wordHint = document.getElementById('wordHint');
    const lettersOptions = document.getElementById('lettersOptions');
    const lettersCorrect = document.getElementById('lettersCorrect');
    const lettersStreak = document.getElementById('lettersStreak');
    const lettersScore = document.getElementById('lettersScore');
    const lettersLevel = document.getElementById('lettersLevel');
    const lettersFeedback = document.getElementById('lettersFeedback');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Inicializar o jogo
    function initGame() {
        correctAnswers = 0;
        currentStreak = 0;
        score = 0;
        level = 1;
        totalQuestions = 0;
        usedWords.clear();
        hintUsed = false;
        
        updateDisplay();
        showFeedback("Encontre a letra inicial de cada palavra!", "info");
        nextWord();
        updateProgress();
    }

    // Próxima palavra
    function nextWord() {
        hintUsed = false;
        
        // Filtrar palavras não usadas
        const availableWords = wordBank.filter(item => !usedWords.has(item.word));
        
        if (availableWords.length === 0) {
            // Todas as palavras foram usadas, reiniciar
            usedWords.clear();
            level++;
            showFeedback(`Parabéns! Nível ${level} desbloqueado!`, "success");
            setTimeout(() => {
                nextWord();
            }, 2000);
            return;
        }
        
        // Escolher palavra aleatória
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        currentWord = availableWords[randomIndex];
        usedWords.add(currentWord.word);
        totalQuestions++;
        
        // Atualizar display
        wordImage.textContent = currentWord.emoji;
        wordText.textContent = currentWord.word;
        wordHint.textContent = currentWord.hint;
        
        // Gerar opções de letras
        generateLetterOptions();
        
        updateProgress();
    }

    // Gerar opções de letras
    function generateLetterOptions() {
        lettersOptions.innerHTML = '';
        const correctLetter = currentWord.letter;
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        // Embaralhar letras e garantir que a correta esteja incluída
        let options = [correctLetter];
        
        // Adicionar letras aleatórias
        const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const shuffledLetters = [...allLetters].filter(l => l !== correctLetter).sort(() => Math.random() - 0.5);
        
        options = options.concat(shuffledLetters.slice(0, 5));
        options.sort(() => Math.random() - 0.5);
        
        // Criar botões para cada letra
        options.forEach(letter => {
            const button = document.createElement('button');
            button.className = 'letter-option';
            button.textContent = letter;
            button.addEventListener('click', () => checkAnswer(letter));
            lettersOptions.appendChild(button);
        });
    }

    // Verificar resposta
    function checkAnswer(selectedLetter) {
        const isCorrect = selectedLetter === currentWord.letter;
        const letterButtons = document.querySelectorAll('.letter-option');
        
        // Desabilitar todos os botões
        letterButtons.forEach(btn => {
            btn.classList.add('disabled');
            btn.style.cursor = 'not-allowed';
        });
        
        // Destacar resposta correta e incorreta
        letterButtons.forEach(btn => {
            if (btn.textContent === currentWord.letter) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedLetter && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            correctAnswers++;
            currentStreak++;
            score += 10 + (currentStreak * 2);
            
            showFeedback(`Correto! "${currentWord.word}" começa com ${currentWord.letter}`, "correct");
            
            // Bônus por sequência
            if (currentStreak >= 3) {
                showFeedback(`Sequência incrível! ${currentStreak} acertos seguidos!`, "success");
            }
        } else {
            currentStreak = 0;
            showFeedback(`Ops! A letra correta era ${currentWord.letter}`, "incorrect");
        }
        
        updateDisplay();
        
        // Próxima palavra após 2 segundos
        setTimeout(() => {
            nextWord();
        }, 2000);
    }

    // Mostrar dica
    function showLetterHint() {
        if (hintUsed) return;
        
        hintUsed = true;
        const correctLetter = currentWord.letter;
        const letterButtons = document.querySelectorAll('.letter-option');
        
        // Piscar a letra correta
        letterButtons.forEach(btn => {
            if (btn.textContent === correctLetter) {
                btn.style.animation = 'pulse 1s 3';
                btn.style.border = '3px solid #ffeb3b';
            }
        });
        
        showFeedback(`Dica: A palavra começa com a letra ${correctLetter}`, "hint");
        score = Math.max(0, score - 5); // Penalidade por usar dica
        updateDisplay();
    }

    // Atualizar display
    function updateDisplay() {
        lettersCorrect.textContent = correctAnswers;
        lettersStreak.textContent = currentStreak;
        lettersScore.textContent = score;
        lettersLevel.textContent = level;
    }

    // Atualizar progresso
    function updateProgress() {
        const progress = (usedWords.size / wordBank.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // Mostrar feedback
    function showFeedback(message, type) {
        lettersFeedback.textContent = message;
        lettersFeedback.className = `letters-feedback ${type}`;
    }

    // Event Listeners
    document.getElementById('hintLetter').addEventListener('click', showLetterHint);
    document.getElementById('skipWord').addEventListener('click', nextWord);
    document.getElementById('newGameLetters').addEventListener('click', initGame);

    // Iniciar o jogo
    initGame();
}

// JOGO 15
function loadTexturesGame() {
    const gameArea = document.getElementById('gameArea');
    const gameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameStats = document.getElementById('gameStats');

    gameTitle.textContent = 'Discriminação Tátil';
    
    // HTML do jogo
    gameArea.innerHTML = `
        <div class="textures-game-container">
            <div class="textures-info">
                <div class="textures-stats">
                    <div class="stat">
                        <span class="label">Acertos</span>
                        <span class="value" id="texturesCorrect">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="texturesStreak">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="texturesScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Nível</span>
                        <span class="value" id="texturesLevel">-</span>
                    </div>
                </div>
            </div>

            <div class="level-selection" id="levelSelection">
                <h3>🌟 Escolha o Nível de Desafio 🌟</h3>
                <p style="color: #666; margin-bottom: 25px; font-size: 1.1rem;">
                    Selecione o nível que combina com sua experiência. Todos os níveis são divertidos e educativos!
                </p>
                
                <div class="levels-grid">
                    <div class="level-card" data-level="1">
                        <div class="level-icon">🟢</div>
                        <div class="level-title">Iniciante</div>
                        <div class="level-description">
                            Texturas familiares e contrastantes. Perfeito para começar sua jornada sensorial!
                        </div>
                        <div class="level-difficulty">
                            <div class="difficulty-dot active"></div>
                            <div class="difficulty-dot"></div>
                            <div class="difficulty-dot"></div>
                        </div>
                        <div style="font-size: 0.9rem; color: #4CAF50;">★ Fácil e Divertido ★</div>
                    </div>
                    
                    <div class="level-card" data-level="2">
                        <div class="level-icon">🟡</div>
                        <div class="level-title">Intermediário</div>
                        <div class="level-description">
                            Texturas mais sutis e descrições detalhadas. Para quem já tem alguma experiência!
                        </div>
                        <div class="level-difficulty">
                            <div class="difficulty-dot active"></div>
                            <div class="difficulty-dot active"></div>
                            <div class="difficulty-dot"></div>
                        </div>
                        <div style="font-size: 0.9rem; color: #FF9800;">★★ Desafio Moderado ★★</div>
                    </div>
                    
                    <div class="level-card" data-level="3">
                        <div class="level-icon">🔴</div>
                        <div class="level-title">Avançado</div>
                        <div class="level-description">
                            Texturas complexas e diferenças sutis. Para exploradores sensoriais experientes!
                        </div>
                        <div class="level-difficulty">
                            <div class="difficulty-dot active"></div>
                            <div class="difficulty-dot active"></div>
                            <div class="difficulty-dot active"></div>
                        </div>
                        <div style="font-size: 0.9rem; color: #F44336;">★★★ Super Desafio ★★★</div>
                    </div>
                </div>
                
                <button class="textures-button" id="startGame" style="margin-top: 30px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white;">
                    <i class="fas fa-play"></i> Começar Jornada Sensorial
                </button>
            </div>

            <div class="textures-area" id="gameAreaContent" style="display: none;">
                <div class="texture-description">
                    <div class="description-text" id="textureDescription">
                        Descrição da textura aparecerá aqui
                    </div>
                    <div class="description-hint" id="textureHint">
                        Dica contextual aparecerá aqui
                    </div>
                </div>

                <div class="textures-options" id="texturesOptions">
                    <!-- As opções serão geradas aqui -->
                </div>

                <div class="textures-controls">
                    <button class="textures-button hint-button" id="hintTexture">
                        <i class="fas fa-lightbulb"></i> Revelar Dica
                    </button>
                    <button class="textures-button skip-button" id="skipTexture">
                        <i class="fas fa-forward"></i> Próxima Textura
                    </button>
                    <button class="textures-button new-game-button" id="newGameTextures">
                        <i class="fas fa-redo"></i> Novo Jogo
                    </button>
                </div>

                <div class="textures-feedback info" id="texturesFeedback">
                    Escolha a textura que melhor combina com a descrição!
                </div>

                <div class="progress-section">
                    <div class="progress-text">
                        Progresso na Jornada: <span id="progressText">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Variáveis do jogo
    let currentLevel = null;
    let currentTexture = null;
    let correctAnswers = 0;
    let currentStreak = 0;
    let score = 0;
    let totalQuestions = 0;
    let usedTextures = new Set();
    let hintUsed = false;

    // Banco de texturas por nível
    const texturesBank = {
        1: [ // Nível Iniciante - Texturas bem distintas
            { 
                name: "Liso", 
                emoji: "🪞", 
                description: "Superfície uniforme sem irregularidades", 
                hint: "Como um espelho ou vidro polido",
                details: "Suave ao toque, sem saliências"
            },
            { 
                name: "Áspero", 
                emoji: "🪨", 
                description: "Superfície irregular com pequenas saliências", 
                hint: "Como uma lixa ou pedra áspera",
                details: "Rugoso, não desliza facilmente"
            },
            { 
                name: "Macio", 
                emoji: "🛏️", 
                description: "Superfície que cede facilmente ao toque", 
                hint: "Como um travesseiro ou algodão",
                details: "Confortável e aconchegante"
            },
            { 
                name: "Duro", 
                emoji: "🪵", 
                description: "Superfície que não cede ao toque", 
                hint: "Como madeira ou metal sólido",
                details: "Firme e resistente"
            },
            { 
                name: "Molhado", 
                emoji: "💧", 
                description: "Superfície coberta por líquido", 
                hint: "Como algo que acabou de sair da água",
                details: "Úmido e escorregadio"
            },
            { 
                name: "Fofo", 
                emoji: "☁️", 
                description: "Superfície leve e aerada", 
                hint: "Como uma nuvem ou marshmallow",
                details: "Macio e leve como algodão"
            }
        ],
        2: [ // Nível Intermediário - Texturas mais sutis
            { 
                name: "Aveludado", 
                emoji: "👑", 
                description: "Superfície suave com toque sedoso", 
                hint: "Como tecido de veludo ou pétalas",
                details: "Macio com leve resistência ao toque"
            },
            { 
                name: "Espinhoso", 
                emoji: "🌵", 
                description: "Superfície com pontas pequenas e afiadas", 
                hint: "Como um cacto ou ouriço",
                details: "Cuidado ao tocar - pode machucar!"
            },
            { 
                name: "Gelado", 
                emoji: "🧊", 
                description: "Superfície muito fria ao toque", 
                hint: "Como gelo ou metal no inverno",
                details: "Frio que quase queima a pele"
            },
            { 
                name: "Escorregadio", 
                emoji: "🧼", 
                description: "Superfície que dificulta a aderência", 
                hint: "Como sabão molhado ou gelo",
                details: "Difícil de segurar com firmeza"
            },
            { 
                name: "Peludo", 
                emoji: "🐻", 
                description: "Superfície coberta por pelos", 
                hint: "Como um urso de pelúcia ou animal",
                details: "Coberto de fios macios e flexíveis"
            },
            { 
                name: "Granulado", 
                emoji: "🧂", 
                description: "Superfície com pequenas partículas", 
                hint: "Como areia ou sal grosso",
                details: "Textura formada por grãos minúsculos"
            }
        ],
        3: [ // Nível Avançado - Diferenças sutis
            { 
                name: "Atexturado", 
                emoji: "🎨", 
                description: "Superfície sem padrão definido de textura", 
                hint: "Como tinta lisa ou plástico polido",
                details: "Uniforme sem características marcantes"
            },
            { 
                name: "Fibroso", 
                emoji: "🌾", 
                description: "Superfície composta por fibras entrelaçadas", 
                hint: "Como madeira natural ou palha",
                details: "Estrutura alongada e entrelaçada"
            },
            { 
                name: "Cristalino", 
                emoji: "💎", 
                description: "Superfície com padrões geométricos naturais", 
                hint: "Como cristais ou geodos",
                details: "Estrutura organizada em padrões"
            },
            { 
                name: "Poroso", 
                emoji: "🧽", 
                description: "Superfície com pequenos orifícios", 
                hint: "Como uma esponja ou pedra-pomes",
                details: "Cheio de minúsculos buracos"
            },
            { 
                name: "Viscoso", 
                emoji: "🪱", 
                description: "Superfície espessa e pegajosa", 
                hint: "Como mel ou geléia",
                details: "Lento para escorrer, grudento"
            },
            { 
                name: "Ceroso", 
                emoji: "🕯️", 
                description: "Superfície que amolece com o calor", 
                hint: "Como vela ou cera de abelha",
                details: "Maleável e levemente gorduroso"
            }
        ]
    };

    // Elementos do DOM
    const levelSelection = document.getElementById('levelSelection');
    const gameAreaContent = document.getElementById('gameAreaContent');
    const textureDescription = document.getElementById('textureDescription');
    const textureHint = document.getElementById('textureHint');
    const texturesOptions = document.getElementById('texturesOptions');
    const texturesCorrect = document.getElementById('texturesCorrect');
    const texturesStreak = document.getElementById('texturesStreak');
    const texturesScore = document.getElementById('texturesScore');
    const texturesLevel = document.getElementById('texturesLevel');
    const texturesFeedback = document.getElementById('texturesFeedback');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Inicializar seleção de nível
    function initLevelSelection() {
        const levelCards = document.querySelectorAll('.level-card');
        const startButton = document.getElementById('startGame');
        
        levelCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remover seleção anterior
                levelCards.forEach(c => c.classList.remove('active'));
                // Selecionar novo nível
                this.classList.add('active');
                currentLevel = parseInt(this.dataset.level);
            });
        });
        
        startButton.addEventListener('click', function() {
            if (!currentLevel) {
                showFeedback("Por favor, escolha um nível para começar!", "incorrect");
                return;
            }
            startGame();
        });
        
        // Selecionar primeiro nível por padrão
        levelCards[0].classList.add('active');
        currentLevel = 1;
    }

    // Iniciar jogo
    function startGame() {
        levelSelection.style.display = 'none';
        gameAreaContent.style.display = 'block';
        
        correctAnswers = 0;
        currentStreak = 0;
        score = 0;
        totalQuestions = 0;
        usedTextures.clear();
        hintUsed = false;
        
        texturesLevel.textContent = currentLevel;
        updateDisplay();
        showFeedback(`Nível ${currentLevel} iniciado! Identifique as texturas pelas descrições.`, "info");
        nextTexture();
        updateProgress();
    }

    // Próxima textura
    function nextTexture() {
        hintUsed = false;
        
        const availableTextures = texturesBank[currentLevel].filter(item => !usedTextures.has(item.name));
        
        if (availableTextures.length === 0) {
            // Todas as texturas foram usadas
            showFeedback(`Parabéns! Você completou todas as texturas do nível ${currentLevel}!`, "success");
            setTimeout(() => {
                // Voltar para seleção de nível
                levelSelection.style.display = 'block';
                gameAreaContent.style.display = 'none';
            }, 3000);
            return;
        }
        
        // Escolher textura aleatória
        const randomIndex = Math.floor(Math.random() * availableTextures.length);
        currentTexture = availableTextures[randomIndex];
        usedTextures.add(currentTexture.name);
        totalQuestions++;
        
        // Atualizar display
        textureDescription.textContent = `"${currentTexture.description}"`;
        textureHint.textContent = currentTexture.hint;
        
        // Gerar opções
        generateTextureOptions();
        
        updateProgress();
    }

    // Gerar opções de textura
    function generateTextureOptions() {
        texturesOptions.innerHTML = '';
        const correctTexture = currentTexture;
        const textures = texturesBank[currentLevel];
        
        // Embaralhar texturas e garantir que a correta esteja incluída
        let options = [correctTexture];
        
        // Adicionar texturas aleatórias
        const shuffledTextures = [...textures].filter(t => t.name !== correctTexture.name)
                                              .sort(() => Math.random() - 0.5);
        
        options = options.concat(shuffledTextures.slice(0, 3)); // Total de 4 opções
        options.sort(() => Math.random() - 0.5);
        
        // Criar botões para cada textura
        options.forEach(texture => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'texture-option';
            optionDiv.innerHTML = `
                <div class="texture-visual">${texture.emoji}</div>
                <div class="texture-name">${texture.name}</div>
                <div class="texture-details">${texture.details}</div>
            `;
            optionDiv.addEventListener('click', () => checkAnswer(texture));
            texturesOptions.appendChild(optionDiv);
        });
    }

    // Verificar resposta
    function checkAnswer(selectedTexture) {
        const isCorrect = selectedTexture.name === currentTexture.name;
        const textureOptions = document.querySelectorAll('.texture-option');
        
        // Desabilitar todas as opções
        textureOptions.forEach(option => {
            option.style.cursor = 'not-allowed';
            option.style.pointerEvents = 'none';
        });
        
        // Destacar resposta correta e incorreta
        textureOptions.forEach(option => {
            const optionName = option.querySelector('.texture-name').textContent;
            if (optionName === currentTexture.name) {
                option.classList.add('correct');
            } else if (optionName === selectedTexture.name && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            correctAnswers++;
            currentStreak++;
            score += 20 + (currentStreak * 5) + (currentLevel * 10);
            
            showFeedback(`✨ Perfeito! "${currentTexture.name}" é a resposta correta! ✨`, "correct");
            
            // Bônus por sequência
            if (currentStreak >= 3) {
                const bonus = currentStreak * 10;
                score += bonus;
                showFeedback(`🎉 Sequência incrível! ${currentStreak} acertos +${bonus} pontos! 🎉`, "success");
            }
        } else {
            currentStreak = 0;
            showFeedback(`Quase! A textura correta era "${currentTexture.name}". Continue tentando!`, "incorrect");
        }
        
        updateDisplay();
        
        // Próxima textura após 2 segundos
        setTimeout(() => {
            nextTexture();
        }, 2000);
    }

    // Mostrar dica
    function showTextureHint() {
        if (hintUsed) return;
        
        hintUsed = true;
        textureHint.style.opacity = '1';
        textureHint.style.fontWeight = 'bold';
        
        showFeedback(`Dica: ${currentTexture.hint}`, "hint");
        score = Math.max(0, score - 15); // Penalidade por usar dica
        updateDisplay();
    }

    // Atualizar display
    function updateDisplay() {
        texturesCorrect.textContent = correctAnswers;
        texturesStreak.textContent = currentStreak;
        texturesScore.textContent = score;
    }

    // Atualizar progresso
    function updateProgress() {
        const progress = (usedTextures.size / texturesBank[currentLevel].length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // Mostrar feedback
    function showFeedback(message, type) {
        texturesFeedback.textContent = message;
        texturesFeedback.className = `textures-feedback ${type}`;
    }

    // Novo jogo
    function newGame() {
        levelSelection.style.display = 'block';
        gameAreaContent.style.display = 'none';
        currentLevel = null;
    }

    // Event Listeners
    document.getElementById('hintTexture').addEventListener('click', showTextureHint);
    document.getElementById('skipTexture').addEventListener('click', nextTexture);
    document.getElementById('newGameTextures').addEventListener('click', newGame);

    // Inicializar seleção de nível
    initLevelSelection();
}

// JOGO 16
// =============================================================================
// QUEBRA-CABEÇA DESLIZANTE - VARIÁVEIS GLOBAIS
// =============================================================================
let slidingPuzzleGame = {
    board: [],
    size: 3,
    difficulty: 'medium',
    currentImage: 'natureza1',
    emptyPosition: { row: 0, col: 0 },
    moves: 0,
    startTime: null,
    timer: null,
    isCompleted: false,
    bestTimes: {}
};

// =============================================================================
// BANCO DE IMAGENS - CORRIGIDO PARA IMAGENS LOCAIS
// =============================================================================
const puzzleImages = {
    natureza1: {
        name: "Floresta",
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
        emoji: "🌲", // Fallback caso imagem não carregue
        color: "#4CAF50"
    },
    
    natureza2: {
        name: "Montanhas",
        url: "https://images.unsplash.com/photo-1464822759844-4c0a1e85367f?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1464822759844-4c0a1e85367f?w=100&h=100&fit=crop"
    },
    natureza3: {
        name: "Praia",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop"
    },
    animais1: {
        name: "Pássaros",
        url: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=100&h=100&fit=crop"
    },
    animais2: {
        name: "Gatinho",
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop"
    },
    animais3: {
        name: "Cachorro",
        url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop"
    },
    arte1: {
        name: "Arte Abstrata",
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop"
    },
    arte2: {
        name: "Cores",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        preview: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
    },
    
    // ✅ SUAS IMAGENS LOCAIS - CORRIGIDO:
    boasvindas: {
        name: "BoasVindas", 
        url: "./imagens/boasvindas.jpg",           // ✅ Usar ./ no início
        preview: "./imagens/boasvindas.jpg",       // ✅ Usar mesma imagem se preview não existir
        emoji: "👋",                               // ✅ Fallback
        color: "#FF6B6B"                           // ✅ Cor de fallback
    },
    imagem1: {
        name: "Imagem 1",   
        url: "./imagens/imagem1.jpg",      
        preview: "./imagens/imagem1.jpg",          // ✅ Mesma imagem para preview
        emoji: "🖼️",
        color: "#4ECDC4"
    },
    imagem2: {
        name: "Imagem 2",   
        url: "./imagens/imagem2.jpg",      
        preview: "./imagens/imagem2.jpg",
        emoji: "🎨", 
        color: "#45B7D1"
    },
    imagem3: {              
        name: "Imagem 3",
        url: "./imagens/imagem3.jpg",
        preview: "./imagens/imagem3.jpg",
        emoji: "🌟",
        color: "#96CEB4"
    },
    imagem4: {  
        name: "Imagem 4",
        url: "./imagens/imagem4.jpg",
        preview: "./imagens/imagem4.jpg",
        emoji: "💫",
        color: "#FFEAA7"
    }
};

// =============================================================================
// FUNÇÃO PRINCIPAL - CARREGAR QUEBRA-CABEÇA DESLIZANTE
// =============================================================================
function loadSlidingPuzzleGame() {
    const gameArea = document.getElementById('gameArea');
    const instructions = document.getElementById('gameInstructions');
    const gameTitle = document.getElementById('activeGameTitle');
    
    gameTitle.textContent = 'Quebra-Cabeça Deslizante';
    instructions.innerHTML = `
        <h4>Como Jogar:</h4>
        <ul>
            <li>Escolha uma imagem e nível de dificuldade</li>
            <li>Clique nas peças adjacentes ao espaço vazio para movê-las</li>
            <li>Reorganize as peças para formar a imagem original</li>
            <li>Tente completar no menor tempo possível</li>
            <li>Use "Embaralhar" para reiniciar o puzzle</li>
        </ul>
    `;
    
    gameArea.innerHTML = `
        <div class="sliding-puzzle-container">
            <!-- Seleção de Imagem -->
            <div class="sliding-puzzle-image-select">
                <h4>Escolha a imagem:</h4>
                <div class="sliding-puzzle-image-buttons" id="imageButtons"></div>
            </div>

            <!-- Controles de Dificuldade -->
            <div class="sliding-puzzle-controls">
                <button class="sliding-puzzle-btn active" data-difficulty="easy">
                    2x2 (Fácil)
                </button>
                <button class="sliding-puzzle-btn" data-difficulty="medium">
                    3x3 (Médio)
                </button>
                <button class="sliding-puzzle-btn" data-difficulty="hard">
                    4x4 (Difícil)
                </button>
            </div>

            <!-- Área do Jogo -->
            <div class="sliding-puzzle-game-area">
                <!-- Tabuleiro -->
                <div class="sliding-puzzle-board" id="puzzleBoard"></div>

                <!-- Controles do Jogo -->
                <div class="sliding-puzzle-game-controls">
                    <button class="sliding-puzzle-action-btn primary" id="shuffleBtn">
                        🔄 Embaralhar
                    </button>
                    <button class="sliding-puzzle-action-btn secondary" id="showSolutionBtn">
                        👀 Ver Solução
                    </button>
                    <button class="sliding-puzzle-action-btn" id="newGameBtn">
                        🎮 Novo Jogo
                    </button>
                </div>

                <!-- Estatísticas -->
                <div class="sliding-puzzle-stats">
                    <div class="sliding-puzzle-stat">
                        <div class="sliding-puzzle-stat-value" id="movesCount">0</div>
                        <div class="sliding-puzzle-stat-label">Movimentos</div>
                    </div>
                    <div class="sliding-puzzle-stat">
                        <div class="sliding-puzzle-stat-value" id="puzzleTimer">00:00</div>
                        <div class="sliding-puzzle-stat-label">Tempo</div>
                    </div>
                    <div class="sliding-puzzle-stat">
                        <div class="sliding-puzzle-stat-value" id="currentTheme">-</div>
                        <div class="sliding-puzzle-stat-label">Tema</div>
                    </div>
                </div>

                <!-- Resultado -->
                <div id="puzzleResult"></div>
            </div>
        </div>
    `;
    
    initializeSlidingPuzzleGame();
}

// =============================================================================
// INICIALIZAÇÃO DO JOGO - CORRIGIDA
// =============================================================================
function initializeSlidingPuzzleGame() {
    createImageButtons();
    setupEventListeners(); // ✅ NOVA FUNÇÃO - configura todos os event listeners
    newPuzzleGame();
}

// ✅ NOVA FUNÇÃO - Configura todos os event listeners
function setupEventListeners() {
    // Botões de dificuldade
    document.querySelectorAll('.sliding-puzzle-btn[data-difficulty]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setPuzzleDifficulty(e.target.dataset.difficulty);
        });
    });
    
    // Botões de controle do jogo
    document.getElementById('shuffleBtn').addEventListener('click', shufflePuzzle);
    document.getElementById('showSolutionBtn').addEventListener('click', showSolution);
    document.getElementById('newGameBtn').addEventListener('click', newPuzzleGame);
}

// =============================================================================
// CRIAÇÃO DOS BOTÕES DE IMAGEM - CORRIGIDA
// =============================================================================
function createImageButtons() {
    const container = document.getElementById('imageButtons');
    container.innerHTML = '';
    
    Object.keys(puzzleImages).forEach(imageKey => {
        const image = puzzleImages[imageKey];
        const button = document.createElement('button');
        button.className = `image-btn ${imageKey === slidingPuzzleGame.currentImage ? 'active' : ''}`;
        button.innerHTML = `
            <div class="image-preview-container">
                <img src="${image.preview || image.url}" 
                     alt="${image.name}" 
                     class="image-preview"
                     onerror="handleImageError(this, '${imageKey}')">
            </div>
            <div class="image-name">${image.name}</div>
        `;
        button.addEventListener('click', () => setPuzzleImage(imageKey));
        container.appendChild(button);
    });
}

// ✅ FUNÇÃO PARA LIDAR COM ERROS DE IMAGEM
function handleImageError(imgElement, imageKey) {
    console.log(`Imagem não carregada: ${imageKey}, usando fallback`);
    const theme = puzzleImages[imageKey];
    
    // Substituir por fallback
    imgElement.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'image-preview-fallback';
    fallback.style.background = theme.color || '#666';
    fallback.style.color = 'white';
    fallback.style.fontSize = '2rem';
    fallback.style.width = '100%';
    fallback.style.height = '100%';
    fallback.style.display = 'flex';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.style.borderRadius = '8px';
    fallback.textContent = theme.emoji || '🖼️';
    
    imgElement.parentNode.appendChild(fallback);
}

// =============================================================================
// CONFIGURAÇÃO DA IMAGEM - CORRIGIDA
// =============================================================================
function setPuzzleImage(imageKey) {
    slidingPuzzleGame.currentImage = imageKey;
    
    // Atualizar botões ativos
    document.querySelectorAll('.image-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Atualizar tema atual
    document.getElementById('currentTheme').textContent = puzzleImages[imageKey].name;
    
    newPuzzleGame();
}

// =============================================================================
// CONFIGURAÇÃO DA DIFICULDADE - CORRIGIDA
// =============================================================================
function setPuzzleDifficulty(difficulty) {
    slidingPuzzleGame.difficulty = difficulty;
    
    // Definir tamanho baseado na dificuldade
    switch(difficulty) {
        case 'easy':
            slidingPuzzleGame.size = 2;
            break;
        case 'medium':
            slidingPuzzleGame.size = 3;
            break;
        case 'hard':
            slidingPuzzleGame.size = 4;
            break;
    }
    
    // Atualizar botões ativos
    document.querySelectorAll('.sliding-puzzle-btn[data-difficulty]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
    
    newPuzzleGame();
}

// =============================================================================
// NOVO JOGO - CORRIGIDA
// =============================================================================
function newPuzzleGame() {
    clearInterval(slidingPuzzleGame.timer);
    
    slidingPuzzleGame.moves = 0;
    slidingPuzzleGame.isCompleted = false;
    slidingPuzzleGame.emptyPosition = { 
        row: slidingPuzzleGame.size - 1, 
        col: slidingPuzzleGame.size - 1 
    };
    
    createPuzzleBoard();
    shufflePuzzle();
    updatePuzzleStats();
    hidePuzzleResult();
    startPuzzleTimer();
    
    // Atualizar tema atual
    document.getElementById('currentTheme').textContent = puzzleImages[slidingPuzzleGame.currentImage].name;
}

// =============================================================================
// CRIAÇÃO DO TABULEIRO - CORRIGIDA
// =============================================================================
function createPuzzleBoard() {
    const boardElement = document.getElementById('puzzleBoard');
    boardElement.innerHTML = '';
    
    // Definir grid template dinamicamente
    boardElement.style.gridTemplateColumns = `repeat(${slidingPuzzleGame.size}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${slidingPuzzleGame.size}, 1fr)`;
    
    // Inicializar tabuleiro
    slidingPuzzleGame.board = [];
    let tileNumber = 1;
    
    for (let row = 0; row < slidingPuzzleGame.size; row++) {
        slidingPuzzleGame.board[row] = [];
        for (let col = 0; col < slidingPuzzleGame.size; col++) {
            // A última peça é o espaço vazio
            if (row === slidingPuzzleGame.size - 1 && col === slidingPuzzleGame.size - 1) {
                slidingPuzzleGame.board[row][col] = 0;
            } else {
                slidingPuzzleGame.board[row][col] = tileNumber++;
            }
        }
    }
    
    renderPuzzleBoard();
}

// =============================================================================
// RENDERIZAÇÃO DO TABULEIRO - CORRIGIDA
// =============================================================================
function renderPuzzleBoard() {
    const boardElement = document.getElementById('puzzleBoard');
    boardElement.innerHTML = '';
    
    const currentImage = puzzleImages[slidingPuzzleGame.currentImage];
    const tileSize = 100 / slidingPuzzleGame.size;
    
    for (let row = 0; row < slidingPuzzleGame.size; row++) {
        for (let col = 0; col < slidingPuzzleGame.size; col++) {
            const tileValue = slidingPuzzleGame.board[row][col];
            const tile = document.createElement('div');
            tile.className = 'sliding-puzzle-tile';
            tile.dataset.row = row;
            tile.dataset.col = col;
            
            if (tileValue === 0) {
                tile.classList.add('empty');
                tile.style.background = '#f0f0f0';
            } else {
                // Calcular posição correta da imagem de fundo
                const correctRow = Math.floor((tileValue - 1) / slidingPuzzleGame.size);
                const correctCol = (tileValue - 1) % slidingPuzzleGame.size;
                
                const bgPosX = -correctCol * tileSize + '%';
                const bgPosY = -correctRow * tileSize + '%';
                
                // Configurar imagem de fundo com fallback
                tile.style.backgroundImage = `url('${currentImage.url}')`;
                tile.style.backgroundSize = `${slidingPuzzleGame.size * 100}%`;
                tile.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
                tile.style.backgroundRepeat = 'no-repeat';
                
                // Fallback se imagem não carregar
                tile.style.background = currentImage.color || '#666';
                tile.style.color = 'white';
                tile.style.display = 'flex';
                tile.style.alignItems = 'center';
                tile.style.justifyContent = 'center';
                tile.style.fontSize = getFontSizeForTile();
                tile.style.fontWeight = 'bold';
                
                // Se imagem carregar, mostrar imagem, senão emoji
                const img = new Image();
                img.onload = function() {
                    tile.style.backgroundImage = `url('${currentImage.url}')`;
                    tile.style.backgroundSize = `${slidingPuzzleGame.size * 100}%`;
                    tile.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
                    tile.innerHTML = ''; // Remove fallback visual
                };
                img.onerror = function() {
                    // Usar fallback
                    tile.innerHTML = currentImage.emoji || '❓';
                    tile.style.backgroundImage = 'none';
                };
                img.src = currentImage.url;
                
                // Verificar se a peça é movível
                if (isTileMovable(row, col)) {
                    tile.classList.add('movable');
                    tile.addEventListener('click', () => moveTile(row, col));
                }
            }
            
            boardElement.appendChild(tile);
        }
    }
}

function getFontSizeForTile() {
    switch(slidingPuzzleGame.size) {
        case 2: return '2.5rem';
        case 3: return '2rem';
        case 4: return '1.5rem';
        default: return '2rem';
    }
}

// =============================================================================
// VERIFICAÇÃO DE MOVIMENTO - CORRIGIDA
// =============================================================================
function isTileMovable(row, col) {
    if (slidingPuzzleGame.isCompleted) return false;
    
    const { row: emptyRow, col: emptyCol } = slidingPuzzleGame.emptyPosition;
    
    // Verificar se está adjacente ao espaço vazio
    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow);
}

// =============================================================================
// MOVIMENTO DA PEÇA - CORRIGIDA (AGORA FUNCIONA!)
// =============================================================================
function moveTile(row, col) {
    if (!isTileMovable(row, col)) {
        console.log('Peça não é movível');
        return;
    }
    
    const { row: emptyRow, col: emptyCol } = slidingPuzzleGame.emptyPosition;
    
    console.log(`Movendo peça de (${row},${col}) para (${emptyRow},${emptyCol})`);
    
    // Trocar posições no array
    const temp = slidingPuzzleGame.board[row][col];
    slidingPuzzleGame.board[row][col] = 0;
    slidingPuzzleGame.board[emptyRow][emptyCol] = temp;
    
    // Atualizar posição vazia
    slidingPuzzleGame.emptyPosition = { row, col };
    
    slidingPuzzleGame.moves++;
    
    // Atualizar display
    updatePuzzleStats();
    renderPuzzleBoard(); // ✅ Recriar tabuleiro com novo estado
    
    // Verificar se está resolvido
    if (isPuzzleSolved()) {
        completePuzzleGame();
    }
}

// =============================================================================
// VERIFICAÇÃO DE SOLUÇÃO - CORRIGIDA
// =============================================================================
function isPuzzleSolved() {
    let expectedValue = 1;
    const totalCells = slidingPuzzleGame.size * slidingPuzzleGame.size;
    
    for (let row = 0; row < slidingPuzzleGame.size; row++) {
        for (let col = 0; col < slidingPuzzleGame.size; col++) {
            const currentValue = slidingPuzzleGame.board[row][col];
            
            // A última posição deve estar vazia
            if (row === slidingPuzzleGame.size - 1 && col === slidingPuzzleGame.size - 1) {
                if (currentValue !== 0) {
                    return false;
                }
            } else {
                if (currentValue !== expectedValue) {
                    return false;
                }
                expectedValue++;
            }
        }
    }
    
    return true;
}

// =============================================================================
// EMBARALHAR QUEBRA-CABEÇA - CORRIGIDA
// =============================================================================
function shufflePuzzle() {
    clearInterval(slidingPuzzleGame.timer);
    
    slidingPuzzleGame.moves = 0;
    slidingPuzzleGame.isCompleted = false;
    
    // Reset para estado resolvido
    createPuzzleBoard();
    
    // Embaralhar fazendo movimentos válidos aleatórios
    const shuffleMoves = slidingPuzzleGame.size * 30;
    
    for (let i = 0; i < shuffleMoves; i++) {
        const movableTiles = [];
        
        // Encontrar todas as peças movíveis
        for (let row = 0; row < slidingPuzzleGame.size; row++) {
            for (let col = 0; col < slidingPuzzleGame.size; col++) {
                if (slidingPuzzleGame.board[row][col] !== 0 && isTileMovable(row, col)) {
                    movableTiles.push({ row, col });
                }
            }
        }
        
        // Escolher uma peça movível aleatória e mover
        if (movableTiles.length > 0) {
            const randomTile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
            const { row: emptyRow, col: emptyCol } = slidingPuzzleGame.emptyPosition;
            
            // Fazer o movimento diretamente no array
            const temp = slidingPuzzleGame.board[randomTile.row][randomTile.col];
            slidingPuzzleGame.board[randomTile.row][randomTile.col] = 0;
            slidingPuzzleGame.board[emptyRow][emptyCol] = temp;
            slidingPuzzleGame.emptyPosition = { row: randomTile.row, col: randomTile.col };
        }
    }
    
    // Reiniciar contadores
    slidingPuzzleGame.moves = 0;
    updatePuzzleStats();
    startPuzzleTimer();
    hidePuzzleResult();
    renderPuzzleBoard();
}

// =============================================================================
// MOSTRAR SOLUÇÃO - CORRIGIDA
// =============================================================================
function showSolution() {
    // Reset para estado resolvido
    let tileNumber = 1;
    
    for (let row = 0; row < slidingPuzzleGame.size; row++) {
        for (let col = 0; col < slidingPuzzleGame.size; col++) {
            if (row === slidingPuzzleGame.size - 1 && col === slidingPuzzleGame.size - 1) {
                slidingPuzzleGame.board[row][col] = 0;
            } else {
                slidingPuzzleGame.board[row][col] = tileNumber++;
            }
        }
    }
    
    slidingPuzzleGame.emptyPosition = { 
        row: slidingPuzzleGame.size - 1, 
        col: slidingPuzzleGame.size - 1 
    };
    
    slidingPuzzleGame.isCompleted = true;
    clearInterval(slidingPuzzleGame.timer);
    renderPuzzleBoard();
    
    showFeedback("Solução mostrada! Clique em 'Novo Jogo' para jogar novamente.", "info");
}

// =============================================================================
// SISTEMA DE TEMPO - CORRIGIDO
// =============================================================================
function startPuzzleTimer() {
    slidingPuzzleGame.startTime = new Date();
    slidingPuzzleGame.timer = setInterval(updatePuzzleTimer, 1000);
}

function updatePuzzleTimer() {
    if (!slidingPuzzleGame.startTime || slidingPuzzleGame.isCompleted) return;
    
    const currentTime = new Date();
    const elapsed = Math.floor((currentTime - slidingPuzzleGame.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    document.getElementById('puzzleTimer').textContent = `${minutes}:${seconds}`;
}

function updatePuzzleStats() {
    document.getElementById('movesCount').textContent = slidingPuzzleGame.moves;
}

// =============================================================================
// FINALIZAÇÃO DO JOGO - CORRIGIDA
// =============================================================================
function completePuzzleGame() {
    clearInterval(slidingPuzzleGame.timer);
    slidingPuzzleGame.isCompleted = true;
    
    const currentTime = Math.floor((new Date() - slidingPuzzleGame.startTime) / 1000);
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const seconds = (currentTime % 60).toString().padStart(2, '0');
    
    // Calcular pontuação
    const baseScore = 100;
    const timeBonus = Math.max(300 - currentTime, 50);
    const moveBonus = Math.max(100 - slidingPuzzleGame.moves, 20);
    const difficultyMultiplier = slidingPuzzleGame.size;
    const totalScore = (baseScore + timeBonus + moveBonus) * difficultyMultiplier;
    
    addScore(totalScore);
    
    const resultElement = document.getElementById('puzzleResult');
    resultElement.innerHTML = `
        <div class="sliding-puzzle-complete">
            <h3>🎉 Parabéns! 🎉</h3>
            <p>Você completou o quebra-cabeça!</p>
            <p>Tempo: ${minutes}:${seconds}</p>
            <p>Movimentos: ${slidingPuzzleGame.moves}</p>
            <p>Pontuação: +${totalScore}</p>
            <button class="sliding-puzzle-action-btn primary" onclick="newPuzzleGame()" style="margin-top: 15px;">
                🔄 Jogar Novamente
            </button>
        </div>
    `;
}

function hidePuzzleResult() {
    const resultElement = document.getElementById('puzzleResult');
    resultElement.innerHTML = '';
}

// ✅ FUNÇÃO AUXILIAR PARA FEEDBACK
function showFeedback(message, type) {
    // Implementação simples de feedback
    console.log(`${type}: ${message}`);
}

// JOGO 17
// JOGO 17 - Conceitos de Medida (VERSÃO SIMPLIFICADA)
function loadMeasurementGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Conceitos de Medida';
    gameInstructions.textContent = 'Compare tamanhos, pesos e quantidades de objetos. Desenvolva seu senso de medida e proporção!';
    
    gameArea.innerHTML = '';
    
    const measurementGame = document.createElement('div');
    measurementGame.className = 'measurement-game-container';
    
    // Sistema de níveis
    const levels = {
        FACIL: { name: 'Fácil', color: '#4CAF50', points: 10 },
        MEDIO: { name: 'Médio', color: '#FF9800', points: 20 },
        DIFICIL: { name: 'Difícil', color: '#F44336', points: 30 }
    };
    
    // Banco de comparações
    const comparisonsBank = {
        FACIL: [
            {
                type: 'TAMANHO',
                objects: [
                    { name: 'Pequeno', emoji: '🐭', size: 30, weight: 1 },
                    { name: 'Grande', emoji: '🐘', size: 80, weight: 8 }
                ],
                question: 'Qual é maior?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            },
            {
                type: 'PESO',
                objects: [
                    { name: 'Leve', emoji: '🎈', size: 50, weight: 2 },
                    { name: 'Pesado', emoji: '🪨', size: 50, weight: 9 }
                ],
                question: 'Qual é mais pesado?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            },
            {
                type: 'QUANTIDADE',
                objects: [
                    { name: 'Poucos', emoji: '🍎', size: 60, quantity: 3 },
                    { name: 'Muitos', emoji: '🍎', size: 60, quantity: 8 }
                ],
                question: 'Qual tem mais?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            }
        ],
        MEDIO: [
            {
                type: 'TAMANHO',
                objects: [
                    { name: 'Médio', emoji: '🐕', size: 45, weight: 5 },
                    { name: 'Médio', emoji: '🐈', size: 40, weight: 4 }
                ],
                question: 'Qual é maior?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            },
            {
                type: 'PESO_COMPOSTO',
                objects: [
                    { name: 'Balões', emoji: '🎈🎈', size: 60, weight: 3 },
                    { name: 'Pedra', emoji: '🪨', size: 50, weight: 7 }
                ],
                question: 'Qual é mais pesado?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            }
        ],
        DIFICIL: [
            {
                type: 'PROPORCAO',
                objects: [
                    { name: 'Água', emoji: '💧💧💧', size: 70, weight: 6 },
                    { name: 'Areia', emoji: '🏖️', size: 65, weight: 8 }
                ],
                question: 'Qual tem maior densidade?',
                options: ['Primeiro', 'Segundo', 'São iguais']
            }
        ]
    };
    
    let currentLevel = 'FACIL';
    let score = 0;
    let streak = 0;
    let currentComparison = null;
    
    function initGame() {
        showGameInterface();
        nextComparison();
    }
    
    function showGameInterface() {
        measurementGame.innerHTML = `
            <div class="measurement-info">
                <div class="measurement-stats">
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="measurementScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="measurementStreak">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Nível</span>
                        <span class="value" id="measurementLevel">${levels[currentLevel].name}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Dificuldade</span>
                        <span class="value">${levels[currentLevel].name}</span>
                    </div>
                </div>
            </div>
            
            <div class="measurement-area">
                <div class="comparison-display" id="comparisonDisplay">
                    <!-- Conteúdo será gerado dinamicamente -->
                </div>
                
                <div class="measurement-options" id="measurementOptions">
                    <!-- Opções serão geradas dinamicamente -->
                </div>
                
                <div class="measurement-controls">
                    <button class="game-button" id="hintMeasurement">💡 Dica</button>
                    <button class="game-button" id="nextMeasurement">⏭️ Próximo</button>
                </div>
                
                <div class="measurement-feedback info" id="measurementFeedback">
                    Compare os objetos e escolha a resposta correta!
                </div>
            </div>
        `;
        
        gameArea.appendChild(measurementGame);
        
        document.getElementById('hintMeasurement').addEventListener('click', showHint);
        document.getElementById('nextMeasurement').addEventListener('click', nextComparison);
    }
    
    function nextComparison() {
        const comparisons = comparisonsBank[currentLevel];
        currentComparison = comparisons[Math.floor(Math.random() * comparisons.length)];
        
        renderComparison();
        updateDisplay();
    }
    
    function renderComparison() {
        const comparisonDisplay = document.getElementById('comparisonDisplay');
        const measurementOptions = document.getElementById('measurementOptions');
        
        comparisonDisplay.innerHTML = `
            <div class="comparison-question">${currentComparison.question}</div>
            <div class="objects-container">
                ${currentComparison.objects.map((obj, index) => `
                    <div class="measurement-object">
                        <div class="object-visual">${obj.emoji}</div>
                        <div class="object-size" style="width: ${obj.size}px; height: ${obj.size}px;"></div>
                        <div class="object-name">${obj.name}</div>
                        ${obj.quantity ? `<div class="object-quantity">Quantidade: ${obj.quantity}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
        
        measurementOptions.innerHTML = '';
        currentComparison.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'measurement-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(index));
            measurementOptions.appendChild(optionElement);
        });
    }
    
    function checkAnswer(selectedIndex) {
        const options = document.querySelectorAll('.measurement-option');
        const correctIndex = getCorrectAnswer();
        
        options.forEach(option => option.style.pointerEvents = 'none');
        
        if (selectedIndex === correctIndex) {
            options[selectedIndex].classList.add('correct');
            streak++;
            score += levels[currentLevel].points + (streak * 5);
            showFeedback('🎉 Resposta correta! Ótimo trabalho!', 'correct');
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[correctIndex].classList.add('correct');
            streak = 0;
            showFeedback('💡 Tente novamente! Observe com atenção.', 'incorrect');
        }
        
        updateDisplay();
    }
    
    function getCorrectAnswer() {
        const [obj1, obj2] = currentComparison.objects;
        
        switch(currentComparison.type) {
            case 'TAMANHO':
                return obj1.size > obj2.size ? 0 : obj1.size < obj2.size ? 1 : 2;
            case 'PESO':
                return obj1.weight > obj2.weight ? 0 : obj1.weight < obj2.weight ? 1 : 2;
            case 'QUANTIDADE':
                return obj1.quantity > obj2.quantity ? 0 : obj1.quantity < obj2.quantity ? 1 : 2;
            default:
                return 0;
        }
    }
    
    function showHint() {
        const correctIndex = getCorrectAnswer();
        const correctAnswer = currentComparison.options[correctIndex];
        showFeedback(`💡 Dica: Pense sobre ${correctAnswer.toLowerCase()}`, 'hint');
    }
    
    function updateDisplay() {
        document.getElementById('measurementScore').textContent = score;
        document.getElementById('measurementStreak').textContent = streak;
    }
    
    function showFeedback(message, type) {
        const feedback = document.getElementById('measurementFeedback');
        feedback.textContent = message;
        feedback.className = `measurement-feedback ${type}`;
    }
    
    initGame();
}

// JOGO 18

function loadSequenceGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Memória de Sequência';
    gameInstructions.textContent = 'Memorize e repita sequências de cores, formas e símbolos. Treine sua memória visual!';
    
    gameArea.innerHTML = '';
    
    const sequenceGame = document.createElement('div');
    sequenceGame.className = 'sequence-game-container';
    
    // Sistema de dificuldade
    const difficulties = {
        FACIL: { length: 3, time: 3000, colors: 4, points: 10 },
        MEDIO: { length: 5, time: 4000, colors: 6, points: 20 },
        DIFICIL: { length: 7, time: 5000, colors: 8, points: 30 }
    };
    
    // Cores disponíveis
    const colors = [
        { name: 'Vermelho', value: '#ff6b6b', emoji: '🔴' },
        { name: 'Azul', value: '#4ecdc4', emoji: '🔵' },
        { name: 'Verde', value: '#51cf66', emoji: '🟢' },
        { name: 'Amarelo', value: '#ffd43b', emoji: '🟡' },
        { name: 'Roxo', value: '#cc5de8', emoji: '🟣' },
        { name: 'Laranja', value: '#ff922b', emoji: '🟠' },
        { name: 'Rosa', value: '#f06595', emoji: '🌸' },
        { name: 'Marrom', value: '#d68c45', emoji: '🟤' }
    ];
    
    let currentDifficulty = 'FACIL';
    let score = 0;
    let streak = 0;
    let sequence = [];
    let userSequence = [];
    let gamePhase = 'showing'; // 'showing', 'guessing'
    
    function initGame() {
        showGameInterface();
        startNewRound();
    }
    
    function showGameInterface() {
        sequenceGame.innerHTML = `
            <div class="sequence-info">
                <div class="sequence-stats">
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="sequenceScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="sequenceStreak">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Nível</span>
                        <span class="value" id="sequenceLevel">${currentDifficulty}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Comprimento</span>
                        <span class="value" id="sequenceLength">0</span>
                    </div>
                </div>
                
                <div class="sequence-difficulty">
                    ${Object.keys(difficulties).map(diff => `
                        <button class="difficulty-btn ${diff === currentDifficulty ? 'active' : ''}" 
                                data-difficulty="${diff}">
                            ${diff.charAt(0) + diff.slice(1).toLowerCase()}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="sequence-area">
                <div class="sequence-display" id="sequenceDisplay">
                    <!-- Sequência será gerada aqui -->
                </div>
                
                <div class="sequence-controls">
                    <button class="game-button" id="startSequence">🎮 Iniciar</button>
                    <button class="game-button" id="hintSequence">💡 Dica</button>
                </div>
                
                <div class="sequence-feedback info" id="sequenceFeedback">
                    Clique em Iniciar para começar a sequência!
                </div>
                
                <div class="sequence-progress">
                    <div class="progress-sequence">
                        Progresso: <span id="sequenceProgress">0</span> itens
                    </div>
                </div>
            </div>
        `;
        
        gameArea.appendChild(sequenceGame);
        
        // Event listeners
        document.getElementById('startSequence').addEventListener('click', startNewRound);
        document.getElementById('hintSequence').addEventListener('click', showHint);
        
        // Event listeners para botões de dificuldade
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentDifficulty = this.dataset.difficulty;
                showGameInterface();
                startNewRound();
            });
        });
    }
    
    function startNewRound() {
        const difficulty = difficulties[currentDifficulty];
        sequence = generateSequence(difficulty.length, difficulty.colors);
        userSequence = [];
        gamePhase = 'showing';
        
        renderSequenceDisplay();
        showSequence();
    }
    
    function generateSequence(length, colorCount) {
        const availableColors = colors.slice(0, colorCount);
        const seq = [];
        
        for (let i = 0; i < length; i++) {
            const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            seq.push(randomColor);
        }
        
        return seq;
    }
    
    function renderSequenceDisplay() {
        const sequenceDisplay = document.getElementById('sequenceDisplay');
        sequenceDisplay.innerHTML = '';
        
        sequence.forEach((color, index) => {
            const item = document.createElement('div');
            item.className = `sequence-item ${gamePhase === 'showing' ? '' : 'hidden'}`;
            item.style.background = color.value;
            item.textContent = color.emoji;
            item.dataset.index = index;
            
            if (gamePhase === 'guessing') {
                item.classList.add('user');
                item.addEventListener('click', handleUserClick);
            }
            
            sequenceDisplay.appendChild(item);
        });
        
        document.getElementById('sequenceLength').textContent = sequence.length;
    }
    
    function showSequence() {
        gamePhase = 'showing';
        renderSequenceDisplay();
        
        let index = 0;
        const interval = setInterval(() => {
            if (index >= sequence.length) {
                clearInterval(interval);
                startUserTurn();
                return;
            }
            
            highlightItem(index);
            index++;
        }, 1000);
    }
    
    function highlightItem(index) {
        const items = document.querySelectorAll('.sequence-item');
        items[index].style.transform = 'scale(1.2)';
        items[index].style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        setTimeout(() => {
            items[index].style.transform = 'scale(1)';
            items[index].style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }, 500);
    }
    
    function startUserTurn() {
        gamePhase = 'guessing';
        renderSequenceDisplay();
        showFeedback('Sua vez! Repita a sequência clicando nos itens.', 'info');
    }
    
    function handleUserClick(event) {
        if (gamePhase !== 'guessing') return;
        
        const clickedIndex = parseInt(event.currentTarget.dataset.index);
        const correctColor = sequence[userSequence.length];
        const clickedColor = sequence[clickedIndex];
        
        userSequence.push(clickedIndex);
        
        // Verificar se acertou
        if (clickedColor === correctColor) {
            event.currentTarget.classList.add('correct');
            showFeedback(`✅ Correto! ${userSequence.length}/${sequence.length}`, 'correct');
            
            // Verificar se completou a sequência
            if (userSequence.length === sequence.length) {
                streak++;
                score += difficulties[currentDifficulty].points + (streak * 5);
                showFeedback('🎉 Sequência completa! Parabéns!', 'success');
                
                setTimeout(() => {
                    // Aumentar dificuldade após 3 acertos consecutivos
                    if (streak >= 3 && currentDifficulty !== 'DIFICIL') {
                        const difficultiesOrder = ['FACIL', 'MEDIO', 'DIFICIL'];
                        const currentIndex = difficultiesOrder.indexOf(currentDifficulty);
                        if (currentIndex < difficultiesOrder.length - 1) {
                            currentDifficulty = difficultiesOrder[currentIndex + 1];
                            showFeedback(`⭐ Nível up! Agora: ${currentDifficulty}`, 'level-up');
                        }
                    }
                    startNewRound();
                }, 2000);
            }
        } else {
            event.currentTarget.classList.add('incorrect');
            streak = 0;
            showFeedback('❌ Sequência incorreta. Tente novamente!', 'incorrect');
            
            setTimeout(() => {
                startNewRound();
            }, 2000);
        }
        
        updateDisplay();
    }
    
    function showHint() {
        if (gamePhase !== 'guessing') return;
        
        const remaining = sequence.length - userSequence.length;
        showFeedback(`💡 Dica: Faltam ${remaining} itens na sequência`, 'hint');
    }
    
    function updateDisplay() {
        document.getElementById('sequenceScore').textContent = score;
        document.getElementById('sequenceStreak').textContent = streak;
        document.getElementById('sequenceProgress').textContent = userSequence.length;
    }
    
    function showFeedback(message, type) {
        const feedback = document.getElementById('sequenceFeedback');
        feedback.textContent = message;
        feedback.className = `sequence-feedback ${type}`;
    }
    
    initGame();
}

// JOGO 19

function loadStoriesGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Histórias Sequenciais';
    gameInstructions.textContent = 'Organize as imagens na ordem correta para contar uma história com lógica!';
    
    gameArea.innerHTML = '';
    
    const storiesGame = document.createElement('div');
    storiesGame.className = 'stories-game-container';
    
    // Banco de histórias
    const storiesBank = [
        {
            id: 1,
            title: 'O Plantio da Semente',
            description: 'Organize as etapas do crescimento de uma planta',
            images: [
                { emoji: '🌱', description: 'Broto pequeno saindo da terra', order: 1 },
                { emoji: '🪴', description: 'Planta crescendo com folhas', order: 2 },
                { emoji: '🌻', description: 'Flor amarela aberta', order: 3 },
                { emoji: '🌰', description: 'Semente na terra', order: 0 }
            ],
            hint: 'Comece pela semente e termine com a flor aberta'
        },
        {
            id: 2,
            title: 'Preparando um Bolo',
            description: 'Sequência para fazer um bolo delicioso',
            images: [
                { emoji: '🥚', description: 'Quebrando os ovos', order: 1 },
                { emoji: '🎂', description: 'Bolo pronto decorado', order: 3 },
                { emoji: '🥣', description: 'Misturando os ingredientes', order: 2 },
                { emoji: '📝', description: 'Lendo a receita', order: 0 }
            ],
            hint: 'Primeiro leia a receita, depois prepare os ingredientes'
        },
        {
            id: 3,
            title: 'Dia na Praia',
            description: 'Um dia divertido na praia',
            images: [
                { emoji: '🏖️', description: 'Chegando na praia', order: 0 },
                { emoji: '🏊', description: 'Nadando no mar', order: 2 },
                { emoji: '🌅', description: 'Pôr do sol lindo', order: 3 },
                { emoji: '🏐', description: 'Jogando vôlei', order: 1 }
            ],
            hint: 'Comece chegando e termine com o pôr do sol'
        }
    ];
    
    let currentStory = null;
    let score = 0;
    let completedStories = 0;
    let draggedImage = null;
    
    function initGame() {
        showStorySelection();
    }
    
    function showStorySelection() {
        storiesGame.innerHTML = `
            <div class="stories-info">
                <h2>📖 Histórias Sequenciais</h2>
                <p>Escolha uma história para organizar:</p>
            </div>
            
            <div class="stories-area">
                <div class="story-selection">
                    ${storiesBank.map(story => `
                        <div class="story-option" data-story="${story.id}">
                            <div class="story-preview">
                                ${story.images.map(img => `<span class="preview-emoji">${img.emoji}</span>`).join('')}
                            </div>
                            <div class="story-info">
                                <h3>${story.title}</h3>
                                <p>${story.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="stories-stats">
                    <div class="stat">
                        <span class="label">Histórias Completas</span>
                        <span class="value">${completedStories}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value">${score}</span>
                    </div>
                </div>
            </div>
        `;
        
        gameArea.appendChild(storiesGame);
        
        document.querySelectorAll('.story-option').forEach(option => {
            option.addEventListener('click', function() {
                const storyId = parseInt(this.dataset.story);
                startStory(storyId);
            });
        });
    }
    
    function startStory(storyId) {
        currentStory = storiesBank.find(story => story.id === storyId);
        
        showStoryInterface();
        setupStory();
    }
    
    function showStoryInterface() {
        storiesGame.innerHTML = `
            <div class="stories-info">
                <div class="story-header">
                    <h2>${currentStory.title}</h2>
                    <p>${currentStory.description}</p>
                </div>
            </div>
            
            <div class="stories-area">
                <div class="story-scene">
                    <div class="story-hint" id="storyHint">
                        💡 ${currentStory.hint}
                    </div>
                    
                    <div class="story-images" id="storyImages">
                        <!-- Imagens serão adicionadas aqui -->
                    </div>
                    
                    <div class="story-slots" id="storySlots">
                        <!-- Slots serão gerados aqui -->
                    </div>
                </div>
                
                <div class="story-controls">
                    <button class="game-button" id="checkStory">✅ Verificar</button>
                    <button class="game-button" id="hintStory">💡 Dica Extra</button>
                    <button class="game-button" id="backToStories">📚 Outras Histórias</button>
                </div>
                
                <div class="story-feedback info" id="storyFeedback">
                    Arraste as imagens para os slots na ordem correta!
                </div>
            </div>
        `;
        
        document.getElementById('checkStory').addEventListener('click', checkStoryOrder);
        document.getElementById('hintStory').addEventListener('click', showExtraHint);
        document.getElementById('backToStories').addEventListener('click', showStorySelection);
    }
    
    function setupStory() {
        const storyImages = document.getElementById('storyImages');
        const storySlots = document.getElementById('storySlots');
        
        // Embaralhar imagens
        const shuffledImages = [...currentStory.images].sort(() => Math.random() - 0.5);
        
        // Criar imagens arrastáveis
        storyImages.innerHTML = '';
        shuffledImages.forEach((image, index) => {
            const imgElement = document.createElement('div');
            imgElement.className = 'story-image';
            imgElement.draggable = true;
            imgElement.innerHTML = `
                ${image.emoji}
                <div class="story-sequence-number">${index + 1}</div>
            `;
            imgElement.dataset.order = image.order;
            imgElement.dataset.description = image.description;
            
            imgElement.addEventListener('dragstart', handleDragStart);
            imgElement.addEventListener('dragend', handleDragEnd);
            
            storyImages.appendChild(imgElement);
        });
        
        // Criar slots
        storySlots.innerHTML = '';
        for (let i = 0; i < currentStory.images.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'story-slot';
            slot.dataset.slot = i;
            
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('drop', handleDrop);
            
            storySlots.appendChild(slot);
        }
    }
    
    function handleDragStart(e) {
        draggedImage = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.order);
    }
    
    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    function handleDragOver(e) {
        e.preventDefault();
    }
    
    function handleDrop(e) {
        e.preventDefault();
        const slot = e.target.closest('.story-slot');
        
        if (slot && !slot.querySelector('.story-image')) {
            slot.appendChild(draggedImage);
            slot.classList.add('filled');
            showFeedback('Imagem colocada! Continue organizando.', 'info');
        }
    }
    
    function checkStoryOrder() {
        const slots = document.querySelectorAll('.story-slot');
        let correctCount = 0;
        
        slots.forEach((slot, index) => {
            const image = slot.querySelector('.story-image');
            
            if (image && parseInt(image.dataset.order) === index) {
                slot.classList.add('correct');
                slot.classList.remove('incorrect');
                correctCount++;
            } else if (image) {
                slot.classList.add('incorrect');
                slot.classList.remove('correct');
            }
        });
        
        if (correctCount === currentStory.images.length) {
            score += 100;
            completedStories++;
            showStoryCompleted();
        } else {
            showFeedback(`✅ ${correctCount} de ${currentStory.images.length} corretos. Continue tentando!`, 'info');
        }
    }
    
    function showStoryCompleted() {
        const storyScene = document.querySelector('.story-scene');
        storyScene.innerHTML = `
            <div class="story-completed">
                <div class="completed-animation">🎉</div>
                <h3>História Completa!</h3>
                <p>Você organizou "${currentStory.title}" na ordem correta!</p>
                <div class="story-sequence">
                    ${currentStory.images.map(img => `
                        <div class="story-step">
                            <span class="step-emoji">${img.emoji}</span>
                            <span class="step-description">${img.description}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        showFeedback('🎉 Parabéns! História organizada perfeitamente!', 'success');
        
        setTimeout(() => {
            showStorySelection();
        }, 5000);
    }
    
    function showExtraHint() {
        const nextCorrect = findNextCorrect();
        if (nextCorrect) {
            showFeedback(`💡 Próximo passo: ${nextCorrect.description}`, 'hint');
        }
    }
    
    function findNextCorrect() {
        const slots = document.querySelectorAll('.story-slot');
        
        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            const image = slot.querySelector('.story-image');
            
            if (!image || parseInt(image.dataset.order) !== i) {
                return currentStory.images.find(img => img.order === i);
            }
        }
        
        return null;
    }
    
    function showFeedback(message, type) {
        const feedback = document.getElementById('storyFeedback');
        feedback.textContent = message;
        feedback.className = `story-feedback ${type}`;
    }
    
    initGame();
}
// JOGO 20

function loadColorsGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Discriminação de Cores';
    gameInstructions.textContent = 'Identifique tons e matizes de cores semelhantes. Desenvolva sua percepção visual!';
    
    gameArea.innerHTML = '';
    
    const colorsGame = document.createElement('div');
    colorsGame.className = 'colors-game-container';
    
    // Sistema de dificuldade
    const difficulties = {
        FACIL: { variation: 50, options: 4, points: 10 },
        MEDIO: { variation: 30, options: 6, points: 20 },
        DIFICIL: { variation: 15, options: 8, points: 30 }
    };
    
    // Modos de visão de cores
    const visionModes = {
        NORMAL: 'Visão Normal',
        PROTANOPIA: 'Protanopia',
        DEUTERANOPIA: 'Deuteranopia',
        TRITANOPIA: 'Tritanopia'
    };
    
    let currentDifficulty = 'FACIL';
    let currentVisionMode = 'NORMAL';
    let score = 0;
    let streak = 0;
    let targetColor = null;
    let colorOptions = [];
    
    function initGame() {
        showGameInterface();
        generateNewColor();
    }
    
    function showGameInterface() {
        colorsGame.innerHTML = `
            <div class="colors-info">
                <div class="color-stats">
                    <div class="stat">
                        <span class="label">Pontuação</span>
                        <span class="value" id="colorsScore">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sequência</span>
                        <span class="value" id="colorsStreak">0</span>
                    </div>
                    <div class="stat">
                        <span class="label">Precisão</span>
                        <span class="value" id="colorsAccuracy">100%</span>
                    </div>
                    <div class="stat">
                        <span class="label">Dificuldade</span>
                        <span class="value">${currentDifficulty}</span>
                    </div>
                </div>
                
                <div class="color-difficulty">
                    ${Object.keys(difficulties).map(diff => `
                        <button class="difficulty-btn ${diff === currentDifficulty ? 'active' : ''}" 
                                data-difficulty="${diff}">
                            ${diff.charAt(0) + diff.slice(1).toLowerCase()}
                        </button>
                    `).join('')}
                </div>
                
                <div class="color-vision-options">
                    <h4>Modo de Visão:</h4>
                    ${Object.keys(visionModes).map(mode => `
                        <button class="vision-mode ${mode === currentVisionMode ? 'active' : ''}" 
                                data-mode="${mode}">
                            ${visionModes[mode]}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="colors-area">
                <div class="color-target" id="colorTarget">
                    <!-- Cor alvo será exibida aqui -->
                </div>
                
                <div class="color-options" id="colorOptions">
                    <!-- Opções de cores serão geradas aqui -->
                </div>
                
                <div class="color-controls">
                    <button class="game-button" id="newColor">🎨 Nova Cor</button>
                    <button class="game-button" id="hintColor">💡 Dica</button>
                </div>
                
                <div class="color-feedback info" id="colorFeedback">
                    Encontre a cor idêntica à mostrada acima!
                </div>
            </div>
        `;
        
        gameArea.appendChild(colorsGame);
        
        // Event listeners
        document.getElementById('newColor').addEventListener('click', generateNewColor);
        document.getElementById('hintColor').addEventListener('click', showColorHint);
        
        // Event listeners para dificuldade
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentDifficulty = this.dataset.difficulty;
                showGameInterface();
                generateNewColor();
            });
        });
        
        // Event listeners para modos de visão
        document.querySelectorAll('.vision-mode').forEach(btn => {
            btn.addEventListener('click', function() {
                currentVisionMode = this.dataset.mode;
                showGameInterface();
                generateNewColor();
            });
        });
    }
    
    function generateNewColor() {
        const difficulty = difficulties[currentDifficulty];
        
        // Gerar cor base aleatória
        targetColor = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
        
        // Gerar opções de cores
        colorOptions = [];
        
        // Adicionar cor correta
        colorOptions.push({
            color: { ...targetColor },
            isCorrect: true
        });
        
        // Adicionar cores similares
        for (let i = 1; i < difficulty.options; i++) {
            const variation = difficulty.variation;
            const similarColor = {
                r: Math.max(0, Math.min(255, targetColor.r + Math.floor(Math.random() * variation * 2 - variation))),
                g: Math.max(0, Math.min(255, targetColor.g + Math.floor(Math.random() * variation * 2 - variation))),
                b: Math.max(0, Math.min(255, targetColor.b + Math.floor(Math.random() * variation * 2 - variation)))
            };
            
            colorOptions.push({
                color: similarColor,
                isCorrect: false
            });
        }
        
        // Embaralhar opções
        colorOptions.sort(() => Math.random() - 0.5);
        
        renderColorDisplay();
    }
    
    function renderColorDisplay() {
        const colorTarget = document.getElementById('colorTarget');
        const colorOptionsContainer = document.getElementById('colorOptions');
        
        // Renderizar cor alvo
        const targetHex = rgbToHex(targetColor.r, targetColor.g, targetColor.b);
        colorTarget.innerHTML = `
            <div class="target-color" style="background: ${targetHex};"></div>
            <div class="color-hex">${targetHex}</div>
            <div class="color-instruction">Encontre a cor idêntica abaixo:</div>
        `;
        
        // Renderizar opções
        colorOptionsContainer.innerHTML = '';
        colorOptions.forEach((option, index) => {
            const optionHex = rgbToHex(option.color.r, option.color.g, option.color.b);
            const optionElement = document.createElement('div');
            optionElement.className = 'color-option';
            optionElement.style.background = optionHex;
            optionElement.dataset.index = index;
            optionElement.dataset.isCorrect = option.isCorrect;
            
            optionElement.addEventListener('click', handleColorSelection);
            
            colorOptionsContainer.appendChild(optionElement);
        });
        
        updateDisplay();
    }
    
    function handleColorSelection(event) {
        const selectedIndex = parseInt(event.currentTarget.dataset.index);
        const isCorrect = colorOptions[selectedIndex].isCorrect;
        const options = document.querySelectorAll('.color-option');
        
        options.forEach(option => option.style.pointerEvents = 'none');
        
        if (isCorrect) {
            event.currentTarget.classList.add('correct');
            streak++;
            score += difficulties[currentDifficulty].points + (streak * 3);
            showFeedback('🎉 Correta! Excelente discriminação!', 'correct');
            
            setTimeout(() => {
                // Aumentar dificuldade após 5 acertos consecutivos
                if (streak >= 5 && currentDifficulty !== 'DIFICIL') {
                    const difficultiesOrder = ['FACIL', 'MEDIO', 'DIFICIL'];
                    const currentIndex = difficultiesOrder.indexOf(currentDifficulty);
                    if (currentIndex < difficultiesOrder.length - 1) {
                        currentDifficulty = difficultiesOrder[currentIndex + 1];
                        showFeedback(`⭐ Nível up! Agora: ${currentDifficulty}`, 'level-up');
                    }
                }
                generateNewColor();
            }, 1500);
        } else {
            event.currentTarget.classList.add('incorrect');
            streak = 0;
            
            // Mostrar qual era a cor correta
            options.forEach(option => {
                if (option.dataset.isCorrect === 'true') {
                    option.classList.add('correct');
                }
            });
            
            showFeedback('❌ Tente novamente! Observe as diferenças sutis.', 'incorrect');
            
            setTimeout(() => {
                generateNewColor();
            }, 2000);
        }
        
        updateDisplay();
    }
    
    function showColorHint() {
        const similarityHints = [
            'Observe o brilho e saturação',
            'Compare os componentes RGB',
            'Preste atenção nos tons',
            'Veja as diferenças sutis'
        ];
        
        const randomHint = similarityHints[Math.floor(Math.random() * similarityHints.length)];
        showFeedback(`💡 Dica: ${randomHint}`, 'hint');
    }
    
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    
    function updateDisplay() {
        document.getElementById('colorsScore').textContent = score;
        document.getElementById('colorsStreak').textContent = streak;
        
        // Calcular precisão (simplificado)
        const totalGames = score / 10; // Aproximação
        const accuracy = totalGames > 0 ? Math.min(100, Math.round((streak / totalGames) * 100)) : 100;
        document.getElementById('colorsAccuracy').textContent = `${accuracy}%`;
    }
    
    function showFeedback(message, type) {
        const feedback = document.getElementById('colorFeedback');
        feedback.textContent = message;
        feedback.className = `color-feedback ${type}`;
    }
    
    initGame();
}

//JOGO 21 SUDOKU
// Variáveis globais do Sudoku
let sudokuGame = {
    board: [],
    solution: [],
    selectedCell: null,
    timer: null,
    startTime: null,
    mistakes: 0,
    difficulty: 'medium'
};

// Função para carregar o jogo de Sudoku
function loadSudokuGame() {
    const gameArea = document.getElementById('gameArea');
    const instructions = document.getElementById('gameInstructions');
    const gameTitle = document.getElementById('activeGameTitle');
    
    gameTitle.textContent = 'Sudoku';
    instructions.innerHTML = `
        <h4>Como Jogar:</h4>
        <ul>
            <li>Preencha o tabuleiro com números de 1 a 9</li>
            <li>Não pode repetir números na mesma linha, coluna ou quadrante 3x3</li>
            <li>Clique em uma célula e depois no número desejado</li>
            <li>Use o botão "Limpar" para remover um número</li>
        </ul>
    `;
    
    gameArea.innerHTML = `
        <div class="sudoku-container">
            <div class="sudoku-controls">
                <button class="sudoku-difficulty-btn active" data-difficulty="easy" onclick="setSudokuDifficulty('easy')">Fácil</button>
                <button class="sudoku-difficulty-btn" data-difficulty="medium" onclick="setSudokuDifficulty('medium')">Médio</button>
                <button class="sudoku-difficulty-btn" data-difficulty="hard" onclick="setSudokuDifficulty('hard')">Difícil</button>
                <button class="sudoku-difficulty-btn" onclick="newSudokuGame()">Novo Jogo</button>
            </div>
            
            <div class="sudoku-board" id="sudokuBoard"></div>
            
            <div class="sudoku-number-pad" id="numberPad">
                <button class="sudoku-number-btn" onclick="inputNumber(1)">1</button>
                <button class="sudoku-number-btn" onclick="inputNumber(2)">2</button>
                <button class="sudoku-number-btn" onclick="inputNumber(3)">3</button>
                <button class="sudoku-number-btn" onclick="inputNumber(4)">4</button>
                <button class="sudoku-number-btn" onclick="inputNumber(5)">5</button>
                <button class="sudoku-number-btn" onclick="inputNumber(6)">6</button>
                <button class="sudoku-number-btn" onclick="inputNumber(7)">7</button>
                <button class="sudoku-number-btn" onclick="inputNumber(8)">8</button>
                <button class="sudoku-number-btn" onclick="inputNumber(9)">9</button>
                <button class="sudoku-number-btn clear" onclick="clearCell()">Limpar</button>
            </div>
            
            <div class="sudoku-stats" id="sudokuStats">
                <div>Erros: <span id="mistakesCount">0</span></div>
                <div>Tempo: <span class="sudoku-timer" id="sudokuTimer">00:00</span></div>
            </div>
        </div>
    `;
    
    initializeSudokuGame();
}

// Inicializar o jogo de Sudoku
function initializeSudokuGame() {
    sudokuGame.mistakes = 0;
    sudokuGame.selectedCell = null;
    generateSudokuBoard();
    startSudokuTimer();
    updateSudokuStats();
}

// Gerar tabuleiro de Sudoku
function generateSudokuBoard() {
    const boardElement = document.getElementById('sudokuBoard');
    boardElement.innerHTML = '';
    
    // Gerar um novo puzzle baseado na dificuldade
    const puzzle = generateSudokuPuzzle(sudokuGame.difficulty);
    sudokuGame.board = puzzle.board;
    sudokuGame.solution = puzzle.solution;
    
    // Criar células do tabuleiro
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.className = 'sudoku-cell';
        cell.dataset.index = i;
        
        const row = Math.floor(i / 9);
        const col = i % 9;
        const value = sudokuGame.board[row][col];
        
        if (value !== 0) {
            cell.textContent = value;
            cell.classList.add('given');
        } else {
            cell.classList.add('user-input');
        }
        
        cell.addEventListener('click', () => selectCell(i));
        boardElement.appendChild(cell);
    }
}

// Selecionar célula
function selectCell(index) {
    // Remover seleção anterior
    if (sudokuGame.selectedCell !== null) {
        const prevCell = document.querySelector(`.sudoku-cell[data-index="${sudokuGame.selectedCell}"]`);
        prevCell.classList.remove('selected');
        clearHighlights();
    }
    
    // Selecionar nova célula
    const cell = document.querySelector(`.sudoku-cell[data-index="${index}"]`);
    if (!cell.classList.contains('given')) {
        cell.classList.add('selected');
        sudokuGame.selectedCell = index;
        highlightRelatedCells(index);
    }
}

// Destacar células relacionadas
function highlightRelatedCells(index) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    
    // Destacar linha, coluna e quadrante
    for (let i = 0; i < 81; i++) {
        const currentRow = Math.floor(i / 9);
        const currentCol = i % 9;
        const cell = document.querySelector(`.sudoku-cell[data-index="${i}"]`);
        
        if (currentRow === row || currentCol === col || 
            (Math.floor(currentRow / 3) === Math.floor(row / 3) && 
             Math.floor(currentCol / 3) === Math.floor(col / 3))) {
            cell.classList.add('highlighted');
        }
    }
}

// Limpar destaques
function clearHighlights() {
    document.querySelectorAll('.sudoku-cell.highlighted').forEach(cell => {
        cell.classList.remove('highlighted');
    });
}

// Inserir número
function inputNumber(number) {
    if (sudokuGame.selectedCell === null) return;
    
    const cell = document.querySelector(`.sudoku-cell[data-index="${sudokuGame.selectedCell}"]`);
    const index = sudokuGame.selectedCell;
    const row = Math.floor(index / 9);
    const col = index % 9;
    
    // Verificar se o movimento é válido
    if (isValidMove(row, col, number)) {
        cell.textContent = number;
        sudokuGame.board[row][col] = number;
        
        // Verificar se o jogo foi completado
        if (isSudokuComplete()) {
            completeSudokuGame();
        }
    } else {
        // Movimento inválido
        cell.classList.add('error');
        setTimeout(() => cell.classList.remove('error'), 500);
        sudokuGame.mistakes++;
        updateSudokuStats();
    }
}

// Limpar célula
function clearCell() {
    if (sudokuGame.selectedCell === null) return;
    
    const cell = document.querySelector(`.sudoku-cell[data-index="${sudokuGame.selectedCell}"]`);
    const index = sudokuGame.selectedCell;
    const row = Math.floor(index / 9);
    const col = index % 9;
    
    if (!cell.classList.contains('given')) {
        cell.textContent = '';
        sudokuGame.board[row][col] = 0;
    }
}

// Verificar se movimento é válido
function isValidMove(row, col, number) {
    // Verificar linha
    for (let i = 0; i < 9; i++) {
        if (sudokuGame.board[row][i] === number && i !== col) return false;
    }
    
    // Verificar coluna
    for (let i = 0; i < 9; i++) {
        if (sudokuGame.board[i][col] === number && i !== row) return false;
    }
    
    // Verificar quadrante
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudokuGame.board[i][j] === number && (i !== row || j !== col)) return false;
        }
    }
    
    return true;
}

// Verificar se o Sudoku está completo
function isSudokuComplete() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuGame.board[i][j] === 0) return false;
        }
    }
    return true;
}

// Completar o jogo
function completeSudokuGame() {
    clearInterval(sudokuGame.timer);
    
    const container = document.querySelector('.sudoku-container');
    const completeDiv = document.createElement('div');
    completeDiv.className = 'sudoku-complete';
    completeDiv.innerHTML = `
        <h3>🎉 Parabéns! 🎉</h3>
        <p>Você completou o Sudoku!</p>
        <p>Tempo: ${document.getElementById('sudokuTimer').textContent}</p>
        <p>Erros: ${sudokuGame.mistakes}</p>
        <button class="sudoku-difficulty-btn" onclick="newSudokuGame()" style="margin-top: 10px;">
            Jogar Novamente
        </button>
    `;
    
    container.appendChild(completeDiv);
}

// Configurar dificuldade
function setSudokuDifficulty(difficulty) {
    sudokuGame.difficulty = difficulty;
    
    // Atualizar botões ativos
    document.querySelectorAll('.sudoku-difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
    
    newSudokuGame();
}

// Novo jogo
function newSudokuGame() {
    clearInterval(sudokuGame.timer);
    initializeSudokuGame();
}

// Iniciar timer
function startSudokuTimer() {
    sudokuGame.startTime = new Date();
    sudokuGame.timer = setInterval(updateSudokuTimer, 1000);
}

// Atualizar timer
function updateSudokuTimer() {
    const currentTime = new Date();
    const elapsed = Math.floor((currentTime - sudokuGame.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    document.getElementById('sudokuTimer').textContent = `${minutes}:${seconds}`;
}

// Atualizar estatísticas
function updateSudokuStats() {
    document.getElementById('mistakesCount').textContent = sudokuGame.mistakes;
}

// Gerador de puzzles de Sudoku (simplificado)
function generateSudokuPuzzle(difficulty) {
    // Para um projeto real, você precisaria de um gerador mais sofisticado
    // Aqui estão alguns exemplos pré-definidos para demonstração
    
    const puzzles = {
        easy: {
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            solution: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ]
        },
        medium: {
            board: [
                [0, 0, 0, 6, 0, 0, 4, 0, 0],
                [7, 0, 0, 0, 0, 3, 6, 0, 0],
                [0, 0, 0, 0, 9, 1, 0, 8, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 0, 1, 8, 0, 0, 0, 3],
                [0, 0, 0, 3, 0, 6, 0, 4, 5],
                [0, 4, 0, 2, 0, 0, 0, 6, 0],
                [9, 0, 3, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 1, 0, 0]
            ],
            solution: [
                [5, 8, 1, 6, 7, 2, 4, 3, 9],
                [7, 9, 2, 8, 4, 3, 6, 5, 1],
                [3, 6, 4, 5, 9, 1, 7, 8, 2],
                [4, 3, 8, 9, 5, 7, 2, 1, 6],
                [2, 5, 6, 1, 8, 4, 9, 7, 3],
                [1, 7, 9, 3, 2, 6, 8, 4, 5],
                [8, 4, 5, 2, 1, 9, 3, 6, 7],
                [9, 1, 3, 7, 6, 8, 5, 2, 4],
                [6, 2, 7, 4, 3, 5, 1, 9, 8]
            ]
        },
        hard: {
            board: [
                [8, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 6, 0, 0, 0, 0, 0],
                [0, 7, 0, 0, 9, 0, 2, 0, 0],
                [0, 5, 0, 0, 0, 7, 0, 0, 0],
                [0, 0, 0, 0, 4, 5, 7, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 3, 0],
                [0, 0, 1, 0, 0, 0, 0, 6, 8],
                [0, 0, 8, 5, 0, 0, 0, 1, 0],
                [0, 9, 0, 0, 0, 0, 4, 0, 0]
            ],
            solution: [
                [8, 1, 2, 7, 5, 3, 6, 4, 9],
                [9, 4, 3, 6, 8, 2, 1, 7, 5],
                [6, 7, 5, 4, 9, 1, 2, 8, 3],
                [1, 5, 4, 2, 3, 7, 8, 9, 6],
                [3, 6, 9, 8, 4, 5, 7, 2, 1],
                [2, 8, 7, 1, 6, 9, 5, 3, 4],
                [5, 2, 1, 9, 7, 4, 3, 6, 8],
                [4, 3, 8, 5, 2, 6, 9, 1, 7],
                [7, 9, 6, 3, 1, 8, 4, 5, 2]
            ]
        }
    };
    
    return puzzles[difficulty] || puzzles.medium;
}

// JOGO 22 JOGO DA VELHA
// =============================================================================
// JOGO DA VELHA - VARIÁVEIS GLOBAIS
// =============================================================================
let ticTacToeGame = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameMode: 'friend', // 'friend' ou 'computer'
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    gameActive: true,
    scores: { X: 0, O: 0, draws: 0 },
    playerSymbol: 'X' // Símbolo do jogador humano
};

// =============================================================================
// FUNÇÃO PRINCIPAL - CARREGAR JOGO DA VELHA
// =============================================================================
function loadTicTacToeGame() {
    const gameArea = document.getElementById('gameArea');
    const instructions = document.getElementById('gameInstructions');
    const gameTitle = document.getElementById('activeGameTitle');
    
    gameTitle.textContent = 'Jogo da Velha';
    instructions.innerHTML = `
        <h4>Como Jogar:</h4>
        <ul>
            <li>Clique em uma célula vazia para colocar seu símbolo (X ou O)</li>
            <li>O objetivo é formar uma linha de três símbolos (horizontal, vertical ou diagonal)</li>
            <li>No modo contra o computador, você joga como X</li>
            <li>Dificuldade fácil: Computador faz jogadas aleatórias</li>
            <li>Dificuldade média: Computador se defende bem</li>
            <li>Dificuldade difícil: Computador raramente perde</li>
        </ul>
    `;
    
    gameArea.innerHTML = `
        <div class="tic-tac-toe-container">
            <!-- Seleção de Modo -->
            <div class="tic-tac-toe-mode-select">
                <h4>Escolha o modo de jogo:</h4>
                <div class="tic-tac-toe-mode-buttons">
                    <button class="mode-btn active" data-mode="friend" onclick="setTicTacToeMode('friend')">
                        <i class="fas fa-users"></i> 2 Jogadores
                    </button>
                    <button class="mode-btn" data-mode="computer" onclick="setTicTacToeMode('computer')">
                        <i class="fas fa-robot"></i> Vs Computador
                    </button>
                </div>
            </div>

            <!-- Controles de Dificuldade (visível apenas no modo computador) -->
            <div class="tic-tac-toe-controls" id="difficultyControls" style="display: none;">
                <button class="tic-tac-toe-btn active" data-difficulty="easy" onclick="setTicTacToeDifficulty('easy')">Fácil</button>
                <button class="tic-tac-toe-btn" data-difficulty="medium" onclick="setTicTacToeDifficulty('medium')">Médio</button>
                <button class="tic-tac-toe-btn" data-difficulty="hard" onclick="setTicTacToeDifficulty('hard')">Difícil</button>
                <button class="tic-tac-toe-btn" onclick="newTicTacToeGame()">Novo Jogo</button>
            </div>

            <!-- Informações do Jogo -->
            <div class="tic-tac-toe-info" id="gameInfo">
                <span class="current-player">Vez do: X</span>
            </div>

            <!-- Tabuleiro -->
            <div class="tic-tac-toe-board" id="ticTacToeBoard"></div>

            <!-- Estatísticas -->
            <div class="tic-tac-toe-stats">
                <div class="stat-item">
                    <div class="stat-value" id="scoreX">0</div>
                    <div class="stat-label">Vitórias X</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="scoreO">0</div>
                    <div class="stat-label">Vitórias O</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="scoreDraws">0</div>
                    <div class="stat-label">Empates</div>
                </div>
            </div>

            <!-- Área de Resultado -->
            <div id="gameResult"></div>
        </div>
    `;
    
    initializeTicTacToeGame();
}

// =============================================================================
// INICIALIZAÇÃO DO JOGO
// =============================================================================
function initializeTicTacToeGame() {
    ticTacToeGame.board = Array(9).fill('');
    ticTacToeGame.currentPlayer = 'X';
    ticTacToeGame.gameActive = true;
    ticTacToeGame.playerSymbol = 'X';
    
    createTicTacToeBoard();
    updateTicTacToeInfo();
    updateTicTacToeScores();
    hideGameResult();
}

// =============================================================================
// CRIAÇÃO DO TABULEIRO
// =============================================================================
function createTicTacToeBoard() {
    const boardElement = document.getElementById('ticTacToeBoard');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'tic-tac-toe-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

// =============================================================================
// CONFIGURAÇÃO DO MODO DE JOGO
// =============================================================================
function setTicTacToeMode(mode) {
    ticTacToeGame.gameMode = mode;
    
    // Atualizar botões ativos
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar/ocultar controles de dificuldade
    const difficultyControls = document.getElementById('difficultyControls');
    difficultyControls.style.display = mode === 'computer' ? 'flex' : 'none';
    
    newTicTacToeGame();
}

// =============================================================================
// CONFIGURAÇÃO DA DIFICULDADE
// =============================================================================
function setTicTacToeDifficulty(difficulty) {
    ticTacToeGame.difficulty = difficulty;
    
    // Atualizar botões ativos
    document.querySelectorAll('.tic-tac-toe-btn[data-difficulty]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
}

// =============================================================================
// NOVO JOGO
// =============================================================================
function newTicTacToeGame() {
    ticTacToeGame.board = Array(9).fill('');
    ticTacToeGame.currentPlayer = 'X';
    ticTacToeGame.gameActive = true;
    
    // Limpar tabuleiro visual
    document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'tic-tac-toe-cell';
        cell.classList.remove('winner', 'disabled');
    });
    
    updateTicTacToeInfo();
    hideGameResult();
    
    // Se for modo computador e computador começa
    if (ticTacToeGame.gameMode === 'computer' && ticTacToeGame.currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

// =============================================================================
// CLIQUE NA CÉLULA
// =============================================================================
function handleCellClick(index) {
    // Verificar se o jogo está ativo e a célula está vazia
    if (!ticTacToeGame.gameActive || ticTacToeGame.board[index] !== '') {
        return;
    }
    
    // Verificar se é a vez do jogador humano no modo computador
    if (ticTacToeGame.gameMode === 'computer' && ticTacToeGame.currentPlayer !== ticTacToeGame.playerSymbol) {
        return;
    }
    
    // Fazer a jogada
    makeMove(index);
    
    // Verificar se o jogo continua
    if (ticTacToeGame.gameActive && ticTacToeGame.gameMode === 'computer' && ticTacToeGame.currentPlayer !== ticTacToeGame.playerSymbol) {
        setTimeout(computerMove, 500);
    }
}

// =============================================================================
// REALIZAR JOGADA
// =============================================================================
function makeMove(index) {
    // Atualizar tabuleiro lógico
    ticTacToeGame.board[index] = ticTacToeGame.currentPlayer;
    
    // Atualizar tabuleiro visual
    const cell = document.querySelector(`.tic-tac-toe-cell[data-index="${index}"]`);
    cell.textContent = ticTacToeGame.currentPlayer;
    cell.classList.add(ticTacToeGame.currentPlayer.toLowerCase());
    
    // Verificar se há vencedor
    const winner = checkWinner();
    if (winner) {
        endGame(winner);
        return;
    }
    
    // Verificar empate
    if (isBoardFull()) {
        endGame('draw');
        return;
    }
    
    // Alternar jogador
    ticTacToeGame.currentPlayer = ticTacToeGame.currentPlayer === 'X' ? 'O' : 'X';
    updateTicTacToeInfo();
}

// =============================================================================
// JOGADA DO COMPUTADOR
// =============================================================================
function computerMove() {
    if (!ticTacToeGame.gameActive) return;
    
    let move;
    
    switch (ticTacToeGame.difficulty) {
        case 'easy':
            move = getEasyMove();
            break;
        case 'medium':
            move = getMediumMove();
            break;
        case 'hard':
            move = getHardMove();
            break;
        default:
            move = getMediumMove();
    }
    
    if (move !== -1) {
        makeMove(move);
    }
}

// =============================================================================
// DIFICULDADE FÁCIL - JOGADAS ALEATÓRIAS
// =============================================================================
function getEasyMove() {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (ticTacToeGame.board[i] === '') {
            emptyCells.push(i);
        }
    }
    
    if (emptyCells.length === 0) return -1;
    
    // 80% de chance de jogada aleatória, 20% de jogada inteligente
    if (Math.random() < 0.8) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else {
        return getSmartMove();
    }
}

// =============================================================================
// DIFICULDADE MÉDIA - DEFESA E ATAQUE BÁSICO
// =============================================================================
function getMediumMove() {
    // 1. Tentar vencer
    const winningMove = getWinningMove(ticTacToeGame.currentPlayer);
    if (winningMove !== -1) return winningMove;
    
    // 2. Bloquear jogador
    const blockMove = getWinningMove(ticTacToeGame.currentPlayer === 'X' ? 'O' : 'X');
    if (blockMove !== -1) return blockMove;
    
    // 3. Jogada inteligente
    const smartMove = getSmartMove();
    if (smartMove !== -1) return smartMove;
    
    // 4. Jogada aleatória
    return getRandomMove();
}

// =============================================================================
// DIFICULDADE DIFÍCIL - ALGORITMO MINIMAX
// =============================================================================
function getHardMove() {
    // Usar minimax para jogada perfeita
    return getBestMove();
}

// =============================================================================
// ALGORITMOS DE IA
// =============================================================================
function getWinningMove(player) {
    for (let i = 0; i < 9; i++) {
        if (ticTacToeGame.board[i] === '') {
            ticTacToeGame.board[i] = player;
            if (checkWinner() === player) {
                ticTacToeGame.board[i] = '';
                return i;
            }
            ticTacToeGame.board[i] = '';
        }
    }
    return -1;
}

function getSmartMove() {
    // Estratégias prioritárias
    const priorities = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // Centro, cantos, depois laterais
    
    for (let move of priorities) {
        if (ticTacToeGame.board[move] === '') {
            return move;
        }
    }
    return -1;
}

function getRandomMove() {
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (ticTacToeGame.board[i] === '') {
            emptyCells.push(i);
        }
    }
    return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < 9; i++) {
        if (ticTacToeGame.board[i] === '') {
            ticTacToeGame.board[i] = ticTacToeGame.currentPlayer;
            let score = minimax(ticTacToeGame.board, 0, false);
            ticTacToeGame.board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const winner = checkWinner();
    
    if (winner === ticTacToeGame.currentPlayer) return 10 - depth;
    if (winner === (ticTacToeGame.currentPlayer === 'X' ? 'O' : 'X')) return depth - 10;
    if (isBoardFull()) return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = ticTacToeGame.currentPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = ticTacToeGame.currentPlayer === 'X' ? 'O' : 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// =============================================================================
// VERIFICAÇÕES DO JOGO
// =============================================================================
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (ticTacToeGame.board[a] && 
            ticTacToeGame.board[a] === ticTacToeGame.board[b] && 
            ticTacToeGame.board[a] === ticTacToeGame.board[c]) {
            
            // Destacar células vencedoras
            highlightWinningCells(pattern);
            return ticTacToeGame.board[a];
        }
    }
    
    return null;
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        const cell = document.querySelector(`.tic-tac-toe-cell[data-index="${index}"]`);
        cell.classList.add('winner');
    });
}

function isBoardFull() {
    return ticTacToeGame.board.every(cell => cell !== '');
}

// =============================================================================
// FINALIZAÇÃO DO JOGO
// =============================================================================
function endGame(result) {
    ticTacToeGame.gameActive = false;
    
    // Desabilitar todas as células
    document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
        cell.classList.add('disabled');
    });
    
    // Atualizar placar
    if (result === 'X' || result === 'O') {
        ticTacToeGame.scores[result]++;
        showGameResult(`${result} venceu!`, result === ticTacToeGame.playerSymbol ? 'win' : 'loss');
    } else {
        ticTacToeGame.scores.draws++;
        showGameResult('Empate!', 'draw');
    }
    
    updateTicTacToeScores();
}

// =============================================================================
// ATUALIZAÇÕES DA INTERFACE
// =============================================================================
function updateTicTacToeInfo() {
    const gameInfo = document.getElementById('gameInfo');
    gameInfo.innerHTML = `<span class="current-player">Vez do: ${ticTacToeGame.currentPlayer}</span>`;
}

function updateTicTacToeScores() {
    document.getElementById('scoreX').textContent = ticTacToeGame.scores.X;
    document.getElementById('scoreO').textContent = ticTacToeGame.scores.O;
    document.getElementById('scoreDraws').textContent = ticTacToeGame.scores.draws;
}

function showGameResult(message, type) {
    const gameResult = document.getElementById('gameResult');
    gameResult.innerHTML = `
        <div class="tic-tac-toe-result result-${type}">
            <h3>${message}</h3>
            <button class="restart-btn" onclick="newTicTacToeGame()">
                <i class="fas fa-redo"></i> Jogar Novamente
            </button>
        </div>
    `;
}

function hideGameResult() {
    const gameResult = document.getElementById('gameResult');
    gameResult.innerHTML = '';
}


// JOgo 23 Palavras Cruzadas
// =============================================================================
// PALAVRAS CRUZADAS - VARIÁVEIS GLOBAIS
// =============================================================================
let crosswordGame = {
    board: [],
    clues: { across: [], down: [] },
    currentTheme: 'animais',
    currentDifficulty: 'medium',
    currentCell: null,
    currentDirection: 'across',
    completedWords: 0,
    totalWords: 0,
    startTime: null,
    timer: null
};

// =============================================================================
// BANCO DE DADOS DE PALAVRAS CRUZADAS POR TEMA E DIFICULDADE
// =============================================================================
const crosswordPuzzles = {
    animais: {
        easy: {
            size: 8,
            words: [
                { word: "GATO", clue: "Animal doméstico que mia", row: 1, col: 1, direction: "across" },
                { word: "CAO", clue: "Melhor amigo do homem", row: 1, col: 1, direction: "down" },
                { word: "PEIXE", clue: "Animal que vive na água", row: 3, col: 2, direction: "across" },
                { word: "PATO", clue: "Animal que nada e voa", row: 1, col: 4, direction: "down" },
                { word: "URSO", clue: "Animal grande e peludo", row: 5, col: 1, direction: "across" }
            ]
        },
        medium: {
            size: 10,
            words: [
                { word: "ELEFANTE", clue: "Animal de grande porte com tromba", row: 1, col: 1, direction: "across" },
                { word: "GIRAFA", clue: "Animal com pescoço muito comprido", row: 1, col: 3, direction: "down" },
                { word: "LEAO", clue: "Rei da selva", row: 4, col: 5, direction: "across" },
                { word: "TIGRE", clue: "Grande felino listrado", row: 2, col: 7, direction: "down" },
                { word: "MACACO", clue: "Primata que vive em árvores", row: 6, col: 2, direction: "across" },
                { word: "COBRA", clue: "Réptil rastejante", row: 3, col: 1, direction: "down" }
            ]
        },
        hard: {
            size: 12,
            words: [
                { word: "RINOCERONTE", clue: "Animal com chifre no nariz", row: 1, col: 1, direction: "across" },
                { word: "HIPOPOTAMO", clue: "Grande animal que vive na água", row: 3, col: 2, direction: "down" },
                { word: "CROCODILO", clue: "Réptil de grande porte com mandíbulas fortes", row: 5, col: 1, direction: "across" },
                { word: "PINGUIM", clue: "Ave que não voa e vive em regiões frias", row: 1, col: 8, direction: "down" },
                { word: "ORNITORRINCO", clue: "Mamífero que bota ovos", row: 7, col: 1, direction: "across" },
                { word: "CHIMPANZE", clue: "Primata muito inteligente", row: 4, col: 6, direction: "down" }
            ]
        }
    },
    frutas: {
        easy: {
            size: 8,
            words: [
                { word: "MACA", clue: "Fruta vermelha ou verde", row: 1, col: 1, direction: "across" },
                { word: "UVA", clue: "Fruta em cachos", row: 1, col: 1, direction: "down" },
                { word: "BANANA", clue: "Fruta alongada e amarela", row: 3, col: 2, direction: "across" },
                { word: "PERA", clue: "Fruta verde e suculenta", row: 1, col: 5, direction: "down" },
                { word: "MAMAO", clue: "Fruta laranja com sementes pretas", row: 5, col: 1, direction: "across" }
            ]
        },
        medium: {
            size: 10,
            words: [
                { word: "LARANJA", clue: "Fruta cítrica de cor laranja", row: 1, col: 1, direction: "across" },
                { word: "MORANGO", clue: "Fruta vermelha com sementes externas", row: 1, col: 3, direction: "down" },
                { word: "ABACAXI", clue: "Fruta tropical com coroa", row: 4, col: 2, direction: "across" },
                { word: "MELANCIA", clue: "Fruta grande e suculenta de verão", row: 2, col: 6, direction: "down" },
                { word: "LIMÃO", clue: "Fruta cítrica azeda", row: 6, col: 1, direction: "across" },
                { word: "PESSEGO", clue: "Fruta com caroço e pele aveludada", row: 3, col: 8, direction: "down" }
            ]
        },
        hard: {
            size: 12,
            words: [
                { word: "TAMARINDO", clue: "Fruta tropical de sabor agridoce", row: 1, col: 1, direction: "across" },
                { word: "CARAMBOLA", clue: "Fruta em formato de estrela", row: 3, col: 2, direction: "down" },
                { word: "FRAMBOESA", clue: "Pequena fruta vermelha de sabor doce", row: 5, col: 1, direction: "across" },
                { word: "GOIABADA", clue: "Doce feito de goiaba", row: 1, col: 8, direction: "down" },
                { word: "AMORAPORA", clue: "Fruta exótica com espinhos", row: 7, col: 1, direction: "across" },
                { word: "JABUTICABA", clue: "Fruta que cresce no tronco da árvore", row: 4, col: 6, direction: "down" }
            ]
        }
    },
    geografia: {
        easy: {
            size: 8,
            words: [
                { word: "BRASIL", clue: "Maior país da América do Sul", row: 1, col: 1, direction: "across" },
                { word: "LISBOA", clue: "Capital de Portugal", row: 1, col: 2, direction: "down" },
                { word: "RIO", clue: "Cidade brasileira conhecida pelo Cristo", row: 3, col: 4, direction: "across" },
                { word: "NILO", clue: "Maior rio da África", row: 1, col: 6, direction: "down" },
                { word: "ALPS", clue: "Cadeia de montanhas na Europa", row: 5, col: 1, direction: "across" }
            ]
        },
        medium: {
            size: 10,
            words: [
                { word: "CANADA", clue: "Segundo maior país do mundo", row: 1, col: 1, direction: "across" },
                { word: "EGITO", clue: "País das pirâmides", row: 1, col: 3, direction: "down" },
                { word: "LONDRES", clue: "Capital da Inglaterra", row: 4, col: 2, direction: "across" },
                { word: "AMAZONAS", clue: "Maior rio do mundo em volume", row: 2, col: 6, direction: "down" },
                { word: "TOQUIO", clue: "Capital do Japão", row: 6, col: 1, direction: "across" },
                { word: "HIMALAIA", clue: "Maior cadeia de montanhas do mundo", row: 3, col: 8, direction: "down" }
            ]
        },
        hard: {
            size: 12,
            words: [
                { word: "ARGENTINA", clue: "País vizinho do Brasil ao sul", row: 1, col: 1, direction: "across" },
                { word: "VENEZUELA", clue: "País com as cataratas Angel", row: 3, col: 2, direction: "down" },
                { word: "AUSTRALIA", clue: "Maior ilha do mundo", row: 5, col: 1, direction: "across" },
                { word: "ANTARTIDA", clue: "Continente gelado", row: 1, col: 8, direction: "down" },
                { word: "MADAGASCAR", clue: "Grande ilha na África", row: 7, col: 1, direction: "across" },
                { word: "GROENLANDIA", clue: "Maior ilha do mundo (território dinamarquês)", row: 4, col: 6, direction: "down" }
            ]
        }
    },
    conhecimentos: {
        easy: {
            size: 8,
            words: [
                { word: "SOL", clue: "Estrela do nosso sistema solar", row: 1, col: 1, direction: "across" },
                { word: "LUA", clue: "Satélite natural da Terra", row: 1, col: 1, direction: "down" },
                { word: "AGUA", clue: "Substância essencial para a vida", row: 3, col: 2, direction: "across" },
                { word: "FOGO", clue: "Elemento que produz calor e luz", row: 1, col: 5, direction: "down" },
                { word: "AR", clue: "Gás que respiramos", row: 5, col: 1, direction: "across" }
            ]
        },
        medium: {
            size: 10,
            words: [
                { word: "OXIGENIO", clue: "Gás essencial para a respiração", row: 1, col: 1, direction: "across" },
                { word: "CARBONO", clue: "Elemento base da vida orgânica", row: 1, col: 3, direction: "down" },
                { word: "GRAVIDADE", clue: "Força que atrai os corpos", row: 4, col: 1, direction: "across" },
                { word: "ELETRON", clue: "Partícula subatômica negativa", row: 2, col: 6, direction: "down" },
                { word: "ATOMO", clue: "Menor parte de um elemento", row: 6, col: 1, direction: "across" },
                { word: "CELULA", clue: "Unidade básica da vida", row: 3, col: 8, direction: "down" }
            ]
        },
        hard: {
            size: 12,
            words: [
                { word: "FOTOSSINTESE", clue: "Processo das plantas para produzir alimento", row: 1, col: 1, direction: "across" },
                { word: "MITOCONDRIA", clue: "Organela responsável pela respiração celular", row: 3, col: 2, direction: "down" },
                { word: "RELATIVIDADE", clue: "Teoria desenvolvida por Einstein", row: 5, col: 1, direction: "across" },
                { word: "QUASAR", clue: "Objeto astronômico extremamente brilhante", row: 1, col: 8, direction: "down" },
                { word: "NEUROCIENCIA", clue: "Estudo do sistema nervoso", row: 7, col: 1, direction: "across" },
                { word: "ANTROPOLOGIA", clue: "Ciência que estuda o ser humano", row: 4, col: 6, direction: "down" }
            ]
        }
    }
};

// =============================================================================
// FUNÇÃO PRINCIPAL - CARREGAR PALAVRAS CRUZADAS
// =============================================================================
function loadCrosswordGame() {
    const gameArea = document.getElementById('gameArea');
    const instructions = document.getElementById('gameInstructions');
    const gameTitle = document.getElementById('activeGameTitle');
    
    gameTitle.textContent = 'Palavras Cruzadas';
    instructions.innerHTML = `
        <h4>Como Jogar:</h4>
        <ul>
            <li>Escolha um tema e nível de dificuldade</li>
            <li>Clique em uma célula para selecioná-la</li>
            <li>Use as dicas para preencher as palavras</li>
            <li>Clique em uma dica para destacar a palavra correspondente</li>
            <li>Pressione Enter para mudar a direção (horizontal/vertical)</li>
            <li>Use "Verificar" para validar suas respostas</li>
        </ul>
    `;
    
    gameArea.innerHTML = `
        <div class="crossword-container">
            <!-- Seleção de Tema -->
            <div class="crossword-theme-select">
                <h4>Escolha o tema:</h4>
                <div class="crossword-theme-buttons">
                    <button class="theme-btn active" data-theme="animais" onclick="setCrosswordTheme('animais')">
                        🐾 Animais
                    </button>
                    <button class="theme-btn" data-theme="frutas" onclick="setCrosswordTheme('frutas')">
                        🍎 Frutas
                    </button>
                    <button class="theme-btn" data-theme="geografia" onclick="setCrosswordTheme('geografia')">
                        🌎 Geografia
                    </button>
                    <button class="theme-btn" data-theme="conhecimentos" onclick="setCrosswordTheme('conhecimentos')">
                        🧠 Conhecimentos Gerais
                    </button>
                </div>
            </div>

            <!-- Controles de Dificuldade -->
            <div class="crossword-controls">
                <button class="crossword-btn active" data-difficulty="easy" onclick="setCrosswordDifficulty('easy')">Fácil</button>
                <button class="crossword-btn" data-difficulty="medium" onclick="setCrosswordDifficulty('medium')">Médio</button>
                <button class="crossword-btn" data-difficulty="hard" onclick="setCrosswordDifficulty('hard')">Difícil</button>
                <button class="crossword-btn" onclick="newCrosswordGame()">Novo Jogo</button>
            </div>

            <!-- Área do Jogo -->
            <div class="crossword-game-area">
                <!-- Tabuleiro -->
                <div class="crossword-board-container">
                    <div class="crossword-board" id="crosswordBoard"></div>
                    <div class="crossword-info">
                        <div class="current-clue" id="currentClue">Selecione uma célula para ver a dica</div>
                    </div>
                </div>

                <!-- Dicas -->
                <div class="crossword-clues">
                    <div class="clues-section">
                        <h4>🡺 Horizontais</h4>
                        <div id="acrossClues"></div>
                    </div>
                    <div class="clues-section">
                        <h4>🡻 Verticais</h4>
                        <div id="downClues"></div>
                    </div>
                </div>
            </div>

            <!-- Estatísticas -->
            <div class="crossword-stats">
                <div class="crossword-stat">
                    <div class="crossword-stat-value" id="completedWords">0</div>
                    <div class="crossword-stat-label">Palavras Completas</div>
                </div>
                <div class="crossword-stat">
                    <div class="crossword-stat-value" id="totalWords">0</div>
                    <div class="crossword-stat-label">Total de Palavras</div>
                </div>
                <div class="crossword-stat">
                    <div class="crossword-stat-value" id="gameTimer">00:00</div>
                    <div class="crossword-stat-label">Tempo</div>
                </div>
            </div>

            <!-- Ações -->
            <div class="crossword-actions">
                <button class="action-btn primary" onclick="checkCrossword()">
                    <i class="fas fa-check"></i> Verificar
                </button>
                <button class="action-btn secondary" onclick="showSolution()">
                    <i class="fas fa-lightbulb"></i> Revelar
                </button>
                <button class="action-btn success" onclick="resetCrossword()">
                    <i class="fas fa-redo"></i> Reiniciar
                </button>
            </div>

            <!-- Resultado -->
            <div id="crosswordResult"></div>
        </div>
    `;
    
    initializeCrosswordGame();
}

// =============================================================================
// INICIALIZAÇÃO DO JOGO
// =============================================================================
function initializeCrosswordGame() {
    crosswordGame.completedWords = 0;
    crosswordGame.totalWords = 0;
    crosswordGame.currentCell = null;
    crosswordGame.currentDirection = 'across';
    
    generateCrosswordBoard();
    updateCrosswordStats();
    startCrosswordTimer();
    hideCrosswordResult();
}

// =============================================================================
// CONFIGURAÇÃO DO TEMA
// =============================================================================
function setCrosswordTheme(theme) {
    crosswordGame.currentTheme = theme;
    
    // Atualizar botões ativos
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
    
    newCrosswordGame();
}

// =============================================================================
// CONFIGURAÇÃO DA DIFICULDADE
// =============================================================================
function setCrosswordDifficulty(difficulty) {
    crosswordGame.currentDifficulty = difficulty;
    
    // Atualizar botões ativos
    document.querySelectorAll('.crossword-btn[data-difficulty]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
    
    newCrosswordGame();
}

// =============================================================================
// GERAR TABULEIRO
// =============================================================================
function generateCrosswordBoard() {
    const puzzle = crosswordPuzzles[crosswordGame.currentTheme][crosswordGame.currentDifficulty];
    const size = puzzle.size;
    
    // Inicializar tabuleiro vazio
    crosswordGame.board = Array(size).fill().map(() => Array(size).fill(''));
    crosswordGame.clues = { across: [], down: [] };
    
    // Processar palavras
    puzzle.words.forEach((wordObj, index) => {
        const number = index + 1;
        placeWordOnBoard(wordObj, number);
        addClue(wordObj, number);
    });
    
    crosswordGame.totalWords = puzzle.words.length;
    
    // Criar tabuleiro visual
    createVisualBoard(size);
    updateCluesDisplay();
}

// =============================================================================
// COLOCAR PALAVRA NO TABULEIRO
// =============================================================================
function placeWordOnBoard(wordObj, number) {
    const { word, row, col, direction } = wordObj;
    
    for (let i = 0; i < word.length; i++) {
        const r = row - 1 + (direction === 'down' ? i : 0);
        const c = col - 1 + (direction === 'across' ? i : 0);
        
        crosswordGame.board[r][c] = {
            letter: word[i],
            number: crosswordGame.board[r][c] ? crosswordGame.board[r][c].number : number,
            across: direction === 'across' ? number : (crosswordGame.board[r][c] ? crosswordGame.board[r][c].across : null),
            down: direction === 'down' ? number : (crosswordGame.board[r][c] ? crosswordGame.board[r][c].down : null)
        };
    }
}

// =============================================================================
// ADICIONAR DICA
// =============================================================================
function addClue(wordObj, number) {
    const clue = {
        number: number,
        clue: wordObj.clue,
        word: wordObj.word,
        direction: wordObj.direction,
        row: wordObj.row - 1,
        col: wordObj.col - 1,
        completed: false
    };
    
    crosswordGame.clues[wordObj.direction].push(clue);
}

// =============================================================================
// CRIAR TABULEIRO VISUAL
// =============================================================================
function createVisualBoard(size) {
    const boardElement = document.getElementById('crosswordBoard');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'crossword-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            const cellData = crosswordGame.board[i][j];
            
            if (cellData) {
                // Célula com letra
                const numberSpan = document.createElement('span');
                numberSpan.className = 'crossword-cell-number';
                numberSpan.textContent = cellData.number;
                
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.addEventListener('input', handleCellInput);
                input.addEventListener('keydown', handleCellKeydown);
                input.addEventListener('focus', () => selectCell(i, j));
                
                cell.appendChild(numberSpan);
                cell.appendChild(input);
            } else {
                // Célula preta
                cell.classList.add('black');
            }
            
            cell.addEventListener('click', () => selectCell(i, j));
            boardElement.appendChild(cell);
        }
    }
}

// =============================================================================
// MANIPULAÇÃO DE CÉLULAS
// =============================================================================
function selectCell(row, col) {
    // Remover seleção anterior
    if (crosswordGame.currentCell) {
        const prevCell = document.querySelector('.crossword-cell.selected');
        if (prevCell) prevCell.classList.remove('selected');
        clearHighlights();
    }
    const cell = document.querySelector(`.crossword-cell[data-row="${row}"][data-col="${col}"]`);
    if (cell && !cell.classList.contains('black')) {
        cell.classList.add('selected');
        crosswordGame.currentCell = { row, col };
        
        // Destacar palavra atual
        highlightCurrentWord();
        
        // Atualizar dica atual
        updateCurrentClue();
        
        // Focar no input
        const input = cell.querySelector('input');
        if (input) input.focus();
    }
}

function handleCellInput(event) {
    const input = event.target;
    const cell = input.parentElement;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // Mover para próxima célula automaticamente
    if (input.value && crosswordGame.currentDirection === 'across') {
        moveToNextCell(row, col + 1);
    } else if (input.value && crosswordGame.currentDirection === 'down') {
        moveToNextCell(row + 1, col);
    }
    
    // Verificar se palavra está completa
    checkWordCompletion();
}

function handleCellKeydown(event) {
    if (event.key === 'Enter') {
        // Alternar direção
        crosswordGame.currentDirection = crosswordGame.currentDirection === 'across' ? 'down' : 'across';
        highlightCurrentWord();
        updateCurrentClue();
    } else if (event.key === 'Backspace' && !event.target.value) {
        // Mover para célula anterior
        const cell = event.target.parentElement;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (crosswordGame.currentDirection === 'across') {
            moveToNextCell(row, col - 1);
        } else if (crosswordGame.currentDirection === 'down') {
            moveToNextCell(row - 1, col);
        }
    }
}

function moveToNextCell(row, col) {
    const size = crosswordPuzzles[crosswordGame.currentTheme][crosswordGame.currentDifficulty].size;
    
    if (row >= 0 && row < size && col >= 0 && col < size) {
        const nextCell = document.querySelector(`.crossword-cell[data-row="${row}"][data-col="${col}"]`);
        if (nextCell && !nextCell.classList.contains('black')) {
            selectCell(row, col);
            const input = nextCell.querySelector('input');
            if (input) input.focus();
        }
    }
}

// =============================================================================
// DESTAQUES E DICAS
// =============================================================================
function highlightCurrentWord() {
    if (!crosswordGame.currentCell) return;
    
    const { row, col } = crosswordGame.currentCell;
    const cellData = crosswordGame.board[row][col];
    
    if (!cellData) return;
    
    const wordNumber = crosswordGame.currentDirection === 'across' ? cellData.across : cellData.down;
    const clues = crosswordGame.clues[crosswordGame.currentDirection];
    const clue = clues.find(c => c.number === wordNumber);
    
    if (clue) {
        highlightWord(clue);
    }
}

function highlightWord(clue) {
    const { row, col, word, direction } = clue;
    
    for (let i = 0; i < word.length; i++) {
        const r = row + (direction === 'down' ? i : 0);
        const c = col + (direction === 'across' ? i : 0);
        
        const cell = document.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell) {
            cell.classList.add('highlighted');
        }
    }
}

function clearHighlights() {
    document.querySelectorAll('.crossword-cell.highlighted').forEach(cell => {
        cell.classList.remove('highlighted');
    });
}

function updateCurrentClue() {
    if (!crosswordGame.currentCell) return;
    
    const { row, col } = crosswordGame.currentCell;
    const cellData = crosswordGame.board[row][col];
    
    if (!cellData) return;
    
    const wordNumber = crosswordGame.currentDirection === 'across' ? cellData.across : cellData.down;
    const clues = crosswordGame.clues[crosswordGame.currentDirection];
    const clue = clues.find(c => c.number === wordNumber);
    
    const currentClueElement = document.getElementById('currentClue');
    if (clue) {
        currentClueElement.textContent = `${wordNumber} ${crosswordGame.currentDirection === 'across' ? '→' : '↓'} ${clue.clue}`;
    }
}

function updateCluesDisplay() {
    updateCluesSection('across', 'acrossClues');
    updateCluesSection('down', 'downClues');
}

function updateCluesSection(direction, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    crosswordGame.clues[direction].forEach(clue => {
        const clueElement = document.createElement('div');
        clueElement.className = `clue-item ${clue.completed ? 'completed' : ''}`;
        clueElement.innerHTML = `
            <span class="clue-number">${clue.number}.</span>
            <span class="clue-text">${clue.clue}</span>
        `;
        
        clueElement.addEventListener('click', () => {
            crosswordGame.currentDirection = direction;
            selectCell(clue.row, clue.col);
            highlightWord(clue);
        });
        
        container.appendChild(clueElement);
    });
}

// =============================================================================
// VERIFICAÇÕES E COMPLETUDE
// =============================================================================
function checkWordCompletion() {
    crosswordGame.completedWords = 0;
    
    // Verificar palavras horizontais
    crosswordGame.clues.across.forEach(clue => {
        if (isWordCorrect(clue)) {
            clue.completed = true;
            crosswordGame.completedWords++;
        }
    });
    
    // Verificar palavras verticais
    crosswordGame.clues.down.forEach(clue => {
        if (isWordCorrect(clue)) {
            clue.completed = true;
            crosswordGame.completedWords++;
        }
    });
    
    updateCrosswordStats();
    updateCluesDisplay();
    
    // Verificar se todas as palavras estão completas
    if (crosswordGame.completedWords === crosswordGame.totalWords) {
        completeCrosswordGame();
    }
}

function isWordCorrect(clue) {
    const { row, col, word, direction } = clue;
    
    for (let i = 0; i < word.length; i++) {
        const r = row + (direction === 'down' ? i : 0);
        const c = col + (direction === 'across' ? i : 0);
        
        const cell = document.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"] input`);
        if (!cell || cell.value.toUpperCase() !== word[i]) {
            return false;
        }
    }
    
    return true;
}

function checkCrossword() {
    let allCorrect = true;
    
    // Verificar todas as células
    for (let i = 0; i < crosswordGame.board.length; i++) {
        for (let j = 0; j < crosswordGame.board[i].length; j++) {
            const cellData = crosswordGame.board[i][j];
            if (cellData) {
                const cell = document.querySelector(`.crossword-cell[data-row="${i}"][data-col="${j}"]`);
                const input = cell.querySelector('input');
                
                if (input) {
                    if (input.value.toUpperCase() === cellData.letter) {
                        cell.classList.add('correct');
                        cell.classList.remove('error');
                    } else if (input.value) {
                        cell.classList.add('error');
                        cell.classList.remove('correct');
                        allCorrect = false;
                    }
                }
            }
        }
    }
    
    if (allCorrect) {
        completeCrosswordGame();
    }
}

// =============================================================================
// AÇÕES DO JOGO
// =============================================================================
function showSolution() {
    for (let i = 0; i < crosswordGame.board.length; i++) {
        for (let j = 0; j < crosswordGame.board[i].length; j++) {
            const cellData = crosswordGame.board[i][j];
            if (cellData) {
                const cell = document.querySelector(`.crossword-cell[data-row="${i}"][data-col="${j}"]`);
                const input = cell.querySelector('input');
                if (input) {
                    input.value = cellData.letter;
                    cell.classList.add('correct');
                }
            }
        }
    }
    
    crosswordGame.completedWords = crosswordGame.totalWords;
    updateCrosswordStats();
    updateCluesDisplay();
    completeCrosswordGame();
}

function resetCrossword() {
    document.querySelectorAll('.crossword-cell input').forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('correct', 'error');
    });
    
    crosswordGame.clues.across.forEach(clue => clue.completed = false);
    crosswordGame.clues.down.forEach(clue => clue.completed = false);
    
    crosswordGame.completedWords = 0;
    updateCrosswordStats();
    updateCluesDisplay();
    hideCrosswordResult();
}

function newCrosswordGame() {
    clearInterval(crosswordGame.timer);
    initializeCrosswordGame();
}

// =============================================================================
// TEMPORIZADOR E ESTATÍSTICAS
// =============================================================================
function startCrosswordTimer() {
    crosswordGame.startTime = new Date();
    crosswordGame.timer = setInterval(updateCrosswordTimer, 1000);
}

function updateCrosswordTimer() {
    const currentTime = new Date();
    const elapsed = Math.floor((currentTime - crosswordGame.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    document.getElementById('gameTimer').textContent = `${minutes}:${seconds}`;
}

function updateCrosswordStats() {
    document.getElementById('completedWords').textContent = crosswordGame.completedWords;
    document.getElementById('totalWords').textContent = crosswordGame.totalWords;
}

// =============================================================================
// FINALIZAÇÃO DO JOGO
// =============================================================================
function completeCrosswordGame() {
    clearInterval(crosswordGame.timer);
    
    const resultElement = document.getElementById('crosswordResult');
    resultElement.innerHTML = `
        <div class="crossword-complete">
            <h3>🎉 Parabéns! 🎉</h3>
            <p>Você completou todas as palavras cruzadas!</p>
            <p>Tema: ${crosswordGame.currentTheme}</p>
            <p>Dificuldade: ${crosswordGame.currentDifficulty}</p>
            <p>Tempo: ${document.getElementById('gameTimer').textContent}</p>
            <button class="action-btn primary" onclick="newCrosswordGame()" style="margin-top: 15px;">
                <i class="fas fa-redo"></i> Jogar Novamente
            </button>
        </div>
    `;
}

function hideCrosswordResult() {
    const resultElement = document.getElementById('crosswordResult');
    resultElement.innerHTML = '';
}

//Jogo 24 detetive
// JOGO 24 detetive
function loadDetectiveGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Detetive Investigador';
    gameInstructions.textContent = 'Resolva casos misteriosos coletando pistas e deduzindo o culpado!';
    
    // Limpa a área do jogo
    gameArea.innerHTML = `
        <div class="detective-game-container">
            <div class="case-header">
                <h3 id="caseTitle">Carregando caso...</h3>
                <div class="case-progress">
                    <span id="caseProgress">Caso 1 de 3</span>
                </div>
            </div>
            
            <div class="case-stats">
                <div class="stat">
                    <span class="label">Pistas Coletadas</span>
                    <span class="value" id="cluesFound">0/0</span>
                </div>
                <div class="stat">
                    <span class="label">Suspeitos Restantes</span>
                    <span class="value" id="suspectsCount">0</span>
                </div>
                <div class="stat">
                    <span class="label">Status</span>
                    <span class="value" id="caseStatus">🕵️ Investigando</span>
                </div>
            </div>
            
            <div class="investigation-area">
                <div class="clues-section">
                    <h4>🔍 Pistas do Caso</h4>
                    <div class="clues-container" id="cluesContainer">
                        <div class="no-clues">Clique em "Nova Pista" para começar</div>
                    </div>
                    <button class="detective-button" id="newClueButton" style="margin-top: 10px;">
                        🔍 Buscar Nova Pista
                    </button>
                </div>
                
                <div class="suspects-section">
                    <h4>👥 Lista de Suspeitos</h4>
                    <div class="suspects-container" id="suspectsContainer">
                        <!-- Suspeitos serão carregados aqui -->
                    </div>
                </div>
            </div>
            
            <div class="actions-section">
                <button class="detective-button primary" id="accuseButton">
                    🎯 Acusar Suspeito
                </button>
                <button class="detective-button secondary" id="nextCaseButton" style="display: none;">
                    📋 Próximo Caso
                </button>
                <button class="detective-button" id="restartCaseButton">
                    🔄 Reiniciar Caso
                </button>
            </div>
            
            <div class="detective-feedback" id="detectiveFeedback">
                Bem-vindo, detetive! Clique em "Buscar Nova Pista" para iniciar sua investigação.
            </div>
        </div>
    `;
    
    // Inicializar o jogo
    initDetectiveGame();
}

// ✅ VARIÁVEIS GLOBAIS DO JOGO
let detectiveGameState = {
    currentCase: 0,
    totalCases: 3,
    cluesFound: 0,
    totalClues: 5,
    gameCompleted: false,
    caseSolved: false,
    currentSuspects: [],
    availableClues: [],
    foundClues: []
};

// ✅ BANCO DE CASOS
const detectiveCases = [
    {
        id: 1,
        title: "O Mistério do Diamante Perdido",
        description: "Um diamante valioso foi roubado do museu durante a noite.",
        totalClues: 5,
        suspects: [
            { id: 1, name: "João Silva", occupation: "Segurança", motive: "Dívidas", isGuilty: false },
            { id: 2, name: "Maria Santos", occupation: "Curadora", motive: "Vingança", isGuilty: false },
            { id: 3, name: "Carlos Lima", occupation: "Visitante", motive: "Colecionador", isGuilty: true },
            { id: 4, name: "Ana Costa", occupation: "Faxineira", motive: "Necessidade", isGuilty: false }
        ],
        clues: [
            "💎 A vitrine foi aberta com chave mestra",
            "👣 Pegadas de sapato social foram encontradas",
            "🕵️ Uma testemunha viu alguém usando terno",
            "🚗 Um carro de luxo foi avistado na fuga",
            "🔑 Uma chave mestra foi encontrada no banheiro"
        ],
        solution: "Carlos Lima - As pistas do terno, sapato social e carro de luxo apontam para ele"
    },
    {
        id: 2,
        title: "O Caso do Computador Hackeado",
        description: "O sistema da empresa foi invadido e dados importantes foram roubados.",
        totalClues: 5,
        suspects: [
            { id: 1, name: "Pedro Alves", occupation: "Programador", motive: "Demissão", isGuilty: true },
            { id: 2, name: "Carla Mendes", occupation: "Gerente", motive: "Concorrência", isGuilty: false },
            { id: 3, name: "Ricardo Souza", occupation: "Estagiário", motive: "Prova", isGuilty: false }
        ],
        clues: [
            "💻 O hack foi feito com conhecimento interno",
            "⏰ Ocorreu às 18h30, após o horário comercial",
            "🔌 Um dispositivo USB foi encontrado",
            "📧 Um email suspeito foi enviado",
            "🎭 O IP foi mascarado com VPN"
        ],
        solution: "Pedro Alves - Tinha conhecimento técnico e motivo após ser demitido"
    },
    {
        id: 3,
        title: "O Sumiço da Herança",
        description: "Um testamento valioso desapareceu do escritório do advogado.",
        totalClues: 5,
        suspects: [
            { id: 1, name: "Dr. Roberto", occupation: "Advogado", motive: "Comissão", isGuilty: false },
            { id: 2, name: "Sofia Rocha", occupation: "Herdeira", motive: "Herança", isGuilty: true },
            { id: 3, name: "Marcos Ferreira", occupation: "Sócio", motive: "Empresa", isGuilty: false }
        ],
        clues: [
            "📄 O documento foi substituído por uma cópia",
            "💄 Batom foi encontrado na gaveta",
            "💍 Uma aliança foi esquecida no local",
            "🕒 O sumiço ocorreu durante o almoço",
            "📞 Uma chamada anônima foi feita"
        ],
        solution: "Sofia Rocha - As pistas do batom e aliança são dela"
    }
];

// ✅ FUNÇÃO PARA INICIAR O JOGO
function initDetectiveGame() {
    // SEMPRE REINICIAR O ESTADO DO JOGO
    resetDetectiveGame();
    
    // Carregar o primeiro caso
    loadCase(detectiveGameState.currentCase);
    
    // Configurar event listeners
    document.getElementById('newClueButton').addEventListener('click', findNewClue);
    document.getElementById('accuseButton').addEventListener('click', openAccusationModal);
    document.getElementById('nextCaseButton').addEventListener('click', loadNextCase);
    document.getElementById('restartCaseButton').addEventListener('click', restartCurrentCase);
    
    // Configurar interação com suspeitos
    setTimeout(setupSuspectsInteraction, 100);
}

// ✅ FUNÇÃO PARA REINICIAR O JOGO COMPLETAMENTE
function resetDetectiveGame() {
    detectiveGameState = {
        currentCase: 0,
        totalCases: detectiveCases.length,
        cluesFound: 0,
        totalClues: 5,
        gameCompleted: false,
        caseSolved: false,
        currentSuspects: [],
        availableClues: [],
        foundClues: []
    };
}

// ✅ FUNÇÃO PARA CARREGAR UM CASO - CORRIGIDA PARA LIMPEZA
function loadCase(caseIndex) {
    if (caseIndex >= detectiveCases.length) {
        // Todos os casos resolvidos
        showGameCompletion();
        return;
    }
    
    const currentCase = detectiveCases[caseIndex];
    
    // ✅ LIMPAR COMPLETAMENTE O ESTADO ANTERIOR
    detectiveGameState.currentCase = caseIndex;
    detectiveGameState.totalClues = currentCase.totalClues;
    detectiveGameState.cluesFound = 0;
    detectiveGameState.caseSolved = false;
    detectiveGameState.currentSuspects = [...currentCase.suspects];
    detectiveGameState.availableClues = [...currentCase.clues];
    detectiveGameState.foundClues = [];
    
    // ✅ LIMPAR A INTERFACE COMPLETAMENTE
    document.getElementById('caseTitle').textContent = `Caso #${caseIndex + 1}: ${currentCase.title}`;
    document.getElementById('caseProgress').textContent = `Caso ${caseIndex + 1} de ${detectiveCases.length}`;
    document.getElementById('cluesFound').textContent = `0/${currentCase.totalClues}`;
    document.getElementById('suspectsCount').textContent = currentCase.suspects.length;
    document.getElementById('caseStatus').textContent = '🕵️ Investigando';
    
    // ✅ LIMPAR E ATUALIZAR INTERFACE - MÉTODO CORRETO
    cleanAndUpdateInterface();
    
    // ✅ REINICIAR BOTÕES
    document.getElementById('nextCaseButton').style.display = 'none';
    document.getElementById('accuseButton').style.display = 'block';
    document.getElementById('accuseButton').textContent = '🎯 Acusar Suspeito';
    document.getElementById('accuseButton').removeAttribute('data-suspect-id');
    
    showDetectiveFeedback(`Caso #${caseIndex + 1} iniciado: ${currentCase.description}`, 'info');
}

// ✅ NOVA FUNÇÃO PARA LIMPAR COMPLETAMENTE A INTERFACE
function cleanAndUpdateInterface() {
    // Limpar pistas
    const cluesContainer = document.getElementById('cluesContainer');
    cluesContainer.innerHTML = '<div class="no-clues">Nenhuma pista encontrada ainda</div>';
    
    // Limpar e recriar suspeitos COMPLETAMENTE
    updateSuspectsDisplay();
}

// ✅ FUNÇÃO PARA CARREGAR PRÓXIMO CASO - CORRIGIDA
function loadNextCase() {
    // ✅ FECHAR QUALQUER MODAL ABERTO
    closeAccusationModal();
    
    detectiveGameState.currentCase++;
    
    if (detectiveGameState.currentCase < detectiveCases.length) {
        // ✅ loadCase() JÁ FAZ A LIMPEZA COMPLETA
        loadCase(detectiveGameState.currentCase);
    } else {
        showGameCompletion();
    }
}

// ✅ FUNÇÃO PARA ENCONTRAR NOVA PISTA
function findNewClue() {
    if (detectiveGameState.caseSolved) {
        showDetectiveFeedback('Este caso já foi resolvido! Clique em "Próximo Caso".', 'warning');
        return;
    }
    
    if (detectiveGameState.cluesFound >= detectiveGameState.totalClues) {
        showDetectiveFeedback('Todas as pistas deste caso já foram encontradas!', 'info');
        return;
    }
    
    if (detectiveGameState.availableClues.length === 0) {
        showDetectiveFeedback('Não há mais pistas disponíveis!', 'warning');
        return;
    }
    
    // Encontrar pista aleatória
    const randomIndex = Math.floor(Math.random() * detectiveGameState.availableClues.length);
    const newClue = detectiveGameState.availableClues[randomIndex];
    
    // Remover pista das disponíveis e adicionar às encontradas
    detectiveGameState.availableClues.splice(randomIndex, 1);
    detectiveGameState.foundClues.push(newClue);
    detectiveGameState.cluesFound++;
    
    // Atualizar interface
    updateCluesDisplay();
    document.getElementById('cluesFound').textContent = 
        `${detectiveGameState.cluesFound}/${detectiveGameState.totalClues}`;
    
    showDetectiveFeedback(`Nova pista encontrada: ${newClue}`, 'success');
    
    // Verificar se todas as pistas foram encontradas
    if (detectiveGameState.cluesFound >= detectiveGameState.totalClues) {
        showDetectiveFeedback('Todas as pistas foram coletadas! Agora faça sua acusação.', 'success');
    }
}

// ✅ FUNÇÃO PARA ATUALIZAR PISTAS NA TELA
function updateCluesDisplay() {
    const cluesContainer = document.getElementById('cluesContainer');
    
    if (detectiveGameState.foundClues.length === 0) {
        cluesContainer.innerHTML = '<div class="no-clues">Nenhuma pista encontrada ainda</div>';
        return;
    }
    
    cluesContainer.innerHTML = detectiveGameState.foundClues.map(clue => 
        `<div class="clue-item">${clue}</div>`
    ).join('');
}

// ✅ FUNÇÃO PARA ATUALIZAR SUSPEITOS NA TELA - CORRIGIDA
function updateSuspectsDisplay() {
    const suspectsContainer = document.getElementById('suspectsContainer');
    
    // ✅ LIMPAR COMPLETAMENTE OS SUSPEITOS ANTERIORES
    suspectsContainer.innerHTML = '';
    
    // ✅ CRIAR NOVOS SUSPEITOS SEM BADGES
    detectiveGameState.currentSuspects.forEach(suspect => {
        const suspectElement = document.createElement('div');
        suspectElement.className = 'suspect-item';
        suspectElement.dataset.id = suspect.id;
        
        suspectElement.innerHTML = `
            <div class="suspect-name">${suspect.name}</div>
            <div class="suspect-details">
                <span class="occupation">${suspect.occupation}</span>
                <span class="motive">Motivo: ${suspect.motive}</span>
            </div>
        `;
        
        suspectsContainer.appendChild(suspectElement);
    });
    
    // ✅ RECONFIGURAR OS EVENTOS DE CLIQUE
    setupSuspectsInteraction();
}

// ✅ FUNÇÃO PARA CONFIGURAR CLIQUE NOS SUSPEITOS
function setupSuspectsInteraction() {
    const suspectItems = document.querySelectorAll('.suspect-item');
    
    suspectItems.forEach(suspect => {
        suspect.addEventListener('click', function() {
            if (detectiveGameState.caseSolved) {
                showDetectiveFeedback('Este caso já foi resolvido!', 'warning');
                return;
            }
            
            const suspectId = parseInt(this.dataset.id);
            selectSuspect(suspectId);
        });
    });
}

// ✅ FUNÇÃO PARA SELECIONAR SUSPEITO
function selectSuspect(suspectId) {
    // Remover seleção anterior
    document.querySelectorAll('.suspect-item').forEach(item => {
        item.classList.remove('selected', 'guilty', 'innocent');
    });
    
    // Selecionar novo suspeito
    const selectedSuspect = document.querySelector(`.suspect-item[data-id="${suspectId}"]`);
    selectedSuspect.classList.add('selected');
    
    const suspect = detectiveGameState.currentSuspects.find(s => s.id === suspectId);
    
    showDetectiveFeedback(
        `Você selecionou ${suspect.name}. Clique em "Acusar Suspeito" para confirmar.`, 
        'info'
    );
    
    // Atualizar botão de acusação
    document.getElementById('accuseButton').textContent = `🎯 Acusar ${suspect.name}`;
    document.getElementById('accuseButton').dataset.suspectId = suspectId;
}

// ✅ FUNÇÃO PARA ABRIR MODAL DE ACUSAÇÃO
function openAccusationModal() {
    const suspectId = document.getElementById('accuseButton').dataset.suspectId;
    
    if (!suspectId) {
        showDetectiveFeedback('Selecione um suspeito primeiro!', 'warning');
        return;
    }
    
    if (detectiveGameState.cluesFound < 3) {
        showDetectiveFeedback('Colete pelo menos 3 pistas antes de acusar!', 'warning');
        return;
    }
    
    const suspect = detectiveGameState.currentSuspects.find(s => s.id === parseInt(suspectId));
    
    // Criar modal de confirmação
    const modalHTML = `
        <div class="accusation-modal" id="accusationModal">
            <div class="modal-content">
                <div class="modal-title">🎯 Confirmar Acusação</div>
                <div class="modal-body">
                    <p>Você está prestes a acusar:</p>
                    <div class="accused-suspect">
                        <strong>${suspect.name}</strong><br>
                        <small>${suspect.occupation}</small>
                    </div>
                    <p class="warning-text">⚠️ Esta ação não pode ser desfeita!</p>
                </div>
                <div class="modal-actions">
                    <button class="detective-button danger" id="confirmAccusation">
                        ✅ Confirmar Acusação
                    </button>
                    <button class="detective-button secondary" id="cancelAccusation">
                        ❌ Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos do modal
    document.getElementById('confirmAccusation').addEventListener('click', () => {
        makeAccusation(parseInt(suspectId));
        closeAccusationModal();
    });
    
    document.getElementById('cancelAccusation').addEventListener('click', closeAccusationModal);
    
    // Fechar modal ao clicar fora
    document.getElementById('accusationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAccusationModal();
        }
    });
}

// ✅ FUNÇÃO PARA FAZER A ACUSAÇÃO - CORRIGIDA
function makeAccusation(suspectId) {
    const currentCase = detectiveCases[detectiveGameState.currentCase];
    const accusedSuspect = currentCase.suspects.find(s => s.id === suspectId);
    const isCorrect = accusedSuspect.isGuilty;
    
    // Marcar caso como resolvido
    detectiveGameState.caseSolved = true;
    
    // ✅ MÉTODO SEGURO PARA REVELAR SUSPEITOS - SEM ACUMULAR HTML
    revealSuspects(currentCase);
    
    // Mostrar resultado
    if (isCorrect) {
        showDetectiveFeedback(
            `🎉 PARABÉNS! Você prendeu o culpado correto: ${accusedSuspect.name}! ${currentCase.solution}`,
            'success'
        );
        
        // Bônus por acerto
        const points = 100 + (detectiveGameState.cluesFound * 20);
        addScore(points);
        
        // Mostrar botão próximo caso
        document.getElementById('nextCaseButton').style.display = 'block';
        document.getElementById('accuseButton').style.display = 'none';
        
    } else {
        showDetectiveFeedback(
            `❌ Acusação incorreta! ${accusedSuspect.name} era inocente. O verdadeiro culpado escapou...`,
            'warning'
        );
        
        // Penalidade por acusação errada
        addScore(-20);
        
        // ✅ USAR setTimeout COM FUNÇÃO DE LIMPEZA CORRETA
        setTimeout(() => {
            resetAccusationState();
        }, 3000);
    }
    
    document.getElementById('caseStatus').textContent = isCorrect ? '✅ Caso Resolvido' : '❌ Culpado Escapou';
}

// ✅ NOVA FUNÇÃO PARA REVELAR SUSPEITOS DE FORMA SEGURA
function revealSuspects(currentCase) {
    const suspectItems = document.querySelectorAll('.suspect-item');
    
    suspectItems.forEach(item => {
        const itemId = parseInt(item.dataset.id);
        const suspect = currentCase.suspects.find(s => s.id === itemId);
        
        // ✅ LIMPAR CLASSES ANTERIORES
        item.classList.remove('selected', 'guilty', 'innocent');
        
        // ✅ REMOVER BADGES EXISTENTES
        const existingBadges = item.querySelectorAll('.guilty-badge, .innocent-badge');
        existingBadges.forEach(badge => badge.remove());
        
        // ✅ ADICIONAR NOVAS CLASSES E BADGES
        if (suspect.isGuilty) {
            item.classList.add('guilty');
            const guiltyBadge = document.createElement('div');
            guiltyBadge.className = 'guilty-badge';
            guiltyBadge.textContent = '🔴 CULPADO';
            item.appendChild(guiltyBadge);
        } else {
            item.classList.add('innocent');
            const innocentBadge = document.createElement('div');
            innocentBadge.className = 'innocent-badge';
            innocentBadge.textContent = '🟢 INOCENTE';
            item.appendChild(innocentBadge);
        }
    });
}

// ✅ NOVA FUNÇÃO PARA RESETAR ESTADO DE ACUSAÇÃO
function resetAccusationState() {
    detectiveGameState.caseSolved = false;
    
    const suspectItems = document.querySelectorAll('.suspect-item');
    suspectItems.forEach(item => {
        // ✅ LIMPAR CLASSES
        item.classList.remove('guilty', 'innocent', 'selected');
        
        // ✅ REMOVER BADGES
        const badges = item.querySelectorAll('.guilty-badge, .innocent-badge');
        badges.forEach(badge => badge.remove());
    });
    
    // ✅ REATIVAR BOTÃO DE ACUSAÇÃO
    document.getElementById('accuseButton').textContent = '🎯 Acusar Suspeito';
    document.getElementById('accuseButton').removeAttribute('data-suspect-id');
    
    showDetectiveFeedback('Tente novamente! Analise as pistas com mais atenção.', 'info');
}

// ✅ FUNÇÃO PARA FECHAR MODAL
function closeAccusationModal() {
    const modal = document.getElementById('accusationModal');
    if (modal) {
        modal.remove();
    }
}

// ✅ FUNÇÃO PARA REINICIAR CASO ATUAL
function restartCurrentCase() {
    // ✅ USAR A MESMA LÓGICA DE LIMPEZA
    loadCase(detectiveGameState.currentCase);
    showDetectiveFeedback('Caso reiniciado! Todas as pistas foram resetadas.', 'info');
}

// ✅ FUNÇÃO PARA MOSTRAR CONCLUSÃO DO JOGO
function showGameCompletion() {
    document.getElementById('caseTitle').textContent = 'Missão Cumprida! 🎉';
    document.getElementById('caseStatus').textContent = '✅ Todos os casos resolvidos';
    document.getElementById('nextCaseButton').style.display = 'none';
    document.getElementById('accuseButton').style.display = 'none';
    
    showDetectiveFeedback('Parabéns! Você resolveu todos os casos misteriosos!', 'victory');
    
    // Adicionar pontos bônus
    addScore(100);
}

// ✅ FUNÇÃO PARA MOSTRAR FEEDBACK
function showDetectiveFeedback(message, type) {
    const feedback = document.getElementById('detectiveFeedback');
    feedback.textContent = message;
    feedback.className = `detective-feedback ${type}`;
}
//FIM DOS JOGOS
/////////////////////////////////////////////////////////////////////////////////
// Função auxiliar para jogos básicos
function setupBasicGame(title, instructions, content, points) {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = title;
    gameInstructions.textContent = instructions;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>${title}</h3>
            <div style="font-size: 2rem; margin: 20px 0; color: #6a11cb;">${content}</div>
            <p>Jogo em desenvolvimento - Versão completa em breve!</p>
            <button class="game-button" onclick="addScore(${points})">Simular Acerto (+${points})</button>
        </div>
    `;
    
    gameArea.appendChild(gameContainer);
}

// Função auxiliar para mover peças do quebra-cabeça
function movePuzzlePiece(number) {
    alert(`Movendo peça ${number} - Funcionalidade completa em desenvolvimento!`);
    addScore(2);
}
// Funções de Acessibilidade
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    panel.classList.toggle('show');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
}

function toggleReduceMotion() {
    document.body.classList.toggle('reduce-motion');
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text', 'reduce-motion');
    document.getElementById('highContrast').checked = false;
    document.getElementById('largeText').checked = false;
    document.getElementById('reduceMotion').checked = false;
}

// Detectar navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
});

// Exemplo no final de um jogo de memória
function gameCompleted(score, level) {
    // Enviar pontuação para o sistema de progresso
    if (window.updateGameScore) {
        window.updateGameScore('memoria', score, level);
    }
    
    // Ou usar localStorage para comunicação entre páginas
    localStorage.setItem('lastGameResult', JSON.stringify({
        game: 'memoria',
        score: score,
        level: level,
        timestamp: new Date().toISOString()
    }));
}