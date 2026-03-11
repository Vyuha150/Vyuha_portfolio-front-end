"use client";

import React from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  link: string;
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-black border border-gray-700 rounded-lg shadow-lg p-4 hover:shadow-orange-500/20 transition-all">
      {/* Resource Title */}
      <h2 className="text-lg font-bold text-white mb-2">{resource.title}</h2>

      {/* Resource Type */}
      <span className="text-sm text-gray-400 mb-4 block">{resource.type}</span>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4">{resource.description}</p>

      {/* Action Button */}
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
      >
        View Resource
      </a>
    </div>
  );
}
