/**
 * Created by Mike on 4/21/16.
 */

var AM = new AssetManager();


var CANVAS_HEIGHT = 626;
var CANVAS_WIDTH = 1280;

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale){
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frames * frameDuration;
    this.loop = loop;
    this.elapsedTime  = 0;
    this.scale = scale;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y);
};

Background.prototype.update = function () {
};

function TedCruz(game){
    this.duckAnimation = new Animation(AM.getAsset("./img/Cruz/cruzDuck.png"), 202, 328, 5, 0.08, 20, false, 1);
    this.jumpAnimation = new Animation(AM.getAsset("./img/Cruz/cruzJump.png"), 177, 244, 5, 0.08, 20, false, 1);
    this.standingAnimation = new Animation(AM.getAsset("./img/Cruz/cruzStand.png"),140, 314, 5, 0.08, 6, true, 1);
    this.punchAnimation = new Animation(AM.getAsset("./img/Cruz/cruzPunch.png"), 193, 242, 5, 0.08, 20, false, 1);
    this.highKickAnimation = new Animation(AM.getAsset("./img/Cruz/cruzHighKick.png"), 375, 347, 5, 0.08, 20, false, 1);
    this.lowKickAnimation = new Animation(AM.getAsset("./img/Cruz/cruzLowKick.png"), 334, 339, 5, 20, 0.08, 20, false, 1);
    this.walkRightAnimation = new Animation(AM.getAsset("./img/Cruz/cruzWalkRight.png"), 153, 308, 5, 0.08, 20, true, 1);
    this.walkLeftAnimation = new Animation(AM.getAsset("./img/Cruz/cruzWalkLeft.png"), 173, 314, 5, 0.08, 20, true, 1);

    this.jumping = false;
    this.punching = false;
    this.ducking = false;
    this.walkLeft = false;
    this.walkRight = false;
    this.standing = true;
    this.lowKicking = false;
    this.highKicking = false;

    this.ground = (CANVAS_HEIGHT - 200);


    // this.speed = ;
    Entity.call(this, game, 0, (CANVAS_HEIGHT - 200));

}

TedCruz.prototype.draw = function(){
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

TedCruz.prototype.update = function () {
    if(this.game.space);
};

//download background image
AM.queueDownload("./img/whiteHouse.jpg");



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    var ted = new TedCruz(gameEngine);




    //add entites to game
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/whiteHouse.jpg")));


    gameEngine.init(ctx);
    gameEngine.start();
    console.log("All Done!");
});

