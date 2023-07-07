// import statements
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls,
  Center,
  useGLTF, 
  AccumulativeShadows,
  RandomizedLight,
  Environment } from '@react-three/drei'

export const App = (
  {position = [-1, 0, 2.5], fov = 25}
) => {
  return(
    <Canvas shadows
      camera={{position, fov}}
      eventSource={document.getElementById('root')}
      eventPrefix='client'>
      <ambientLight intensity={0.5}/>
      <Center>
        <Environment preset='city'/>
        <Shirt />
        <Backdrop />
      </Center>
      <OrbitControls />
    </Canvas>
  )
}

function Shirt(props) {
  const { nodes, materials } = useGLTF('/shirt.glb')
  return (
      <group {...props} dispose={null}>
        <mesh geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} position={[0.419, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
  )
}

useGLTF.preload('/shirt.glb')

function Backdrop() {
  return(
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={0.85}
      scale={100}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.2]}>
      <RandomizedLight 
        amount={4}
        radius={0}
        intensity={0.2}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.2}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}