class Pipe {
    constructor() {
        
        this.image0 = game.R.pipe_down;
        this.image1 = game.R.pipe_up;

        //总高 天空到大地 也是上管子的高+空隙+下管子的高
        this.th = 0.76 * game.canvas.height;
        //图片的高,固定的
        this.ph = 320;
        //空隙
        this.interspace = 120;
        //两个管子的高 至少120
        this.h1 = 120 + parseInt(Math.random() * (this.ph - 120));
        this.h2 = this.th - this.h1 - this.interspace;

        //位置
        this.x = game.canvas.width;

        //这个管子是否成功通过
        this.passd = false;
        
        //将管子推入数组
        game.pipeArr.push(this);
    }

    update() {

        this.x -= 2;
        //碰撞检测 看自己（管子）有没有碰到小鸟
        if (game.scenes.birds.R > this.x && game.scenes.birds.L < this.x + 52) {
            if (game.scenes.birds.T < this.h1 || game.scenes.birds.B > this.h1 + this.interspace){
                game.scenes.enter(4);
            }
        }

        //加分
        if (game.scenes.birds.L > this.x + 52 && !this.passd) {
            game.score++;
            //标记为已通过
            this.passd = true;
        }

        //如果管子超出视口，则从数组中删除
        if (this.x < -52) {
            for (let i = 0; i < game.pipeArr.length; i++) {
                //如果当前管子是超出的那根，就删掉
                if (game.pipeArr[i] === this){
                    game.pipeArr.splice(i,1);
                }
            }
        }
        


    }
    render() {
        game.ctx.drawImage(this.image0, 0, this.ph - this.h1, 52, this.h1, this.x, 0, 52, this.h1);
        game.ctx.drawImage(this.image1, 0, 0, 52, this.h2, this.x, this.h1 + this.interspace, 52, this.h2);
    }
}
