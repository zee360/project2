import { createContext } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext(AuthService.getCurrentUser());

export default  AuthContext;

