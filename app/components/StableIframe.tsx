"use client";

import { memo, useEffect, useRef } from "react";

interface StableIframeProps {
  src: string;
  height?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const StableIframe = memo(
  function StableIframe({ src, height = "100vh", onLoad, onError }: StableIframeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const onLoadRef = useRef(onLoad);
    const onErrorRef = useRef(onError);

    // Keep callback refs up to date without triggering re-renders
    useEffect(() => { onLoadRef.current = onLoad; }, [onLoad]);
    useEffect(() => { onErrorRef.current = onError; }, [onError]);

    useEffect(() => {
      // If iframe already exists, do nothing — never recreate it
      if (!containerRef.current || iframeRef.current) return;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.style.width = "100%";
      iframe.style.height = height;
      iframe.style.border = "none";
      iframe.style.display = "block";
      iframe.title = "Embedded Content";

      iframe.addEventListener("load", () => onLoadRef.current?.());
      iframe.addEventListener("error", () => onErrorRef.current?.());

      containerRef.current.appendChild(iframe);
      iframeRef.current = iframe;
    }, []); // Truly runs once — refs handle the callbacks

    return <div ref={containerRef} style={{ width: "100%", height }} />;
  },
  () => true // Never re-render for any prop change
);

export default StableIframe;