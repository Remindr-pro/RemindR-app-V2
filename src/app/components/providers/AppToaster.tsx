"use client";

import { Toaster } from "sileo";

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      options={{
        fill: "black",
        styles: {
          title: "text-white!",
          description: "text-white/75!",
        },
      }}
    />
  );
}
