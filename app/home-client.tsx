'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, PlugZap, Power, Activity, Wifi } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useMemo, useState } from "react";

export default function HomeClient() {
  const metrics = useMemo(() => ({
    online: 1284,
    offline: 32,
    alerts: 7,
    energyToday: 312.4,
  }), []);

  const energyData = useMemo(() => Array.from({ length: 24 }, (_, h) => ({
    hour: `${h}:00`,
    kwh: Math.round(80 + Math.sin(h / 2) * 30 + (Math.random() * 10))
  })), []);

  const health = 86;

  const [zoneA, setZoneA] = useState(true);
  const [zoneB, setZoneB] = useState(false);
  const [zoneC, setZoneC] = useState(true);

  const events = useMemo(() => ([
    { id: "EV-9821", device: "Thermostat-22", type: "Temperature Spike", severity: "High", time: "2m ago" },
    { id: "EV-9820", device: "Valve-08", type: "Pressure Stable", severity: "Low", time: "6m ago" },
    { id: "EV-9819", device: "Camera-03", type: "Motion Detected", severity: "Medium", time: "9m ago" },
    { id: "EV-9818", device: "Gateway-01", type: "Network Restored", severity: "Info", time: "21m ago" },
  ]), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">IoT Overview</h1>
        <p className="text-muted-foreground">Real-time status across your fleet with energy, connectivity, and alerts at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Online Devices" value={metrics.online.toLocaleString()} icon={<Wifi className="size-4 text-emerald-500" />} trend="+2.1%" trendUp />
        <StatCard title="Offline" value={metrics.offline} icon={<Power className="size-4 text-rose-500" />} trend="-0.8%" />
        <StatCard title="Active Alerts" value={metrics.alerts} icon={<AlertTriangle className="size-4 text-amber-500" />} trend="+1.2%" trendUp />
        <StatCard title="Energy Today" value={`${metrics.energyToday} kWh`} icon={<PlugZap className="size-4 text-cyan-500" />} trend="+4.4%" trendUp />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Energy Consumption (24h)</CardTitle>
            <Badge variant="secondary" className="rounded">kWh</Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartContainer className="h-64" config={{ kwh: { label: "kWh", color: "hsl(var(--primary))" }}}>
              <AreaChart data={energyData} margin={{ left: 8, right: 8, top: 10 }}>
                <defs>
                  <linearGradient id="fill-kwh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area dataKey="kwh" type="monotone" stroke="hsl(var(--primary))" fill="url(#fill-kwh)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">Fleet diagnostics based on uptime, latency, and error rate.</div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Overall score</span>
              <span className="font-medium">{health}%</span>
            </div>
            <Progress value={health} className="h-2" />
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="rounded-md border p-3">
                <div className="mb-1 flex items-center gap-1.5 text-foreground"><Activity className="size-3" /> Uptime</div>
                <div className="font-medium text-emerald-600 dark:text-emerald-300">99.9%</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="mb-1 flex items-center gap-1.5 text-foreground"><TrendingUp className="size-3" /> Latency</div>
                <div className="font-medium">46ms</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Events</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono">{e.id}</TableCell>
                    <TableCell>{e.device}</TableCell>
                    <TableCell>{e.type}</TableCell>
                    <TableCell>
                      <Severity severity={e.severity} />
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{e.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ControlRow label="Zone A — HVAC" checked={zoneA} onCheckedChange={setZoneA} />
            <ControlRow label="Zone B — Lighting" checked={zoneB} onCheckedChange={setZoneB} />
            <ControlRow label="Zone C — Pumps" checked={zoneC} onCheckedChange={setZoneC} />
            <div className="rounded-md border p-3 text-xs text-muted-foreground">
              Changes simulate device commands. Integrate with your backend when ready.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Device Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 overflow-hidden rounded-md border bg-gradient-to-b from-muted/60 to-background">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_1px_1px,_hsl(var(--border))_1px,_transparent_0)] [background-size:24px_24px]" />
            {dotPositions.map((p, i) => (
              <span key={i} className="absolute block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(34,211,238,0.25)]" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp }: { title: string; value: string | number; icon: React.ReactNode; trend?: string; trendUp?: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div className={"mt-1 flex items-center gap-1 text-xs " + (trendUp ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300") }>
            <TrendingUp className="size-3" />
            <span>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Severity({ severity }: { severity: "High" | "Medium" | "Low" | "Info" | string }) {
  const color = severity === "High" ? "destructive" : severity === "Medium" ? "amber" : severity === "Low" ? "emerald" : "secondary";
  return <Badge className={
    color === "destructive" ? "bg-destructive/15 text-destructive-foreground" :
    color === "amber" ? "bg-amber-500/15 text-amber-600 dark:text-amber-300" :
    color === "emerald" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" :
    "bg-muted text-foreground/70"
  }>{severity}</Badge>;
}

function ControlRow({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium leading-none">{label}</div>
        <div className="text-xs text-muted-foreground">Remote toggle</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

const dotPositions = [
  { x: 18, y: 24 },
  { x: 32, y: 44 },
  { x: 56, y: 38 },
  { x: 71, y: 22 },
  { x: 84, y: 58 },
  { x: 44, y: 72 },
  { x: 26, y: 66 },
];