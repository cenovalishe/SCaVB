// ==========================================
// SCaV RANDOMIZER - Main Application Logic
// CCTV/Retro Style UI
// ==========================================

const SCRIPT_URL = '/api/submit';

// ==========================================
// STATE MANAGEMENT
// ==========================================

const state = {
    player: null,
    route: null,
    currentEnemy: null,
    stage: null, // 'event', 'item', 'game'
    isAutoMode: true,
    rerollUsed: false,
    isSpinning: false,
    isSending: false,
    currentSegments: [],
    lastResult: null,
    gameResult: null,
    logHistory: []
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const elements = {
    playerButtons: document.getElementById('playerButtons'),
    controlsRow: document.getElementById('controlsRow'),
    gameArea: document.getElementById('gameArea'),
    routeSelect: document.getElementById('routeSelect'),
    enemyDisplay: document.getElementById('enemyDisplay'),
    enemyName: document.getElementById('enemyName'),
    stageEvent: document.getElementById('stageEvent'),
    stageItem: document.getElementById('stageItem'),
    stageGame: document.getElementById('stageGame'),
    wheelCanvas: document.getElementById('wheelCanvas'),
    spinBtn: document.getElementById('spinBtn'),
    resultDisplay: document.getElementById('resultDisplay'),
    resultTitle: document.getElementById('resultTitle'),
    resultDescription: document.getElementById('resultDescription'),
    resultExtra: document.getElementById('resultExtra'),
    gameStatusPanel: document.getElementById('gameStatusPanel'),
    currentGameDisplay: document.getElementById('currentGameDisplay'),
    btnComplete: document.getElementById('btnComplete'),
    btnReroll: document.getElementById('btnReroll'),
    btnDrop: document.getElementById('btnDrop'),
    sendingIndicator: document.getElementById('sendingIndicator'),
    messageDisplay: document.getElementById('messageDisplay'),
    messageText: document.getElementById('messageText'),
    legendContainer: document.getElementById('legendContainer'),
    logContainer: document.getElementById('logContainer'),
    clearLog: document.getElementById('clearLog'),
    eventPreset: document.getElementById('eventPreset'),
    itemPreset: document.getElementById('itemPreset'),
    gamePreset: document.getElementById('gamePreset'),
    applyPresets: document.getElementById('applyPresets'),
    resetBtn: document.getElementById('resetBtn'),
    infoPlayer: document.getElementById('infoPlayer'),
    infoPoint: document.getElementById('infoPoint'),
    infoEnemy: document.getElementById('infoEnemy'),
    infoMode: document.getElementById('infoMode'),
    notification: document.getElementById('notification'),
    notificationText: document.getElementById('notificationText'),
    currentTime: document.getElementById('currentTime'),
    currentDate: document.getElementById('currentDate')
};

// Canvas context
const ctx = elements.wheelCanvas.getContext('2d');
const wheelRadius = elements.wheelCanvas.width / 2;

// Wheel animation state
let wheelRotation = 0;
let targetRotation = 0;
let animationFrame = null;

// ==========================================
// INITIALIZATION
// ==========================================

function init() {
    createPlayerButtons();
    populateRouteSelect();
    populatePresetSelects();
    attachEventListeners();
    loadState();
    drawEmptyWheel();
    startClock();
}

function startClock() {
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('ru-RU', { hour12: false });
        const date = now.toLocaleDateString('ru-RU');

        if (elements.currentTime) {
            elements.currentTime.textContent = time;
        }
        if (elements.currentDate) {
            elements.currentDate.textContent = date;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

function createPlayerButtons() {
    GAME_DATA.players.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'player-btn';
        btn.dataset.player = player.id;
        btn.textContent = player.name;
        btn.style.borderColor = player.color;
        btn.style.color = player.color;
        elements.playerButtons.appendChild(btn);
    });
}

function populateRouteSelect() {
    const select = elements.routeSelect;

    // Green points
    const greenGroup = document.createElement('optgroup');
    greenGroup.label = '🟢 Зелёные';
    GAME_DATA.routePoints.green.forEach(point => {
        const opt = document.createElement('option');
        opt.value = point;
        opt.textContent = `🟢 ${point}`;
        greenGroup.appendChild(opt);
    });
    select.appendChild(greenGroup);

    // Red points
    const redGroup = document.createElement('optgroup');
    redGroup.label = '🔴 Красные';
    GAME_DATA.routePoints.red.forEach(point => {
        const opt = document.createElement('option');
        opt.value = point;
        opt.textContent = `🔴 ${point}`;
        redGroup.appendChild(opt);
    });
    select.appendChild(redGroup);

    // Blue points
    const blueGroup = document.createElement('optgroup');
    blueGroup.label = '🔵 Синие';
    GAME_DATA.routePoints.blue.forEach(point => {
        const opt = document.createElement('option');
        opt.value = point;
        opt.textContent = `🔵 ${point}`;
        blueGroup.appendChild(opt);
    });
    select.appendChild(blueGroup);
}

function populatePresetSelects() {
    // Event presets
    Object.keys(GAME_DATA.events.presets).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        elements.eventPreset.appendChild(opt);
    });

    // Item presets
    Object.keys(GAME_DATA.items.presets).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        elements.itemPreset.appendChild(opt);
    });

    // Game presets
    Object.keys(GAME_DATA.gamePresets).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        elements.gamePreset.appendChild(opt);
    });
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function attachEventListeners() {
    // Player selection
    elements.playerButtons.addEventListener('click', handlePlayerSelect);

    // Route selection
    elements.routeSelect.addEventListener('change', handleRouteSelect);

    // Stage buttons
    elements.stageEvent.addEventListener('click', () => handleStageSelect('event'));
    elements.stageItem.addEventListener('click', () => handleStageSelect('item'));
    elements.stageGame.addEventListener('click', () => handleStageSelect('game'));

    // Spin button
    elements.spinBtn.addEventListener('click', handleSpin);

    // Game status buttons
    elements.btnComplete.addEventListener('click', handleComplete);
    elements.btnReroll.addEventListener('click', handleReroll);
    elements.btnDrop.addEventListener('click', handleDrop);

    // Presets
    elements.applyPresets.addEventListener('click', handleApplyPresets);

    // Clear log
    elements.clearLog.addEventListener('click', clearLog);

    // Reset
    elements.resetBtn.addEventListener('click', handleReset);
}

// ==========================================
// HANDLERS
// ==========================================

function handlePlayerSelect(e) {
    if (!e.target.classList.contains('player-btn')) return;

    const playerId = e.target.dataset.player;
    const player = GAME_DATA.players.find(p => p.id === playerId);

    if (!player) return;

    // Update state
    state.player = player;

    // Update UI
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = btn.style.borderColor;
    });

    e.target.classList.add('active');
    e.target.style.background = player.color;
    e.target.style.color = '#0d0f10';

    // Show controls
    elements.controlsRow.style.display = 'flex';
    elements.gameArea.style.display = 'grid';
    elements.resetBtn.style.display = 'flex';

    // Update info
    elements.infoPlayer.textContent = player.name;

    saveState();
    showNotification(`Оператор: ${player.name}`);
}

function handleRouteSelect(e) {
    const point = e.target.value;

    if (!point) {
        state.route = null;
        state.currentEnemy = null;
        elements.enemyDisplay.style.display = 'none';
        drawEmptyWheel();
        updateSpinButton();
        saveState();
        return;
    }

    state.route = point;
    state.isAutoMode = true;
    state.rerollUsed = false;

    // Randomize enemy
    const enemies = GAME_DATA.enemies[point];
    if (enemies && enemies.length > 0) {
        const randomIndex = Math.floor(Math.random() * enemies.length);
        state.currentEnemy = enemies[randomIndex];
        elements.enemyName.textContent = state.currentEnemy.name;
        elements.enemyDisplay.style.display = 'flex';
    }

    // Set first stage
    state.stage = 'event';
    updateStageUI();
    loadStageData();

    // Update info
    elements.infoPoint.textContent = point;
    elements.infoEnemy.textContent = state.currentEnemy ? state.currentEnemy.name : '-';
    elements.infoMode.textContent = 'Авто';

    // Hide game status panel
    elements.gameStatusPanel.style.display = 'none';
    elements.spinBtn.style.display = 'inline-flex';

    saveState();
    showNotification(`Точка: ${point} | Враг: ${state.currentEnemy?.name || 'Нет'}`);
}

function handleStageSelect(stage) {
    if (state.isSpinning || state.isSending) return;

    // Manual stage selection disables auto mode
    state.isAutoMode = false;
    elements.infoMode.textContent = 'Ручной';

    state.stage = stage;
    updateStageUI();
    loadStageData();

    // Reset game status panel if switching away from game
    if (stage !== 'game') {
        elements.gameStatusPanel.style.display = 'none';
        elements.spinBtn.style.display = 'inline-flex';
    }

    saveState();
}

function handleApplyPresets() {
    state.isAutoMode = false;
    elements.infoMode.textContent = 'Ручной';

    const eventPreset = elements.eventPreset.value;
    const itemPreset = elements.itemPreset.value;
    const gamePreset = elements.gamePreset.value;

    // Load preset based on current stage
    loadStageData(eventPreset, itemPreset, gamePreset);

    showNotification('Пресеты применены');
    saveState();
}

async function handleSpin() {
    if (state.isSpinning || state.isSending || state.currentSegments.length === 0) return;

    state.isSpinning = true;
    elements.spinBtn.disabled = true;

    // Add spinning class for LED animation
    document.querySelector('.wheel-frame').classList.add('spinning');

    // Weighted random selection
    const result = weightedRandom(state.currentSegments);
    state.lastResult = result;

    // Calculate target rotation
    const segmentIndex = state.currentSegments.indexOf(result);
    const totalWeight = state.currentSegments.reduce((sum, s) => sum + s.weight, 0);

    // Calculate cumulative angles
    let cumulativeWeight = 0;
    for (let i = 0; i < segmentIndex; i++) {
        cumulativeWeight += state.currentSegments[i].weight;
    }

    // Center of the winning segment
    const segmentCenterWeight = cumulativeWeight + (result.weight / 2);
    const segmentCenterAngle = (segmentCenterWeight / totalWeight) * 360;

    // Pointer is at top (270 degrees in canvas coordinates)
    const pointerAngle = 270;
    const currentRotationDegrees = (wheelRotation * 180 / Math.PI) % 360;

    // Calculate how much to rotate
    const targetAngle = pointerAngle - segmentCenterAngle;
    const additionalSpins = 5 + Math.floor(Math.random() * 3);
    targetRotation = wheelRotation + (additionalSpins * Math.PI * 2) + ((targetAngle - currentRotationDegrees) * Math.PI / 180);

    // Start animation
    animateWheel();
}

function animateWheel() {
    const startRotation = wheelRotation;
    const totalRotation = targetRotation - startRotation;
    const duration = 5000;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        wheelRotation = startRotation + (totalRotation * eased);
        drawWheel();

        if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            // Animation complete
            // state.isSpinning = false; // <--- УДАЛИТЕ ИЛИ ЗАКОММЕНТИРУЙТЕ ЭТУ СТРОКУ
            document.querySelector('.wheel-frame').classList.remove('spinning');
            onSpinComplete();
        }
    }

    animationFrame = requestAnimationFrame(animate);
}

async function onSpinComplete() {
    const result = state.lastResult;

    // Show result
    displayResult(result);

    // Add to log
    addToLog(state.stage, result);

    // Send data
    await sendData(result, 'Назначено');

    // Handle post-spin logic
    if (state.stage === 'game') {
        // Show game status panel
        state.gameResult = result;
        elements.currentGameDisplay.textContent = result.name;
        elements.spinBtn.style.display = 'none';
        elements.gameStatusPanel.style.display = 'block';
        
        state.isSpinning = false; // <--- ДОБАВЛЕНО: Разблокируем здесь
        updateRerollButton();
        
    } else if (state.isAutoMode) {
        // Auto-advance to next stage
        setTimeout(() => {
            if (state.stage === 'event') {
                state.stage = 'item';
            } else if (state.stage === 'item') {
                state.stage = 'game';
            }
            updateStageUI();
            loadStageData();
            elements.resultDisplay.style.display = 'none';
            
            state.isSpinning = false; // <--- ДОБАВЛЕНО: Разблокируем только ПОСЛЕ смены этапа
            updateSpinButton();       // <--- Обновляем состояние кнопки
        }, 2000);
    } else {
        // Manual mode: clear wheel after event/item
        setTimeout(() => {
            drawEmptyWheel();
            state.currentSegments = [];
            updateLegend([]);
            elements.resultDisplay.style.display = 'none';
            updateSpinButton();
            
            state.isSpinning = false; // <--- ДОБАВЛЕНО: Разблокируем для ручного режима
            updateSpinButton();
        }, 2000);
    }

    saveState();
}

async function handleComplete() {
    if (state.isSending) return;

    await sendData(state.gameResult, 'Пройдено');
    addToLog('action', { name: 'ПРОЙДЕНО', desc: state.gameResult.name });

    showNotification('Награда получена!');
    resetAfterGame();
}

async function handleReroll() {
    if (state.isSending || state.rerollUsed) return;

    // Send reroll status for current game
    await sendData(state.gameResult, 'Реролл');
    addToLog('action', { name: 'РЕРОЛЛ', desc: state.gameResult.name });

    // Mark reroll as used
    state.rerollUsed = true;
    updateRerollButton();

    // Spin again
    elements.gameStatusPanel.style.display = 'none';
    elements.spinBtn.style.display = 'inline-flex';
    elements.spinBtn.disabled = false;

    // Trigger spin
    handleSpin();

    saveState();
}

async function handleDrop() {
    if (state.isSending) return;

    await sendData(state.gameResult, 'Дроп');
    addToLog('action', { name: 'ДРОП', desc: state.gameResult.name });

    showNotification('Игра сброшена');
    resetAfterGame();
}

function handleReset() {
    // Clear localStorage
    localStorage.removeItem('fnafRandomizerState');

    // Reset state
    Object.assign(state, {
        player: null,
        route: null,
        currentEnemy: null,
        stage: null,
        isAutoMode: true,
        rerollUsed: false,
        isSpinning: false,
        isSending: false,
        currentSegments: [],
        lastResult: null,
        gameResult: null,
        logHistory: []
    });

    // Reset UI
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = btn.style.borderColor;
    });

    elements.controlsRow.style.display = 'none';
    elements.gameArea.style.display = 'none';
    elements.resetBtn.style.display = 'none';
    elements.routeSelect.value = '';
    elements.enemyDisplay.style.display = 'none';
    elements.gameStatusPanel.style.display = 'none';
    elements.spinBtn.style.display = 'inline-flex';
    elements.resultDisplay.style.display = 'none';

    drawEmptyWheel();
    updateLog();

    showNotification('Сессия сброшена');
}

function resetAfterGame() {
    state.route = null;
    state.currentEnemy = null;
    state.stage = null;
    state.gameResult = null;
    state.rerollUsed = false;

    elements.routeSelect.value = '';
    elements.enemyDisplay.style.display = 'none';
    elements.gameStatusPanel.style.display = 'none';
    elements.spinBtn.style.display = 'inline-flex';
    elements.resultDisplay.style.display = 'none';

    updateStageUI();
    drawEmptyWheel();
    state.currentSegments = [];
    updateLegend([]);
    updateSpinButton();

    elements.infoPoint.textContent = '-';
    elements.infoEnemy.textContent = '-';

    saveState();
}

// ==========================================
// DATA LOADING
// ==========================================

function loadStageData(eventPreset = 'default', itemPreset = 'default', gamePreset = 'default') {
    let segments = [];

    switch (state.stage) {
        case 'event':
            if (eventPreset === 'default') {
                segments = [...GAME_DATA.events.default];
            } else {
                segments = [...(GAME_DATA.events.presets[eventPreset] || GAME_DATA.events.default)];
            }
            break;

        case 'item':
            if (itemPreset === 'default') {
                segments = [...GAME_DATA.items.default];
            } else {
                segments = [...(GAME_DATA.items.presets[itemPreset] || GAME_DATA.items.default)];
            }
            break;

        case 'game':
            if (gamePreset !== 'default' && GAME_DATA.gamePresets[gamePreset]) {
                segments = [...GAME_DATA.gamePresets[gamePreset]];
            } else if (state.currentEnemy && state.currentEnemy.games) {
                segments = [...(GAME_DATA.games[state.currentEnemy.games] || [])];
            }
            break;
    }

    state.currentSegments = segments;
    drawWheel();
    updateLegend(segments);
    updateSpinButton();
}

// ==========================================
// UI UPDATES
// ==========================================

function updateStageUI() {
    const buttons = [elements.stageEvent, elements.stageItem, elements.stageGame];
    buttons.forEach(btn => btn.classList.remove('active'));

    const wheelFrame = document.querySelector('.wheel-frame');
    wheelFrame.classList.remove('stage-event', 'stage-item', 'stage-game', 'empty');

    if (state.stage === 'event') {
        elements.stageEvent.classList.add('active');
        wheelFrame.classList.add('stage-event');
    } else if (state.stage === 'item') {
        elements.stageItem.classList.add('active');
        wheelFrame.classList.add('stage-item');
    } else if (state.stage === 'game') {
        elements.stageGame.classList.add('active');
        wheelFrame.classList.add('stage-game');
    } else {
        wheelFrame.classList.add('empty');
    }
}

function updateSpinButton() {
    elements.spinBtn.disabled = state.isSpinning || state.isSending || state.currentSegments.length === 0;
}

function updateRerollButton() {
    elements.btnReroll.disabled = state.rerollUsed;
}

function updateLegend(segments) {
    if (segments.length === 0) {
        elements.legendContainer.innerHTML = '<p class="legend-empty">Выберите этап для просмотра</p>';
        return;
    }

    const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    const colors = generateColors(segments.length);

    // 1. Создаем временный массив объектов, связывая сегмент с его цветом
    // Это нужно, чтобы при сортировке цвета не перепутались и совпадали с колесом
    const sortedData = segments.map((segment, index) => ({
        segment: segment,
        color: colors[index]
    }));

    // 2. Сортируем этот массив по весу (weight) от большего к меньшему
    sortedData.sort((a, b) => b.segment.weight - a.segment.weight);

    let html = '';
    // 3. Выводим уже отсортированные данные
    sortedData.forEach((item) => {
        const segment = item.segment;
        const color = item.color; // Используем сохраненный цвет
        const chance = ((segment.weight / totalWeight) * 100).toFixed(1);
        
        html += `
            <div class="legend-item">
                <span class="legend-color" style="background: ${color}"></span>
                <span class="legend-name" title="${segment.name}">${segment.name}</span>
                <span class="legend-chance">${chance}%</span>
            </div>
        `;
    });

    elements.legendContainer.innerHTML = html;
}

function displayResult(result) {
    elements.resultTitle.textContent = result.name;
    elements.resultDescription.textContent = result.desc || '';

    let extra = '';
    if (result.price) {
        extra = `Цена: ${result.price}`;
    } else if (result.award) {
        extra = `Награда: ${result.award} (${result.award_price})`;
    }
    elements.resultExtra.textContent = extra;

    elements.resultDisplay.style.display = 'block';
}

function addToLog(type, result) {
    const entry = {
        type,
        value: result.name,
        chance: result.weight ? calculateChance(result) : null,
        time: new Date().toLocaleTimeString('ru-RU')
    };

    state.logHistory.unshift(entry);
    updateLog();
    saveState();
}

function updateLog() {
    if (state.logHistory.length === 0) {
        elements.logContainer.innerHTML = '<div class="log-empty">Нет записей</div>';
        return;
    }

    const stageLabels = {
        'event': 'СОБЫТИЕ',
        'item': 'ПРЕДМЕТ',
        'game': 'ИГРА',
        'action': 'ДЕЙСТВИЕ'
    };

    let html = '';
    state.logHistory.forEach(entry => {
        const typeClass = entry.type === 'action' ? 'action' : entry.type;
        const stageLabel = stageLabels[entry.type] || entry.type.toUpperCase();
        const chanceText = entry.chance ? `<span class="log-chance">${entry.chance}%</span>` : '';

        html += `
            <div class="log-entry ${typeClass}">
                <span class="log-stage">${stageLabel}</span>
                <span class="log-value">${entry.value}</span>
                ${chanceText}
                <span class="log-time">${entry.time}</span>
            </div>
        `;
    });

    elements.logContainer.innerHTML = html;
}

function clearLog() {
    state.logHistory = [];
    updateLog();
    saveState();
    showNotification('Журнал очищен');
}

function calculateChance(result) {
    const totalWeight = state.currentSegments.reduce((sum, s) => sum + s.weight, 0);
    return ((result.weight / totalWeight) * 100).toFixed(1);
}

// ==========================================
// WHEEL DRAWING - Enhanced Visual
// ==========================================

function drawEmptyWheel() {
    const canvas = elements.wheelCanvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#141618';
    ctx.fill();

    // Draw grid lines
    ctx.strokeStyle = '#242729';
    ctx.lineWidth = 1;

    // Radial lines
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
    }

    // Concentric circles
    for (let r = radius * 0.33; r < radius; r += radius * 0.33) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Draw "ВЫБЕРИТЕ ТОЧКУ" text
    ctx.fillStyle = '#5a6062';
    ctx.font = '16px "8BitOperator", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ВЫБЕРИТЕ', centerX, centerY - 12);
    ctx.fillText('ТОЧКУ', centerX, centerY + 12);
}

function drawWheel() {
    const segments = state.currentSegments;
    const canvas = elements.wheelCanvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    if (segments.length === 0) {
        drawEmptyWheel();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(wheelRotation);

    const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    const colors = generateColors(segments.length);

    let startAngle = 0;

    segments.forEach((segment, index) => {
        const sliceAngle = (segment.weight / totalWeight) * Math.PI * 2;
        const midAngle = startAngle + sliceAngle / 2;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();

        // Gradient fill for depth
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        const baseColor = colors[index];
        gradient.addColorStop(0, lightenColor(baseColor, 20));
        gradient.addColorStop(0.5, baseColor);
        gradient.addColorStop(1, darkenColor(baseColor, 20));

        ctx.fillStyle = gradient;
        ctx.fill();

        // Segment border
        ctx.strokeStyle = '#0d0f10';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner accent line
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.85, startAngle + 0.02, startAngle + sliceAngle - 0.02);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.rotate(midAngle);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        const sliceAngleDegrees = (sliceAngle * 180) / Math.PI;

        if (sliceAngleDegrees > 8) {
            // Text shadow for readability
            ctx.fillStyle = '#000';
            ctx.font = sliceAngleDegrees > 18 ? '11px "8BitOperator", monospace' : '9px "8BitOperator", monospace';

            let text = segment.name;
            const maxLength = sliceAngleDegrees > 25 ? 14 : 10;
            if (text.length > maxLength) {
                text = text.substring(0, maxLength - 2) + '..';
            }

            // Shadow
            ctx.fillText(text, radius - 18, 1);

            // Main text
            ctx.fillStyle = '#fff';
            ctx.fillText(text, radius - 19, 0);
        } else if (sliceAngleDegrees > 4) {
            // Show index for narrow segments
            ctx.fillStyle = '#fff';
            ctx.font = '9px "8BitOperator", monospace';
            ctx.fillText((index + 1).toString(), radius - 15, 0);
        }

        ctx.restore();

        startAngle += sliceAngle;
    });

    // Draw center overlay gradient
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.15);
    centerGradient.addColorStop(0, 'rgba(13, 15, 16, 0.9)');
    centerGradient.addColorStop(1, 'rgba(13, 15, 16, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    ctx.restore();
}

function generateColors(count) {
    // Muted, industrial color palette
    const baseColors = [
        '#6b8b8b', '#8b7b6b', '#7b8b6b', '#6b7b8b', '#8b6b7b',
        '#7b6b8b', '#8b8b6b', '#6b8b7b', '#8b6b6b', '#6b6b8b',
        '#7b8b8b', '#8b7b7b', '#6b7b7b', '#7b6b7b', '#8b8b8b'
    ];

    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
}

function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R}, ${G}, ${B})`;
}

function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `rgb(${R}, ${G}, ${B})`;
}

// ==========================================
// WEIGHTED RANDOM
// ==========================================

function weightedRandom(segments) {
    const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;

    for (const segment of segments) {
        random -= segment.weight;
        if (random <= 0) {
            return segment;
        }
    }

    return segments[segments.length - 1];
}

// ==========================================
// DATA SENDING
// ==========================================

async function sendData(result, status = 'Назначено') {
    state.isSending = true;
    elements.sendingIndicator.style.display = 'flex';
    updateSpinButton();

    let data = {
        player: state.player?.name || 'Неизвестно',
        point: state.route || 'Неизвестно'
    };

    switch (state.stage) {
        case 'event':
            data.event = result.name;
            data.event_description = result.desc || '';
            break;

        case 'item':
            data.item = result.name;
            data.item_description = result.desc || '';
            data.price = result.price || '';
            break;

        case 'game':
            data.game = result.name;
            data.enemy = state.currentEnemy?.name || '';
            data.award = result.award || '';
            data.award_description = result.award_desc || '';
            data.award_price = result.award_price || '';
            data.status = status;
            break;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showMessage('Данные отправлены');
        } else {
            showMessage('Ошибка отправки', true);
        }
    } catch (error) {
        console.error('Send error:', error);
        showMessage('Ошибка сети', true);
    }

    state.isSending = false;
    elements.sendingIndicator.style.display = 'none';
    updateSpinButton();
}

// ==========================================
// NOTIFICATIONS & MESSAGES
// ==========================================

function showNotification(text) {
    elements.notificationText.textContent = text;
    elements.notification.classList.add('show');

    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

function showMessage(text, isError = false) {
    elements.messageText.textContent = text;
    elements.messageDisplay.style.display = 'block';
    elements.messageDisplay.style.background = isError ? '#8b5a5a' : '#6b8b6b';
    elements.messageDisplay.style.borderColor = isError ? '#a06060' : '#7a9a7a';

    setTimeout(() => {
        elements.messageDisplay.style.display = 'none';
    }, 3000);
}

// ==========================================
// STATE PERSISTENCE
// ==========================================

function saveState() {
    const saveData = {
        player: state.player,
        route: state.route,
        currentEnemy: state.currentEnemy,
        stage: state.stage,
        isAutoMode: state.isAutoMode,
        rerollUsed: state.rerollUsed,
        gameResult: state.gameResult,
        logHistory: state.logHistory
    };

    localStorage.setItem('fnafRandomizerState', JSON.stringify(saveData));
}

function loadState() {
    const saved = localStorage.getItem('fnafRandomizerState');

    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        // Restore player
        if (data.player) {
            state.player = data.player;
            const playerBtn = document.querySelector(`[data-player="${data.player.id}"]`);
            if (playerBtn) {
                playerBtn.classList.add('active');
                playerBtn.style.background = data.player.color;
                playerBtn.style.color = '#0d0f10';
            }
            elements.controlsRow.style.display = 'flex';
            elements.gameArea.style.display = 'grid';
            elements.resetBtn.style.display = 'flex';
            elements.infoPlayer.textContent = data.player.name;
        }

        // Restore route
        if (data.route) {
            state.route = data.route;
            elements.routeSelect.value = data.route;
            elements.infoPoint.textContent = data.route;
        }

        // Restore enemy
        if (data.currentEnemy) {
            state.currentEnemy = data.currentEnemy;
            elements.enemyName.textContent = data.currentEnemy.name;
            elements.enemyDisplay.style.display = 'flex';
            elements.infoEnemy.textContent = data.currentEnemy.name;
        }

        // Restore stage
        if (data.stage) {
            state.stage = data.stage;
            updateStageUI();
            loadStageData();
        }

        // Restore auto mode
        state.isAutoMode = data.isAutoMode ?? true;
        elements.infoMode.textContent = state.isAutoMode ? 'Авто' : 'Ручной';

        // Restore reroll
        state.rerollUsed = data.rerollUsed ?? false;

        // Restore game result
        if (data.gameResult && data.stage === 'game') {
            state.gameResult = data.gameResult;
            elements.currentGameDisplay.textContent = data.gameResult.name;
            elements.spinBtn.style.display = 'none';
            elements.gameStatusPanel.style.display = 'block';
            updateRerollButton();
        }

        // Restore log
        if (data.logHistory) {
            state.logHistory = data.logHistory;
            updateLog();
        }

        showNotification('Сессия восстановлена');

    } catch (error) {
        console.error('Error loading state:', error);
    }
}

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', init);
