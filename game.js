var WIDTH = document.width,
    HEIGHT = document.height;

// Init
var Config = {
  ball_size: 10,
  canvas: {
    border_x: 0,
    border_y: 0
  }
}

Config.canvas = {
  border_x: (WIDTH-(WIDTH/2 + Config.ball_size)),
  border_y: (HEIGHT-(HEIGHT/2 + Config.ball_size))
}

var Game = {
  camera: null,
  scene: null,
  renderer: null,
  keyboard: new THREEx.KeyboardState(),
  objects: {
    ball: null,
    bricks: [],
    bar: null
  },
  player: {
    points: 0,
    fail: function(){
      this.points -= 50;
    },
    brick_hit: function(){
      this.points += 10;
    }
  },


  init: function() {
    this.init_engine();
    this.init_objects();
  },

  init_engine: function() {
    Game.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 10000);
    Game.camera.position.z = 10000;
    Game.scene = new THREE.Scene();

    Game.renderer = new THREE.WebGLRenderer( {antialias:true});
    Game.renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(Game.renderer.domElement);
  },

  init_objects: function() {
    Game.objects.ball = Ball.init(Game, Config);
    Game.scene.add(Game.objects.ball.object);


    Game.objects.bricks = Bricks.init(Game, Config);
    Game.objects.bricks.object.forEach(function(brick){
      Game.scene.add(brick);
    });

    Game.objects.bar = Bar.init(Game, Config);
    Game.scene.add(Game.objects.bar.object);

  },

  animate: function() {
    stats.begin();

    Game.renderer.render(Game.scene, Game.camera);

    Game.objects.bricks.process();
    Game.objects.bar.process();
    Game.objects.ball.process();

    requestAnimationFrame(Game.animate);

    stats.end();
  }
}

Game.init();
Game.animate();
