# Il Ciclo del Carbonio - Educational Website

## Overview

This is an Italian educational website about the carbon cycle (Il Ciclo del Carbonio) designed as a school project for high school students studying chemistry and environmental science. The application provides interactive content including detailed explanations of the carbon cycle, quizzes, infographics, and educational materials that connect science with literature through Primo Levi's work.

The website features a clean, modern design with a focus on accessibility and educational effectiveness, incorporating interactive panels, image modals, and quiz functionality to enhance learning engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with 8 main educational sections
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom educational color palette (white backgrounds, blue/green accents)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API endpoints
- **Development**: Hot module replacement and middleware for request logging
- **Static Assets**: Serves React build in production with educational images and resources

### Component Design System
- **Interactive Components**: Collapsible panels for educational content exploration
- **Modal System**: Image zoom functionality for infographics and diagrams
- **Quiz Engine**: Interactive quiz components with immediate feedback and scoring
- **Navigation**: Responsive navigation with mobile hamburger menu
- **Cards**: Reusable section cards for content organization

### Data Management
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Local State**: React hooks for component-level state
- **Form Handling**: React Hook Form with Zod validation schemas

### Educational Content Structure
- **8 Main Sections**: Home, Carbon Cycle explanation, Interactive Quiz, Infographics, Civic Education, Conscious Citizen practices, Literature & Science (Primo Levi), Bibliography
- **Multilingual**: Fully Italian interface optimized for Italian high school curriculum
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

### Design System
- **Typography**: Google Fonts (Montserrat for headings, Open Sans for body text)
- **Color Scheme**: Educational palette with primary blue (210 85% 45%) and accent green (150 70% 40%)
- **Responsive**: Mobile-first design with Bootstrap-inspired grid system
- **Animations**: Subtle hover effects and transitions for improved user experience

## External Dependencies

### UI and Styling
- **Radix UI**: Complete primitive component library for accessible UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom educational theme
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### Development and Build
- **Vite**: Modern build tool with TypeScript support and React plugin
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Database and Validation
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database service
- **Zod**: Runtime type validation for forms and API schemas

### Fonts and Assets
- **Google Fonts**: Montserrat and Open Sans font families
- **Educational Images**: Curated images for carbon cycle diagrams, environmental impact visuals, and portrait images

### Development Tools
- **TypeScript**: Static type checking across client and server
- **React Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution for single-page application navigation