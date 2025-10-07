import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import pages
import Home from "@/pages/Home";
import CicloCarbonio from "@/pages/CicloCarbonio";
import ElementoChimico from "@/pages/ElementoChimico";
import Quiz from "@/pages/Quiz";
import QuizCollaborativo from "@/pages/QuizCollaborativo";
import QuizAdminSimple from "@/pages/QuizAdminSimple";
import Infografiche from "@/pages/Infografiche";
import EducazioneCivica from "@/pages/EducazioneCivica";
import CittadinoConsapevole from "@/pages/CittadinoConsapevole";
import LettereScienza from "@/pages/LettereScienza";
import Bibliografia from "@/pages/Bibliografia";
import NotFound from "@/pages/not-found";

// Import layout components
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ciclo-carbonio" component={CicloCarbonio} />
      <Route path="/elemento-chimico" component={ElementoChimico} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/quiz-collaborativo" component={QuizCollaborativo} />
      <Route path="/quiz-admin" component={QuizAdminSimple} />
      <Route path="/infografiche" component={Infografiche} />
      <Route path="/educazione-civica" component={EducazioneCivica} />
      <Route path="/cittadino-consapevole" component={CittadinoConsapevole} />
      <Route path="/lettere-scienza" component={LettereScienza} />
      <Route path="/bibliografia" component={Bibliografia} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Usa il BASE_URL generato da Vite come base del router (es. '/ciclo-del-carbonio/' su GH Pages, '/' su Vercel)
  const base = (import.meta as any).env?.BASE_URL
    ? ((import.meta as any).env.BASE_URL as string).replace(/\/$/, "")
    : "/";
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={base}>
          <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;