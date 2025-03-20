// 戦闘表示を管理するビュークラス
class BattleView {
    constructor() {
        this.elements = {
            battleView: document.getElementById('battle-view'),
            dungeonView: document.getElementById('dungeon-view'),
            resultTitle: document.getElementById('result-title'),
            resultContent: document.getElementById('result-content')
        };
    }
    
    // 戦闘画面の表示
    showBattleView() {
        this.elements.battleView.style.display = 'flex';
        this.elements.dungeonView.style.display = 'none';
    }
    
    // ダンジョン画面の表示
    showDungeonView() {
        this.elements.battleView.style.display = 'none';
        this.elements.dungeonView.style.display = 'flex';
    }
    
    // 戦闘結果の表示内容設定
    setResultContent(isVictory, content) {
        this.elements.resultTitle.textContent = isVictory ? '勝利！' : '敗北...';
        this.elements.resultContent.textContent = content;
    }
}

// グローバルインスタンスの作成
const battleView = new BattleView();