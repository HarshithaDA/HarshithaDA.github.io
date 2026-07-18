# 🚀 Modern Developer Portfolio

A professional, modern portfolio website built with React, Tailwind CSS, and Vite. Features dark/light mode, smooth animations, and automatic GitHub project fetching.

![Portfolio Preview](https://via.placeholder.com/1200x600/8b5cf6/ffffff?text=Your+Portfolio+Screenshot)

## ✨ Features

- 🌓 **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- 🎨 **Modern Design** - Professional UI with purple/cyan gradient accents
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🔄 **Auto GitHub Sync** - Automatically fetches and displays your latest repositories
- 📊 **Timeline Visualization** - Professional timelines for education and experience
- 🏆 **Hackathon Section** - Dedicated space to showcase competition wins
- 🎯 **Smooth Animations** - Polished transitions and hover effects throughout

## 📋 Sections

- **Hero** - Introduction with profile photo and social links
- **Projects** - Featured projects and hackathon wins
- **Experience** - Professional work history with timeline
- **Education** - Academic background with enhanced timeline
- **Publications** - Research papers and articles
- **Certifications** - Professional credentials and courses
- **Clubs & Volunteering** - Community involvement and leadership
- **Contact** - Get in touch section

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (via GitHub Actions)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm installed
- A GitHub account for deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

## ⚙️ Configuration

### Update Your Information

Edit `src/data/profile.js` to customize all content:

```javascript
export const PROFILE = {
  site: {
    name: 'Your Name',
    tagline: 'Your Professional Title',
    email: 'your.email@example.com',
    githubUsername: 'yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    avatar: '/avatar.jpg'
  },
  // ... add your experience, education, projects, etc.
}
```

### Add Your Photo

Place your profile photo at `/public/avatar.jpg` (recommended size: 800x600px or 4:3 aspect ratio)

### Customize Colors (Optional)

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --accent-1: #8b5cf6; /* Primary purple */
  --accent-2: #06b6d4; /* Secondary cyan */
  /* ... other colors */
}
```

## 📦 Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

3. **Automatic Deployment**
   - Every push to `main` branch triggers automatic deployment
   - Check the Actions tab for deployment status

Your site will be live at: `https://yourusername.github.io/repository-name/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run deploy
```

This builds the site and pushes to the `gh-pages` branch.

## 🎨 Customization Guide

### Adding Projects

**Manual Projects** (in `profile.js`):
```javascript
manualProjects: [
  {
    name: 'Project Name',
    description: 'Brief description',
    url: 'https://github.com/user/repo',
    demo: 'https://demo-link.com',
    tags: ['React', 'Node.js', 'MongoDB']
  }
]
```

**Hackathon Projects**:
```javascript
hackathonProjects: [
  {
    name: 'Hackathon Winner',
    description: '🏆 1st Place - Description here',
    url: 'https://github.com/user/repo',
    tags: ['AI', 'Python', 'Winner']
  }
]
```

### Adding Experience

```javascript
experience: [
  {
    company: 'Company Name',
    role: 'Your Position',
    location: 'City, State',
    dates: 'Jan 2024 – Present',
    highlights: [
      'Achievement or responsibility 1',
      'Achievement or responsibility 2'
    ]
  }
]
```

### Adding Education

```javascript
education: [
  {
    school: 'University Name',
    degree: 'Degree Title',
    years: '2020 – 2024',
    location: 'City, State',
    details: [
      'Relevant coursework or achievements',
      'GPA or honors'
    ]
  }
]
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance

- ⚡ Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- 📦 Optimized bundle size with Vite
- 🖼️ Lazy loading for images
- 🔄 Efficient GitHub API caching

## 🤝 Contributing

This is a personal portfolio template, but feel free to:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern developer portfolios
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

If you have questions or need help:
- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/portfolio/discussions)

---

**Made with 💜 by [Your Name](https://github.com/yourusername)**

⭐ Star this repo if you found it helpful!
