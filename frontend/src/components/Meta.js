import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Speed Quiz',
  description: 'a fun classroom or group activity where you must act or or describe a word to gain points',
  keywords: 'charades, speed quiz, english, esl',
}

export default Meta
