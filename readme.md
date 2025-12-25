# ⚡ API Tester

<div align="center">

![API Tester Banner](https://img.shields.io/badge/API-Tester-00D9FF?style=for-the-badge&logo=thunder&logoColor=white)

A sleek, modern API testing tool with an electric blue design. Built for developers who appreciate beautiful interfaces and powerful functionality.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-00D9FF?style=flat-square)](LICENSE)

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [Contributing](#contributing)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Multiple HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
- **Real-time Request Testing**: Send API requests and view responses instantly
- **Visual Status Indicators**: Color-coded status codes with response times

### 🔧 Advanced Tools
- **🔐 Header Management**: Add, edit, and toggle custom headers with ease
- **🔗 Query Parameters**: Build complex URLs with an intuitive parameter builder
- **📝 Request Body Editor**: Clean JSON editor for POST/PUT/PATCH requests
- **💾 Save & Load Requests**: Store frequently used API calls for quick access
- **📊 Response Analytics**: View response time, size, status, and headers
- **📥 Export Responses**: Download API responses as JSON files
- **📋 One-Click Copy**: Copy response data to clipboard instantly

### 🎨 Design
- **Dark Theme**: Professional black interface with electric blue accents
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Polished transitions and hover effects
- **Organized Tabs**: Clean tabbed interface for params, headers, and body
- **Sidebar Navigation**: Quick access to all saved requests

---

## 🖼️ Demo

### Main Interface
The clean, intuitive interface with electric blue highlights makes API testing a breeze.

### Request Builder
Build complex requests with headers, query parameters, and request bodies.

### Response Viewer
View formatted JSON responses with syntax highlighting and detailed metrics.

---

## 🚀 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/api-tester.git
cd api-tester
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

---

## 📖 Usage

### Making Your First Request

1. **Select HTTP Method**: Choose from GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS
2. **Enter URL**: Type or paste your API endpoint
3. **Add Parameters** (Optional): Click the "Params" tab to add query parameters
4. **Add Headers** (Optional): Click the "Headers" tab to add custom headers
5. **Add Body** (For POST/PUT/PATCH): Click the "Body" tab to add JSON data
6. **Send Request**: Click the blue "Send" button
7. **View Response**: See the response with status, time, and data

### Saving Requests

1. Enter a name in the "Request name" field
2. Configure your request (method, URL, headers, etc.)
3. Click the "Save" button
4. Your request appears in the left sidebar
5. Click any saved request to load it instantly

### Quick Examples

Try these built-in examples to get started:
- **GET Example**: Fetch a sample post from JSONPlaceholder
- **POST Example**: Create a new post with sample data
- **GitHub API**: Query the GitHub API for user data

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Send request
- `Ctrl/Cmd + S`: Save current request

---

## 🛠️ Built With

- **[React](https://reactjs.org/)**: Frontend framework
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)**: Beautiful icon set
- **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)**: HTTP client

---

## 📁 Project Structure

```
api-tester/
├── src/
│   ├── components/
│   │   └── APITester.jsx       # Main component
│   ├── App.js                  # App entry point
│   └── index.js                # React DOM render
├── public/
│   └── index.html              # HTML template
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🎯 Use Cases

- **API Development**: Test your APIs during development
- **Debugging**: Troubleshoot API issues with detailed response data
- **Documentation**: Save example requests for API documentation
- **Learning**: Perfect for beginners learning about REST APIs
- **Integration Testing**: Verify API integrations before coding

---

## 🔒 Security Note

This tool runs entirely in your browser. No data is sent to external servers except for the API endpoints you're testing. Saved requests are stored locally in your browser.

⚠️ **Important**: Never share API keys or sensitive tokens in screenshots or public repositories.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Feature Ideas
- Authentication presets (Bearer, Basic, OAuth)
- Request history with timestamps
- Environment variables support
- Import/Export collections (Postman format)
- WebSocket support
- GraphQL query builder
- Request chaining
- Performance testing (multiple requests)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Test API by [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Scripted by @SYOP200
- Inspired by Postman, Insomnia, and other API clients

---

## 📧 Contact

Project Link: [https://github.com/SYOP200/api-tester](https://github.com/SYOP200/api-tester)

Email: Finnwhiskey@gmail.com
---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ⚡ and 💙

</div>
