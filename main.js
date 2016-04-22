/**
 * Created by Mike on 4/21/16.
 */

var AM = new AssetManager();


var CANVAS_HEIGHT = 626;
var CANVAS_WIDTH = 1280;

function Animation(spriteSheet,startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, reverse){
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.frameDuration = frameDuration;
    this.totalTime = frames * frameDuration;
    this.loop = loop;
    this.elapsedTime  = 0;
    this.scale = scale;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if(this.loop){
        if(this.isDone()){
            this.elapsedTime =0;
        }
    }else if(this.isDone()){
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame -1 : this.currentFrame();
    var vindex = 0;
    if((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width){
        index -= Math.floor((this.spriteSheet.width - this.startX)/ this.frameWidth);
        vindex++;
    }

    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;

    var offset = vindex === 0? this.startX : 0;

    ctx.drawImage(this.spriteSheet,
                    index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,
                    this.frameWidth, this.frameHeight,
                    locX, locY,
                    this.frameWidth * scaleBy,
                    this.frameHeight * scaleBy);


    // var frame = this.currentFrame();
    // var xindex = 0;
    // var yindex = 0;
    // xindex = frame % this.sheetWidth;
    // yindex = Math.floor(frame / this.sheetWidth);
    //
    // ctx.drawImage(this.spriteSheet,
    //     xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
    //     this.frameWidth, this.frameHeight,
    //     x, y,
    //     this.frameWidth * this.scale,
    //     this.frameHeight * this.scale);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

// no inheritance
function Background(game, spritesheet) {

    this.spritesheet = spritesheet;
    Entity.call(this, game, 0, 0);
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.spritesheet,
        this.x, this.y);
};

Background.prototype.update = function () {
};

function TedCruz(game){
    var duckSheet = AM.getAsset("./img/Cruz/cruzDuck.png");
    this.duckAnimation = new Animation(duckSheet,0,0, 202, 328, 5, 0.08, 20, false, 1, true);
    var jumpSheet = AM.getAsset("./img/Cruz/cruzJump.png");
    this.jumpAnimation = new Animation(jumpSheet,0,0, 177, 244, 5, 0.08, 20, false, 1, true);
    var standSheet = AM.getAsset("./img/Cruz/cruzStand.png");
    this.standingAnimation = new Animation(standSheet,0,0,140, 314, 5, 0.08, 6, true, 1, true);
    var punchSheet = AM.getAsset("./img/Cruz/cruzPunch.png");
    this.punchAnimation = new Animation(punchSheet,0,0, 193, 242, 5, 0.08, 20, false, 1, true);
    var hKickSheet = AM.getAsset("./img/Cruz/cruzHighKick.png");
    this.highKickAnimation = new Animation(hKickSheet,0,0, 375, 347, 5, 0.08, 20, false, 1, true);
    var lKickSheet =AM.getAsset("./img/Cruz/cruzLowKick.png");
    this.lowKickAnimation = new Animation(lKickSheet,0,0, 334, 339, 5, 20, 0.08, 20, false, 1, true);
    var walkRSheet = AM.getAsset("./img/Cruz/cruzWalkRight.png");
    this.walkRightAnimation = new Animation(walkRSheet,0,0, 153, 308, 5, 0.08, 20, true, 1, true);
    var walkLSheet = AM.getAsset("./img/Cruz/cruzWalkLeft.png");
    this.walkLeftAnimation = new Animation(walkLSheet,0,0, 173, 314, 5, 0.08, 20, true, 1, true);


    this.game = game;
    this.jumping = false;
    this.punching = false;
    this.ducking = false;
    this.walkLeft = false;
    this.walkRight = false;
    // this.standing = true;
    this.lowKicking = false;
    this.highKicking = false;

    this.ground = (CANVAS_HEIGHT - 200);


    // this.speed = ;
    Entity.call(this, game, 60, 67);

}

TedCruz.prototype = new Entity();
TedCruz.prototype.constructor = TedCruz;

TedCruz.prototype.update = function () {
    //checks which key has been pressed
    if(this.game.d){
        console.log("D was pressed!!");
        this.walkRight = true;
    }else if(this.game.a){
        this.walkLeft = true;
    }else if(this.game.s){
        this.ducking = true;
    }else if(this.game.w){
        this.jumping = true;
    }else if(this.game.i){
        this.punching = true;
    }else if(this.game.o){
        this.lowKicking = true;
    }else if(this.game.p){
        this.highKicking = true;
    }

    if(this.walkRight){

    }else if(this.walkLeft){

    }else if(this.ducking){

    }else if(this.jumping){

    }else if(this.punching){

    }else if(this.highKicking){

    }else if(this.lowKicking){

    }else{

    }

    Entity.prototype.update.call(this);
};

TedCruz.prototype.draw = function(ctx){

    // if(this.punching){
    //     this.punchAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    // }else if(this.jumping){
    //     this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y -34);
    // }else if(this.ducking){
    //     this.duckAnimation.drawFrame(this.game.clockTick, ctx, this.x , this.y);
    // }else if(this.walkLeft){
    //     this.walkLeftAnimation.drawFrame(this.game.clockTick, ctx, this.x -20 , this.y);
    // }else if(this.walkRight) {
    //     this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y);
    // }else if(this.lowKicking){
    //     this.lowKickAnimation.drawFrame(this.game.clockTick, ctx, this.x , this.y);
    // }else if(this.highKicking){
    //     this.highKickAnimation.drawFrame(this.game.clockTick, ctx, this.x , this.y);
    // }else{ //standing still
        this.standingAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    // }
    Entity.prototype.draw.call(this);
};




//download background image
AM.queueDownload("./img/whiteHouse.jpg");
//download fighter images
AM.queueDownload("./img/Cruz/cruzWalkLeft.png");
AM.queueDownload("./img/Cruz/cruzWalkRight.png");
AM.queueDownload("./img/Cruz/cruzLowKick.png");
AM.queueDownload("./img/Cruz/cruzHighKick.png");
AM.queueDownload("./img/Cruz/cruzPunch.png");
AM.queueDownload("./img/Cruz/cruzStand.png");
AM.queueDownload("./img/Cruz/cruzJump.png");
AM.queueDownload("./img/Cruz/cruzDuck.png");



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    //var bg = new Background(gameEngine);
    var ted = new TedCruz(gameEngine);




    //add entites to game
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/whiteHouse.jpg")));
    gameEngine.addEntity(ted);

    gameEngine.init(ctx);
    gameEngine.start();
});