import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Just Another Friend — You do not have to go through this alone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#faf9f7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "#3f6b5c",
              color: "white",
              borderRadius: 16,
              padding: "10px 18px",
              fontSize: 32,
              fontWeight: 700,
              display: "flex",
            }}
          >
            JAF
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#1f2430", display: "flex" }}>
            Just Another Friend
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#1f2430",
            lineHeight: 1.15,
            maxWidth: 900,
            display: "flex",
          }}
        >
          You do not have to go through this alone.
        </div>
        <div style={{ fontSize: 26, color: "#5b6270", marginTop: 28, display: "flex" }}>
          Anonymous peer support for 7-OH and kratom recovery
        </div>
      </div>
    ),
    { ...size }
  );
}
