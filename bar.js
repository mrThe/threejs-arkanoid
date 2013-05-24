var Bar = {
  game: null,
  config: null,
  object: null,


  init: function(game, config){
    this.config = config;
    this.game = game;
    var material_bar = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );

    this.object = new THREE.Mesh(new THREE.CubeGeometry(150, 10, 10, 10, 5), material_bar);
    this.object.direction_x = Math.random() > 0.5 ? (5) : (-5);
    this.object.direction_y = Math.random() > 0.5 ? (5) : (-5);
    this.object.position.x = 0;
    this.object.position.y = -this.config.canvas.border_y;

    return this;
  },

  process: function() {
    this.process_keyboard();
    this.process_collision();
  },

  process_keyboard: function() {
    if(this.game.keyboard.pressed("left") && (this.object.position.x - this.object.geometry.width/2 >= -this.config.canvas.border_x)) {
      this.object.position.x -= 7;
    };

    if(this.game.keyboard.pressed("right") && (this.object.position.x + this.object.geometry.width/2 <= this.config.canvas.border_x)) {
      this.object.position.x += 7;
    }
  },

  process_collision: function() {
    if(this.game.objects.ball.check_collision(this.object) !== false) {
      this.game.objects.ball.direction_y *= -1;
    }
  }
}
