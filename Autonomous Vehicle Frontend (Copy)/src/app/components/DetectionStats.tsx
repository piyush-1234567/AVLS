import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { TrendingUp, Navigation, Zap, AlertTriangle } from "lucide-react";

interface DetectionStatsProps {
  detectionEnabled: boolean;
  confidence: number;
  isProcessing: boolean;
}

export function DetectionStats({
  detectionEnabled,
  confidence,
  isProcessing,
}: DetectionStatsProps) {
  const [fps, setFps] = useState(30);
  const [latency, setLatency] = useState(33);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (detectionEnabled && !isProcessing) {
      setAccuracy(confidence * 100);
      setFps(Math.floor(28 + Math.random() * 4));
      setLatency(Math.floor(30 + Math.random() * 10));
    }
  }, [detectionEnabled, confidence, isProcessing]);

  const stats = [
    {
      icon: TrendingUp,
      label: "Detection Accuracy",
      value: `${accuracy.toFixed(1)}%`,
      color: accuracy > 85 ? "text-green-400" : "text-yellow-400",
      bgColor: accuracy > 85 ? "bg-green-500/20" : "bg-yellow-500/20",
      borderColor: accuracy > 85 ? "border-green-500/30" : "border-yellow-500/30",
    },
    {
      icon: Zap,
      label: "Processing Speed",
      value: `${fps} FPS`,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Navigation,
      label: "Lane Deviation",
      value: "0.12m",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: AlertTriangle,
      label: "Network Latency",
      value: `${latency}ms`,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className={`bg-slate-800/50 border-slate-700 ${stat.borderColor} border-l-4`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
