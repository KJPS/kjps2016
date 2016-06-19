window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });

    var ships = [
        image(100, 350, 'image/ship0.png'),
        image(-100, 350, 'image/ship1.png'),
        image(-100, 350, 'image/ship2.png'),
        image(-100, 350, 'image/ship3.png')
    ];
    var explosion = image(-100, -100, 'image/explosion.png');

    var mWidth = [-1, 50, 100, 200], mHeight = [-1, 40, 80, 160];
    var meteroites = [], meteroiteSpeed = 10, meteroiteBirthSpeed = 2000;
    var score = 0, scoreText = text(20, 20, score, { font: '36px arial', fill: 0xffffff });
    var bullets = [], bulletSpeed = 20;
    var ship = ships[0];
    var face = 0;
    var shipX = 0, shipY = 0, step = 10;

    onKeyDown(KEY_DOWN, function(){
        down = true;
	});

    onKeyUp(KEY_DOWN, function(){
		
    });

    onKeyDown(KEY_UP, function(){
        up = true;
    });

    onKeyUp(KEY_UP, function(){
        
    });

    onKeyDown(KEY_RIGHT, function(){
        
    });

    onKeyUp(KEY_RIGHT, function(){
        
    });

    onKeyDown(KEY_LEFT, function(){
	
	});

    onKeyUp(KEY_LEFT, function(){
        
    });

    function setFace(f){
        stage.removeChild(ship);
        ship = ships[f];
        ship.position.set(ships[face].position.x, ships[face].position.y);
        stage.addChild(ship);
        face = f;
    }

    var spacebarPress = false;

    onKeyDown(KEY_SPACEBAR, function(){
        spacebarPress = true;
    });

    onKeyUp(KEY_SPACEBAR, function(){
        spacebarPress = false;
    });

    var bulletGenHandler = setInterval(function(){
        if (spacebarPress) {
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
        }
    }, 100);

    animate(function(){
        var newX = ship.position.x + shipX;
        var newY = ship.position.y + shipY;

        if (
            newX >= 0 && newX + ship.width < window.innerWidth &&
            newY >= 0 && newY + ship.height < window.innerHeight
        ) {
            moveBy(ship, shipX, shipY);
        }

        for (var i = 0; i < bullets.length; ++i) {
            var ways = [
                [0, -bulletSpeed],
                [bulletSpeed, 0],
                [0, bulletSpeed],
                [-bulletSpeed, 0]
            ];
            var face = bullets[i][0];
            var bullet = bullets[i][1];

            moveBy(bullet, ways[face][0], ways[face][1]);

            if (
                bullet.position.x < 0 || bullet.position.x >= window.innerWidth ||
                bullet.position.y < 0 || bullet.position.y >= window.innerHeight
            ) {
                remove(bullet);
                bullets.splice(i, 1);
                --i;
            }
        }

        for (var i = 0; i < meteroites.length; ++i) {
            var m = meteroites[i][3];
            var level = meteroites[i][0];

            // Move meteroites
            moveBy(m, meteroites[i][1], meteroites[i][2]);

            // Bounce on borders
            if (m.x < 0 || m.x + mWidth[level] >= window.innerWidth) {
                meteroites[i][1] *= -1;
            }

            if (m.y < 0 || m.y + mHeight[level] >= window.innerHeight) {
                meteroites[i][2] *= -1;
            }

            // Ship and meteroite collision
            if (isCollision(ship, m, level * 5)) {
                gameOver();
            }

            // Check collisison with bullets
            for (var j = 0; j < bullets.length; ++j) {
                if (isCollision(m, bullets[j][1], level * 5)) {
                    score += Math.pow(2, meteroites[i][0]);
                    remove(bullets[j][1]);
                    bullets.splice(j, 1);
                    j--;
                    meteroites[i][0] -= 1;

                    if (meteroites[i][0] > 0) {
                        meteroites.push([
                            meteroites[i][0],
                            meteroites[i][1],
                            -meteroites[i][2],
                            image(m.x, m.y, 'image/rock'+meteroites[i][0]+'.png')
                        ]);

                        meteroites.push([
                            meteroites[i][0],
                            -meteroites[i][1],
                            meteroites[i][2],
                            image(m.x, m.y, 'image/rock'+meteroites[i][0]+'.png')
                        ]);
                    }

                    remove(m);
                    meteroites.splice(i, 1);
                    i--;
                }
            }
        }

        scoreText.text = score;
    });

    var generateMeteroit = function(){
        var level, x, y,
            p = ship.position,
            b = ship.getBounds(),
            offset = 300;

        do {
            level = parseInt(Math.random() * 3) + 1;
            x = parseInt(Math.random() * (window.innerWidth - mWidth[level]));
            y = parseInt(Math.random() * (window.innerHeight - mHeight[level]));
        } while (
            p.x + b.width - x - offset > 0 && x + mWidth[level] - p.x - offset &&
            p.y + b.height - y - offset > 0 && y + mHeight[level] - p.y - offset
        );

        var m = image(x, y, 'image/rock'+level+'.png'),
            xvRand = (Math.random() > 0.5 ? 1 : -1) * Math.max(0.1, Math.random()),
            yvRand = (Math.random() > 0.5 ? 1 : -1) * Math.max(0.1, Math.random());

        var mData = [
            level,
            parseInt(xvRand * meteroiteSpeed),
            parseInt(yvRand * meteroiteSpeed),
            m
        ];

        meteroites.push(mData);
    };

    var gameOver = function(){
        clearInterval(meteroiteGenHandler);
        clearInterval(bulletGenHandler);
        text(window.innerWidth * 0.1, window.innerHeight * 0.4, "GAME OVER", { font: '48px arial', fill: 0xffffff });
        pause();

        for (var i = 0; i < bullets.length; ++i) {
            remove(bullets[i][1]);
        }

        bullets = [];
        explosion.position.set(ship.position.x, ship.position.y);
        ship.position.set(-100, -100);
    };

    var meteroiteGenHandler = setInterval(generateMeteroit, meteroiteBirthSpeed);
    generateMeteroit();
};
