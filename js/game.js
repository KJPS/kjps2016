window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });

    var meteroites = [], meteroiteSpeed = 5;
    var score = 0, scoreText = text(20, 20, score, { font: '36px arial', fill: 0xffffff });
    var bullets = [], bulletSpeed = 20;
    var ship = image(100, 350, 'image/ship.png');
    var face = 0;
    var shipX = 0, shipY = 0, step = 10;

    onKeyDown(KEY_DOWN, function(){
        if (shipY === 0) {
            shipY = step;
            face = 2;
        }
    });

    onKeyUp(KEY_DOWN, function(){
        if (shipY === step) {
            shipY = 0;
        }
    });

    onKeyDown(KEY_UP, function(){
        if (shipY === 0) {
            shipY = -step;
            face = 0;
        }
    });

    onKeyUp(KEY_UP, function(){
        if (shipY === -step) {
            shipY = 0;
        }
    });

    onKeyDown(KEY_RIGHT, function(){
        if (shipX === 0) {
            shipX = step;
            face = 1;
        }
    });

    onKeyUp(KEY_RIGHT, function(){
        if (shipX === step) {
            shipX = 0;
        }
    });

    onKeyDown(KEY_LEFT, function(){
        if (shipX === 0) {
            shipX = -step;
            face = 3;
        }
    });

    onKeyUp(KEY_LEFT, function(){
        if (shipX === -step) {
            shipX = 0;
        }
    });

    onKeyDown(KEY_SPACEBAR, function(){
        var r = 5;
        var x = ship.position.x;
        var y = ship.position.y;

        switch (face) {
            case 0:
                y -= r;
                x += ship.width / 2;
            break;
            case 1:
                y += ship.height / 2;
                x += ship.width + r;
            break;
            case 2:
                y += ship.height + r;
                x += ship.width / 2;
            break;
            case 3:
                y += ship.height / 2;
                x -= r;
            break;
        }

        var c = circle(x, y, r, 0xff0000);
        stage.addChild(c);
        bullets.push([face, c]);
    });

    animate(function(){
        var newX = ship.position.x + shipX;
        var newY = ship.position.y + shipY;

        if (
            newX >= 0 && newX + ship.width < window.innerWidth &&
            newY >= 0 && newY + ship.height < window.innerHeight
        ) {
            moveBy(ship, shipX, shipY);
        }

        for (var i in bullets) {
            var ways = [
                [0, -bulletSpeed],
                [bulletSpeed, 0],
                [0, bulletSpeed],
                [-bulletSpeed, 0]
            ];
            var face = bullets[i][0];

            moveBy(bullets[i][1],ways[face][0], ways[face][1]);
        }

        for (var i in meteroites) {
            moveBy(meteroites[i][3], meteroites[i][1], meteroites[i][2]);

            for (var j in bullets) {
                if (isCollision(meteroites[i][3], bullets[j][1])) {
                    score += Math.pow(2, meteroites[i][0]);
                    remove(bullets[j][1]);
                    bullets.splice(j, 1);
                    meteroites[i][0] -= 1;
                    remove(meteroites[i][3]);

                    if (meteroites[i][0] < 1) {
                        meteroites.splice(i, 1);
                    } else {
                        var r = Math.pow(2, meteroites[i][0]) * 10;
                        meteroites[i][3] = circle(meteroites[i][3].x, meteroites[i][3].y, r, 0x00ff00);
                    }
                }
            }
        }

        scoreText.text = score;
    });

    var generateMeteroit = function(){
        var level = parseInt(Math.random() * 3) + 1;
        var radius = Math.pow(2, level) * 10;
        var x = parseInt(Math.random() * (window.innerWidth - radius * 2)) + radius;
        var y = parseInt(Math.random() * (window.innerHeight - radius * 2)) + radius;
        var c = circle(x, y, radius, 0x00ff00);

        meteroites.push([
            level,
            parseInt(Math.random() * meteroiteSpeed) - meteroiteSpeed/2,
            parseInt(Math.random() * meteroiteSpeed) - meteroiteSpeed/2,
            c,
        ]);
    };

    setInterval(generateMeteroit, 5000);
    generateMeteroit();
};
