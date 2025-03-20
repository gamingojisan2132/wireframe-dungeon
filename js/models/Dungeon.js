// ダンジョンモデル
class Dungeon {
    constructor() {
        this.currentNode = 0;
        this.nodes = [];
        this.progress = 0;
        this.floor = 1;
    }
    
    // ダンジョン生成
    generate() {
        this.nodes = [];
        this.currentNode = 0;
        this.progress = 0;
        
        // 固定8ノード (最後はボス)
        for (let i = 0; i < 7; i++) {
            const nodeType = this.getRandomNodeType();
            const nodeData = { type: nodeType };
            
            if (nodeType === 'battle') {
                // ランダムな敵タイプを選択 (ボス以外)
                const enemyKeys = Object.keys(enemyTypes).filter(key => key !== 'boss');
                const enemyType = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
                nodeData.enemyType = enemyType;
            } else if (nodeType === 'item') {
                // アイテム効果を決定
                nodeData.effect = Math.random() < 0.5 ? 'heal' : 'apRestore';
                nodeData.value = nodeData.effect === 'heal' ? 30 : 5;
            }
            
            this.nodes.push(nodeData);
        }
        
        // 最後のノードはボス
        this.nodes.push({
            type: 'battle',
            enemyType: 'boss'
        });
        
        return this.nodes;
    }
    
    // ランダムなノードタイプを取得
    getRandomNodeType() {
        const nodeTypes = ['battle', 'item', 'heal'];
        const weights = [0.6, 0.2, 0.2]; // 出現確率
        
        const random = Math.random();
        let sum = 0;
        
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (random < sum) {
                return nodeTypes[i];
            }
        }
        
        return nodeTypes[0]; // フォールバック
    }
    
    // 次のノードへ進む
    moveToNextNode() {
        this.currentNode++;
        this.updateProgress();
        return this.currentNode < this.nodes.length ? this.nodes[this.currentNode] : null;
    }
    
    // 現在のノードを取得
    getCurrentNode() {
        return this.currentNode < this.nodes.length ? this.nodes[this.currentNode] : null;
    }
    
    // 進行度の更新
    updateProgress() {
        this.progress = (this.currentNode / this.nodes.length) * 100;
        return this.progress;
    }
    
    // 全ノードクリア判定
    isCompleted() {
        return this.currentNode >= this.nodes.length;
    }
}