function List (props) {
  const pairs = props.pairs;
  const listItems = pairs.map((pair) =>
    <li>{`${pair[0]}: ${pair[1]}`}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}


class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  onChangeHandler (event) {

    this.setState({
      [event.target.name]: event.target.value
      });

  }

  render() {
    return (
      <div>
      <form name='signup'>
        <input onChange={this.onChangeHandler.bind(this)} name='name' placeholder='name' type='text' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='email' placeholder='email' type='email' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='password' placeholder='password' type='password' defaultValue=''/>
      </form>
      <button onClick={(event) => {
        this.props.buttonHandler(event, this.state);
      }}>Next</button>
      </div>
    );
  }
}

class Shipping extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  onChangeHandler (event) {

    this.setState({
      [event.target.name]: event.target.value
      });

  }

  render() {
    return (
      <div>
      <form name='shipping'>
        <input onChange={this.onChangeHandler.bind(this)} name='address1' placeholder='address' type='text' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='address2' placeholder='apt number' type='text' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='phone' placeholder='phone number' type='text' defaultValue=''/>
      </form>
      <button onClick={(event) => {
        this.props.buttonHandler(event, this.state);
      }}>Next</button>
      </div>
    );
  }
}

class CardInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  onChangeHandler (event) {

    this.setState({
      [event.target.name]: event.target.value
      });

  }

  render() {
    return (
      <div>
      <form name='CardInfo'>
        <input onChange={this.onChangeHandler.bind(this)} name='cardnumber' placeholder='credit card #' type='text' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='expiration' placeholder='MM/YY' type='text' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='cvv' placeholder='CVV' type='number' defaultValue=''/>
        <input onChange={this.onChangeHandler.bind(this)} name='zipcode' placeholder='zipcode' type='text' defaultValue=''/>
      </form>
      <button onClick={(event) => {
        this.props.buttonHandler(event, this.state);
      }}>Next</button>
      </div>
    );
  }
}

class Forms extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {

    if (this.props.page === -1) {

      return (
        <div>
          <p>check out now</p>
          <button onClick={this.props.buttonHandler}>Checkout</button>
        </div>
      );
    } else if (this.props.page === 0) {
      return (
        <div>
          <SignUp buttonHandler={this.props.buttonHandler}/>
        </div>
      );
    } else if (this.props.page === 1) {
      return (
        <div>
          <Shipping buttonHandler={this.props.buttonHandler}/>
        </div>
      );

    } else if (this.props.page === 2) {
      return (
        <div>
          <CardInfo buttonHandler={this.props.buttonHandler}/>
        </div>
      );
    } else if (this.props.page === 3) {
      return (
        <div>
        <p>Verify Your Purchase Info Below</p>
        <List pairs={this.props.purchase}/>
        <button onClick={this.props.buttonHandler}>Purchase</button>
        </div>
      );
    }
  }
}

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      page: -1,
      currentCustomer: []
    }
  }

  nextPage (event, data) {

    if (this.state.page === -1) {
      // create new database entry,
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("/customer", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.setState({
            customerId: result,
            page: 0
          })
        })
        .catch(error => console.log('error', error));

    } else if (this.state.page <= 2) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      data.id = this.state.customerId;
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      fetch("/customer/info", requestOptions)
        .then(response => response.text())
        .then(response => {
          var result = [];
          response = JSON.parse(response)[0];
          console.log(response);
          for (var key of Object.keys(response)) {
            result.push([key, response[key]]);
          }
          this.setState({
            purchase: result
          })
        })
        .catch(error => console.log('error', error));


      var page = this.state.page + 1;
      this.setState({
        page: page,
        currentCustomer: this.state.currentCustomer.concat(data)
      });

    } else {

      this.setState({
        page: -1,
        currentCustomer: [],
        customerId: undefined
      });

      // show data off


    }

  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Forms buttonHandler={this.nextPage.bind(this)} page={this.state.page} purchase={this.state.purchase}/>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));