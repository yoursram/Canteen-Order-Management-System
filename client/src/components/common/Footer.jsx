import React from 'react';
import { Utensils, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand & Description */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white font-display">VJIT Canteen</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vidya Jyothi Institute of Technology (VJIT) Canteen Order Management System. Digitizing food orders for students, faculty, and campus guests.
          </p>
        </div>

        {/* Canteen Locations */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Campus Locations</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Main Canteen Counter (Block B Ground Floor)</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Hostel Block A Dining Hall</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Hostel Block B Dining Hall</span>
            </li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Operating Hours</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Breakfast: 7:30 AM – 10:30 AM</span>
            </li>
            <li className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Lunch Meals: 12:00 PM – 2:30 PM</span>
            </li>
            <li className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Snacks & Fast Food: 3:30 PM – 6:30 PM</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Campus Support</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>+91 98480 12345 (Main Counter)</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>canteen@vjit.ac.in</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Vidya Jyothi Institute of Technology (VJIT). All rights reserved. • Good Food. Quick Orders. Less Waiting.
      </div>
    </footer>
  );
};

export default Footer;
