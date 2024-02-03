import { Link } from 'react-router-dom';
import Logo from '../components/logo';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[white]">
      <header className="px-2 sm:px-4 lg:px-6 h-12 sm:h-14 flex items-center">
        <Logo logoText="Hyg" />
      </header>
      <main className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 md:px-6">
        <section className="w-full max-w-xs sm:max-w-2xl py-6 sm:py-12 md:py-24 lg:py-32">
          <div className="space-y-4 sm:space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-blue-500">
              Welcome to Hygeia
            </h1>
            <p className="max-w-[300px] sm:max-w-[600px] mx-auto text-sm sm:text-lg text-gray-700 md:text-xl lg:text-2xl">
              Your health is our priority. Schedule a maternity checkup with our AI-powered system for a personalized
              experience.
            </p>
            <Link
              className="inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-blue-500 px-6 sm:px-8 text-sm sm:text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:blue-900"
              to="/signup"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <footer className="flex justify-center items-center h-12 sm:h-14 border-t border-blue-500">
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">© 2024 MaternityAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
