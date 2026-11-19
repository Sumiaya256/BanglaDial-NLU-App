import type { Metadata } from "next";
import DemoWorkspace from "@/components/demo/DemoWorkspace";

export const metadata: Metadata = { title: "Demo" };

export default function DemoPage() {
  return <DemoWorkspace />;
}
