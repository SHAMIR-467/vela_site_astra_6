import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  Float,
  ContactShadows,
  Html,
} from "@react-three/drei";

import { Object3D, Vector2 } from "three";
import { Hand, RotateCcw, Check, Rotate3D } from "lucide-react";
import { finishes } from "./finishes";
function Flutes({ finish }) {
  const ref = useRef();
  useLayoutEffect(() => {
    const object = new Object3D();
    for (let i = 0; i < 96; i++) {
      const angle = i / 96 * Math.PI * 2;
      object.position.set(Math.sin(angle) * .72, -.04, Math.cos(angle) * .72);
      object.updateMatrix();
      ref.current.setMatrixAt(i, object.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return <instancedMesh ref={ref} args={[null, null, 96]}>
    <cylinderGeometry args={[.012, .012, 2.37, 6]}/>
    <meshStandardMaterial color={finish.color} metalness={.76} roughness={.3}/>
  </instancedMesh>;
}
function Device({ finish, cinematic, reduced, callouts }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current && !reduced)
      ref.current.rotation.y +=
        Math.min(delta, 0.04) * (cinematic ? 0.32 : 0.065);
  });
  const profile = useMemo(() => [[.64,-1.32],[.69,-1.30],[.715,-1.26],[.72,-1.2],[.72,1.18],[.71,1.23],[.69,1.25]].map(([x,y]) => new Vector2(x,y)), []);
  const material = { color: finish.color, metalness: .78, roughness: .28 };
  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.08}
      floatIntensity={reduced ? 0 : 0.12}
    >
      <group ref={ref} rotation={[0.12, -0.3, -0.19]}>
        <mesh>
          <latheGeometry args={[profile, 96]} />
          <meshStandardMaterial {...material} />
        </mesh>
        <Flutes finish={finish} />
        {[-1.31, 1.24].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.728, 0.728, 0.045, 96]} />
            <meshStandardMaterial
              color={finish.accent}
              metalness={1}
              roughness={0.25}
            />
          </mesh>
        ))}
        <mesh position={[0, 1.33, 0]}>
          <cylinderGeometry args={[0.715, 0.725, 0.14, 96]} />
          <meshStandardMaterial
            color="#171a18"
            metalness={0.85}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, 1.406, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.59, 0.008, 8, 96]} />
          <meshStandardMaterial
            color={finish.accent}
            emissive={finish.accent}
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 1.407, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.56, 96]} />
          <meshStandardMaterial
            color="#1c2424"
            metalness={0.45}
            roughness={0.16}
          />
        </mesh>
        <mesh position={[0, 1.414, 0.025]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.053, 0.061, 40, 1, 0.65, 5]} />
          <meshBasicMaterial color="#c5d3b9" />
        </mesh>
        <mesh position={[0, 1.416, -0.025]}>
          <boxGeometry args={[0.008, 0.005, 0.063]} />
          <meshBasicMaterial color="#c5d3b9" />
        </mesh>
        <mesh position={[0, -0.67, 0.733]}>
          <boxGeometry args={[0.022, 0.17, 0.009]} />
          <meshStandardMaterial
            color={finish.accent}
            emissive={finish.accent}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, -1.38, 0]}>
          <cylinderGeometry args={[0.67, 0.64, 0.08, 96]} />
          <meshStandardMaterial color="#131512" roughness={0.65} />
        </mesh>
        {callouts && (
          <>
            <Html
              position={[0.6, 1.3, 0]}
              center
              style={{ pointerEvents: "none" }}
            >
              <span className="live-callout">
                01 <span>TOUCH CONTROL</span>
              </span>
            </Html>
            <Html
              position={[-0.65, -0.5, 0.2]}
              center
              style={{ pointerEvents: "none" }}
            >
              <span className="live-callout left">
                02 <span>PRECISION ALLOY</span>
              </span>
            </Html>
          </>
        )}
      </group>
    </Float>
  );
}
function Fallback({ finish }) {
  return (
    <div className="device-fallback" style={{ "--metal": finish.swatch }}>
      <div className="fallback-top" />
      <div className="fallback-mark">V</div>
    </div>
  );
}
class CanvasBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function ProductCanvas({
  finish = finishes[0],
  cinematic = false,
  callouts = false,
}) {
  const [lost, setLost] = useState(false);
  const [active, setActive] = useState(false);
  const [revision, setRevision] = useState(0);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(!document.hidden);
  const [reduced, setReduced] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mobile, setMobile] = useState(window.matchMedia('(pointer: coarse), (max-width: 700px)').matches);
  const host = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(host.current);
    const onVisibility = () => setForeground(!document.hidden);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: coarse), (max-width: 700px)');
    const onMotion = () => setReduced(motion.matches);
    const onPointer = () => setMobile(pointer.matches);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotion);
    pointer.addEventListener('change', onPointer);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); motion.removeEventListener('change', onMotion); pointer.removeEventListener('change', onPointer); };
  }, []);
  const animate = !reduced && (!mobile || cinematic);
  return <div ref={host} className="product-canvas" aria-label={`Vela One in ${finish.name}`}>
    <CanvasBoundary key={revision} fallback={<Fallback finish={finish}/> }>
      {lost ? <Fallback finish={finish}/> : <Canvas
        dpr={mobile ? 1 : [1, 1.5]}
        frameloop={!visible || !foreground ? 'never' : animate ? 'always' : 'demand'}
        camera={{position:[0,1.8,6.5],fov:36}}
        style={{pointerEvents:mobile&&!active?'none':'auto'}}
        gl={{antialias:true,alpha:true,powerPreference:'default'}}
        fallback={<Fallback finish={finish}/>}
        onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost', e=>{e.preventDefault();setLost(true)}, {once:true})}}
      >
        <ambientLight intensity={.8}/>
        <directionalLight position={[-3,4,5]} intensity={3.5} color="#fff0dc"/>
        <directionalLight position={[3,1,-2]} intensity={2} color="#c9e0ee"/>
        <Suspense fallback={null}>
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={5} position={[-3,2,3]} rotation={[0,-Math.PI/4,0]} scale={[3,6,1]} color="#fff3df"/>
            <Lightformer intensity={3} position={[3,1,2]} rotation={[0,Math.PI/4,0]} scale={[1,5,1]} color="#d9e8f4"/>
            <Lightformer intensity={2} position={[0,4,0]} rotation={[Math.PI/2,0,0]} scale={[4,4,1]}/>
          </Environment>
          <Device finish={finish} cinematic={cinematic} reduced={!animate} callouts={callouts&&!mobile}/>
          <ContactShadows position={[0,-1.85,0]} opacity={.4} scale={7} blur={2.8} far={4} resolution={128} frames={1}/>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enabled={!mobile||active} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.8}/>
      </Canvas>}
    </CanvasBoundary>
    {mobile&&!lost&&<button className={'model-interact'+(active?' engaged':'')} onClick={()=>setActive(v=>!v)} aria-pressed={active}>{active?<Check size={15}/>:<Hand size={15}/>} {active?'Done exploring':'Touch to rotate'}</button>}
    {!mobile&&<button className="model-reset" aria-label="Reset product view" onClick={()=>{setRevision(v=>v+1);setLost(false)}}><RotateCcw size={15}/></button>}
    {lost&&<button className="model-interact" onClick={()=>{setLost(false);setRevision(v=>v+1)}}><RotateCcw size={15}/> Restore 3D view</button>}
  </div>;
}
