# Onchain Project

This is a modern Next.js application built with TypeScript and Tailwind CSS.

## Tech Stack

- [Next.js 15.3.1](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ESLint](https://eslint.org/) - Code Linting
- Turbopack - Fast Development Server

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd onchain-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at:
- Local: [http://localhost:3000](http://localhost:3000)
- Network: http://[your-ip]:3000

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
onchain-project/
├── src/                # Source directory
│   ├── app/           # App router pages
│   ├── components/    # React components
│   └── styles/        # CSS styles
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Development

The project uses Next.js 13+ App Router and is configured with:
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Import aliases (@/* points to src/*)

## License

[Your License]
