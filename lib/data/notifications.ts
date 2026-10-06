export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  type: "vote" | "market" | "resource" | "community" | "learning";
  createdAt: string;
  read: boolean;
}

const iso = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86400000).toISOString();

export const notifications: AppNotification[] = [
  { id: "n1", title: "Vote closing soon", detail: "Solar pump station vote ends in 4 days", type: "vote", createdAt: iso(0), read: false },
  { id: "n2", title: "Your listing sold", detail: "60 tonnes of maize matched with Bodija Feed Mills", type: "market", createdAt: iso(1), read: false },
  { id: "n3", title: "Resource request approved", detail: "Maize sheller booked for 12–14 October", type: "resource", createdAt: iso(2), read: false },
  { id: "n4", title: "New reply in your thread", detail: "Folasade replied to “Bulk fertiliser purchase”", type: "community", createdAt: iso(3), read: true },
  { id: "n5", title: "Certificate issued", detail: "Soil Health & Fertiliser Planning completed", type: "learning", createdAt: iso(5), read: true },
];
