# 👨‍💻 Juanma Rab - Personal Portfolio

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)

> **Welcome.** This project is a Single Page Application (SPA) built to showcase my professional experience, software projects, and technical skills.

🔗 **Live Demo:** [https://juanmarab.github.io/portfolio/](https://juanmarab.github.io/portfolio/)

---

## 🛠️ Tech Stack

This portfolio is built from scratch using modern web development practices:

* **Framework:** [Angular](https://angular.io/) (Component-Based Architecture).
* **Language:** TypeScript.
* **Styling:** Native CSS3 (Responsive Design, Flexbox, Custom Properties).
* **Hosting/CI:** GitHub Pages.

## ✨ Key Features

* **Responsive Design:** Fully adaptive layout for mobile, tablet, and desktop devices.
* **Modular Components:** Uses reusable components (e.g., `InfoCardComponent`) to display experiences and projects dynamically.
* **Dark/Light Theme:** Built-in support for visual themes.
* **Conditional Rendering:** Dynamic UI elements, such as action buttons that only appear when external links are provided.
* **Clean Routing:** Smooth navigation using Angular Router.

## 📂 Project Structure

The codebase is organized for scalability and maintainability:

```text
src/
├── app/
│   ├── components/      # Reusable UI elements (InfoCard, Navbar, etc.)
│   ├── pages/           # Main views (Home, Projects, Contact)
│   ├── services/        # Data handling and state management
│   └── shared/          # Models and interfaces
├── assets/              # Static resources (images, icons)
└── styles.css           # Global styles and CSS variables