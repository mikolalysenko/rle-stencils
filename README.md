rle-stencils
============
Code to generate stencils for the [rle level set processing libraries](https://github.com/mikolalysenko/rle-all).

Basic Usage
===========

To install the library, just do:

    npm install rle-stencils
    
Then in your code you can import the stencil generators using:

    var stencils = require('rle-stencils');

Example: Moore
--------------

Here is how to create a stencil for a [Moore neighborhood](http://en.wikipedia.org/wiki/Moore_neighborhood) with radius 2:

    var moore_neighborhood = stencils.moore(2);
    
Example: von Neumann
--------------------

And here is the same idea applied to a [von Neumann neighborhood](http://en.wikipedia.org/wiki/Von_Neumann_neighborhood)

    var von_eumann_neighborhood = stencils.vonNeumann(1);

Example: Sphere
---------------

    var ball_neighborhood = stencils.ball(5);

Example: L^p
------------

More generally, you can create a stencil for any [Lp ball](http://en.wikipedia.org/wiki/Lp_space), with p being some fixed power.  For example, here is how to make an L^3 ball with radius 6:

    var cubic_neighborhood = stencils.lp(3, 6);
    
In general, calls to `lp(p, r)` return the collection of all integer lattice points `x` satisfying the inequality:

    Math.pow(Math.abs(x[0]), p) + Math.pow(Math.abs(x[1]), p) + Math.pow(Math.abs(x[2]), p) <= Math.pow(r, p)

Acknowledgements
================
(c) 2013 Mikola Lysenko.  MIT License
