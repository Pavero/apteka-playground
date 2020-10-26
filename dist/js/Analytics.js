"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnalyticsController = function () {
    function AnalyticsController() {
        _classCallCheck(this, AnalyticsController);
    }

    _createClass(AnalyticsController, null, [{
        key: "init",
        value: function init() {
            this.counter = new AnalyticsCounter({
                counterId: Config.analytics.metrikaCounterId
            });
            this.counter.init();
        }
    }, {
        key: "getModel",
        value: function getModel(value) {
            return this._conditionModels[value];
        }
    }]);

    return AnalyticsController;
}();

AnalyticsController.counter = null;
AnalyticsController._conditionModels = {
    external: function external(params, applyTarget) {
        return function () {
            return null;
        };
    },
    pageUrl: function pageUrl(params, applyTarget) {
        return function () {
            if (params.strict) {
                if (location.href == params.url) applyTarget();
            } else {
                if (location.href.indexOf(params.url) > -1) applyTarget();
            }
        };
    },
    onClick: function onClick(params, applyTarget) {
        return function () {
            return $(params.element).on("click", function () {
                return applyTarget();
            });
        };
    },
    onSubmit: function onSubmit(params, applyTarget) {
        return function () {
            return $(params.element).on("submit", function () {
                return applyTarget();
            });
        };
    }
};

var AnalyticsCounter = function () {
    function AnalyticsCounter(params) {
        _classCallCheck(this, AnalyticsCounter);

        this.isReady = false;
        this.targets = {};
        this.queue = [];
        this.observers = [];

        this.counterId = params.counterId;
    }

    _createClass(AnalyticsCounter, [{
        key: "init",
        value: function init() {
            if (window.targets != undefined) this.addTargets(window.targets);
            return this;
        }
    }, {
        key: "addTarget",
        value: function addTarget(targetId, target) {
            var targetItem = new AnalyticsTarget(targetId, target);
            this.targets[targetId] = targetItem.init();
            return targetItem;
        }
    }, {
        key: "addTargets",
        value: function addTargets(targets) {
            for (var key in targets) {
                this.addTarget(key, targets[key]);
            }
        }
    }, {
        key: "callTarget",
        value: function callTarget(targetId) {
            this.targets[targetId].applyTarget();
        }
    }]);

    return AnalyticsCounter;
}();

var AnalyticsTarget = function () {
    function AnalyticsTarget(targetId, params) {
        _classCallCheck(this, AnalyticsTarget);

        this.condition = null;
        this.props = {};

        this.targetId = targetId;
        this.model = params.model || "external";
        this.arguments = params.arguments || {};
        this.caller = params.caller || null;
        this.desc = params.desc || null;
    }

    _createClass(AnalyticsTarget, [{
        key: "applyTarget",
        value: function applyTarget() {
            console.log("Apply Analytics Target", this);
            window["yaCounter" + AnalyticsController.counter.counterId].reachGoal(this.targetId);
        }
    }, {
        key: "init",
        value: function init() {
            var model = AnalyticsController.getModel(this.model);
            this.condition = model(this.arguments, this.applyTarget.bind(this));
            this.condition();
            return this;
        }
    }]);

    return AnalyticsTarget;
}();

$(document).on("yacounter" + Config.analytics.metrikaCounterId + "inited", function () {
    return AnalyticsController.init();
});

/*
AnalyticsController.counter.addTargets([{
        targetId: "test",
        model: "pageUrl",
        desc: "test",
        arguments: {
            url: "http://apteka.fvds.ru/catalog"
        }
    },
    {
        targetId: "test3",
        model: "onSubmit",
        desc: "test",
        arguments: {
            element: ".js-auth-register-form"
        }
    },
    {
        targetId: "test2",
        desc: "test2"
    }
]);
*/