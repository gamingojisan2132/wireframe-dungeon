// ゲーム全体を制御するメインコントローラ
class GameController {
    constructor() {
    }
    
    // ゲーム開始
    init() {
        gameState.init();
        screenView.showScreen('preparation');
    }
    
    // 武器選択
    selectWeapon(weaponType) {
        gameState.player.equipWeapon(weapons[weaponType]);
    }
    
    // ダンジョン開始
    startDungeon() {
    if (!gameState.player.weapon) {
        alert('武器を選択してください');
        return;
    }
    
    screenView.hideScreen('preparation');
    gameState.dungeon.generate();
    uiView.updatePlayerStats(gameState.player);
    uiView.updateProgressBar(gameState.dungeon.progress);
    
    // BGMを再生
    audioManager.playBgm();
    
    this.processDungeonNode();
     }
    
    // ダンジョンノード処理
    processDungeonNode() {
        const currentNode = gameState.dungeon.getCurrentNode();
        
        // 現在のノードがなければ終了
        if (!currentNode) {
            return;
        }
        
        // ノードタイプに応じた処理
        switch (currentNode.type) {
            case 'battle':
                battleView.showBattleView();
                battleController.startBattle(currentNode.enemyType);
                break;
                
            case 'heal':
                const healAmount = Math.floor(gameState.player.maxHp * 0.5);
                gameState.player.heal(healAmount);
                gameState.addLog(`回復スポットを見つけた。HPが${healAmount}回復した！`);
                uiView.updateBattleLog(gameState.battleLog);
                uiView.updatePlayerStats(gameState.player);
                setTimeout(() => this.processNextNode(), 2000);
                break;
                
            case 'item':
                if (currentNode.effect === 'heal') {
                    gameState.player.heal(currentNode.value);
                    gameState.addLog(`回復薬を見つけた。HPが${currentNode.value}回復した！`);
                } else {
                    gameState.player.restoreAp(currentNode.value);
                    gameState.addLog(`魔力の水を見つけた。APが${currentNode.value}回復した！`);
                }
                uiView.updateBattleLog(gameState.battleLog);
                uiView.updatePlayerStats(gameState.player);
                setTimeout(() => this.processNextNode(), 2000);
                break;
        }
    }
    
    // 次のノードへ進む
    processNextNode() {
        const nextNode = gameState.dungeon.moveToNextNode();
        uiView.updateProgressBar(gameState.dungeon.progress);
        
        // ダンジョン終了判定
        if (!nextNode) {
            // ダンジョンクリア
            battleView.setResultContent(true, 'ダンジョンを攻略しました！');
            screenView.showScreen('result');
            return;
        }
        
        // 次のノードを処理
        this.processDungeonNode();
    }
    
    // アップグレード適用
    applyUpgrade(type) {
        const message = gameState.player.applyUpgrade(type);
        gameState.addLog(message);
        uiView.updateBattleLog(gameState.battleLog);
        uiView.updatePlayerStats(gameState.player);
        
        screenView.hideScreen('upgrade');
        this.processNextNode();
    }
    
    // ゲームリセット
    resetGame() {
        gameState.reset();
        screenView.hideScreen('result');
        screenView.showScreen('preparation');
    }
}

// グローバルインスタンスの作成
const gameController = new GameController();