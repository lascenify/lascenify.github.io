import type { Timeline, TimelineData } from '@/types/portfolio.types';

export const portfolioDataEN: Record<Timeline, TimelineData> = {
  past: {
    work: [
      {
        id: 'work-past-1',
        title: 'Junior Full-Stack Developer',
        company: 'Focus360',
        description: 'Full-stack development of a project from scratch for a tech startup',
        period: '2020 - 2021',
        technologies: ['Angular', 'Node.js', 'NestJS', 'Typescript', 'MySQL', 'Prisma', 'HTML', 'CSS'],
        highlights: [
          'Implementation of a complete web application from scratch',
          'Backend development with NestJS and Prisma',
          'Frontend development with Angular and TypeScript',
        ],
      },
      {
        id: 'work-past-2',
        title: 'Frontend Developer',
        company: 'Okode',
        description: 'Frontend development of applications for clients in the insurance sector',
        period: '2021 - 2022',
        technologies: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
        highlights: [
          'Maintenance and evolution of existing applications',
          'Implementation of responsive design',
          'Focus on efficiency and frontend development best practices',
        ],
      },
    ],
    projects: [
      {
        id: 'project-past-1',
        name: 'Memory Game',
        description: 'Memory game for Android developed with Kotlin and Java',
        technologies: ['Kotlin', 'Android Studio', 'Jetpack Compose'],
        link: 'https://github.com/lascenify/memory-game',
        gallery: [
          '/projects/memory-game-1.jpeg',
          '/projects/memory-game-2.jpeg',
          '/projects/memory-game-3.jpeg',
          '/projects/memory-game-4.jpeg',
          '/projects/memory-game-5.jpeg',
        ],
      },
      {
        id: 'project-past-2',
        name: 'Weather forecast app',
        description: 'Weather forecast application for Android using OpenWeatherMap API',
        technologies: ['Kotlin', 'Android Studio', 'Retrofit', 'MVVM'],
        link: 'https://github.com/lascenify/sunshine',
      }
    ],
    leisure: [
      {
        id: 'leisure-past-1',
        name: 'Ultimate Frisbee',
        description: 'Team frisbee game, I enjoy competition and team sports',
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
        description: 'Frontend team co-leadership, development of new features and optimization of the main application',
        period: '2022 - Present',
        technologies: ['React', 'TypeScript', 'Next.js', 'Jest', 'React Testing Library', 'HTML', 'CSS', 'GitHub Actions', 'Docker', 'Lerna', 'Webpack', 'Vite', 'Node.js', 'PHP'],
        highlights: [
          'Migration from monolithic application to microservices',
          'Implementation of new applications from scratch with Next.js and React',
          'Mentoring of 3 other frontend developers',
          'Optimization and technology migration to improve performance and user experience',
          'Evolutions on existing features and development of new features for the main application',
        ],
      },
    ],
    projects: [
      {
        id: 'project-present-1',
        name: 'Brot Veinal',
        description: 'Online platform for exchanging plant cuttings and plants among neighbors',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Vercel', 'shadcn/ui'],
        gallery: [
          '/projects/brot-veinal-1.jpg',
          '/projects/brot-veinal-2.jpg',
          '/projects/brot-veinal-3.jpg',
        ],
      },
      {
        id: 'project-present-2',
        name: 'OpenClaw Assistant',
        description: 'Multi-agent AI system with 6 specialized roles (coordinator, dev, architect, researcher, admin, ops) that automates the complete task cycle: analysis, planning, execution and notification, with responsive web dashboard and Telegram integration.',
        technologies: ['OpenClaw'],
        gallery: [
          '/projects/openclaw-1.jpg',
          '/projects/openclaw-2.jpg',
        ],
      },
      {
        id: 'project-present-3',
        name: 'Home automation system',
        description: 'Home automation system with centralized control and advanced customization',
        technologies: ['Raspberry Pi', 'Home Assistant'],
      },
    ],
    leisure: [
      {
        id: 'leisure-present-1',
        name: 'Carpentry',
        description: 'One of my passions is carpentry, where I design and build custom furniture for my home',
        icon: '🪚',
      },
      {
        id: 'leisure-present-2',
        name: 'Gaming',
        description: 'I love enjoying video games in my free time',
        icon: '🎮',
      },
      {
        id: 'leisure-present-3',
        name: 'Cooking',
        description: 'I enjoy experimenting with new vegetarian recipes and culinary techniques in the kitchen',
        icon: '👨‍🍳',
      },
      {
        id: 'leisure-present-4',
        name: 'Spinning',
        description: 'Healthy mind in healthy body',
        icon: '🚴‍♂️',
      },
      {
        id: 'leisure-present-5',
        name: 'Art',
        description: 'I love visiting museums and art galleries to get inspired and disconnect',
        icon: '🎨',
      },
      {
        id: 'leisure-present-6',
        name: 'Traveling',
        description: 'I am passionate about discovering new places, cultures and gastronomy by traveling around the world',
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
        description: 'Innovative software development in a dynamic and collaborative environment, with opportunities for professional growth and continuous learning.',
        period: '2026+',
        technologies: ['Quick Learner', 'Adaptable', 'Team Player'],
        highlights: [
          'Bring value to the product with my experience and technical skills',
          'Excitement for a product that I am passionate about',
          'Proactivity, autonomy and teamwork capability',
          'Remote work with flexible hours',
          'Interest in companies with purpose and social commitment',
          'Continuous evolution of AI tools that enhance my productivity and creativity',
        ],
      },
    ],
  },
};
