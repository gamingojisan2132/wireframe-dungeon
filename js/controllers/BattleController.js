// 戦闘ロジックを管理するコントローラ
class BattleController {
    constructor() {
    }
    
    // 戦闘開始
    startBattle(enemyType) {
        // 新しい敵を生成
        gameState.enemy = new Enemy(enemyType);
        
        // 進行度に応じて敵を強化
        gameState.enemy.enhanceByProgress(gameState.dungeon.progress);
        
        // 敵の画像表示
        uiView.showEnemyImage(gameState.enemy.shape);
        
        // UIの更新
        uiView.updateEnemyStats(gameState.enemy);
        
        // バトルログの初期化
        gameState.addLog(`${gameState.enemy.name}が現れた！`);
        uiView.updateBattleLog(gameState.battleLog);
        
        // オートバトル開始
        if (gameState.isAutoBattle) {
            gameState.battleInterval = setInterval(() => {
                this.autoBattleTurn();
            }, 2000 / gameState.battleSpeed);
        }
    }
    
// オートバトルのターン処理
    autoBattleTurn() {
        // プレイヤーの攻撃
        this.playerAttack();
        
        // 敵が倒れていなければ反撃
        if (gameState.enemy && !gameState.enemy.isDead()) {
            // 少し遅延させて敵の攻撃を実行
            setTimeout(() => {
                this.enemyAttack();
            }, 1000 / gameState.battleSpeed);
        } else {
            // 敵を倒した場合
            clearInterval(gameState.battleInterval);
            
            // APを回復
            gameState.player.restoreAp(2);
            uiView.updatePlayerStats(gameState.player);
            
            // 次のノードへ
            setTimeout(() => {
                const wasLastNode = gameState.dungeon.currentNode === gameState.dungeon.nodes.length - 1;
                
                // 最後のノード(ボス)だった場合はアップグレード
                if (wasLastNode) {
                    screenView.showScreen('upgrade');
                } else {
                    gameController.processNextNode();
                }
            }, 1500 / gameState.battleSpeed);
        }
    }
    
    // プレイヤーの攻撃
    playerAttack() {
        if (!gameState.enemy || gameState.enemy.isDead()) return;
        
        // AP消費
        const apCost = 1;
        if (!gameState.player.useAp(apCost)) {
            gameState.addLog('APが足りない！攻撃できない...');
            uiView.updateBattleLog(gameState.battleLog);
            uiView.updatePlayerStats(gameState.player);
            return;
        }
        
        // クリティカル判定
        const isCritical = Math.random() < gameState.player.critRate;
        const criticalMultiplier = isCritical ? 2 : 1;
        
        // クリティカル時は追加AP消費
        if (isCritical) {
            gameState.player.useAp(1);
        }
        
        // ダメージ計算
        let damage = Math.max(1, (gameState.player.attack - gameState.enemy.defense / 2) * criticalMultiplier);
        
        // 乱数補正 (±20%)
        const randomFactor = 0.8 + Math.random() * 0.4;
        damage = Math.floor(damage * randomFactor);

        // 攻撃音を再生
        audioManager.playSfx('slash');

        // ダメージ適用
        gameState.enemy.takeDamage(damage);
        
        // ログ出力
        if (isCritical) {
            gameState.addLog(`クリティカルヒット！${gameState.enemy.name}に${damage}ダメージ！`);
        } else {
            gameState.addLog(`プレイヤーの攻撃！${gameState.enemy.name}に${damage}ダメージ！`);
        }
        
        // 敵撃破判定
        if (gameState.enemy.isDead()) {
            gameState.addLog(`${gameState.enemy.name}を倒した！`);
        }
        
        // UI更新
        uiView.updateBattleLog(gameState.battleLog);
        uiView.updatePlayerStats(gameState.player);
        uiView.updateEnemyStats(gameState.enemy);
    }
    
    // 敵の攻撃
    enemyAttack() {
        if (!gameState.enemy || gameState.enemy.isDead() || gameState.player.isDead()) return;
        
        // ダメージ計算
        let damage = Math.max(1, gameState.enemy.attack - gameState.player.defense / 2);
        
        // 乱数補正 (±20%)
        const randomFactor = 0.8 + Math.random() * 0.4;
        damage = Math.floor(damage * randomFactor);
        
        // ヒット音を再生
        audioManager.playSfx('hit');

        // ダメージ適用
        gameState.player.takeDamage(damage);
        
        // ログ出力
        gameState.addLog(`${gameState.enemy.name}の攻撃！プレイヤーに${damage}ダメージ！`);
        
        // 死亡判定
        if (gameState.player.isDead()) {
            gameState.addLog('プレイヤーは力尽きた...');
            clearInterval(gameState.battleInterval);
            gameState.isGameOver = true;
            
            // ゲームオーバー画面を表示
            setTimeout(() => {
                battleView.setResultContent(false, 'ダンジョンの探索に失敗した');
                screenView.showScreen('result');
            }, 1500 / gameState.battleSpeed);
        }
        
        // UI更新
        uiView.updateBattleLog(gameState.battleLog);
        uiView.updatePlayerStats(gameState.player);
    }
}

// グローバルインスタンスの作成
const battleController = new BattleController();