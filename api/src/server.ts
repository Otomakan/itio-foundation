import app from './app'
import {connectDb as cdb} from './db/pool'
/**
 * Start Express server.
 */
const server = 
	cdb().then(() => {
		app.listen(app.get('port'), () => {
			console.log(
				'App is running at http://localhost:%d in %s mode',
				app.get('port'),
				app.get('env'),
			)
		})
	})

export default server
