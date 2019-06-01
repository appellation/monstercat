import { createLogger, format, transports } from 'winston';
export default createLogger({
	format: format.combine(
		format.timestamp(),
		format.splat(),
		format.simple(),
	),
	transports: [
		new transports.Console(),
	],
});
