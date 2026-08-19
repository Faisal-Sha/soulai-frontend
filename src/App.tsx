import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import { SoulHomeScreen } from "./features/home/SoulHomeScreen";
import QuizShell from "./features/quiz/QuizShell";
import { SoulReadingsScreen } from "./features/readings/SoulReadingsScreen";
import { SoulPatternChapterScreen } from "./features/readings/SoulPatternChapterScreen";
import { SoulPeopleScreen } from "./features/people/SoulPeopleScreen";
import { SoulPeopleAddScreen } from "./features/people/SoulPeopleAddScreen";
import { SoulPeopleGenerateScreen } from "./features/people/SoulPeopleGenerateScreen";
import { SoulPeopleReportScreen } from "./features/people/SoulPeopleReportScreen";
import { SoulPeopleShareScreen } from "./features/people/SoulPeopleShareScreen";
import { SoulAccountScreen } from "./features/account/SoulAccountScreen";
import { SoulAccountPlanScreen } from "./features/account/SoulAccountPlanScreen";
import { SoulAccountNotificationsScreen } from "./features/account/SoulAccountNotificationsScreen";
import { SoulAccountKnowScreen } from "./features/account/SoulAccountKnowScreen";
import { SoulAccountKnowAnswerScreen } from "./features/account/SoulAccountKnowAnswerScreen";
import AgentPage from "./pages/AgentPage";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * This file is the map of the live v2 app.
 *
 * Start at `/` (Home). Each screen has buttons that `navigate()` to the next path below.
 * Old v1 pages are not routed here. They live in `src/legacy/` as a self-contained archive.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Home — click Readings / People / Account / Agent from here */}
      <Route path="/" element={<SoulHomeScreen />} />

      {/* Quiz funnel */}
      <Route path="/quiz" element={<Navigate to="/quiz/welcome" replace />} />
      <Route path="/quiz/*" element={<QuizShell />} />

      {/* Chat */}
      <Route path="/agent" element={<AgentPage />} />

      {/* Readings */}
      <Route path="/readings" element={<SoulReadingsScreen />} />
      <Route path="/readings/your-pattern" element={<SoulPatternChapterScreen />} />

      {/* People */}
      <Route path="/people" element={<SoulPeopleScreen />} />
      <Route path="/people/add" element={<SoulPeopleAddScreen />} />
      <Route path="/people/generate/:personId" element={<SoulPeopleGenerateScreen />} />
      <Route path="/people/:personId/share" element={<SoulPeopleShareScreen />} />
      <Route path="/people/:personId" element={<SoulPeopleReportScreen />} />

      {/* Account */}
      <Route path="/account" element={<SoulAccountScreen />} />
      <Route path="/account/plan" element={<SoulAccountPlanScreen />} />
      <Route path="/account/notifications" element={<SoulAccountNotificationsScreen />} />
      <Route path="/account/know" element={<SoulAccountKnowScreen />} />
      <Route path="/account/know/:questionId" element={<SoulAccountKnowAnswerScreen />} />

      {/* Footer links used by the v2 screens */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
