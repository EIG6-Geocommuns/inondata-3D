import {
    Clock,
    Color,
    Mesh,
    RepeatWrapping,
    ShaderMaterial,
    UniformsLib,
    UniformsUtils,
    Vector2,
    Vector4
} from 'three';
import type {
    BufferGeometry,
    ColorRepresentation,
    Object3D,
    Shader,
    Texture,
} from 'three';

import vertexShader from '../shaders/water.vert';
import fragmentShader from '../shaders/water.frag';

export interface WaterOptions {
    color?: ColorRepresentation,
    flowSpeed?: number,
    scale?: number,
    shader?: Shader,
    flowMap: Texture,
    normalMap0: Texture,
    normalMap1: Texture,
}

// http://graphicsrunner.blogspot.de/2010/08/water-using-flow-maps.html
class Water extends Mesh<BufferGeometry, ShaderMaterial> {
    #flowSpeed: number;
    #cycle: number;
    #halfCycle: number;

    isWater = true;

    constructor(geometry: BufferGeometry, options: WaterOptions) {
        super(geometry);
        this.type = 'Water';

        const scope = this;

        const color = (options.color !== undefined) ?
            new Color(options.color) : new Color(0x5F9EA0);
        this.#flowSpeed = options.flowSpeed || 0.03;
        const scale = options.scale || 1;
        const shader = options.shader || Water.WaterShader;

        const flowMap = options.flowMap;
        const normalMap0 = options.normalMap0;
        const normalMap1 = options.normalMap1;

        this.#cycle = 0.15; // a cycle of a flow map phase
        this.#halfCycle = this.#cycle * 0.5;
        const clock = new Clock();

        // material
        this.material = new ShaderMaterial({
            uniforms: UniformsUtils.merge([
                UniformsLib['fog'],
                shader.uniforms
            ]),
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            transparent: true,
            fog: true
        });

        this.material.uniforms.tFlowMap = { value: flowMap };
        // this.material.defines.FLOW_DEBUG = true;

        // Normal maps
        normalMap0.wrapS = normalMap0.wrapT = RepeatWrapping;
        normalMap1.wrapS = normalMap1.wrapT = RepeatWrapping;

        this.material.uniforms.tNormalMap0.value = normalMap0;
        this.material.uniforms.tNormalMap1.value = normalMap1;

        // Color
        this.material.uniforms.color.value = color;

        // Initial config
        this.material.uniforms.config.value.x = 0; // flowMapOffset0
        this.material.uniforms.config.value.y = this.#halfCycle; // flowMapOffset1
        this.material.uniforms.config.value.z = this.#halfCycle; // halfCycle
        this.material.uniforms.config.value.w = scale; // scale

        this.onBeforeRender = function (renderer, scene, camera, geometry, material, group) {
            const dt = clock.getDelta();
            this.update(dt);
        };
    }

    update(dt: number) {
        const config = this.material.uniforms.config;

        config.value.x += this.#flowSpeed * dt;             // flowMapOffset0
        config.value.y = config.value.x + this.#halfCycle;  // flowMapOffset1

        // Invariants:
        // flowMapOffset0 \in [0, cycle[
        // flowMapOffset1 \in [0, cycle[
        // |flowMapOffset0 - flowMapOffset1| = halfCycle
        if (config.value.x >= this.#cycle) {
            config.value.x = 0;
            config.value.y = this.#halfCycle;
        } else if (config.value.y >= this.#cycle) {
            config.value.y = config.value.y - this.#cycle;
        }
    }

    static isWater(obj: Object3D): obj is Water {
        return (obj as Water).isWater !== undefined;
    }

    static WaterShader = {
        uniforms: {
            'color': { value: null },
            'tNormalMap0': { value: null },
            'tNormalMap1': { value: null },
            'config': { value: new Vector4() }
        },
        vertexShader,
        fragmentShader
    };
}

export { Water };
