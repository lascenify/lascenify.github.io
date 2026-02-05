import type { Timeline, TimelineData } from '@/types/portfolio.types';

export const portfolioDataES: Record<Timeline, TimelineData> = {
  past: {
    work: [
      {
        id: 'work-past-1',
        title: 'Junior Full-Stack Developer',
        company: 'Focus360',
        description: 'Desarrollo full-stack de un proyecto desde cero para una startup de tecnología',
        period: '2020 - 2021',
        technologies: ['Angular', 'Node.js', 'NestJS', 'Typescript', 'MySQL', 'Prisma', 'HTML', 'CSS'],
        highlights: [
          'Implementación desde cero de una aplicación web completa',
          'Desarrollo del backend con NestJS y Prisma',
          'Desarrollo del frontend con Angular y TypeScript',
        ],
      },
      {
        id: 'work-past-2',
        title: 'Frontend Developer',
        company: 'Okode',
        description: 'Desarrollo frontend de aplicaciones para clientes en el sector de los seguros',
        period: '2021 - 2022',
        technologies: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
        highlights: [
          'Evolutivos y mantenimiento de aplicaciones existentes',
          'Implementación de diseño responsive',
          'Foco en la eficiencia y en las mejores prácticas de desarrollo frontend',
        ],
      },
    ],
    projects: [
      {
        id: 'project-past-1',
        name: 'Memory Game',
        description: 'Juego de memoria para Android desarrollado con Kotlin y Java',
        technologies: ['Kotlin', 'Android Studio', 'Jetpack Compose'],
        link: 'https://github.com/lascenify/memory-game',
      },
      {
        id: 'project-past-2',
        name: 'Weather forecast app',
        description: 'Aplicación de pronóstico del tiempo para Android utilizando la API de OpenWeatherMap',
        technologies: ['Kotlin', 'Android Studio', 'Retrofit', 'MVVM'],
        link: 'https://github.com/lascenify/sunshine',
      }
    ],
    leisure: [
      {
        id: 'leisure-past-1',
        name: 'Ultimate Frisbee',
        description: 'Juego de frisbee en equipo, disfruto de la competencia y el deporte en equipo',
        icon: '🥏',
      },
    ],
  },
  present: {
    work: [
      {
        id: 'work-present-1',
        title: 'Senior Frontend Developer',
        company: 'ElParking - Mutua Madrileña',
        description: 'Co-liderazgo del equipo frontend, desarrollo de nuevas funcionalidades y optimización de la aplicación principal',
        period: '2022 - Presente',
        technologies: ['React', 'TypeScript', 'Next.js', 'Jest', 'React Testing Library', 'HTML', 'CSS', 'GitHub Actions', 'Docker', 'Lerna', 'Webpack', 'Vite', 'Node.js', 'PHP'],
        highlights: [
          'Migración de aplicación monolítica a microservicios',
          'Implementación de aplicaciones nuevas desde cero con Next.js y React',
          'Mentoría de otros 3 desarrolladores frontend',
          'Optimización y migración de tecnologías para mejorar el rendimiento y la experiencia de usuario',
          'Evolutivos sobre funcionalidades existentes y desarrollo de nuevas características para la aplicación principal',
        ],
      },
    ],
    projects: [
      {
        id: 'project-present-1',
        name: 'Plant-wise',
        description: 'Plataforma online para intercambio de esquejes y plantas entre vecinos',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'shadcn/ui', 'Tailwind CSS', 'Vercel', 'shadcn/ui'],
      },
      {
        id: 'project-present-2',
        name: 'OpenClaw Assistant',
        description: 'Sistema multi-agent de IA con 6 roles especializados (coordinator, dev, architect, researcher, admin, ops) que automatiza el ciclo completo de tareas: análisis, planificación, ejecución y notificación, con dashboard web responsive e integración con Telegram.',
        technologies: ['OpenClaw'],
      },
      {
        id: 'project-present-3',
        name: 'Home automation system',
        description: 'Sistema de automatización doméstica con control centralizado y personalización avanzada',
        technologies: ['Raspberry Pi', 'Home Assistant'],
      },
    ],
    leisure: [
      {
        id: 'leisure-present-1',
        name: 'Carpintería',
        description: 'Una de mis pasiones es la carpintería, donde diseño y construyo muebles personalizados para mi hogar',
        icon: '🪚',
      },
      {
        id: 'leisure-present-2',
        name: 'Gaming',
        description: 'Me encanta disfrutar jugando a videojuegos en mi tiempo libre',
        icon: '🎮',
      },
      {
        id: 'leisure-present-3',
        name: 'Cocina',
        description: 'Disfruto experimentando con nuevas recetas vegetarianas y técnicas culinarias en la cocina',
        icon: '👨‍🍳',
      },
      {
        id: 'leisure-present-4',
        name: 'Spinning',
        description: 'Mente sana en cuerpo sano',
        icon: '🚴‍♂️',
      },
      {
        id: 'leisure-present-5',
        name: 'Arte',
        description: 'Me encanta ir a museos y galerías de arte para inspirarme y desconectar',
        icon: '🎨',
      },
      {
        id: 'leisure-present-6',
        name: 'Viajar',
        description: 'Me apasiona descubrir nuevos lugares, culturas y gastronomía viajando por el mundo',
        icon: '✈️',
      }
    ],
  },
  future: {
    work: [
      {
        id: 'work-future-1',
        title: 'Senior Software Engineer',
        company: '???',
        description: 'Desarrollo de software innovador en un entorno dinámico y colaborativo, con oportunidades de crecimiento profesional y aprendizaje continuo.',
        period: '2026+',
        technologies: ['Quick Learner', 'Adaptable', 'Team Player'],
        highlights: [
          'Aportar valor al producto con mi experiencia y habilidades técnicas',
          'Ilusión por un producto que me apasione',
          'Proactividad, autonomía y capacidad de trabajo en equipo',
          'Trabajo remoto con flexibilidad horaria',
          'Interés en empresas con propósito y compromiso social',
          'Evolución continua de las herramientas de IA que potencien mi productividad y creatividad',
        ],
      },
    ],
  },
};
