require('dotenv').config()

export default {
    API_KEY: process.env.REACT_APP_PRICE_API_KEY,
    PIVOT_API: process.env.REACT_APP_PIVOT_API,
    dates: [
        {
            text: process.env.REACT_APP_EXPIRE1_TEXT,
            stamp: process.env.REACT_APP_EXPIRE1_TIMESTAMP
        },
        {
            text: process.env.REACT_APP_EXPIRE2_TEXT,
            stamp: process.env.REACT_APP_EXPIRE2_TIMESTAMP
        },
        {
            text: process.env.REACT_APP_EXPIRE3_TEXT,
            stamp: process.env.REACT_APP_EXPIRE3_TIMESTAMP
        },
        {
            text: process.env.REACT_APP_EXPIRE4_TEXT,
            stamp: process.env.REACT_APP_EXPIRE4_TIMESTAMP
        },
        {
            text: process.env.REACT_APP_EXPIRE5_TEXT,
            stamp: process.env.REACT_APP_EXPIRE5_TIMESTAMP
        }
    ]
}