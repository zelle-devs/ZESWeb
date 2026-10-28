/**
 * AiOperationRobotAssistantModalRobotScene
 * ------------------------------------------------------------------
 * Framework-agnostic three.js scene for the Zes AI robot.
 *
 *  - Loads /models/zes-ai-robot.glb (meshopt + WebP, ~1 MB)
 *    Node tree:  Robot -> Body
 *                Robot -> NeckPivot -> Head -> EyeL / EyeR
 *  - Head follows the mouse (anywhere on the page), body stays planted and
 *    only leans/turns slightly when the head turns far.
 *  - Eyes blink through a shader mask (screen-style eyelids).
 *  - Glow aura, light rays, orbit rings and soft particles are rendered in
 *    the same canvas so they sit correctly in front / behind the robot.
 *  - No orbit controls: clicking / dragging never rotates the model.
 *
 * This file is loaded lazily (dynamic import) by
 * AiOperationRobotAssistantModalRobot.jsx so three.js never blocks the page.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */
const CONFIG = {
  maxPixelRatio: 1.75,
  fov: 28,
  focusY: 0.52, // world-space Y the camera looks at (robot is 1 unit tall)
  viewHeight: 2.05, // world units visible vertically (controls robot size)
  minViewWidth: 1.6, // keep robot fully visible on narrow canvases
  viewHeightCompact: 1.62, // used when the canvas is narrower than 640px

  // Mouse tracking (radians)
  headMaxYaw: 0.62,
  headMaxPitchUp: 0.34,
  headMaxPitchDown: 0.24,
  headDamping: 7.5,
  bodyDamping: 2.6,
  bodyFollowStart: 0.2, // head yaw before the body starts to follow
  bodyFollowAmount: 0.42,

  // Robot material look (matched to the reference PNG)
  shellTint: '#2496c4', // azure base colour (tints the glossy reflections)
  shellEnvIntensity: 2.0, // strength of glossy reflections
  shellRoughness: 0.2, // multiplies the roughness map (lower = sharper shine)
  shellMetalness: 0.85, // glossy metallic shell (reflection-driven, like the PNG)
  shellNormalScale: 0.35, // smooths the scanned surface noise -> clean gloss
  detailGlowColor: '#1a86ff', // smile + ear ring + seam glow
  detailGlowIntensity: 2.6,
  rimColor: '#1683ff', // blue light wrapping the edges
  rimPower: 4.0,
  rimStrength: 0.6,
  rimHotColor: '#8eeaff', // thin bright line right on the edge
  rimHotPower: 7,
  rimHotStrength: 3.0,
  // Light panels reflected in the glossy shell: [color, intensity, position, size]
  envPanels: [
    ['#e2f0ff', 5.0, [0, 6, 2.5], [3.2, 0.2, 1.4]], // top softbox (white highlight)
    ['#2f7bff', 3.4, [-6, 1, -2], [0.2, 4, 2.4]], // back-left blue strip
    ['#38b4ff', 3.2, [6, 1.5, -1], [0.2, 4, 2.4]], // back-right blue strip
    ['#d8ecff', 4.5, [2.6, 2.4, 6], [2.0, 0.8, 0.2]], // front highlight strip
    ['#7fbcff', 3.0, [-3, 0.5, 6], [0.6, 3, 0.2]], // front-left strip
    ['#1a6cff', 1.5, [0, 0.5, 6.4], [9, 5, 0.2]], // broad azure sheen (front)
    ['#2a7bff', 1.2, [0, 6.4, 0], [9, 0.2, 9]], // broad azure sheen (top)
    ['#0f3bc4', 0.5, [0, -4, 2], [7, 0.2, 4]], // floor bounce
  ],
  outlineColor: '#1a8cff', // neon halo just outside the silhouette
  outlineThickness: 0.014,
  outlineStrength: 0.95,
  eyeColor: '#00c4ff',
  eyeCoreColor: '#00dcff',
  eyeIntensity: 1.0,
  eyeGlowIntensity: 1.6, // soft halo around each eye (keeps the cyan saturated)
  glowColor: '#1f6dff',
  glowColorBright: '#3fb2ff',

  // Flexible ribbed metal neck (fills the gap and bends with the head)
  neckColor: '#081a3e', // dark navy pump
  neckFit: 0.85, // pipe size relative to the neck frame outline (stays inside it)
  neckBottom: 0.255, // starts inside the chest, so it fills the hollow in front of the neck
  neckTop: 0.4, // ends inside the head
  neckRibs: 10, // fewer folds -> soft, open bellows
  neckRibDepth: 0.004,
  neckBendStart: 0.3436, // pipe is fixed to the body up to the body's neck opening
  neckBendEnd: 0.366, // above this the pipe fully follows the head
  neckBaseFlare: 0.005, // half-height of the rounded lip that joins the pipe to the body
  neckRimStrength: 0.35, // softer edge light on the pump folds
  neckRimHotStrength: 1.0,
  headStubBand: 0.013, // height above the cut where the head's neck piece is rounded
};

/* Exact outlines (x, z in model units) of the neck frame where the head and
   body were separated, measured from the model. Used to close the head bottom
   and body top with metal plates so the neck never shows an empty gap. */
const NECK_CAP_OUTLINES = {
  headY: 0.3412,
  bodyY: 0.3436,
  head: [
    [-0.1725, 0.0072], [-0.1718, -0.0154], [-0.1711, -0.0386], [-0.1703, -0.0634],
    [-0.1668, -0.0891], [-0.1536, -0.1107], [-0.1313, -0.1241], [-0.1069, -0.1321],
    [-0.0841, -0.1385], [-0.0622, -0.1429], [-0.041, -0.146], [-0.0203, -0.1471],
    [0.0, -0.1477], [0.0203, -0.1471], [0.041, -0.1459], [0.0622, -0.143],
    [0.084, -0.1383], [0.1068, -0.132], [0.1312, -0.124], [0.154, -0.111],
    [0.167, -0.0892], [0.1702, -0.0633], [0.171, -0.0386], [0.1718, -0.0154],
    [0.1726, 0.0072], [0.1733, 0.03], [0.1741, 0.0539], [0.1734, 0.079],
    [0.1686, 0.1045], [0.158, 0.1284], [0.1352, 0.1424], [0.1107, 0.1514],
    [0.088, 0.1597], [0.0659, 0.1662], [0.0434, 0.1694], [0.0215, 0.1708],
    [0.0, 0.1706], [-0.0215, 0.1702], [-0.0433, 0.1689], [-0.0661, 0.1668],
    [-0.09, 0.163], [-0.113, 0.1544], [-0.136, 0.1432], [-0.1562, 0.1271],
    [-0.1676, 0.104], [-0.1729, 0.0788], [-0.1739, 0.0538], [-0.1731, 0.03],
  ],
  body: [
    [-0.1598, 0.0072], [-0.1657, -0.0146], [-0.1723, -0.039], [-0.1779, -0.0665],
    [-0.172, -0.0921], [-0.1568, -0.1131], [-0.1334, -0.1262], [-0.1086, -0.1343],
    [-0.0856, -0.141], [-0.0634, -0.1458], [-0.0417, -0.1485], [-0.0207, -0.1501],
    [0.0, -0.1507], [0.0207, -0.1502], [0.0417, -0.1485], [0.0633, -0.1456],
    [0.0854, -0.1407], [0.1085, -0.1342], [0.1333, -0.1261], [0.157, -0.1132],
    [0.1722, -0.0922], [0.1778, -0.0665], [0.1723, -0.039], [0.1662, -0.0147],
    [0.1607, 0.0072], [0.1555, 0.0277], [0.1505, 0.0475], [0.1455, 0.0675],
    [0.1396, 0.0878], [0.1294, 0.1065], [0.1158, 0.123], [0.0972, 0.1339],
    [0.077, 0.1406], [0.0576, 0.1463], [0.0379, 0.1488], [0.0188, 0.1497],
    [0.0, 0.1502], [-0.0188, 0.1501], [-0.0382, 0.1497], [-0.0578, 0.1468],
    [-0.0774, 0.1412], [-0.0972, 0.1338], [-0.1153, 0.1225], [-0.1293, 0.1064],
    [-0.1381, 0.087], [-0.1436, 0.0667], [-0.1489, 0.0471], [-0.1543, 0.0275],
  ],
};

/* Premultiplied additive blending that keeps the canvas alpha correct, so
   glows blend onto the page background instead of painting black boxes. */
const ADDITIVE = {
  transparent: true,
  depthWrite: false,
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.OneFactor,
  blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneFactor,
  blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => {
  const c1 = 1.3;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */
const BACKDROP_VERT = /* glsl */ `
  varying vec2 vP;
  void main() {
    vP = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BACKDROP_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying vec2 vP;

  void main() {
    vec2 p = vP;
    float r = length(p);
    float a = atan(p.y, p.x);

    // soft aura behind the robot
    float core = exp(-r * r * 5.5) * 0.34;
    float halo = exp(-r * r * 1.7) * 0.2;

    // circular aura ring
    float ringR = 0.7;
    float ring = exp(-pow((r - ringR) / 0.010, 2.0)) * 0.32
               + exp(-pow((r - ringR) / 0.07, 2.0)) * 0.08;

    // slow light rays radiating from the robot
    float rays = pow(0.5 + 0.5 * sin(a * 9.0 + uTime * 0.10), 12.0)
               + pow(0.5 + 0.5 * sin(a * 14.0 - uTime * 0.07 + 1.7), 16.0) * 0.8
               + pow(0.5 + 0.5 * sin(a * 5.0 + uTime * 0.05 + 0.6), 8.0) * 0.6;
    float rayMask = smoothstep(0.32, 0.62, r) * (1.0 - smoothstep(0.75, 1.5, r));
    rays *= rayMask * 0.1;

    vec3 col = uColA * (core + halo) + uColB * ring + mix(uColA, uColB, 0.55) * rays;
    col *= uIntro;
    float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

const RING_VERT = /* glsl */ `
  varying vec2 vP;
  varying float vDepth;
  void main() {
    vP = position.xy;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vDepth = world.z;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const RING_FRAG = /* glsl */ `
  #define TAU 6.28318530718
  uniform float uTime;
  uniform float uRadius;
  uniform float uWidth;
  uniform float uSpeed;
  uniform float uDash;
  uniform float uBase;
  uniform float uComet;
  uniform float uIntro;
  uniform vec3 uColor;
  varying vec2 vP;
  varying float vDepth;

  void main() {
    float r = length(vP);
    float a = atan(vP.y, vP.x);
    float across = 1.0 - abs(r - uRadius) / uWidth;
    across = smoothstep(0.0, 1.0, clamp(across, 0.0, 1.0));

    float phase = fract(a / TAU - uTime * uSpeed);
    float comet = pow(phase, 9.0) + pow(fract(phase + 0.5), 14.0) * 0.6;

    float dash = 1.0;
    if (uDash > 0.0) {
      dash = smoothstep(0.35, 0.5, fract(a / TAU * uDash)) * (1.0 - smoothstep(0.62, 0.78, fract(a / TAU * uDash)));
    }

    // dimmer when the ring passes behind the robot
    float depthFade = mix(0.35, 1.0, smoothstep(-0.5, 0.45, vDepth));

    float intensity = (uBase + comet * uComet) * across * dash * depthFade * uIntro;
    vec3 col = uColor * intensity;
    gl_FragColor = vec4(col, clamp(intensity, 0.0, 1.0));
  }
`;

/* Neon halo just outside the robot's silhouette (back faces, pushed out) */
const OUTLINE_VERT = /* glsl */ `
  uniform float uThickness;
  uniform float uNeckY;
  varying float vFacing;
  varying float vNeckFade;
  void main() {
    vec3 n = normalize(normalMatrix * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    // no halo where head and body meet (keeps the neck clean)
    vNeckFade = smoothstep(0.035, 0.085, abs(world.y - uNeckY));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    mv.xyz += n * uThickness;
    vFacing = -dot(n, normalize(-mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

const OUTLINE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying float vFacing;
  varying float vNeckFade;
  void main() {
    float g = clamp(vFacing / 0.42, 0.0, 1.0);
    g = g * g * uStrength * vNeckFade;
    gl_FragColor = vec4(uColor * g, clamp(g, 0.0, 1.0));
  }
`;

const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLOW_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform vec2 uStretch;
  varying vec2 vUv;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0 / uStretch;
    float d = length(p);
    float g = exp(-d * d * 3.2) * (1.0 - smoothstep(0.75, 1.0, d));
    vec3 col = uColor * g * uIntensity;
    gl_FragColor = vec4(col, clamp(g * uIntensity, 0.0, 1.0));
  }
`;

const PARTICLE_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.35 + aSeed * 6.2831) * 0.035;
    p.x += cos(uTime * 0.22 + aSeed * 4.0) * 0.02;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (2.6 / -mv.z);
    vAlpha = 0.35 + 0.45 * fract(aSeed * 7.13);
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntro;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    float g = (1.0 - smoothstep(0.0, 1.0, d));
    g *= g;
    float a = g * vAlpha * uIntro;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */
export { CONFIG as AiOperationRobotAssistantModalRobotConfig };

export default class AiOperationRobotAssistantModalRobotScene {
  constructor(host, options = {}) {
    this.host = host;
    this.options = {
      modelUrl: '/models/zes-ai-robot.glb',
      reducedMotion: false,
      onReady: null,
      onError: null,
      ...options,
    };

    this.disposed = false;
    this.running = false;
    this.inView = true;
    this.pageVisible = typeof document === 'undefined' ? true : !document.hidden;
    this.time = 0;
    this.lastFrame = 0;
    this.intro = 0;
    this.introStarted = false;

    this.pointer = { x: 0, y: 0, active: false, lastMove: 0 };
    this.look = { yaw: 0, pitch: 0, bodyYaw: 0, bodyPitch: 0, bodyRoll: 0 };
    this.blink = { next: 1.6, start: -1, duration: 0.22, double: false, open: 1 };
    this.hostRect = { left: 0, top: 0, width: 1, height: 1 };

    this.disposables = [];
    this._neckWorld = new THREE.Vector3();
    this.rings = [];
    this.eyes = [];

    this._tick = this._tick.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);
    this._onVisibility = this._onVisibility.bind(this);
    this._updateRect = this._updateRect.bind(this);

    this.rimUniforms = {
      uRimColor: { value: new THREE.Color(CONFIG.rimColor) },
      uRimPower: { value: CONFIG.rimPower },
      uRimStrength: { value: CONFIG.rimStrength },
      uRimHotColor: { value: new THREE.Color(CONFIG.rimHotColor) },
      uRimHotPower: { value: CONFIG.rimHotPower },
      uRimHotStrength: { value: CONFIG.rimHotStrength },
    };
    this.robotMaterials = [];

    this._initRenderer();
    this._initScene();
    this._bindEvents();
    this._loadModel();
  }

  /* ---------------- setup ---------------- */
  _initRenderer() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Neutral keeps the blues true (ACES pushes saturated blue toward purple)
    renderer.toneMapping = THREE.NeutralToneMapping !== undefined ? THREE.NeutralToneMapping : THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = 'canvas-AiOperationRobotAssistantModalRobot';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    this.host.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.camera = new THREE.PerspectiveCamera(CONFIG.fov, 1, 0.05, 50);
    this.scene = new THREE.Scene();

    this.resizeObserver = new ResizeObserver(() => this._resize());
    this.resizeObserver.observe(this.host);
    this._resize();
  }

  _initScene() {
    const { scene } = this;
    this._buildEnvironment();

    // Lights: soft key from the front, strong blue rims from behind
    scene.add(new THREE.HemisphereLight(0x9fc4ff, 0x020812, 0.22));
    const key = new THREE.DirectionalLight(0x7fb4ff, 1.5);
    key.position.set(1.2, 2.4, 2.8);
    const rimL = new THREE.DirectionalLight(0x2f86ff, 3.4);
    rimL.position.set(-2.3, 1.3, -1.6);
    const rimR = new THREE.DirectionalLight(0x3cc4ff, 2.8);
    rimR.position.set(2.4, 0.9, -1.4);
    const fill = new THREE.PointLight(0x2b6dff, 0.9, 4, 2);
    fill.position.set(0, 0.25, 1.5);
    scene.add(key, rimL, rimR, fill);

    // Everything that orbits / glows lives around the robot centre
    this.fxGroup = new THREE.Group();
    this.fxGroup.position.set(0, CONFIG.focusY, 0);
    scene.add(this.fxGroup);

    this._buildBackdrop();
    this._buildRings();
    this._buildParticles();

    this.robotGroup = new THREE.Group();
    scene.add(this.robotGroup);
  }

  _buildEnvironment() {
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const env = new THREE.Scene();
    env.background = new THREE.Color(0x01040b);
    const box = new THREE.BoxGeometry(1, 1, 1);
    const panels = CONFIG.envPanels;
    const mats = [];
    panels.forEach(([color, intensity, pos, scl]) => {
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) });
      const mesh = new THREE.Mesh(box, mat);
      mesh.position.set(...pos);
      mesh.scale.set(...scl);
      env.add(mesh);
      mats.push(mat);
    });
    const rt = pmrem.fromScene(env, 0.035);
    this.scene.environment = rt.texture;
    this.disposables.push(rt);
    box.dispose();
    mats.forEach((m) => m.dispose());
    pmrem.dispose();
  }

  _buildBackdrop() {
    const geo = new THREE.PlaneGeometry(3.4, 3.0);
    const mat = new THREE.ShaderMaterial({
      vertexShader: BACKDROP_VERT,
      fragmentShader: BACKDROP_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uColA: { value: new THREE.Color(CONFIG.glowColor) },
        uColB: { value: new THREE.Color(CONFIG.glowColorBright) },
      },
      ...ADDITIVE,
      depthTest: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0.04, -0.7);
    mesh.renderOrder = -10;
    this.fxGroup.add(mesh);
    this.backdrop = mesh;
    this.disposables.push(geo, mat);
  }

  _buildRings() {
    const defs = [
      // radius, width, tiltX, tiltZ, speed, dash, base, comet, color, yOffset
      { r: 0.8, w: 0.0085, tx: -1.2, tz: -0.2, speed: 0.06, dash: 0, base: 0.38, comet: 1.6, color: '#3b9bff', y: -0.04 },
      { r: 0.68, w: 0.006, tx: -1.32, tz: 0.26, speed: -0.045, dash: 0, base: 0.24, comet: 1.2, color: '#56b4ff', y: 0.02 },
      { r: 0.92, w: 0.0045, tx: -1.38, tz: 0.08, speed: 0.03, dash: 90, base: 0.42, comet: 0.6, color: '#3989e2', y: -0.1 },
    ];
    defs.forEach((d, i) => {
      const geo = new THREE.RingGeometry(d.r - d.w * 2, d.r + d.w * 2, 256, 1);
      const mat = new THREE.ShaderMaterial({
        vertexShader: RING_VERT,
        fragmentShader: RING_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uRadius: { value: d.r },
          uWidth: { value: d.w * 2 },
          uSpeed: { value: d.speed },
          uDash: { value: d.dash },
          uBase: { value: d.base },
          uComet: { value: d.comet },
          uIntro: { value: 0 },
          uColor: { value: new THREE.Color(d.color) },
        },
        side: THREE.DoubleSide,
        ...ADDITIVE,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const pivot = new THREE.Group();
      pivot.position.y = d.y;
      pivot.rotation.set(d.tx, 0, d.tz);
      pivot.add(mesh);
      this.fxGroup.add(pivot);
      this.rings.push({ mesh, pivot, mat, delay: 0.25 + i * 0.18, spin: 0.015 * (i % 2 ? -1 : 1) });
      this.disposables.push(geo, mat);
    });
  }

  _buildParticles() {
    const count = 110;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    let s = 1337;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < count; i += 1) {
      const ang = rand() * Math.PI * 2;
      const rad = 0.55 + Math.pow(rand(), 0.7) * 0.85;
      pos[i * 3] = Math.cos(ang) * rad * 1.15;
      pos[i * 3 + 1] = Math.sin(ang) * rad * 0.8;
      pos[i * 3 + 2] = (rand() - 0.5) * 0.9;
      size[i] = 2 + rand() * 4.5;
      seed[i] = rand();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
        uColor: { value: new THREE.Color('#5cbcff') },
      },
      ...ADDITIVE,
    });
    this.particles = new THREE.Points(geo, mat);
    this.fxGroup.add(this.particles);
    this.disposables.push(geo, mat);
  }

  _makeGlowMaterial(color, intensity, stretch = [1, 1]) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: GLOW_VERT,
      fragmentShader: GLOW_FRAG,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uIntensity: { value: intensity },
        uStretch: { value: new THREE.Vector2(...stretch) },
      },
      ...ADDITIVE,
    });
    this.disposables.push(mat);
    return mat;
  }

  /* ---------------- model ---------------- */
  _loadModel() {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      this.options.modelUrl,
      (gltf) => {
        if (this.disposed) return;
        this._setupModel(gltf.scene);
      },
      undefined,
      (err) => {
        if (this.disposed) return;
        if (this.options.onError) this.options.onError(err);
      }
    );
  }

  _setupModel(root) {
    this.model = root;
    this.robotRoot = root.getObjectByName('Robot') || root;
    this.neck = root.getObjectByName('NeckPivot');
    this.head = root.getObjectByName('Head');
    this.robotRoot.rotation.order = 'YXZ';
    if (this.neck) this.neck.rotation.order = 'YXZ';

    const shellMaterials = new Set();
    root.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.frustumCulled = false; // robot is always in frame; avoids bounds work
      if (obj.material && obj.material.name !== 'RobotEye') shellMaterials.add(obj.material);
      this.disposables.push(obj.geometry);
    });
    shellMaterials.forEach((m) => this._setupShellMaterial(m));
    this._buildOutlines(root);
    this._buildNeck();

    root.updateMatrixWorld(true);
    this._roundHeadStub();
    ['EyeL', 'EyeR'].forEach((name) => {
      const node = root.getObjectByName(name);
      if (node) this._setupEye(node);
    });

    this.robotGroup.add(root);
    this.robotGroup.scale.setScalar(0.86);

    // world position used for the mouse -> screen mapping
    this.headAnchor = new THREE.Vector3(0, 0.62, 0.1);

    // compile shaders before the first visible frame (avoids a hitch)
    this.renderer.compile(this.scene, this.camera);

    this.introStarted = true;
    this.introStart = this.time;
    if (this.options.reducedMotion) this.intro = 1;
    if (this.options.onReady) this.options.onReady();
  }

  /*
   * Ribbed metal neck pipe. The bottom stays in the body, the top follows the
   * head: every vertex is rotated around the neck pivot by a fraction of the
   * head rotation (0 at the body -> 1 inside the head), so the pipe bends like
   * a flexible bellows and there is never an empty gap when the head turns.
   */
  _buildNeck() {
    if (!this.neck || !this.robotRoot) return;
    const pivot = this.neck.position.clone(); // NeckPivot in Robot space
    // Cross-section follows the neck frame: at every angle the pipe radius is
    // the smaller of the head / body outline (inset a little), so it fills the
    // opening but always stays inside the body frame.
    const outlineRadius = (outline, theta) => {
      const n = outline.length; // samples at -PI + i * 2PI / n around (0, pivot.z)
      const f = (((theta + Math.PI) / (Math.PI * 2)) * n + n) % n;
      const i0 = Math.floor(f);
      const i1 = (i0 + 1) % n;
      const r = (p) => Math.hypot(p[0], p[1] - pivot.z);
      return r(outline[i0]) * (1 - (f - i0)) + r(outline[i1]) * (f - i0);
    };
    const frameRadius = (theta) =>
      Math.min(outlineRadius(NECK_CAP_OUTLINES.head, theta), outlineRadius(NECK_CAP_OUTLINES.body, theta)) *
      CONFIG.neckFit;

    const height = CONFIG.neckTop - CONFIG.neckBottom;
    const geo = new THREE.CylinderGeometry(1, 1, height, 96, 96, true);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i += 1) {
      v.fromBufferAttribute(pos, i);
      const y = v.y + height / 2 + CONFIG.neckBottom; // Robot-space height
      const theta = Math.atan2(v.z, v.x);
      const phase = ((y - CONFIG.neckBottom) / height) * CONFIG.neckRibs * Math.PI * 2;
      const rib = 0.5 + 0.5 * Math.cos(phase); // soft, smooth folds
      const pipeR = frameRadius(theta) - CONFIG.neckRibDepth * (1 - rib);
      // Rounded lip exactly at the body's neck opening: the pipe swells out to
      // the body frame outline there, so it is attached to the body (no gap),
      // and stays slim above/below so the body's own neck ribs stay visible.
      const bodyR = outlineRadius(NECK_CAP_OUTLINES.body, theta) * 0.99;
      const lip = 1 - smoothstep(0, CONFIG.neckBaseFlare, Math.abs(y - NECK_CAP_OUTLINES.bodyY));
      const r = pipeR + (bodyR - pipeR) * lip;
      pos.setXYZ(i, Math.cos(theta) * r, y, Math.sin(theta) * r + pivot.z);
    }
    geo.computeVertexNormals();

    // same look as the robot's own ribbed neck ring (dark glossy metal + edge light)
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(CONFIG.neckColor),
      metalness: CONFIG.shellMetalness,
      roughness: 0.34,
      envMapIntensity: CONFIG.shellEnvIntensity * 0.6,
    });
    // softer edge light on the pump than on the shell (no bright stripes on the folds)
    const pumpRim = {
      ...this.rimUniforms,
      uRimStrength: { value: CONFIG.neckRimStrength },
      uRimHotStrength: { value: CONFIG.neckRimHotStrength },
    };
    const bend = {
      uBendAngles: { value: new THREE.Vector3() },
      uBendPivot: { value: pivot },
      uBendRange: { value: new THREE.Vector2(CONFIG.neckBendStart, CONFIG.neckBendEnd) },
    };
    mat.onBeforeCompile = (shader) => {
      this._patchRim(shader, pumpRim);
      Object.assign(shader.uniforms, bend);
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform vec3 uBendAngles; // x = pitch, y = yaw, z = roll (head relative to body)
           uniform vec3 uBendPivot;
           uniform vec2 uBendRange;
           mat3 zesBendMatrix(float t) {
             vec3 a = uBendAngles * t;
             float cx = cos(a.x), sx = sin(a.x);
             float cy = cos(a.y), sy = sin(a.y);
             float cz = cos(a.z), sz = sin(a.z);
             mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, sx, 0.0, -sx, cx);
             mat3 ry = mat3(cy, 0.0, -sy, 0.0, 1.0, 0.0, sy, 0.0, cy);
             mat3 rz = mat3(cz, sz, 0.0, -sz, cz, 0.0, 0.0, 0.0, 1.0);
             return ry * rx * rz; // same 'YXZ' order as the head
           }`
        )
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
           mat3 zesBend = zesBendMatrix(smoothstep(uBendRange.x, uBendRange.y, position.y));
           objectNormal = zesBend * objectNormal;`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           transformed = zesBend * (transformed - uBendPivot) + uBendPivot;`
        );
    };
    mat.customProgramCacheKey = () => 'zes-robot-neck';

    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    this.robotRoot.add(mesh);
    this.neckPipe = { mesh, uniforms: bend };
    this.disposables.push(geo, mat);

    // Metal plates closing the head bottom and the body top (exact frame outline)
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(CONFIG.neckColor),
      metalness: CONFIG.shellMetalness,
      roughness: 0.45,
      envMapIntensity: CONFIG.shellEnvIntensity * 0.8,
      emissive: new THREE.Color('#0a2150'), // shadowed navy underside, never pure black
      side: THREE.DoubleSide,
    });
    const makeCap = (points, facingDown) => {
      // slightly inset (0.995) so the plate never pokes through the frame
      const pts = points.map(([x, z]) => [x * 0.995, (z - pivot.z) * 0.995 + pivot.z]);
      // Shape lies in XY; rotate it flat so its points land on (x, 0, z):
      //  body plate faces up   -> shape (x, -z), rotateX(-90deg)
      //  head plate faces down -> shape (x,  z), rotateX(+90deg)
      const shape = new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, facingDown ? z : -z)));
      const capGeo = new THREE.ShapeGeometry(shape, 1);
      capGeo.rotateX(facingDown ? Math.PI / 2 : -Math.PI / 2);
      this.disposables.push(capGeo);
      return capGeo;
    };
    const bodyCap = new THREE.Mesh(makeCap(NECK_CAP_OUTLINES.body, false), capMat);
    bodyCap.position.y = NECK_CAP_OUTLINES.bodyY;
    this.robotRoot.add(bodyCap);
    // Head plate is a circle around the turning axis, so turning never shows a corner
    const stubR = this._headStubRadius();
    const roundHead = NECK_CAP_OUTLINES.head.map(([x, z]) => {
      const dz = z - pivot.z;
      const r = Math.hypot(x, dz) || 1;
      return [(x / r) * stubR, (dz / r) * stubR + pivot.z];
    });
    const headCap = new THREE.Mesh(makeCap(roundHead, true), capMat);
    headCap.position.set(-pivot.x, NECK_CAP_OUTLINES.headY - pivot.y, -pivot.z); // in NeckPivot space
    this.neck.add(headCap);
    this.disposables.push(capMat);
  }

  /* Radius of the round head-neck piece: just inside the narrowest head outline */
  _headStubRadius() {
    const pivotZ = this.neck ? this.neck.position.z : 0;
    let minR = Infinity;
    NECK_CAP_OUTLINES.head.forEach(([x, z]) => {
      minR = Math.min(minR, Math.hypot(x, z - pivotZ));
    });
    return minR * 0.98;
  }

  /*
   * The bottom of the head (the short piece of the original neck ring just
   * above the cut) is not perfectly round. When the head turns, its wider
   * corner swings out past the body's neck frame at the back. Here that band
   * is pulled in to a circle around the turning axis, fading back to the
   * original shape above it, so the head can turn without showing a corner.
   */
  _roundHeadStub() {
    if (!this.head || !this.neck) return;
    const headMesh = this.head.children.find(
      (c) => c.isMesh && c.material && c.material.name !== 'RobotEye' && !c.material.isShaderMaterial
    );
    if (!headMesh) return;
    this.neck.updateMatrixWorld(true);
    const neckInv = this.neck.matrixWorld.clone().invert();
    const toNeck = neckInv.multiply(headMesh.matrixWorld); // mesh space -> neck pivot space
    const fromNeck = toNeck.clone().invert();
    const cutY = NECK_CAP_OUTLINES.headY - this.neck.position.y;
    const stub = {
      uToNeck: { value: toNeck },
      uFromNeck: { value: fromNeck },
      uStubR: { value: this._headStubRadius() },
      uStubBand: { value: new THREE.Vector2(cutY + CONFIG.headStubBand * 0.45, cutY + CONFIG.headStubBand) },
    };
    const mat = headMesh.material.clone();
    mat.onBeforeCompile = (shader) => {
      this._patchRim(shader);
      Object.assign(shader.uniforms, stub);
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform mat4 uToNeck;
           uniform mat4 uFromNeck;
           uniform float uStubR;
           uniform vec2 uStubBand;`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           vec3 zesN = (uToNeck * vec4(transformed, 1.0)).xyz;
           float zesK = 1.0 - smoothstep(uStubBand.x, uStubBand.y, zesN.y);
           float zesR = length(zesN.xz);
           if (zesK > 0.0 && zesR > uStubR) {
             zesN.xz *= mix(zesR, uStubR, zesK) / zesR;
             transformed = (uFromNeck * vec4(zesN, 1.0)).xyz;
           }`
        );
    };
    mat.customProgramCacheKey = () => 'zes-robot-head-shell';
    headMesh.material = mat;
    this.robotMaterials.push(mat);
    this.disposables.push(mat);
  }

  _buildOutlines(root) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: OUTLINE_VERT,
      fragmentShader: OUTLINE_FRAG,
      uniforms: {
        uColor: { value: new THREE.Color(CONFIG.outlineColor) },
        uStrength: { value: 0 },
        uThickness: { value: CONFIG.outlineThickness },
        uNeckY: { value: 0 },
      },
      side: THREE.BackSide,
      ...ADDITIVE,
    });
    this.outlineMaterial = mat;
    this.disposables.push(mat);
    const targets = [];
    root.traverse((obj) => {
      if (obj.isMesh && obj.material && !String(obj.material.name).startsWith('RobotEye')) targets.push(obj);
    });
    targets.forEach((mesh) => {
      const shell = new THREE.Mesh(mesh.geometry, mat);
      shell.position.copy(mesh.position);
      shell.quaternion.copy(mesh.quaternion);
      shell.scale.copy(mesh.scale);
      shell.frustumCulled = false;
      shell.renderOrder = 2;
      mesh.parent.add(shell);
    });
  }

  _patchRim(shader, rimUniforms = this.rimUniforms) {
    Object.assign(shader.uniforms, rimUniforms);
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform vec3 uRimColor;
         uniform float uRimPower;
         uniform float uRimStrength;
         uniform vec3 uRimHotColor;
         uniform float uRimHotPower;
         uniform float uRimHotStrength;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
         float zesFres = 1.0 - saturate(dot(normal, normalize(vViewPosition)));
         totalEmissiveRadiance += uRimColor * pow(zesFres, uRimPower) * uRimStrength;
         totalEmissiveRadiance += uRimHotColor * pow(zesFres, uRimHotPower) * uRimHotStrength;`
      );
  }

  _applyLook(mat) {
    mat.color = new THREE.Color(CONFIG.shellTint);
    mat.envMapIntensity = CONFIG.shellEnvIntensity;
    mat.roughness = CONFIG.shellRoughness;
    mat.metalnessMap = null; // uniform glossy metal instead of the scanned map
    mat.metalness = CONFIG.shellMetalness;
    if (mat.normalScale) mat.normalScale.setScalar(CONFIG.shellNormalScale);
    mat.emissive = new THREE.Color(CONFIG.detailGlowColor);
    mat.emissiveIntensity = CONFIG.detailGlowIntensity;
    this.robotMaterials.push(mat);
  }

  _setupShellMaterial(mat) {
    this._applyLook(mat);
    mat.onBeforeCompile = (shader) => this._patchRim(shader);
    mat.customProgramCacheKey = () => 'zes-robot-shell';
    mat.needsUpdate = true;
    this.disposables.push(mat);
  }

  _setupEye(node) {
    const mesh = node.isMesh ? node : node.getObjectByProperty('isMesh', true);
    if (!mesh) return;
    const base = mesh.material;
    const mat = base.clone();
    mat.name = `RobotEye-${node.name}`;
    this._applyLook(mat);

    /*
     * Eye disc, measured from the mesh and stored in the GLB (node extras):
     *  center = middle of the raised eye disc (centre of the black ring)
     *  normal = direction the disc faces (eyes sit on the curved visor and
     *           face ~10deg outward, so they are NOT aligned with head +Z)
     *  axisX / axisY = the disc's own horizontal / vertical directions
     * Everything is converted to the mesh's attribute space so it also works
     * with the quantized (compressed) geometry.
     */
    const extras = node.userData || {};
    const center = new THREE.Vector3();
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);
    const radius = new THREE.Vector2();
    const toAttr = (headPoint) => mesh.worldToLocal(this.head.localToWorld(headPoint.clone()));
    if (Array.isArray(extras.center) && Array.isArray(extras.radius) && this.head) {
      const headCenter = new THREE.Vector3(...extras.center);
      center.copy(toAttr(headCenter));
      const meshScale = mesh.getWorldScale(new THREE.Vector3()).x;
      const headScale = this.head.getWorldScale(new THREE.Vector3()).x;
      const k = headScale / meshScale;
      radius.set(extras.radius[0] * k, extras.radius[1] * k);
      if (Array.isArray(extras.axisX) && Array.isArray(extras.axisY)) {
        axisX.copy(toAttr(headCenter.clone().add(new THREE.Vector3(...extras.axisX)))).sub(center).normalize();
        axisY.copy(toAttr(headCenter.clone().add(new THREE.Vector3(...extras.axisY)))).sub(center).normalize();
      }
    } else {
      mesh.geometry.computeBoundingBox();
      const bb = mesh.geometry.boundingBox;
      bb.getCenter(center);
      radius.set((bb.max.x - bb.min.x) / 2.24, (bb.max.y - bb.min.y) / 2.24);
    }

    const uniforms = {
      uEyeCenter: { value: center },
      uEyeAxisX: { value: axisX },
      uEyeAxisY: { value: axisY },
      uEyeRadius: { value: radius },
      uEyeOpen: { value: 1 },
      uEyeColor: { value: new THREE.Color(CONFIG.eyeColor) },
      uEyeCore: { value: new THREE.Color(CONFIG.eyeCoreColor) },
      uEyeIntensity: { value: 0 },
    };

    mat.onBeforeCompile = (shader) => {
      this._patchRim(shader);
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vEyeP;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvEyeP = position;');
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           varying vec3 vEyeP;
           uniform vec3 uEyeCenter;
           uniform vec3 uEyeAxisX;
           uniform vec3 uEyeAxisY;
           uniform vec2 uEyeRadius;
           uniform float uEyeOpen;
           uniform vec3 uEyeColor;
           uniform vec3 uEyeCore;
           uniform float uEyeIntensity;`
        )
        .replace(
          '#include <map_fragment>',
          `#include <map_fragment>
           // position measured in the eye disc's own plane -> always centred in the ring
           vec3 eyeRel = vEyeP - uEyeCenter;
           vec2 eyeQ = vec2(dot(eyeRel, uEyeAxisX), dot(eyeRel, uEyeAxisY))
                     / (uEyeRadius * vec2(1.0, max(uEyeOpen, 0.05)));
           float eyeD = length(eyeQ);
           float eyeMask = 1.0 - smoothstep(0.82, 1.0, eyeD);
           diffuseColor.rgb *= 1.0 - eyeMask * 0.9;`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
           float eyeCoreF = 1.0 - smoothstep(0.0, 0.95, eyeD);
           totalEmissiveRadiance += eyeMask * mix(uEyeColor, uEyeCore, eyeCoreF * 0.4) * uEyeIntensity;`
        );
    };
    mat.customProgramCacheKey = () => 'zes-robot-eye';
    mesh.material = mat;
    this.disposables.push(mat);

    // soft bloom-like halo in front of each eye (moves with the head)
    let glow = null;
    if (this.head && Array.isArray(extras.center)) {
      const geo = new THREE.PlaneGeometry(1, 1);
      const gmat = this._makeGlowMaterial(CONFIG.eyeColor, 0, [1, 1]);
      glow = new THREE.Mesh(geo, gmat);
      const [cx, cy, cz] = extras.center;
      // Anchored exactly on the eye disc centre and facing the same way as
      // the disc, so the halo never drifts out of the ring when the head turns.
      glow.position.set(cx, cy, cz);
      if (Array.isArray(extras.normal)) {
        glow.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(...extras.normal).normalize()
        );
      }
      const rx = extras.radius[0];
      const ry = extras.radius[1];
      glow.scale.set(rx * 4.2, ry * 4.2, 1);
      glow.userData.baseScaleY = ry * 4.2;
      // drawn after the robot and not clipped by the curved eye dome
      gmat.depthTest = false;
      glow.renderOrder = 10;
      this.head.add(glow);
      this.disposables.push(geo);
    }

    this.eyes.push({ uniforms, glow });
  }

  /* ---------------- events ---------------- */
  _bindEvents() {
    window.addEventListener('pointermove', this._onPointerMove, { passive: true });
    document.addEventListener('pointerleave', this._onPointerLeave);
    window.addEventListener('blur', this._onPointerLeave);
    document.addEventListener('visibilitychange', this._onVisibility);
    window.addEventListener('scroll', this._updateRect, { passive: true });
    window.addEventListener('resize', this._updateRect, { passive: true });
    this._updateRect();
  }

  _onPointerMove(e) {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
    this.pointer.active = true;
    this.pointer.lastMove = this.time;
  }

  _onPointerLeave() {
    this.pointer.active = false;
  }

  _onVisibility() {
    this.pageVisible = !document.hidden;
    this._syncRunning();
  }

  _updateRect() {
    const r = this.host.getBoundingClientRect();
    this.hostRect = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 };
  }

  _resize() {
    const w = Math.max(1, this.host.clientWidth);
    const h = Math.max(1, this.host.clientHeight);
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(CONFIG.fov / 2));
    // a little closer on small screens so the robot stays the hero
    const viewHeight = w < 640 ? CONFIG.viewHeightCompact : CONFIG.viewHeight;
    const distH = viewHeight / (2 * tanHalf);
    const distW = CONFIG.minViewWidth / (2 * tanHalf * aspect);
    const dist = Math.max(distH, distW);
    this.camera.position.set(0, CONFIG.focusY + 0.03, dist);
    this.camera.lookAt(0, CONFIG.focusY, 0);
    this.camera.updateProjectionMatrix();
    if (this.hostRect) this._updateRect();
    if (!this.running && this.model) this._render();
  }

  /* ---------------- public API ---------------- */
  setInView(inView) {
    this.inView = inView;
    this._syncRunning();
  }

  _syncRunning() {
    const shouldRun = this.inView && this.pageVisible && !this.disposed;
    if (shouldRun && !this.running) {
      this.running = true;
      this.lastFrame = performance.now();
      this.raf = requestAnimationFrame(this._tick);
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  }

  start() {
    this._syncRunning();
  }

  /* ---------------- frame loop ---------------- */
  _tick(now) {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this._tick);
    const dt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    this.time += dt;
    this._update(dt);
    this._render();
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
  }

  _update(dt) {
    const t = this.time;
    const reduced = this.options.reducedMotion;

    /* intro */
    if (this.introStarted && this.intro < 1) {
      this.intro = clamp((t - this.introStart) / 1.6, 0, 1);
    }
    const intro = this.intro;
    const robotIn = easeOutBack(smoothstep(0, 0.75, intro));
    const fxIn = easeOutCubic(smoothstep(0.1, 1, intro));

    /* fx */
    this.backdrop.material.uniforms.uTime.value = t;
    this.backdrop.material.uniforms.uIntro.value = fxIn;
    const pulse = reduced ? 1 : 1 + Math.sin(t * 1.1) * 0.015;
    this.backdrop.scale.setScalar((0.82 + 0.18 * fxIn) * pulse);

    this.rings.forEach((ring, i) => {
      const k = easeOutCubic(smoothstep(ring.delay, ring.delay + 0.6, intro));
      ring.mat.uniforms.uIntro.value = k;
      ring.mat.uniforms.uTime.value = reduced ? 0 : t;
      ring.mesh.scale.setScalar(0.7 + 0.3 * k);
      if (!reduced) ring.mesh.rotation.z += ring.spin * dt * (i === 2 ? 0.5 : 1);
    });

    this.particles.material.uniforms.uTime.value = reduced ? 0 : t;
    this.particles.material.uniforms.uIntro.value = fxIn;
    if (!reduced) this.particles.rotation.z += dt * 0.01;

    if (!this.model) return;

    /* robot entrance */
    if (this.outlineMaterial) {
      this.outlineMaterial.uniforms.uStrength.value = CONFIG.outlineStrength * fxIn;
      if (this.neck) this.outlineMaterial.uniforms.uNeckY.value = this.neck.getWorldPosition(this._neckWorld).y;
    }
    this.robotGroup.scale.setScalar(0.86 + 0.14 * robotIn);
    this.robotGroup.position.y = (1 - robotIn) * -0.06;

    /* look target */
    let yawT = 0;
    let pitchUpT = 0;
    const idle = !this.pointer.active || t - this.pointer.lastMove > 6;
    if (!idle) {
      const anchor = this.headAnchor.clone();
      this.robotGroup.localToWorld(anchor);
      anchor.project(this.camera);
      const sx = this.hostRect.left + ((anchor.x + 1) / 2) * this.hostRect.width;
      const sy = this.hostRect.top + ((1 - anchor.y) / 2) * this.hostRect.height;
      const nx = (this.pointer.x - sx) / (window.innerWidth * 0.42);
      const ny = (sy - this.pointer.y) / (window.innerHeight * 0.42);
      yawT = Math.tanh(nx * 1.35) * CONFIG.headMaxYaw;
      pitchUpT = Math.tanh(ny * 1.35) * (ny > 0 ? CONFIG.headMaxPitchUp : CONFIG.headMaxPitchDown);
    } else if (!reduced) {
      // gentle idle "looking around" when there is no mouse (touch devices)
      yawT = Math.sin(t * 0.33) * 0.22 + Math.sin(t * 0.71) * 0.06;
      pitchUpT = Math.sin(t * 0.27 + 1.2) * 0.06;
    }

    const L = this.look;
    L.yaw = damp(L.yaw, yawT, CONFIG.headDamping, dt);
    L.pitch = damp(L.pitch, pitchUpT, CONFIG.headDamping, dt);

    // body follows only when the head turns far, and only slightly
    const yawExcess = Math.sign(L.yaw) * Math.max(0, Math.abs(L.yaw) - CONFIG.bodyFollowStart);
    const pitchExcess = Math.sign(L.pitch) * Math.max(0, Math.abs(L.pitch) - 0.16);
    const bodyYawT = yawExcess * CONFIG.bodyFollowAmount;
    const bodyRollT = -yawExcess * 0.16;
    const bodyPitchT = -pitchExcess * 0.3;
    L.bodyYaw = damp(L.bodyYaw, bodyYawT, CONFIG.bodyDamping, dt);
    L.bodyRoll = damp(L.bodyRoll, bodyRollT, CONFIG.bodyDamping, dt);
    L.bodyPitch = damp(L.bodyPitch, bodyPitchT, CONFIG.bodyDamping, dt);

    this.robotRoot.rotation.set(L.bodyPitch, L.bodyYaw, L.bodyRoll);
    if (this.neck) {
      this.neck.rotation.set(-L.pitch - L.bodyPitch, L.yaw - L.bodyYaw, -L.yaw * 0.09 - L.bodyRoll * 0.6);
      if (this.neckPipe) {
        const r = this.neck.rotation;
        this.neckPipe.uniforms.uBendAngles.value.set(r.x, r.y, r.z);
      }
    }

    /* blink */
    const eyeOn = smoothstep(0.35, 0.85, intro);
    let open = 1;
    if (!reduced) {
      const B = this.blink;
      if (B.start < 0 && t >= B.next) {
        B.start = t;
        B.double = Math.random() < 0.22;
      }
      if (B.start >= 0) {
        const total = B.double ? B.duration * 2.15 : B.duration;
        const local = t - B.start;
        if (local >= total) {
          B.start = -1;
          B.next = t + 2.4 + Math.random() * 3.2;
        } else {
          const p = (local % (B.duration * 1.08)) / B.duration;
          const v = p < 0.42 ? p / 0.42 : 1 - (p - 0.42) / 0.58;
          open = 1 - smoothstep(0, 1, clamp(v, 0, 1)) * 0.95;
        }
      }
    }
    this.eyes.forEach((eye) => {
      eye.uniforms.uEyeOpen.value = open;
      eye.uniforms.uEyeIntensity.value = CONFIG.eyeIntensity * eyeOn;
      if (eye.glow) {
        eye.glow.material.uniforms.uIntensity.value = CONFIG.eyeGlowIntensity * eyeOn * (0.35 + 0.65 * open);
        eye.glow.scale.y = eye.glow.userData.baseScaleY * (0.45 + 0.55 * open);
      }
    });
  }

  /* ---------------- teardown ---------------- */
  dispose() {
    this.disposed = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerleave', this._onPointerLeave);
    window.removeEventListener('blur', this._onPointerLeave);
    document.removeEventListener('visibilitychange', this._onVisibility);
    window.removeEventListener('scroll', this._updateRect);
    window.removeEventListener('resize', this._updateRect);
    if (this.resizeObserver) this.resizeObserver.disconnect();

    if (this.model) {
      this.model.traverse((obj) => {
        if (obj.isMesh && obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v && v.isTexture) v.dispose();
            });
          });
        }
      });
    }
    this.disposables.forEach((d) => d && d.dispose && d.dispose());
    this.disposables = [];
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}