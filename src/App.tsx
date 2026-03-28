import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-foreground dark:text-foreground-dark mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground dark:text-muted-dark-foreground mb-4">
            {this.state.error}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: '' });
              window.location.href = '/recipes';
            }}
            className="text-sm text-accent hover:underline"
          >
            Go back to Recipes
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
        <Header />
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/recipes" replace />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="*" element={<Navigate to="/recipes" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}