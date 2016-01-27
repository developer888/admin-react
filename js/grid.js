var RowInGrig = React.createClass({
    render: function () {
        var item = this.props.data;
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td className='roles'><Roles roles={item.roles} roleChange={this.props.roleChange} rowId={item.id}/>
                </td>
                <td>{item.id}</td>
                <td>{item.phone}</td>
                <td className="is-online"><IsOnline online={item.isOnline}/></td>
                <td className="history"><BtnHistory showHistory={this.props.showHistory} /></td>
            </tr>
        )
    }
});
var Roles = React.createClass({
    getInitialState: function () {
        return {active: false}
    },
    render: function () {
        let arrowClass = "glyphicon glyphicon-chevron-" + (this.state.active ? 'up' : 'down');
        return <div>
            <button ref="roleMulti" className="role-dropdown-button"
                    onClick={() => {this.setState({active: !this.state.active})}}
                //onBlur={() => {this.setState({active:false})}}
                >
                {this.props.roles.join(", ")}
                <span className={arrowClass}></span>
            </button>
            <MultiSelect
                active={this.state.active}
                chosen={this.props.roles}
                roleChange={this.props.roleChange}
                rowId={this.props.rowId}/>
        </div>

    }
});
var MultiSelect = React.createClass({
    render: function () {
        var roles = ['Doctor', 'super-admin', 'Nurce', 'Administrator', 'SuperUser', 'Oleg-role'];
        return (<ul className={(this.props.active)?"active":""}>
            {roles.map((role, index) => {
                let isChecked = (this.props.chosen.indexOf(role) >= 0) ? true : false;
                return <LiRoles key={index} name={role} checked={isChecked}
                                change={(event) => {this.props.roleChange(event, this.props.rowId)}}/>
            })}
        </ul>)
    }
});
var LiRoles = React.createClass({
    render: function () {
        var cl = this.props.checked ? "glyphicon glyphicon-ok" : "glyphicon";
        return <li><label><span className={cl}></span><input type='checkbox' checked={this.props.checked}
                                                             onChange={this.props.change}
                                                             value={this.props.name}/>{this.props.name}
        </label></li>
    }
});
var BtnHistory = React.createClass({
    render: function () {
        return (<button onClick={this.props.showHistory} className="btn glyphicon glyphicon-th-list"></button>)
    }
});
var History = React.createClass({
    getInitialState: function () {
        return {rows: [], sorted: false}
    },
    sort: function (col) {
        let direction = 'asc';
        if (this.state.sorted && this.state.sorted.col == col) {
            direction = (this.state.sorted.direction == direction) ? "desc" : direction;
        }
        let sorted = {col, direction};
        let rows = this.state.rows;
        rows.sort(function (a, b) {
            if (a[sorted.col] == b[sorted.col]) {
                return 0;
            }
            if (a[sorted.col] < b[sorted.col]) {
                return (sorted.direction == "asc") ? -1: 1;
            }
            else {
                return (sorted.direction == "asc") ? 1: -1;
            }
        });
        this.setState({rows, sorted});
    },
    componentDidMount: function() {
        $.ajax ({
            url: "temp-api/history.json?userId=" + this.props.userId,
            method: "POST",
            dataType: "JSON",
            success: function(data){
                this.setState({rows: data.rows})
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <H1 text='History'/>
                <table className='table table-bordered table-striped'>
                    <thead>
                    <tr>
                        <th onClick={this.sort.bind(this, "timestamp")}>timestamp <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "url")}>url <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "roleFilters")}>roleFilters <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "webFilters")}>webFilters <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "roles")}>roles <small className="glyphicon glyphicon-sort "></small></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows.map((row, i)=> <tr key={i}>
                        <td>{row.timestamp}</td>
                        <td>{row.url}</td>
                        <td>{row.roleFilters}</td>
                        <td>{row.webFilters}</td>
                        <td>{row.roles}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
});
var IsOnline = React.createClass({
    render: function () {
        var cl = this.props.online ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove";
        return (<span className={cl}></span>)
    }
});
var H1 = React.createClass({
    render: function () {
        return (
            <h1>{this.props.text}</h1>
        )
    }
});
var Search = React.createClass({
    getInitialState: function () {
        return {value: ''};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
        this.props.handleSearch(event.target.value);
    },
    render: function () {
        return (
            <input type="text" placeholder="Search" className="input-search"
                   value={this.state.value} onChange={this.handleChange}/>
        )
    }
});
var GridApp = React.createClass({
    getInitialState: function () {
        return {rows: [], searchText: "", sorted: false, history: {show: false, userId:null}}
    },
    sort: function (col) {
        let direction = 'asc';
        if (this.state.sorted && this.state.sorted.col == col) {
            direction = (this.state.sorted.direction == direction) ? "desc" : direction;
        }
        let sorted = {col, direction};
        let rows = this.state.rows;
        rows.sort(function (a, b) {
            if (a[sorted.col] == b[sorted.col]) {
                return 0;
            }
            if (a[sorted.col] < b[sorted.col]) {
                return (sorted.direction == "asc") ? -1: 1;
            }
            else {
                return (sorted.direction == "asc") ? 1: -1;
            }
        });
        this.setState({rows, sorted});
    },
    handleCheckRole: function (event, id) {
        var rows = this.state.rows.map((row) => {
            if (row.id == id) {
                var key = row.roles.indexOf(event.target.value);
                if (key < 0) {
                    row.roles.push(event.target.value);
                } else {
                    row.roles.splice(key, 1);
                }
            }
            return row;
        });
        this.setState({rows: rows});
    },
    handleSearch: function (value) {
        this.setState({searchText: value.trim()});
    },
    componentDidMount: function () {
        $.ajax({
            url: "temp-api/users.json",
            method: "POST",
            dataType: "JSON",
            success: function (data) {
                this.setState({rows: data.rows})
            }.bind(this)
        });
    },
    render: function () {
        var rows = [];
        this.state.rows.forEach(function (row, i) {
            if (this.state.searchText != "") {
                var str = "";
                $.each(row, function (key, el) {
                    if (Array.isArray(el)) el = el.join(",");
                    str += el + "|";
                });
                if (str.toLowerCase().indexOf(this.state.searchText.toLowerCase()) < 0) {
                    return;
                }
            }
            rows.push(<RowInGrig showHistory={() => {this.setState({history: {show: true, userId: row.id}})}} key={i} data={row} roleChange={this.handleCheckRole}/>);
        }.bind(this));
        return (
            <div>
                <H1 text='Users'/>
                <Search handleSearch={this.handleSearch}/>
                <table className='table table-bordered table-striped'>
                    <thead>
                    <tr>
                        <th onClick={this.sort.bind(this, "name")}>Name <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "email")}>Email <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "roles")}>Roles <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "id")}>Id <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "phone")}>Phone <small className="glyphicon glyphicon-sort "></small></th>
                        <th onClick={this.sort.bind(this, "isOnline")}>IsOnline <small className="glyphicon glyphicon-sort "></small></th>
                        <th>History</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {this.state.history.show?<History userId={this.state.history.userId} />: null}
            </div>
        )
    }
});
ReactDOM.render(
    <GridApp />,
    document.getElementById('app')
);