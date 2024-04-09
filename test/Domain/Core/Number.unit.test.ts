import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import Number from '../../../src/Engine/Domain/Core/Number';

@suite class NumberUnitTests {

  @test 'sort works fine'() {
    let numbers = [1,8,6,2,9,5,3,7,4,8,1];
    let sortExpected = [1,1,2,3,4,5,6,7,8,8,9];

    let sorted = numbers.sort(Number.comapreASC);    

    expect(sorted).to.deep.equal(sortExpected);
  }
}