var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationSpeed, opacity, color) {
            this.rotationSpeed = rotationSpeed;
            this.opacity = opacity;
            this.color = color;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map