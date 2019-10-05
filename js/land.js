class Land {
    constructor() {
        this.image = game.R.land;

        this.x = 0;
        this.y = game.canvas.height * 0.76;
        this.speed = 2;
    }

    update() {
        this.x -= this.speed;

        if (this.x < -336) {
            this.x = 0;
        }
    }
    render() {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + 336, this.y);
        game.ctx.drawImage(this.image, this.x + 336 * 2, this.y);

        //猫腻大地
        game.ctx.fillStyle = '#ded895';
        game.ctx.fillRect(0, this.y + 100,game.canvas.width, game.canvas.height * 0.22);
    }
}
