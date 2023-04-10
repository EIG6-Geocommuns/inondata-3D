export default /* glsl */ `
// TODO: Maybe itowns/precision_qualifier missing
#include <common>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>

// Similar to default vertex attributes provided by BufferGeometry
//attribute vec3 position;
//attribute vec3 normal;

// Similar to default vertex uniforms provided by object and camera
//uniform mat4 modelMatrix; // object.matrixWorld
//uniform mat4 projectionMatrix; // camera.projectionMatrix
//uniform mat4 modelViewMatrix; // camera.matrixWorldInverse * object.matrixWorld

void main() {
    vec3 transformed = vec3(position);
    transformed += 100.0 * normal;

    vec4 mvPosition = vec4(transformed, 1.0);
    mvPosition = modelViewMatrix * mvPosition;

    gl_Position = projectionMatrix * mvPosition;

    #include <logdepthbuf_vertex>
    #include <fog_vertex>
}
`
