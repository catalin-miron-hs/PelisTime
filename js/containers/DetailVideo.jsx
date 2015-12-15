import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback'
import * as videoActions from '../actions/videoActions'

// Custom Components
import Spinner from '../components/Spinner.jsx'
import DescriptionVideo from '../components/DescriptionVideo.jsx'
import SourceList from '../components/SourceList.jsx'
import Back from '../components/Back.jsx'

// Assets
import noImage from '../../img/no-image.jpg'
import loadingImage from '../../img/loading_spinner.gif'

// Material Compoennts
import { RaisedButton } from 'material-ui'

@connect(state => ({
  detailStore: state.detailStore
}))
export default class DetailVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch, detailStore, location } = this.props
    const { id } = location.state
    dispatch(videoActions.fetchDetail(id))
  }

  render() {
    const { name, plot, duration, rating, type, year, genre, sources, Loading } = this.props.detailStore

    const childComponents = Loading ? <Spinner /> : (
      <div>
        <DescriptionVideo
          name={name}
          plot={plot}
          duration={duration}
          rating={rating}
          type={type}
          year={year}
          genre={genre.name}
        />
        <SourceList
          name={name}
          sources={sources}
          history={this.props.history} />
      </div>
    )

    return (
      <div className='description'>
        <ReactImageFallback
              src={this.props.location.state.image}
              fallbackImage={noImage}
              initialImage={loadingImage}
              className='cover-bg' />
        <div className='cover-shadow'/>
        <Back
          history={this.props.history}
          contentClassName='margin'/>
        {childComponents}
      </div>
    )
  }

  _handleBack(e) {
    this.props.history.goBack()
  }
}