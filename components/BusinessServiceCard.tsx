import React from "react";
import Link from "next/link";

interface BusinessServiceCardProps {
  title: string;
  items: string[];
  links?: string[];
  image: string;
  actionButton?: {
    text: string;
    href: string;
  };
}

const BusinessServiceCard: React.FC<BusinessServiceCardProps> = ({
  title,
  items,
  links,
  actionButton,
  image,
}) => (
  <div className="bg-black/40 backdrop-blur-sm border border-orange-500/30 shadow-2xl relative overflow-hidden hover:shadow-orange-500/25 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-pulse-glow rounded-xl p-6 mb-6 group flex flex-col h-full">
    {/* Card image - placeholder */}
    <img
      src={image}
      alt="Service Placeholder"
      className="w-full h-60 object-cover rounded-lg mb-4 border border-orange-500/20 shadow-md"
    />
    <h3 className="text-xl font-bold text-orange-500 mb-3 group-hover:text-orange-400 transition-colors duration-300 drop-shadow-lg">
      {title}
    </h3>
    <ul className="text-gray-200 space-y-3 mb-4 flex-grow">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="text-base flex items-start gap-3 group-hover:text-gray-100 transition-colors duration-300"
        >
          <div
            className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex-shrink-0 
                          shadow-sm shadow-orange-500/50 mt-2"
          ></div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <div className="space-y-4 mt-auto">
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link, lidx) => (
            <a
              key={lidx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-1 bg-orange-500/80 hover:bg-orange-500 text-white rounded-full 
                         text-sm font-medium transition-all duration-300 shadow-lg shadow-orange-500/20 
                         hover:shadow-orange-500/40 hover:scale-105 border border-orange-500/40 
                         hover:border-orange-500/60"
            >
              {link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          ))}
        </div>
      )}
      {actionButton && (
        <Link
          href={actionButton.href}
          className="inline-flex items-center justify-center w-full px-6 py-3 
                     bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                     text-white rounded-lg font-medium transition-all duration-300 
                     shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:shadow-xl
                     ring-2 ring-orange-500/30 hover:ring-orange-500/50
                     transform hover:scale-105 active:scale-95"
        >
          {actionButton.text}
        </Link>
      )}
    </div>
  </div>
);

export default BusinessServiceCard;
