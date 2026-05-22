import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import {ScrollManager} from "./components/ScrollManager";
import { useState } from "react";
import { MotionConfig } from "framer-motion";



function App() {

  const [section,setSection] = useState(0);

  return (
    <MotionConfig>
    <Canvas shadows camera={{ position: [0, 4, 9], fov: 42 }}>
      <color attach="background" args={["#171720"]} />
      <fog attach="fog" args={["171720",10,30]}/> 
      <Suspense>
          <ScrollControls pages={7} damping={0.3}>
              <ScrollManager section={section} onSectionChange={setSection}/>
              <Scroll>
              <Experience section={section} />
              </Scroll>
              <Scroll html>
                  <Interface/>
              </Scroll>
          </ScrollControls>
      </Suspense>
      <EffectComposer>
        <Bloom mipmapBlur intensity={1.2}></Bloom>
      </EffectComposer>
    </Canvas>
    </MotionConfig>
  );
}

export default App;
