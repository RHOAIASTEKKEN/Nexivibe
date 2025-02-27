import React, { useEffect, useRef } from 'react';

const globalAudioContext = new (window.AudioContext || window.webkitAudioContext)();

const CSSAudioVisualizer = ({ audioRef }) => {
  const containerRef = useRef(null);
  const barsRef = useRef([]);
  const analyzerRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const bars = 64;
    const container = containerRef.current;
    
    // Limpiar barras previas
    barsRef.current.forEach(bar => bar.remove());
    barsRef.current = [];
    
    for (let i = 0; i < bars; i++) {
      const bar = document.createElement('div');
      bar.className = 'visualizer-bar';
      bar.style.cssText = `
        position: absolute;
        bottom: 50%;
        left: 50%;
        width: 4px;
        height: 10px;
        background: linear-gradient(to top, #2ebd91, #8364e8);
        transform-origin: bottom center;
        transform: rotate(${(i * (360 / bars))}deg) translateY(-100px);
        transition: height 0.05s ease;
      `;
      container.appendChild(bar);
      barsRef.current.push(bar);
    }

    const setupAudio = () => {
      if (!audioRef.current) return;

      if (!audioRef.current.source) {
        audioRef.current.source = globalAudioContext.createMediaElementSource(audioRef.current);
      }
      
      const analyzer = globalAudioContext.createAnalyser();
      analyzer.fftSize = 128;
      analyzerRef.current = analyzer;
      
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      audioRef.current.source.connect(analyzer);
      analyzer.connect(globalAudioContext.destination);
    };

    const updateBars = () => {
      if (!analyzerRef.current || !dataArrayRef.current) return;
      analyzerRef.current.getByteFrequencyData(dataArrayRef.current);

      barsRef.current.forEach((bar, index) => {
        const dataIndex = Math.floor(index * dataArrayRef.current.length / barsRef.current.length);
        const frequency = dataArrayRef.current[dataIndex];
        const height = (frequency / 255) * 150 + 10;
        bar.style.height = `${height}px`;
        
        const hue = (frequency / 255) * 360;
        bar.style.background = `linear-gradient(to top, hsl(${hue}, 80%, 60%), hsl(${(hue + 60) % 360}, 80%, 60%))`;
      });

      animationFrameRef.current = requestAnimationFrame(updateBars);
    };

    const init = async () => {
      try {
        setupAudio();
        updateBars();
      } catch (error) {
        console.error('Error initializing audio visualizer:', error);
      }
    };

    init();
    
    container.style.cssText = `
      position: relative;
      width: 100%;
      height: 300px;
      background-color: #000;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      barsRef.current.forEach(bar => bar.remove());
      barsRef.current = [];
    };
  }, [audioRef]);

  return (
    <div className="visualizer-container" ref={containerRef}>
      <style>
        {`
          .visualizer-bar {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            border-radius: 2px;
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .visualizer-container::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
        `}
      </style>
    </div>
  );
};

export default CSSAudioVisualizer;
