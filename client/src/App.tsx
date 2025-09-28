import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import pages
import Home from "@/pages/Home";
import CicloCarbonio from "@/pages/CicloCarbonio";
import Quiz from "@/pages/Quiz";
import Infografiche from "@/pages/Infografiche";
import EducazioneCivica from "@/pages/EducazioneCivica";
import CittadinoConsapevole from "@/pages/CittadinoConsapevole";
import LettereScienza from "@/pages/LettereScienza";
import Bibliografia from "@/pages/Bibliografia";
import NotFound from "@/pages/not-found";

// Import layout components
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ciclo-carbonio" component={CicloCarbonio} />
      <Route path="/quiz" component={Quiz} />
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;