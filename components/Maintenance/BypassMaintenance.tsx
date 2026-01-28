"use client";
import { useEffect, useState } from "react";
import { Maintenance } from "./Maintenance";

export default function BypassMaintenance({ children }: { children: React.ReactNode }) {
  const [bypass, setBypass] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("secret")) {
        setBypass(true);
      }
    }
  }, []);
  return bypass ? <>{children}</> : <Maintenance />;
}