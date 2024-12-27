# Invoice Platform

## Overview

The **Invoice Platform** is a comprehensive solution for creating, managing, and analyzing invoices. Built with modern technologies such as **Next.js**, **Prisma**, **NeonDB (PostgreSQL)**, and **Auth.js**, this platform ensures scalability and efficiency. It includes features such as email-based login with verification, PDF invoice generation, email delivery, automated reminders, and a detailed analytics dashboard.

---

## Key Features

- **Authentication**: Secure email-based login with verification using Auth.js.
- **Dashboard**:
  - Overview of invoices with detailed analytics (paid/unpaid status, trends).
  - Revenue tracking and performance metrics.
- **Invoice Management**:
  - Create, edit, view, and delete invoices.
  - Automatic PDF generation and email delivery to clients.
- **Automated Reminders**: Email reminders for overdue invoices.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Demo

[Insert link to live demo or screenshots]

---

## Technology Stack

- **Frontend**: [React.js](https://reactjs.org/) with [Next.js](https://nextjs.org/)
- **Backend**: Next.js API Routes
- **Database**: [NeonDB (PostgreSQL)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Auth.js](https://authjs.dev/) with email verification
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Email**: [Nodemailer](https://nodemailer.com/) for sending emails
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Charts/Graphs**: [Recharts](https://recharts.org/)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)

---

## Prerequisites

- **Node.js**: Version 18 or higher
- **PostgreSQL Database**: Hosted on [NeonDB](https://neon.tech)
- **Email Provider**: SMTP credentials for sending emails

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd invoiceplatform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Prisma and NeonDB
- Create a NeonDB account and set up a PostgreSQL database.
- Update the `.env` file:
  ```env
  DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
  ```

### 4. Generate Prisma client
```bash
npx prisma generate
```

### 5. Run database migrations
```bash
npx prisma migrate dev
```

### 6. Configure Auth.js
Update the `.env` file with email credentials:
```env
EMAIL_SERVER_USER="<your-email@example.com>"
EMAIL_SERVER_PASSWORD="<email-password>"
EMAIL_SERVER_HOST="<smtp.example.com>"
EMAIL_SERVER_PORT="587"
NEXTAUTH_SECRET="<random-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

### 7. Start the development server
```bash
npm run dev
```

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs linting on the codebase.
- `npm run postinstall`: Generates Prisma client automatically after dependencies installation.

---

## Features in Detail

### 1. Authentication
- Users log in using their email address.
- Email verification is required for first-time login.

### 2. Dashboard
- Displays all invoices, categorized as paid/unpaid/overdue.
- Provides analytics like revenue trends, payment statuses, and reminders.

### 3. Invoice Management
- **Create Invoice**: Add client details, due date, and items.
- **Edit Invoice**: Modify invoice details before or after sending.
- **Delete Invoice**: Remove invoices permanently.
- **View Invoice**: Preview full details of any invoice.
- **PDF Delivery**: Automatically generate and email a PDF invoice to the client.

### 4. Automated Email Reminders
- Sends reminders to clients for overdue invoices.
- Configurable based on due dates.

---

## Environment Variables

Add these variables to your `.env` file:
```env
DATABASE_URL="your-database-url"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Deployment

### 1. Build the application
```bash
npm run build
```

### 2. Deploy to Vercel
- Connect the repository to [Vercel](https://vercel.com/).
- Add environment variables to Vercel.
- Deploy the application.

### 3. Database Hosting
- Use NeonDB for your production database.
- Update the `DATABASE_URL` in Vercel's environment variables.

---

## Project Structure

```
invoiceplatform/
├── prisma/                  # Prisma schema and migrations
├── public/                  # Static files
├── src/
│   ├── pages/
│   │   ├── api/             # API routes
│   │   ├── dashboard/       # Dashboard and analytics pages
│   │   ├── auth/            # Authentication pages
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom hooks
│   ├── styles/              # Global styles
│   ├── utils/               # Utility functions
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
```

---

## Future Enhancements

- **Multi-Currency Support**: Enable invoices in multiple currencies.
- **Payment Gateways**: Integrate online payment solutions (e.g., Stripe, PayPal).
- **User Roles**: Add role-based access for Admin, Accountant, etc.
- **Export Options**: Support CSV/Excel exports of invoice data.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NeonDB](https://neon.tech)
- [Auth.js](https://authjs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/)

---

## Contact

For any inquiries or issues, please create an issue in the repository or contact us at [your-email@example.com].

