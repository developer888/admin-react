var H1 = React.createClass({
    render: function () {
        return <h1>HALO {this.props.name}!</h1>
    }
});
var Input = React.createClass({
    render: function () {
        return <input value={this.props.name} onChange={(event) => this.props.change(event.target.value)}/>
    }
});
var Button = React.createClass({
    render: function () {
        return <button onClick={this.props.click}>Gnopga</button>
    }
});
var App = React.createClass({
    getInitialState: function () {
        return {name: ""}
    },
    changeHandler: function (name) {
        this.setState({name: name})
    },
    clickButton: function () {
        var name = this.state.name;
        name = name.split("").reverse().join("");
        this.setState({name: name})
    },
    render: function () {
        return <div><H1 name={this.state.name}/><Input name={this.state.name} change={this.changeHandler}/><Button click ={this.clickButton}/>
        </div>
    }
});
ReactDOM.render(
    <App />,
    document.getElementById('app')
);

