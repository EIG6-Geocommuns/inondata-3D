export default /* glsl */ `
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

void main() {
    #include <logdepthbuf_fragment>
    gl_FragColor = vec4(0.0, 0.0, 0.7, 1.0);
    #include <fog_fragment>
}
`
