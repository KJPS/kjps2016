window.onload = function(){
    init();
    animate(function(){
        var t = text('Hello world', { fill: 'white', font:'bold 50px Arial' });
        setPosition(t, 100, 100);
    });
};
