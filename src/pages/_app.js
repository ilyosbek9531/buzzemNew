import { ThemeProvider } from '@emotion/react'
import MainLayout from 'components/Layout'
import ServiceLayout from "components/Layout/ServiceLayout";
import 'styles/globals.scss'
import theme from 'mui-theme'
import { persistor, store } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NextNProgress from 'nextjs-progressbar'
import orderLayout from "../components/Layout/orderLayout";

const layouts = {
    MainLayout,
    ServiceLayout,
    orderLayout
}

function MyApp({ Component, pageProps }) {
    const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Layout>
              <NextNProgress
                  color="#C32C31"
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={5}
                  showOnShallow={true}
                  z-index={4000000}
                  position={'absolute'}
              />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
