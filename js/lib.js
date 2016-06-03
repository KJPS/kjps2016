"use strict";

var renderer;
var stage;

/**
 * Sākt spēli.
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} options
 */
function init(width, height, options) {
    width = width ? width : 800;
    height = height ? height : 600;

    renderer = new PIXI.WebGLRenderer(width, height, options);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();
}

/**
 * Iestatīt animācijas funkciju, kuru izsauc ar ļoti mazu laika starpību.
 *
 * @param {Function} tick
 */
function animate(tick) {
    var fn = function(){
        requestAnimationFrame(fn);
        tick();
        renderer.render(stage);
    };

    fn();
}

/**
 * Uzzīmēt tekstu.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} text
 * @param {Object} style
 *
 * @return PIXI.Text
 */
function text(x, y, text, style) {
    var text = new PIXI.Text(text, style);
    text.position.set(x, y);
    stage.addChild(text);

    return text;
}

/**
 * Draw rectangle.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param color
 *
 * @return PIXI.Graphics
 */
function rectangle(x, y, width, height, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawRect(0, 0, width, height);
    g.endFill();
    g.position.set(x, y);

    stage.addChild(g);

    return g;
}

/**
 * Draw polygon.
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param color
 *
 * @return PIXI.Graphics
 */
function triangle(x1, y1, x2, y2, x3, y3, color) {
    return polygon([
        x1, y1,
        x2, y2,
        x3, y3
    ], color);
}

/**
 * Draw polygon.
 *
 * @param {Array} points
 * @param color
 *
 * @return PIXI.Graphics
 */
function polygon(points, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    var minX = 2000000000, minY = 2000000000;

    for (var i = 0; i < points.length; i += 2) {
        minX = Math.min(minX, points[i]);
        minY = Math.min(minY, points[i + 1]);
    }

    for (var i = 0; i < points.length; i += 2) {
        points[i] -= minX;
        points[i + 1] -= minY;
    }

    g.beginFill(color);
    g.drawPolygon(points);
    g.endFill();
    g.position.set(minX, minY);

    stage.addChild(g);

    return g;
}

/**
 * Draw circle.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param color
 *
 * @return PIXI.Graphics
 */
function circle(x, y, radius, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawCircle(0, 0, radius);
    g.endFill();
    g.position.set(x, y);

    stage.addChild(g);

    return g;
}

/**
 * Draw elipse.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param color
 *
 * @return PIXI.Graphics
 */
function elipse(x, y, width, height, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawEllipse(0, 0, width, height);
    g.endFill();
    g.position.set(x, y);

    stage.addChild(g);

    return g;
}

/**
 * Draw image.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} url
 *
 * @return PIXI.Sprite
 */
function image(x, y, url) {
    var texture = PIXI.Texture.fromImage(url);
    var sprite = new PIXI.Sprite(texture);
    sprite.position.set(x, y);
    stage.addChild(sprite);

    return sprite;
}

/**
 * Add click event to graphics element.
 *
 * @param {PIXI.Graphics} g
 * @param {Function} fn
 *
 * @return {PIXI.Graphics}
 */
function onClick(g, fn) {
    g.interactive = true;
    g.on('click', fn);

    return g;
}

/**
 * Move element to position.
 *
 * @param {PIXI.Graphics} g
 * @param {Number} x
 * @param {Number} y
 *
 * @return {PIXI.Graphics}
 */
function move(g, x, y) {
    g.position.set(x, y);

    return g;
}

/**
 * Move element by position.
 *
 * @param {PIXI.Graphics} g
 * @param {Number} x
 * @param {Number} y
 *
 * @return {PIXI.Graphics}
 */
function moveBy(g, x, y) {
    return move(g, g.position.x + x, g.position.y + y);
}

/**
 * Remove element.
 *
 * @param {PIXI.Graphics} g
 *
 * @return {PIXI.Graphics}
 */
function remove(g) {
    stage.removeChild(g);

    return g;
}

/**
 * Detect element collision.
 *
 * @param {PIXI.Graphics} g1
 * @param {PIXI.Graphics} g2
 *
 * @return {Boolean}
 */
function isCollision(g1, g2) {
    var r1 = g1.getBounds();
    var r2 = g2.getBounds();

    return r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x &&
        r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y;
}

/**
 * Enable draggable element.
 *
 * @param {PIXI.Graphics} g
 *
 * @return {PIXI.Graphics}
 */
function draggable(g) {
    g.interactive = true;
    var dragData = null;

    function onDragStart(e) {
        console.log('Drag start');
        dragData = e.data;
    }

    function onDragMove() {
        console.log('Drag move');
        if (dragData) {
            var newPosition = dragData.getLocalPosition(stage);
            g.position.set(newPosition.x, newPosition.y);
        }
    }

    function onDragEnd() {
        console.log('Drag end');
        dragData = null;
    }

    g
        // Drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // Drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove)
        // Drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
    ;

    return g;
}
