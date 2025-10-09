import AppLayout from "@/components/layout/AppLayout";

export default function DevicesPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">Manage your IoT devices. This is a placeholder page — ask to flesh it out when ready.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Device #{i}</div>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-600 dark:text-emerald-300">Online</span>
              </div>
              <div className="text-sm text-muted-foreground">Model: PX-10{i} • Firmware v1.2.{i}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}