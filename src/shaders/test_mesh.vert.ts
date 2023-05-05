export default /* glsl */ `
#include <common>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

void main() {
#include <begin_vertex> // vec3 transformed
    transformed += 300.0 * normal;
#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
