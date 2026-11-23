import { ImageResponse } from "next/og";
import profile from "@/data/profile.json";

// 1200×630 social preview, generated at build time from the profile data.
export const alt = "Smog: Stuff I Actually Use";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 120px",
          background: "#FAFAF8",
          color: "#1C1B19",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.image}
          alt=""
          width={260}
          height={260}
          style={{
            borderRadius: 9999,
            objectFit: "cover",
            border: "1px solid #ECEAE5",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2 }}>
            {profile.name}
          </div>
          {profile.tagline && (
            <div style={{ marginTop: 16, fontSize: 44, color: "#6E6B66" }}>
              {profile.tagline}
            </div>
          )}
          <div style={{ marginTop: 40, fontSize: 28, color: "#A6705A" }}>
            smogmeister.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
