require('dotenv').config()

export default {
    PIVOT_API: process.env.REACT_APP_PIVOT_API,
    PIVOT_ADDRESS: process.env.REACT_APP_PIVOT_ADDRESS,
    TOKEN_ADDRESS: process.env.REACT_APP_TOKEN_ADDRESS,
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
    ],
    strikes: [220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500]
}