
chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create(
        'index.html', {
            id: 'mainWindow',
            // frame: 'none',
            bounds: {
                width: 640,
                height: 640
            },
            minWidth: 360,
            minHeight:640,
        }
    );
});
