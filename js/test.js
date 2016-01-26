var Root = React.createClass({
    getInitialState: function () {
        return {active: false}
    },
    clickGnopka: function () {
        this.setState({
            active: !this.state.active
        })
    },
    render: function () {
        console.log(this.state);
        return <div>
            <button onClick={this.clickGnopka}>Gnopka</button>
            <h1 className={this.state.active? "show": "hide"}>Hello</h1></div>
    }
});
ReactDOM.render(
    <Root />,
    document.getElementById('app')
);