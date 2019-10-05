class Birds {
    constructor() {

        //随机小鸟颜色
        this.color = parseInt(Math.random() * 3);
        
        this.imageArr = [game.R["bird" + this.color + "_0"],
                         game.R["bird" + this.color + "_1"],
                         game.R["bird" + this.color + "_2"]
                        ];
        //翅膀状态
        this.wingStep = 0;


        //中心位置
        this.x = game.canvas.width / 2;
        this.y = game.canvas.height * 0.382;
        //鸟的帧数
        this.fno = 0;
        //度数
        this.d = 0;
        //是否拥有能量往上飞（用户点击）
        this.hasEnergy = false;

    }

    update() {

        //计算鸟的碰撞盒的四个值
        this.T = this.y - 17;
        this.R = this.x + 12;
        this.B = this.y + 17;
        this.L = this.x - 12;

        // console.log(this.T,this.R,this.B,this.L)

        //检测小鸟是否落地
        if(this.B > game.canvas.height * 0.76 - 5) {
            game.scenes.enter(4);
        }
        //小鸟不能飞出天空
        if(this.y < 0) {
            this.y = 0;
        }

        this.wing();

        if (!this.hasEnergy) {
            this.y += this.fno * 0.2;
        } else {
            //有能量 往上飞
            this.y -= (20 -this.fno) * 0.2;
            //最多往上飞20 能量用完
            if (this.fno > 20) {
                this.hasEnergy = false;
                this.fno = 0;
            }
        }
        
        this.d += 0.02;
        this.fno++;
    }
    render() {

        //保存ctx
        game.ctx.save();
        //将坐标中心拉到小鸟的位置
        game.ctx.translate(this.x, this.y);
        //让小鸟旋转
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24, 48,48);
        //恢复ctx
        game.ctx.restore();
    }
    fly () {
        this.hasEnergy = true;
        //飞的一瞬间抬头
        this.d = -0.6;
        this.fno = 0;
    }
    wing() {
        //固定帧数翅膀扇打一次
        game.fno % 10 == 0 && this.wingStep++;
        if(this.wingStep > 2 ) {
            this.wingStep = 0;
        }
    }
}
