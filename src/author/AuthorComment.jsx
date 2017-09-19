/**
 * Created by army8735 on 2017/9/19.
 */

import Comment from '../component/comment/Comment.jsx';

let Skip = -1;
let Take = 10;
let SortType = 0;
let MyComment = 0;
let CurrentCount = 0;
let ajax;
let ajaxMore;
let loadEnd;
let $window = $(window);

class AuthorComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  @bind authorID
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    self.showComment = true;
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    self.showComment = false;
    Skip = -1;
  }
  load(authorID) {
    let self = this;
    self.authorID = authorID;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
    }
    self.loading = true;
    ajax = util.postJSON('author/GetToWorkMessage_List', { AuthorID: self.authorID , Skip, Take, SortType, MyComment, CurrentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        CurrentCount = data.Size;
        Skip += Take;
        if(data.data.length) {
          self.ref.comment.message = '';
          self.ref.comment.appendData(res.data.data);
        }
        else {
          self.ref.comment.appendData(res.data.data);
          self.ref.comment.message = '暂无评论';
          loadEnd = true;
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  checkMore() {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > $window.height();
    if(self.showComment && !self.loading && !loadEnd && bool) {
      self.loading = true;
      ajaxMore = util.postJSON('author/GetToWorkMessage_List', { AuthorID: self.authorID , Skip, Take, SortType, MyComment, CurrentCount }, function(res) {
        if(res.success) {
          let data = res.data;
          CurrentCount = data.Size;
          Skip += Take;
          if(data.data.length) {
            self.ref.comment.appendData(data.data);
            if(data.data.length < Take) {
              self.ref.comment.message = '已经到底了';
              loadEnd = true;
            }
          }
          else {
            loadEnd = true;
            self.ref.comment.message = '已经到底了';
          }
        }
        else {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function(res) {
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    CurrentCount = 0;
    SortType = rel;
    Skip = 0;
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  switchType2(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    CurrentCount = 0;
    MyComment = rel;
    Skip = 0;
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  render() {
    return <div class="comments fn-hide">
      <ul class="type2 fn-clear" onClick={ { li: this.switchType2 } }>
        <li class="cur" rel="0">全部</li>
        <li rel="1">我的</li>
      </ul>
      <ul class="type fn-clear" onClick={ { li: this.switchType } }>
        <li class="cur" rel="0">最新</li>
        <li rel="1">最热</li>
      </ul>
      <Comment ref="comment" zanUrl="author/AddCommentLike" subUrl="author/GetTocomment_T_List" delUrl="author/DeleteCommentByID"/>
    </div>;
  }
}

export default AuthorComment;
