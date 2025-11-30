import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import App from "./App.tsx";
import { CartProvider } from "./components/CartProvider.tsx";
import { FeedbackProvider } from "./providers/FeedbackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <FeedbackProvider>
            <App />
          </FeedbackProvider>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
