// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // set enemy's initial location to be off the screen (x coordinate) and to be randomly in one of the first 3 rows (0-2)
    this.x = Math.floor(Math.random() * -500);
    this.y = (Math.floor(Math.random() * 3) * 80) + 60;

    // set enemy's speed to at random be 0.5, 1 or 1.5
    this.speed = (Math.floor(Math.random() * 3) * 100) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // if enemy collides with the player, reset the player's location 
    if (this.didCollideWithPlayer()) {
        player.x = 200;
        player.y = 400;
    }

    // recycles buggies in potentially different lanes with potentially different speeds
    // and at potentially different head starts
    if(this.x > 500){
        this.x = Math.floor(Math.random() * -500); 
        console.log(this.x);
        this.y = (Math.floor(Math.random() * 3) * 80) + 60;
        console.log(this.y);
        this.speed = (Math.floor(Math.random() * 3) * 100) + 100;
    }
};

Enemy.prototype.didCollideWithPlayer = function() {
    if (this.x > player.x - 30 && this.x < player.x + 30) {
        if (this.y > player.y - 20 && this.y < player.y + 20) {
            return true;
        }
    }
    return false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // set the image for the player sprite
    this.sprite = 'images/char-boy.png';

    // set the initial location for the player
    this.x = 200;
    this.y = 400;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // if player ever reaches the top row of the game map, reset the player's location
    if (this.y <= 0) {
        this.x = 200;
        this.y = 400;
    }
};

// Draw the player on the screen, required method for the game
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (key == 'right' && this.x < 400) {
        this.x += 100;
    }
    if (key == 'down' && this.y < 400) {
        this.y += 82;
    }
    if (key == 'up') {
        this.y -= 82;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 5; i ++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
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
