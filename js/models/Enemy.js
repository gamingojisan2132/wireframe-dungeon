// 敵モデル
class Enemy {
    constructor(type, level = 1) {
        const enemyData = { ...enemyTypes[type] };
        
        this.name = enemyData.name;
        this.hp = enemyData.hp;
        this.maxHp = enemyData.hp;
        this.attack = enemyData.attack;
        this.defense = enemyData.defense;
        this.shape = type;
        this.level = level;
        
        // レベルに応じて能力値を調整
        if (level > 1) {
            this.hp = Math.floor(this.hp * (1 + (level - 1) * 0.2));
            this.maxHp = this.hp;
            this.attack = Math.floor(this.attack * (1 + (level - 1) * 0.2));
            this.defense = Math.floor(this.defense * (1 + (level - 1) * 0.2));
        }
    }
    
    // ダメージを受ける
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return this.hp;
    }
    
    // 死亡判定
    isDead() {
        return this.hp <= 0;
    }
    
    // 強化（進行度に応じて）
    enhanceByProgress(progressRate) {
        const progressFactor = 1 + (progressRate / 100) * 0.5;
        this.hp = Math.floor(this.maxHp * progressFactor);
        this.maxHp = this.hp;
        this.attack = Math.floor(this.attack * progressFactor);
        return this;
    }
}

// 敵のデータ定義
const enemyTypes = {
    goblin: {
        name: 'ゴブリン',
        hp: 40,
        attack: 6,
        defense: 2
    },
    skeleton: {
        name: 'スケルトン',
        hp: 50,
        attack: 8,
        defense: 3
    },
    slime: {
        name: 'スライム',
        hp: 35,
        attack: 5,
        defense: 1
    },
    boss: {
        name: 'ダンジョンボス',
        hp: 60,
        attack: 8,
        defense: 6
    }
};
