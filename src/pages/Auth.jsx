import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        result = await signup(formData.name, formData.email, formData.password);
      }
      if (result.success) navigate(from, { replace: true });
      else setError(result.error);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div style={styles.page}>
      {/* Subtle background decoration */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Left branding panel */}
        <div style={styles.brandPanel}>
          <div style={styles.brandContent}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <h1 style={{ ...styles.brandTitle, margin: 0 }}>
                Disaster<span style={{ color: '#fff', opacity: 0.8 }}>Watch</span>
              </h1>
            </Link>
            <p style={styles.brandSub}>
              Real-time weather intelligence & disaster prediction powered by AI
            </p>
            <div style={styles.brandStats}>
              <div style={styles.brandStatItem}>
                <span style={styles.brandStatNum}>24/7</span>
                <span style={styles.brandStatLabel}>Monitoring</span>
              </div>
              <div style={styles.brandStatDivider} />
              <div style={styles.brandStatItem}>
                <span style={styles.brandStatNum}>500+</span>
                <span style={styles.brandStatLabel}>Cities</span>
              </div>
              <div style={styles.brandStatDivider} />
              <div style={styles.brandStatItem}>
                <span style={styles.brandStatNum}>99%</span>
                <span style={styles.brandStatLabel}>Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div style={styles.formPanel}>
          <div style={styles.formInner}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>
                {isLogin ? 'Welcome back' : 'Get started'}
              </h2>
              <p style={styles.formSubtitle}>
                {isLogin
                  ? 'Sign in to access your dashboard'
                  : 'Create an account to get started'}
              </p>
            </div>

            {/* Toggle tabs */}
            <div style={styles.tabRow}>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                style={isLogin ? styles.tabActive : styles.tab}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                style={!isLogin ? styles.tabActive : styles.tab}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name</label>
                  <div style={styles.inputWrap}>
                    <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      style={styles.input}
                    />
                  </div>
                </div>
              )}

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email address</label>
                <div style={styles.inputWrap}>
                  <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrap}>
                  <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={{ ...styles.input, paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div style={styles.errorBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={styles.spinner} />
                    Processing...
                  </span>
                ) : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p style={styles.switchText}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button type="button" onClick={toggleMode} style={styles.switchLink}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes auth-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes auth-float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 25px); }
        }
        .auth-input:focus {
          outline: none;
          border-color: #ea580c !important;
          box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1) !important;
        }
        .auth-submit:hover:not(:disabled) {
          background: #c2410c !important;
          box-shadow: 0 6px 20px rgba(234, 88, 12, 0.35) !important;
          transform: translateY(-1px);
        }
        .auth-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .auth-tab:hover {
          color: #9a3412 !important;
          background: rgba(234, 88, 12, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
    animation: 'auth-float 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(234, 88, 12, 0.06) 0%, transparent 70%)',
    bottom: '-80px',
    left: '-80px',
    animation: 'auth-float2 10s ease-in-out infinite',
    pointerEvents: 'none',
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '880px',
    minHeight: '540px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.06)',
    position: 'relative',
    zIndex: 1,
  },

  // Left brand panel
  brandPanel: {
    flex: '0 0 340px',
    background: 'linear-gradient(160deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 36px',
    position: 'relative',
    overflow: 'hidden',
  },
  brandContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  logoMark: {
    width: '56px',
    height: '56px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    backdropFilter: 'blur(8px)',
  },
  brandTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 8px',
    fontFamily: "'Outfit', system-ui, sans-serif",
    letterSpacing: '-0.02em',
  },
  brandSub: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 36px',
    lineHeight: '1.5',
  },
  brandStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px 16px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '14px',
    backdropFilter: 'blur(8px)',
  },
  brandStatItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  brandStatNum: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Outfit', system-ui, sans-serif",
  },
  brandStatLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.65)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: '500',
  },
  brandStatDivider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255,255,255,0.2)',
  },

  // Right form panel
  formPanel: {
    flex: 1,
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
  },
  formInner: {
    width: '100%',
    maxWidth: '360px',
  },
  formHeader: {
    marginBottom: '28px',
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#171717',
    margin: '0 0 6px',
    fontFamily: "'Outfit', system-ui, sans-serif",
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#737373',
    margin: 0,
  },

  // Tabs
  tabRow: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    background: '#f5f5f5',
    borderRadius: '10px',
    marginBottom: '24px',
  },
  tab: {
    flex: 1,
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#737373',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    flex: 1,
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    background: '#ea580c',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)',
    transition: 'all 0.2s',
  },

  // Form fields
  fieldGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#404040',
    marginBottom: '6px',
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a3a3a3',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '10px 12px 10px 40px',
    fontSize: '14px',
    color: '#171717',
    background: '#fafafa',
    border: '1.5px solid #e5e5e5',
    borderRadius: '10px',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
    className: 'auth-input',
  },
  eyeBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#a3a3a3',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Error
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '10px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    fontSize: '13px',
    marginBottom: '18px',
  },

  // Submit
  submitBtn: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    background: '#ea580c',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '4px',
    fontFamily: 'inherit',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'auth-spin 0.6s linear infinite',
  },

  // Switch text
  switchText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#737373',
    marginTop: '20px',
  },
  switchLink: {
    background: 'none',
    border: 'none',
    color: '#ea580c',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '13px',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    padding: 0,
    fontFamily: 'inherit',
  },
};

export default Auth;
