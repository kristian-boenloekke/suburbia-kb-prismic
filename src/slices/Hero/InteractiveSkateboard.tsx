'use client'
import { Skateboard } from "@/components/Skateboard"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

type Props = {}

export function InteractiveSkateboard({ }: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas className="min-h-[60rem] w-full" camera={{position: [1.5, 1, 1.4], fov: 55 }}>
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}


function Scene() {

  return (
    <group>
      {/* <pointLight position={[1, 1, 1]} /> */}
      <OrbitControls />
      {/* <Environment preset="forest" background /> */}
      <Environment files={"/hdr/warehouse-256.hdr"}/>
      {/* <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh> */}
      <Skateboard />
      <ContactShadows opacity={0.6} position={[0, -0.02, 0]} />
    </group>
  )
}

// Environment fra drei tilbyder forskellige presets. - med background att. vises det miljø som presettet anvender
// med OrbitControls kan der navigeres rundt i miljøet 
// every mesh needs a material and a geometry