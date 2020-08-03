import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import History from './history'

import Home from '../views/home'

const Routes = () => (
	<Router history={History}>
		<Switch>
			<Route path="/" exact={true} component={Home} />

			<Redirect path="*" to="/" />
		</Switch>
	</Router>
)

export default Routes
