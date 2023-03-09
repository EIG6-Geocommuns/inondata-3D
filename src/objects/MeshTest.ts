import {
    BufferGeometry,
    DoubleSide,
    Mesh,
    Object3D,
    ShaderMaterial,
    UniformsLib,
    UniformsUtils
} from "three";

import vertexShader from './test_mesh.vert';
import fragmentShader from './test_mesh.frag';

export class MeshTest<G extends BufferGeometry> extends Mesh<G, ShaderMaterial> {
    readonly isMeshTest = true;

    constructor(geometry: G) {
        super(geometry);
        this.type = 'TestMesh';

        // material
        this.material = new ShaderMaterial({
            uniforms: UniformsUtils.merge([
                {}, // TODO: Add uniforms
                UniformsLib['fog']
            ]),
            vertexShader,
            fragmentShader,
            transparent: false, // TODO: for now
            fog: true,
            side: DoubleSide,
            wireframe: true
        });
    }

    static isMeshTest<G extends BufferGeometry>(obj: Object3D): obj is MeshTest<G> {
        return (obj as MeshTest<G>).isMeshTest !== undefined;
    }
}
