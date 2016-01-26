
// ������� ��������� ������� React.createClass.

var TimerExample = React.createClass({

    getInitialState: function(){

        // ��� ����������� ����� �������� render. ������������ ������
        // ������������� � this.state, ����� �� ����� ������������ ��� �����.

        return { elapsed: 0 };
    },

    componentDidMount: function(){

        // componentDidMount ���������� react'��, ����� ���������
        // ��� ��������� �� ��������. �� ����� ���������� �������� �����:

        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // ���� ����� ���������� ����� ����� ����, ��� ��������� ������
        // �� �������� � ���������. �� ����� ������� �������� �����:

        clearInterval(this.timer);
    },

    tick: function(){

        // ��� ������� ���������� ������ 50��. ��� ���������
        // ������� ������������ �������. ����� setState ���������� ��������� ����������������

        this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {

        var elapsed = Math.round(this.state.elapsed / 100);

        // ��� ���� ��� ����� � ����� ������ ����� ������� dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // ���� �� � ���������� ����� <p> �������, react ������� �������
        // ������ ���������� �����, ���������� ���������� seconds.

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});


ReactDOM.render(
    <TimerExample start={Date.now()} />,
    document.getElementById('app')
);
