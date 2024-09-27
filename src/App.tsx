
import AppContent from './components/AppContent'
import AppHeader from './components/AppHeader'
import PageTitle from './components/PageTitle'

function App() {

  return (
    <>
      <main className="container">
        <PageTitle>TODO LIST</PageTitle>
        <AppHeader></AppHeader>
        <div id="modal"></div>
        <AppContent></AppContent>
      </main>
    </>
  )
}

export default App
