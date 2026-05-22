import { CameraControls, Text, useFont } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";
import {motion} from "framer-motion-3d"
import {Float} from "@react-three/drei";
import { Computer } from "./Computer";
import { Gym } from "./Gym";
import { useThree } from "@react-three/fiber";


export const Experience = (props) => {
  const controls = useRef();
  const [areControlsEnabled, setControlsEnabled] = useState(true);
  const {section} = props;
  const {viewport} = useThree();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.5;
    controls.current.dolly(22, true);
  };

  const bloomColor = new Color("#fff");
  bloomColor.multiplyScalar(1.4);

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setControlsEnabled(false), 4500);
    return () => clearTimeout(timer);
  }, []);
  


  return (
    <>
      {areControlsEnabled && <CameraControls ref={controls} />}

      <motion.group
      animate={{ y: section === 0 ? 0 : -1 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 1 }}>
      <Float rotationIntensity={0.5}>
        <Text font={"fonts/Poppins-Black.ttf"} fontSize={2.5} position-x={-2.5} position-y={0.5} position-z={-2.5} rotation-y={0.2}>
          RANAK
          <meshBasicMaterial color={bloomColor} toneMapped={false} />
        </Text>

        <group position-x={4} position-z={-2} rotation-y={-0.21}>
          <Computer />
        </group>

        <group position-z={4} position-x={-1.5} rotation-y={-0.21}>
          <Gym />
        </group>
      </Float>
      </motion.group>

      <motion.group position-x={2} position-z={3}
      animate={{
        y: section === 0 ? 0 : (section === 6 ? -viewport.height * 6 + 1 : (section === 2 ? -viewport.height * 2 - 0.5 : -viewport.height * 4 - 0.55)),
        x: section === 0 ? 2 : (section === 6 ? 3.6 : 1.5),
      }}
      transition={{ type: "tween", ease: "easeInOut", duration: 1 }}
      >
        <Avatar 
        animation={section === 0? "hiphop":(section===6?"jog": section===2?"hurricane":"flipKick")} 
        scale={section === 0? 1.5:(section===6?1.6:section===2?2:2.1 )}
        rotY={section === 0? 0:0}
        rotX={section === 0? 0:0}
        />
      </motion.group>

   
      <ambientLight intensity={1}/>
    </>
  );
};

useFont.preload("fonts/Poppins-Black.ttf");
