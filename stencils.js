//Generates a Moore neighborhood with given radius
function moore(radius_) {
  var result = []
    , radius = Math.ceil(radius_);
  for(var i=-radius; i<=radius; ++i) {
    for(var j=-radius; j<=radius; ++j) {
      for(var k=-radius; k<=radius; ++k) {
        result.push([i,j,k]);
      }
    }
  }
  return result;
}

//Creates an Lp ball stencil
function lp(p, radius_) {
  if(p === Number.POSITIVE_INFINITY) {
    return moore(radius_);
  }
  var result = []
    , radius = Math.ceil(radius_)
    , rp     = Math.pow(radius_, p);
  for(var i=-radius; i<=radius; ++i) {
    for(var j=-radius; j<=radius; ++j) {
      for(var k=-radius; k<=radius; ++k) {
        if(Math.pow(Math.abs(i), p) + Math.pow(Math.abs(i), p) + Math.pow(Math.abs(i), p) <= rp) {
          result.push([i,j,k]);
        }
      }
    }
  }
  return result;
}


//Special stencils for 
var CROSS_STENCIL       = [ [0,0,0] ]
  , CUBE_STENCIL        = [ ];

(function() {
  //Build surface stencil
  for(var i=0; i<8; ++i) {
    var p = [0,0,0];
    for(var j=0; j<3; ++j) {
      if((i & (1<<j)) !== 0) {
        p[j] = -1;
      }
    }
    CUBE_STENCIL.push(p);
  }
})();

(function() {
  //Build cross
  for(var i=0; i<3; ++i) {
    for(var s=-1; s<=1; s+=2) {
      var p = [0,0,0];
      p[i] = s;
      CROSS_STENCIL.push(p);
    }
  }
})();

//Export stencils
exports.lp            = lp;
exports.moore         = moore;
exports.vonNeumann    = lp.bind(this, 1);
exports.ball          = lp.bind(this, 2);
exports.CROSS_STENCIL = CROSS_STENCIL;
exports.CUBE_STENCIL  = CUBE_STENCIL;
