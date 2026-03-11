"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  Clock, 
  Search, 
  Briefcase,
  Upload,
  X
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  image?: string;
  createdAt: string;
}

interface ApplicationData {
  name: string;
  email: string;
  coverLetter: string;
  resume: File | null;
}

export default function InternshipsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  
  // Application modal state
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-application`
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and job type
  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by job type
    if (selectedJobType !== "all") {
      filtered = filtered.filter(
        (job) => job.jobType.toLowerCase() === selectedJobType.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedJobType]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setApplicationData({
      name: "",
      email: "",
      coverLetter: "",
      resume: null,
    });
    setSubmitError(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob) return;
    
    if (!applicationData.name || !applicationData.email || !applicationData.resume) {
      setSubmitError("Please fill in all required fields and upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("name", applicationData.name);
      formData.append("email", applicationData.email);
      formData.append("coverLetter", applicationData.coverLetter);
      formData.append("jobId", selectedJob._id);
      formData.append("resume", applicationData.resume);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/apply-job`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Application submitted successfully!");
        setShowApplicationModal(false);
        setSelectedJob(null);
        setApplicationData({
          name: "",
          email: "",
          coverLetter: "",
          resume: null,
        });
      }
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setSubmitError(
        error.response?.data?.message ||
        "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
    setApplicationData({
      name: "",
      email: "",
      coverLetter: "",
      resume: null,
    });
    setSubmitError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-xl">Loading opportunities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  text-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen  text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Career Opportunities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover amazing job opportunities and internships. Apply directly and take the next step in your career journey.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            Found {filteredJobs.length} opportunities
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 h-full flex flex-col">
                <div className="p-6 flex-1">
                  {job.image && (
                    <div className="mb-4">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${job.image}`}
                        alt={job.company}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center text-gray-400 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                        {job.jobType}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {job.description}
                  </p>

                  {job.qualifications && job.qualifications.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-orange-400 mb-2">
                        Key Qualifications:
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {job.qualifications.slice(0, 3).map((qual, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Button
                    onClick={() => handleApply(job)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              No opportunities found matching your criteria.
            </div>
            <p className="text-gray-500 mt-2">
              Try adjusting your search terms or filters.
            </p>
          </motion.div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Apply for {selectedJob.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-orange-400 mb-2">{selectedJob.company}</h3>
              <p className="text-gray-300 text-sm">{selectedJob.location}</p>
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 mt-2">
                {selectedJob.jobType}
              </Badge>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={applicationData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume *
                </label>
                <div className="relative">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="bg-gray-800 border-gray-600 text-white file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Letter
                </label>
                <Textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              {submitError && (
                <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded p-3">
                  {submitError}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}
