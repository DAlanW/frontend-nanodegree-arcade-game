// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -99;

    this.row = Math.floor(Math.random() * 3);
    this.y = 60 // offset
                + (83 // size of image
                      * this.row // zero based row
                                );
    this.speed = Math.floor(((maxX - minX) + 1) * Math.random()) + 200;

}

var maxX = 500;
var minX = 100;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    ind = allEnemies.indexOf(this);
    if (allEnemies.length < 3){
        allEnemies.push(new Enemy());
    }
    if (this.x > 505){
        allEnemies.splice(ind, 1);
        allEnemies.push(new Enemy());
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(row) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.sprite = 'images/char-boy.png';
}

player.prototype.update = function(dt) {
    //console.log("It works!");
}

var playerX = 202;
var playerY = 404;
var playerRow = 4;

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), playerX, playerY);
}

player.prototype.handleInput = function(key) {
    switch(key) {
        case "left":
            playerX -= 101;
            if (playerX < 0)  {
                // If at edge, reset player position.
                playerX = 0;
            }
            break;
        case "right":
            playerX += 101;
            if (playerX > 404)  {
                // If at edge, reset player position.
                playerX = 404;
            }
            break;
        case "up":
            playerY -= 83;
            playerRow -= 1;
            if (playerY < 0)  {
                // If at edge, reset player position to beginning of game.
                playerY = 404;
                playerX = 202;
                playerRow = 4;
            }
            break;
        case "down":
            playerY += 83;
            playerRow += 1;
            if (playerY > 404)  {
                // If at edge, reset player position.
                playerY = 404;
                playerRow = 4;
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy()];
var me = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    me.handleInput(allowedKeys[e.keyCode]);
});
