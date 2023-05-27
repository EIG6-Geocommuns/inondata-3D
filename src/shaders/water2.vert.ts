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

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

void main() {
    // UV transformations
    vUv = rotateUV(uv, 3.*PI_HALF);

    // Normal transformations
#include <beginnormal_vertex> // vec3 objectNormal

    // Position transformations
#include <begin_vertex> // vec3 transformed
#include <displacementmap_vertex>
    vUv = rotateUV(uv, PI_HALF);
#ifdef USE_HEIGHTMAP
    transformed += normalize(objectNormal) * (texture2D(heightMap, vUv).x * heightScale + heightBias);
#endif

#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
