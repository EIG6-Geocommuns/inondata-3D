export default /* glsl */ `
#include <common>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

out vec2 vUv;

void main() {
    vUv = uv;

#include <begin_vertex> // vec3 transformed
    transformed += 2000.0 * normal;
#include <project_vertex> // vec4 mvPosition
#include <logdepthbuf_vertex>
#include <fog_vertex>
}
`
