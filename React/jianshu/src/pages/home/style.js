import styled from 'styled-components'

export const HomeWrapper = styled.div `
  ${'' /* 触发bfc; float:left、right*/}
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
  ${'' /* height: 300px;
  background: red; */}
`;

export const HomeLeft = styled.div `
  float: left;
  margin-left: 15px;
  padding-top: 30px;
  width: 625px;
  a {
    cursor: pointer;
    .banner-img {
      width: 100%;
      height: 270px;
    }
  }
  
`;

export const HomeRight = styled.div `
  float: right;
  width: 280px;
`;

export const  TopicWrapper = styled.div `
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -18px;
  border-bottom: 1px solid #dcdcdc;
`;

export const TopicItem = styled.div `
  float: left;
  height: 32px;
  line-height: 32px;
  margin-left: 18px;
  margin-bottom: 18px;
  padding-right: 10px; 
  background: #f7f7f7;
  font-size: 14px;
  color: #000;
  border: 1px solid #dcdcdc;
  ${'' /* box-sizing: border-box; */}
  border-radius: 4px;
  a {
    text-decoration:none;
  }
  .topic-pic {
    ${'' /* 图片不会影响TopicItem中的文字 */}
    display: block;
    float: left;

    height: 32px;
    width: 32px;
    margin-right: 10px;
  }
`;

export const ListItem = styled.div `
  ${'' /* 浮动元素的外层都加上overflow */}
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #dcdcdc;
  .pic {
    display: block;
    width: 125px;
    height: 100px;
    float: right;
    border-radius: 10px;
  }
`;

export const ListInfo = styled.div `
  width: 500px;
  float: left;
  .title {
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999
  }
`;

export const RecommendWrapper = styled.div `
  margin-top: 30px;
  margin-bottom: 10px;
  width: 280px;
`;

export const RecommendItem = styled.div `
  width: 280px;
  height: 50px;
  background: url(${(props)=>props.imgUrl});
  background-size: contain;
  margin-bottom: 6px;
`;

export const AppDownloadWrapper = styled.div`
  position: relative;
  a {
    display: block;
    box-sizing: border-box;
    width: 280px;
    padding: 10px 22px;
    margin-bottom: 30px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
  }
  .qrcode {
    height: 60px;
    width: 60px;
    opacity: .85;
    vertical-align: middle;
  }
`;

export const AppInfo = styled.div `
  display: inline-block;
  vertical-align: middle;
  margin-left: 9px;
  .title {
    font-size: 15px;
    color: #333;
  }
  .description {
    margin-top: 6px;
    font-size: 13px;
    color: #999;
  }
`;

export const PopOverWrapper = styled.div `
  width: 180px;
  height: 180px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  background: #fff;
  position: absolute;
  top: -193px;
  left: 48px;
`;

export const PopOverContent = styled.div `
  padding: 10px;
  img {
    width: 160px;
    height: 160px;
  }
`;

export const WriterWrpper = styled.div `
  width: 278px;
  border: 1px solid #dcdcdc;
  border-radius:3px;
  height: 300px;
  line-height: 300px;
  text-align: center;
`;

export const LoadMore = styled.div `
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 30px 0;
  background: #a5a5a5;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #9b9b9b;
  }
`;

export const BackTop = styled.div `
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 10px;
  color: #2f2f2f;
  cursor: pointer;
  &:hover {
    background: hsla(0,0%,71%,.1);
  }
`;