describeComponent('lib/battery', function () {

  var lowBattery = {
    level: 0.05,
    charging: false
  };

  var charging = {
    level: 0.75,
    dischargingTime: Infinity,
    charging: true
  };

  var discharging = {
    level: 0.75,
    charging: false
  };

  beforeEach(function() {
    if (!window.navigator || !window.navigator.battery) {
      window.navigator = {};
      window.navigator.battery = charging;
    }

    setupComponent(document, {
      lowLevel: 10
    });
  });

  it('should trigger "battery-status" on battery level changes', function() {
    spyOn(navigator.battery).andReturn(discharging);
    var eventSpy = spyOnEvent(document, 'battery-status');
    $(document).trigger('levelchange');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should trigger "battery-status-low" when battery drops below 10%', function() {
    navigator.battery = lowBattery;
    var eventSpy = spyOnEvent(document, 'battery-status-low');
    $(document).trigger('levelchange');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should trigger "battery-charging" when charging', function() {
    navigator.battery = charging;
    var eventSpy = spyOnEvent(document, 'battery-charging');
    $(document).trigger('chargingchange');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should trigger "battery-discharging" when discharging', function() {
    navigator.battery = discharging;
    var eventSpy = spyOnEvent(document, 'battery-discharging');
    $(document).trigger('chargingchange');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

});
