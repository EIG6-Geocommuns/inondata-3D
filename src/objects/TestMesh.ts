import {
    BufferGeometry,
    DoubleSide,
    Mesh,
    Object3D,
    ShaderMaterial,
    UniformsLib,
    UniformsUtils
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
                UniformsLib['fog']
            ]),
            vertexShader,
            fragmentShader,
            transparent: false,
            fog: true,
            side: DoubleSide,
            wireframe: true
        });
    }

    static isTestMesh<G extends BufferGeometry>(obj: Object3D):
        obj is TestMesh<G> {
        return (obj as TestMesh<G>).isMeshTest !== undefined;
    }
}
