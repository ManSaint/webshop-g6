"use client";

import { useSyncStores } from "@/lib/use-sync";

export function SyncProvider() {
  useSyncStores();
  return null;
}
