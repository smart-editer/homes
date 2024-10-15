var form = document.forms.namedItem("downloader");
var loader = document.querySelector("#loader");
var alertBox = document.getElementById("alert");

function getShortcode(url) {
  let shortcode;
  if (url == '') {
      shortcode = '';
  } else {
      const fixed_url = url.split("?");
      const newUrl = fixed_url[0];
      const dataArray = newUrl.split("/");
      shortcode = dataArray[dataArray.length - 1] || dataArray[dataArray.length - 2];
  }

  return shortcode;
}

function generateLink() {
  const link = form.url.value;
  const newLink = "https://www.instagram.com/graphql/query?query_hash=2b0673e0dc4580674a88d426fe00ea90&variables={%22shortcode%22:%22"+getShortcode(link)+"%22}"
  form.instaLink.value = newLink;
  var userAgent = navigator.userAgent;
  var isChromeAndroid = /Chrome/.test(userAgent) && /Android/.test(userAgent);
  if (isChromeAndroid) {
    document.getElementById('newtablink').style.display = 'none';
  }
  document.getElementById('newtablink').href = newLink;
  document.getElementById('newtablink').removeAttribute('disabled')
}

function downloadMore() {
  document.getElementById("downloader").remove();
  document.getElementById('below-dl-link').style.display = 'block';
}

function showLoader() {
    document.getElementById("submit").style.display = "none";
    document.getElementById("loader").style.display = "block";
}
function hideLoader() {
    document.getElementById("submit").style.display = "block";
    document.getElementById("loader").style.display = "none";
}

function removeParams() {
    const url = window.location.href.split('?')[0];
    window.history.pushState('',document.title,url);
}

function pushAlert(j) { window.location = window.location.href + "?error=" + j }
function hiddenAlert() { alertBox.style.display = "none"; alertBox.innerHTML = '' }

form.addEventListener('submit', function (ev) {
    try {
        removeParams();
        hiddenAlert();
        if ((form.html === undefined) && (form.url.value == '')) {
            pushAlert(lang.LinkEmpty);
        } {
            var params = "url=" + form.url.value+"&v=3&lang=" + document.documentElement.lang;
            if (!(form.html === undefined)) {
              params += "&html="+ encodeURIComponent(form.html.value);
            }
            showLoader();
        loader.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        var httpReq = new XMLHttpRequest();
        httpReq.open("POST", form.attributes.action.value, true);
        httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        httpReq.onreadystatechange = function (oEvent) {
          if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
              insertAndExecute("js-result", "<scri" + "pt type='text/javascript'>" + httpReq.response + "history.pushState({}, null, \"download\");</scr" + "ipt>");
            } else {
              console.log(httpReq.status);
              pushAlert(lang.somethingWrong);
            }
          }
        };
        httpReq.send(params);
      }
    } catch (error) {
      console.log(error);
      pushAlert(lang.somethingWrong);
    }
    ev.preventDefault();
  }, false);

  function insertAndExecute(id, text) {
    domelement = document.getElementById(id);
    domelement.innerHTML = text;
    var scripts = [];
  
    ret = domelement.childNodes;
    for (var i = 0; ret[i]; i++) {
      if (scripts && myNodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
      }
    }
  
    for (script in scripts) {
      evalScript(scripts[script]);
    }
  }
  
  function myNodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
  }
  
  function evalScript(elem) {
    data = (elem.text || elem.textContent || elem.innerHTML || "");
  
    var head = document.getElementsByTagName("head")[0] || document.documentElement,
      script = document.createElement("script");
    script.type = "text/javascript";
    script.appendChild(document.createTextNode(data));
    head.insertBefore(script, head.firstChild);
    head.removeChild(script);
  
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }
var typed = new Typed('.typed-heading', {
    strings: ['Reels', 'Story', 'Post'],
    typeSpeed: 200,
    backSpeed: 200,
    loop: true
  });
