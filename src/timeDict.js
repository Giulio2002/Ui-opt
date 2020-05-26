require('dotenv').config()

let timeDict = {};

timeDict[process.env.REACT_APP_EXPIRE1_TIMESTAMP] = process.env.REACT_APP_EXPIRE1_TEXT
timeDict[process.env.REACT_APP_EXPIRE2_TIMESTAMP] = process.env.REACT_APP_EXPIRE2_TEXT
timeDict[process.env.REACT_APP_EXPIRE3_TIMESTAMP] = process.env.REACT_APP_EXPIRE3_TEXT
timeDict[process.env.REACT_APP_EXPIRE4_TIMESTAMP] = process.env.REACT_APP_EXPIRE4_TEXT
timeDict[process.env.REACT_APP_EXPIRE5_TIMESTAMP] = process.env.REACT_APP_EXPIRE5_TEXT

export default timeDict;