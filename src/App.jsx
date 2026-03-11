import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { Navbar } from "./components/layout/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import RepoDetailPage from "./pages/RepoDetailPage";
import TrendingPage from "./pages/TrendingPage";
import BookmarksPage from "./pages/BookmarksPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard/:username" element={<DashboardPage />} />
                  <Route path="/repo/:username/:reponame" element={<RepoDetailPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "var(--surface2)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                  },
                }}
              />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </BookmarkProvider>
    </ThemeProvider>
  );
}