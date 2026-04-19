import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleFactor: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
}

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];
    let shootingStar: ShootingStar | null = null;
    let animationFrameId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const initStars = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = [];
      const starCount = Math.floor((w * h) / 6000); // Slightly fewer stars for better performance
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.04 + 0.01,
          twinkleFactor: Math.random() * Math.PI,
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };

    const spawnShootingStar = () => {
      if (shootingStar) return;
      if (Math.random() < 0.998) return; // Rare spawn

      shootingStar = {
        x: Math.random() * w,
        y: Math.random() * (h / 2),
        len: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 5,
        opacity: 1
      };
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw static stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinkleFactor += star.twinkleSpeed;
        const currentOpacity = star.opacity * (0.4 + Math.abs(Math.cos(star.twinkleFactor)) * 0.6);
        
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = h;
          star.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 3, 104, ${currentOpacity})`;
        ctx.fill();
      }

      // Draw & Update Shooting Star
      spawnShootingStar();
      if (shootingStar) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = `rgba(217, 3, 104, ${shootingStar.opacity})`;
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.len, shootingStar.y + (shootingStar.len / 2));
        ctx.stroke();

        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed / 2;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0 || shootingStar.x > w || shootingStar.y > h) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    const handleResize = () => {
      initStars();
    };

    window.addEventListener('resize', handleResize);
    initStars();
    drawStars();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
        willChange: 'transform'
      }}
    />
  );
};
