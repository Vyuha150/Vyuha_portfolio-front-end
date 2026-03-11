"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  Upload,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import type { LucideIcon } from "lucide-react";
import Cookies from "js-cookie";

export type Event = {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizerBio: string;
  organizerPhoto: string;
  platformLink?: string;
  fees: string;
  materials: string;
  isRecorded: boolean;
  image: string;
  category: string;
  mode: string;
  targetAudience: string;
  logo: string;
  inCollege: boolean;
  isVcc: boolean;
  college?: { _id: string; name: string } | null;
};

export default function VccEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user info
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const role = Cookies.get("role");
    setToken(authToken || null);
    setUserRole(role || null);
    
    if (authToken) {
      fetchUserInfo(authToken);
    }
  }, []);

  const fetchUserInfo = async (authToken: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch VCC events
  useEffect(() => {
    const fetchVccEvents = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const role = Cookies.get("role");
        
        // Only VCC members can access the protected VCC endpoint
        // All others (including logged-in non-VCC users) use the public endpoint
        const url = (authToken && role === "vcc-member") 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/events/vcc`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/events/vcc/public`;
        
        const headers = (authToken && role === "vcc-member")
          ? { Authorization: `Bearer ${authToken}` }
          : {};

        const response = await axios.get(url, { headers });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching VCC events:", error);
        // If there's an error, try the public endpoint as fallback
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          try {
            const fallbackResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/events/vcc/public`
            );
            setEvents(fallbackResponse.data);
          } catch (fallbackError) {
            console.error("Error fetching public VCC events:", fallbackError);
            setEvents([]);
          }
        } else {
          setEvents([]);
        }
      }
    };

    fetchVccEvents();
  }, [userRole]);

  const categories = [...new Set(events.map((event) => event.category))];

  useEffect(() => {
    setEvents((prevEvents) =>
      [...prevEvents].sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      })
    );
  }, [sortBy]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has vcc-member role
    if (!token || !user || userRole !== "vcc-member") {
      alert("You must be a VCC member to register for VCC events.");
      if (!token) {
        router.push("/auth/sign-in");
      }
      return;
    }

    // Show confirmation and proceed
    const confirmed = window.confirm(
      `Are you sure you want to register for "${selectedEvent?.name}"?`
    );
    
    if (!confirmed) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/register`,
        {
          eventId: selectedEvent?._id,
          useLoggedInUser: true,
          message: formData.message || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert("Registration successful!");
        setIsModalOpen(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else if (error.response && error.response.status === 403) {
        alert(error.response.data.message);
      } else {
        console.error("Error registering for event:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter && categoryFilter !== "all"
      ? event.category === categoryFilter
      : true;
    const matchesMode = modeFilter && modeFilter !== "all" 
      ? event.mode === modeFilter 
      : true;
    const matchesDate = dateFilter
      ? new Date(event.date).toDateString() === dateFilter.toDateString()
      : true;

    return matchesSearch && matchesCategory && matchesMode && matchesDate;
  });

  const openRegistrationModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen py-20 px-4 md:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            VCC Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Exclusive events for VCC members. Connect, learn, and grow with like-minded individuals in your community.
          </p>
          {userRole !== "vcc-member" && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-orange-300">
                <strong>Note:</strong> VCC Events are exclusive to VCC members. 
                {!token && " Please log in and join VCC to register for these events."}
                {token && userRole !== "vcc-member" && " You need to be a VCC member to register for these events."}
              </p>
            </div>
          )}
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-orange-500/30 text-white placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mode Filter */}
          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-black/50 border-orange-500/30 text-white hover:bg-orange-500/10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/50 border-orange-500/30 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Clear Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
              setModeFilter("");
              setDateFilter(undefined);
              setSortBy("date");
            }}
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="overflow-hidden bg-black text-white hover:shadow-orange-500/50 transition-all duration-300">
                  <div className="aspect-video">
                    <img
                      src={event.image || '/placeholder-event.jpg'}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-event.jpg';
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg font-bold line-clamp-2">
                        {event.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">
                          VCC
                        </span>
                        {event.inCollege && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                            College
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="mr-2 h-4 w-4" />
                        {event.organizer}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/vcc-events/${event._id}`}
                        className="text-orange-400 hover:text-orange-300 text-sm"
                      >
                        View Details
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => openRegistrationModal(event)}
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={userRole !== "vcc-member"}
                      >
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No VCC events found matching your criteria.</p>
            </div>
          )}
        </motion.div>

        {/* Registration Modal */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md border border-orange-500">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Register for {selectedEvent.name}
              </h2>
              
              {token && user && userRole === "vcc-member" ? (
                // VCC member confirmation
                <div className="space-y-4">
                  <p className="text-gray-300">
                    You are logged in as a VCC member. We'll use your account information to register you for this event.
                  </p>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any additional message"
                      rows={3}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="text-black border-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleRegister} 
                      className="bg-orange-500 text-white"
                    >
                      Confirm Registration
                    </Button>
                  </div>
                </div>
              ) : (
                // Not a VCC member
                <div className="space-y-4">
                  <p className="text-red-300">
                    {!token 
                      ? "You need to be logged in as a VCC member to register for VCC events."
                      : "You need to be a VCC member to register for VCC events."
                    }
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="text-black border-gray-300"
                    >
                      Cancel
                    </Button>
                    {!token && (
                      <Button
                        onClick={() => {
                          router.push("/auth/sign-in");
                        }}
                        className="bg-orange-500 text-white"
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
