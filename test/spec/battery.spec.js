describeComponent('lib/battery', function () {

  describe('when charging', function() {
    beforeEach(function() {
      setBatteryStatus({
        level: 0.75,
        dischargingTime: Infinity,
        charging: true
      });
      setupComponent();
    });

    it('should trigger "battery-status" on battery level changes', function() {
      var eventSpy = spyOnEvent(document, 'battery-status');
      this.component.trigger(this.component.battery, 'levelchange');
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });

    it('should trigger "battery-charging" when charging', function() {
      var eventSpy = spyOnEvent(document, 'battery-charging');
      this.component.trigger(this.component.battery, 'chargingchange');
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });

  describe('when in low battery mode', function() {
    beforeEach(function() {
      setBatteryStatus({
        level: 0.05,
        charging: false
      });
      setupComponent();
    });

    it('should trigger "battery-status-low" when battery drops below 10%', function() {
      var eventSpy = spyOnEvent(document, 'battery-status-low');
      this.component.trigger(this.component.battery, 'levelchange');
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });

  describe('when discharging', function() {
    beforeEach(function() {
      setBatteryStatus({
        level: 0.75,
        charging: false
      });
      setupComponent();
    });

    it('should trigger "battery-discharging" when discharging', function() {
      var eventSpy = spyOnEvent(document, 'battery-discharging');
      this.component.trigger(this.component.battery, 'chargingchange');
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });

  function setBatteryStatus(status) {
    delete navigator.battery;
    navigator.battery = $.extend({}, {
      level: 0.75,
      chargingTime: Infinity,
      dischargingTime: Infinity,
      charging: true
    }, status);
  }

});
