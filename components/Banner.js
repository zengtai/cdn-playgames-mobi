import * as React from "react";
import { ADS_ID, MODE } from "../lib/constants";
import { Script } from "next/script";

export default function Banner({
  className,
  style,
  layout,
  format,
  client = ADS_ID,
  slot,
  responsive,
  layoutKey,
}) {
  // React.useEffect(() => {
  //   try {
  //     (window.adsbygoogle || []).push({});
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // }, []);

  return (
    <div className={className ? `banner ${className}` : `banner`}>
      <div className="text-center text-xs uppercase text-cyan-600">
        <span className="inline-block scale-90">Advertisement</span>
      </div>
      <ins
        className="adsbygoogle grid place-content-center bg-black/5"
        style={style}
        data-ad-layout={layout}
        data-ad-format={format ? format : `auto`}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
        {...(`${process.env.NODE_ENV}` === `development` || MODE === `dev`
          ? { "data-adtest": "on" }
          : null)}
      ></ins>
      <Script
        id={Math.random()}
        dangerouslySetInnerHTML={{
          __html: `
            try {
              let adsbygoogle = window.adsbygoogle || [];
              adsbygoogle.push({});
              console.log("ad pushed");
            } catch (e) {
              console.error(e.message);
            }
          `,
        }}
      />
    </div>
  );
}
