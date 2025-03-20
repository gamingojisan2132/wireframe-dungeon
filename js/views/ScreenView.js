// 画面遷移を管理するビュークラス
class ScreenView {
    constructor() {
        this.screens = {
            preparation: document.getElementById('preparation-screen'),
            upgrade: document.getElementById('upgrade-screen'),
            result: document.getElementById('result-screen')
        };
    }
    
    // 指定した画面を表示
    showScreen(screenName) {
        // 全画面を非表示
        Object.values(this.screens).forEach(screen => {
            screen.style.display = 'none';
        });
        
        // 指定された画面を表示
        if (this.screens[screenName]) {
            this.screens[screenName].style.display = 'flex';
        }
    }
    
    // 指定した画面を非表示
    hideScreen(screenName) {
        if (this.screens[screenName]) {
            this.screens[screenName].style.display = 'none';
        }
    }
    
    // 全ての画面を非表示
    hideAllScreens() {
        Object.values(this.screens).forEach(screen => {
            screen.style.display = 'none';
        });
    }
}

// グローバルインスタンスの作成
const screenView = new ScreenView();