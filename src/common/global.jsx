/**
 * Created by army8735 on 2017/9/18.
 */

import TopNav from '../component/topnav/TopNav.jsx';
import BotNav from '../component/botnav/BotNav.jsx';
import MLogin from '../component/mlogin/MLogin.jsx';
import Share from '../component/share/Share.jsx';

let topNav = migi.render(
  <TopNav/>,
  document.body
);
topNav.on('search', function(kw) {
  util.goto('/search/' + kw);
});
migi.render(
  <BotNav/>,
  document.body
);

let mlogin;
migi.eventBus.on('NEED_LOGIN', function() {
  if(!mlogin) {
    mlogin = migi.render(
      <MLogin/>,
      document.body
    );
  }
  mlogin.show();
});

let share;
migi.eventBus.on('SHARE', function(url) {
  if(!share) {
    share = migi.render(
      <Share/>,
      document.body
    );
  }
  share.url = url;
  share.show();
});
