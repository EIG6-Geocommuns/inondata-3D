import {
    Mesh,
    ShaderMaterial,
    UniformsLib,
    UniformsUtils,
} from "three";
import type {
    BufferGeometry,
    Object3D,
    Shader,
    Texture,
} from "three";

import vertexShader from '../shaders/water2.vert';
import fragmentShader from '../shaders/water2.frag';

const ShaderLayout: Shader = {
    uniforms: {
        // inondata.heightmap
        heightMap: { value: null },
        heightScale: { value: 1 },
        heightBias: { value: 0 },
    },
    vertexShader,
    fragmentShader,
};

export default class Water2<G extends BufferGeometry>
extends Mesh<G, ShaderMaterial> {
    readonly isWater2 = true;

    constructor(geometry: G) {
        super(geometry);
        this.type = 'Water2';

        // material
        this.material = new ShaderMaterial({
            uniforms: UniformsUtils.merge([
                ShaderLayout.uniforms,
                UniformsLib.fog,
                UniformsLib.displacementmap,
            ]),
            vertexShader: ShaderLayout.vertexShader,
            fragmentShader: ShaderLayout.fragmentShader,
            transparent: true,
            fog: true,
            // wireframe: true,
        });
        this.material.defines.USE_DISPLACEMENTMAP = "";
        this.material.defines.USE_HEIGHTMAP = "";
    }

    set displacementMap(map: Texture | null) {
        this.material.uniforms.displacementMap.value = map;
    }

    set heightMap(map: Texture | null) {
        this.material.uniforms.heightMap.value = map;
    }

    static isWater2<G extends BufferGeometry>(obj: Object3D):
        obj is Water2<G> {
        return (obj as Water2<G>).isWater2 !== undefined;
    }
}
