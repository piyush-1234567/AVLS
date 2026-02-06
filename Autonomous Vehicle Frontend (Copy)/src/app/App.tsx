import { useState } from "react";
import { VideoFeed } from "./components/VideoFeed";
import { ControlPanel } from "./components/ControlPanel";
import { ModelInfo } from "./components/ModelInfo";
import { DetectionStats } from "./components/DetectionStats";
import { Camera, Activity } from "lucide-react";

export default function App() {
  const [detectionEnabled, setDetectionEnabled] = useState(true);
  const [confidence, setConfidence] = useState(0.85);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Camera className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Autonomous Lane Detection System
                </h1>
                <p className="text-sm text-slate-400">
                  CNN-Based Computer Vision
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">
                System Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            <VideoFeed
              detectionEnabled={detectionEnabled}
              confidence={confidence}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              isProcessing={isProcessing}
              onProcessingChange={setIsProcessing}
            />
            <DetectionStats
              detectionEnabled={detectionEnabled}
              confidence={confidence}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Column - Controls and Info */}
          <div className="space-y-6">
            <ControlPanel
              detectionEnabled={detectionEnabled}
              onDetectionToggle={setDetectionEnabled}
              confidence={confidence}
              onConfidenceChange={setConfidence}
              onImageSelect={setSelectedImage}
            />
            <ModelInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
