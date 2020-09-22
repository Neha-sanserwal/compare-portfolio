import { Redirect } from 'react-router-dom';
import React ,{useEffect,useState} from 'react';
import * as Api from '../Api'

const withAuthorization = Component =>(props) => {
	const [isChecking, setIsChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	useEffect(() => {
    Api.getCurrentUser().then((user)=>{
			if(user.login){
				setIsLoggedIn(true);
			}else{
				setIsLoggedIn(false);
			}
			setIsChecking(false);
		});
	}, []);
	const componentToReturn =	isLoggedIn ? <Component {...props} /> : <Redirect to="/"/>;
	 
	return !isChecking? componentToReturn:null;
}

export default withAuthorization;