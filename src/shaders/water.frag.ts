export default /* glsl */ `
#include <common>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

uniform sampler2D tNormalMap0;
uniform sampler2D tNormalMap1;

uniform sampler2D tFlowMap;

uniform vec3 color;
uniform vec4 config;

in vec2 vUv;
in float vElevation;

#define ELEVATION_RGBA 0
#define ELEVATION_COLOR 1
#define ELEVATION_DATA 2
#define NUM_VS_TEXTURES 1
#include <itowns/elevation_pars_vertex>

// http://graphicsrunner.blogspot.com/2010/08/water-using-flow-maps.html
void main() {
    #include <logdepthbuf_fragment>
    if (vElevation == 666.) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    if (vElevation < 0.) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    if (vElevation == 0.) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    if (vElevation >= 6.) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        return;
    }

    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.8);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
}
`
