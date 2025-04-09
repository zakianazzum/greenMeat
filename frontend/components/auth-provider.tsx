"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  user_type: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

// Export the useAuth hook
export const useAuth = () => useContext(AuthContext);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const userData = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("token");

      if (userData && token) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();

    // Add event listener for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Protect routes that require authentication
  useEffect(() => {
    if (!loading) {
      const publicRoutes = ["/", "/login", "/signup", "/forgot-password"];
      const isPublicRoute = publicRoutes.some((route) => pathname === route);

      if (!user && !isPublicRoute) {
        // Redirect to login if trying to access protected route without authentication
        router.push("/login");
      } else if (user) {
        // Redirect based on user type if they're on a dashboard they shouldn't access
        const userDashboard = `/dashboard/${user.user_type.toLowerCase().replace(" ", "-")}`;

        if (
          pathname.startsWith("/dashboard/") &&
          !pathname.startsWith(userDashboard) &&
          user.user_type !== "admin"
        ) {
          router.push(userDashboard);
        }
      }
    }
  }, [user, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
