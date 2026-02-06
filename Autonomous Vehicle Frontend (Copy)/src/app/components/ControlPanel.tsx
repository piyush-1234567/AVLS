import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Settings, Upload, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  detectionEnabled: boolean;
  onDetectionToggle: (enabled: boolean) => void;
  confidence: number;
  onConfidenceChange: (value: number) => void;
  onImageSelect: (image: string | null) => void;
}

export function ControlPanel({
  detectionEnabled,
  onDetectionToggle,
  confidence,
  onConfidenceChange,
  onImageSelect,
}: ControlPanelProps) {
  const handleReset = () => {
    onImageSelect(null);
    onDetectionToggle(true);
    onConfidenceChange(0.85);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          <h2 className="font-semibold text-white">Control Panel</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Detection Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="detection-toggle" className="text-white">
              Lane Detection
            </Label>
            <Switch
              id="detection-toggle"
              checked={detectionEnabled}
              onCheckedChange={onDetectionToggle}
            />
          </div>
          <p className="text-sm text-slate-400">
            Enable or disable real-time lane detection overlay
          </p>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="confidence-slider" className="text-white">
              Confidence Threshold
            </Label>
            <span className="text-sm font-medium text-blue-400">
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            id="confidence-slider"
            min={0.5}
            max={1.0}
            step={0.05}
            value={[confidence]}
            onValueChange={(value) => onConfidenceChange(value[0])}
            className="w-full"
          />
          <p className="text-sm text-slate-400">
            Minimum confidence level for lane detection
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Sample Images */}
        <div className="space-y-3">
          <Label className="text-white">Load Sample Images</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onImageSelect(
                  "https://images.unsplash.com/photo-1615310500979-3b4012b4e8e7"
                )
              }
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Highway
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onImageSelect(
                  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d"
                )
              }
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Urban Road
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onImageSelect(
                  "https://images.unsplash.com/photo-1519003300449-424ad0405076"
                )
              }
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Night Drive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onImageSelect(
                  "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644"
                )
              }
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Curved Road
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Settings
          </Button>
        </div>
      </div>
    </Card>
  );
}
