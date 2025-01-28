import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App
