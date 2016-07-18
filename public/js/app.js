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
            <div className="signup"> 
              <SignupForm 
                initialCreate={this.state.authenticatedUser} 
                onChange={this.changeLogin}
              />
            </div>
            <div className="login">
              <LoginForm 
                initalLoginCheck={this.state.authenticatedUser} 
                onChange={this.changeLogin}
              />
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
				<label htmlFor="username">username</label>
				<input className="username-login-form" 
				type="text" value={this.state.username} 
				onChange={this.handleLoginFormChange.bind(this,'username')}/>
				<br/>
				<label htmlFor="password">password</label>
				<input className="password-login-form" 
				type="text" value={this.state.password} 
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
				type="text" value={this.state.password} 
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
			act25: [],
			sat25: [],
			showResults: false,
			showProfile: false,
			firstName:'',
			lastName:'',
			savedSchools: []
		};
	},
	//for entering in schools. this will push scores into the array for searching via the API
	schools(addScores){
		var schools1 = this.state.act25.slice();
		var schools2 = this.state.sat25.slice();
		this.setState({act25: schools1});
		this.setState({sat25: schools2});
	},
	//get college results
	getShowResults: function(){
    this.setState({showResults: !this.state.showResults});
  },
  handleHistory: function(data){
    // console.log('firstName: ' + data.firstName);
    // console.log('savedSchools: ' + data.savedSchools);
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      savedSchools: data.savedSchools,
      showProfile: true,
      showResults: false,
      act25: [],
      sat25: []
    });
  },
	render: function(){
		//this will render the test reults user inputs. may not need this though for this app..
		// var showScores = this.state.scores.map
		///<nav>
		//		<div className={this.state.showProfile ? "hidden" : "userProfile"}>
		//		<ProfileLink handleHistory={this.handleHistory}/>
			//	</div>
			//</nav>
		console.log('LALALA');
		return(
			//hide user profile when on the homepage
			<div>
				<AddScoresForm onSubmit={this.schools}/>
				<SearchSchoolForm 
					act25 = {this.state.act25}
					sat25 = {this.state.sat25}
				/>
			</div>

			//if we are on user profile, then hide show results ;)
			//nav bar here
			);
	}
});

var AddScoresForm = React.createClass({
	getInitialState: function(){
		return {
			sat25: "",
			act25: ""
		}
	},
	handleActChange: function(e){
		this.setState({act25: e.target.value});
	},
	handleSatChange: function(e){
		this.setState({sat25: e.target.value});
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onSubmit(
			{act25: this.state.act25, sat25: this.state.sat25}			
		);
		this.setState({act25: "", sat25: ""});
	},
	render: function(){
		return (
			<div>
			<p className="searchColleges">
			Search Schools right for you!
			</p>
			<form
				className="searchSchoolsForm"
				onSubmit={this.handleSubmit}
			>
			<input
				className="actScore"
				type="text"
				placeholder="ACT score"
				value={this.state.act25}
				onChange={this.handleActChange}
				/>
			</form>
			</div>
			);
	}
});

var SearchSchoolForm = React.createClass({
	getInitialState: function(){
		return({result:[] });
	},
	handleResults: function(schoolData){
		var results1 =[];
		schoolData.forEach(function(school){
			var showSchool = {
				act25: school.result.act25,
				sat25: school.result.sat25,
				name: school.result.name
			}
			results1.push(showSchool);
		});
		console.log("==============");
		console.log(results1);
		this.props.getShowResults();
		this.replaceState({results: {
			act25: school.result.act25,
			sat25: school.result.sat25
		}
	});
	},
	getResults: function(){
		var act25Query = this.props.act25;
		// var sat25Query = this.props.sat25;
		var sat25Query = 1200;
		$.ajax({
      url: '/users/search',
      method: 'GET',
      data: {
      	act25: act25Query,
      	sat25: sat25Query
      },
      success: function(data){
        console.log(data);
        // this.handleResults(data.hits);
      }.bind(this),   // ensuring that the object being returned is the object being fed into the application
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this),
    })
	},
	render: function(){
		return(
			<div className="result">
			<button onClick={this.getResults()}>
				Search!
			</button>
			</div>
			)
	}
})


ReactDOM.render(
	<div>
	<ApplicationDisplay/>
	</div>,
	document.getElementById('content-container')
	);