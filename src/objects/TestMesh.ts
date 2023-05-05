import {
    BufferGeometry,
    DoubleSide,
    Mesh,
    Object3D,
    ShaderMaterial,
    Texture,
    UniformsLib,
    UniformsUtils,
} from "three";

import vertexShader from '../shaders/test_mesh.vert';
import fragmentShader from '../shaders/test_mesh.frag';

export default class TestMesh<G extends BufferGeometry>
extends Mesh<G, ShaderMaterial> {
    readonly isMeshTest = true;

    constructor(geometry: G) {
        super(geometry);
        this.type = 'TestMesh';

        // material
        this.material = new ShaderMaterial({
            uniforms: UniformsUtils.merge([
                UniformsLib.fog,
                UniformsLib.displacementmap,
            ]),
            vertexShader,
            fragmentShader,
            transparent: true,
            fog: true,
            wireframe: true
        });
        this.material.defines.USE_DISPLACEMENTMAP = "";
    }

    set displacementMap(map: Texture | null) {
        this.material.uniforms.displacementMap.value = map;
    }

    static isTestMesh<G extends BufferGeometry>(obj: Object3D):
        obj is TestMesh<G> {
        return (obj as TestMesh<G>).isMeshTest !== undefined;
    }
}
