// プレイヤーモデル
class Player {
    constructor() {
        this.hp = 100;
        this.maxHp = 100;
        this.ap = 10;
        this.maxAp = 10;
        this.attack = 5;
        this.baseAttack = 5;
        this.defense = 3;
        this.critRate = 0.05;
        this.weapon = null;
        this.upgrades = [];
    }
    
    // 武器の装備
    equipWeapon(weapon) {
        this.weapon = weapon;
        this.attack = this.baseAttack + weapon.attackBonus;
    }
    
    // ダメージを受ける
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return this.hp;
    }
    
    // APを消費
    useAp(amount) {
        if (this.ap < amount) return false;
        this.ap = Math.max(0, this.ap - amount);
        return true;
    }
    
    // APを回復
    restoreAp(amount) {
        this.ap = Math.min(this.maxAp, this.ap + amount);
        return this.ap;
    }
    
    // HPを回復
    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
        return this.hp;
    }
    
    // アップグレードを適用
    applyUpgrade(type) {
        switch (type) {
            case 'attack':
                this.attack = Math.floor(this.attack * 1.2);
                return '攻撃力が20%上昇した！';
            case 'defense':
                this.defense = Math.floor(this.defense * 1.2);
                return '防御力が20%上昇した！';
            case 'critical':
                this.critRate += 0.1;
                return 'クリティカル率が10%上昇した！';
            default:
                return 'アップグレードを適用!';
        }
    }
    
    // 死亡判定
    isDead() {
        return this.hp <= 0;
    }
}

// 武器データ
const weapons = {
    stick: {
        name: '木の棒',
        attackBonus: 5
    },
    sword: {
        name: '鉄の剣',
        attackBonus: 10
    }
};