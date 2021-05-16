import CMS from "netlify-cms-app"

CMS.registerEventListener({
  name: "preSave",
  templates:["blog"],
  handler: ({ entry }) => {
    return entry.get("data").set("slug", entry.get("slug"))
  },
})
