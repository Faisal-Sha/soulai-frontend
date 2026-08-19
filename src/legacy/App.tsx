import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Quiz funnel — lazy-loaded, full-screen, no Navbar/Footer
const QuizPage = lazy(() => import("./pages/QuizPage"));

import { ThemeProvider } from "next-themes";
import { AnalyticsProvider } from "./contexts/AnalyticsContext";
import Index from "./pages/Index";
import Compatibility from "./pages/Compatibility";
import CompatibilityResult from "./pages/CompatibilityResult";
import CompatibilityReportPage from "./pages/CompatibilityReportPage";
import PremiumWelcome from "./pages/PremiumWelcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import RatesPage from "./pages/Rates";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Calculator from "@/pages/Calculator";
import AvatarPage from "./pages/AvatarPage";
import DiaryPage from "./pages/DiaryPage";
import NotesPage from "./pages/NotesPage";
import AccountPage from "./pages/AccountPage";
import AccountPlanPage from "./pages/AccountPlanPage";
import AccountNotificationsPage from "./pages/AccountNotificationsPage";
import AccountKnowPage from "./pages/AccountKnowPage";
import AccountKnowAnswerPage from "./pages/AccountKnowAnswerPage";
import UserLayout from "./components/UserLayout";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { UserProvider } from "./contexts/UserContext";
import UpsellPage from "./pages/UpsellPage";
import ReadingPage from "./pages/ReadingPage";
import ReadingsPage from "./pages/ReadingsPage";
import PatternChapterPage from "./pages/PatternChapterPage";
import PeoplePage from "./pages/PeoplePage";
import PeopleAddPage from "./pages/PeopleAddPage";
import PeopleGeneratePage from "./pages/PeopleGeneratePage";
import PeopleReportPage from "./pages/PeopleReportPage";
import PeopleSharePage from "./pages/PeopleSharePage";
import DownloadReportPage from "./pages/DownloadReportPage";
import ProcessingPage from "./pages/ProcessingPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import AgentPage from "./pages/AgentPage";
import { MentorReadyPage, NotificationsOnboardingPage } from "./pages/ActivationShell";
import { useUser } from "./hooks/useUser";

const queryClient = new QueryClient();

// Inner component so we can use useLocation inside BrowserRouter
function AppRoutes() {
  const location = useLocation();
  const { user, loading: userLoading } = useUser();
  const isQuiz = location.pathname.startsWith("/quiz");
  const isAdmin = location.pathname.startsWith("/admin");
  const isReading = location.pathname === "/reading";
  const isDownloadReport = location.pathname === "/download-report";
  const isAgent = location.pathname === "/agent";
  const isReadings = location.pathname.startsWith("/readings");
  const isPeople = location.pathname.startsWith("/people");
  const isAccount = location.pathname.startsWith("/account");
  const isLoggedInHome =
    location.pathname === "/" && (userLoading || !!user);

  // UX lifecycle (FigJam): GET CLIENT → ACTIVATION → RETENTION
  // See src/product/uxFlowMap.ts for the canonical screen map.
  return (
    <>
      {/* GET CLIENT (quiz) + ACTIVATION (reading / PDF): full-screen, no Navbar/Footer */}
      {isQuiz || isReading || isDownloadReport ? (
        <Routes>
          <Route
            path="/quiz/*"
            element={
              <Suspense fallback={null}>
                <QuizPage />
              </Suspense>
            }
          />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/download-report" element={<DownloadReportPage />} />
        </Routes>
      ) : isAgent || isLoggedInHome || isReadings || isPeople || isAccount ? (
        /* RETENTION · SOUL Home / Chat / Readings / People / Account — full-screen */
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/agent"
            element={
              <ProtectedRoute>
                <AgentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/readings"
            element={
              <ProtectedRoute>
                <ReadingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/readings/your-pattern"
            element={
              <ProtectedRoute>
                <PatternChapterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people"
            element={
              <ProtectedRoute>
                <PeoplePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people/add"
            element={
              <ProtectedRoute>
                <PeopleAddPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people/generate/:personId"
            element={
              <ProtectedRoute>
                <PeopleGeneratePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people/:personId/share"
            element={
              <ProtectedRoute>
                <PeopleSharePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people/:personId"
            element={
              <ProtectedRoute>
                <PeopleReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/plan"
            element={
              <ProtectedRoute>
                <AccountPlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/notifications"
            element={
              <ProtectedRoute>
                <AccountNotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/know/:questionId"
            element={
              <ProtectedRoute>
                <AccountKnowAnswerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/know"
            element={
              <ProtectedRoute>
                <AccountKnowPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : isAdmin ? (
        /* Admin: full-screen, no Navbar/Footer — admin has its own header */
        <Routes>
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Routes>
      ) : (
        <>
          <Navbar />
          <main className="pt-10 min-h-screen overflow-x-hidden max-w-full">
            <Routes>
              {/* RETENTION · HOME hub (+ public landing/calculator) */}
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              {/* RETENTION · Compatibility */}
              <Route path="/compatibility" element={<Compatibility />} />
              <Route path="/compatibility/report/:id" element={
                <ProtectedRoute>
                  <CompatibilityReportPage />
                </ProtectedRoute>
              } />
              <Route path="/premium-welcome" element={<PremiumWelcome />} />
              {/* GET CLIENT · alternate paywall entry */}
              <Route path="/rates" element={<RatesPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              {/* ACTIVATION · frontend shells (mentor ready · notifications) */}
              <Route path="/activation/mentor" element={<MentorReadyPage />} />
              <Route path="/activation/notifications" element={<NotificationsOnboardingPage />} />
              {/* ACTIVATION · post-payment — no auth guard (guest session may not exist yet) */}
              <Route path="/upsell" element={<UpsellPage />} />
              <Route path="/processing" element={<ProcessingPage />} />
              <Route path="/set-password" element={<SetPasswordPage />} />
              <Route path="/reset-password" element={<SetPasswordPage />} />
              <Route element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                {/* RETENTION · saved matrices / account */}
                <Route path="/avatar" element={<AvatarPage />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/dashboard" element={<AvatarPage />} />
              </Route>
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <UserProvider>
            <AnalyticsProvider>
              <AppRoutes />
            </AnalyticsProvider>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
