'use strict';

require('helpers/shims');

var _CharacterViewController = require('modules/character');
var _keyboardController = require('modules/keyboard-interaction');
var _hero;

function tick ()
{
    _hero.update();
    _hero.render();
    
    window.requestAnimationFrame(tick);
}

function init () {

    _keyboardController.init();

    _hero = new _CharacterViewController(_keyboardController.keys);
    _hero.init();

    document.body.appendChild(_hero.el);

    tick();
}

document.addEventListener('DOMContentLoaded', init);