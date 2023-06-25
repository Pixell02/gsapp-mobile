import React, { useEffect, useRef } from "react";
import { View, Image } from "react-native";
import  fabric  from "fabric/lib/aligning_guidelines";

export default function useFabricCanvas(fabricRef, props) {
  const backImg = useRef();

    const initFabric = () => {
      backImg.current = props.posterBackGround;
      console.log(fabric)
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.current.width,
        height: backImg.current.height,
      });
     
      const img = new Image();

      img.src = backImg.current;

      img.onload = () => {
        fabric.Image.fromURL(img.src, (img) => {
          fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
        });
      };
    };

  return {initFabric};
}
