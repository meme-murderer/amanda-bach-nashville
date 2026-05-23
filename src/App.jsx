import { useState, useEffect } from "react";

const COLORS = {
  blush: "#D4A5A8",
  blushLight: "#EBD0D2",
  blushPale: "#F9EFEF",
  sage: "#9EAD8B",
  sageDark: "#6E7E5E",
  sagePale: "#EEF2E8",
  cognac: "#8B5E3C",
  cognacDark: "#6B4828",
  sand: "#C4A882",
  sandLight: "#E0D4BD",
  champagne: "#F5F0E6",
  ivory: "#FBF8F2",
  cream: "#F8F3EB",
  gold: "#B89968",
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
};

// ============== ATOMS ==============

const Hairline = ({ color = COLORS.hairline, margin = "20px auto", width = 40 }) => (
  <div style={{
    height: 1,
    width,
    background: color,
    margin,
  }} />
);

const Kicker = ({ children, color = COLORS.cognac, size = 10, mb = 8 }) => (
  <p style={{
    fontFamily: FONTS.body,
    fontSize: size,
    fontWeight: 600,
    color,
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    margin: `0 0 ${mb}px`,
  }}>
    {children}
  </p>
);

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
    padding: "56px 24px 36px",
    background: COLORS.ivory,
  }}>
    {kicker && <Kicker mb={14}>{kicker}</Kicker>}
    <h2 style={{
      fontFamily: FONTS.display,
      fontSize: 44,
      color: COLORS.text,
      margin: 0,
      fontWeight: 400,
      fontStyle: "italic",
      letterSpacing: "-1.2px",
      lineHeight: 1.05,
    }}>
      {title}
    </h2>
    {subtitle && (
      <>
        <Hairline color={COLORS.sandLight} margin="22px auto 18px" width={36} />
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 16,
          color: COLORS.textLight,
          margin: 0,
          fontStyle: "italic",
          letterSpacing: "0.5px",
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
    gap: 18,
    padding: "20px 24px",
    borderBottom: `1px solid ${COLORS.hairline}`,
    background: highlight ? COLORS.blushPale : "transparent",
  }}>
    <div style={{ minWidth: 66, textAlign: "right", paddingTop: 5 }}>
      <span style={{
        fontFamily: FONTS.body,
        fontSize: 10,
        fontWeight: 700,
        color: COLORS.cognac,
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
        {title}
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

const VenueCard = ({ name, desc, highlight }) => (
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
      {name}
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
          margin: "0 0 8px",
          lineHeight: 1,
          fontStyle: "italic",
          letterSpacing: "-2px",
        }}>
          Saddlin' Up
        </h1>
        <p style={{
          fontFamily: FONTS.accent,
          fontSize: 32,
          color: COLORS.cognac,
          margin: "4px 0",
          letterSpacing: "2px",
          fontStyle: "italic",
          fontWeight: 300,
        }}>
          &
        </p>
        <h1 style={{
          fontFamily: FONTS.display,
          fontSize: 56,
          fontWeight: 400,
          color: COLORS.text,
          margin: "8px 0 0",
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
            Eight Riders
          </h3>
          <Hairline color={COLORS.sandLight} margin="22px auto 24px" width={36} />
        </div>

        {[
          { name: "Amanda",  role: "The Bride" },
          { name: "Jess",    role: "Maid of Honor" },
          { name: "Leslie",  role: "" },
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
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100 }}>
    <PageHeader kicker="Day One" title="Thursday" subtitle="May 28 · Arrival Day" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="3:37 PM" title="Jess & Vanessa Land"  description="First arrivals at BNA. Jess grabs the Alamo rental car." />
      <TimeBlock time="4:00 PM" title="Check Into Airbnb"    description="Drop bags, settle in, freshen up." highlight />
      <TimeBlock time="4:43 PM" title="Amanda & Ella Land"   description="The bride has arrived." />
      <TimeBlock time="TBD"     title="Leslie Arrives"       description="Time TBD — joining us Thursday." />
      <TimeBlock time="Pre-dinner" title="Walmart / Instacart Run" description="Stock the Airbnb — snacks, breakfast, drinks. Order ahead via Instacart or stop at Walmart on the way in." />
      <TimeBlock time="Evening" title="East Nashville Night" description="Dinner, cocktails, dive bars." />
    </div>

    <InfoCard kicker="Dinner" title="Hawkers Asian Street Food">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: 0,
        lineHeight: 1.6,
      }}>
        Shareable small plates, craft cocktails, and a vibrant atmosphere — perfect for the group's first night.
      </p>
    </InfoCard>

    <InfoCard kicker="Cocktails" title="Attaboy">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: 0,
        lineHeight: 1.6,
      }}>
        Speakeasy-style cocktails — no menu, just tell them what you like.
      </p>
    </InfoCard>

    <InfoCard kicker="Late Night" title="Bars After">
      <VenueCard name="Lakeside Lounge" desc="Chill vibes, lake views" />
      <VenueCard name="Hubba Hubba" desc="Funky dive bar energy" />
    </InfoCard>
  </div>
);

const FridayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100 }}>
    <PageHeader kicker="Day Two" title="Friday" subtitle="May 29 · The Big Day Out" />

    <InfoCard kicker="What To Wear" title="Dress Code">
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        color: COLORS.textLight,
        margin: "0 0 14px",
        lineHeight: 1.6,
      }}>
        Downtown day, coordinated looks. <em>Denim welcome</em> with <em>pink mustaches</em> for everyone.
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
      <TimeBlock time="Early"    title="Surprise Decor Setup"       description="Jess, Leslie, Jandee & Niraj decorate the Airbnb while Amanda is still asleep." highlight />
      <TimeBlock time="10:00 AM" title="Brunch at Bacco"            description="Reservation for the group. Hand out BINGO cards to the ladies." />
      <TimeBlock time="11:30 AM" title="Line Dance Lessons"         description="Category 10 — free. Class runs ~11:30 to 1:30. Warm up for tonight." />
      <TimeBlock time="1:50 PM"  title="Arrive at Pedal Tavern"     description="$72 pp (gratuity included). Tour departs 2:20 PM — be there by 1:50." highlight />
      <TimeBlock time="4:15 PM"  title="Early Dinner"               description="The Hampton Social Rooftop — reservation at 4:15." />
      <TimeBlock time="Evening"  title="Drop Car & Freshen Up"      description="Back to the Airbnb, change clothes, regroup for Broadway." />
      <TimeBlock time="Night"    title="Broadway Night Out"         description="The main event — honky-tonks all the way down Lower Broadway." />
    </div>

    <InfoCard kicker="The Main Event" title="Broadway Lineup">
      <VenueCard name="Tootsies Orchid Lounge" desc="Classic honky-tonk, cold drinks" />
      <VenueCard name="Category 10" desc="Line dancing — round two" />
      <VenueCard name="Robert's Western World" desc="Recession Special late-night snack" highlight />
    </InfoCard>
  </div>
);

const SaturdayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100 }}>
    <PageHeader kicker="Day Three" title="Saturday" subtitle="May 30 · Chill & Adventure" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="Morning"   title="Sleep In"                  description="Recovery mode. Take it easy." />
      <TimeBlock time="Late AM"   title="Breakfast at the Airbnb"   description="Jess is on breakfast duty. Refuel before the hike." highlight />
      <TimeBlock
        time="Afternoon"
        title="Hike & Waterfall Swim"
        description="Fall Creek Falls State Park. Bring swimsuits, towels, water, sunscreen, and hiking shoes."
        highlight
        link="https://tnstateparks.com/parks/fall-creek-falls"
        linkText="Park info"
      />
      <TimeBlock time="Late PM"   title="Late Lunch"                description="Kyuramen — takeout option available if we're worn out." />
      <TimeBlock time="Evening"   title="Steak Dinner at the Airbnb" description="Grill steaks & veggies. Home-cooked group dinner." />
      <TimeBlock time="Night"     title="Pool Party & Game Night"   description="Close out the night poolside — bring games." highlight />
    </div>

    <InfoCard kicker="Don't Forget" title="Packing Reminder">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {["Hiking shoes", "Swimsuit", "Towel", "Sunscreen", "Bug spray", "Water bottle"].map((item, i) => (
          <DresscodeTag key={i} label={item} color={COLORS.sageDark} />
        ))}
      </div>
    </InfoCard>
  </div>
);

const SundayPage = () => (
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100 }}>
    <PageHeader kicker="Day Four" title="Sunday" subtitle="May 31 · Adios, Nashville" />

    <div style={{ padding: "0 0 24px" }}>
      <TimeBlock time="7:00 AM"  title="Burlyn Departs"            description="Early flight out." />
      <TimeBlock time="11:00 AM" title="Check Out of Airbnb"       description="Pack up, tidy up, head out by 11." highlight />
      <TimeBlock time="5:43 PM"  title="Vanessa Departs"           description="Last flight out." />
      <TimeBlock time="Anytime"  title="Jandee & Niraj Drive Home" description="Hitting the road whenever." />
    </div>

    <InfoCard kicker="Heading Home" title="Departures">
      <GuestRow name="Burlyn"          info="Sun · 7:00 AM" />
      <GuestRow name="Vanessa"         info="Sun · 5:43 PM" />
      <GuestRow name="Jandee & Niraj"  info="Driving home" />
      <GuestRow name="Amanda, Jess, Ella, Leslie" info="See your own" />
    </InfoCard>

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
  <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingBottom: 100 }}>
    <PageHeader kicker="The Logistics" title="Details" subtitle="Need-to-Know Info" />

    <div style={{ padding: "8px 0" }}>
      <InfoCard kicker="The House" title="Airbnb">
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 4px",
          lineHeight: 1.7,
        }}>
          Max 6 guests · <strong>$952 total</strong> ($159 pp)
        </p>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: COLORS.textLight,
          margin: "0 0 18px",
        }}>
          Check-in: 4:00 PM · Check-out: 11:00 AM
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="https://www.airbnb.com/rooms/1326215239593896193?viralityEntryPoint=1&s=76"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "11px 22px",
              background: COLORS.cognacDark,
              color: COLORS.white,
              fontFamily: FONTS.body,
              fontSize: 10,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "2px",
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
              padding: "11px 22px",
              background: "transparent",
              color: COLORS.cognacDark,
              border: `1px solid ${COLORS.cognacDark}`,
              fontFamily: FONTS.body,
              fontSize: 10,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "2px",
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
          lineHeight: 1.7,
        }}>
          Alamo rental. <strong>$72 per person.</strong> Jess picking up on arrival Thursday.
        </p>
      </InfoCard>

      <InfoCard kicker="Inbound" title="Arrivals">
        <GuestRow name="Amanda"  info="Thu · 4:43 PM" />
        <GuestRow name="Jess"    info="Thu · 3:37 PM" />
        <GuestRow name="Leslie"  info="Thursday TBD" />
        <GuestRow name="Ella"    info="Thu · 4:43 PM" />
        <GuestRow name="Vanessa" info="Thu · 3:37 PM" />
        <GuestRow name="Burlyn"  info="Fri · 6:00 AM" />
        <GuestRow name="Jandee"  info="Driving · Fri AM" />
        <GuestRow name="Niraj"   info="Driving · Fri AM" />
      </InfoCard>

      <InfoCard kicker="Outbound" title="Departures">
        <GuestRow name="Burlyn"  info="Sun · 7:00 AM" />
        <GuestRow name="Vanessa" info="Sun · 5:43 PM" />
        <GuestRow name="Jandee & Niraj" info="Driving Sun" />
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        html, body { background: ${COLORS.ivory}; overflow-x: hidden; }
        body { font-family: ${FONTS.body}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
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
