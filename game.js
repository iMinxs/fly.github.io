class Game {
    constructor(pararms) {
        //得到画布
        this.canvas = document.querySelector(pararms.canvasid);
        //上下文
        this.ctx = this.canvas.getContext("2d");
        //帧编号
        this.fno = 0;
        //资源文件位置
        this.Rjsonurl = pararms.Rjsonurl;
        //设置宽度
        this.init();
        //读取资源 异步函数 我们不知道什么时候执行完毕，
        //但是其他事情必须等到他完毕之后再执行，必须用回调函数
        let me = this
        this.loadAllResource(function() {
            //我们封装的回调函数，这里表示全部资源读取完毕
            // alert('Done!~~~~~~~~~')
            me.start();
            // //绑定监听
            // me.bindEvent();
        });
        //分数
        this.score = 0;

        
    }

    //初始化
    init() {
        //获取视口宽高
        let windowW = document.documentElement.clientWidth;
        let windowH = document.documentElement.clientHeight;

        //最小 最大
        if (windowW > 414) {
            windowW = 414;
        } else if (windowW < 320) {
            windowW = 320;
        }
        if (windowH > 736) {
            windowH = 736;
        } else if (windowH < 640) {
            windowH = 640;
        }
        
        this.canvas.width = windowW;
        this.canvas.height = windowH;    
    }

    //读取资源
    loadAllResource (callback) {
        //准备一个R对象
        this.R = {};
        //备份自己
        let me = this;
        //计数器
        let alreadyDoneNumber = 0;
        //发出请求 请求JSON文件（Ajxs）
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                //转换
                let Robj = JSON.parse(xhr.responseText);
                //遍历
                // alert(Robj.images.length);
                for (let i = 0; i < Robj.images.length; i++) {
                    //创建一个同名key
                    me.R[Robj.images[i].name] = new Image();
                    //请求文件
                    me.R[Robj.images[i].name].src = Robj.images[i].url;
                    //监听
                    me.R[Robj.images[i].name].onload = function () {
                        alreadyDoneNumber++;
                        //清屏
                        me.ctx.clearRect(0, 0, me.canvas.width, me.canvas.height);
                        //提示文字
                        let txt = '正在加载资源' + alreadyDoneNumber + '/' + Robj.images.length + '  请稍后...';
                        //文字居中及属性
                        me.ctx.font = '20px 微软雅黑';
                        me.ctx.textAlign = 'center';
                        me.ctx.fillText(txt, me.canvas.width / 2, me.canvas.height * 0.382);
                        //判断是否加载完毕
                        if (alreadyDoneNumber === Robj.images.length) {
                            callback();
                        }
                    }

                }
            }
        } 
        xhr.open("get", this.Rjsonurl, true);
        xhr.send(null);
    }

    start () {

        // //实例化背景
        // this.background = new Background();
        // //实例化大地
        // this.land = new Land();
        // //管子组
        // this.pipeArr = [];
        // //小鸟
        // this.birds = new Birds();

        //实例化场景
        this.scenes = new Scenes();

        let me = this;
        //设置定时器
        this.timer = setInterval(function() {
            //清屏
            me.ctx.clearRect(0, 0, me.canvas.width, me.canvas.height);
            //帧编号
            me.fno++;

            //场景更新和渲染
            me.scenes.update();
            me.scenes.render();
        
            // //更新背景
            // me.background.update();
            // //渲染背景
            // me.background.render();

            // //大地
            // me.land.update();
            // me.land.render();

            // //更新渲染所有管子
            // for (let i = 0; i < me.pipeArr.length; i++) {
            //     //验证管子是否还在数组中
            //     me.pipeArr[i].update();
            //     me.pipeArr[i] && me.pipeArr[i].render();
            // }

            // //每多少帧实例化管子
            // me.fno % 130 == 0 && (new Pipe());

            // //鸟
            // me.birds.update();
            // me.birds.render();


            // //打印分数
            // //当前分数的位数 比如23就是两位
            // let scoreLength = String(me.score).length;
            // //循环分数的每位数去设置图片显示，有一个基准
            // for(let i = 0; i < scoreLength; i++) {
            //     me.ctx.drawImage(me.R["number" + (String(me.score).charAt(i))], me.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
            // }

            //打印帧编号
            me.ctx.font = '16px consolas';
            me.ctx.textAlign = 'left';
            me.ctx.fillStyle = 'black';
            me.ctx.fillText('FNO: ' + me.fno, 10, 20);
            //打印场景号
            me.ctx.fillText('场景: ' + me.scenes.scenesNumber, 10, 40);
        
        }, 20);
    }
    
    // bindEvent () {
    //     this.canvas.onclick = function() {
    //        game.birds.fly();
    //     } 
    // }

    
}



