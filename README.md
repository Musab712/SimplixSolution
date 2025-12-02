# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ad629a4a-2ea3-4c3b-b5e5-5e98e4cd897a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ad629a4a-2ea3-4c3b-b5e5-5e98e4cd897a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js/Express (Backend API)
- n8n (Workflow automation)
- Supabase (Database)

## Backend Setup

This project includes a backend API that handles contact form submissions and triggers n8n workflows.

### Backend Setup Steps:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your n8n webhook URL:
   - Get your n8n webhook URL from your n8n workflow
   - Set `N8N_WEBHOOK_URL` in the `.env` file

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000` by default.

### Frontend Environment Setup:

Create a `.env` file in the root directory (if not exists):
```bash
VITE_API_URL=http://localhost:3000/api
```

For production, update this to your deployed backend URL.

See `backend/README.md` for detailed backend documentation.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ad629a4a-2ea3-4c3b-b5e5-5e98e4cd897a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
