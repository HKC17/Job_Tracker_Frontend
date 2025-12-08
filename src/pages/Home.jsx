import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, BarChart3, Target, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Briefcase,
      title: "Track Applications",
      description: "Keep all your job applications organized in one place",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Visualize your job search progress with powerful charts",
    },
    {
      icon: Target,
      title: "Status Management",
      description: "Track application status from applied to offer",
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Simple interface to add and manage applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Job Application Tracker
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Take control of your job search journey
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="btn-primary text-lg px-8 py-3"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
