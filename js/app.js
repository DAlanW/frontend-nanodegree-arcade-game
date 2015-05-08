// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
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

var playerX = 200;
var playerY = 400;

player.prototype.render = function(playerX, playerY) {
    ctx.drawImage(Resources.get(this.sprite), playerX, playerY);
}

player.prototype.handleInput = function(key) {

    // Flag to put variables back if we hit the edge of the board.
    var flag = false;

    // Get where the player was before key press.
    oldPlayerX = playerX;
    oldPlayerY = playerY;
    switch(key) {
        case "left":
            playerX = playerX - 101;
            if (playerX < 0)  {
                // If at edge, reset player position and set flag to true.
                playerX = 0;
                flag = true;
            }
            break;
        case "right":
            playerX = playerX + 101;
            if (playerX > 400)  {
                // If at edge, reset player position and set flag to true.
                playerX = 400;
                flag = true;
            }
            break;
        case "up":
            playerY = playerY - 83;
            if (playerY < 0)  {
                // If at edge, reset player position and set flag to true.
                playerY = 400;
                flag = true;
            }
            break;
        case "down":
            playerY = playerY + 83;
            if (playerY > 400)  {
                // If at edge, reset player position and set flag to true.
                playerY = 400;
                flag = true;
            }
            break;
    }
    // If flag is set, the player did not move.
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var me = new player;



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
