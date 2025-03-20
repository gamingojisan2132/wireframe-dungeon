// UI表示更新を扱うビュークラス
class UIView {
    constructor() {
        this.elements = {
            playerHpFill: document.getElementById('player-hp-fill'),
            playerHpText: document.getElementById('player-hp-text'),
            playerApFill: document.getElementById('player-ap-fill'),
            playerApText: document.getElementById('player-ap-text'),
            enemyHpFill: document.getElementById('enemy-hp-fill'),
            enemyHpText: document.getElementById('enemy-hp-text'),
            enemyName: document.getElementById('enemy-name'),
            enemyGraphic: document.getElementById('enemy-graphic'),
            battleLog: document.getElementById('battle-log'),
            dungeonProgress: document.getElementById('dungeon-progress'),
            progressText: document.getElementById('progress-text'),
            speedButton: document.getElementById('speed-button')
        };
    }
    
    // プレイヤーステータス更新
    updatePlayerStats(player) {
        this.elements.playerHpFill.style.width = `${(player.hp / player.maxHp) * 100}%`;
        this.elements.playerHpText.textContent = `HP: ${player.hp}/${player.maxHp}`;
        
        this.elements.playerApFill.style.width = `${(player.ap / player.maxAp) * 100}%`;
        this.elements.playerApText.textContent = `AP: ${player.ap}/${player.maxAp}`;
    }
    
    // 敵ステータス更新
    updateEnemyStats(enemy) {
        if (!enemy) return;
        
        this.elements.enemyHpFill.style.width = `${(enemy.hp / enemy.maxHp) * 100}%`;
        this.elements.enemyHpText.textContent = `HP: ${enemy.hp}/${enemy.maxHp}`;
        this.elements.enemyName.textContent = enemy.name;
    }
    
    // 敵の画像表示
    showEnemyImage(enemyType) {
        this.elements.enemyGraphic.innerHTML = ''; // 古い内容をクリア
        
        // 画像要素を作成
        const img = document.createElement('img');
        img.src = `assets/images/${enemyType}.jpg`; // 画像パス
        img.style.width = enemyType === 'boss' ? '200px' : '150px'; // ボスは大きく
        img.style.height = 'auto';
        img.alt = enemyType;
        
        // 画像をコンテナに追加
        this.elements.enemyGraphic.appendChild(img);
    }
    
    // バトルログの更新
    updateBattleLog(logs) {
        this.elements.battleLog.innerHTML = '';
        
        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = log;
            this.elements.battleLog.appendChild(logEntry);
        });
    }
    
    // ダンジョン進行度の更新
    updateProgressBar(progress) {
        this.elements.dungeonProgress.style.width = `${progress}%`;
        this.elements.progressText.textContent = `進行度: ${Math.floor(progress)}%`;
    }
    
    // 速度表示の更新
    updateSpeedButton(speed) {
        let speedText = "";
        switch(speed) {
            case 1: speedText = "▶▶ 倍速"; break;
            case 2: speedText = "▶▶▶ 4倍速"; break;
            case 4: speedText = "▶▶▶▶ 8倍速"; break;
            case 8: speedText = "▶ 通常速度"; break;
        }
        this.elements.speedButton.textContent = speedText;
    }
}

// グローバルインスタンスの作成
const uiView = new UIView();