/**
 * Created by army on 2017/6/24.
 */

import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let SortType = '0';
let Parameter = '';

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = -1;
    self.on(migi.Event.DOM, function() {
      self.ref.doubleCheck.on('change', function(lA, lB) {
        let temp = lA.concat(lB);
        temp = temp.length ? JSON.stringify(temp) : '';
        if(temp !== Parameter) {
          Parameter = temp;
          self.loadPlayList();
        }
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load(authorID) {
    let self = this;
    self.authorID = authorID;
    util.postJSON('author/GetAuthorWorks', { AuthorID: authorID }, function (res) {
      if(res.success) {
        let data = res.data;
        self.ref.doubleCheck.setData(data);
      }
    });
    self.loadPlayList();
  }
  loadPlayList() {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('author/SearchWorks', { AuthorID: self.authorID, Parameter, Skip: 1, Take: 10, SortType }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData(data.data);
      }
    });
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    SortType = $ul.find('.cur').attr('rel');
    this.loadPlayList();
  }
  render() {
    return <div class="works fn-hide">
      <DoubleCheck ref="doubleCheck"/>
      <div class="bar">
        <ul class="btn fn-clear">
          <li class="all">播放全部</li>
          <li class="audio"></li>
          <li class="video"></li>
        </ul>
        <ul class="type fn-clear" onClick={ this.switchType }>
          <li class="cur" rel="0">最热</li>
          <li rel="1">最新</li>
        </ul>
      </div>
      <PlayList ref="playList"/>
    </div>;
  }
}

export default Works;
