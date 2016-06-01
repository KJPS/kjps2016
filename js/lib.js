"use strict";

var renderer;
var stage;

/**
 * Sākt spēli.
 *
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
 */
function rectangle(x, y, width, height, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawRect(x, y, width, height);
    g.endFill();

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
 */
function polygon(points, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawPolygon(points);
    g.endFill();

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
 */
function circle(x, y, radius, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawCircle(x, y, radius);
    g.endFill();

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
 */
function elipse(x, y, width, height, color) {
    var g = new PIXI.Graphics();
    color = color === undefined ? 0x000000 : color;

    g.beginFill(color);
    g.drawEllipse(x, y, width, height);
    g.endFill();

    stage.addChild(g);

    return g;
}

function image(x, y, url) {
    var texture = PIXI.Texture.fromImage(url);
    var sprite = new PIXI.Sprite(texture);
    sprite.position.set(x, y);
    stage.addChild(sprite);

    return sprite;
}
