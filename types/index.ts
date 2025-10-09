// Global type definitions for the application

export interface Device {
  id: string;
  name: string;
  model: string;
  firmware: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  alertsCount: number;
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EnergyData extends ChartDataPoint {
  consumption: number;
  production?: number;
}

export interface TemperatureData extends ChartDataPoint {
  temperature: number;
  humidity?: number;
}