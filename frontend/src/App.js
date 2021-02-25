import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlayGameScreen from './screens/PlayGameScreen'
import SavedWordLists from './screens/SavedWordListsScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container fluid>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/play' component={PlayGameScreen} />
          <Route path='/savedWordLists' component={SavedWordLists} />
          <Route path='/savedGame/:id' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
