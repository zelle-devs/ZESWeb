"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Layers, 
  Heart, 
  Landmark, 
  Plane, 
  GraduationCap, 
  Building2 
} from 'lucide-react';
import './HomePageMarqueTrusted.css';

const trustedItems = [
  { name: "E-Commerce", icon: <ShoppingCart size={28} strokeWidth={1.5} /> },
  { name: "SaaS", icon: <Layers size={28} strokeWidth={1.5} /> },
  { name: "Healthcare", icon: <Heart size={28} strokeWidth={1.5} /> },
  { name: "Finance", icon: <Landmark size={28} strokeWidth={1.5} /> },
  { name: "Travel", icon: <Plane size={28} strokeWidth={1.5} /> },
  { name: "Education", icon: <GraduationCap size={28} strokeWidth={1.5} /> },
  { name: "Enterprises", icon: <Building2 size={28} strokeWidth={1.5} /> },
];

function HomePageMarqueTrusted() {
  // Array ko double kar rahe hain taake seamless infinite loop ban sake
  const marqueeItems = [...trustedItems, ...trustedItems];

  return (
    <section className="section-HomePageMarqueTrusted zescloud-section">
      <div className="HomePageMarqueTrustedMArqueSliderWidth" >
        
        {/* Title matches the image design */}
        <h4 className="title-HomePageMarqueTrusted">
          TRUSTED BY MODERN BUSINESSES
        </h4>

        {/* Marquee Wrapper with Blur Effects */}
        <div className="marquee-wrapper-HomePageMarqueTrusted">
          <div className="blur-left-HomePageMarqueTrusted"></div>
          
          <motion.div
            className="track-HomePageMarqueTrusted"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20, // Speed adjust karne ke liye isko kam ya zyada karein
            }}
          >
            {marqueeItems.map((item, index) => (
              <div key={index} className="item-HomePageMarqueTrusted">
                <div className="icon-HomePageMarqueTrusted">
                  {item.icon}
                </div>
                <span className="label-HomePageMarqueTrusted">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="blur-right-HomePageMarqueTrusted"></div>
        </div>

      </div>
    </section>
  );
}

export default HomePageMarqueTrusted;