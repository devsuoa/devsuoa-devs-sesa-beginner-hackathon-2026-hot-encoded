import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

// Helper function to create an HTML image element from a URL
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

// Extract cropped portion of image using HTML5 Canvas
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Draw full image to canvas
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  // Extract the cropped portion
  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('No 2d context');
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return croppedCanvas.toDataURL('image/jpeg', 0.9);
}

interface PhotoCropperProps {
  imageSrc: string;
  onConfirm: (croppedImageBase64: string) => void;
  onCancel: () => void;
}

export default function PhotoCropper({ imageSrc, onConfirm, onCancel }: PhotoCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onConfirm(croppedImage);
      } catch (e) {
        console.error("Failed to crop image", e);
      }
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#1a1025',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--color-secondary)' }}>Adjust Profile Photo</h2>
      
      <div style={{ position: 'relative', flex: 1, backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div style={{ padding: '24px 0 16px 0' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'white' }}>Zoom</label>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(Number(e.target.value));
          }}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <button onClick={onCancel} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
        <button onClick={handleConfirm} className="btn-primary" style={{ flex: 1 }}>Confirm</button>
      </div>
    </div>
  );
}
