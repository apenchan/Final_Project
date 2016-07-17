console.log("I am working!");

var ApplicationDisplay = React.createClass({
	getInitialState: function(){
		var cookieCheck;
		if(document.cookie){
			cookieCheck = true;
		} else {
			cookieCheck = '';
		}
		return {
		authenticatedUser: cookieCheck,
	};
},
	changeLogin: function(){
		this.setState({
			authenticatedUser: true
		})
	},
	//this refreshes the page after initial signup
	// handleReset: function(){
	// 	this.setState({
	// 		authenticatedUser: ''
	// 	});
	// },
	render: function(){
		console.log(this.state.authenticatedUser);
		return (
				<LoginForm
				initialLoginCheck={this.state.authenticatedUser}
				onChange={this.changeLogin}/>
			)
		}
});

var LoginForm = React.createClass({
	getInitialState: function() {
		return{
			username: this.props.initialLoginCheck,
			password: this.props.initialLoginCheck,
			loginStatis: this.props.initialLoginCheck
		};
	},
	handleLoginFormChange: function(stateName, e) {
		var change= {};
		change[stateName] = e.target.value;
		this.setState(change);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.state.username.trim();
		var password = this.state.password.trim();
		this.loginAJAX(username, password);
	},
	loginAJAX: function(username, password) {
		$.ajax({
			url: "/auth",
			method: "POST",
			data: {
				username: username,
				password: password
			},
			success: function(data) {
				console.log("cookie is set");
				Cookies.set('jwt_token', data.token);
				console.log(data);
				//below will set the cookie to the data it was fed (ie username change)
				this.props.onChange(data.token)
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this),
		});
	},
	render: function(){
		return(
			<div className="login">
				<div className="login-form">
				<h3>Login In </h3>
				<form onSubmit={this.handleSubmit}>
				<label htmlFor="username">username</label>
				<input className="username-login-form" 
				type="text" value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'username')}/>
				<br/>
				<label htmlFor="password">password</label>
				<input className="password-login-form" 
				type="text" value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'password')}/>
				<br/>
				<input type="submit"/>
				</form>
				</div>
				</div>
			);
	}
});

var SignupForm = React.createClass({
	getInitialState: function() {
		return{
			firstName: this.props.initialLoginCheck,
			lastName: this.props.initialLoginCheck,
			username: this.props.initialLoginCheck,
			password: this.props.initialLoginCheck,
			loginStatis: this.props.initialLoginCheck
		};
	},
	handleLoginFormChange: function(stateName, e) {
		var change= {};
		change[stateName] = e.target.value;
		this.setState(change);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var firstName = this.state.firstName.trim();
		var lastName = this.state.lastName.trim();
		var username = this.state.username.trim();
		var password = this.state.password.trim();
		this.loginAJAX(firstName, lastName, username, password);
	},
	signupAJAX: function(firstName, lastNamr, username, password) {
		$.ajax({
			url: "/users/register",
			method: "POST",
			data: {
				firstName: firstName,
				lastName: lastName,
				username: username,
				password: password
			},
			success: function(data){
				this.setState({
          firstName: this.props.initialCreate,
          lastName: this.props.initialCreate, 
          username: this.props.initialCreate,
          password: this.props.initialCreate
        });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},
	render: function(){
		return(
			<div className="signup">
				<div className="signup-form">
				<h3>Create Account </h3>
				<form onSubmit={this.handleSubmit}>
				<label htmlFor="firstName">First name</label>
				<input className="firstName-login-form" 
				type="text" value={this.state.firstName} 
				onChange={this.handleLoginFormChange.bind(this,'firstName')}/>
				<br/>
				<label htmlFor="lastName">Last name</label>
				<input className="lastName-login-form" 
				type="text" value={this.state.lastName} 
				onChange={this.handleLoginFormChange.bind(this,'lastName')}/>
				<br/>
				<label htmlFor="username">username</label>
				<input className="username-login-form" 
				type="text" value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'username')}/>
				<br/>
				<label htmlFor="password">password</label>
				<input className="password-login-form" 
				type="text" value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'password')}/>
				<br/>
				<input type="submit"/>
				</form>
				</div>
				</div>
			);
	}
});



ReactDOM.render(
	<div>
	<ApplicationDisplay/>
	</div>,
	document.getElementById('content-container')
	);