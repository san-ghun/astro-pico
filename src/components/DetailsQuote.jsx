// DetailsQuote.jsx
// description: Return a details tag with summary and blockquote, having random quote from a function.
// obstacle:

/**
 * Returns a details tag with summary and blockquote, having a random quote from a predefined list.
 *
 * @return {JSX.Element} A JSX element representing the details tag with a random quote.
 */
export default function RandomQuote() {
  // List of quotes
  const quotes = [
    {
      title: "Build with Astro, Shine with Pico",
      description:
        "The ultimate framework for creating stunning, high-performance blogs effortlessly. AstroPico merges the robust, modern architecture of Astro with the sleek, minimalist styling of Pico CSS, providing a seamless development experience that lets your content shine. Whether you're a novice or a seasoned developer, AstroPico empowers you to build responsive, lightning-fast, and visually captivating blogs with ease. Elevate your web development game and let your blog stand out with AstroPico.",
      cite: "cHATgpt 4O",
    },
    {
      title: "Lightweight & Looks Great",
      description:
        "The perfect solution for creating stylish, high-performance blogs with minimal effort. AstroPico combines the powerful, component-based architecture of Astro with the elegant simplicity of Pico CSS, delivering a seamless and enjoyable development experience. Whether you're a seasoned developer or just starting, AstroPico enables you to build responsive, fast-loading, and visually appealing blogs effortlessly. Embrace the future of web development with AstroPico, where performance meets aesthetic excellence.",
      cite: "ChAtGpT Fo",
    },
    {
      title: "Lightweight (or Right-way) for a Stylish but Lazy Astronaut",
      description:
        "The perfect blend of efficiency and style for modern web development. AstroPico leverages the powerful, flexible architecture of Astro and the minimalist elegance of Pico CSS, allowing you to create beautiful, high-performance blogs with minimal effort. Designed for developers who value simplicity and aesthetics, AstroPico ensures your blog not only loads quickly but also looks stunning. Embrace the smart, effortless way to build and style your blog with AstroPico, where even the laziest astronaut can achieve stellar results.",
      cite: "cHaTgPt fO",
    },
  ];

  // Pick a random quote from the list
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return (
    // Details tag with summary and blockquote
    <details open>
      <summary>
        <u>AstroPico</u>: {randomQuote.title}
      </summary>
      <blockquote>
        "{randomQuote.description}"
        <footer>
          <cite>- {randomQuote.cite}</cite>
        </footer>
      </blockquote>
    </details>
  );
}
