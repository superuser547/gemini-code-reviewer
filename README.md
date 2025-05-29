# Run and deploy locally

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
   ---

   ## 🚀 Features

   - **Easy local development**: Start coding right away with minimal setup.
   - **Environment-based configuration**: Securely manage your API keys.
   - **AI integration ready**: Easily connect to your preferred AI service.

   ## 📦 Project Structure

   ```
   .
   ├── public/           # Static assets
   ├── src/              # Source code
   ├── .env.local        # Environment variables
   ├── package.json      # Project metadata & scripts
   └── README.md         # Project documentation
   ```

   ## 🛠️ Available Scripts

   - `npm run dev` — Start the development server
   - `npm run build` — Build the app for production
   - `npm run start` — Run the production build

   ## 📝 Environment Variables

   Create a `.env.local` file in the root directory and add your API key:

   ```
   API_KEY=your_api_key_here
   ```

   ## 🤝 Contributing

   Contributions are welcome! Please open issues or submit pull requests for improvements.

   ## 📄 License

   This project is licensed under the [MIT License](LICENSE).

   ---