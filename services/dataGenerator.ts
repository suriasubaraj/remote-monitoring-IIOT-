
import { 
  StationData, 
  StationStatus, 
  KPIMetrics, 
  Alert, 
  QCData, 
  DefectDistribution,
  Process,
  StitchMode,
  Material,
  InventoryItem
} from '../types';

/* Exported processNames so it can be used in other components */
export const processNames: Record<string, string[]> = {
  'Pre-Production': ['Upper Cutting', 'Lining Preparation', 'Toe Puff Attachment', 'Heel Counter Fixing', 'Skiving', 'Pattern Labeling', 'Perforating', 'Embroidery', 'Edge Dyeing', 'Backer Fusing'],
  'Stitching': ['Vamp Stitching', 'Quarter Stitching', 'Backstay Stitching', 'Tongue Attachment', 'Collar Padding', 'Topline Finishing', 'Eyeletting', 'Lockstitching', 'Zigzag Reinforcement', 'Decorative Stitching', 'Binding', 'Welt Stitching'],
  'Lasting': ['Toe Lasting', 'Side Lasting', 'Heel Lasting', 'Insole Tacking', 'Heat Setting', 'Roughing', 'Pound Out', 'Last Removal', 'Upper Conditioning', 'Shank Insertion'],
  'Bottoming': ['Sole Molding', 'Sole Buffing', 'Sole Priming', 'Cementing', 'Sole Pressing', 'Heel Attaching', 'Edge Trimming', 'Edge Scouring', 'Insole Padding', 'Bottom Filling'],
  'Finishing': ['Cleaning', 'Waxing', 'Polishing', 'Burnishing', 'Spray Finishing', 'Logo Stamping', 'Lacing', 'Final Inspection', 'Ironing', 'De-lasting'],
  'Packaging': ['Box Assembly', 'Tissue Wrapping', 'Tagging', 'Bagging', 'Outer Carton Packing', 'Labeling', 'Weight Verification', 'Palletizing', 'Shrink Wrapping', 'Dispatch Sorting']
};

export const generateProcesses = (): Process[] => {
  let allProcesses: Process[] = [];
  Object.entries(processNames).forEach(([category, names]) => {
    names.forEach((name, i) => {
      allProcesses.push({
        id: `p-${category.toLowerCase().replace(' ', '-')}-${i}`,
        name,
        category: category as any,
        status: Math.random() > 0.15 ? StationStatus.RUNNING : (Math.random() > 0.5 ? StationStatus.IDLE : StationStatus.MAINTENANCE),
        throughput: Math.floor(Math.random() * 50) + 80,
        machineId: `MAC-${category.substring(0,2)}-${100 + i}`,
        operatorId: `OP-${Math.floor(Math.random() * 900) + 100}`,
        energyConsumption: 1.5 + Math.random() * 10,
        qualityScore: 95 + Math.random() * 5,
        cycleTime: 15 + Math.random() * 45
      });
    });
  });
  // Pad out to ~65 if needed
  return allProcesses;
};

export const generateStitchModes = (): StitchMode[] => [
  { id: 'sm1', name: 'Lock Stitch', usageFrequency: 65, defectRate: 0.8, description: 'Standard high-strength secure stitch.' },
  { id: 'sm2', name: 'Chain Stitch', usageFrequency: 15, defectRate: 1.2, description: 'Flexible stitch for decorative or lining areas.' },
  { id: 'sm3', name: 'Zigzag Stitch', usageFrequency: 10, defectRate: 1.5, description: 'Used for edge finishing and reinforcement.' },
  { id: 'sm4', name: 'Decorative Stitch', usageFrequency: 5, defectRate: 2.1, description: 'Aesthetic stitching for branding and style.' },
  { id: 'sm5', name: 'Reinforced Stitch', usageFrequency: 5, defectRate: 0.4, description: 'Heavy-duty stitch for stress points like eyelets.' }
];

export const generateMaterials = (): Material[] => [
  { id: 'm1', name: 'Full Grain Leather', stockLevel: 450, maxStock: 1000, unit: 'm²', usagePerProcess: 0.45, wastePercentage: 12 },
  { id: 'm2', name: 'Recycled Rubber', stockLevel: 2200, maxStock: 5000, unit: 'units', usagePerProcess: 1, wastePercentage: 5 },
  { id: 'm3', name: 'Nylon Thread (G40)', stockLevel: 85, maxStock: 500, unit: 'spools', usagePerProcess: 0.1, wastePercentage: 2 },
  { id: 'm4', name: 'Industrial Adhesive', stockLevel: 120, maxStock: 300, unit: 'L', usagePerProcess: 0.05, wastePercentage: 8 },
  { id: 'm5', name: 'Synthetic Mesh', stockLevel: 800, maxStock: 2000, unit: 'm²', usagePerProcess: 0.3, wastePercentage: 15 }
];

/* Added generateInventory function */
export const generateInventory = (): InventoryItem[] => [
  { id: 'inv-1', label: 'Full Grain Leather', value: 450, max: 1000, unit: 'm²' },
  { id: 'inv-2', label: 'Recycled Rubber', value: 2200, max: 5000, unit: 'units' },
  { id: 'inv-3', label: 'Industrial Adhesive', value: 45, max: 300, unit: 'L' },
  { id: 'inv-4', label: 'Synthetic Mesh', value: 800, max: 2000, unit: 'm²' }
];

/* Updated generateKPIs with missing fields */
export const generateKPIs = (): KPIMetrics => ({
  totalPairs: 12450 + Math.floor(Math.random() * 500),
  activeProcesses: 58,
  defectRate: 1.15,
  utilization: 89.4,
  materialConsumption: 450,
  onTimeProduction: 94.2,
  targetAchieved: 82.5,
  activeStations: 4
});

export const generateStationData = (): StationData[] => [
  {
    id: 's1',
    name: 'Cutting Hall A',
    description: 'Precision laser cutting units',
    status: StationStatus.RUNNING,
    throughput: 145,
    accuracy: 99.4,
    energyConsumption: 14.5,
    lastMaintenance: '2023-10-12'
  },
  {
    id: 's2',
    name: 'Stitching Line 4',
    description: 'Integrated sewing systems',
    status: StationStatus.RUNNING,
    throughput: 92,
    accuracy: 98.2,
    energyConsumption: 9.1,
    lastMaintenance: '2023-11-05'
  }
];

export const generateAlerts = (): Alert[] => [
  { id: 'a1', type: 'error', message: 'Machine Failure: Heel Lasting MAC-LA-102', timestamp: '14:22', recommendation: 'Dispatch maintenance to Bay 4 immediately' },
  { id: 'a2', type: 'warning', message: 'Low Stock: Industrial Adhesive', timestamp: '13:45', recommendation: 'Approve procurement order PO-9941' },
  { id: 'a3', type: 'info', message: 'Shift Handover Approaching', timestamp: '15:30', recommendation: 'Prepare performance reports for Shift B supervisor' }
];

export const generateQCData = (): QCData[] => {
  const data: QCData[] = [];
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  hours.forEach(h => data.push({ time: h, defects: Math.floor(Math.random() * 5) + 2 }));
  return data;
};

export const generateDefectDist = (): DefectDistribution[] => [
  { name: 'Stitching', value: 45 },
  { name: 'Bonding', value: 25 },
  { name: 'Symmetry', value: 20 },
  { name: 'Material', value: 10 }
];
