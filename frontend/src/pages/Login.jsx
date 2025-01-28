import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquareHeart } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImagePattern from '../components/ImagePattern'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* left side */}
      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-2 border border-white pb-7 pl-16 pr-16 py-7 rounded-xl">
          
          {/* logo and Headings */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-badge bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquareHeart className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>
          {/* ends */}

          {/* form starts */}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* E-Mail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="user@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>


            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            

            {/* Sumit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>

          </form>
          {/* form ends */}

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account? {" "}
              <Link to="/signup" className="link link-primary">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>


      {/* Right Side */}

      <ImagePattern 
        title = "Join Our Community"
        subtitle = "Connect with friends, share moments, and stay in touch with you loved ones."
      />

    </div>
  );
};

export default Login