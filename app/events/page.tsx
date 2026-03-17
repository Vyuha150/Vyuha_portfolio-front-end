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
import type { LucideIcon } from "lucide-react"; // Import the icon type separately
import { id } from "date-fns/locale";
import Cookies from "js-cookie";

export type Event = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizerBio: string;
  organizerPhoto: string;
  platformLink?: string; // For online events
  fees?: string;
  materials?: string;
  isRecorded?: boolean;
  image: string; // Event image
  category: string; // Event category
  mode?: string; // Add mode property (e.g., "online" or "offline")
  targetAudience?: string; // Add targetAudience property (e.g., "Students", "Professionals")
  logo?: string; // Add logo property (if different from image)
  icon?: LucideIcon; // Add icon property for event type icons
  stats?: {
    participants?: number;
    speakers?: number;
    projects?: number;
    initiatives?: number;
  };
  testimonial?: {
    text?: string;
    author?: string;
  };
};

export default function EventsPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [targetAudienceFilter, setTargetAudienceFilter] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [timers, setTimers] = useState<{ [key: number]: string }>({});
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch user profile when token is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUser({
            name: response.data.name,
            email: response.data.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const privateUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;
        const publicUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/events/public`;

        let response;

        if (token) {
          try {
            response = await axios.get(privateUrl, {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 12000,
            });
          } catch {
            response = await axios.get(publicUrl, { timeout: 12000 });
          }
        } else {
          response = await axios.get(publicUrl, { timeout: 12000 });
        }

        if (response.status === 200) {
          const formattedEvents = response.data.map((event: any) => ({
            ...event,
            id: event._id,
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, [token]);

  // Calculate timers for events
  useEffect(() => {
    const calculateTimers = () => {
      const newTimers: { [key: number]: string } = {};
      events.forEach((event) => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          newTimers[event.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimers[event.id] = "Event has started or ended.";
        }
      });
      setTimers(newTimers);
    };

    calculateTimers();
    const timerInterval = setInterval(calculateTimers, 60000); // Update every minute
    return () => clearInterval(timerInterval);
  }, [events]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // If user is not logged in, redirect to login
    if (!token || !user) {
      alert("Please log in to register for events.");
      router.push("/auth/sign-in");
      return;
    }

    // If user is logged in, show confirmation and proceed
    const confirmed = window.confirm(
      `Are you sure you want to register for "${selectedEvent?.name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/register`,
        {
          eventId: selectedEvent?.id,
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
    const matchesCategory = categoryFilter
      ? event.category === categoryFilter
      : true;
    const matchesMode = modeFilter ? event.mode === modeFilter : true;
    const matchesDate = date
      ? format(new Date(event.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
      : true;
    const matchesAudience = targetAudienceFilter
      ? event.targetAudience === targetAudienceFilter
      : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMode &&
      matchesDate &&
      matchesAudience
    );
  });

  // Past events: events whose date and time are before now
  const now = new Date();
  const pastEvents = events.filter((event) => {
    const eventDateTime = new Date(`${event.date} ${event.time}`);
    return eventDateTime < now;
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Discover Events | Create Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Whether you're looking to attend, volunteer, or host—Vyuha brings
              together events that inspire leadership, innovation, and
              collaboration.
            </p>
            <Button
              size="lg"
              asChild
              className="gap-2 bg-orange-500 hover:bg-orange-600 hover:scale-105 duration-300"
            >
              <Link href="/contact">
                <Upload className="w-4 h-4 " />
                Upload Event Details
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setTargetAudienceFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Target Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Everyone">Everyone</SelectItem>
                <SelectItem value="Professionals">Professionals</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <p className="text-muted-foreground text-center col-span-full">
                No events found for selected filters.
              </p>
            ) : (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="overflow-hidden bg-black text-white hover:shadow-orange-500/50 transition-all duration-300 h-auto">
                    <div className="aspect-video relative">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        {timers[event.id]}
                      </div>
                      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                        {event.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">
                        <div className="flex items-center gap-2">
                          {event.icon &&
                            React.createElement(event.icon, {
                              className: "w-6 h-6 text-orange-500",
                            })}
                          <CardTitle className="text-xl font-bold">
                            {event.name}
                          </CardTitle>
                        </div>{" "}
                      </CardTitle>
                      <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{format(new Date(event.date), "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4">{event.description}</p>
                      <div className="flex gap-4">
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsModalOpen(true);
                          }}
                        >
                          Join Event
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white transition-transform duration-300 hover:scale-105"
                          asChild
                        >
                          <Link href={`/events/${event.id}`}>Learn More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Host Your Event */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Host Your Event</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Are you a student body with a vision? Let Vyuha amplify your reach
            across India.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-orange-500 hover:bg-orange-600 hover:scale-105 duration-300"
          >
            <Link href="/contact">Post Your Event Now</Link>
          </Button>
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Past Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="overflow-hidden bg-black text-white hover:shadow-orange-500/50 transition-all duration-300">
                  <div className="aspect-video">
                    <img
                      src={event.image || "/placeholder-event.jpg"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-event.jpg";
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      {event.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">
                          {event.stats?.participants ?? 0}
                        </div>
                        <div className="text-sm text-gray-400">
                          Participants
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">
                          {event.stats?.speakers ?? 0}
                        </div>
                        <div className="text-sm text-gray-400">Speakers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">
                          {event.stats?.projects ??
                            event.stats?.initiatives ??
                            0}
                        </div>
                        <div className="text-sm text-gray-400">
                          {event.stats?.projects ? "Projects" : "Initiatives"}
                        </div>
                      </div>
                    </div>
                    <blockquote className="border-l-2 pl-4 italic text-gray-400">
                      "{event.testimonial?.text ?? "No testimonial available."}"
                      <footer className="mt-2 text-sm font-medium">
                        — {event.testimonial?.author ?? "Unknown"}
                      </footer>
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-black text-white border border-orange-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Register for {selectedEvent.name}
            </h2>
            {token && user ? (
              // Logged in user - show confirmation
              <div className="space-y-4">
                <p className="text-gray-300">
                  You are logged in. We'll use your account information to
                  register you for this event.
                </p>
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
              // Not logged in - show login prompt
              <div className="text-center space-y-4">
                <p className="text-gray-300">
                  You need to be logged in to register for events.
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
                  <Button
                    onClick={() => {
                      router.push("/auth/sign-in");
                    }}
                    className="bg-orange-500 text-white"
                  >
                    Login to Register
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
