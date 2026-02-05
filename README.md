# 🎨 Portfolio Interactivo - Ascen Salmerón

Portfolio web moderno e interactivo con navegación temporal (pasado/presente/futuro) y cambio de contexto dinámico (trabajo/proyectos/ocio). El avatar y los paneles informativos se actualizan automáticamente según la navegación del usuario.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

---

## ✨ Características Principales

- 🕒 **Navegación Temporal Horizontal**: Timeline visual interactivo para navegar entre pasado, presente y futuro
- 🎯 **Tres Contextos Dinámicos**: Trabajo 💼, Proyectos 🚀, Ocio 🎨 (solo visible en "presente")
- 🎨 **Dark/Light Mode**: Tema oscuro/claro con persistencia en localStorage
- 🌐 **Internacionalización**: Soporte completo para Español e Inglés con react-i18next
- 🎭 **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- 📱 **Diseño Responsive**: Layout de dos columnas en desktop, apilado en mobile
- 💫 **Carousel de Tecnologías**: Scroll infinito con logos reales desde DevIcon CDN
- 📇 **Información de Contacto**: Cards interactivas con links directos (Email, GitHub, LinkedIn)
- ♿ **Accesibilidad**: Navegable por teclado, ARIA labels, focus indicators

---

## 🛠️ Stack Técnico

### Core
- **Framework**: React 19.2
- **Lenguaje**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Estilos**: Tailwind CSS 3.4

### Librerías
- **Animaciones**: Framer Motion 12.31
- **Internacionalización**: react-i18next 16.5 + i18next 25.8
- **Detección de Idioma**: i18next-browser-languagedetector 8.2

### DevOps
- **Linting**: ESLint 9 con TypeScript ESLint
- **CSS Processing**: PostCSS + Autoprefixer
- **Type Checking**: TypeScript estricto

---

## 📂 Estructura del Proyecto

```
portfolio/
├── public/
│   ├── avatars/              # 5 imágenes de avatar
│   │   ├── past.png
│   │   ├── present-work.png
│   │   ├── present-projects.png
│   │   ├── present-leisure.png
│   │   └── future.png
│   └── avatars/CONTACT_INFO_UPDATE.md  # Documentación de cambios
├── src/
│   ├── components/
│   │   ├── Avatar/           # Avatar con AnimatePresence
│   │   │   ├── Avatar.tsx
│   │   │   └── AvatarContainer.tsx
│   │   ├── Carousel/         # Carousels de contexto y tecnologías
│   │   │   ├── ContextCarousel.tsx
│   │   │   └── TechnologyCarousel.tsx
│   │   ├── ContactForm/      # Información de contacto
│   │   │   └── ContactInfo.tsx
│   │   ├── Layout/           # Estructura base
│   │   │   ├── MainLayout.tsx
│   │   │   └── Header.tsx
│   │   ├── Navigation/       # Controles de navegación
│   │   │   ├── TemporalNavigation.tsx  # Timeline horizontal
│   │   │   ├── LanguageToggle.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── Panels/           # Paneles de contenido
│   │   │   ├── InfoPanel.tsx
│   │   │   ├── WorkPanel.tsx
│   │   │   ├── ProjectsPanel.tsx
│   │   │   └── LeisurePanel.tsx
│   │   └── UI/               # Componentes reutilizables
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── contexts/             # Estado global
│   │   ├── ThemeContext.tsx
│   │   └── PortfolioContext.tsx
│   ├── data/                 # Datos del portfolio
│   │   ├── portfolio.data.ts
│   │   ├── avatars.data.ts
│   │   └── technologies.data.ts
│   ├── hooks/                # Custom hooks
│   │   ├── usePortfolio.ts
│   │   └── useTheme.ts
│   ├── locales/              # Traducciones
│   │   ├── en/translation.json
│   │   └── es/translation.json
│   ├── types/                # Tipos TypeScript
│   │   ├── portfolio.types.ts
│   │   └── theme.types.ts
│   ├── utils/                # Utilidades
│   │   ├── animations.ts
│   │   └── constants.ts
│   ├── config/               # Configuración
│   │   └── i18n.ts
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Instalación y Uso

### Prerequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/lascenify/portfolio.git
cd portfolio

# Instalar dependencias
npm install
```

### Comandos de Desarrollo

```bash
# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build para producción
npm run build

# Preview del build local
npm run preview

# Linting
npm run lint

# Deploy
npm run deploy
```

---

## 🎯 Cómo Funciona

### Navegación Temporal

El proyecto implementa un **timeline horizontal** con 3 estados:

- **⏳ Pasado**: Experiencias y proyectos anteriores
- **⚡ Presente**: Situación actual con 3 contextos (trabajo/proyectos/ocio)
- **⭐ Futuro**: Objetivos y aspiraciones

El usuario navega haciendo click en los nodos del timeline. Una barra animada muestra el progreso.

### Sistema de Contextos (Solo en Presente)

Cuando el timeline está en "presente", aparece un carousel con 3 opciones:

1. **💼 Trabajo**: Experiencia laboral actual
2. **🚀 Proyectos**: Proyectos personales actuales
3. **🎨 Ocio**: Hobbies e intereses actuales

Al cambiar a pasado/futuro, el contexto se resetea automáticamente a "trabajo".

### Layout de Dos Columnas

**Desktop (≥1024px):**
- **Columna Izquierda** (sticky): Timeline, selector de contexto (si presente), avatar
- **Columna Derecha** (scroll): Panel de información dinámico

**Mobile (<1024px):**
- Layout apilado verticalmente

### Avatares Dinámicos

5 avatares SVG que cambian según el estado:
- `past.png`: Avatar del pasado
- `present-work.png`, `present-projects.png`, `present-leisure.png`: Avatares del presente
- `future.png`: Avatar del futuro

---

## 🎭 Animaciones

El proyecto usa **Framer Motion** para animaciones fluidas:

### Variantes Principales

**Avatar Transitions** (`src/utils/animations.ts`):
```typescript
export const avatarVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.8, rotate: 10 }
};
```

**Panel Transitions**:
```typescript
export const panelVariants: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};
```

**Cards Staggered**:
```typescript
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  })
};
```

---

## 🏗️ Arquitectura

### Context API

**ThemeContext**: Gestiona dark/light mode con persistencia en localStorage.

**PortfolioContext**: Gestiona el estado global del portfolio:
```typescript
interface PortfolioState {
  timeline: 'past' | 'present' | 'future';
  context: 'work' | 'projects' | 'leisure';
  language: 'es' | 'en';
}
```

Incluye lógica de auto-reset: al salir de "presente", el contexto vuelve a "work".

### Custom Hooks

- `usePortfolio()`: Acceso al estado del portfolio
- `useTheme()`: Acceso al tema actual

### Type Safety

TypeScript estricto con tipos definidos en `src/types/`:
- `Timeline`, `Context`, `Experience`, `Project`, `Hobby`
- Interfaces para componentes y datos

---

## 📊 Performance

### Build Optimizado

- **Bundle size**: ~400KB (~127KB gzipped)
- **Code splitting**: Automático con Vite
- **Lazy loading**: Imágenes de tecnologías
- **CSS optimization**: Tailwind PurgeCSS

### Lighthouse Score (Target)

- ✅ Performance: >90
- ✅ Accessibility: >90
- ✅ Best Practices: >90
- ✅ SEO: >90

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 📧 Contacto

**Ascen Salmerón**

- 📧 Email: [ascensalmanez@gmail.com](mailto:ascensalmanez@gmail.com)
- 💻 GitHub: [github.com/lascenify](https://github.com/lascenify)
- 💼 LinkedIn: [linkedin.com/in/ascen-salmeron](https://www.linkedin.com/in/ascen-salmeron/)

---

## 🙏 Agradecimientos

- [DevIcon](https://devicon.dev/) - Iconos de tecnologías
- [Framer Motion](https://www.framer.com/motion/) - Librería de animaciones
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool ultrarrápido

---

