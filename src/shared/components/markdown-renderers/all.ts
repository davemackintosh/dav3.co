import AToLink from "./link"
import HeaderN from "./header-N"
import Code from "./code"
import ULWithListClass from "./ul"

const allRenderers = {
  link: AToLink,
  heading: HeaderN,
  code: Code,
  ul: ULWithListClass,
}

export default allRenderers
