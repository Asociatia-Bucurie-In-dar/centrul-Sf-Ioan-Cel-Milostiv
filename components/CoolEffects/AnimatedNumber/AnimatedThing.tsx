"use client";

import classes from './AnimatedNumber.module.css';


import {animate, useMotionValue, useTransform, motion, useInView} from "framer-motion";
import {useEffect, useRef} from "react";

export function AnimatedThing(props: {thing: string, class: string}) {
    const ref = useRef(null);
    const isSeen = useInView(ref, { once: true });
    
   return (
       <div style={{
           transform: isSeen ? "none" : "translateY(100px)",
           opacity: isSeen ? 1 : 0,
           transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0s"
       }}>
           <motion.div className={props.class} ref={ref}>
               {props.thing}
           </motion.div>
       </div>
   );
}