var Bricks = {
  game: null,
  config: null,
  object: null,

  init: function(game, config) {
    this.config = config;
    this.game = game;

    var material_brick = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );

    var bricks = [];
    for(var j = 0; j < 3; j++) {
      for(var i = 0; i < WIDTH - 60; i += 60) {
        var brick = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 50, 20, 10, false), material_brick);
        brick.position.x = i - this.config.canvas.border_x + 35;
        brick.position.y = j * 25 + this.config.canvas.border_y - 100;
        brick.rotation.z = 1.57;
        brick.rotation.y = .05;
        brick.direction_x = Math.random() > 0.5 ? (1) : (-1);
        bricks.push(brick);
      }
    }
    this.object = bricks;

    return this;
  },

  process: function() {
    this.process_brick_collision();
    this.object.forEach(function(brick){
      brick.rotation.x += brick.direction_x * Math.random()/10;
    });
  },

  process_brick_collision: function() {
    if(bricks = this.game.objects.ball.check_collision(this.object)) {
      var brick = bricks[0].object;
      this.game.objects.bricks.object.splice(this.game.objects.bricks.object.indexOf(brick), 1); // Remove from array by value
      this.game.scene.remove(brick);
      this.game.objects.ball.direction_y *= -1;
      this.game.player.brick_hit();
    }
  }

}
