import { useEffect } from 'react'
import './App.css'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const skills = [
  { name: 'React', category: 'Frontend Framework', level: 90, icon: '⚛️' },
  { name: 'CSS3', category: 'Styling', level: 95, icon: '🎨' },
  { name: 'Responsive Design', category: 'Design', level: 88, icon: '📱' },
  { name: 'JavaScript', category: 'Programming', level: 85, icon: '🚀' },
  { name: 'Figma', category: 'Design Tools', level: 80, icon: '🎯' },
  { name: 'Node.js', category: 'Backend', level: 75, icon: '🌐' },
]

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'fullstack',
    image: 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App',
    alt: 'E-Commerce Platform',
    description:
      'A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    category: 'frontend',
    image: 'https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App',
    alt: 'Weather Dashboard',
    description:
      'Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.',
    tags: ['JavaScript', 'CSS3', 'API'],
    featured: false,
  },
  {
    title: 'Task Management App',
    category: 'webapp',
    image: 'https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager',
    alt: 'Task Management App',
    description:
      'Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.',
    tags: ['React', 'TypeScript', 'Firebase'],
    featured: false,
  },
  {
    title: 'Creative Portfolio',
    category: 'design',
    image: 'https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site',
    alt: 'Portfolio Website',
    description:
      'Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.',
    tags: ['HTML5', 'CSS3', 'GSAP'],
    featured: false,
  },
]

function App() {
  const handleNavClick = (e) => {
    e.preventDefault()

    // Close the mobile menu after a link is clicked (Week 6 behavior)
    document.querySelector('.nav-menu').classList.remove('active')
    document.querySelector('.nav-toggle').classList.remove('active')

    const targetId = e.currentTarget.getAttribute('href')
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleFilterClick = (e) => {
    const filterValue = e.currentTarget.getAttribute('data-filter')
    const projectCards = document.querySelectorAll('.project-card')

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category')

      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'block'
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'scale(1)'
        }, 10)
      } else {
        card.style.opacity = '0'
        card.style.transform = 'scale(0.9)'
        setTimeout(() => {
          card.style.display = 'none'
        }, 300)
      }
    })

    document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'))
    e.currentTarget.classList.add('active')
  }

  const handleMobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu')
    const navToggle = document.querySelector('.nav-toggle')

    if (navMenu && navToggle) {
      navMenu.classList.toggle('active')
      navToggle.classList.toggle('active')
    }
  }

  const handleScroll = () => {
    const sections = document.querySelectorAll('section')
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('active'))

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add('active')
        }
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const showError = (input, message) => {
    clearError(input)

    const errorElement = document.createElement('span')
    errorElement.className = 'error-message'
    errorElement.textContent = message

    input.classList.add('error')
    input.classList.remove('success')
    input.parentElement.appendChild(errorElement)
  }

  const clearError = (input) => {
    const existingError = input.parentElement.querySelector('.error-message')
    if (existingError) {
      existingError.remove()
    }
    input.classList.remove('error')
  }

  const showSuccess = (input) => {
    clearError(input)
    input.classList.add('success')
    input.classList.remove('error')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const nameInput = form.querySelector('#name')
    const emailInput = form.querySelector('#email')
    const messageInput = form.querySelector('#message')

    let isValid = true
    const nameValue = nameInput.value.trim()
    const emailValue = emailInput.value.trim()
    const messageValue = messageInput.value.trim()

    if (nameValue.length < 2) {
      showError(nameInput, 'Name must be at least 2 characters')
      isValid = false
    } else {
      showSuccess(nameInput)
    }

    if (!isValidEmail(emailValue)) {
      showError(emailInput, 'Please enter a valid email address')
      isValid = false
    } else {
      showSuccess(emailInput)
    }

    if (messageValue.length < 10) {
      showError(messageInput, 'Message must be at least 10 characters')
      isValid = false
    } else {
      showSuccess(messageInput)
    }

    if (isValid) {
      const existingSuccess = form.querySelector('.success-message')
      if (existingSuccess) {
        existingSuccess.remove()
      }

      const successMessage = document.createElement('div')
      successMessage.className = 'success-message'
      successMessage.textContent = 'Thank you! Your message has been sent successfully.'
      form.appendChild(successMessage)

      console.log('Form submitted with data:', { name: nameValue, email: emailValue, message: messageValue })

      setTimeout(() => {
        form.reset()
        successMessage.remove()
        document.querySelectorAll('.form-group input.success, .form-group textarea.success').forEach((input) => {
          input.classList.remove('success')
        })
      }, 3000)
    }
  }

  return (
    <div className="portfolio">
      <nav id="navbar">
        <div className="nav-brand">
          <span>Alex Johnson</span>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link" onClick={handleNavClick}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="nav-toggle"
          onClick={handleMobileMenuToggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleMobileMenuToggle()
            }
          }}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Alex Johnson</h1>
          <p className="hero-subtitle">Frontend Developer &amp; UI Designer</p>
          <p className="hero-tagline">
            Creating beautiful, responsive web experiences with modern technologies
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I&apos;m a passionate frontend developer with 3 years of experience creating engaging digital
                experiences. I specialize in React, modern CSS, and responsive design patterns that work
                beautifully across all devices.
              </p>
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">✉️</span>
                  <a href="mailto:alex@example.com">alex@example.com</a>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📱</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            <div className="about-availability">
              <h3>Currently Available For:</h3>
              <div className="availability-tags">
                <span className="tag tag-available">Freelance</span>
                <span className="tag tag-available">Full-Time</span>
                <span className="tag tag-available">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills &amp; Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <h3 className="skill-name">{skill.name}</h3>
                </div>
                <div className="skill-category">{skill.category}</div>
                <div className="skill-level">
                  <div className="skill-progress" style={{ '--skill-level': `${skill.level}%` }} />
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>

          <div className="filter-buttons">
            <button type="button" className="filter-btn active" data-filter="all" onClick={handleFilterClick}>
              All Projects
            </button>
            <button type="button" className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>
              Frontend
            </button>
            <button type="button" className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>
              Full-Stack
            </button>
            <button type="button" className="filter-btn" data-filter="design" onClick={handleFilterClick}>
              Design
            </button>
            <button type="button" className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>
              Web App
            </button>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                className={project.featured ? 'project-card featured' : 'project-card'}
                key={project.title}
                data-category={project.category}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.alt} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href="#" className="project-link">
                        <span>🔗</span> Live Demo
                      </a>
                      <a href="#" className="project-link">
                        <span>💻</span> Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">
                      {project.category === 'fullstack'
                        ? 'Full-Stack'
                        : project.category === 'frontend'
                          ? 'Frontend'
                          : project.category === 'webapp'
                            ? 'Web App'
                            : 'Design'}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={`${project.title}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>I&apos;m always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

            <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      if (value.length === 0) {
                        showError(e.target, 'Name is required')
                      } else if (value.length < 2) {
                        showError(e.target, 'Name must be at least 2 characters')
                      } else {
                        showSuccess(e.target)
                      }
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      if (value.length === 0) {
                        showError(e.target, 'Email is required')
                      } else if (!isValidEmail(value)) {
                        showError(e.target, 'Please enter a valid email address')
                      } else {
                        showSuccess(e.target)
                      }
                    }}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      if (value.length === 0) {
                        showError(e.target, 'Message is required')
                      } else if (value.length < 10) {
                        showError(e.target, 'Message must be at least 10 characters')
                      } else {
                        showSuccess(e.target)
                      }
                    }}
                  />
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
