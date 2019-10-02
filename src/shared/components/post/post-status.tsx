import React from "react"
import { PostDraftNotif } from "@src/shared/theme/post"

const PostStatus = (postStatus: string): JSX.Element | null => {
  if (!process.env.DEV) return null
  if (postStatus === "draft") return <PostDraftNotif>DRAFT</PostDraftNotif>
  else return <PostDraftNotif>PUBLISHED</PostDraftNotif>
}

export default PostStatus
