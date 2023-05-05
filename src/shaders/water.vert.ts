export default /* glsl */ `
#include <common>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

#define ELEVATION_RGBA 0
#define ELEVATION_COLOR 1
#define ELEVATION_DATA 2
#define NUM_VS_TEXTURES 1
#include <itowns/elevation_pars_vertex>

/** BEGIN water_height_pars_vertex */
/** END water_height_pars_vertex */

out vec2 vUv;
out float vElevation;

void main() {
    vUv = uv;

#include <begin_vertex> // vec3 transformed
//#include <itowns/elevation_vertex>
#if NUM_VS_TEXTURES > 0
    if(elevationTextureCount > 0) {
        float elevation = getElevation(uv, elevationTextures[0], elevationOffsetScales[0], elevationLayers[0]);
        vElevation = elevation;
        transformed += elevation * normal;
    } else {
        //vElevation = 666.;
    }
#endif
    transformed += 400.0 * normal;
#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
