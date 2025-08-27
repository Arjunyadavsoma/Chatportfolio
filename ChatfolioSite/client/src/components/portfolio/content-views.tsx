import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import ContactForm from "./contact-form";
import type { ViewType } from "@/pages/home";

interface ContentViewsProps {
  currentView: ViewType;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function ContentViews({ currentView }: ContentViewsProps) {
  return (
    <AnimatePresence mode="wait">
      {currentView === "photo" && (
        <motion.div
          key="photo"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-8 flex flex-col items-center justify-center min-h-full"
        >
          <div className="text-center space-y-6 max-w-md">
            <motion.div 
              className="relative mx-auto w-48 h-48"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/assets/profile.jpg"
                alt="Arjun Kumar - Software Developer"
                className="w-full h-full rounded-2xl shadow-xl border-2 border-white/10 object-cover"
                data-testid="profile-image"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                <i className="fas fa-check"></i>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <h1 
                className="text-3xl font-bold gradient-text"
                data-testid="profile-name"
              >
                {portfolioData.profile.name}
              </h1>
              
              <p 
                className="text-lg text-muted-foreground"
                data-testid="profile-title"
              >
                {portfolioData.profile.title}
              </p>
              
              <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground w-full">
                  <div className="flex items-center justify-center space-x-2 glass-card px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Available for hire</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 glass-card px-4 py-2 rounded-lg">
                    <i className="fas fa-map-marker-alt text-blue-400"></i>
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 glass-card px-4 py-2 rounded-lg">
                    <i className="fas fa-clock text-emerald-400"></i>
                    <span>5+ years experience</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3 pt-2">
                  {portfolioData.profile.links.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      className="glass-card px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
                      data-testid={`link-${link.label.toLowerCase()}`}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className={`${link.icon} mr-2`}></i>
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                
                <button
                  className="mt-4 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {currentView === "projects" && (
        <motion.div
          key="projects"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-6"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Featured Projects</h2>
          <div className="space-y-4">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card p-5 rounded-xl hover:bg-white/5 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                data-testid={`project-${project.id}`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-16 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-primary">
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-primary/20 hover:bg-primary/30 rounded-md transition-colors text-xs">
                          <i className="fas fa-eye text-primary"></i>
                        </button>
                        <button className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-md transition-colors text-xs">
                          <i className="fab fa-github text-emerald-400"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {currentView === "resume" && (
        <motion.div
          key="resume"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold gradient-text">Resume</h2>
            <button 
              className="glass-card px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
              onClick={() => window.open('/resume.pdf', '_blank')}
              data-testid="download-resume"
            >
              <i className="fas fa-download mr-2"></i>Download PDF
            </button>
          </div>
          <div className="glass-card p-4 rounded-xl" style={{ height: 'calc(100vh - 200px)' }}>
            <iframe
              src="/resume.pdf"
              className="w-full h-full rounded-lg"
              title="Arjun's Resume"
              data-testid="resume-viewer"
            />
          </div>
        </motion.div>
      )}

      {currentView === "skills" && (
        <motion.div
          key="skills"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-6"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Technical Skills</h2>
          <div className="space-y-5">
            {portfolioData.skills.map((category, categoryIndex) => (
              <motion.div 
                key={category.category} 
                className="glass-card p-5 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                      </div>
                      <div className="bg-muted/50 rounded-full h-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {currentView === "certificates" && (
        <motion.div
          key="certificates"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-6"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Certifications & Awards</h2>
          <div className="space-y-4">
            {portfolioData.certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="glass-card p-4 rounded-xl hover:bg-white/5 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -1 }}
                data-testid={`certificate-${cert.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.iconGradient} rounded-lg flex items-center justify-center`}>
                    <i className={`${cert.icon} text-lg text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Issued: {cert.date}
                    </p>
                  </div>
                  <button 
                    className="px-3 py-1.5 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors text-sm"
                    onClick={() => window.open(cert.verifyUrl, '_blank')}
                    data-testid={`verify-${cert.id}`}
                  >
                    <i className="fas fa-external-link-alt mr-1"></i>Verify
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {currentView === "contact" && (
        <motion.div
          key="contact"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full"
        >
          <ContactForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
