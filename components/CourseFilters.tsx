"use client";

import React, { useState } from "react";
import { Filter, Clock, DollarSign, Video, Search } from "lucide-react";
import SearchBar from "./SearchBar";

interface FiltersProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    level: "",
    duration: "",
    price: "",
    format: "",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to the parent component
  };

  return (
    <div className="bg-black/50 border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 md:space-x-6 w-full">
      {/* Level Filter */}
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <Filter className="text-gray-400 w-4 h-4" />
          Level
        </label>
        <select
          value={filters.level}
          onChange={(e) => handleFilterChange("level", e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Duration Filter */}
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <Clock className="text-gray-400 w-4 h-4" />
          Duration
        </label>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Any Duration</option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <DollarSign className="text-gray-400 w-4 h-4" />
          Price
        </label>
        <select
          value={filters.price}
          onChange={(e) => handleFilterChange("price", e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Prices</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
          <option value="Subscription">Subscription</option>
        </select>
      </div>

      {/* Format Filter */}
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <Video className="text-gray-400 w-4 h-4" />
          Format
        </label>
        <select
          value={filters.format}
          onChange={(e) => handleFilterChange("format", e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Formats</option>
          <option value="Video">Video</option>
          <option value="Interactive">Interactive</option>
          <option value="Text-based">Text-based</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="flex-1 min-w-max">
        <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <Search className="text-gray-400 w-4 h-4" />
          Search
        </label>
        <SearchBar
          placeholder="Search courses..."
          onSearch={(query) => handleFilterChange("search", query)}
        />
      </div>
    </div>
  );
}
