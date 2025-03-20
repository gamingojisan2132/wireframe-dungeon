// ユーザー入力を処理するコントローラ
class InputController {
    constructor() {
        this.init();
    }
    
    init() {
        // 武器選択イベント
        document.querySelectorAll('[data-weapon]').forEach(button => {
            button.addEventListener('click', (e) => {
                const weaponType = e.target.getAttribute('data-weapon');
                gameController.selectWeapon(weaponType);
                
                // 他の武器選択を非アクティブに
                document.querySelectorAll('[data-weapon]').forEach(b => {
                    b.style.backgroundColor = '#222';
                });
                e.target.style.backgroundColor = '#444';
            });
        });
        
        // ダンジョン開始ボタン
        document.getElementById('start-button').addEventListener('click', () => {
            gameController.startDungeon();
        });
        
        // アップグレード選択イベント
        document.querySelectorAll('.upgrade-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const upgradeType = e.target.getAttribute('data-upgrade');
                gameController.applyUpgrade(upgradeType);
            });
        });
        
        // リトライボタン
        document.getElementById('retry-button').addEventListener('click', () => {
            gameController.resetGame();
        });
        
        // 速度切替ボタン
        document.getElementById('speed-button').addEventListener('click', () => {
            const newSpeed = gameState.toggleBattleSpeed();
            uiView.updateSpeedButton(newSpeed);
        });
    }
}