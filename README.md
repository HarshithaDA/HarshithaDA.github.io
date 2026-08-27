# Harshitha Devina Anto Portfolio

A modern single-page portfolio built with React, TypeScript, Vite, and Tailwind CSS. It includes the sections you asked for: About, Skills, Experience, Projects, Publications, Certifications, Volunteering, Resume, and Contact.

Your live contact links are already set to:

- Email: harshitha5anto@gmail.com
- GitHub: https://github.com/HarshithaDA
- LinkedIn: https://www.linkedin.com/in/harshitha-devina-anto-9068401ba

## Run in VS Code

1. Open the folder `Harshitha_Portfolio` in VS Code.
2. Open the terminal in VS Code.
3. Run `npm install` if dependencies are not already installed.
4. Start the local dev server with `npm run dev`.
5. Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Customize Your Content

1. Edit `src/content.ts` for your real education, internships, projects, certificates, clubs, volunteering, and contact details.
2. Replace `public/resume.pdf` with your actual resume PDF so the Resume button works.
3. Update the project links in `src/content.ts` from `#` to your real GitHub repository URLs.
4. Your email, GitHub, and LinkedIn are already set in `src/content.ts`.

## GitHub Pages Hosting

This project is configured for GitHub Pages with relative asset paths.

1. Create a new GitHub repository.
2. Push this project to that repository.
3. If you want a GitHub Pages user site, name the repo `HarshithaDA.github.io`.
4. In GitHub, go to repository Settings, then Pages.
5. Select the `gh-pages` branch as the source.
6. Run `npm run deploy` to build and publish the site.
7. Wait for GitHub Pages to finish deploying, then open your published URL.

## Notes

- The navigation underline animates on hover and for the active section while scrolling.
- The education area uses a vertical timeline.
- Project cards are grouped into Database, Hackathons, AI / ML, and Computer Vision.
- The design system and color palette live in `src/index.css`.
