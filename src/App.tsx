import AppContent from './components/AppContent'
import AppHeader from './components/AppHeader'
import PageTitle from './components/PageTitle'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <main className="container">
        <PageTitle>TODO LIST</PageTitle>
        <AppHeader></AppHeader>
        <div id="modal"></div>
        <AppContent></AppContent>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  )
}

export default App
