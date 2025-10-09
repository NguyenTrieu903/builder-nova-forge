// Application constants

export const APP_CONFIG = {
  name: 'Pulse IoT Dashboard',
  description: 'IoT device management dashboard',
  version: '1.0.0',
} as const;

export const DEVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline', 
  MAINTENANCE: 'maintenance',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const ROUTES = {
  HOME: '/',
  DEVICES: '/devices',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  DEVICES: '/api/devices',
  USERS: '/api/users',
  ANALYTICS: '/api/analytics',
} as const;

export const CHART_COLORS = {
  PRIMARY: 'hsl(var(--primary))',
  SECONDARY: 'hsl(var(--secondary))',
  SUCCESS: 'hsl(var(--success))',
  WARNING: 'hsl(var(--warning))',
  ERROR: 'hsl(var(--destructive))',
} as const;