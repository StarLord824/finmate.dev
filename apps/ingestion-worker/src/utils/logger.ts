import pino from "pino";

// export const logger = pino({
    
// })

const level = process.env.LOG_LEVEL ?? "info";
export const logger = pino({ level });