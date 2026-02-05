import { useState, useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/cade-daitadynamics/new-meeting";

const insights = [
  {
    area: "QA Call Scoring",
    tag: "High Impact",
    tagColor: "#dc2626",
    icon: "🎧",
    problem:
      "~20 part-time QA staff manually review 50–450 calls per agency per month. Scorecards live in isolated Excel files with no way to compare, aggregate, or generate reports.",
    risk: "Two agencies have already dropped your QA services in favor of AI-only tools. This trend will accelerate.",
    opportunity:
      "An AI-assisted scoring system could handle first-pass reviews with confidence ratings — flagging only edge cases for human review. This lets you scale to 3–5× volume with the same team and positions Moetivations as the AI-powered QA provider, not the one being replaced by AI.",
  },
  {
    area: "Employee Onboarding",
    tag: "Quick Win",
    tagColor: "#0d9488",
    icon: "📋",
    problem:
      "~40 steps across 6–7 people, tracked via Excel spreadsheets on SharePoint. No single source of truth — duplicate files, missed handoffs, and zero real-time visibility into where each hire stands.",
    risk: "3–4 week onboarding cycle limits how fast you can scale. Doubled workload would create immediate bottlenecks.",
    opportunity:
      "A custom onboarding orchestration tool that auto-assigns tasks, tracks status across all stakeholders, and sends intelligent reminders when steps are overdue or blocked.",
  },
  {
    area: "RFP Generation",
    tag: "Revenue Driver",
    tagColor: "#7c3aed",
    icon: "📄",
    problem:
      "Each RFP is complex, highly variable, and created under tight deadlines. Sales staff can't fully copy previous RFPs — each one requires significant custom work with zero room for error.",
    risk: "Sales team falls behind on RFPs, potentially losing contracts or submitting under pressure with mistakes.",
    opportunity:
      "An AI-powered RFP agent that drafts proposals from templates and past contracts, auto-fills standard sections, and flags inconsistencies before submission. We're actively building this exact tool for another government staffing firm.",
  },
  {
    area: "Certification & Compliance",
    tag: "Risk Reduction",
    tagColor: "#d97706",
    icon: "🔒",
    problem:
      "One person manages all certifications in a silo — tracking expiration dates, renewals, and agency-specific requirements manually. Sensitive PII means this can't be broadly distributed.",
    risk: "A single missed certification could mean a dispatcher can't work, an agency loses trust, or a compliance violation occurs.",
    opportunity:
      "Automated cert monitoring with expiration alerts, renewal workflows, and secure document delivery — reducing single-point-of-failure risk while maintaining strict access controls.",
  },
  {
    area: "Executive Visibility",
    tag: "Strategic",
    tagColor: "#2563eb",
    icon: "📊",
    problem:
      "Mo is the integration layer for the entire business — every decision, every status update, every approval flows through her. There's no dashboard or unified view of operations.",
    risk: "This bottleneck limits growth and means critical information lives in Mo's head, emails, and scattered spreadsheets.",
    opportunity:
      "A unified operations dashboard giving real-time visibility across onboarding, QA, sales pipeline, and compliance — so Mo can lead strategically instead of chasing status updates.",
  },
];

const timelineSteps = [
  {
    phase: "Week 1–2",
    title: "Discovery & Interviews",
    desc: "Interview every key stakeholder. Understand workflows from the people who live them daily.",
  },
  {
    phase: "Week 2–3",
    title: "Systems & Data Audit",
    desc: "Map your tools, data flows, spreadsheets, and processes. Identify friction and gaps.",
  },
  {
    phase: "Week 3–4",
    title: "Solution Roadmap",
    desc: "Deliver a prioritized roadmap with impact scores, effort estimates, and a recommended starting point.",
  },
];

function useOnScreen(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible, end]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Proposal() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'Source Serif 4', 'Georgia', serif",
        color: "#1a2332",
        background: "#fff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #0b1a2e 0%, #132d50 40%, #1a3f6f 100%)",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "820px",
            padding: "60px 32px",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#60a5fa",
                marginBottom: "28px",
              }}
            >
              Prepared for Moetivations
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1
              style={{
                fontSize: "clamp(36px, 5.5vw, 62px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#fff",
                margin: "0 0 28px 0",
                letterSpacing: "-0.02em",
              }}
            >
              We found 5 major
              <br />
              opportunities in{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #60a5fa, #38bdf8, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                40 minutes.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              style={{
                fontSize: "clamp(17px, 2vw, 20px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                maxWidth: "640px",
                margin: "0 auto 40px",
                fontStyle: "italic",
              }}
            >
              Imagine what we'd uncover after interviewing your entire team,
              documenting every workflow, and auditing your data systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <a
              href="#insights"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#60a5fa",
                textDecoration: "none",
                letterSpacing: "0.5px",
                padding: "12px 0",
                borderBottom: "2px solid rgba(96,165,250,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              See what we found ↓
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTEXT BAR ── */}
      <section
        style={{
          background: "#f7f9fc",
          borderBottom: "1px solid #e5e9f0",
        }}
      >
        <div
          style={{
            maxWidth: "1060px",
            margin: "0 auto",
            padding: "48px 32px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {[
            { value: 40, suffix: " min", label: "Discovery Call" },
            { value: 5, suffix: "", label: "Opportunities Found" },
            { value: 6, suffix: "+", label: "Teams Impacted" },
            { value: 100, suffix: "+", label: "Employees Affected" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", minWidth: "140px" }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "38px",
                    fontWeight: 700,
                    color: "#1a3f6f",
                    lineHeight: 1,
                  }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#7b8ba3",
                    marginTop: "8px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section
        id="insights"
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: "80px 32px",
        }}
      >
        <FadeIn>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: "12px",
            }}
          >
            What We Heard
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 16px 0",
              letterSpacing: "-0.015em",
            }}
          >
            Five areas where AI can
            <br />
            transform your operations
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#5a6a80",
              lineHeight: 1.7,
              maxWidth: "620px",
              margin: "0 0 56px 0",
            }}
          >
            From a single 40-minute conversation with your team, we identified
            clear patterns of manual work, data silos, and scaling bottlenecks
            that AI and automation can address.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {insights.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? "#f8fafd" : "#fff",
                  border: `1px solid ${hoveredCard === i ? "#d0ddef" : "#e8ecf2"}`,
                  borderRadius: "16px",
                  padding: "36px 40px",
                  transition: "all 0.35s ease",
                  boxShadow:
                    hoveredCard === i
                      ? "0 8px 32px rgba(15,40,80,0.08)"
                      : "0 1px 4px rgba(15,40,80,0.04)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>{item.icon}</span>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      margin: 0,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.area}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: item.tagColor,
                      background: `${item.tagColor}12`,
                      padding: "5px 14px",
                      borderRadius: "100px",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                      }}
                    >
                      The Problem
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "#4a5568",
                        margin: 0,
                      }}
                    >
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                      }}
                    >
                      The Risk
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "#4a5568",
                        margin: 0,
                      }}
                    >
                      {item.risk}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "#2563eb",
                        marginBottom: "8px",
                      }}
                    >
                      The Opportunity
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "#1a2332",
                        margin: 0,
                        fontWeight: 450,
                      }}
                    >
                      {item.opportunity}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── THE PITCH ── */}
      <section
        style={{
          background:
            "linear-gradient(165deg, #0b1a2e 0%, #132d50 40%, #1a3f6f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto",
            padding: "80px 32px",
          }}
        >
          <FadeIn>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#60a5fa",
                marginBottom: "12px",
              }}
            >
              The Next Step
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
                margin: "0 0 20px 0",
                letterSpacing: "-0.015em",
              }}
            >
              The AI Readiness Assessment
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "660px",
                margin: "0 0 56px 0",
              }}
            >
              Everything above came from a single call with two team members.
              The full assessment goes deeper — interviewing your entire team,
              auditing your systems, and mapping every workflow — to build you a
              prioritized, actionable roadmap for AI and automation.
            </p>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "56px",
            }}
          >
            {timelineSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "32px 28px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#60a5fa",
                      marginBottom: "12px",
                    }}
                  >
                    {step.phase}
                  </div>
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "36px 40px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 20px 0",
                }}
              >
                What you'll receive:
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {[
                  "Complete workflow maps for every department",
                  "Prioritized solution matrix (impact vs. effort)",
                  "Specific AI & automation recommendations",
                  "Executive summary with ROI projections",
                  "Implementation roadmap with milestones",
                  "Team interview insights & pain point analysis",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#60a5fa",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "24px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "#fff",
          textAlign: "center",
          padding: "80px 32px 100px",
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 16px 0",
              letterSpacing: "-0.015em",
            }}
          >
            Ready to see the full picture?
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#5a6a80",
              maxWidth: "520px",
              margin: "0 auto 40px",
            }}
          >
            Let's schedule a 30-minute call to walk through these findings and
            discuss how the assessment would work for your team.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #1a3f6f, #2563eb)",
              padding: "18px 48px",
              borderRadius: "12px",
              textDecoration: "none",
              letterSpacing: "0.3px",
              boxShadow:
                "0 4px 20px rgba(37,99,235,0.3), 0 1px 3px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            Book a Call with Cade →
          </a>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#94a3b8",
              marginTop: "20px",
            }}
          >
            ~ 4 week assessment timeline · No obligation
          </p>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#f7f9fc",
          borderTop: "1px solid #e5e9f0",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Prepared by{" "}
          <span style={{ color: "#1a3f6f", fontWeight: 600 }}>
            Daita Dynamics
          </span>{" "}
          · February 2026
        </p>
      </footer>
    </div>
  );
}
