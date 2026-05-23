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

// ============== ICONS ==============

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

const StripeBG = ({ children, style = {} }) => (
  <div style={{
    background: `repeating-linear-gradient(90deg, ${COLORS.ivory} 0px, ${COLORS.ivory} 18px, ${COLORS.stripe}33 18px, ${COLORS.stripe}33 36px)`,
    ...style,
  }}>
    {children}
  </div>
);

// ============== NAV ==============

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🤠" },
  { id: "thursday", label: "Thu", icon: "🛬" },
  { id: "friday", label: "Fri", icon: "🎀" },
  { id: "saturday", label: "Sat", icon: "🏞️" },
  { id: "sunday", label: "Sun", icon: "✈️" },
  { id: "details", label: "Info", icon: "📋" },
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
    padding: "6px 0 env(safe-area-inset-bottom, 8px)",
    zIndex: 100,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
    maxWidth: 480,
    margin: "0 auto",
  }}>
    {NAV_ITEMS.map((item) => (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        style={{
          background: "none",
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: 8,
          transition: "all 0.2s",
          opacity: active === item.id ? 1 : 0.5,
        }}
      >
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: 10,
          fontWeight: active === item.id ? 700 : 500,
          color: active === item.id ? COLORS.cognac : COLORS.textMuted,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          {item.label}
        </span>
      </button>
    ))}
  </nav>
);

// ============== SHARED ==============

const PageHeader = ({ title, subtitle, emoji }) => (
  <div style={{
    textAlign: "center",
    padding: "32px 20px 20px",
    background: `linear-gradient(180deg, ${COLORS.champagne} 0%, ${COLORS.ivory} 100%)`,
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: 12, left: 20, opacity: 0.2 }}>
      <StarSVG size={16} color={COLORS.blush} />
    </div>
    <div style={{ position: "absolute", top: 8, right: 30, opacity: 0.15 }}>
      <StarSVG size={12} color={COLORS.sage} />
    </div>
    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", opacity: 0.1 }}>
      <StarSVG size={20} color={COLORS.gold} />
    </div>
    {emoji && <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>}
    <h2 style={{
      fontFamily: FONTS.display,
      fontSize: 28,
      color: COLORS.text,
      margin: "0 0 4px",
      fontWeight: 700,
      fontStyle: "italic",
    }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 16,
        color: COLORS.textLight,
        margin: 0,
        fontStyle: "italic",
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

const TimeBlock = ({ time, title, description, icon, highlight, link, linkText }) => (
  <div style={{
    display: "flex",
    gap: 14,
    padding: "16px 20px",
    borderBottom: `1px solid ${COLORS.champagne}`,
    background: highlight ? COLORS.blushPale : "transparent",
    transition: "background 0.2s",
  }}>
    <div style={{ minWidth: 60, textAlign: "right", paddingTop: 2 }}>
      <span style={{
        fontFamily: FONTS.body,
        fontSize: 12,
        fontWeight: 600,
        color: COLORS.cognac,
        letterSpacing: "0.3px",
      }}>
        {time}
      </span>
    </div>
    <div style={{
      width: 2,
      background: `linear-gradient(180deg, ${COLORS.sandLight}, ${COLORS.blushLight})`,
      borderRadius: 1,
      flexShrink: 0,
    }} />
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
        <h4 style={{
          fontFamily: FONTS.display,
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.text,
          margin: 0,
        }}>
          {title}
        </h4>
      </div>
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
            marginTop: 4,
          }}
        >
          {linkText || "View"}
        </a>
      )}
    </div>
  </div>
);

const InfoCard = ({ title, children, icon }) => (
  <div style={{
    background: COLORS.white,
    borderRadius: 16,
    padding: "18px 20px",
    margin: "0 16px 14px",
    border: `1px solid ${COLORS.champagne}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <h3 style={{
        fontFamily: FONTS.display,
        fontSize: 17,
        fontWeight: 700,
        color: COLORS.text,
        margin: 0,
      }}>
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const GuestRow = ({ name, info, emoji }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: COLORS.white,
    borderRadius: 12,
    border: `1px solid ${COLORS.champagne}`,
  }}>
    <span style={{ fontSize: 22 }}>{emoji || "🤠"}</span>
    <div style={{ flex: 1 }}>
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
        margin: "2px 0 0",
      }}>
        {info}
      </p>
    </div>
  </div>
);

const DresscodeTag = ({ label, color }) => (
  <span style={{
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: 20,
    background: color + "22",
    border: `1px solid ${color}55`,
    fontFamily: FONTS.body,
    fontSize: 12,
    fontWeight: 600,
    color: color,
    marginRight: 6,
    marginBottom: 6,
  }}>
    {label}
  </span>
);

const VenueCard = ({ name, desc, emoji, highlight }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    background: highlight ? COLORS.blushPale : COLORS.champagne,
    borderRadius: 10,
  }}>
    {emoji && <span style={{ fontSize: 20 }}>{emoji}</span>}
    <div style={{ flex: 1 }}>
      <span style={{
        fontFamily: FONTS.display,
        fontSize: 15,
        fontWeight: 600,
        color: COLORS.text,
      }}>
        {name}
      </span>
      {desc && (
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 12,
          color: COLORS.textMuted,
          margin: "2px 0 0",
        }}>
          {desc}
        </p>
      )}
    </div>
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
        padding: "32px 24px 24px",
        position: "relative",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ position: "absolute", top: 10, left: 30 }}>
          <StarSVG size={20} color={COLORS.blush} style={{ opacity: 0.4 }} />
        </div>
        <div style={{ position: "absolute", top: 60, right: 24 }}>
          <StarSVG size={14} color={COLORS.sage} style={{ opacity: 0.3 }} />
        </div>
        <div style={{ position: "absolute", bottom: 20, left: 50 }}>
          <StarSVG size={10} color={COLORS.gold} style={{ opacity: 0.25 }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <HatSVG size={60} color={COLORS.cognac} />
        </div>

        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 14,
          color: COLORS.textMuted,
          letterSpacing: "4px",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}>
          Amanda's Nashville Bach
        </p>

        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.text,
          margin: "0 0 4px",
          lineHeight: 1.1,
          fontStyle: "italic",
        }}>
          Saddlin' Up
        </h1>
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 20,
          color: COLORS.cognac,
          margin: "0 0 4px",
          letterSpacing: "2px",
        }}>
          &
        </p>
        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.text,
          margin: "0 0 16px",
          lineHeight: 1.1,
          fontStyle: "italic",
        }}>
          Settlin' Down
        </h1>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <BootSVG size={28} color={COLORS.cognac} />
        </div>

        <div style={{
          display: "inline-block",
          background: COLORS.white,
          borderRadius: 20,
          padding: "10px 24px",
          border: `1px solid ${COLORS.sandLight}`,
        }}>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.cognac,
            margin: 0,
          }}>
            May 28 – 31, 2026
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.textMuted,
            margin: "2px 0 0",
          }}>
            Nashville, Tennessee
          </p>
        </div>
      </div>

      <div style={{
        padding: "0 20px 20px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: 20,
          padding: 20,
          border: `1px solid ${COLORS.champagne}`,
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}>
          <h3 style={{
            fontFamily: FONTS.display,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.text,
            margin: "0 0 14px",
            textAlign: "center",
          }}>
            The Roundup
          </h3>

          {[
            { day: "Thursday", date: "May 28", desc: "Arrivals & East Nashville night out", emoji: "🛬" },
            { day: "Friday",   date: "May 29", desc: "Downtown brunch, Pedal Tavern & Broadway", emoji: "👢" },
            { day: "Saturday", date: "May 30", desc: "Chill, waterfall hike & pool party", emoji: "🌊" },
            { day: "Sunday",   date: "May 31", desc: "Fly home", emoji: "✈️" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: i < 3 ? `1px solid ${COLORS.champagne}` : "none",
            }}>
              <span style={{ fontSize: 20, width: 30, textAlign: "center" }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{
                    fontFamily: FONTS.display,
                    fontSize: 15,
                    fontWeight: 600,
                    color: COLORS.text,
                  }}>
                    {item.day}
                  </span>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: 11,
                    color: COLORS.textMuted,
                  }}>
                    {item.date}
                  </span>
                </div>
                <p style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  color: COLORS.textLight,
                  margin: "2px 0 0",
                }}>
                  {item.desc}
                </p>
              </div>
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
        <h3 style={{
          fontFamily: FONTS.display,
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          margin: "0 0 14px",
        }}>
          The Posse
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { name: "Amanda",  role: "The Bride", emoji: "👰" },
            { name: "Jess",    role: "MOH",       emoji: "🌸" },
            { name: "Leslie",  role: "",          emoji: "💃" },
            { name: "Ella",    role: "",          emoji: "🌺" },
            { name: "Vanessa", role: "",          emoji: "🌷" },
            { name: "Burlyn",  role: "",          emoji: "🌻" },
            { name: "Jandee",  role: "",          emoji: "🤠" },
            { name: "Niraj",   role: "",          emoji: "🎉" },
          ].map((g, i) => (
            <div key={i} style={{
              background: i === 0 ? COLORS.blushPale : COLORS.white,
              borderRadius: 14,
              padding: "12px 14px",
              border: `1px solid ${i === 0 ? COLORS.blushLight : COLORS.champagne}`,
              textAlign: "center",
            }}>
              <span style={{ fontSize: 22 }}>{g.emoji}</span>
              <p style={{
                fontFamily: FONTS.display,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.text,
                margin: "4px 0 0",
              }}>
                {g.name}
              </p>
              {g.role && (
                <p style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: COLORS.blush,
                  margin: "2px 0 0",
                  fontWeight: 600,
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
    <PageHeader title="Thursday" subtitle="May 28 · Arrival Day" emoji="🛬" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="3:37 PM"
        title="Jess & Vanessa Land"
        icon="✈️"
        description="First arrivals at BNA. Jess grabs the Alamo rental car."
      />
      <TimeBlock
        time="4:00 PM"
        title="Check Into Airbnb"
        icon="🏠"
        description="Drop bags, settle in, freshen up."
        highlight
      />
      <TimeBlock
        time="4:43 PM"
        title="Amanda & Ella Land"
        icon="👰"
        description="The bride has arrived!"
      />
      <TimeBlock
        time="TBD"
        title="Leslie Arrives"
        icon="💃"
        description="Time TBD — joining us Thursday."
      />
      <TimeBlock
        time="Pre-dinner"
        title="Walmart / Instacart Run"
        icon="🛒"
        description="Stock the Airbnb — snacks, breakfast stuff, drinks. Order ahead via Instacart or stop at Walmart on the way in."
      />
      <TimeBlock
        time="Evening"
        title="East Nashville Night"
        icon="🌆"
        description="Dinner + cocktails + dive bars."
      />
    </div>

    <InfoCard title="Dinner" icon="🍜">
      <p style={{
        fontFamily: FONTS.display,
        fontSize: 16,
        fontWeight: 600,
        color: COLORS.cognac,
        margin: "0 0 4px",
      }}>
        Hawkers Asian Street Food
      </p>
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

    <InfoCard title="Cocktails" icon="🍸">
      <VenueCard name="Attaboy" desc="Speakeasy-style cocktails — no menu, just tell them what you like." emoji="🥃" highlight />
    </InfoCard>

    <InfoCard title="Bars After" icon="🍻">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <VenueCard name="Lakeside Lounge" desc="Chill vibes, lake views" emoji="🌅" />
        <VenueCard name="Hubba Hubba" desc="Funky dive bar energy" emoji="🎵" />
      </div>
    </InfoCard>
  </div>
);

const FridayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader title="Friday" subtitle="May 29 · The Big Day Out" emoji="👢" />

    <InfoCard title="Dress Code" icon="👗">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: "0 0 10px",
        lineHeight: 1.5,
      }}>
        Downtown day — coordinated looks. <strong>Denim Day</strong> with <strong>pink mustaches</strong> for everyone.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <DresscodeTag label="Amanda: White" color={COLORS.textMuted} />
        <DresscodeTag label="Crew: Gold & Pink" color={COLORS.gold} />
        <DresscodeTag label="Denim Welcome" color="#5B7DB1" />
        <DresscodeTag label="Pink Mustaches 🥸" color={COLORS.blush} />
      </div>
    </InfoCard>

    <div style={{ padding: "8px 0" }}>
      <TimeBlock
        time="6:00 AM"
        title="Burlyn Lands"
        icon="🛬"
        description="Early bird arrival."
      />
      <TimeBlock
        time="AM"
        title="Jandee & Niraj Drive In"
        icon="🚗"
        description="Hitting Nashville Friday morning."
      />
      <TimeBlock
        time="Early"
        title="🤫 Surprise Decor Setup"
        icon="🎀"
        description="Jess, Leslie, Jandee & Niraj decorate the Airbnb while Amanda is still 😴."
        highlight
      />
      <TimeBlock
        time="10:00 AM"
        title="Brunch at Bacco"
        icon="🥂"
        description="Reservation for the group. Hand out BINGO cards to the ladies!"
      />
      <TimeBlock
        time="11:30 AM"
        title="Line Dance Lessons"
        icon="💃"
        description="Category 10 — free! Class runs ~11:30 to 1:30. Warm up for tonight."
      />
      <TimeBlock
        time="1:50 PM"
        title="Arrive at Pedal Tavern"
        icon="🍺"
        description="$72 pp (gratuity included). Tour departs 2:20 PM — be there by 1:50."
        highlight
      />
      <TimeBlock
        time="4:15 PM"
        title="Early Dinner"
        icon="🌅"
        description="The Hampton Social Rooftop — reservation at 4:15."
      />
      <TimeBlock
        time="Evening"
        title="Drop Car & Freshen Up"
        icon="🏠"
        description="Back to the Airbnb, change clothes, regroup for Broadway."
      />
      <TimeBlock
        time="Night"
        title="Broadway Night Out"
        icon="🎶"
        description="The main event — honky-tonks all the way down Lower Broadway."
      />
    </div>

    <InfoCard title="Broadway Lineup" icon="🎤">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <VenueCard name="Tootsies Orchid Lounge" desc="Classic honky-tonk, cold drinks" emoji="🍻" />
        <VenueCard name="Category 10" desc="Line dancing — round two!" emoji="💃" />
        <VenueCard name="Robert's Western World" desc="Recession Special late-night snack 🌭" emoji="🤠" highlight />
      </div>
    </InfoCard>
  </div>
);

const SaturdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader title="Saturday" subtitle="May 30 · Chill & Adventure" emoji="🏞️" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="Morning"
        title="Sleep In"
        icon="😴"
        description="Recovery mode. Take it easy."
      />
      <TimeBlock
        time="Late AM"
        title="Breakfast at the Airbnb"
        icon="🍳"
        description="Jess is on breakfast duty. Refuel before the hike."
        highlight
      />
      <TimeBlock
        time="Afternoon"
        title="Hike & Waterfall Swim"
        icon="🏔️"
        description="Fall Creek Falls State Park. Bring swimsuits, towels, water, sunscreen, and hiking shoes."
        highlight
        link="https://tnstateparks.com/parks/fall-creek-falls"
        linkText="Park info →"
      />
      <TimeBlock
        time="Late PM"
        title="Late Lunch"
        icon="🍜"
        description="Kyuramen — takeout option available if we're worn out."
      />
      <TimeBlock
        time="Evening"
        title="Steak Dinner at the Airbnb"
        icon="🥩"
        description="Grill steaks & veggies. Home-cooked group dinner."
      />
      <TimeBlock
        time="Night"
        title="Pool Party & Game Night"
        icon="🎲"
        description="Close out the night poolside — bring games."
        highlight
      />
    </div>

    <InfoCard title="Packing Reminder" icon="🎒">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Hiking shoes", "Swimsuit", "Towel", "Sunscreen", "Bug spray", "Water bottle"].map((item, i) => (
          <span key={i} style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 20,
            background: COLORS.sagePale,
            fontFamily: FONTS.body,
            fontSize: 12,
            color: COLORS.sageDark,
            fontWeight: 500,
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
    <PageHeader title="Sunday" subtitle="May 31 · Adios, Nashville" emoji="✈️" />

    <div style={{ padding: "16px 0" }}>
      <TimeBlock
        time="7:00 AM"
        title="Burlyn Departs"
        icon="🛫"
        description="Early flight out."
      />
      <TimeBlock
        time="11:00 AM"
        title="Check Out of Airbnb"
        icon="🏠"
        description="Pack up, tidy up, head out by 11."
        highlight
      />
      <TimeBlock
        time="5:43 PM"
        title="Vanessa Departs"
        icon="🛫"
        description="Last flight out."
      />
      <TimeBlock
        time="Anytime"
        title="Jandee & Niraj Drive Home"
        icon="🚗"
        description="Hitting the road whenever."
      />
    </div>

    <InfoCard title="Departures" icon="🛫">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <GuestRow name="Burlyn"          info="7:00 AM flight" emoji="🌻" />
        <GuestRow name="Vanessa"         info="5:43 PM flight" emoji="🌷" />
        <GuestRow name="Jandee & Niraj"  info="Driving home"   emoji="🚗" />
        <GuestRow name="Amanda, Jess, Ella, Leslie" info="See your own itineraries" emoji="✈️" />
      </div>
    </InfoCard>

    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{ marginBottom: 12 }}>
        <StarSVG size={28} color={COLORS.blush} />
      </div>
      <p style={{
        fontFamily: FONTS.display,
        fontSize: 22,
        fontWeight: 700,
        fontStyle: "italic",
        color: COLORS.text,
        margin: "0 0 8px",
      }}>
        She's all saddled up!
      </p>
      <p style={{
        fontFamily: FONTS.accent,
        fontSize: 15,
        color: COLORS.textLight,
        margin: 0,
        fontStyle: "italic",
      }}>
        Now let's get her settled down. 💍
      </p>
    </div>
  </div>
);

const DetailsPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 90 }}>
    <PageHeader title="Details" subtitle="Need-to-Know Info" emoji="📋" />

    <div style={{ padding: "16px 0" }}>
      <InfoCard title="Airbnb" icon="🏡">
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 6px",
          lineHeight: 1.6,
        }}>
          Max 6 guests · <strong>$952 total</strong> ($159 pp).
        </p>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 10px",
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
              padding: "8px 18px",
              background: COLORS.cognac,
              color: COLORS.white,
              borderRadius: 20,
              fontFamily: FONTS.body,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
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
              padding: "8px 18px",
              background: COLORS.white,
              color: COLORS.cognac,
              border: `1px solid ${COLORS.cognac}`,
              borderRadius: 20,
              fontFamily: FONTS.body,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Backup Listing
          </a>
        </div>
      </InfoCard>

      <InfoCard title="Rental Car" icon="🚗">
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

      <InfoCard title="Arrivals" icon="🛬">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <GuestRow name="Amanda"  info="Thu · 4:43 PM"     emoji="👰" />
          <GuestRow name="Jess"    info="Thu · 3:37 PM"     emoji="🌸" />
          <GuestRow name="Leslie"  info="Thursday (TBD)"    emoji="💃" />
          <GuestRow name="Ella"    info="Thu · 4:43 PM"     emoji="🌺" />
          <GuestRow name="Vanessa" info="Thu · 3:37 PM"     emoji="🌷" />
          <GuestRow name="Burlyn"  info="Fri · 6:00 AM"     emoji="🌻" />
          <GuestRow name="Jandee"  info="Driving · Fri AM"  emoji="🤠" />
          <GuestRow name="Niraj"   info="Driving · Fri AM"  emoji="🎉" />
        </div>
      </InfoCard>

      <InfoCard title="Departures" icon="🛫">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <GuestRow name="Burlyn"  info="Sun · 7:00 AM"   emoji="🌻" />
          <GuestRow name="Vanessa" info="Sun · 5:43 PM"   emoji="🌷" />
          <GuestRow name="Jandee & Niraj" info="Driving home Sunday" emoji="🚗" />
        </div>
      </InfoCard>

      <InfoCard title="Cost Breakdown" icon="💰">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { item: "Airbnb",        cost: "$159 pp" },
            { item: "Rental Car",    cost: "$72 pp" },
            { item: "Pedal Tavern",  cost: "$72 pp" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: COLORS.champagne,
              borderRadius: 8,
            }}>
              <span style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: COLORS.text,
              }}>
                {row.item}
              </span>
              <span style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.cognac,
              }}>
                {row.cost}
              </span>
            </div>
          ))}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 14px",
            background: COLORS.blushPale,
            borderRadius: 8,
            borderTop: `2px solid ${COLORS.blushLight}`,
          }}>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
            }}>
              Running total
            </span>
            <span style={{
              fontFamily: FONTS.display,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.cognac,
            }}>
              $303 pp
            </span>
          </div>
        </div>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          color: COLORS.textMuted,
          margin: "10px 0 0",
          fontStyle: "italic",
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
