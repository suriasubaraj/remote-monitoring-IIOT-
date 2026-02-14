
export enum StationStatus {
  RUNNING = 'Running',
  IDLE = 'Idle',
  MAINTENANCE = 'Maintenance'
}

export interface Process {
  id: string;
  name: string;
  category: 'Pre-Production' | 'Stitching' | 'Lasting' | 'Bottoming' | 'Finishing' | 'Packaging';
  status: StationStatus;
  throughput: number;
  machineId: string;
  operatorId: string;
  energyConsumption: number;
  qualityScore: number;
  cycleTime: number; // in seconds
}

export interface StitchMode {
  id: string;
  name: string;
  usageFrequency: number;
  defectRate: number;
  description: string;
}

export interface Material {
  id: string;
  name: string;
  stockLevel: number;
  maxStock: number;
  unit: string;
  usagePerProcess: number;
  wastePercentage: number;
}

/* Added InventoryItem interface */
export interface InventoryItem {
  id: string;
  label: string;
  value: number;
  max: number;
  unit: string;
}

export interface StationData {
  id: string;
  name: string;
  description: string;
  status: StationStatus;
  throughput: number;
  accuracy: number;
  energyConsumption: number;
  lastMaintenance: string;
}

export interface KPIMetrics {
  totalPairs: number;
  activeProcesses: number;
  defectRate: number;
  utilization: number;
  materialConsumption: number; // units/hour
  onTimeProduction: number; // percentage
  /* Added missing properties */
  targetAchieved: number;
  activeStations: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  recommendation: string;
}

export interface QCData {
  time: string;
  defects: number;
}

export interface DefectDistribution {
  name: string;
  value: number;
}

export type Page = 'Dashboard' | 'Components & Processes' | 'Stitching Modes' | 'Materials Tracking' | 'Station Monitoring' | 'Quality Control' | 'Production Analytics' | 'Reports' | 'Settings';
