// Allows us to load global CSS Files
// This App component can be used to keep state when navigating between pages

import '../styles/global.css'

// export default function App({Component, pageProps}) {
//   return <Component {...pageProps} />
// }


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
