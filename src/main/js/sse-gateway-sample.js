var $ = require('jquery');

$(document).ready(function start() {
    var sse = require('@jenkins-cd/sse-gateway');
    var logWindow = $('#event-logs');

    sse.subscribe('job', function (event) {
        var runId;
        var run;

        if (event.jenkins_event === 'job_run_started') {
            runId = 'job_' + event.job_name + '_run_' + event.jenkins_object_id;
            run = $('<div class="run">');

            run.attr('id', runId);
            run.addClass('started');
            run.append($('<span class="id">').text('#' + event.jenkins_object_id));
            run.append($('<span class="time">').text(new Date().toString()));
            run.append($('<span class="jobName">').text(event.job_name));
            run.append($('<span class="eventName">').text(event.jenkins_event));

            run.attr('title', JSON.stringify(event, undefined, 4));

            logWindow.append(run);
        } else if (event.jenkins_event === 'job_run_ended') {
            runId = 'job_' + event.job_name + '_run_' + event.jenkins_object_id;
            run = $('#' + runId, logWindow);

            run.removeClass('started');
            run.addClass('ended');
            run.addClass(event.job_run_status);
            $('.eventName', run).text(event.jenkins_event);

            run.attr('title', JSON.stringify(event, undefined, 4));
        }
    });
});
