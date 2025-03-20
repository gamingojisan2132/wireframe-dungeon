// グローバルなゲーム状態を管理するモデル
class GameState {
    constructor() {
        this.player = null;
        this.enemy = null;
        this.dungeon = null;
        this.battleInterval = null;
        this.battleSpeed = 1; // 1=通常, 2=倍速, 4=4倍速, 8=8倍速
        this.isAutoBattle = true;
        this.isGameOver = false;
        this.battleLog = [];
    }

    // ゲーム状態の初期化
    init() {
        this.player = new Player();
        this.dungeon = new Dungeon();
        this.isGameOver = false;
        this.battleLog = [];
    }
    
    // ログの追加
    addLog(message) {
        this.battleLog.push(message);
        if (this.battleLog.length > 3) {
            this.battleLog.shift();
        }
        return this.battleLog;
    }
    
    // バトル速度の切替
    toggleBattleSpeed() {
        this.battleSpeed = this.battleSpeed >= 8 ? 1 : this.battleSpeed * 2;
        
        // バトル中なら速度を再設定
        if (this.battleInterval) {
            clearInterval(this.battleInterval);
            this.battleInterval = setInterval(() => {
                battleController.autoBattleTurn();
            }, 2000 / this.battleSpeed);
        }
        
        return this.battleSpeed;
    }
    
    // ゲームをリセット
    reset() {
        if (this.battleInterval) {
            clearInterval(this.battleInterval);
        }
        this.init();
    }
}

// グローバルインスタンスの作成
const gameState = new GameState();