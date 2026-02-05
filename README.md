# Portfolio Interactivo

Portfolio web con navegación temporal (pasado/presente/futuro) y cambio de contexto (trabajo/proyectos/ocio), donde el avatar y los paneles informativos se actualizan dinámicamente según el estado seleccionado.

## Características

- ✨ Navegación temporal: Pasado, Presente, Futuro
- 🎯 Tres contextos: Trabajo, Proyectos, Ocio
- 🎨 Dark/Light mode con persistencia
- 🌐 Internacionalización (Español/Inglés)
- 🎭 Animaciones fluidas con Framer Motion
- 📱 Diseño responsive
- 📧 Formulario de contacto con EmailJS
- ♿ Accesible y navegable por teclado

## Stack Técnico

- **Framework**: React 18 + Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v3
- **Animaciones**: Framer Motion
- **i18n**: react-i18next
- **Formulario**: EmailJS

## Estructura del Proyecto

```
portfolio/
├── public/
│   ├── avatars/           # 9 imágenes de avatar (timeline × contexto)
│   └── technologies/      # Logos de tecnologías
├── src/
│   ├── components/        # Componentes React
│   │   ├── Avatar/
│   │   ├── Carousel/
│   │   ├── ContactForm/
│   │   ├── Layout/
│   │   ├── Navigation/
│   │   ├── Panels/
│   │   └── UI/
│   ├── contexts/          # Context API (Theme, Portfolio)
│   ├── data/              # Datos del portfolio
│   ├── hooks/             # Custom hooks
│   ├── locales/           # Traducciones ES/EN
│   ├── services/          # API services (EmailJS)
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilidades (animaciones, constantes)
│   └── config/            # Configuración (i18n)
└── ...
```

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Configurar EmailJS (opcional)
# Editar .env con tus credenciales de EmailJS
```

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Para obtener las credenciales:
1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio de email
3. Crea una plantilla de email
4. Copia las credenciales al archivo `.env`

## Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Configuración del Contenido

### Actualizar Datos del Portfolio

Edita el archivo `src/data/portfolio.data.ts` para personalizar:

- **Experiencias laborales** (past, present, future)
- **Proyectos** (past, present, future)
- **Hobbies e intereses** (past, present, future)

### Añadir Avatares

Coloca 9 imágenes PNG en `public/avatars/` con los nombres:

- `work-past.png`, `work-present.png`, `work-future.png`
- `projects-past.png`, `projects-present.png`, `projects-future.png`
- `leisure-past.png`, `leisure-present.png`, `leisure-future.png`

### Añadir Logos de Tecnologías

Coloca los logos en `public/technologies/` y actualiza `src/data/technologies.data.ts`.

## Navegación

### Temporal
- **Flechas arriba/abajo**: Navega entre pasado, presente y futuro
- **Estado actual**: Se muestra en el indicador central

### Contextos
- **💼 Trabajo**: Experiencia laboral
- **🚀 Proyectos**: Proyectos personales y profesionales
- **🎨 Ocio**: Hobbies e intereses

### Tema e Idioma
- **Botón sol/luna**: Alterna entre modo claro y oscuro
- **Botón ES/EN**: Cambia entre español e inglés

## Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta de colores:

```javascript
colors: {
  primary: {
    light: '#3B82F6',  // Azul claro
    dark: '#60A5FA',   // Azul oscuro
  },
  // ... otros colores
}
```

### Traducciones

Añade o edita traducciones en:
- `src/locales/es/translation.json`
- `src/locales/en/translation.json`

### Animaciones

Personaliza las animaciones en `src/utils/animations.ts`.

## Deploy

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy la carpeta dist/
```

### GitHub Pages

```bash
# Instalar gh-pages
npm install -D gh-pages

# Añadir script en package.json
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Contacto

Portfolio Interactivo - Proyecto de demostración

---

Construido con ❤️ usando React, TypeScript y Tailwind CSS
