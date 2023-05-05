export default /* glsl */ `
#include <common>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

void main() {
    #include <logdepthbuf_fragment>

    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.8);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
}
`
