import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.id)
    }

    render() {
        return(
            <div>StreamEdit</div>
        )
    }
}

const mapStateToProps = ( { streams }, ownProps ) => {
    const {id} = ownProps.match.params
    return {
        stream: streams[id],
        id
    }
}
export default connect(mapStateToProps, {fetchStream})(StreamEdit)