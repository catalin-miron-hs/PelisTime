import React, { PropTypes, Component } from 'react'
import Q from 'q'
import torrentHealth from 'torrent-health'

// Material Components
import CircularProgress from 'material-ui/lib/circular-progress'

export default class HealthTorrent extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: true,
      peers  : 0,
      seeds  : 0
    }
  }

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.cancelablePromise = this.makeCancelable(torrentHealth(this.props.url))
    this.cancelablePromise
      .promise
      .then(health => {
        this.setState(Object.assign({}, { loading: false }, health))
      })
      .catch(err => {
        if(!err.isCanceled) this.setState({ loading: false })
      })
  }

  makeCancelable(promise) {
    let hasCanceled_ = false

    return {
      promise: new Promise(
        (resolve, reject) => promise
          .then(r => hasCanceled_ ?
            reject({ isCanceled: true })
            : resolve(r)
          )
      ),
      cancel() {
        hasCanceled_ = true
      }
    }
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel()
  }

  render() {
    const { seeds, peers, loading } = this.state

    return (
      <span>{loading ? <CircularProgress mode='indeterminate' size={0.3} /> : `Semillas: ${seeds} - Pares: ${peers}`}</span>
    )
  }
}
