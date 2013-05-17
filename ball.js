var Ball = {
  game: null,
  config: null,
  object: null,
  direction_x: 1,
  direction_x: 1,

  init: function(game, config){
    this.config = config;
    this.game = game;
    var material_ball = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

    this.object = new THREE.Mesh(new THREE.SphereGeometry(Config.ball_size, 10, 10), material_ball);
    this.direction_x = Math.random() > 0.5 ? (5) : (-5);
    this.direction_y = Math.random() > 0.5 ? (5) : (-5);
    this.object.position.x = Math.random() > 0.5 ? (Math.random()*Config.canvas.border_x) : (-Math.random()*this.config.canvas.border_x);
    this.object.position.y = Math.random() > 0.5 ? (Math.random()*Config.canvas.border_y) : (-Math.random()*this.config.canvas.border_y);

    return this;
  },

  check_collision: function(object) {
    if(object.constructor !== Array) {
      object = [object];
    };
    // Original code from http://stemkoski.github.io/Three.js/Collision-Detection.html
    var originPoint = this.object.position.clone();
    for (var vertexIndex = 0; vertexIndex < this.object.geometry.vertices.length; vertexIndex++) {
      var localVertex = this.object.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4( this.object.matrix );
      var directionVector = globalVertex.sub( this.object.position );

      var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
      var collisionResults = ray.intersectObjects( object );
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
        return collisionResults;
      }
    }
    return false;
  },

  process: function() {
    this.check_wall_collision();
    this.process_bottom_collision();
    this.animate();
  },

  check_wall_collision: function() {
    if(this.object.position.x > this.config.canvas.border_x || -this.object.position.x > this.config.canvas.border_x) {
      this.direction_x *= -1;
    }
    if(this.object.position.y > this.config.canvas.border_y || -this.object.position.y > this.config.canvas.border_y) {
      this.direction_y *= -1;
    }
  },

  process_bottom_collision: function() {
    if(-this.object.position.y > this.config.canvas.border_y)
      this.game.player.fail();
  },

  animate: function() {
    this.object.rotation.x += .1;
    this.object.rotation.y += .1;
    this.object.position.x += this.direction_x;
    this.object.position.y -= this.direction_y;
  }

}
