// config
import config from '../config/constant'

// services

import {JwtService} from './jwt';

// services dependencies

import jwt from 'jsonwebtoken';

// Instanciate all your singleton service with dépendencies injection

const jwtService = new JwtService(jwt, config.jwt_secret);


// export all the libs services
export {jwtService};