import { suite, test } from '@testdeck/mocha';
import { expect, assert } from 'chai';
import IdProvider from '../../../../src/Engine/Domain/Core/IdProvider';

@suite class IdProviderTest {

  @test 'id genration'() {
    expect(IdProvider.nextId('test', '-')).equals('test-1');
    expect(IdProvider.nextId('', '-')).equals('2');
  }

}