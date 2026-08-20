import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { UserProvider } from "./hooks/useUser";
import { SoulHomeScreen } from "./pages/home/SoulHomeScreen";
import QuizShell from "./pages/quiz/QuizShell";
import { SoulReadingsScreen } from "./pages/readings/SoulReadingsScreen";
import { SoulPatternChapterScreen } from "./pages/readings/SoulPatternChapterScreen";
import { SoulPeopleScreen } from "./pages/people/SoulPeopleScreen";
import { SoulPeopleAddScreen } from "./pages/people/SoulPeopleAddScreen";
import { SoulPeopleGenerateScreen } from "./pages/people/SoulPeopleGenerateScreen";
import { SoulPeopleReportScreen } from "./pages/people/SoulPeopleReportScreen";
import { SoulPeopleShareScreen } from "./pages/people/SoulPeopleShareScreen";
import { SoulAccountScreen } from "./pages/account/SoulAccountScreen";
import { SoulAccountPlanScreen } from "./pages/account/SoulAccountPlanScreen";
import { SoulAccountNotificationsScreen } from "./pages/account/SoulAccountNotificationsScreen";
import { SoulAccountKnowScreen } from "./pages/account/SoulAccountKnowScreen";
import { SoulAccountKnowAnswerScreen } from "./pages/account/SoulAccountKnowAnswerScreen";
import { SoulLoginScreen } from "./pages/auth/SoulLoginScreen";
import { SoulLoginEmailScreen } from "./pages/auth/SoulLoginEmailScreen";
import { SoulLoginCheckScreen } from "./pages/auth/SoulLoginCheckScreen";
import { SoulForgotPasswordScreen } from "./pages/auth/SoulForgotPasswordScreen";
import { AuthCallbackScreen } from "./pages/auth/AuthCallbackScreen";
import AgentPage from "./pages/agent/AgentPage";
import Contact from "./pages/legal/Contact";
import FAQ from "./pages/legal/FAQ";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Route map for the live v2 app.
 * Each domain lives under `src/pages/<domain>/` with co-located css, assets, hooks, and components.
 * V1 archive: `src/legacy/`
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SoulHomeScreen />} />

      <Route path="/quiz" element={<Navigate to="/quiz/welcome" replace />} />
      <Route path="/quiz/*" element={<QuizShell />} />

      <Route path="/agent" element={<AgentPage />} />

      <Route path="/readings" element={<SoulReadingsScreen />} />
      <Route path="/readings/your-pattern" element={<SoulPatternChapterScreen />} />

      <Route path="/people" element={<SoulPeopleScreen />} />
      <Route path="/people/add" element={<SoulPeopleAddScreen />} />
      <Route path="/people/generate/:personId" element={<SoulPeopleGenerateScreen />} />
      <Route path="/people/:personId/share" element={<SoulPeopleShareScreen />} />
      <Route path="/people/:personId" element={<SoulPeopleReportScreen />} />

      <Route path="/login" element={<SoulLoginScreen />} />
      <Route path="/login/email" element={<SoulLoginEmailScreen />} />
      <Route path="/login/check" element={<SoulLoginCheckScreen />} />
      <Route path="/login/callback" element={<AuthCallbackScreen />} />
      <Route path="/login/link" element={<Navigate to="/login/email" replace />} />
      <Route path="/forgot-password" element={<SoulForgotPasswordScreen />} />
      <Route path="/auth" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Navigate to="/quiz/welcome" replace />} />

      <Route path="/account" element={<SoulAccountScreen />} />
      <Route path="/account/plan" element={<SoulAccountPlanScreen />} />
      <Route path="/account/notifications" element={<SoulAccountNotificationsScreen />} />
      <Route path="/account/know" element={<SoulAccountKnowScreen />} />
      <Route path="/account/know/:questionId" element={<SoulAccountKnowAnswerScreen />} />

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
