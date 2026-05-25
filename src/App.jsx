import { useState, useEffect } from "react";

// Palette tuned to Amanda's mood board: blush peony, sage green, cognac,
// champagne ivory. Keep it upscale, not costumey.
const COLORS = {
  blush: "#C68F92",          // deeper peony, primary "bloom"
  blushSoft: "#D9A8AB",
  blushLight: "#E8CACC",
  blushPale: "#F8ECEC",
  sage: "#9CAB87",           // botanical accent (eucalyptus / peony stems)
  sageDark: "#5F6E50",
  sageLight: "#C5D1B4",
  sagePale: "#EDF1E6",
  cognac: "#8B5E3C",         // saddle leather
  cognacDark: "#5C3D24",
  sand: "#C4A882",
  sandLight: "#E0D4BD",
  champagne: "#F0E6D2",      // warmer champagne
  champagnePale: "#FAF3E2",
  ivory: "#FBF6EC",          // bridal base
  cream: "#F8F3EB",
  gold: "#B89968",
  goldLight: "#D4BD8A",
  text: "#2D2520",
  textLight: "#5C4F45",
  textMuted: "#A89A8E",
  white: "#FFFFFF",
  hairline: "#E6DCC8",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Avenir', sans-serif",
  accent: "'Cormorant Garamond', Georgia, serif",
  script: "'Allura', cursive",
};

// Each day gets its own subtle accent. The accent color is exposed as a
// CSS variable so child components (TimeBlock, PageHeader) pick it up
// without prop drilling.
const THEMES = {
  thu: { hl: COLORS.champagnePale, edge: COLORS.sandLight,  kicker: COLORS.cognac    },
  fri: { hl: COLORS.blushPale,     edge: COLORS.blushLight, kicker: COLORS.blush     },
  sat: { hl: COLORS.sagePale,      edge: COLORS.sageLight,  kicker: COLORS.sageDark  },
  sun: { hl: COLORS.champagnePale, edge: COLORS.sandLight,  kicker: COLORS.cognac    },
  det: { hl: COLORS.blushPale,     edge: COLORS.blushLight, kicker: COLORS.cognac    },
};

const themeVars = (t) => ({
  "--hl-bg":     t.hl,
  "--hl-edge":   t.edge,
  "--hl-kicker": t.kicker,
});

// ============== ATOMS ==============

const Hairline = ({ color = COLORS.hairline, margin = "20px auto", width = 40 }) => (
  <div style={{
    height: 1,
    width,
    background: color,
    margin,
  }} />
);

const Kicker = ({ children, color, size = 10, mb = 8, useTheme = false }) => (
  <p style={{
    fontFamily: FONTS.body,
    fontSize: size,
    fontWeight: 600,
    color: color || (useTheme ? "var(--hl-kicker, " + COLORS.cognac + ")" : COLORS.cognac),
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    margin: `0 0 ${mb}px`,
  }}>
    {children}
  </p>
);

// ============== MAPS ==============

// Each venue has a Google Maps search query that resolves cleanly to the right pin.
const VENUES = {
  airbnb:    { name: "Mint House Nashville",      q: "Mint House Nashville Marathon Village, 808 14th Ave N, Nashville, TN 37203" },
  hawkers:   { name: "Hawkers Asian Street Food", q: "Hawkers Asian Street Food, Nashville TN" },
  attaboy:   { name: "Attaboy",                   q: "Attaboy, Nashville TN" },
  lakeside:  { name: "Lakeside Lounge",           q: "Lakeside Lounge, East Nashville TN" },
  hubba:     { name: "Hubba Hubba",               q: "Hubba Hubba, Nashville TN" },
  bacco:     { name: "Bacco",                     q: "Bacco, Nashville TN" },
  cat10:     { name: "Category 10",               q: "Category 10, Broadway, Nashville TN" },
  pedal:     { name: "Pedal Tavern",              q: "Pedal Tavern, Nashville TN" },
  hampton:   { name: "The Hampton Social",        q: "The Hampton Social, Nashville TN" },
  tootsies:  { name: "Tootsies Orchid Lounge",    q: "Tootsies Orchid Lounge, Broadway, Nashville TN" },
  roberts:   { name: "Robert's Western World",    q: "Robert's Western World, Broadway, Nashville TN" },
  fallCreek: { name: "Fall Creek Falls",          q: "Fall Creek Falls State Park, Tennessee" },
  kyuramen:  { name: "Kyuramen",                  q: "Kyuramen, Nashville TN" },
  bna:       { name: "BNA Airport",               q: "Nashville International Airport BNA" },
  memphis:   { name: "Memphis, TN",                q: "Memphis Tennessee" },
};

const mapsSearchUrl = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Multi-stop directions URL. Opens Google Maps native app on mobile.
const mapsDirUrl = (stops) =>
  `https://www.google.com/maps/dir/${stops.map((s) => encodeURIComponent(s)).join("/")}`;

// Embedded map iframe (no API key needed, uses the legacy embed endpoint).
const mapsEmbedUrl = (q) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=13&output=embed`;

const MapLink = ({ venueKey, children, color }) => {
  const v = VENUES[venueKey];
  if (!v) return <>{children || venueKey}</>;
  return (
    <a
      href={mapsSearchUrl(v.q)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: color || "inherit",
        textDecoration: "none",
        borderBottom: `1px solid ${COLORS.sandLight}`,
        paddingBottom: 1,
      }}
    >
      {children || v.name}
    </a>
  );
};

const DayMap = ({ kicker = "Map", title, centerQuery, stops = [] }) => {
  // stops is an array of venueKeys for multi-stop directions
  const dirStops = stops.map((k) => VENUES[k]?.q).filter(Boolean);
  const hasDirections = dirStops.length >= 2;
  return (
    <div style={{ padding: "24px 16px 0" }}>
      {kicker && <Kicker mb={6}>{kicker}</Kicker>}
      <h3 style={{
        fontFamily: FONTS.display,
        fontSize: 22,
        fontWeight: 400,
        color: COLORS.text,
        margin: "0 0 14px",
        fontStyle: "italic",
        letterSpacing: "-0.4px",
      }}>
        {title}
      </h3>
      <div style={{
        border: `1px solid ${COLORS.hairline}`,
        overflow: "hidden",
        marginBottom: 12,
      }}>
        <iframe
          src={mapsEmbedUrl(centerQuery)}
          width="100%"
          height="240"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${title}`}
        />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {hasDirections && (
          <a
            href={mapsDirUrl(dirStops)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 18px",
              background: COLORS.cognacDark,
              color: COLORS.white,
              fontFamily: FONTS.body,
              fontSize: 10,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
            }}
          >
            Day Route in Maps
          </a>
        )}
        <a
          href={mapsSearchUrl(centerQuery)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 18px",
            background: "transparent",
            color: COLORS.cognacDark,
            border: `1px solid ${COLORS.cognacDark}`,
            fontFamily: FONTS.body,
            fontSize: 10,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
          }}
        >
          Open Area in Maps
        </a>
      </div>
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 13,
        color: COLORS.textMuted,
        margin: "10px 0 0",
        fontStyle: "italic",
        letterSpacing: "0.3px",
      }}>
        Tap any venue above to open it in your Maps app.
      </p>
    </div>
  );
};

// ============== NAV ==============

const stroke = { stroke: "currentColor", strokeWidth: 1.4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };

const NavIcons = {
  home: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  cal: (s = 18, dot = "mid") => {
    const positions = { early: { x: 8, y: 14 }, mid: { x: 12, y: 14 }, late: { x: 16, y: 14 }, last: { x: 8, y: 18 } };
    const p = positions[dot];
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
        <circle cx={p.x} cy={p.y} r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  },
  info: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { id: "home",     label: "Home", icon: () => NavIcons.home(18) },
  { id: "thursday", label: "Thu",  icon: () => NavIcons.cal(18, "early") },
  { id: "friday",   label: "Fri",  icon: () => NavIcons.cal(18, "mid") },
  { id: "saturday", label: "Sat",  icon: () => NavIcons.cal(18, "late") },
  { id: "sunday",   label: "Sun",  icon: () => NavIcons.cal(18, "last") },
  { id: "details",  label: "Info", icon: () => NavIcons.info(18) },
];

const BottomNav = ({ active, onNavigate }) => (
  <nav style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: COLORS.ivory,
    borderTop: `1px solid ${COLORS.hairline}`,
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0 env(safe-area-inset-bottom, 12px)",
    zIndex: 100,
    maxWidth: 480,
    margin: "0 auto",
    // Defensive: stronger shadow + own stacking context so older iOS
    // Safari can't push it under browser chrome on tall scroll pages.
    boxShadow: "0 -4px 14px rgba(45,37,32,0.08)",
    transform: "translateZ(0)",
    willChange: "transform",
    WebkitBackdropFilter: "blur(8px)",
    backdropFilter: "blur(8px)",
  }}>
    {NAV_ITEMS.map((item) => {
      const isActive = active === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          type="button"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            WebkitAppearance: "none",
            touchAction: "manipulation",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: "4px 10px",
            transition: "color 0.2s",
            color: isActive ? COLORS.cognacDark : COLORS.textMuted,
          }}
        >
          <span style={{ display: "block", lineHeight: 0 }}>{item.icon()}</span>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: 9,
            fontWeight: isActive ? 700 : 500,
            color: "inherit",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}>
            {item.label}
          </span>
        </button>
      );
    })}
  </nav>
);

// ============== SHARED ==============

const PageHeader = ({ title, subtitle, kicker }) => (
  <div style={{
    textAlign: "center",
    padding: "56px 24px 40px",
    background: "linear-gradient(180deg, var(--hl-bg, " + COLORS.champagnePale + ") 0%, " + COLORS.ivory + " 100%)",
    position: "relative",
  }}>
    {kicker && <Kicker mb={14} useTheme>{kicker}</Kicker>}
    <h2 style={{
      fontFamily: FONTS.display,
      fontSize: 46,
      color: COLORS.text,
      margin: 0,
      fontWeight: 400,
      fontStyle: "italic",
      letterSpacing: "-1.4px",
      lineHeight: 1.05,
    }}>
      {title}
    </h2>
    {subtitle && (
      <>
        <Hairline color={"var(--hl-edge, " + COLORS.sandLight + ")"} margin="24px auto 18px" width={40} />
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 17,
          color: COLORS.textLight,
          margin: 0,
          fontStyle: "italic",
          letterSpacing: "0.6px",
        }}>
          {subtitle}
        </p>
      </>
    )}
  </div>
);

const TimeBlock = ({ time, title, description, highlight, link, linkText, venue }) => (
  <div style={{
    display: "flex",
    gap: 18,
    padding: "20px 24px",
    borderBottom: `1px solid ${COLORS.hairline}`,
    background: highlight ? "var(--hl-bg, " + COLORS.blushPale + ")" : "transparent",
    borderLeft: highlight ? `3px solid var(--hl-edge, ${COLORS.blushLight})` : "3px solid transparent",
  }}>
    <div style={{ minWidth: 66, textAlign: "right", paddingTop: 5 }}>
      <span style={{
        fontFamily: FONTS.body,
        fontSize: 10,
        fontWeight: 700,
        color: highlight ? "var(--hl-kicker, " + COLORS.cognac + ")" : COLORS.cognac,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}>
        {time}
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{
        fontFamily: FONTS.display,
        fontSize: 18,
        fontWeight: 500,
        color: COLORS.text,
        margin: 0,
        fontStyle: "italic",
        letterSpacing: "-0.2px",
      }}>
        {venue ? <MapLink venueKey={venue} color={COLORS.text}>{title}</MapLink> : title}
      </h4>
      {description && (
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "6px 0 0",
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            color: COLORS.cognac,
            textDecoration: "none",
            display: "inline-block",
            marginTop: 8,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            borderBottom: `1px solid ${COLORS.cognac}`,
            paddingBottom: 1,
          }}
        >
          {linkText || "View"}
        </a>
      )}
    </div>
  </div>
);

const InfoCard = ({ title, children, kicker }) => (
  <div style={{
    padding: "28px 24px",
    margin: "0 16px 16px",
    background: COLORS.white,
    borderTop: `1px solid ${COLORS.hairline}`,
    borderBottom: `1px solid ${COLORS.hairline}`,
  }}>
    {kicker && <Kicker mb={6}>{kicker}</Kicker>}
    <h3 style={{
      fontFamily: FONTS.display,
      fontSize: 22,
      fontWeight: 400,
      color: COLORS.text,
      margin: "0 0 18px",
      fontStyle: "italic",
      letterSpacing: "-0.4px",
    }}>
      {title}
    </h3>
    {children}
  </div>
);

const GuestRow = ({ name, info }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "14px 0",
    borderBottom: `1px solid ${COLORS.hairline}`,
    gap: 16,
  }}>
    <p style={{
      fontFamily: FONTS.display,
      fontSize: 16,
      fontWeight: 400,
      color: COLORS.text,
      margin: 0,
      fontStyle: "italic",
    }}>
      {name}
    </p>
    <p style={{
      fontFamily: FONTS.body,
      fontSize: 10,
      color: COLORS.textMuted,
      margin: 0,
      fontWeight: 600,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      textAlign: "right",
      flexShrink: 0,
    }}>
      {info}
    </p>
  </div>
);

const DresscodeTag = ({ label, color }) => (
  <span style={{
    display: "inline-block",
    padding: "6px 14px",
    fontFamily: FONTS.body,
    fontSize: 10,
    fontWeight: 700,
    color: color,
    marginRight: 6,
    marginBottom: 6,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    borderBottom: `1px solid ${color}`,
  }}>
    {label}
  </span>
);

const VenueCard = ({ name, desc, highlight, venue }) => (
  <div style={{
    padding: "16px 0",
    borderBottom: `1px solid ${COLORS.hairline}`,
  }}>
    <p style={{
      fontFamily: FONTS.display,
      fontSize: 17,
      fontWeight: 400,
      color: highlight ? COLORS.cognacDark : COLORS.text,
      margin: 0,
      fontStyle: "italic",
    }}>
      {venue ? <MapLink venueKey={venue} color={highlight ? COLORS.cognacDark : COLORS.text}>{name}</MapLink> : name}
    </p>
    {desc && (
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.textLight,
        margin: "4px 0 0",
        lineHeight: 1.5,
      }}>
        {desc}
      </p>
    )}
  </div>
);

// ============== PAGES ==============

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const fadeIn = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(16px)",
    transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.ivory,
      position: "relative",
    }}>
      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "80px 28px 60px",
        ...fadeIn(0),
      }}>
        <Kicker mb={24} size={11}>Amanda's Nashville Bachelorette</Kicker>

        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 56,
          fontWeight: 400,
          color: COLORS.text,
          margin: "0 0 4px",
          lineHeight: 1,
          fontStyle: "italic",
          letterSpacing: "-2px",
        }}>
          Saddlin' Up
        </h1>
        <p style={{
          fontFamily: FONTS.script,
          fontSize: 64,
          color: COLORS.blush,
          margin: "-6px 0 -14px",
          lineHeight: 1,
          fontWeight: 400,
        }}>
          &
        </p>
        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 56,
          fontWeight: 400,
          color: COLORS.text,
          margin: "4px 0 0",
          lineHeight: 1,
          fontStyle: "italic",
          letterSpacing: "-2px",
        }}>
          Settlin' Down
        </h1>

        <Hairline color={COLORS.sandLight} margin="36px auto 28px" width={50} />

        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 20,
          fontWeight: 400,
          fontStyle: "italic",
          color: COLORS.text,
          margin: "0 0 10px",
          letterSpacing: "0.5px",
        }}>
          May 28 – 31, 2026
        </p>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 10,
          color: COLORS.textMuted,
          margin: 0,
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          Nashville, Tennessee
        </p>
      </div>

      {/* Framed engagement photo. Hides gracefully if hero.jpg is missing. */}
      <div style={{ padding: "8px 28px 32px", textAlign: "center", ...fadeIn(0.1) }}>
        <figure
          style={{
            display: "inline-block",
            margin: 0,
            padding: "14px 14px 18px",
            background: COLORS.white,
            border: `1px solid ${COLORS.hairline}`,
            boxShadow:
              "0 18px 40px rgba(45,37,32,0.10), 0 4px 10px rgba(45,37,32,0.06)",
            maxWidth: 320,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Hairline gold inner frame line, tiny editorial detail */}
          <div
            style={{
              position: "absolute",
              inset: 8,
              border: `1px solid ${COLORS.goldLight}`,
              pointerEvents: "none",
              opacity: 0.45,
            }}
          />
          <img
            src={`${import.meta.env.BASE_URL}hero.jpg`}
            alt="Amanda and her fiancé"
            loading="eager"
            onError={(e) => {
              // If hero.jpg isn't in /public yet, hide the whole frame
              // so the layout still looks intentional.
              const figure = e.currentTarget.closest("figure");
              if (figure) figure.style.display = "none";
            }}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              position: "relative",
              zIndex: 1,
            }}
          />
          <figcaption
            style={{
              fontFamily: FONTS.script,
              fontSize: 26,
              color: COLORS.cognac,
              margin: "12px 0 0",
              lineHeight: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            the happy couple
          </figcaption>
        </figure>
      </div>

      {/* Roundup */}
      <div style={{ padding: "20px 28px 40px", ...fadeIn(0.15) }}>
        <div style={{ textAlign: "center" }}>
          <Kicker mb={6}>The Roundup</Kicker>
          <h3 style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.text,
            margin: 0,
            fontStyle: "italic",
            letterSpacing: "-0.5px",
          }}>
            Four Days, One Bride
          </h3>
          <Hairline color={COLORS.sandLight} margin="22px auto 8px" width={36} />
        </div>

        {[
          { day: "Thursday", date: "May 28", desc: "Arrivals & East Nashville night out" },
          { day: "Friday",   date: "May 29", desc: "Downtown brunch, Pedal Tavern & Broadway" },
          { day: "Saturday", date: "May 30", desc: "Chill, waterfall hike & pool party" },
          { day: "Sunday",   date: "May 31", desc: "Fly home" },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "18px 0",
            borderBottom: i < 3 ? `1px solid ${COLORS.hairline}` : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{
                fontFamily: FONTS.display,
                fontSize: 19,
                fontWeight: 400,
                color: COLORS.text,
                fontStyle: "italic",
                letterSpacing: "-0.3px",
              }}>
                {item.day}
              </span>
              <span style={{
                fontFamily: FONTS.body,
                fontSize: 9,
                color: COLORS.cognac,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}>
                {item.date}
              </span>
            </div>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Posse */}
      <div style={{ padding: "20px 28px 100px", ...fadeIn(0.3) }}>
        <div style={{ textAlign: "center" }}>
          <Kicker mb={6}>The Posse</Kicker>
          <h3 style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.text,
            margin: 0,
            fontStyle: "italic",
            letterSpacing: "-0.5px",
          }}>
            Seven Riders
          </h3>
          <Hairline color={COLORS.sandLight} margin="22px auto 24px" width={36} />
        </div>

        {[
          { name: "Amanda",  role: "The Bride" },
          { name: "Jess",    role: "Maid of Honor" },
          { name: "Ella",    role: "" },
          { name: "Vanessa", role: "" },
          { name: "Burlyn",  role: "" },
          { name: "Jandee",  role: "" },
          { name: "Niraj",   role: "" },
        ].map((g, i, arr) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "14px 0",
            borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.hairline}` : "none",
          }}>
            <p style={{
              fontFamily: FONTS.display,
              fontSize: 19,
              fontWeight: 400,
              color: COLORS.text,
              margin: 0,
              fontStyle: "italic",
              letterSpacing: "-0.3px",
            }}>
              {g.name}
            </p>
            {g.role && (
              <p style={{
                fontFamily: FONTS.body,
                fontSize: 9,
                color: COLORS.cognac,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}>
                {g.role}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ThursdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100, ...themeVars(THEMES.thu) }}>
    <PageHeader kicker="Day One" title="Thursday" subtitle="May 28 · Arrival Day" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="3:37 PM" title="Jess & Vanessa Land"  description="First arrivals at BNA. Jess grabs the Alamo rental car." venue="bna" />
      <TimeBlock time="4:00 PM" title="Check Into Mint House" description="Jess's unit at Mint House Nashville, 808 14th Ave N. Drop bags, settle in, freshen up." highlight venue="airbnb" />
      <TimeBlock time="4:43 PM" title="Amanda & Ella Land"   description="The bride has arrived." venue="bna" />
      <TimeBlock time="Pre-dinner" title="Walmart / Instacart Run" description="Stock the Airbnb with snacks, breakfast, drinks. Order ahead via Instacart or stop at Walmart on the way in." />
      <TimeBlock time="Evening" title="East Nashville Night" description="Dinner, cocktails, dive bars." />
    </div>

    <InfoCard kicker="Dinner" title={<MapLink venueKey="hawkers" color={COLORS.text}>Hawkers Asian Street Food</MapLink>}>
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: 0,
        lineHeight: 1.6,
      }}>
        Shareable small plates, craft cocktails, and a vibrant atmosphere. Perfect for the group's first night.
      </p>
    </InfoCard>

    <InfoCard kicker="Cocktails" title={<MapLink venueKey="attaboy" color={COLORS.text}>Attaboy</MapLink>}>
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: 0,
        lineHeight: 1.6,
      }}>
        Speakeasy-style cocktails. No menu, just tell them what you like.
      </p>
    </InfoCard>

    <InfoCard kicker="Late Night" title="Bars After">
      <VenueCard venue="lakeside" name="Lakeside Lounge" desc="Chill vibes, lake views" />
      <VenueCard venue="hubba"    name="Hubba Hubba"     desc="Funky dive bar energy" />
    </InfoCard>

    <DayMap
      kicker="The Map"
      title="East Nashville Crawl"
      centerQuery="East Nashville, Nashville TN"
      stops={["hawkers", "attaboy", "lakeside", "hubba"]}
    />
  </div>
);

const FridayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100, ...themeVars(THEMES.fri) }}>
    <PageHeader kicker="Day Two" title="Friday" subtitle="May 29 · The Big Day Out" />

    <InfoCard kicker="What To Wear" title="Dress Code">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: "0 0 14px",
        lineHeight: 1.6,
      }}>
        Friday is the group dress-up day. <strong>Denim</strong> with <strong>blush pink and gold accents</strong>, Amanda in white. Pink mustaches all around. We've got the <strong>Pedal Tavern</strong> in the afternoon, so wear shorts.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <DresscodeTag label="Amanda · White" color={COLORS.textLight} />
        <DresscodeTag label="Crew · Gold & Pink" color={COLORS.gold} />
        <DresscodeTag label="Denim" color="#5B7DB1" />
        <DresscodeTag label="Pink Mustaches" color={COLORS.blush} />
      </div>
    </InfoCard>

    <div style={{ padding: "8px 0 24px" }}>
      <TimeBlock time="6:00 AM"  title="Burlyn Lands"               description="Early bird arrival." />
      <TimeBlock time="AM"       title="Jandee & Niraj Drive In"    description="Hitting Nashville Friday morning." />
      <TimeBlock time="Early"    title="Surprise Decor Setup"       description="Jess, Jandee & Niraj decorate the Airbnb while Amanda is still asleep." highlight />
      <TimeBlock time="10:00 AM" title="Brunch at Bacco"            description="Reservation for the group. Hand out BINGO cards to the ladies." venue="bacco" />
      <TimeBlock time="11:30 AM" title="Line Dance Lessons"         description="Category 10. Free class, runs ~11:30 to 1:30. Warm up for tonight." venue="cat10" />
      <TimeBlock time="1:50 PM"  title="Arrive at Pedal Tavern"     description="$72 pp (gratuity included). Tour departs 2:20 PM, be there by 1:50." highlight venue="pedal" />
      <TimeBlock time="4:15 PM"  title="Early Dinner"               description="The Hampton Social Rooftop. Reservation at 4:15." venue="hampton" />
      <TimeBlock time="4:00 PM+" title="Jandee & Niraj Check Into Mint House" description="Their unit's check-in opens at 4. Same building as Jess's group, 808 14th Ave N." venue="airbnb" />
      <TimeBlock time="Evening"  title="Drop Car & Freshen Up"      description="Back to Mint House, change clothes, regroup for Broadway." />
      <TimeBlock time="Night"    title="Broadway Night Out"         description="The main event. Honky-tonks all the way down Lower Broadway." />
    </div>

    <InfoCard kicker="The Main Event" title="Broadway Lineup">
      <VenueCard venue="tootsies" name="Tootsies Orchid Lounge"   desc="Classic honky-tonk, cold drinks" />
      <VenueCard venue="cat10"    name="Category 10"              desc="Line dancing, round two" />
      <VenueCard venue="roberts"  name="Robert's Western World"   desc="Recession Special late-night snack" highlight />
    </InfoCard>

    <DayMap
      kicker="The Map"
      title="Downtown & Broadway"
      centerQuery="Lower Broadway, Nashville TN"
      stops={["bacco", "cat10", "pedal", "hampton", "tootsies", "roberts"]}
    />
  </div>
);

const SaturdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100, ...themeVars(THEMES.sat) }}>
    <PageHeader kicker="Day Three" title="Saturday" subtitle="May 30 · Chill & Adventure" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="Morning"   title="Sleep In"                  description="Recovery mode. Take it easy." />
      <TimeBlock time="Late AM"   title="Breakfast at the Airbnb"   description="Jess is on breakfast duty. Refuel before the hike." highlight />
      <TimeBlock
        time="Afternoon"
        title="Hike & Waterfall Swim"
        description="Fall Creek Falls State Park. Bring swimsuits, towels, water, sunscreen, and hiking shoes."
        highlight
        venue="fallCreek"
        link="https://tnstateparks.com/parks/fall-creek-falls"
        linkText="Park info"
      />
      <TimeBlock time="Late PM"   title="Late Lunch"                description="Kyuramen. Takeout option available if we're worn out." venue="kyuramen" />
      <TimeBlock time="Evening"   title="Steak Dinner at the Airbnb" description="Grill steaks & veggies. Home-cooked group dinner." />
      <TimeBlock time="Night"     title="Pool Party & Game Night"   description="Close out the night poolside. Bring games." highlight />
    </div>

    <InfoCard kicker="Don't Forget" title="Packing Reminder">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: "0 0 12px",
        lineHeight: 1.6,
      }}>
        Bring your own:
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
        {["Hiking shoes", "Swimsuit", "Water bottle"].map((item, i) => (
          <DresscodeTag key={i} label={item} color={COLORS.sageDark} />
        ))}
      </div>
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 14,
        color: COLORS.cognacDark,
        margin: 0,
        fontStyle: "italic",
        letterSpacing: "0.3px",
      }}>
        Jandee is bringing towels, bug spray, and sunscreen for the group.
      </p>
    </InfoCard>

    <DayMap
      kicker="The Map"
      title="Out to the Falls"
      centerQuery="Fall Creek Falls State Park, Tennessee"
      stops={["fallCreek", "kyuramen"]}
    />
  </div>
);

const SundayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100, ...themeVars(THEMES.sun) }}>
    <PageHeader kicker="Day Four" title="Sunday" subtitle="May 31 · Adios, Nashville" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="7:00 AM"  title="Burlyn Departs"            description="Early flight out of BNA." venue="bna" />
      <TimeBlock time="11:00 AM" title="Check Out of Mint House" description="Both units out by 11. Pack up, tidy up." highlight venue="airbnb" />
      <TimeBlock time="After Checkout" title="Road Trip to Memphis" description="Amanda, Jess, and Ella are driving back to Memphis with Niraj and Jandee. One car, the whole crew, ~3 hours west on I-40." highlight />
      <TimeBlock time="5:43 PM"  title="Vanessa Departs"           description="Last flight out of BNA." venue="bna" />
    </div>

    <InfoCard kicker="Heading Home" title="Departures">
      <GuestRow name="Burlyn"  info="Sun · 7:00 AM · Flight" />
      <GuestRow name="Amanda, Jess, Ella, Niraj, Jandee" info="Driving to Memphis" />
      <GuestRow name="Vanessa" info="Sun · 5:43 PM · Flight" />
    </InfoCard>

    <DayMap
      kicker="The Map"
      title="Heading Home"
      centerQuery="Nashville Tennessee to Memphis Tennessee"
      stops={["bna", "memphis"]}
    />

    <div style={{ textAlign: "center", padding: "60px 28px 20px" }}>
      <Hairline color={COLORS.sandLight} margin="0 auto 24px" width={50} />
      <p style={{
        fontFamily: FONTS.display,
        fontSize: 28,
        fontWeight: 400,
        fontStyle: "italic",
        color: COLORS.text,
        margin: "0 0 10px",
        letterSpacing: "-0.8px",
        lineHeight: 1.2,
      }}>
        She's all saddled up.
      </p>
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 18,
        color: COLORS.textLight,
        margin: 0,
        fontStyle: "italic",
        letterSpacing: "0.4px",
      }}>
        Now let's get her settled down.
      </p>
    </div>
  </div>
);

const DetailsPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100, ...themeVars(THEMES.det) }}>
    <PageHeader kicker="The Logistics" title="Details" subtitle="Need-to-Know Info" />

    <div style={{ padding: "8px 0" }}>
      <InfoCard kicker="The Stay" title="Mint House Nashville">
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 16,
          color: COLORS.text,
          margin: "0 0 4px",
          fontStyle: "italic",
          letterSpacing: "0.3px",
        }}>
          Marathon Village
        </p>
        <a
          href={mapsSearchUrl("Mint House Nashville Marathon Village, 808 14th Ave N, Nashville, TN 37203")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.cognacDark,
            fontWeight: 600,
            letterSpacing: "0.3px",
            textDecoration: "none",
            borderBottom: `1px solid ${COLORS.sandLight}`,
            paddingBottom: 1,
          }}
        >
          808 14th Ave N, Nashville, TN 37203 →
        </a>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 12,
          color: COLORS.textMuted,
          margin: "10px 0 18px",
          fontStyle: "italic",
          letterSpacing: "0.2px",
        }}>
          Two units in the same building. The women in Jess's, the boys in Jandee's.
        </p>

        {/* Unit 1, Jess's Airbnb */}
        <div style={{
          padding: "16px 18px",
          marginBottom: 12,
          background: COLORS.blushPale,
          borderLeft: `3px solid ${COLORS.blushLight}`,
        }}>
          <Kicker mb={4} size={9} color={COLORS.blush}>Unit 1 · Jess's Booking</Kicker>
          <h4 style={{
            fontFamily: FONTS.display,
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.text,
            margin: "0 0 8px",
            fontStyle: "italic",
          }}>
            The Women's Unit
          </h4>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textLight,
            margin: "0 0 4px",
            lineHeight: 1.6,
          }}>
            <strong>Sleeps 5</strong> · Amanda, Jess, Ella, Vanessa, Burlyn
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textLight,
            margin: "0 0 4px",
          }}>
            <strong>$952</strong> total · $159 per person
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textLight,
            margin: "0 0 12px",
          }}>
            Thu May 28 · 4:00 PM → Sun May 31 · 11:00 AM
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <a
              href="https://www.airbnb.com/rooms/1326215239593896193?viralityEntryPoint=1&s=76"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 14px",
                background: COLORS.cognacDark,
                color: COLORS.white,
                fontFamily: FONTS.body,
                fontSize: 9,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Primary Airbnb
            </a>
            <a
              href="https://www.airbnb.com/rooms/51781831?viralityEntryPoint=1&s=76"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 14px",
                background: "transparent",
                color: COLORS.cognacDark,
                border: `1px solid ${COLORS.cognacDark}`,
                fontFamily: FONTS.body,
                fontSize: 9,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Backup
            </a>
          </div>
        </div>

        {/* Unit 2, Jandee's Expedia booking */}
        <div style={{
          padding: "16px 18px",
          background: COLORS.sagePale,
          borderLeft: `3px solid ${COLORS.sageLight}`,
        }}>
          <Kicker mb={4} size={9} color={COLORS.sageDark}>Unit 2 · Jandee's Booking</Kicker>
          <h4 style={{
            fontFamily: FONTS.display,
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.text,
            margin: "0 0 8px",
            fontStyle: "italic",
          }}>
            Deluxe One Bedroom
          </h4>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textLight,
            margin: "0 0 4px",
            lineHeight: 1.6,
          }}>
            <strong>Sleeps 2</strong> · Jandee & Niraj
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textLight,
            margin: "0 0 12px",
          }}>
            Fri May 29 · 4:00 PM → Sun May 31 · 11:00 AM
          </p>
          <a
            href="https://www.expedia.com/Nashville-Hotels-Mint-House-Nashville-Marathon-Village-By-Kasa.h113638452.Hotel-Information"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "8px 14px",
              background: COLORS.sageDark,
              color: COLORS.white,
              fontFamily: FONTS.body,
              fontSize: 9,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Expedia Listing
          </a>
        </div>
      </InfoCard>

      <InfoCard kicker="The Ride" title="Rental Car">
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: 0,
          lineHeight: 1.7,
        }}>
          Alamo rental. <strong>$72 per person.</strong> Jess picking up on arrival Thursday.
        </p>
      </InfoCard>

      <InfoCard kicker="Inbound" title="Arrivals">
        <GuestRow name="Amanda"  info="Thu · 4:43 PM" />
        <GuestRow name="Jess"    info="Thu · 3:37 PM" />
        <GuestRow name="Ella"    info="Thu · 4:43 PM" />
        <GuestRow name="Vanessa" info="Thu · 3:37 PM" />
        <GuestRow name="Burlyn"  info="Fri · 6:00 AM" />
        <GuestRow name="Jandee"  info="Driving · Fri AM" />
        <GuestRow name="Niraj"   info="Driving · Fri AM" />
      </InfoCard>

      <InfoCard kicker="Outbound" title="Departures">
        <GuestRow name="Burlyn"  info="Sun · 7:00 AM · Flight" />
        <GuestRow name="Amanda, Jess, Ella, Niraj, Jandee" info="Driving to Memphis" />
        <GuestRow name="Vanessa" info="Sun · 5:43 PM · Flight" />
        </InfoCard>

      <InfoCard kicker="What It Costs" title="Cost Breakdown">
        {[
          { item: "Airbnb",        cost: "$159 pp" },
          { item: "Rental Car",    cost: "$72 pp" },
          { item: "Pedal Tavern",  cost: "$72 pp" },
        ].map((row, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "14px 0",
            borderBottom: `1px solid ${COLORS.hairline}`,
          }}>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: 16,
              color: COLORS.text,
              fontStyle: "italic",
              fontWeight: 400,
            }}>
              {row.item}
            </span>
            <span style={{
              fontFamily: FONTS.body,
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.cognac,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}>
              {row.cost}
            </span>
          </div>
        ))}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "20px 0 4px",
        }}>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: 10,
            color: COLORS.cognac,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}>
            Running total
          </span>
          <span style={{
            fontFamily: FONTS.display,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.cognacDark,
            fontStyle: "italic",
            letterSpacing: "-0.5px",
          }}>
            $303 pp
          </span>
        </div>
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 13,
          color: COLORS.textMuted,
          margin: "8px 0 0",
          fontStyle: "italic",
          letterSpacing: "0.3px",
        }}>
          Per person, for the five women in Jess's unit. Jandee & Niraj's Mint House unit is booked separately. Food, drinks, and Ubers not included.
        </p>
      </InfoCard>

      <InfoCard kicker="From Jess" title="Coordinating">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          <div>
            <Kicker mb={6} size={9}>Pay Jess Back · $303</Kicker>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.textLight,
              margin: "0 0 10px",
              lineHeight: 1.6,
            }}>
              Venmo for the Airbnb, rental car, and Pedal Tavern. The $303 fixed costs.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <a
                href="https://venmo.com/?txn=pay&recipients=Jessica-Meyers16&note=Nashville%20Bach"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "11px 20px",
                  background: COLORS.cognacDark,
                  color: COLORS.white,
                  fontFamily: FONTS.body,
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                }}
              >
                Pay Jess on Venmo
              </a>
              <a
                href="https://venmo.com/u/Jessica-Meyers16"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "11px 20px",
                  background: "transparent",
                  color: COLORS.cognacDark,
                  border: `1px solid ${COLORS.cognacDark}`,
                  fontFamily: FONTS.body,
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                }}
              >
                Her Profile
              </a>
            </div>
            <p style={{
              fontFamily: FONTS.accent,
              fontSize: 12,
              color: COLORS.textMuted,
              margin: "8px 0 0",
              fontStyle: "italic",
              letterSpacing: "0.3px",
            }}>
              Opens Venmo with Jess and "Nashville Bach" pre-filled. Just enter your amount.
            </p>
          </div>

          <div>
            <Kicker mb={6} size={9}>Meals Out</Kicker>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.textLight,
              margin: "0 0 10px",
              lineHeight: 1.6,
            }}>
              We're using <strong>Splitwise</strong> for the weekend. Take turns paying for meals out, then settle up at the end of the trip.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <a
                href="https://www.splitwise.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "11px 20px",
                  background: COLORS.sageDark,
                  color: COLORS.white,
                  fontFamily: FONTS.body,
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                }}
              >
                Open Splitwise
              </a>
              <a
                href="https://www.splitwise.com/download"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "11px 20px",
                  background: "transparent",
                  color: COLORS.sageDark,
                  border: `1px solid ${COLORS.sageDark}`,
                  fontFamily: FONTS.body,
                  fontSize: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                }}
              >
                Get the App
              </a>
            </div>
          </div>

          <div>
            <Kicker mb={6} size={9}>Flights</Kicker>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}>
              Text Jess your flight info once you book. She's coordinating pickups and drop-offs in the rental car to save us all on Ubers.
            </p>
          </div>

          <div>
            <Kicker mb={6} size={9}>Restaurant Recs</Kicker>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}>
              Reservations get locked in about a month out. If there's somewhere you're dying to go, send it to Jess now.
            </p>
          </div>

        </div>
      </InfoCard>

      <DayMap
        kicker="The Whole Trip"
        title="Nashville Overview"
        centerQuery="Nashville, Tennessee"
        stops={["bna", "hawkers", "tootsies", "fallCreek"]}
      />
    </div>
  </div>
);

// ============== APP ==============

// Parse /amanda-bach-nashville/<page> from the URL so deep links work.
const PAGES = ["home", "thursday", "friday", "saturday", "sunday", "details"];
const getPageFromUrl = () => {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/\/+$/, "").split("/").pop();
  return PAGES.includes(path) ? path : "home";
};

export default function App() {
  const [page, setPage] = useState(getPageFromUrl);

  // Keep the URL in sync, and handle back/forward.
  useEffect(() => {
    const onPop = () => setPage(getPageFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (id) => {
    setPage(id);
    // History + scroll are best-effort. Older iOS Safari can throw on
    // scrollTo({behavior:'instant'}), so use positional args and isolate
    // each side-effect. Navigation must never fail because of these.
    try {
      const base = import.meta.env.BASE_URL || "/";
      const url = id === "home" ? base : `${base.replace(/\/$/, "")}/${id}`;
      if (window.location.pathname !== url) {
        window.history.pushState({}, "", url);
      }
    } catch { /* ignore */ }
    try {
      window.scrollTo(0, 0);
    } catch { /* ignore */ }
  };

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage />;
      case "thursday": return <ThursdayPage />;
      case "friday":   return <FridayPage />;
      case "saturday": return <SaturdayPage />;
      case "sunday":   return <SundayPage />;
      case "details":  return <DetailsPage />;
      default:         return <HomePage />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Allura&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        html, body { background: ${COLORS.ivory}; overflow-x: hidden; }
        body {
          font-family: ${FONTS.body};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          /* Subtle paper-grain so the ivory base has warmth and depth. */
          background-color: ${COLORS.ivory};
          background-image:
            radial-gradient(circle at 25% 15%, ${COLORS.champagnePale}99 0%, transparent 60%),
            radial-gradient(circle at 75% 85%, ${COLORS.blushPale}66 0%, transparent 55%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-attachment: fixed, fixed, fixed;
          background-size: cover, cover, 240px 240px;
        }
        a { color: inherit; }
        a:focus-visible { outline: 2px solid ${COLORS.cognac}; outline-offset: 3px; }
      `}</style>
      <div style={{
        maxWidth: 480,
        margin: "0 auto",
        background: COLORS.ivory,
        minHeight: "100vh",
        position: "relative",
      }}>
        {renderPage()}
        <BottomNav active={page} onNavigate={navigate} />
      </div>
    </>
  );
}
