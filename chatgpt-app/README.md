# ChatGPT Clone

A minimal ChatGPT-like web application built with Next.js and the OpenAI API.

## Features

- Clean, light-themed user interface with margins
- Real-time chat with GPT-3.5-turbo model
- Conversation management (clear conversations, export chat history)
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chatgpt-app.git
cd chatgpt-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your OpenAI API key as an environment variable
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [OpenAI API](https://openai.com/api/) - AI model provider
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## License

This project is licensed under the MIT License - see the LICENSE file for details.
