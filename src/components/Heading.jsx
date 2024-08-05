import React from 'react'

function Heading(props) {
  return (
    <h1 id={props.id}>{props.heading}</h1>
  )
}

export default Heading