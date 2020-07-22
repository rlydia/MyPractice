// import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppDownloadWrapper, AppInfo, PopOverWrapper, PopOverContent } from '../style.js';
import { actionCreators } from '../store'

class AppDownload extends PureComponent {
  getPopOver() {
      return (
        <PopOverWrapper>
          <PopOverContent>
            <img src='https://cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png' alt=''/>
          </PopOverContent>
        </PopOverWrapper>
      )
  }

  render() {
    const { mouseIn, handleMouseEnter, handleMouseLeave } = this.props

    return (
        <AppDownloadWrapper
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mouseIn && this.getPopOver()}
          <a href='https://www.jianshu.com/apps?utm_medium=desktop&utm_source=index-aside-click'>
            <img className='qrcode' src='https://cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png'  alt=''/>
            <AppInfo>
              <div className='title'>
                下载简书手机App >
                <i></i>
              </div>
              <div className="description">随时随地发现和创作内容</div>
            </AppInfo>
          </a>
        </AppDownloadWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mouseIn: state.getIn(['home', 'mouseIn']),
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    // handleMouseEnter() {
      // const action = {
      //   type: constants.MOUSE_ENTER
      // }
      // dispatch(action)
    // },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
  }
}

// export default AppDownload;
export default connect(mapStateToProps, mapDispathToProps)(AppDownload)
