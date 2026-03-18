import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold tracking-tighter text-white">
                Disaster<span className="text-orange-500">Watch</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Protecting communities from natural disasters through intelligent weather prediction and real-time alerts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/what-we-do" className="text-gray-400 hover:text-white transition-colors">What We Do</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <EnvelopeIcon className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">contact@disasterwatch.com</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+91 1800-DISASTER</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Lovely Professional University, Punjab, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} DisasterWatch. All rights reserved. Capstone Project by LPU.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
