//导出背景类
class Background {
    constructor() {
        //随机bg颜色
        this.color = parseInt(Math.random() * 2);
        //自己的背景
        this.image = game.R["bg_" + this.color];
        //自己的X、Y，Y为顶部到图片的位置（按比例）
        this.x = 0;
        this.y = 0.75 * game.canvas.height - 396;
        //图片的高
        this.h = 512;
        //速度
        this.speed = 1;
    
    }

    update() {
    
        this.x -= this.speed;

        //等图片到达左边 拉回来 实现滚动
        if (this.x < -288) {
            this.x = 0;
        }
    }
    render() {
        //渲染图片 图片不够宽 所以渲染3次
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + 288, this.y);
        game.ctx.drawImage(this.image, this.x + 288 * 2, this.y);
        //渲染猫腻天空 （同色矩形）

        game.ctx.save();
        if (this.color === 0) {
            game.ctx.fillStyle = '#4ec0ca';
        }else if(this.color === 1) {
            game.ctx.fillStyle = '#008793';
        }
        game.ctx.fillRect(0, 0, game.canvas.width, this.y + 10);
        game.ctx.restore();
        // //渲染猫腻草丛 （同色矩形）
        // game.ctx.fillStyle = '#5ee270';
        // game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height - this.h - this.y);
    }
}

