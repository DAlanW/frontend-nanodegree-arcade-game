// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //  The enemy always begins off-screen.
    this.x = CONSTANTS['enemy.start'];

    //  Randomly choose a row to begin on.
    this.randomRow = Math.floor(Math.random() * 3);
    //  Allows for comparison with the player's row.
    this.row = this.randomRow + 2;

    this.y = CONSTANTS['enemy.offset'] + (CONSTANTS['canvas.rowHeight'] * this.randomRow);

    // The speed will vary between the range set in "CONSTANTS.""
    this.speed = Math.floor(((CONSTANTS['enemy.maxSpeed'] - CONSTANTS['enemy.minSpeed']) + 1) * Math.random()) + 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    ind = allEnemies.indexOf(this);

    //  The number of enemies in "allEnemies" is made equal to the number of enemies set in "CONSTANTS."
    if (allEnemies.length < CONSTANTS['enemy.numEnemies']){
        allEnemies.push(new Enemy());
    }

    //  When the enemy moves off of the visible board, it is removed from the "allEnemies" array
    //  and a brand new enemy is "spawned" in its place.
    if (this.x > CONSTANTS['canvas.columnWidth'] * CONSTANTS['canvas.numColumns']){
        allEnemies.splice(ind, 1);
        allEnemies.push(new Enemy());
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.playerColumn = CONSTANTS['player.startingColumn'];
    //  The player's row can be compared with the enemy's row for the "checkCollisions" function.
    this.playerRow = CONSTANTS['player.startingRow'];
};

Player.prototype.calcX = function () {
    this.pixelX = this.playerColumn * CONSTANTS['canvas.columnWidth'];
};

Player.prototype.calcY = function () {
    this.pixelY = (this.playerRow * CONSTANTS['canvas.rowHeight']) - CONSTANTS['player.offset'];
};

Player.prototype.render = function() {
    // The player's position is calculated and rendered.
    this.calcX();
    this.calcY();
    ctx.drawImage(Resources.get(this.sprite), this.pixelX, this.pixelY);
};

Player.prototype.reset = function()  {
    this.playerColumn = Math.floor(CONSTANTS['canvas.numColumns'] / 2);
    this.playerRow = CONSTANTS['canvas.numRows'];
    this.calcX();
    this.calcY();
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        //  The player can never exceed the left-most side, the right-most side,
        //  or the bottom side of the screen and therefore can never move off-screen.
        case "left":
            if (this.playerColumn > 0)  {
                this.playerColumn -= 1;
                this.calcX();
            }
            break;
        case "right":
            if (this.playerColumn < CONSTANTS['canvas.numColumns'] - 1) {
                this.playerColumn += 1;
                this.calcX();
            }
            break;
        case "up":
            if (this.playerRow > 2)  {
                this.playerRow -= 1;
                this.calcY();
            } else {
                //  If the player makes it to the "finish line," a congradulatory message will appear,
                //  indicating the number of enemies there were on the board at the win, and then increasing
                //  the number for the next "round." The player will also be reset.
                confirm("You've won! Congratulations!\n\nEnemy count was: " + CONSTANTS['enemy.numEnemies']++
                    + ".\nEnemy count will now be: " + CONSTANTS['enemy.numEnemies'] + ".");
                this.reset();
            }
            break;
        case "down":
            if (this.playerRow < CONSTANTS['canvas.numRows']){
                this.playerRow += 1;
                this.calcY();
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Always start with one enemy.
var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
