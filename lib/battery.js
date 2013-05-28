define(['flight/lib/component'], function(defineComponent) {

  var Battery = defineComponent(battery);

  function battery() {

    this.defaultAttrs({
      lowLevel: 10
    });

    this.currentStatus = function() {
      return {
        level: this.battery.level * 100,
        chargingTime: this.battery.chargingTime,
        dischargingTime: this.battery.dischargingTime,
        charging: this.battery.charging
      };
    };

    this.updateStatus = function() {
      var status = this.currentStatus();
      this.trigger('battery-status', status);
      if (!status.charging && (status.level <= this.attr.lowLevel)) {
        this.trigger('battery-status-low', this.currentStatus());
      }
    };

    this.chargingStatus = function() {
      var status = this.currentStatus();
      this.trigger('battery-' + (status.charging ? '' : 'dis') + 'charging', status);
    };

    this.after('initialize', function() {
      this.battery = (navigator.battery || navigator.webkitBattery || navigator.mozBattery);
      if (this.battery) {
        this.trigger('battery-supported');
        this.on(this.battery, 'battery-query levelchange chargingtimechange dischargingtimechange', this.updateStatus);
        this.on(this.battery, 'battery-query chargingchange', this.chargingStatus);

        // Trigger initial query
        this.trigger('battery-query');
      } else {
        this.trigger('battery-unsupported');
      }
    });

  }

  return Battery;
});
