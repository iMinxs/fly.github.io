class Scenes {
    constructor() {
        //场景编号
        this.scenesNumber = 1;
        //实例化演员
        this.background = new Background();
        this.land = new Land();
        this.birds = new Birds();

        //logo的位置
        this.logy = -48;
        //开始按钮的位置
        this.btnx = game.canvas.width /2 - 58;
        this.btny = game.canvas.height;

        //tutorial透明度
        this.tutorialOpacit = 0.5;

        //爆炸序列
        this.boomstep = 0;

        //结束位置
        this.overy = game.canvas.height * 0.382 - 27;
        //again按钮的位置
        this.againx = game.canvas.width /2 - 13;
        this.againy = this.overy + 100;
        //menu按钮的位置
        this.menux = game.canvas.width /2 - 40;
        this.menuy = this.overy + 180;
        
        //添加监听
        this.bindEvent();
    }

    update() {
        switch (this.scenesNumber) {
            case 1:
                //logo向下移动
                this.logy += 5;
                if (this.logy > 130) {
                    this.logy = 130;
                }
                //按钮向上移动
                this.btny -= 10;
                if (this.btny < 350) {
                    this.btny = 350;
                }
                this.background.update();
                this.land.update();

                this.birds.wing();
                break;
            case 2:
                this.birds.wing();
                this.background.update();
                this.land.update();

                //让提示图片闪烁
                this.tutorialOpacit -=0.025;
                if(this.tutorialOpacit < 0) {
                    this.tutorialOpacit += 1;
                }
                break;
            case 3:
                this.birds.update();
                this.background.update();
                this.land.update();
                game.fno % 130 == 0 && (new Pipe());
                //更新所有管子
                for (let i = 0; i < game.pipeArr.length; i++) {
                    //验证管子是否还在数组中
                    game.pipeArr[i] && game.pipeArr[i].update();
                };
                break;
            case 4:
                ////小鸟死亡后坠落到地面
                // if(this.birds.y > game.canvas.height * 0.76 - 17) {
                //     this.isBirdsLand = true;
                // }
                // if(!this.isBirdsLand) {
                //     this.birds.y += 10;
                // }

                //爆炸特效
                game.fno % 10 == 0 &&this.boomstep++;
                if (this.boomstep > 2) {
                    this.boomstep = 2;
                }

                //白屏恢复
                this.maskOpacity -= 0.03;
                if(this.maskOpacity < 0) {
                    this.maskOpacity = 0;
                }
     
        }
    }

    render() {
        //根据当前的场景号来决定做什么
        switch (this.scenesNumber) {
            case 1:
                //渲染背景、大地、小鸟
                this.background.render();
                this.land.render();
                this.birds.render();

                //画logo和按钮
                game.ctx.drawImage(game.R["title"], game.canvas.width / 2 - 89, this.logy);
                game.ctx.drawImage(game.R["button_play"], this.btnx, this.btny);
                break;
            case 2:
                //渲染背景、大地、小鸟
                this.background.render();
                this.land.render();
                this.birds.render();

                
                //画出提示图片
                game.ctx.save();
                game.ctx.globalAlpha =  this.tutorialOpacit;
                //ready
                game.ctx.drawImage(game.R["text_ready"], game.canvas.width / 2 - 102, this.overy - 100);
                game.ctx.drawImage(game.R['tutorial'], game.canvas.width /2 - 57, 350);
                game.ctx.restore();
                break;
            case 3:
                this.background.render();
                this.land.render();
                this.birds.render();
                //渲染所有管子
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数
                //当前分数的位数 比如23就是两位
                var scoreLength = String(game.score).length;
                //循环分数的每位数去设置图片显示，有一个基准
                for(let i = 0; i < scoreLength; i++) {
                    game.ctx.drawImage(game.R["number" + (String(game.score).charAt(i))], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
                }
                break;
            case 4:
                this.background.render();
                this.land.render();

                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                
                var scoreLength = String(game.score).length;
                for(let i = 0; i < scoreLength; i++) {
                    game.ctx.drawImage(game.R["number" + (String(game.score).charAt(i))], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
                }
                this.birds.render();
                //渲染爆炸
                game.ctx.drawImage(game.R["blink_0" + this.boomstep], this.birds.x - 10, this.birds.y - 12, 20, 20);
                //白屏
                game.ctx.save();
                game.ctx.fillStyle = 'rgba(255,255,255,' + this.maskOpacity + ')';
                game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
                game.ctx.restore();

                if(this.boomstep = 2) {
                    //结束图标
                    game.ctx.drawImage(game.R["text_game_over"], game.canvas.width / 2 - 102, this.overy);
                    //again图标
                    game.ctx.drawImage(game.R["button_resume"], this.againx, this.againy);
                    //回到主页图标
                    game.ctx.drawImage(game.R["button_menu"], this.menux, this.menuy);
                }
                break;
        }
    }
    //进入场景方法
    enter(number) {
        this.scenesNumber = number;
        switch(this.scenesNumber) {
            case 1:
                //进入场景1瞬间要做的事
                this.logy = -48;
                this.btny = game.canvas.height;
                this.birds.y = game.canvas.height * 0.382
                //小鸟的帧数归零
                this.birds.fno = 0;
                //鸟的角度归零
                this.birds.d = 0;
                break;
            case 3:
                //管子清零
                game.pipeArr = [];
                //分数清零
                game.score = 0;
                //小鸟复位
                this.birds.y = game.canvas.height * 0.382
                //小鸟的帧数归零
                this.birds.fno = 0;
                //鸟的角度归零
                this.birds.d = 0;
                //白屏透明度
                this.maskOpacity = 0.8;
                break;
        }
    }

    bindEvent() {
        let me = this;
        //鼠标点击事件
        game.canvas.onclick = function(){
            clickHandler(event.clientX, event.clientY);
        };
        //触摸事件
        // game.canvas.addEventListener("touchstart", function(event){
        //     let finger = event.touches[0];
        //     clickHandler(finger.clientX, finger.clientY);
        // }, true);
        
        function clickHandler (mx,my) {
        
            switch(me.scenesNumber) {
                case 1:
                    //如果用户点击到开始按钮，就去场景2
                    if(mx > me.btnx && mx < me.btnx + 110 && my > me.btny && my < me.btny + 65) {
                        me.enter(2);
                    }
                    break;
                case 2:
                    me.enter(3);
                    break;
                case 3:
                    me.birds.fly();
                    break;
                case 4:
                    //如果用户点击到again按钮，就去场景3
                    if(mx > me.againx && mx < me.againx + 26 && my > me.againy && my < me.againy + 28) {
                        me.enter(3);
                    }
                    //如果用户点击到menu按钮，就去场景1
                    if(mx > me.menux && mx < me.menux + 80 && my > me.menuy && my < me.menuy + 28) {
                        me.enter(1);
                    }
                    break;
            }
        }
    }
}
