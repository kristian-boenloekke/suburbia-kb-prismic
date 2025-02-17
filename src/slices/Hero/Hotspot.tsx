'use client'
import { Billboard } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'

interface HotspotProps {
    position: [number, number, number]
    isVisible: boolean
    color?: string
}

export function Hotspot({
    position,
    isVisible,
    color = '#E6FC6A'
}: HotspotProps) {

    const hotspotRef = useRef<THREE.Mesh>(null)

    //Her skal vi bruge tre knapper, hotspots som altid facer kameraet 
    // https://threejs.org/manual/#en/billboards 

    return (
        <Billboard position={position} follow={true}>
            <mesh ref={hotspotRef} visible={isVisible}>
                <circleGeometry args={[0.02, 32]} />
                {/* 0.02 is radius, 32 is the number of points for the mesh  */}
                <meshStandardMaterial color={color} transparent opacity={1} />  {/* BasicMaterial kan ikke gives transparent opacity */}

            </mesh>

            <mesh visible={isVisible}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'default'
                }}
                >

                <circleGeometry args={[0.03, 32]} />
                <meshBasicMaterial color={color} />  {/* meshBasicMaterial doesn't repond to light and other things */}

            </mesh>

        </Billboard>
    )
}