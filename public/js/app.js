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
	handleReset: function(){
		this.setState({
			authenticatedUser: ''
		});
	},
	render: function(){
		console.log(this.state.authenticatedUser);
		if(this.state.authenticatedUser === true){
			return (
				<div>
					<Homepage/>
				</div>
					)
		} else {
		return (
 				<div className="forms">
 				    <div className="header">
							 <h2>Find Me Uni</h2>
						</div>
						<div className="website-blurb">
							 <p> Search through our catalogue of schools and find the unversity that's right for you</p>
						</div>
						<div className="login">
              <LoginForm 
                initalLoginCheck={this.state.authenticatedUser} 
                onChange={this.changeLogin}
              />
            <div className="signup"> 
              <SignupForm 
                initialCreate={this.state.authenticatedUser} 
                onChange={this.changeLogin}
              />
            		</div>
              </div>
          </div>
			)
			}
		}
});

var LoginForm = React.createClass({
	getInitialState: function() {
		return{
			username: this.props.initialLoginCheck,
			password: this.props.initialLoginCheck,
			loginStatus: this.props.initialLoginCheck
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
		console.log("work baby work");
		this.loginAJAX(username, password);
	},
	loginAJAX: function(username, password) {
		$.ajax({
			url: "/auth/",
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
				<input className="username-login-form" 
				type="text" 
				placeholder="Email"
				value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'username')}/>
				<br/>
				<input className="password-login-form" 
				type="text" 
				placeholder="password"
				value={this.state.password} 
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
		this.signupAJAX(firstName, lastName, username, password);
	},
	signupAJAX: function(firstName, lastName, username, password) {
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

				<input className="firstName-login-form" 
				type="text" 
				placeholder="First name"
				value={this.state.firstName} 
				onChange={this.handleLoginFormChange.bind(this,'firstName')}/>
				<br/>
				<input className="lastName-login-form" 
				type="text"
				placeholder="Last name" 
				value={this.state.lastName} 
				onChange={this.handleLoginFormChange.bind(this,'lastName')}/>
				<br/>
				<input className="username-login-form" 
				type="text" 
				placeholder="Email Address"
				value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'username')}/>
				<br/>
				<input className="password-login-form" 
				type="text" 
				placeholder="password"
				value={this.state.password} 
				onChange={this.handleLoginFormChange.bind(this,'password')}/>
				<br/>
				<input type="submit"/>
				</form>
				</div>
				</div>
			);
	}
});


var Homepage = React.createClass({
	getInitialState: function() {
		return {
			//scores array are the scores users will enter
			act25: "",
			sat25: "",
			showResults: false,
			schools: []
		};
	},
	componentDidMount: function() {
		this.submitRequest;
	},
	//get college results
	getShowResults: function(){
    this.setState({showResults: !this.state.showResults});
  },
	handleActChange: function(e) {
	  this.setState({ act25: e.target.value });
  },
  handleSatChange: function(e) {
	  this.setState({ sat25: e.target.value });
  },
	//for entering in schools. this will push scores into the array for searching via the API
	submitRequest: function(e){
		e.preventDefault();
		$.ajax({
			url: '/users/search',
			method: 'GET',
			data: {
				act25: this.state.act25,
				sat25: this.state.sat25
			},
			success: function(response) {
				// console.log(data);
				// this.getShowResults;
				// I need to set state and only want to show the first 20 results
				this.setState({schools: response.result.result.slice(0, 20)});
			}.bind(this),   // ensuring that the object being returned is the object being fed into the application
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this),
		});
	},
	render: function(){
		return(
			//hide user profile when on the homepage
			<div>
				<h1>
					Enter your score
				</h1>
				<form className="searchSchoolsForm" onSubmit={this.submitRequest}>
					<label for="act">Act</label>
					<input
						className="actScore"
						type="text"
						name="act"
						placeholder="ACT score"
						value={this.state.act25}
						onChange={this.handleActChange}
					/>
					<input
						className="actScore"
						type="text"
						name="sat"
						placeholder="SAT score"
						value={this.state.sat25}
						onChange={this.handleSatChange}
					/>
					<button type="submit">Search</button>
				</form>
				<SchoolList schools={this.state.schools}/>
			</div>
			);
	}
});

var SchoolList = React.createClass({
	render: function(){
		// var resultItems = this.props.getResults.map(function(result){
		console.log(this.props);
		//map through the results below
		var schoolNodes =  this.props.schools.map(function(school){
			return(
			<li>
				<h1>{school.name}</h1>
					<p>{school.act25}</p>
					<p>{school.sat25}</p>	
				</div>
			</li>
			);
		});
		return(
			<div className="results">
				<h1> Results yo</h1>
				<ul>
				{schoolNodes}
				</ul>
			</div>
		);
	}
});

// var Homepage = React.createClass({
// 	getInitialState: function(){
// 		return{
// 			act25: '',
// 			sat25: ''
// 		};
// 	},
// 		handleFormChange: function(e){
// 			console.log(e.target.value);
// 			this.setState({
// 				act25: event.target.value,
// 				sat25: event.target.value
// 				});
// 		},
// 		handleSubmit: function(e){
// 			e.preventDefault();
// 			var act25 = this.state.act25;
// 			var sat25 = this.state.sat25;
// 			this.submitformAJAX(act25, sat25);
// 			console.log("almost..");
// 		},
// 		submitformAJAX: function(act25, sat25) {
// 			$.ajax({
// 				url:'/users/search',
// 				method: 'GET',
// 				data: {
// 					act25: act25,
// 					sat25: sat25
// 				},
// 				success: function(data){
// 					console.log(data);
// 					this.setState({
// 						act25: act25,
// 						sat25: sat25
// 					});
// 				}.bind(this),
// 				error: function(xhr, status, err){
// 					console.error(status, err.toString());
// 				}.bind(this)
// 			});
// 		},
// 		render: function(){
// 			return(
// 			<div>
// 				<h1>
// 					Enter your score
// 				</h1>
// 					<form className="searchSchoolsForm" onSubmit={this.submitRequest}>
// 					<label for="act">Act</label>
// 					<input
// 						className="actScore"
// 						type="text"
// 						name="act"
// 						placeholder="ACT score"
// 						value={this.state.act25}
// 						onChange={this.handleActChange}
// 					/>
// 					<input
// 						className="actScore"
// 						type="text"
// 						name="sat"
// 						placeholder="SAT score"
// 						value={this.state.sat25}
// 						onChange={this.handleSatChange}
// 					/>
// 					<button type="submit">Search</button>
// 				</form>
// 				</div>
// 				)
// 		}
// });

ReactDOM.render(
	<div>
	<ApplicationDisplay/>
	</div>,
	document.getElementById('content-container')
	);

