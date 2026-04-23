"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  /* ---------------- DESKTOP STATE ---------------- */
  const [appsHover, setAppsHover] = useState(false);
  const [appsLocked, setAppsLocked] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [servicesLocked, setServicesLocked] = useState(false);
  const [resourcesHover, setResourcesHover] = useState(false);
  const [resourcesLocked, setResourcesLocked] = useState(false);
  const [softwareHover, setSoftwareHover] = useState(false);
  const [softwareLocked, setSoftwareLocked] = useState(false);
  const [signHover, setSignHover] = useState(false);
  const [signLocked, setSignLocked] = useState(false);

  const appsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const resourcesRef = useRef<HTMLDivElement | null>(null);
  const softwareRef = useRef<HTMLDivElement | null>(null);
  const signRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- MOBILE STATE ---------------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<
    "main" | "services" | "apps" | "resources"
  >("main");
  const [mounted, setMounted] = useState(false);

  /* ---------------- PATHNAME ---------------- */
  const pathname = usePathname();

  /* ---------------- RESET ALL STATES ---------------- */
  const resetAllStates = useCallback(() => {
    setAppsHover(false);
    setAppsLocked(false);
    setServicesHover(false);
    setServicesLocked(false);
    setResourcesHover(false);
    setResourcesLocked(false);
    setSoftwareHover(false);
    setSoftwareLocked(false);
    setSignHover(false);
    setSignLocked(false);
    setMobileMenu("main");
    setMobileOpen(false);
  }, []);

  /* ---------------- RESET ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    resetAllStates();
    const timeout = setTimeout(resetAllStates, 10);
    return () => clearTimeout(timeout);
  }, [pathname]);

  /* ---------------- BFCACHE RESTORE (pageshow) ---------------- */
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setTimeout(resetAllStates, 0);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  /* ---------------- VISIBILITY CHANGE SAFETY NET ---------------- */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetAllStates();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /* ---------------- CLICK OUTSIDE TO CLOSE ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) {
        setAppsLocked(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesLocked(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesLocked(false);
      }
      if (softwareRef.current && !softwareRef.current.contains(e.target as Node)) {
        setSoftwareLocked(false);
      }
      if (signRef.current && !signRef.current.contains(e.target as Node)) {
        setSignLocked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- MOUNTED FLAG ---------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- BODY SCROLL LOCK ---------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---------------- OPEN LOGIC ---------------- */
  const appsOpen = appsHover || appsLocked;
  const isServicesOpen = servicesHover || servicesLocked;
  const resourcesOpen = resourcesHover || resourcesLocked;
  const softwareOpen = softwareHover || softwareLocked;
  const signOpen = signHover || signLocked;

  /* ---------------- MOBILE CLOSE ---------------- */
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenu("main");
  };

  /* ---------------- MOBILE MENU PORTAL ---------------- */
  const mobileMenuPortal =
    mounted && mobileOpen
      ? createPortal(
          <div
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "white",
              overflowY: "auto",
              maxHeight: "100vh",
              width: "100%",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <img
                src="/TemplatesLogo.png"
                alt="Templates Logo"
                className="h-14"
              />
              <button onClick={closeMobile} aria-label="Close menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ width: 28, height: 28, color: "#111827" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* MAIN MENU */}
            {mobileMenu === "main" && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <button
                  onClick={() => setMobileMenu("services")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Services <span style={{ fontSize: 20 }}>›</span>
                </button>
                <button
                  onClick={() => setMobileMenu("apps")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Apps <span style={{ fontSize: 20 }}>›</span>
                </button>
                <button
                  onClick={() => setMobileMenu("resources")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Resources <span style={{ fontSize: 20 }}>›</span>
                </button>
                <Link href="/pricing"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in-method"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Method:CRM
                </Link>
                <Link
                  href="/my-account"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  My Account
                </Link>
                <Link
                  href="/book-demo"
                  style={{
                    marginTop: 8,
                    backgroundColor: "#2563eb",
                    color: "white",
                    textAlign: "center",
                    padding: "12px 0",
                    borderRadius: 8,
                    fontSize: 18,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Book a Demo
                </Link>
              </div>
            )}

            {/* SERVICES SUBMENU */}
            {mobileMenu === "services" && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <button
                  onClick={() => setMobileMenu("main")}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 14,
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: 8,
                  }}
                >
                  ‹ Back
                </button>
                <Link
                  href="/customization"
                  className="block px-4 py-2 hover:bg-gray-100"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Customization
                </Link>
                <Link
                  href="/website-design"
                  className="block px-4 py-2 hover:bg-gray-100"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Website Design
                </Link>
              </div>
            )}

            {/* APPS SUBMENU */}
            {mobileMenu === "apps" && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <button
                  onClick={() => setMobileMenu("main")}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 14,
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: 8,
                  }}
                >
                  ‹ Back
                </button>

                {/* FRONT END */}
                <div>
                  <Link
                    href="/front-end"
                    onClick={closeMobile}
                    style={{
                      fontWeight: 600,
                      marginBottom: 12,
                      fontSize: 16,
                      color: "#111827",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Front End
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      paddingLeft: 12,
                    }}
                  >
                    {[
                      { label: "Customer Portal", link: "/customer-portal" },
                      { label: "Online Shop", link: "/online-shop" },
                      { label: "Book Appointment", link: "/book-appointment" },
                      { label: "Transactions", link: "/transactions" },
                      { label: "Events", link: "/events" },
                      { label: "Reminders", link: "/reminders" },
                      { label: "Forms", link: "/forms" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.link}
                        onClick={closeMobile}
                        style={{
                          fontSize: 17,
                          color: "#111827",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* BACK END */}
                <div>
                  <Link
                    href="/back-end"
                    onClick={closeMobile}
                    style={{
                      fontWeight: 600,
                      marginBottom: 12,
                      fontSize: 16,
                      color: "#111827",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Back End
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      paddingLeft: 12,
                    }}
                  >
                    {[
                      { label: "Careers", link: "/careers" },
                      { label: "Scheduling", link: "/scheduling" },
                      { label: "Work Orders", link: "/work-orders" },
                      { label: "Sales Orders", link: "/sales-orders" },
                      { label: "Inventory", link: "/inventory" },
                      { label: "Payroll", link: "/payroll" },
                      { label: "Tasks", link: "/tasks" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.link}
                        onClick={closeMobile}
                        style={{
                          fontSize: 17,
                          color: "#111827",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* INTEGRATIONS */}
                <div>
                  <Link
                    href="/integrations"
                    onClick={closeMobile}
                    style={{
                      fontWeight: 600,
                      marginBottom: 12,
                      fontSize: 16,
                      color: "#111827",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Integrations
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      paddingLeft: 12,
                    }}
                  >
                    {[
                      { label: "Google Workspace", link: "/google-workspace" },
                      { label: "Shipment Tracking", link: "/shipment-tracking" },
                      { label: "QuickBooks", link: "/quickbooks" },
                      { label: "Xero", link: "/xero" },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.link}
                        onClick={closeMobile}
                        style={{
                          fontSize: 17,
                          color: "#111827",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RESOURCES SUBMENU */}
            {mobileMenu === "resources" && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <button
                  onClick={() => setMobileMenu("main")}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 14,
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: 8,
                  }}
                >
                  ‹ Back
                </button>
                <a
                  href="https://www.method.me/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Method:CRM
                </a>
                <a href="https://quickbooks.intuit.com/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  QuickBooks
                </a>
                <Link href="/xero"
                  className="block px-4 py-2 hover:bg-gray-100"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                  }}
                >
                  Xero
                </Link>
              </div>
            )}
          </div>,
          document.body
        )
      : null;

  /* ---------------- COMPONENT ---------------- */
  return (
    <>
      <nav className="w-full py-4 bg-white border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto w-full h-20 px-6 flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <img
                src="/TemplatesLogo.png"
                alt="Templates Logo"
                height={56}
                width={210}
              />
            </Link>

            {/* DESKTOP NAV — order: Services, Apps, Software, Resources, Pricing */}
            <div className="hidden md:flex items-center gap-8 text-gray-700">

              {/* SERVICES */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesHover(true)}
                onMouseLeave={() => setServicesHover(false)}
              >
                <Link href="/services" className="nav-item flex items-center gap-1">
                  Services
                  <span className={`text-xs opacity-50 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}>▾</span>
                </Link>

                {isServicesOpen && (
                  <div className="absolute left-0 top-full w-48 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
                    <Link
                      href="/customization"
                      onClick={() => setServicesLocked(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Customization
                    </Link>
                    <Link
                      href="/website-design"
                      onClick={() => setServicesLocked(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Website Design
                    </Link>
                  </div>
                )}
              </div>

              {/* APPS */}
              <div
                ref={appsRef}
                className="relative"
                onMouseEnter={() => setAppsHover(true)}
                onMouseLeave={() => setAppsHover(false)}
              >
                <Link href="/apps" className="nav-item flex items-center gap-1">
                  Apps
                  <span className={`text-xs opacity-50 transition-transform ${appsOpen ? "rotate-180" : ""}`}>▾</span>
                </Link>

                {appsOpen && (
                  <div className="absolute left-0 top-full w-[600px] bg-white shadow-lg border border-gray-200 rounded-md p-4 z-50 grid grid-cols-3 gap-6">

                    {/* FRONT END */}
                    <div>
                      <Link
                        href="/front-end"
                        onClick={() => setAppsLocked(false)}
                        className="font-semibold text-gray-900 mb-2 block hover:underline"
                      >
                        Front End
                      </Link>
                      <ul className="space-y-1 text-gray-700">
                        {[
                          { label: "Customer Portal", link: "/customer-portal" },
                          { label: "Online Shop", link: "/online-shop" },
                          { label: "Book Appointment", link: "/book-appointment" },
                          { label: "Transactions", link: "/transactions" },
                          { label: "Events", link: "/events" },
                          { label: "Reminders", link: "/reminders" },
                          { label: "Forms", link: "/forms" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.link}
                            onClick={() => setAppsLocked(false)}
                            className="block px-2 py-1 hover:bg-gray-100"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </ul>
                    </div>

                    {/* BACK END */}
                    <div>
                      <Link
                        href="/back-end"
                        onClick={() => setAppsLocked(false)}
                        className="font-semibold text-gray-900 mb-2 block hover:underline"
                      >
                        Back End
                      </Link>
                      <ul className="space-y-1 text-gray-700">
                        {[
                          { label: "Human Resources", link: "/human-resources" },
                          { label: "Scheduling", link: "/scheduling" },
                          { label: "Work Orders", link: "/work-orders" },
                          { label: "Sales Orders", link: "/sales-orders" },
                          { label: "Inventory", link: "/inventory" },
                          { label: "Payroll", link: "/payroll" },
                          { label: "Tasks", link: "/tasks" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.link}
                            onClick={() => setAppsLocked(false)}
                            className="block px-2 py-1 hover:bg-gray-100"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </ul>
                    </div>

                    {/* INTEGRATIONS */}
                    <div>
                      <Link
                        href="/integrations"
                        onClick={() => setAppsLocked(false)}
                        className="font-semibold text-gray-900 mb-2 block hover:underline"
                      >
                        Integrations
                      </Link>
                      <ul className="space-y-1 text-gray-700">
                        {[
                          { label: "Google Workspace", link: "/google-workspace" },
                          { label: "Shipment Tracking", link: "/shipment-tracking" },
                          { label: "QuickBooks", link: "/quickbooks" },
                          { label: "Xero", link: "/xero" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.link}
                            onClick={() => setAppsLocked(false)}
                            className="block px-2 py-1 hover:bg-gray-100"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}
              </div>

              {/* SOFTWARE */}
              <div
                ref={softwareRef}
                className="relative"
                onMouseEnter={() => setSoftwareHover(true)}
                onMouseLeave={() => setSoftwareHover(false)}
              >
                <Link href="/software" className="nav-item flex items-center gap-1">
                  Software
                  <span className={`text-xs opacity-50 transition-transform ${softwareOpen ? "rotate-180" : ""}`}>▾</span>
                </Link>

                {softwareOpen && (
                  <div className="absolute left-0 top-full w-40 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
                    <a
                      href="https://www.method.me/"
                      onClick={() => setSoftwareLocked(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Method:CRM
                    </a>
                    <a
                      href="https://quickbooks.intuit.com/"
                      onClick={() => setSoftwareLocked(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      QuickBooks
                    </a>
                    <a
                      href="https://www.xero.com/ca/"
                      onClick={() => setSoftwareLocked(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Xero
                    </a>
                  </div>
                )}
              </div>

              {/* RESOURCES */}
              <div
                ref={resourcesRef}
                className="relative"
                onMouseEnter={() => setResourcesHover(true)}
                onMouseLeave={() => setResourcesHover(false)}
              >
                <Link href="/resources" className="nav-item flex items-center gap-1">
                  Resources
                  <span className={`text-xs opacity-50 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}>▾</span>
                </Link>

                {resourcesOpen && (
  <div className="absolute left-0 top-full w-[240px] bg-white shadow-lg border border-gray-200 rounded-md p-2 z-50">

    <ul className="space-y-1 text-gray-700">
      {[
        { label: "Setup Guide", link: "/setup" },
        { label: "Best Practices", link: "/best-practices" },
        { label: "Video Library", link: "https://www.youtube.com/@MethodCRM" },
        { label: "API Reference", link: "https://developer.method.me/" },
        { label: "Help Center", link: "https://help.method.me/en/" },
        { label: "Customization Docs", link: "https://www.method.me/crm-quickbooks/custom-crm-software/" },
        { label: "Free Method:CRM Trial", link: "https://grow.method.me/method-crm-partner-demo/" }
      ].map((item) => (
        <Link
          key={item.label}
          href={item.link}
          onClick={() => setResourcesLocked(false)}
          className="block px-2 py-1 hover:bg-gray-100 rounded whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </ul>

  </div>
)} </div>

              {/* PRICING */}
              <a
                href="/pricing"
                className="px-4 py-2 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden md:flex items-center gap-4">
            <div
              ref={signRef}
              className="relative"
              onMouseEnter={() => setSignHover(true)}
              onMouseLeave={() => setSignHover(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSignLocked((prev) => !prev);
                }}
                className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-900 font-medium flex items-center gap-1 transition ${
                  signOpen ? "bg-gray-100 border-gray-400" : ""
                }`}
              >
                Sign In
                <span
                  className={`text-xs opacity-70 transition-transform ${
                    signOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {signOpen && (
                <div className="absolute right-0 top-full w-48 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
                  <a
                    href="/sign-in-method"
                    onClick={() => setSignLocked(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    Method:CRM
                  </a>
                  <a
                    href="/my-account"
                    onClick={() => setSignLocked(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    My Account
                  </a>
                </div>
              )}
            </div>
            <a
              href="/book-demo"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm"
            >
              Book a Demo
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="flex md:!hidden p-3 text-gray-900"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuPortal}
    </>
  );
}