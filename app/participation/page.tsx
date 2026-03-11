"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Trophy, Filter } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationLimit: number;
  registrations: Array<{
    _id: string;
    userId: string;
    eventId: string;
    createdAt: string;
  }>;
  inCollege: boolean;
  isVcc: boolean;
  college?: {
    name: string;
    code: string;
  };
}

interface ParticipationStats {
  totalEvents: number;
  vccEvents: number;
  collegeEvents: number;
  publicEvents: number;
}

export default function ParticipationPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<ParticipationStats>({
    totalEvents: 0,
    vccEvents: 0,
    collegeEvents: 0,
    publicEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "vcc" | "college" | "public">("all");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is VCC member
    const role = Cookies.get("role");
    const token = Cookies.get("authToken");
    
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }
    
    if (role !== "vcc-member") {
      router.push("/"); // Redirect non-VCC members
      return;
    }
    
    setUserRole(role);
    fetchParticipationData();
  }, [router]);

  const fetchParticipationData = async () => {
    try {
      const token = Cookies.get("authToken");
      const userId = Cookies.get("userId");
      
      if (!token || !userId) {
        router.push("/auth/sign-in");
        return;
      }

      // Fetch user's event registrations
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/user-registrations/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const participatedEvents = response.data.events || [];
      setEvents(participatedEvents);

      // Calculate stats
      const totalEvents = participatedEvents.length;
      const vccEvents = participatedEvents.filter((event: Event) => event.isVcc).length;
      const collegeEvents = participatedEvents.filter((event: Event) => event.inCollege && !event.isVcc).length;
      const publicEvents = participatedEvents.filter((event: Event) => !event.inCollege && !event.isVcc).length;

      setStats({
        totalEvents,
        vccEvents,
        collegeEvents,
        publicEvents,
      });
    } catch (error) {
      console.error("Error fetching participation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    switch (filter) {
      case "vcc":
        return event.isVcc;
      case "college":
        return event.inCollege && !event.isVcc;
      case "public":
        return !event.inCollege && !event.isVcc;
      default:
        return true;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (userRole !== "vcc-member") {
    return null; // Will redirect anyway
  }

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-white mt-4">Loading your participation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      {/* Header */}
      <div className="relative overflow-hidden py-16">
        {/* <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div> */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              My <span className="text-orange-500">Participation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track all the events you've participated in as a VCC member
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center"
          >
            <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.totalEvents}</h3>
            <p className="text-gray-400">Total Events</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center"
          >
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.vccEvents}</h3>
            <p className="text-gray-400">VCC Events</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center"
          >
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.collegeEvents}</h3>
            <p className="text-gray-400">College Events</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center"
          >
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.publicEvents}</h3>
            <p className="text-gray-400">Public Events</p>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === "all"
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-600 text-gray-300 hover:border-orange-500"
            }`}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            All Events ({stats.totalEvents})
          </button>
          <button
            onClick={() => setFilter("vcc")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === "vcc"
                ? "bg-purple-500 border-purple-500 text-white"
                : "border-gray-600 text-gray-300 hover:border-purple-500"
            }`}
          >
            VCC Events ({stats.vccEvents})
          </button>
          <button
            onClick={() => setFilter("college")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === "college"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-600 text-gray-300 hover:border-blue-500"
            }`}
          >
            College Events ({stats.collegeEvents})
          </button>
          <button
            onClick={() => setFilter("public")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === "public"
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-600 text-gray-300 hover:border-green-500"
            }`}
          >
            Public Events ({stats.publicEvents})
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-6 pb-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                      {event.isVcc && (
                        <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                          VCC Event
                        </span>
                      )}
                      {event.inCollege && !event.isVcc && (
                        <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                          College Event
                        </span>
                      )}
                      {!event.inCollege && !event.isVcc && (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          Public Event
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.registrations?.length || 0} / {event.registrationLimit} participants
                      </div>
                      {event.college && (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                          {event.college.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
              <p className="text-gray-500">
                {filter === "all" 
                  ? "You haven't participated in any events yet."
                  : `You haven't participated in any ${filter} events yet.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
