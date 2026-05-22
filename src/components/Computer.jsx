import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Computer(props) {
  const { nodes, materials } = useGLTF('models/Computer.glb')
  return (
    <group {...props} dispose={null} scale={0.006}>
      <mesh geometry={nodes.Comp_Mouse.geometry} material={materials.lambert3SG} />
      <mesh geometry={nodes.Monitor.geometry} material={materials.lambert3SG} />
      <mesh geometry={nodes.Drive.geometry} material={materials.lambert3SG} />
      <mesh geometry={nodes.Keyboard1.geometry} material={materials.lambert3SG} />
      <mesh geometry={nodes.System_unit_1.geometry} material={materials.lambert3SG} />
      <mesh geometry={nodes.System_unit_1_1.geometry} material={materials.initialShadingGroup} />
    </group>
  )
}

useGLTF.preload('models/Computer.glb')
