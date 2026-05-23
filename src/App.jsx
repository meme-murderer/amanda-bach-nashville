import { useState, useEffect } from "react";

const COLORS = {
  blush: "#E4ADB0",
  blushLight: "#F2D5D7",
  blushPale: "#FDF0F1",
  sage: "#9EAD8B",
  sageDark: "#7A8C6A",
  sageLight: "#C5D1B6",
  sagePale: "#EEF2E8",
  cognac: "#8B5E3C",
  sand: "#C4A882",
  sandLight: "#DCC9AA",
  champagne: "#F5F0E6",
  ivory: "#FDFBF7",
  cream: "#F8F3EB",
  gold: "#C5A55A",
  goldLight: "#E8D9A8",
  text: "#3D3229",
  textLight: "#6B5D52",
  textMuted: "#9A8C80",
  white: "#FFFFFF",
  stripe: "#D4C4AD",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Avenir', sans-serif",
  accent: "'Cormorant Garamond', Georgia, serif",
};

// ============== DECORATIVE SVGs ==============

const StarSVG = ({ size = 24, color = COLORS.blush, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
  </svg>
);

const BootSVG = ({ size = 40, color = COLORS.cognac }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none" style={{ display: "inline-block" }}>
    <path d="M12 4C12 4 10 2 8 2C6 2 5 3 5 5L5 28C5 28 3 30 3 34C3 38 5 42 5 44C5 46 6 47 8 47L32 47C34 47 35 46 35 44L35 38C35 36 33 34 33 34L33 14C33 12 31 10 29 10L22 10L20 4L12 4Z" stroke={color} strokeWidth="2" fill="none" />
    <path d="M8 32L33 32" stroke={color} strokeWidth="1.5" />
    <path d="M5 44L35 44" stroke={color} strokeWidth="1.5" />
  </svg>
);

const HatSVG = ({ size = 50, color = COLORS.cognac }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 50 30" fill="none">
    <ellipse cx="25" cy="26" rx="24" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M12 26C12 26 10 10 15 6C18 3.5 22 3 25 3C28 3 32 3.5 35 6C40 10 38 26 38 26" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M10 24C10 24 15 22 25 22C35 22 40 24 40 24" stroke={color} strokeWidth="1.5" />
  </svg>
);

const Divider = ({ color = COLORS.sandLight, width = 60 }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    margin: "12px auto",
    width: width + 24,
  }}>
    <span style={{ flex: 1, height: 1, background: color }} />
    <span style={{
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: color,
    }} />
    <span style={{ flex: 1, height: 1, background: color }} />
  </div>
);

const StripeBG = ({ children, style = {} }) => (
  <div style={{
    background: `repeating-linear-gradient(90deg, ${COLORS.ivory} 0px, ${COLORS.ivory} 18px, ${COLORS.stripe}33 18px, ${COLORS.stripe}33 36px)`,
    ...style,
  }}>
    {children}
  </div>
);

// ============== NAV LINE ICONS ==============

const stroke = { stroke: "currentColor", strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };

const NavIcons = {
  home: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  thu: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <circle cx="8" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  fri: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  sat: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <circle cx="16" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  sun: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <circle cx="8" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  info: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  ),
};

// ============== NAV ==============

const NAV_ITEMS = [
  { id: "home",     label: "Home", icon: NavIcons.home },
  { id: "thursday", label: "Thu",  icon: NavIcons.thu },
  { id: "friday",   label: "Fri",  icon: NavIcons.fri },
  { id: "saturday", label: "Sat",  icon: NavIcons.sat },
  { id: "sunday",   label: "Sun",  icon: NavIcons.sun },
  { id: "details",  label: "Info", icon: NavIcons.info },
];

const BottomNav = ({ active, onNavigate }) => (
  <nav style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: COLORS.ivory,
    borderTop: `1px solid ${COLORS.sandLight}`,
    display: "flex",
    justifyContent: "space-around",
    padding: "8px 0 env(safe-area-inset-bottom, 10px)",
    zIndex: 100,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
    maxWidth: 480,
    margin: "0 auto",
  }}>
    {NAV_ITEMS.map((item) => {
      const isActive = active === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            cursor: "pointer",
            padding: "4px 10px",
            borderRadius: 8,
            transition: "all 0.2s",
            color: isActive ? COLORS.cognac : COLORS.textMuted,
            opacity: isActive ? 1 : 0.65,
          }}
        >
          <span style={{ display: "block", lineHeight: 0 }}>{item.icon(18)}</span>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: 10,
            fontWeight: isActive ? 700 : 500,
            color: "inherit",
            letterSpacing: "0.6px",
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
    padding: "40px 20px 24px",
    background: `linear-gradient(180deg, ${COLORS.champagne} 0%, ${COLORS.ivory} 100%)`,
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: 14, left: 24, opacity: 0.18 }}>
      <StarSVG size={14} color={COLORS.blush} />
    </div>
    <div style={{ position: "absolute", top: 10, right: 30, opacity: 0.14 }}>
      <StarSVG size={10} color={COLORS.sage} />
    </div>
    <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", opacity: 0.1 }}>
      <StarSVG size={18} color={COLORS.gold} />
    </div>

    {kicker && (
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 10,
        fontWeight: 600,
        color: COLORS.cognac,
        letterSpacing: "3.5px",
        textTransform: "uppercase",
        margin: "0 0 10px",
      }}>
        {kicker}
      </p>
    )}
    <h2 style={{
      fontFamily: FONTS.display,
      fontSize: 36,
      color: COLORS.text,
      margin: 0,
      fontWeight: 700,
      fontStyle: "italic",
      letterSpacing: "-0.5px",
    }}>
      {title}
    </h2>
    {subtitle && (
      <>
        <Divider color={COLORS.sandLight} width={50} />
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 15,
          color: COLORS.textLight,
          margin: 0,
          fontStyle: "italic",
          letterSpacing: "0.3px",
        }}>
          {subtitle}
        </p>
      </>
    )}
  </div>
);

const TimeBlock = ({ time, title, description, highlight, link, linkText }) => (
  <div style={{
    display: "flex",
    gap: 14,
    padding: "16px 20px",
    borderBottom: `1px solid ${COLORS.champagne}`,
    background: highlight ? COLORS.blushPale : "transparent",
    transition: "background 0.2s",
  }}>
    <div style={{ minWidth: 64, textAlign: "right", paddingTop: 4 }}>
      <span style={{
        fontFamily: FONTS.body,
        fontSize: 11,
        fontWeight: 700,
        color: COLORS.cognac,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
      }}>
        {time}
      </span>
    </div>
    <div style={{
      width: 1,
      background: highlight ? COLORS.blushLight : COLORS.sandLight,
      flexShrink: 0,
      position: "relative",
    }}>
      <span style={{
        position: "absolute",
        top: 8,
        left: -3,
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: highlight ? COLORS.blush : COLORS.cognac,
        border: `2px solid ${COLORS.ivory}`,
      }} />
    </div>
    <div style={{ flex: 1, paddingTop: 2 }}>
      <h4 style={{
        fontFamily: FONTS.display,
        fontSize: 17,
        fontWeight: 600,
        color: COLORS.text,
        margin: 0,
        fontStyle: "italic",
      }}>
        {title}
      </h4>
      {description && (
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "4px 0 0",
          lineHeight: 1.5,
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
            fontSize: 12,
            color: COLORS.cognac,
            textDecoration: "underline",
            textUnderlineOffset: 2,
            display: "inline-block",
            marginTop: 6,
            fontWeight: 600,
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
    background: COLORS.white,
    borderRadius: 16,
    padding: "20px 22px",
    margin: "0 16px 14px",
    border: `1px solid ${COLORS.champagne}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  }}>
    {kicker && (
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 9,
        fontWeight: 700,
        color: COLORS.cognac,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        margin: "0 0 4px",
      }}>
        {kicker}
      </p>
    )}
    <h3 style={{
      fontFamily: FONTS.display,
      fontSize: 19,
      fontWeight: 700,
      color: COLORS.text,
      margin: "0 0 12px",
      fontStyle: "italic",
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
    alignItems: "center",
    padding: "12px 0",
    borderBottom: `1px solid ${COLORS.champagne}`,
  }}>
    <p style={{
      fontFamily: FONTS.display,
      fontSize: 15,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
    }}>
      {name}
    </p>
    <p style={{
      fontFamily: FONTS.body,
      fontSize: 12,
      color: COLORS.textMuted,
      margin: 0,
      fontWeight: 500,
      letterSpacing: "0.3px",
    }}>
      {info}
    </p>
  </div>
);

const DresscodeTag = ({ label, color }) => (
  <span style={{
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: 20,
    background: color + "1A",
    border: `1px solid ${color}55`,
    fontFamily: FONTS.body,
    fontSize: 11,
    fontWeight: 600,
    color: color,
    marginRight: 6,
    marginBottom: 6,
    letterSpacing: "0.3px",
  }}>
    {label}
  </span>
);

const VenueCard = ({ name, desc, highlight }) => (
  <div style={{
    padding: "12px 16px",
    background: highlight ? COLORS.blushPale : COLORS.champagne,
    borderRadius: 10,
    borderLeft: `3px solid ${highlight ? COLORS.blush : COLORS.sandLight}`,
  }}>
    <p style={{
      fontFamily: FONTS.display,
      fontSize: 15,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      fontStyle: "italic",
    }}>
      {name}
    </p>
    {desc && (
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 12,
        color: COLORS.textLight,
        margin: "2px 0 0",
        lineHeight: 1.45,
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

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.ivory,
      position: "relative",
      overflow: "hidden",
    }}>
      <StripeBG style={{ height: 80 }} />

      <div style={{
        textAlign: "center",
        padding: "36px 24px 28px",
        position: "relative",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ position: "absolute", top: 10, left: 30 }}>
          <StarSVG size={18} color={COLORS.blush} style={{ opacity: 0.35 }} />
        </div>
        <div style={{ position: "absolute", top: 70, right: 28 }}>
          <StarSVG size={12} color={COLORS.sage} style={{ opacity: 0.3 }} />
        </div>
        <div style={{ position: "absolute", bottom: 24, left: 50 }}>
          <StarSVG size={10} color={COLORS.gold} style={{ opacity: 0.25 }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <HatSVG size={64} color={COLORS.cognac} />
        </div>

        <p style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          fontWeight: 700,
          color: COLORS.cognac,
          letterSpacing: "4px",
          textTransform: "uppercase",
          margin: "0 0 10px",
        }}>
          Amanda's Nashville Bach
        </p>

        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 46,
          fontWeight: 700,
          color: COLORS.text,
          margin: "0 0 4px",
          lineHeight: 1.05,
          fontStyle: "italic",
          letterSpacing: "-1px",
        }}>
          Saddlin' Up
        </h1>
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 22,
          color: COLORS.cognac,
          margin: "0 0 4px",
          letterSpacing: "3px",
          fontStyle: "italic",
        }}>
          &
        </p>
        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 46,
          fontWeight: 700,
          color: COLORS.text,
          margin: "0 0 20px",
          lineHeight: 1.05,
          fontStyle: "italic",
          letterSpacing: "-1px",
        }}>
          Settlin' Down
        </h1>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 22 }}>
          <BootSVG size={32} color={COLORS.cognac} />
        </div>

        <div style={{
          display: "inline-block",
          background: COLORS.white,
          borderRadius: 20,
          padding: "12px 28px",
          border: `1px solid ${COLORS.sandLight}`,
        }}>
          <p style={{
            fontFamily: FONTS.display,
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.cognac,
            margin: 0,
            fontStyle: "italic",
          }}>
            May 28 – 31, 2026
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            color: COLORS.textMuted,
            margin: "3px 0 0",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}>
            Nashville, Tennessee
          </p>
        </div>
      </div>

      <div style={{
        padding: "0 20px 22px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: 20,
          padding: "22px 20px",
          border: `1px solid ${COLORS.champagne}`,
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.cognac,
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: "0 0 4px",
            textAlign: "center",
          }}>
            The Roundup
          </p>
          <h3 style={{
            fontFamily: FONTS.display,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.text,
            margin: "0 0 4px",
            textAlign: "center",
            fontStyle: "italic",
          }}>
            Four Days, One Bride
          </h3>
          <Divider color={COLORS.sandLight} width={40} />

          {[
            { day: "Thursday", date: "May 28", desc: "Arrivals & East Nashville night out" },
            { day: "Friday",   date: "May 29", desc: "Downtown brunch, Pedal Tavern & Broadway" },
            { day: "Saturday", date: "May 30", desc: "Chill, waterfall hike & pool party" },
            { day: "Sunday",   date: "May 31", desc: "Fly home" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "12px 0",
              borderBottom: i < 3 ? `1px solid ${COLORS.champagne}` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span style={{
                  fontFamily: FONTS.display,
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.text,
                  fontStyle: "italic",
                }}>
                  {item.day}
                </span>
                <span style={{
                  fontFamily: FONTS.body,
                  fontSize: 10,
                  color: COLORS.cognac,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  {item.date}
                </span>
              </div>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: 13,
                color: COLORS.textLight,
                margin: 0,
                lineHeight: 1.4,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: "0 20px 100px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
      }}>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 10,
          fontWeight: 700,
          color: COLORS.cognac,
          letterSpacing: "3px",
          textTransform: "uppercase",
          margin: "0 0 4px",
          textAlign: "center",
        }}>
          The Posse
        </p>
        <h3 style={{
          fontFamily: FONTS.display,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          margin: "0 0 4px",
          fontStyle: "italic",
        }}>
          Eight Riders
        </h3>
        <Divider color={COLORS.sandLight} width={40} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { name: "Amanda",  role: "The Bride" },
            { name: "Jess",    role: "Maid of Honor" },
            { name: "Leslie",  role: "" },
            { name: "Ella",    role: "" },
            { name: "Vanessa", role: "" },
            { name: "Burlyn",  role: "" },
            { name: "Jandee",  role: "" },
            { name: "Niraj",   role: "" },
          ].map((g, i) => (
            <div key={i} style={{
              background: g.role ? COLORS.blushPale : COLORS.white,
              borderRadius: 12,
              padding: "16px 12px",
              border: `1px solid ${g.role ? COLORS.blushLight : COLORS.champagne}`,
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                fontWeight: 600,
                color: COLORS.text,
                margin: 0,
                fontStyle: "italic",
              }}>
                {g.name}
              </p>
              {g.role && (
                <p style={{
                  fontFamily: FONTS.body,
                  fontSize: 9,
                  color: COLORS.cognac,
                  margin: "4px 0 0",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}>
                  {g.role}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ThursdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader kicker="Day One" title="Thursday" subtitle="May 28 · Arrival Day" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="3:37 PM"
        title="Jess & Vanessa Land"
        description="First arrivals at BNA. Jess grabs the Alamo rental car."
      />
      <TimeBlock
        time="4:00 PM"
        title="Check Into Airbnb"
        description="Drop bags, settle in, freshen up."
        highlight
      />
      <TimeBlock
        time="4:43 PM"
        title="Amanda & Ella Land"
        description="The bride has arrived."
      />
      <TimeBlock
        time="TBD"
        title="Leslie Arrives"
        description="Time TBD — joining us Thursday."
      />
      <TimeBlock
        time="Pre-dinner"
        title="Walmart / Instacart Run"
        description="Stock the Airbnb — snacks, breakfast, drinks. Order ahead via Instacart or stop at Walmart on the way in."
      />
      <TimeBlock
        time="Evening"
        title="East Nashville Night"
        description="Dinner, cocktails, dive bars."
      />
    </div>

    <InfoCard kicker="Dinner" title="Hawkers Asian Street Food">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: 0,
        lineHeight: 1.5,
      }}>
        Shareable small plates, craft cocktails, and a vibrant atmosphere — perfect for the group's first night.
      </p>
    </InfoCard>

    <InfoCard kicker="Cocktails" title="Attaboy">
      <VenueCard name="Attaboy" desc="Speakeasy-style cocktails — no menu, just tell them what you like." highlight />
    </InfoCard>

    <InfoCard kicker="Late Night" title="Bars After">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <VenueCard name="Lakeside Lounge" desc="Chill vibes, lake views" />
        <VenueCard name="Hubba Hubba" desc="Funky dive bar energy" />
      </div>
    </InfoCard>
  </div>
);

const FridayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader kicker="Day Two" title="Friday" subtitle="May 29 · The Big Day Out" />

    <InfoCard kicker="What To Wear" title="Dress Code">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: "0 0 12px",
        lineHeight: 1.5,
      }}>
        Downtown day — coordinated looks. <strong>Denim Day</strong> with <strong>pink mustaches</strong> for everyone.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <DresscodeTag label="Amanda · White" color={COLORS.textLight} />
        <DresscodeTag label="Crew · Gold & Pink" color={COLORS.gold} />
        <DresscodeTag label="Denim Welcome" color="#5B7DB1" />
        <DresscodeTag label="Pink Mustaches" color={COLORS.blush} />
      </div>
    </InfoCard>

    <div style={{ padding: "8px 0" }}>
      <TimeBlock
        time="6:00 AM"
        title="Burlyn Lands"
        description="Early bird arrival."
      />
      <TimeBlock
        time="AM"
        title="Jandee & Niraj Drive In"
        description="Hitting Nashville Friday morning."
      />
      <TimeBlock
        time="Early"
        title="Surprise Decor Setup"
        description="Jess, Leslie, Jandee & Niraj decorate the Airbnb while Amanda is still asleep."
        highlight
      />
      <TimeBlock
        time="10:00 AM"
        title="Brunch at Bacco"
        description="Reservation for the group. Hand out BINGO cards to the ladies."
      />
      <TimeBlock
        time="11:30 AM"
        title="Line Dance Lessons"
        description="Category 10 — free. Class runs ~11:30 to 1:30. Warm up for tonight."
      />
      <TimeBlock
        time="1:50 PM"
        title="Arrive at Pedal Tavern"
        description="$72 pp (gratuity included). Tour departs 2:20 PM — be there by 1:50."
        highlight
      />
      <TimeBlock
        time="4:15 PM"
        title="Early Dinner"
        description="The Hampton Social Rooftop — reservation at 4:15."
      />
      <TimeBlock
        time="Evening"
        title="Drop Car & Freshen Up"
        description="Back to the Airbnb, change clothes, regroup for Broadway."
      />
      <TimeBlock
        time="Night"
        title="Broadway Night Out"
        description="The main event — honky-tonks all the way down Lower Broadway."
      />
    </div>

    <InfoCard kicker="The Main Event" title="Broadway Lineup">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <VenueCard name="Tootsies Orchid Lounge" desc="Classic honky-tonk, cold drinks" />
        <VenueCard name="Category 10" desc="Line dancing — round two" />
        <VenueCard name="Robert's Western World" desc="Recession Special late-night snack" highlight />
      </div>
    </InfoCard>
  </div>
);

const SaturdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader kicker="Day Three" title="Saturday" subtitle="May 30 · Chill & Adventure" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="Morning"
        title="Sleep In"
        description="Recovery mode. Take it easy."
      />
      <TimeBlock
        time="Late AM"
        title="Breakfast at the Airbnb"
        description="Jess is on breakfast duty. Refuel before the hike."
        highlight
      />
      <TimeBlock
        time="Afternoon"
        title="Hike & Waterfall Swim"
        description="Fall Creek Falls State Park. Bring swimsuits, towels, water, sunscreen, and hiking shoes."
        highlight
        link="https://tnstateparks.com/parks/fall-creek-falls"
        linkText="Park info →"
      />
      <TimeBlock
        time="Late PM"
        title="Late Lunch"
        description="Kyuramen — takeout option available if we're worn out."
      />
      <TimeBlock
        time="Evening"
        title="Steak Dinner at the Airbnb"
        description="Grill steaks & veggies. Home-cooked group dinner."
      />
      <TimeBlock
        time="Night"
        title="Pool Party & Game Night"
        description="Close out the night poolside — bring games."
        highlight
      />
    </div>

    <InfoCard kicker="Don't Forget" title="Packing Reminder">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Hiking shoes", "Swimsuit", "Towel", "Sunscreen", "Bug spray", "Water bottle"].map((item, i) => (
          <span key={i} style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 20,
            background: COLORS.sagePale,
            fontFamily: FONTS.body,
            fontSize: 11,
            color: COLORS.sageDark,
            fontWeight: 600,
            letterSpacing: "0.3px",
          }}>
            {item}
          </span>
        ))}
      </div>
    </InfoCard>
  </div>
);

const SundayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader kicker="Day Four" title="Sunday" subtitle="May 31 · Adios, Nashville" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="7:00 AM"
        title="Burlyn Departs"
        description="Early flight out."
      />
      <TimeBlock
        time="11:00 AM"
        title="Check Out of Airbnb"
        description="Pack up, tidy up, head out by 11."
        highlight
      />
      <TimeBlock
        time="5:43 PM"
        title="Vanessa Departs"
        description="Last flight out."
      />
      <TimeBlock
        time="Anytime"
        title="Jandee & Niraj Drive Home"
        description="Hitting the road whenever."
      />
    </div>

    <InfoCard kicker="Heading Home" title="Departures">
      <GuestRow name="Burlyn"          info="Sun · 7:00 AM" />
      <GuestRow name="Vanessa"         info="Sun · 5:43 PM" />
      <GuestRow name="Jandee & Niraj"  info="Driving home" />
      <GuestRow name="Amanda, Jess, Ella, Leslie" info="See your own itineraries" />
    </InfoCard>

    <div style={{ textAlign: "center", padding: "48px 24px 20px" }}>
      <div style={{ marginBottom: 14 }}>
        <StarSVG size={26} color={COLORS.blush} />
      </div>
      <p style={{
        fontFamily: FONTS.display,
        fontSize: 24,
        fontWeight: 700,
        fontStyle: "italic",
        color: COLORS.text,
        margin: "0 0 8px",
        letterSpacing: "-0.5px",
      }}>
        She's all saddled up.
      </p>
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 16,
        color: COLORS.textLight,
        margin: 0,
        fontStyle: "italic",
        letterSpacing: "0.3px",
      }}>
        Now let's get her settled down.
      </p>
    </div>
  </div>
);

const DetailsPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader kicker="The Logistics" title="Details" subtitle="Need-to-Know Info" />

    <div style={{ padding: "16px 0" }}>
      <InfoCard kicker="The House" title="Airbnb">
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 4px",
          lineHeight: 1.6,
        }}>
          Max 6 guests · <strong>$952 total</strong> ($159 pp)
        </p>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 12px",
        }}>
          Check-in: 4:00 PM · Check-out: 11:00 AM
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a
            href="https://www.airbnb.com/rooms/1326215239593896193?viralityEntryPoint=1&s=76"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "9px 18px",
              background: COLORS.cognac,
              color: COLORS.white,
              borderRadius: 20,
              fontFamily: FONTS.body,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Primary Listing
          </a>
          <a
            href="https://www.airbnb.com/rooms/51781831?viralityEntryPoint=1&s=76"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "9px 18px",
              background: COLORS.white,
              color: COLORS.cognac,
              border: `1px solid ${COLORS.cognac}`,
              borderRadius: 20,
              fontFamily: FONTS.body,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Backup Listing
          </a>
        </div>
      </InfoCard>

      <InfoCard kicker="The Ride" title="Rental Car">
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Alamo rental. <strong>$72 per person.</strong> Jess picking up on arrival Thursday.
        </p>
      </InfoCard>

      <InfoCard kicker="Inbound" title="Arrivals">
        <GuestRow name="Amanda"  info="Thu · 4:43 PM" />
        <GuestRow name="Jess"    info="Thu · 3:37 PM" />
        <GuestRow name="Leslie"  info="Thursday (TBD)" />
        <GuestRow name="Ella"    info="Thu · 4:43 PM" />
        <GuestRow name="Vanessa" info="Thu · 3:37 PM" />
        <GuestRow name="Burlyn"  info="Fri · 6:00 AM" />
        <GuestRow name="Jandee"  info="Driving · Fri AM" />
        <GuestRow name="Niraj"   info="Driving · Fri AM" />
      </InfoCard>

      <InfoCard kicker="Outbound" title="Departures">
        <GuestRow name="Burlyn"  info="Sun · 7:00 AM" />
        <GuestRow name="Vanessa" info="Sun · 5:43 PM" />
        <GuestRow name="Jandee & Niraj" info="Driving home Sunday" />
      </InfoCard>

      <InfoCard kicker="What It Costs" title="Cost Breakdown">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { item: "Airbnb",        cost: "$159 pp" },
            { item: "Rental Car",    cost: "$72 pp" },
            { item: "Pedal Tavern",  cost: "$72 pp" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "11px 14px",
              background: COLORS.champagne,
              borderRadius: 8,
            }}>
              <span style={{
                fontFamily: FONTS.body,
                fontSize: 13,
                color: COLORS.text,
                fontWeight: 500,
              }}>
                {row.item}
              </span>
              <span style={{
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.cognac,
                letterSpacing: "0.3px",
              }}>
                {row.cost}
              </span>
            </div>
          ))}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "13px 14px",
            background: COLORS.blushPale,
            borderRadius: 8,
            border: `1px solid ${COLORS.blushLight}`,
          }}>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
              fontStyle: "italic",
            }}>
              Running total
            </span>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.cognac,
              fontStyle: "italic",
            }}>
              $303 pp
            </span>
          </div>
        </div>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          color: COLORS.textMuted,
          margin: "12px 0 0",
          fontStyle: "italic",
          letterSpacing: "0.3px",
        }}>
          Food, drinks, and Ubers not included.
        </p>
      </InfoCard>
    </div>
  </div>
);

// ============== APP ==============

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        html, body { background: ${COLORS.ivory}; overflow-x: hidden; }
        body { font-family: ${FONTS.body}; }
        a { color: inherit; }
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
