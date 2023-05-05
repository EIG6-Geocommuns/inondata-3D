export default /* glsl */ `
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

// TODO: Use three.js includes
varying vec2 vUv;

void main() {
    vec2 vUv = vec2(uv.x, 1.0 - uv.y);
#include <begin_vertex> // vec3 transformed
//#include <displacementmap_vertex>
    transformed += normalize(normal) * (texture2D(displacementMap, vUv).x * displacementScale + displacementBias);

    // transformed += 300.0 * normal;
#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
