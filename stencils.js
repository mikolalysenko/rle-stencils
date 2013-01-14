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

exports.lp         = lp;
exports.moore      = moore;
exports.vonNeumann = lp.bind(this, 1);
exports.ball       = lp.bind(this, 2);
