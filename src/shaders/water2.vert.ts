export default /* glsl */ `
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

// #include <inondata/heightmap_pars_vertex>
#ifdef USE_HEIGHTMAP
uniform sampler2D heightMap;
uniform float heightScale;
uniform float heightBias;
#endif

// TODO: Use three.js includes
varying vec2 vUv;

void main() {
    // UV transformations
    vUv = uv;

    // Normal transformations
#include <beginnormal_vertex> // vec3 objectNormal

    // Position transformations
#include <begin_vertex> // vec3 transformed
#include <displacementmap_vertex>
#ifdef USE_HEIGHTMAP
    transformed += normalize(objectNormal) * (texture2D(heightMap, vUv).x * heightScale + heightBias);
#endif

#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
