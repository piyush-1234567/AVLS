import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Layers, Database, Clock } from "lucide-react";
import { Progress } from "./ui/progress";

export function ModelInfo() {
  const modelSpecs = [
    { label: "Architecture", value: "CNN (VGG-16)", icon: Brain },
    { label: "Total Layers", value: "16 Layers", icon: Layers },
    { label: "Parameters", value: "138M", icon: Database },
    { label: "Training Time", value: "48 hours", icon: Clock },
  ];

  const layerInfo = [
    { name: "Conv Layer 1", neurons: 64, activation: 0.87 },
    { name: "Conv Layer 2", neurons: 128, activation: 0.92 },
    { name: "Conv Layer 3", neurons: 256, activation: 0.89 },
    { name: "Conv Layer 4", neurons: 512, activation: 0.94 },
    { name: "Dense Layer", neurons: 4096, activation: 0.91 },
    { name: "Output Layer", neurons: 2, activation: 0.96 },
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <h2 className="font-semibold text-white">CNN Model Information</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Model Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Model Status</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Active
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Version</span>
            <span className="text-sm text-white font-medium">v2.4.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Last Updated</span>
            <span className="text-sm text-white font-medium">Jan 15, 2026</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Model Specifications */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Model Specifications</h3>
          <div className="grid grid-cols-2 gap-3">
            {modelSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="bg-slate-900/50 p-3 rounded-lg border border-slate-700"
                >
                  <Icon className="w-4 h-4 text-blue-400 mb-2" />
                  <p className="text-xs text-slate-400 mb-1">{spec.label}</p>
                  <p className="text-sm font-medium text-white">{spec.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Network Layers */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Network Layers</h3>
          <div className="space-y-3">
            {layerInfo.map((layer, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{layer.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {layer.neurons} neurons
                    </span>
                    <span className="text-xs font-medium text-blue-400">
                      {(layer.activation * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={layer.activation * 100}
                  className="h-1.5 bg-slate-700"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Training Metrics */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Training Metrics</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Training Accuracy</span>
              <span className="text-xs font-medium text-white">96.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Validation Accuracy</span>
              <span className="text-xs font-medium text-white">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Test Accuracy</span>
              <span className="text-xs font-medium text-white">93.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Loss Function</span>
              <span className="text-xs font-medium text-white">
                Binary Cross-Entropy
              </span>
            </div>
          </div>
        </div>

        {/* Dataset Info */}
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <h3 className="text-sm font-medium text-white mb-3">
            Training Dataset
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Total Images</span>
              <span className="text-xs font-medium text-white">250,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Road Conditions</span>
              <span className="text-xs font-medium text-white">
                15 Categories
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Augmentation</span>
              <span className="text-xs font-medium text-white">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
