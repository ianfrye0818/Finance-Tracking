# Modern Banking App

A modern, full-stack banking application built with React, TypeScript, and Prisma. This application provides a comprehensive solution for personal finance management with features like account tracking, transaction management, budgeting, and more.

## Features

- **Account Management**

  - Multiple account types (checking, savings, credit, investment, loan)
  - Account balance tracking
  - Account notes and status management

- **Transaction Management**

  - Track income and expenses
  - Categorize transactions
  - Add tags for better organization
  - Support for recurring transactions
  - Transaction reminders

- **Budgeting**

  - Create budgets for different categories
  - Track spending against budgets
  - Multiple budget periods (weekly, monthly, quarterly, yearly)

- **Categories and Tags**
  - Hierarchical category system with subcategories
  - Custom tags for transaction organization
  - Flexible categorization system

## Tech Stack

- **Frontend**

  - React 19
  - TypeScript
  - TanStack Router
  - TailwindCSS
  - Shadcn UI Components
  - React Hook Form
  - Zod for validation

- **Backend**
  - Prisma ORM
  - SQLite Database
  - Vinxi for full-stack development

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd banking-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the database:

   ```bash
   pnpm db:migrate
   pnpm db:generate
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

### Database Management

- Generate Prisma client: `pnpm db:generate`
- Run migrations: `pnpm db:migrate`
- Open Prisma Studio: `pnpm db:studio`
- Pull database schema: `pnpm db:pull`
- Push database schema: `pnpm db:push`
- Seed database: `pnpm db:seed`

## Development

The project uses several development tools:

- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- TypeScript for type safety

## Project Structure

```
banking-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── routes/        # Application routes
│   ├── lib/          # Utility functions and shared code
│   ├── generated/    # Generated Prisma client
│   └── styles.css    # Global styles
├── prisma/
│   └── schema.prisma # Database schema
└── public/          # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
