import moment from "moment"
import { FRONTEND_DATE_FORMAT } from "../api"

export const momentize = (item,field="date")=>{
    item[field] = moment(item[field]).format(FRONTEND_DATE_FORMAT)
    return item
}