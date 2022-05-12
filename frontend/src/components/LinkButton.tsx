import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getCorrectUrl } from '../utils/utils'
interface Props {
  url: string
  text: string
  customStyles?: React.CSSProperties
  props?: ButtonProps
  children?: JSX.Element
  onClickFnc?: () => void
}

const LinkButton = ({ url, text, customStyles = {}, props = {}, children, onClickFnc }: Props) => {
  return (
    <Button style={{ ...customStyles, padding: 0 }} onClick={onClickFnc} {...props}>
      <Link to={getCorrectUrl(url)} className="nav-link">
        {text}
        {children}
      </Link>
    </Button>
  )
}

export default LinkButton
