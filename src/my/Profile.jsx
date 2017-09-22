/**
 * Created by army on 2017/7/16.
 */
 
class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  click(e, vd, tvd) {
    let $tvd = $(tvd.element);
    if($tvd.hasClass('alt')) {
      $(vd.element).find('.card').toggleClass('alt');
    }
  }
  render() {
    return <div class="profile" onClick={ { '.card': this.click } }>
      <div class="bg"/>
      <div class="card">
        <img class="pic" src={ window.$CONFIG.userPic || '//zhuanquan.xyz/img/blank.png' }/>
        <div class="con">
          <h3>{ window.$CONFIG.userName || '--' }<span>个人身份</span></h3>
          <ul>
            <li>Lv.0</li>
            <li>
              <strong>0</strong>
              <span>感兴趣</span>
            </li>
            <li>
              <strong>0</strong>
              <span>喜欢我</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="card alt">
        <img class="pic" src="//zhuanquan.xyz/img/blank.png"/>
        <div class="con">
          <h3>--<span>公众身份</span></h3>
          <ul>
            <li>Lv.--</li>
            <li>
              <strong>--</strong>
              <span>感兴趣</span>
            </li>
            <li>
              <strong>--</strong>
              <span>喜欢我</span>
            </li>
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default Profile;
