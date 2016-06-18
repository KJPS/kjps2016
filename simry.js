"use strict";

var gameState = true;
var renderer;
var stage;
var events = {};

/** @var {Number} KEY_DOWN "S" taustiņš */
var KEY_DOWN = 83;
/** @var {Number} KEY_UP "W" taustiņš */
var KEY_UP = 87;
/** @var {Number} KEY_RIGHT "D" taustiņš */
var KEY_RIGHT = 68;
/** @var {Number} KEY_LEFT "A" taustiņš */
var KEY_LEFT = 65;
/** @var {Number} KEY_SPACEBAR "Spacebar" taustiņš */
var KEY_SPACEBAR = 32

/** @var {Number} COLOR_RED Sarkana krāsa */
var COLOR_RED = 0xFF0000;
/** @var {Number} COLOR_BLUE Zila krāsa */
var COLOR_BLUE = 0x4169E1;
/** @var {Number} COLOR_GREEN Zaļa krāsa */
var COLOR_GREEN = 0x228B22;
/** @var {Number} COLOR_PINK Rozā krāsa */
var COLOR_PINK = 0xFF1493;
/** @var {Number} COLOR_YELLOW Dzeltena krāsa */
var COLOR_YELLOW = 0xFFD700;
/** @var {Number} COLOR_WHITE Balta krāsa */
var COLOR_WHITE = 0xFFFFFF;
/** @var {Number} COLOR_BLACK Balta krāsa */
var COLOR_BLACK = 0x000000;
/** @var {Number} COLOR_GRAY Pelēka krāsa */
var COLOR_GRAY = 0x778899;
/** @var {Number} COLOR_ORANGE Oranža krāsa */
var COLOR_ORANGE = 0xFF4500;
/** @var {Number} COLOR_PURPLE Violeta krasa */
var COLOR_PURPLE = 0x800080;
/** @var {Number} COLOR_BROWN Brūna krāsa */
var COLOR_BROWN = 0x8B4513;
/** @var {Number} COLOR_TEAL Teal krāsa */
var COLOR_TEAL = 0x008080;

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
        gameState && tick();

        stage.children.sort(function(a, b){
            a.zindex = a.zindex || 0;
            b.zindex = b.zindex || 0;

            return a.zindex - b.zindex
        });

        renderer.render(stage);
    };

    fn();
}

/**
 * Zīmēt tekstu.
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
 * Zīmēt četrstūri.
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
 * Zīmēt trijstūri.
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
 * Zīmēt daudzstūri.
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
 * Zīmēt riņķi.
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
 * Zīmēt elipsi.
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

var textureCache = {};

/**
 * Zīmēt attēlu.
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} url
 *
 * @return PIXI.Sprite
 */
function image(x, y, url) {
    var texture = textureCache[url] ? textureCache[url] : PIXI.Texture.fromImage(url);
    textureCache[url] = texture;
    var sprite = new PIXI.Sprite(texture);
    sprite.position.set(x, y);
    stage.addChild(sprite);

    return sprite;
}

/**
 * Pievienot klikšķa notikumu grafiskajamm elementam.
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
 * Pārvietot elementu uz pozīciju.
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
 * Pārvietot elementu pa attālumu.
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
 * Izdzēst elementu.
 *
 * @param {PIXI.Graphics} g
 */
function remove(g) {
    stage.removeChild(g);
    g.destroy();
}

/**
 * Pārbaudīt divu elementu sadursmi.
 *
 * @param {PIXI.Graphics} g1
 * @param {PIXI.Graphics} g2
 * @param {Number} offset
 *
 * @return {Boolean}
 */
function isCollision(g1, g2, offset) {
    var r1 = g1.getBounds(),
        r2 = g2.getBounds(),
        p1 = g1.position,
        p2 = g2.position;
    offset = offset || 0;

    return p2.x + r2.width - p1.x - offset > 0 && p1.x + r1.width - p2.x - offset > 0 &&
        p2.y + r2.height - p1.y - offset > 0 && p1.y + r1.height - p2.y - offset > 0;
}

/**
 * Iespējot elementa vilkšanu.
 *
 * @param {PIXI.Graphics} g
 *
 * @return {PIXI.Graphics}
 */
function draggable(g) {
    g.interactive = true;
    var dragData = null;

    function onDragStart(e) {
        dragData = e.data;
    }

    function onDragMove() {
        if (dragData) {
            var newPosition = dragData.getLocalPosition(stage);
            g.position.set(newPosition.x, newPosition.y);
        }
    }

    function onDragEnd() {
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

/**
 * Atsākt spēles darbību.
 */
function resume()
{
    gameState = true;
}

/**
 * Apstādināt spēles darbību.
 */
function pause()
{
    gameState = false;
}

/**
 * Pogas nospiešana uz leju.
 *
 * @param {Numeric} key
 * @param {Function} fn
 */
function onKeyDown(key, fn)
{
    if (!events['onkeydown']) {
        events['onkeydown'] = [];
    }

    events['onkeydown'].push(function(e){
        e.which == key && fn();
    });
}

/**
 * Pogas atlaišana.
 *
 * @param {Numeric} key
 * @param {Function} fn
 */
function onKeyUp(key, fn)
{
    if (!events['onkeyup']) {
        events['onkeyup'] = [];
    }

    events['onkeyup'].push(function(e){
        e.which == key && fn();
    });
}

document.onkeydown = function(e){
    if (!gameState || events['onkeydown'] === undefined) {
        return;
    }

    for (var i in events['onkeydown']) {
        events['onkeydown'][i](e);
    }
};

document.onkeyup = function(e){
    if (!gameState || events['onkeyup'] === undefined) {
        return;
    }

    for (var i in events['onkeyup']) {
        events['onkeyup'][i](e);
    }
};
