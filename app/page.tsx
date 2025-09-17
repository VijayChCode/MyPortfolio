"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Code,
  Presentation,
  User,
  HomeIcon,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [profilePhoto, setProfilePhoto] = useState("/images/vijay-photo.jpg")
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  // Set default resume path
  const [resumeFile, setResumeFile] = useState<string>("/resume/vijay-resume.pdf")
  const [editableContent, setEditableContent] = useState({
    name: "Vijay Chalendra",
    title: "Computer Science Undergraduate passionate about AI, Software Development, and System Design",
    about:
      "Currently pursuing B.Sc. in Computer Science at Kakatiya Institute of Technology and Science, Warangal, with a strong academic record (CGPA: 9.28). I have a solid foundation in computer science fundamentals and am constantly exploring new technologies and methodologies.",
    email: "chalendravijay09@gmail.com",
    phone: "+91 8500759824",
    location: "Warangal, Telangana, India",
    cgpa: "9.28",
  })

  const navigation = [
    { name: "Home", href: "#home", icon: HomeIcon },
    { name: "About", href: "#about", icon: User },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Certifications", href: "#certifications", icon: Award },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Presentation },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  const skills = {
    programming: ["Python", "Java", "C", "HTML/CSS", "JavaScript", "SQL"],
    tools: ["VS Code", "Git/GitHub"],
    technologies: ["Front-end frameworks", "Basic networking concepts"],
  }

  const certifications = [
    {
      title: "Introduction to CyberSecurity",
      issuer: "Cisco Networking Academy",
      date: "July 2024",
    },
    {
      title: "Packet Tracer Simulation",
      issuer: "Cisco Networking Academy",
      date: "July 2024",
    },
    {
      title: "Front-End Development (HTML)",
      issuer: "Great Learning Academy",
      date: "November 2024",
    },
  ]

  const projects = [
    {
      title: "Course Patent Presentation",
      description: "Presented research on data routing algorithms and their applications in modern networking systems.",
      year: "2023",
      type: "Research Presentation",
    },
    {
      title: "Neuralink Seminar",
      description: "Delivered a comprehensive seminar on brain-machine interfaces and the future of neural technology.",
      year: "2024",
      type: "Technical Seminar",
    },
  ]

  const coursework = [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((nav) => nav.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Cleanup blob URLs when component unmounts
    return () => {
      if (resumeFile && resumeFile.startsWith("blob:")) {
        URL.revokeObjectURL(resumeFile)
      }
    }
  }, [resumeFile])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfilePhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    if (adminPassword === "Salendra@2004") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setAdminPassword("")
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      try {
        // Create a blob URL for the PDF file
        const blobUrl = URL.createObjectURL(file)
        setResumeFile(blobUrl)
        alert("Resume uploaded successfully! Click the Resume button to view it.")
      } catch (error) {
        console.error("Error creating blob URL:", error)
        alert("Failed to process the resume. Please try again with a different file.")
      }
    } else if (file) {
      alert("Please upload a valid PDF file")
    }
  }

  const openResume = () => {
    if (resumeFile) {
      // Create a temporary link element for download
      const link = document.createElement("a")
      link.href = resumeFile
      link.download = "Vijay_Chalendra_Resume.pdf"
      link.target = "_blank"

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert("Resume not available. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">Portfolio</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.href.substring(1)
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Resume Bar */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openResume}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download Resume</span>
        </Button>
      </div>

      {/* Home Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <img
                src={profilePhoto || "/placeholder.svg"}
                alt="Vijay Chalendra"
                className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              {isAdmin ? (
                <input
                  type="text"
                  value={editableContent.name}
                  onChange={(e) => setEditableContent({ ...editableContent, name: e.target.value })}
                  className="bg-transparent border-b-2 border-emerald-500 text-center w-full"
                />
              ) : (
                editableContent.name
              )}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {isAdmin ? (
                <textarea
                  value={editableContent.title}
                  onChange={(e) => setEditableContent({ ...editableContent, title: e.target.value })}
                  className="bg-transparent border-2 border-emerald-500 rounded p-2 w-full resize-none"
                  rows={2}
                />
              ) : (
                editableContent.title
              )}
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://github.com/VijayChCode", "_blank")}
                className="flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://linkedin.com/in/vijay-chalendra-3a771428a", "_blank")}
                className="flex items-center space-x-2"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Button>
            </div>
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm a dedicated Computer Science student with a passion for technology and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Academic Background</h3>
              <p className="text-gray-600 mb-6">
                {isAdmin ? (
                  <textarea
                    value={editableContent.about}
                    onChange={(e) => setEditableContent({ ...editableContent, about: e.target.value })}
                    className="bg-transparent border-2 border-emerald-500 rounded p-2 w-full resize-none"
                    rows={4}
                  />
                ) : (
                  editableContent.about
                )}
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Interests & Focus Areas</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">Artificial Intelligence</Badge>
                <Badge variant="secondary">Software Development</Badge>
                <Badge variant="secondary">System Design</Badge>
                <Badge variant="secondary">Data Structures</Badge>
                <Badge variant="secondary">Networking</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Strengths</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Communication</h4>
                    <p className="text-gray-600">
                      Strong verbal and written communication skills, demonstrated through presentations and seminars
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teamwork</h4>
                    <p className="text-gray-600">Collaborative approach to problem-solving and project development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adaptability</h4>
                    <p className="text-gray-600">Quick to learn new technologies and adapt to changing requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <p className="text-lg text-gray-600">Academic journey and achievements</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Bachelor of Science in Computer Science</CardTitle>
                    <CardDescription className="text-lg">
                      Kakatiya Institute of Technology and Science, Warangal
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Academic Performance</h4>
                    <p className="text-2xl font-bold text-emerald-600 mb-4">
                      CGPA:{" "}
                      {isAdmin ? (
                        <input
                          type="text"
                          value={editableContent.cgpa}
                          onChange={(e) => setEditableContent({ ...editableContent, cgpa: e.target.value })}
                          className="bg-transparent border-b border-emerald-500 w-20"
                        />
                      ) : (
                        editableContent.cgpa
                      )}
                    </p>
                    <p className="text-gray-600">
                      Maintaining excellent academic performance with consistent high grades across all semesters.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Relevant Coursework</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {coursework.map((course, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-700">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
            <p className="text-lg text-gray-600">Professional certifications and achievements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{cert.date}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-lg text-gray-600">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-emerald-600" />
                  <span>Programming Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.programming.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-emerald-600" />
                  <span>Development Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool, index) => (
                    <Badge key={index} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-emerald-600" />
                  <span>Technologies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Projects & Presentations</h2>
            <p className="text-lg text-gray-600">Academic projects and technical presentations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Presentation className="w-6 h-6 text-emerald-600" />
                    </div>
                    <Badge variant="outline">{project.year}</Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-emerald-600">{project.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Let's connect and discuss opportunities</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      {isAdmin ? (
                        <input
                          type="email"
                          value={editableContent.email}
                          onChange={(e) => setEditableContent({ ...editableContent, email: e.target.value })}
                          className="text-emerald-600 bg-transparent border-b border-emerald-500"
                        />
                      ) : (
                        <a href={`mailto:${editableContent.email}`} className="text-emerald-600 hover:underline">
                          {editableContent.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      {isAdmin ? (
                        <input
                          type="tel"
                          value={editableContent.phone}
                          onChange={(e) => setEditableContent({ ...editableContent, phone: e.target.value })}
                          className="text-emerald-600 bg-transparent border-b border-emerald-500"
                        />
                      ) : (
                        <a href={`tel:${editableContent.phone}`} className="text-emerald-600 hover:underline">
                          {editableContent.phone}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      {isAdmin ? (
                        <input
                          type="text"
                          value={editableContent.location}
                          onChange={(e) => setEditableContent({ ...editableContent, location: e.target.value })}
                          className="text-gray-600 bg-transparent border-b border-emerald-500"
                        />
                      ) : (
                        <p className="text-gray-600">{editableContent.location}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Profiles</CardTitle>
                  <CardDescription>Connect with me on professional platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://linkedin.com/in/vijay-chalendra-3a771428a", "_blank")}
                  >
                    <Linkedin className="w-5 h-5 mr-3" />
                    LinkedIn Profile
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://github.com/VijayChCode", "_blank")}
                  >
                    <Github className="w-5 h-5 mr-3" />
                    GitHub Profile
                  </Button>

                  <Separator className="my-4" />

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Open to internship opportunities and collaborations</p>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => window.open("mailto:chalendravijay09@gmail.com", "_blank")}
                    >
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Admin Login/Controls */}
            <div className="mt-12 max-w-md mx-auto">
              {!isAdmin ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Access</CardTitle>
                    <CardDescription>Login to manage portfolio content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showAdminLogin ? (
                      <Button onClick={() => setShowAdminLogin(true)} variant="outline" className="w-full">
                        Admin Login
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Admin Password
                          </label>
                          <input
                            type="password"
                            id="admin-password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter admin password"
                            onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleAdminLogin} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                            Login
                          </Button>
                          <Button onClick={() => setShowAdminLogin(false)} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Admin Controls</CardTitle>
                        <CardDescription>Update your portfolio content</CardDescription>
                      </div>
                      <Button onClick={handleAdminLogout} variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Resume (PDF)
                      </label>
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-emerald-50 file:text-emerald-700
              hover:file:bg-emerald-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        Update Profile Photo
                      </label>
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-emerald-50 file:text-emerald-700
              hover:file:bg-emerald-100"
                      />
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-2">Save Changes</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 Vijay Chalendra. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
