import React from 'react'

function ContentCard(props) {
    const {image, heading, paragraph} = props;
  return (
    <div className='contentCard'>
        <div className='contentCard__image'></div>
        <section className='contentCard__section'>
            <h3>{heading}</h3>
            <p>{paragraph}</p>
        </section>
    </div>
  )
}

export default ContentCard