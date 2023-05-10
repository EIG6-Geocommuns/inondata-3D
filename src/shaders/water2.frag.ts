export default /* glsl */ `
#include <common>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

// #include <inondata/heightmap_pars_fragment>
#ifdef USE_HEIGHTMAP
uniform sampler2D heightMap;
uniform float heightScale;
uniform float heightBias;
#endif

// TODO: Use three.js includes
varying vec2 vUv;

void main() {
#include <logdepthbuf_fragment>

#ifdef USE_HEIGHTMAP
    float height = texture2D(heightMap, vUv).x;
    // Since we are in greyscale for now
    height = height * heightScale + heightBias;

    // TODO: The following must be given as defines (+ unrolled loop)
    vec3 heightColor;
    if (height <= 0.) {
        // TODO: For debugging purpose, in production we shall discard such
        // fragments
        // heightColor = vec3(0., 0., 0.);
        // https://community.khronos.org/t/use-of-discard-and-return/68293/5
        discard;
        return;
    } else if (height < 0.2) {
        heightColor = vec3(0.847, 0.929, 1.); // #D8EDFF
    } else if (height < 0.5) {
        heightColor = vec3(0.78, 0.855, 0.922); // #C7DAEB
    } else if (height < 1.) {
        heightColor = vec3(0.443, 0.667, 0.976); // #71AAF9
    } else if (height < 2.) {
        heightColor = vec3(0.094, 0.184, 0.6); // #182F99
    } else {
        heightColor = vec3(0.047, 0., 0.298); // #0C004C
    }
    gl_FragColor = vec4(heightColor, 0.8);
#else
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.8);
#endif

#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
}
`
