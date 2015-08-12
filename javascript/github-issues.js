function is_defined(variable){
  return typeof(variable) == "undefined"
}

function is_string(input){
  return typeof(input)=='string';
}

function alert_key_value_pairs(map){
  for (var key in map) {
    alert([key, map[key]].join("\n\n"));
  }
}

function error(msg){
  alert("!!! ERROR - " + msg);
}

var GithubIssuesWidget = {};

//GithubIssuesWidget.url = "https://api.github.com/repos/" + GITHUB_ISSUES_USER + "/" + GITHUB_ISSUES_REPO + "/issues?callback=?"

if(GITHUB_ISSUES_LABELS=='changelog')
	{
	GithubIssuesWidget.url = "https://api.github.com/repos/" + GITHUB_ISSUES_USER + "/" + GITHUB_ISSUES_REPO + "/issues?callback=?&state=closed";
	}
else
	{
	GithubIssuesWidget.url = "https://api.github.com/repos/" + GITHUB_ISSUES_USER + "/" + GITHUB_ISSUES_REPO + "/issues?callback=?";
	}

if(typeof window.GITHUB_ISSUES_LABELS != "undefined") {
  if(is_string(GITHUB_ISSUES_LABELS)) {
    GithubIssuesWidget.url += "&labels=" + GITHUB_ISSUES_LABELS;
  } else {
    error("GITHUB_ISSUES_LABELS must be a string, ignoring label filter");
  }
}

GithubIssuesWidget.go = function () {

  $('#github-issues-widget').append('<p class="loading">Loading...</p>');

  $.getJSON(this.url, function (data) {

    var list = $('<ul class="mainlist"></ul>');

    $.each(data.data, function (issueIndex, issue) {

     //alert(dodump(issue));

     var thisdate = $.datepicker.formatDate("M d, yy", new Date(issue.created_at));


      var issueHtml = "<li>";

      issueHtml += '<a href="https://github.com/' + GITHUB_ISSUES_USER + '/' + GITHUB_ISSUES_REPO + '/issues/' + issue.number+ '" target="_blank"">';
      issueHtml += issue.title;
      issueHtml += "</a>";
      issueHtml += " (" + thisdate + ")";
      issueHtml += " - " + issue.body;
      issueHtml += "</li>";
      list.append(issueHtml);

    });

    $('#github-issues-widget p.loading').remove();
    $('#github-issues-widget').append(list);

  });
};


var GithubMilestonesWidget = {};

GithubMilestonesWidget.url = "https://api.github.com/repos/" + GITHUB_ISSUES_USER + "/" + GITHUB_ISSUES_REPO + "/milestones?callback=?"

if(typeof window.GITHUB_ISSUES_LABELS != "undefined") {
  if(is_string(GITHUB_ISSUES_LABELS)) {
    GithubMilestonesWidget.url += "&labels=" + GITHUB_ISSUES_LABELS;
  } else {
    error("GITHUB_ISSUES_LABELS must be a string, ignoring label filter");
  }
}

GithubMilestonesWidget.go = function () {

  $('#github-issues-widget').append('<p class="loading">Loading...</p>');

  $.getJSON(this.url, function (data) {

    var list = $('<ul class="mainlist"></ul>');

    $.each(data.data, function (issueIndex, issue) {

      var issueHtml = "<li>";
      issueHtml += '<a href="https://github.com/' + GITHUB_ISSUES_USER + '/' + GITHUB_ISSUES_REPO + '/issues/' + issue.number+ '" target="_blank"">';
      issueHtml += issue.title;
      issueHtml += "</a>";
      issueHtml += " - " + issue.description;
      issueHtml += "</li>";
      list.append(issueHtml);

    });

    $('#github-issues-widget p.loading').remove();
    $('#github-issues-widget').append(list);

  });
};
