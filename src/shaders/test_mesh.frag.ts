export default /* glsl */ `
#include <common>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

// TODO: For debugging purpose
#include <displacementmap_pars_vertex>
// TODO: Use three.js includes
varying vec2 vUv;

void main() {
    #include <logdepthbuf_fragment>

    // TODO: Debug functions
    // float el = texture2D(displacementMap, vUv).x;
    // float elMin = 0.;
    // float elMax = 500.;
    // float elNorm = (el - elMin) / (elMax - elMin);
    // gl_FragColor = vec4(elNorm, elNorm, elNorm, 0.8);

    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.8);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
}
`
