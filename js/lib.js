"use strict";

var renderer;
var stage;

/**
 * Sākt spēli.
 *
 * @param {Object} options
 */
function init(options) {
    options = !typeof options === "object" ? options : {};

    options = Object.assign({
        width: 800,
        height: 600
    }, options);

    renderer = new PIXI.WebGLRenderer(800, 600);
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
 * Uzzīmēt tekstu. Vairāk skatīt {@link http://pixijs.github.io/docs/PIXI.Text.html|PIXI.Text}.
 *
 * @param {String} text
 * @param {Object} style
 *
 * @return PIXI.Text
 */
function text(text, style) {
    var text = new PIXI.Text(text, style);
    stage.addChild(text);

    return text;
}

/**
 * Set position to PIXI object.
 *
 * @param {Object} object
 * @param {Number} x
 * @param {Number} y
 *
 * @return {Object}
 */
function setPosition(object, x, y) {
    object.position.set(x, y);

    return object;
}
