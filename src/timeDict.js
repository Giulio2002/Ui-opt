require('dotenv').config()

let timeDict = {};

timeDict[process.env.REACT_APP_EXPIRE1_TIMESTAMP] = process.env.REACT_APP_EXPIRE1_TEXT
timeDict[process.env.REACT_APP_EXPIRE2_TIMESTAMP] = process.env.REACT_APP_EXPIRE2_TEXT
timeDict[process.env.REACT_APP_EXPIRE3_TIMESTAMP] = process.env.REACT_APP_EXPIRE3_TEXT
timeDict[process.env.REACT_APP_EXPIRE4_TIMESTAMP] = process.env.REACT_APP_EXPIRE4_TEXT
timeDict[process.env.REACT_APP_EXPIRE5_TIMESTAMP] = process.env.REACT_APP_EXPIRE5_TEXT

timeDict[process.env.REACT_APP_EXPIRE1_TEXT] = process.env.REACT_APP_EXPIRE1_TIMESTAMP
timeDict[process.env.REACT_APP_EXPIRE2_TEXT] = process.env.REACT_APP_EXPIRE2_TIMESTAMP
timeDict[process.env.REACT_APP_EXPIRE3_TEXT] = process.env.REACT_APP_EXPIRE3_TIMESTAMP
timeDict[process.env.REACT_APP_EXPIRE4_TEXT] = process.env.REACT_APP_EXPIRE4_TIMESTAMP
timeDict[process.env.REACT_APP_EXPIRE5_TEXT] = process.env.REACT_APP_EXPIRE5_TIMESTAMP

export default timeDict;