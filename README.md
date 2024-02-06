
# Vieweather

## Introduction
**Vieweather** is a streamlined and efficient weather application offering a comprehensive 5-day forecast. 

Experience the live version of Vieweather [here](https://vieweather.vercel.app).

## How to Run Locally
To set up Vieweather on your local environment, follow these steps:

1. **Clone the Repository:**
   Start by cloning the repository to your local machine.
   ```bash
   git clone https://github.com/your-repo/vieweather.git
   ```
   
2. **Install Dependencies:**
   Navigate to the project directory and install the required dependencies.
   ```bash
   cd vieweather
   npm install
   ```
   
3. **Set Environment Variables:**
   Create a `.env` file in the root of your project and set the necessary environment variables.
   ```
   OPENWEATHER_KEY=your_openweather_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000 (Only needed if a live deploy will be done later on)
   ```
   
4. **Run the Application:**
   Launch the development server.
   ```bash
   npm run dev
   ```
   Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

## Features
Vieweather is not just about checking the weather. It's about experiencing it in a way that's tailored to your needs and preferences. Here are the features that make Vieweather stand out:

- **City and Zip Code Search:** Find weather forecasts by entering a city name or a zip code, making it versatile for different user needs.
- **Theme Toggle:** Switch between Dark, Light, or use the System theme to match your device settings, offering a personalized user interface.
- **Unit Toggle:** Choose your preferred units (Metric, Imperial, Kelvin) for temperature and wind speed, catering to a global audience.
- **Internationalization:** Supports multiple languages, date, and time formats, enhancing the app's global usability.
- **Responsive Design:** Adapts seamlessly to any screen size, ensuring a consistent experience across devices.
- **SEO Optimization:** Incorporates Meta tags, sitemaps, manifest, and icons to improve visibility on search engines.
- **Accessibility Features:** Implements ARIA labels, keyboard navigation, and native elements to support users with disabilities.
- **Optimized Search Parameters:** Vieweather enhances user interaction by offering full control through simple URL modifications. Effortlessly switch languages, cities, or measurement units with just a few keystrokes.
- **Dynamic Loading & Error States:** Ensures a smooth user experience by handling loading sequences and error states gracefully.
- **Engaging Animations:** Enhances user interaction with subtle and purposeful animations.

## Technical Features
Under the hood, Vieweather leverages cutting-edge technologies and coding practices to ensure a fast, reliable, and maintainable application:

- **Server Components:** Utilizes Next.js 13+ server components for improved performance and scalability.
- **Cache Control:** Implements efficient caching strategies to minimize load times and reduce server requests.
- **Font Optimization:** Ensures text is sharp and loads quickly, enhancing readability and performance.
- **State & Context Management:** Manages application state and context effectively, ensuring a smooth user experience.
- **API Integrations:** Seamlessly integrates with the OpenWeatherMap API to fetch accurate and up-to-date weather data.
- **CSS Variables:** Employs CSS variables for a more flexible and maintainable styling approach.
- **Local Storage for Preferences:** Remembers user preferences such as theme and units by storing them locally.

## Technologies & Tools
Vieweather is built using a robust stack of technologies and tools, ensuring a modern, fast, and secure application:

- **NextJS 14:** Employs the latest version of NextJS with App Router and Server Components, harnessing the power of React 18 for a state-of-the-art development experience.
- **CSS Modules:** Adopts CSS Modules for component-scoped styles, ensuring a clean and maintainable codebase.
- **TypeScript:** Utilizes TypeScript for type safety, enhancing code quality and maintainability.
- **ESLint & Prettier:** Incorporates ESLint and Prettier with a meticulously crafted custom configuration, ensuring consistent coding standards and formatting. 
- **OpenWeatherMap API:** Fetches weather data from a reliable and comprehensive source.
- **Vercel:** Hosts the application on Vercel, ensuring optimal performance and scalability.