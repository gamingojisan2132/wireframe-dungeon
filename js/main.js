// メインスクリプト - 初期化と起動
document.addEventListener('DOMContentLoaded', () => {
    // 入力コントローラの初期化
    new InputController();
    
    // ゲーム開始
    gameController.init();
});