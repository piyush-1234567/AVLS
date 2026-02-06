import { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, Camera, Pause, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VideoFeedProps {
  detectionEnabled: boolean;
  confidence: number;
  selectedImage: string | null;
  onImageSelect: (image: string | null) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
}

export function VideoFeed({
  detectionEnabled,
  confidence,
  selectedImage,
  onImageSelect,
  isProcessing,
  onProcessingChange,
}: VideoFeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [defaultImage] = useState("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedImage || defaultImage;

    img.onload = () => {
      canvas.width = 1280;
      canvas.height = 720;

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw lane detection overlays if enabled
      if (detectionEnabled && !isPaused) {
        onProcessingChange(true);
        setTimeout(() => {
          drawLaneDetection(ctx, canvas.width, canvas.height, confidence);
          onProcessingChange(false);
        }, 500);
      } else {
        onProcessingChange(false);
      }
    };
  }, [selectedImage, detectionEnabled, confidence, isPaused, defaultImage, onProcessingChange]);

  const drawLaneDetection = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    confidenceLevel: number
  ) => {
    // Define lane points (perspective view)
    const leftLane = [
      { x: width * 0.15, y: height },
      { x: width * 0.35, y: height * 0.6 },
      { x: width * 0.4, y: height * 0.4 },
    ];

    const rightLane = [
      { x: width * 0.85, y: height },
      { x: width * 0.65, y: height * 0.6 },
      { x: width * 0.6, y: height * 0.4 },
    ];

    const centerLeftLane = [
      { x: width * 0.42, y: height },
      { x: width * 0.45, y: height * 0.6 },
      { x: width * 0.47, y: height * 0.4 },
    ];

    const centerRightLane = [
      { x: width * 0.58, y: height },
      { x: width * 0.55, y: height * 0.6 },
      { x: width * 0.53, y: height * 0.4 },
    ];

    // Draw lane overlay polygon
    ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
    ctx.beginPath();
    ctx.moveTo(centerLeftLane[0].x, centerLeftLane[0].y);
    centerLeftLane.forEach((point) => ctx.lineTo(point.x, point.y));
    centerRightLane.reverse().forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.fill();

    // Draw lane lines
    const drawLaneLine = (points: { x: number; y: number }[], color: string, isDashed = false) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      if (isDashed) {
        ctx.setLineDash([20, 15]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    drawLaneLine(leftLane, "#3b82f6", false);
    drawLaneLine(rightLane, "#3b82f6", false);
    drawLaneLine(centerLeftLane, "#eab308", true);
    drawLaneLine(centerRightLane, "#eab308", true);

    // Draw detection boxes
    const detectionBoxes = [
      { x: width * 0.3, y: height * 0.5, w: 80, h: 60, label: "Vehicle" },
      { x: width * 0.7, y: height * 0.55, w: 70, h: 50, label: "Vehicle" },
    ];

    detectionBoxes.forEach((box) => {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.strokeRect(box.x, box.y, box.w, box.h);

      // Label background
      ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
      ctx.fillRect(box.x, box.y - 25, 100, 25);

      // Label text
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px sans-serif";
      ctx.fillText(
        `${box.label} ${(confidenceLevel * 100).toFixed(0)}%`,
        box.x + 5,
        box.y - 8
      );
    });

    // Draw info overlay
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    ctx.fillRect(20, 20, 280, 100);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 280, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Lane Detection Active", 35, 45);

    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`Confidence: ${(confidenceLevel * 100).toFixed(1)}%`, 35, 70);
    ctx.fillText(`Status: Processing`, 35, 95);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Card className="overflow-hidden bg-slate-800/50 border-slate-700">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-400" />
          <h2 className="font-semibold text-white">Live Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleTogglePause}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <div className="relative bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ display: "block" }}
        />
        {isProcessing && (
          <div className="absolute top-4 right-4 bg-blue-500/90 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm text-white font-medium">
                Processing...
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
