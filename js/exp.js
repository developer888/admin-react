var MenuExample = React.createClass({

    getInitialState: function () {
        return {focused: 0};
    },

    clicked: function (index) {

        // ���������� ����� ������� ���������
        // ������� ������ �� ��������������� ������� ����

        this.setState({focused: index});
    },

    render: function () {

        // ����� �� ������ �������� items, ������� ���� ��������
        // ���������, ��� �������� ����������

        var self = this;

        // ����� map ��������� �� ������� ��������� ����,
        // � ��������� ������ � <li> ����������.

        return (
            <div>
                <ul>{this.props.items.map(function (m, index) {

                    var style = '';

                    if (self.state.focused == index) {
                        style = 'focused';
                    }

                    // �������� �������� �� ������������� ������ bind(). �� ������
                    // index ��������� � ������� clicked:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
        );

    }
});

// ���������� ��������� ���� �� ��������, ������� ��� ������ � ����������

ReactDOM.render(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] }/>,
    document.getElementById('app')
);
