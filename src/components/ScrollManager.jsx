import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = ({ section, onSectionChange }) => {
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    data.fill.classList.add("top-0", "absolute");
  }, []);

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      ease: "power2.inOut",
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    const scrollingDown = data.scroll.current > lastScroll.current;
    const scrollingUp = data.scroll.current < lastScroll.current;

    // Snap forward through transition sections
    if (scrollingDown && curSection === 1) onSectionChange(2);
    if (scrollingDown && curSection === 3) onSectionChange(4);
    if (scrollingDown && curSection === 5) onSectionChange(6);

    // Snap backward through transition sections
    if (scrollingUp && curSection === 5) onSectionChange(4);
    if (scrollingUp && curSection === 3) onSectionChange(2);
    if (scrollingUp && curSection === 1) onSectionChange(0);

    lastScroll.current = data.scroll.current;
  });

  return null;
};
