// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        var initializer = function () {
            var hourHand = document.getElementById("idHourHand");
            var minuteHand = document.getElementById("idMinuteHand");
            setInterval(function () {
                var now = new Date();
                var hour = now.getHours() % 12;
                var minute = now.getMinutes();
                var hourDeg = 360 * (hour / 12.0);
                var minuDeg = 360 * (minute / 60.0);
                hourHand.setAttribute("transform", "rotate(" + hourDeg + " 160 160)");
                minuteHand.setAttribute("transform", "rotate(" + minuDeg + " 160 160)");
            }, 1);
        }

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // 初期起動
                initializer();
            } else {
                // 中断からの復帰
                initializer();
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。中断中に自動的に保存され、
        // 復元される WinJS.Application.sessionState オブジェクトを使用
        // できます。アプリケーションを中断する前に非同期操作を完了する
        // 必要がある場合は、args.setPromise() を呼び出して
        // ください。
    };

    app.start();
})();
