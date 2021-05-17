
import CMS from "netlify-cms-app"

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    try{
      const slug = entry.get("slug")
      if(slug && slug.length){
      return entry.get("data").set("slug", )}
    }catch{

    }
  },
})
