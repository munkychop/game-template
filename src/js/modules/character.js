'use strict';

function Character (keys, props) {
    
    var _props = props || {};

    this.props = {
        keys            : keys,
        el              : _props.el,
        gravity         : _props.gravity || 0.4,
        maxJumpDistance : _props.maxJumpDistance || 20,
        position        : {x: 0, y: 0},
        moveSpeed       : _props.moveSpeed || 4,
        isJumping       : false,
        shouldJump      : false,
        isCrouching     : false,
        shouldCrouch    : false
    };
}

Character.prototype = {
    
    init : function () {
        this.props.el = this.props.el || document.createElement('div');
        this.props.el.classList.add('character');
    },

    get el () {
        
        return this.props.el;
    },

    get position () {
        
        return this.props.position;
    },

    get x () {
        
        return this.props.position.x;
    },

    set x (x) {

        this.props.position.x = x;
    },

    get y () {
        
        return this.props.position.y;
    },

    set y (y) {

        this.props.position.y = y;
    },

    jump : function () {

        this.props.isJumping = true;

        var el = this.props.el;
        var y = this.y;
        el.classList.add('is-jumping');

        // TODO : jump code to change y value (the render method will do the actual moving)

        // add this once the jump has finished:
        this.props.isJumping = false;
        el.classList.remove('is-jumping');
    },

    crouch : function () {

        this.props.isCrouching = true;

        var el = this.props.el;
        el.classList.add('is-crouching');

        // crouch code...
        // ...
    },

    stand : function () {

        this.props.isCrouching = false;

        var el = this.props.el;
        el.classList.remove('is-crouching');

        // crouch code...
        // ...
    },

    update : function () {

        var el = this.props.el;
        var keys = this.props.keys;
        var x = this.x;
        var maxPosX = el.parentNode.offsetWidth - el.offsetWidth;
        var moveSpeed = this.props.moveSpeed;
        var isJumping = this.props.isJumping;
        var isCrouching = this.props.isCrouching;


        if (keys.left.isPressed) x -= moveSpeed;
        if (keys.right.isPressed) x += moveSpeed;

        if (x < 0)
        {
            x = 0;
        }
        else if (x > maxPosX)
        {
            x = maxPosX;
        }

        this.x = x;

        if (keys.up.isPressed && !isJumping) this.props.shouldJump = true;
        if (keys.down.isPressed && !isCrouching) this.props.shouldCrouch = true;
    },

    render : function () {

        var el = this.props.el;

        if (this.props.shouldJump)
        {
            this.props.shouldJump = false;
            this.jump();
        }

        if (this.props.shouldCrouch)
        {
            this.props.shouldCrouch = false;
            this.crouch();
        }
        else if (this.props.isCrouching)
        {
            this.stand();
        }

        el.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
    }
};

module.exports = Character;