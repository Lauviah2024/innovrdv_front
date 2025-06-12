
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import AppointmentBooking from "./pages/AppointmentBooking";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import ContactPage from "./pages/Contact";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";
import { APP_ROUTES } from "./configs";
import { PrivateOutlet } from "./lib";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<AppointmentBooking />} />
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/confirmation" element={<Confirmation />} />

          <Route path="/auth/login" element={<Login />} />

          <Route element={<PrivateOutlet />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
