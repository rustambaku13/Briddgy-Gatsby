import { Link } from "gatsby-plugin-intl"
import React from "react"

export const LinkOverlay = props => {
  return (
    <Link className="link-overlay" {...props}>
      {props.children}
    </Link>
  )
}
