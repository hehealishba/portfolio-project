import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import DataEntryPage from "@/pages/DataEntryPage";
import PortfolioPage from "@/pages/PortfolioPage";
import { PortfolioProvider } from "@/context/PortfolioContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DataEntryPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioProvider>
        <Router />
        <Toaster />
      </PortfolioProvider>
    </QueryClientProvider>
  );
}

export default App;
