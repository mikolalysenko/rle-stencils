//Generates a Moore neighborhood with given radius
function moore(radius_) {
  var result = []
    , radius = Math.ceil(radius_);
  for(var i=-radius; i<=radius; ++i) {
    for(var j=-radius; j<=radius; ++j) {
      for(var k=-radius; k<=radius; ++k) {
        result.push(i);
        result.push(j);
        result.push(k);
      }
    }
  }
  return new Int32Array(result);
}

//Creates an Lp ball stencil
function lp(p, radius_) {
  if(p === Number.POSITIVE_INFINITY) {
    return moore(radius_);
  }
  var result = []
    , radius = Math.ceil(radius_)|0
    , rp     = Math.pow(radius_, p);
  for(var i=-radius; i<=radius; ++i) {
    for(var j=-radius; j<=radius; ++j) {
      for(var k=-radius; k<=radius; ++k) {
        if(Math.pow(Math.abs(i), p) + Math.pow(Math.abs(j), p) + Math.pow(Math.abs(k), p) <= rp) {
          result.push(i);
          result.push(j);
          result.push(k);
        }
      }
    }
  }
  return result;
}


//Special stencils for
var CUBE_STENCIL;
(function() {
  var cube = []
  for(var i=0; i<8; ++i) {
    var p = [0,0,0];
    for(var j=0; j<3; ++j) {
      if((i & (1<<j)) !== 0) {
        p[j] = -1;
      }
    }
    cube.push(p[0]);
    cube.push(p[1]);
    cube.push(p[2]);
  }
  CUBE_STENCIL = new Int32Array(cube);
})();

var CROSS_STENCIL;
(function() {
  var cross = [0,0,0];
  for(var i=0; i<3; ++i) {
    for(var s=-1; s<=1; s+=2) {
      cross.push(i === 0 ? s : 0);
      cross.push(i === 1 ? s : 0);
      cross.push(i === 2 ? s : 0);
    }
  }
  CROSS_STENCIL = new Int32Array(cross);
})();

//Export stencils
exports.lp            = lp;
exports.moore         = moore;
exports.vonNeumann    = lp.bind(null, 1);
exports.ball          = lp.bind(null, 2);
exports.CROSS_STENCIL = CROSS_STENCIL;
exports.CUBE_STENCIL  = CUBE_STENCIL;
