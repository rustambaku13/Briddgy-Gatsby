
import CMS from "netlify-cms-app"

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    try{
      if (entry.get('slug')) {
        return entry.get('data').set('slug', entry.get('slug'));
      }
      else{
        return entry.get('data')
      }
    }catch{

    }finally{
      return entry.get('data')
    }
  },
})
