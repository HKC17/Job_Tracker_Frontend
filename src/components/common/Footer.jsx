import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Job Application Tracker. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-600 hover:text-primary-600 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-primary-600 text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-primary-600 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
