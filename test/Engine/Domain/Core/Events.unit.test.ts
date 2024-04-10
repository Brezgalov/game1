import { suite, test } from '@testdeck/mocha';
import { expect, assert } from 'chai';
import Events from '../../../../src/Engine/Domain/Core/Events';

@suite class EventsUnitTests {

  @test 'event is bind'() {
    let events = new Events();
    let testEvent = 'testEventCode';

    events.bind(testEvent, (test: number) => { return test + 1; });

    expect(2).equal(
      events.trigger(testEvent, 1)
    );
  }

  @test 'event not bind'() {
    let events = new Events();
    let testEvent = 'testEventCode';

    assert.isNull(events.trigger(testEvent, 123));
  }

}