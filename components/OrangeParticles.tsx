"use client";

import React, { useEffect, useRef } from "react";

const OrangeParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      displayWidth = rect.width;
      displayHeight = rect.height;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      ctx.scale(dpr, dpr);

      // Reset canvas style dimensions
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = this.canvasHeight + Math.random() * 50; // Start from bottom with some random offset
        this.size = Math.random() * 3 + 0.5; // Smaller particles for glitter effect
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.5); // Always move upward (negative Y)
        this.opacity = Math.random() * 0.5 + 0.1;

        // Dark orange color
        this.color = "orange"; // Dark orange color
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges - for bottom to top movement
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y < -10) this.y = this.canvasHeight + 10; // Reappear at bottom when going off top
        // No wrapping for bottom edge since particles start from bottom

        // Dramatic twinkling effect
        this.opacity =
          0.3 +
          Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.4 +
          Math.sin(Date.now() * 0.005 + this.y * 0.01) * 0.3;
        this.opacity = Math.max(0.1, Math.min(1.0, this.opacity));
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 140, 0, ${this.opacity})`); // Bright orange center
        gradient.addColorStop(0.5, `rgba(154, 52, 18, ${this.opacity * 0.6})`); // Dark orange middle
        gradient.addColorStop(1, `rgba(154, 52, 18, 0)`); // Fade to transparent

        // Draw glow
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw star shape
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * 1.2})`; // Golden color for star
        ctx.beginPath();
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size * 0.4;

        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i * Math.PI) / spikes;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = this.x + Math.cos(angle) * radius;
          const y = this.y + Math.sin(angle) * radius;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Add sparkle effect with small white dots
        if (Math.random() > 0.8) {
          // Random sparkle
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.5})`;
          ctx.beginPath();
          ctx.arc(
            this.x + (Math.random() - 0.5) * this.size * 2,
            this.y + (Math.random() - 0.5) * this.size * 2,
            this.size * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80; // More particles for glitter effect

    const createParticles = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(displayWidth, displayHeight));
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent", width: "100vw", height: "100vh" }}
    />
  );
};

export default OrangeParticles;
