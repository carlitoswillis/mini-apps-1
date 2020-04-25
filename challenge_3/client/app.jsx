
class SignUp extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <form name='signup'>
        <input id='username' placeholder='name' type='text' defaultValue=''/>
        <input id='useremail' placeholder='email' type='email' defaultValue=''/>
        <input id='userpassword' placeholder='password' type='password' defaultValue=''/>
      </form>
    );
  }
}

class Shipping extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <form name='shipping'>
        <input id='addresslineone' placeholder='address' type='text' defaultValue=''/>
        <input id='addresslinetwo' placeholder='apt number' type='text' defaultValue=''/>
        <input id='phonenumber' placeholder='phone number' type='tel' defaultValue=''/>
      </form>
    );
  }
}

class CardInfo extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <form name='CardInfo'>
        <input id='creditcardnumber' placeholder='credit card #' type='text' defaultValue=''/>
        <input id='expiration date' placeholder='MM/YY' type='text' defaultValue=''/>
        <input id='cvv' placeholder='CVV' type='number' defaultValue=''/>
        <input id='billingzip' placeholder='zipcode' type='number' defaultValue=''/>
      </form>
    );
  }
}

class Forms extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    if (this.props.page === 0) {
      return (
        <div>
          <SignUp/>
        </div>
      );
    } else if (this.props.page === 1) {
      return (
        <div>
          <Shipping/>
        </div>
      );

    } else if (this.props.page === 2) {
      return (
        <div>
          <CardInfo/>
        </div>
      );
    } else {
      return (
        <div>
        <p>Verify Your Purchase Info Below</p>
        {/* <button>Complete</button> */}
        </div>
      );
    }
  }
}

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  nextPage (event) {
    if (this.state.page === 2) {
      event.target.innerHTML = 'Complete'
    }
    var page = this.state.page + 1;
    this.setState({
      page: page
    });
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Forms page={this.state.page}/>
        <button onClick={this.nextPage.bind(this)} name='next'>Next</button>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));