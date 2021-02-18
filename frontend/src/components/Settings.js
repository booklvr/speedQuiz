import React, { Fragment } from 'react'
// import { Container } from 'react-bootstrap'
import PlayGameButtons from './PlayGameButtons'
import SettingsForm from './SettingsForm'

const Settings = () => {
  return (
    <Fragment>
      <h1 className='list-title'>Settings</h1>
      <PlayGameButtons />
      <SettingsForm />
    </Fragment>
  )
}

export default Settings
