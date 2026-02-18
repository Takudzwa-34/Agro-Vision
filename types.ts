
export interface PlantDiagnosis {
  plantName: string;
  scientificName: string;
  condition: string;
  status: 'Healthy' | 'Infected' | 'Warning';
  confidence: number;
  symptoms: string[];
  cause: string;
  recommendations: {
    organic: string[];
    chemical: string[];
    prevention: string[];
  };
  summary: string;
}

export interface ScanHistory {
  id: string;
  timestamp: number;
  image: string;
  diagnosis: PlantDiagnosis;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SCAN = 'SCAN',
  HISTORY = 'HISTORY',
  RESULT = 'RESULT'
}
