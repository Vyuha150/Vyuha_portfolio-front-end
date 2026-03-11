"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseCard from "@/components/CourseCard";
import MentorCard from "@/components/MentorCard";
import ProjectCard from "@/components/projectCard";
import { 
  BookOpen, 
  Users, 
  Briefcase, 
  FolderOpen, 
  Building2,
  ArrowRight,
  MapPin,
  Trophy
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  instructorPhoto?: string;
  coursePhoto?: string;
  description: string;
  format: string;
  price: string;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
}

interface Mentor {
  _id: string;
  name: string;
  photo?: string;
  skills: string[];
  industry: string;
  experience: string;
  mentorshipStyle: string;
  availability: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  teamSize: string;
  skills: string[];
  deadline: string;
  image: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  image?: string;
  createdAt: string;
}

interface Club {
  _id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default function StudentZonePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Fetch all data in parallel
        const [coursesRes, mentorsRes, projectsRes, jobsRes, clubsRes] = await Promise.allSettled([
          axios.get(`${apiUrl}/api/courses`),
          axios.get(`${apiUrl}/api/mentors`),
          axios.get(`${apiUrl}/api/projects`),
          axios.get(`${apiUrl}/api/job-application`),
          axios.get(`${apiUrl}/api/clubs`)
        ]);

        // Handle courses
        if (coursesRes.status === 'fulfilled') {
          setCourses(coursesRes.value.data.slice(0, 4));
        } else {
          console.error('Error fetching courses:', coursesRes.reason);
        }

        // Handle mentors
        if (mentorsRes.status === 'fulfilled') {
          setMentors(mentorsRes.value.data.slice(0, 4));
        } else {
          console.error('Error fetching mentors:', mentorsRes.reason);
        }

        // Handle projects
        if (projectsRes.status === 'fulfilled') {
          setProjects(projectsRes.value.data.slice(0, 4));
        } else {
          console.error('Error fetching projects:', projectsRes.reason);
        }

        // Handle jobs
        if (jobsRes.status === 'fulfilled') {
          setJobs(jobsRes.value.data.slice(0, 4));
        } else {
          console.error('Error fetching jobs:', jobsRes.reason);
        }

        // Handle clubs
        if (clubsRes.status === 'fulfilled') {
          setClubs(clubsRes.value.data.slice(0, 4));
        } else {
          console.error('Error fetching clubs:', clubsRes.reason);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load some content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  text-white flex items-center justify-center">
        <div className="text-xl">Loading Student Zone...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen  text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-orange-500 mb-4">Student Zone</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover opportunities, enhance your skills, and connect with mentors. 
            Everything you need to accelerate your learning journey.
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Courses Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Courses</h2>
            </div>
            <Link href="/courses">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <CourseCard course={{
                    ...course,
                    description: course.description || '',
                    format: course.format || 'Online',
                    reviews: course.reviews || 0,
                    instructorPhoto: course.instructorPhoto || ''
                  }} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No courses available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Mentorships Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Mentorships</h2>
            </div>
            <Link href="/mentorship">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.length > 0 ? (
              mentors.map((mentor, index) => (
                <motion.div
                  key={mentor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <MentorCard 
                    mentor={{
                      ...mentor,
                      mentorshipStyle: mentor.mentorshipStyle || 'One-on-One',
                      photo: mentor.photo || '/default-mentor.jpg'
                    }} 
                    onBook={() => {
                      window.location.href = `/mentorship/${mentor._id}/book`;
                    }}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No mentors available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center">
              <FolderOpen className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Projects</h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <ProjectCard project={{
                    ...project,
                    image: project.image || '/default-project.jpg'
                  }} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No projects available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Internships/Jobs Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Opportunities</h2>
            </div>
            <Link href="/internships">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Card className="bg-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 h-full">
                    <div className="p-6">
                      {job.image && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${job.image}`}
                          alt={job.company}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <h3 className="text-xl font-bold text-white mb-3">{job.title}</h3>
                      
                      <div className="flex items-center text-gray-400 mb-3">
                        <Building2 className="w-5 h-5 mr-2" />
                        <span className="text-base">{job.company}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 mb-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-base">{job.location}</span>
                      </div>

                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 mb-4 text-sm px-3 py-1">
                        {job.jobType}
                      </Badge>
                      
                      <p className="text-gray-300 text-base mb-6 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {job.description}
                      </p>
                      
                      <Link href={`/internships`}>
                        <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No job opportunities available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Clubs Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Clubs</h2>
            </div>
            <Link href="/club-partner">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.length > 0 ? (
              clubs.map((club, index) => (
                <motion.div
                  key={club._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Card className="bg-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 h-full">
                    <div className="p-6">
                      {club.image && (
                        <img
                          src={club.image}
                          alt={club.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <h3 className="text-xl font-bold text-white mb-4">{club.name}</h3>
                      
                      <p className="text-gray-300 text-base mb-6 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {club.description}
                      </p>
                      
                      <Link href="/club-partner">
                        <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
                          Join Club
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No clubs available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers through our platform. 
            Connect, learn, and grow with like-minded individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Become a Member
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3">
                Get Support
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 