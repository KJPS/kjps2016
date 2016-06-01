window.onload = function(){
    init(800, 600, { backgroundColor: 0xffffff });
    animate(function(){
        var txt = text(100, 100, 'Hello world');
        var r = rectangle(100, 150, 20, 20, 0xff0000);
        var c = circle(100, 200, 20, 0x00ff00);
        var t = triangle(100, 250, 200, 250, 150, 300);
        var e = elipse(100, 300, 40, 30, 0x0000ff);
        var i = image(100, 350, 'image/ship.png');
    });
};
