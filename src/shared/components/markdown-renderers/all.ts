import { ElementType } from "react"
import Code from "./code"
import HeaderN from "./header-N"
import AToLink from "./link"
import ULWithListClass from "./ul"

const allRenderers: Record<string, ElementType<any>> = {
  link: AToLink,
  heading: HeaderN,
  code: Code,
  ul: ULWithListClass,
}

export default allRenderers
