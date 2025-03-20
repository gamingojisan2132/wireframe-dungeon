// オーディオを管理するクラス
class AudioManager {
    constructor() {
        // オーディオファイルのマッピング
        this.sounds = {
            slash: new Audio('assets/audio/slash01.mp3'),
            hit: new Audio('assets/audio/hit01.mp3'),
            bgm: new Audio('assets/audio/bgm01.mp3')
        };
        
        // BGM設定
        this.sounds.bgm.loop = true;
        this.sounds.bgm.volume = 0.5; // BGMは少し小さめに
        
        // 効果音の設定
        this.sounds.slash.volume = 0.7;
        this.sounds.hit.volume = 0.7;
        
        this.isMuted = false;
    }
    
    // 効果音を再生
    playSfx(soundName) {
        if (this.isMuted || !this.sounds[soundName]) return;
        
        // サウンドのクローンを作成して再生（重複再生のため）
        const sound = this.sounds[soundName].cloneNode();
        sound.volume = this.sounds[soundName].volume;
        sound.play().catch(e => console.log('Sound play error:', e));
    }
    
    // BGM再生
    playBgm() {
        if (this.isMuted) return;
        this.sounds.bgm.play().catch(e => console.log('BGM play error:', e));
    }
    
    // BGM停止
    stopBgm() {
        this.sounds.bgm.pause();
        this.sounds.bgm.currentTime = 0;
    }
    
    // 音声のミュート切替
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.stopBgm();
        } else {
            this.playBgm();
        }
        
        return this.isMuted;
    }
}

// グローバルインスタンスの作成
const audioManager = new AudioManager();